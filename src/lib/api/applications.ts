import "server-only"

import type { JobApplication, ApplicationStatus } from "@/lib/types/application"
import type { JobType } from "@/lib/job-options"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function normalizeStatus(value: unknown): ApplicationStatus {
  if (typeof value !== "string") return "Applied"

  const status = value.toLowerCase()
  if (status === "review" || status === "in review") return "Review"
  if (status === "shortlisted") return "Shortlisted"
  if (status === "interview" || status === "interviewing") return "Interview"
  if (status === "offered" || status === "offer") return "Offered"
  if (status === "rejected") return "Rejected"
  if (status === "withdrawn") return "Withdrawn"
  return "Applied"
}

function normalizeJobType(value: unknown): JobType {
  if (
    value === "full-time" ||
    value === "part-time" ||
    value === "contract" ||
    value === "internship"
  ) {
    return value
  }
  return "full-time"
}

function normalizeApplication(value: unknown): JobApplication | null {
  if (!isRecord(value) || typeof value.applicantId !== "string") return null

  const jobId =
    typeof value.jobId === "string" ? value.jobId : String(value.jobId ?? "")
  if (!jobId) return null

  return {
    _id:
      typeof value._id === "string"
        ? value._id
        : `${jobId}:${value.applicantId}`,
    jobId,
    jobTitle: typeof value.jobTitle === "string" ? value.jobTitle : "Job listing",
    companyName:
      typeof value.companyName === "string" ? value.companyName : "Company",
    category: typeof value.category === "string" ? value.category : "other",
    jobType: normalizeJobType(value.jobType),
    location: typeof value.location === "string" ? value.location : "Not specified",
    remoteAllowed: value.remoteAllowed === true,
    applicantId: value.applicantId,
    applicantName:
      typeof value.applicantName === "string" ? value.applicantName : "",
    applicantEmail:
      typeof value.applicantEmail === "string" ? value.applicantEmail : "",
    status: normalizeStatus(value.status),
    createdAt:
      typeof value.createdAt === "string"
        ? value.createdAt
        : value.createdAt instanceof Date
          ? value.createdAt.toISOString()
          : new Date(0).toISOString(),
    updatedAt:
      typeof value.updatedAt === "string" ? value.updatedAt : undefined,
    isArchived: value.isArchived === true,
  }
}

export async function getApplicationsForUser(
  applicantId: string
): Promise<JobApplication[]> {
  const apiBaseUrl =
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000"
  const query = new URLSearchParams({ userId: applicantId })
  const response = await fetch(
    `${apiBaseUrl.replace(/\/$/, "")}/applications?${query.toString()}`,
    { cache: "no-store" }
  )

  if (!response.ok) {
    throw new Error("Unable to load your applications.")
  }

  const result: unknown = await response.json()
  if (!Array.isArray(result)) return []

  return result
    .filter(
      (application) =>
        isRecord(application) && application.applicantId === applicantId
    )
    .map(normalizeApplication)
    .filter((application): application is JobApplication => application !== null)
}
