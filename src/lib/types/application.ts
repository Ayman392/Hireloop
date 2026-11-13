import type { JobType } from "@/lib/job-options"

export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Interview"
  | "Offered"
  | "Rejected"

export type JobApplication = {
  _id: string
  jobId: string
  jobTitle: string
  companyName: string
  category: string
  jobType: JobType
  location: string
  remoteAllowed: boolean
  applicantId: string
  applicantName: string
  applicantEmail: string
  status: ApplicationStatus
  createdAt: string
  updatedAt?: string
  isArchived: boolean
}
