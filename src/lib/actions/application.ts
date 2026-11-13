type ApplyToJobResponse = {
  applied?: boolean
  error?: string
}

export class ApplyToJobError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly alreadyApplied: boolean
  ) {
    super(message)
    this.name = "ApplyToJobError"
  }
}

export async function applyToJob(jobId: string): Promise<void> {
  const response = await fetch(
    `/api/jobs/${encodeURIComponent(jobId)}/apply`,
    { method: "POST" }
  )
  const result = (await response.json().catch(() => null)) as
    | ApplyToJobResponse
    | null

  if (!response.ok) {
    throw new ApplyToJobError(
      result?.error ?? "Unable to submit your application.",
      response.status,
      result?.applied === true
    )
  }
}
