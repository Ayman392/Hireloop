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

export const deleteJob = async (id: string) => {
  const res = await fetch(`/api/jobs/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })

  const result = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(result?.message ?? result?.error ?? "Unable to delete this job.")
  }

  if (result?.deletedCount === 0) {
    throw new Error("This job was not found. Refresh the page and try again.")
  }

  return result
}
