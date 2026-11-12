import "server-only"

import { MongoClient, type Document } from "mongodb"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import type { JobFormData } from "@/components/recruiter/NewJobForm"

type JobStatus = "Active" | "Ended"

export type JobListing = JobFormData & {
  id: string
  _id: string
  department: string
  status: JobStatus
  applicants: number
  postedNote: string
}

type ApiJob = Partial<JobFormData> & {
  _id?: string | { toString(): string }
  id?: string
  department?: string
  status?: string
  applicants?: number | unknown[]
  createdAt?: string | Date
  postedAt?: string | Date
}

const databaseUri = process.env.BETTER_AUTH_DB_URI
let mongoClientPromise: Promise<MongoClient> | undefined

function getMongoClient() {
  if (!databaseUri) {
    throw new Error("Missing BETTER_AUTH_DB_URI for the jobs fallback.")
  }

  mongoClientPromise ??= new MongoClient(databaseUri).connect()
  return mongoClientPromise
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function getDepartment(category: string) {
  const departments: Record<string, string> = {
    "engineering-tech": "Engineering",
    design: "Design",
    "design-creative": "Design",
    marketing: "Marketing",
    sales: "Sales",
    finance: "Finance",
    "human-resources": "Human Resources",
    "quality-assurance": "Quality",
    other: "Other",
  }

  return departments[category.toLowerCase()] ?? category
}

function toNullableNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return null
}

function getPostedNote(dateValue?: string | Date) {
  if (!dateValue) return "Recently posted"
  const timestamp = new Date(dateValue).getTime()
  if (!Number.isFinite(timestamp)) return "Recently posted"

  const daysAgo = Math.max(0, Math.floor((Date.now() - timestamp) / 86_400_000))
  if (daysAgo === 0) return "Posted today"
  if (daysAgo === 1) return "Posted 1 day ago"
  return `Posted ${daysAgo} days ago`
}

function normalizeJob(value: unknown, index: number): JobListing | null {
  if (!isRecord(value)) return null
  const job = value as ApiJob
  if (typeof job.title !== "string" || typeof job.companyName !== "string") {
    return null
  }

  const category = typeof job.category === "string" ? job.category : "other"
  const applicationDeadline =
    typeof job.applicationDeadline === "string" && job.applicationDeadline
      ? job.applicationDeadline.slice(0, 10)
      : null
  const deadlineHasPassed =
    applicationDeadline !== null &&
    new Date(`${applicationDeadline}T23:59:59Z`).getTime() < Date.now()
  const status: JobStatus =
    job.status?.toLowerCase() === "ended" ||
    job.status?.toLowerCase() === "closed" ||
    deadlineHasPassed
      ? "Ended"
      : "Active"
  const jobType = ["full-time", "part-time", "contract", "internship"].includes(
    job.jobType ?? ""
  )
    ? (job.jobType as JobFormData["jobType"])
    : "full-time"
  const payFrequency = ["hour", "month", "year"].includes(
    job.payFrequency ?? ""
  )
    ? (job.payFrequency as JobFormData["payFrequency"])
    : "year"
  const applicants = Array.isArray(job.applicants)
    ? job.applicants.length
    : typeof job.applicants === "number"
      ? job.applicants
      : 0
  const id = job.id ?? job._id?.toString() ?? `${job.title}-${index}`
  const postedAt = job.createdAt ?? job.postedAt

  return {
    id,
    _id: id,
    title: job.title,
    companyName: job.companyName,
    category,
    department: job.department ?? getDepartment(category),
    jobType,
    remoteAllowed: job.remoteAllowed === true,
    location: typeof job.location === "string" ? job.location : "Not specified",
    applicationDeadline,
    minimumRate: toNullableNumber(job.minimumRate),
    maximumRate: toNullableNumber(job.maximumRate),
    payFrequency,
    responsibilities:
      typeof job.responsibilities === "string" ? job.responsibilities : "",
    qualifications:
      typeof job.qualifications === "string" ? job.qualifications : "",
    status,
    applicants,
    postedNote: status === "Ended" ? "Closed" : getPostedNote(postedAt),
  }
}

export async function getJobs(query = ""): Promise<JobListing[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  })
  if (!session || session.user.role !== "recruiter") return []

  const client = await getMongoClient()
  const records = await client
    .db("hireloopdb")
    .collection<Document>("jobs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  const jobs = records
    .map(normalizeJob)
    .filter((job): job is JobListing => job !== null)

  const filters = new URLSearchParams(query)
  const category = filters.get("category")?.trim().toLowerCase()
  const jobType = filters.get("job-type")?.trim().toLowerCase()
  const remote = filters.get("isRemote")?.trim().toLowerCase()

  return jobs.filter((job) => {
    if (category && job.category.toLowerCase() !== category) return false
    if (jobType && job.jobType.toLowerCase() !== jobType) return false
    if (remote === "true" && !job.remoteAllowed) return false
    if (remote === "false" && job.remoteAllowed) return false
    return true
  })
}
