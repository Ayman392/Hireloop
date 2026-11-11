import { MongoClient } from "mongodb"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

const databaseUri = process.env.BETTER_AUTH_DB_URI
if (!databaseUri) {
  throw new Error("Missing BETTER_AUTH_DB_URI.")
}

const client = new MongoClient(databaseUri)
const clientPromise = client.connect()

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  })

  if (!session) {
    return Response.json({ error: "Sign in to publish a job." }, { status: 401 })
  }

  if (session.user.role !== "recruiter") {
    return Response.json(
      { error: "Only recruiter accounts can publish jobs." },
      { status: 403 }
    )
  }

  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 })
  }

  const requiredFields = [
    "title",
    "companyName",
    "category",
    "jobType",
    "location",
    "responsibilities",
    "qualifications",
  ]
  if (
    requiredFields.some(
      (field) => typeof data[field] !== "string" || !data[field].trim()
    )
  ) {
    return Response.json(
      { error: "Please complete all required job fields." },
      { status: 400 }
    )
  }

  try {
    const client = await clientPromise
    const result = await client.db("hireloopdb").collection("jobs").insertOne({
      ...data,
      recruiterId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return Response.json({ id: result.insertedId.toString() }, { status: 201 })
  } catch (error) {
    console.error("[Create job error]", error)
    return Response.json({ error: "Unable to save the job right now." }, { status: 500 })
  }
}
