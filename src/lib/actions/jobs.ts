import type { JobFormData } from "@/components/recruiter/NewJobForm"

export const createJob = async (data: JobFormData) => {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(result?.error ?? "Unable to publish this job.")
  }

  return result
}
