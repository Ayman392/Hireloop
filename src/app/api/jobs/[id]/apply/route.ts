import { MongoClient, ObjectId } from "mongodb"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"

const databaseUri = process.env.BETTER_AUTH_DB_URI
if (!databaseUri) {
  throw new Error("Missing BETTER_AUTH_DB_URI.")
}

const client = new MongoClient(databaseUri)
const clientPromise = client.connect()

type JobApplication = {
  _id: string
  jobId: string
  applicantId: string
  applicantName: string
  applicantEmail: string
  status: "submitted"
  createdAt: string
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  })

  if (!session) {
    return Response.json(
      { error: "Sign in as a job seeker to apply." },
      { status: 401 }
    )
  }
  if (session.user.role !== "seeker") {
    return Response.json(
      { error: "Only job seeker accounts can apply." },
      { status: 403 }
    )
  }

  const { id } = await params
  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid job ID." }, { status: 400 })
  }

  try {
    const database = (await clientPromise).db("hireloopdb")
    const jobs = database.collection("jobs")
    const job = await jobs.findOne(
      { _id: new ObjectId(id) },
      { projection: { applicationDeadline: 1, status: 1 } }
    )

    if (!job) {
      return Response.json({ error: "Job not found." }, { status: 404 })
    }

    const status = typeof job.status === "string" ? job.status.toLowerCase() : ""
    const deadlineValue = job.applicationDeadline
    const deadlineDate =
      deadlineValue instanceof Date
        ? deadlineValue.toISOString().slice(0, 10)
        : typeof deadlineValue === "string"
          ? deadlineValue.slice(0, 10)
          : ""
    const deadlineTimestamp = deadlineDate
      ? new Date(`${deadlineDate}T23:59:59Z`).getTime()
      : Number.NaN
    const deadlinePassed =
      Number.isFinite(deadlineTimestamp) && deadlineTimestamp < Date.now()

    if (["ended", "closed"].includes(status) || deadlinePassed) {
      return Response.json(
        { error: "Applications for this job are closed." },
        { status: 409 }
      )
    }

    const applicationId = `${id}:${session.user.id}`
    const applications = database.collection<JobApplication>("applications")
    const existingApplication = await applications.findOne({
      _id: applicationId,
    })

    if (existingApplication) {
      return Response.json(
        { error: "You have already applied for this job.", applied: true },
        { status: 409 }
      )
    }

    const application: JobApplication = {
      _id: applicationId,
      jobId: id,
      applicantId: session.user.id,
      applicantName: session.user.name,
      applicantEmail: session.user.email,
      status: "submitted",
      createdAt: new Date().toISOString(),
    }
    const apiBaseUrl =
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000"

    const apiResponse = await fetch(
      `${apiBaseUrl.replace(/\/$/, "")}/applications`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
        cache: "no-store",
      }
    )

    if (!apiResponse.ok) {
      console.error("[Application API error]", await apiResponse.text())
      return Response.json(
        { error: "Unable to save your application right now." },
        { status: 502 }
      )
    }

    try {
      await jobs.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { applicationCount: 1 } }
      )
    } catch (error) {
      console.error("[Application count update error]", error)
    }

    return Response.json({ applied: true }, { status: 201 })
  } catch (error) {
    console.error("[Apply to job error]", error)
    return Response.json(
      { error: "Unable to submit your application right now." },
      { status: 500 }
    )
  }
}
