import { MongoClient, ObjectId } from "mongodb"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

const databaseUri = process.env.BETTER_AUTH_DB_URI
if (!databaseUri) {
  throw new Error("Missing BETTER_AUTH_DB_URI.")
}

const client = new MongoClient(databaseUri)
const clientPromise = client.connect()

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  })

  if (!session) {
    return Response.json({ error: "Sign in to delete a job." }, { status: 401 })
  }

  if (session.user.role !== "recruiter") {
    return Response.json(
      { error: "Only recruiter accounts can delete jobs." },
      { status: 403 }
    )
  }

  const { id } = await params
  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid job ID." }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const result = await client
      .db("hireloopdb")
      .collection("jobs")
      .deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return Response.json(
        { error: "Job not found." },
        { status: 404 }
      )
    }

    return Response.json({ deletedCount: result.deletedCount })
  } catch (error) {
    console.error("[Delete job error]", error)
    return Response.json(
      { error: "Unable to delete the job right now." },
      { status: 500 }
    )
  }
}
