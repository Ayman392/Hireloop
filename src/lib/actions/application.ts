type ApplyToJobResponse = {
  applied?: boolean
  error?: string
  paymentRequired?: boolean
}

export class ApplyToJobError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly alreadyApplied: boolean,
    readonly paymentRequired: boolean
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
      result?.applied === true,
      result?.paymentRequired === true
    )
  }
}

export async function getApplicationCount(userId: string): Promise<number> {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
  const query = new URLSearchParams({ userId })
  const response = await fetch(
    `${apiBaseUrl.replace(/\/$/, "")}/applications/count?${query.toString()}`,
    { cache: "no-store" }
  )

  if (!response.ok) {
    throw new Error("Unable to load the application count.")
  }

  const count: unknown = await response.json()
  if (typeof count !== "number" || !Number.isFinite(count)) {
    throw new Error("The application count response is invalid.")
  }

  return count
}
