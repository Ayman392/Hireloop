export type JobType = "full-time" | "part-time" | "contract" | "internship"
export type PayFrequency = "hour" | "month" | "year"

export const jobTypes: { value: JobType; label: string }[] = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

export const jobCategories = [
  { value: "engineering-tech", label: "Engineering & Tech" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "finance", label: "Finance" },
  { value: "human-resources", label: "Human Resources" },
  { value: "other", label: "Other" },
] as const

export const payFrequencies: { value: PayFrequency; label: string }[] = [
  { value: "hour", label: "Hourly" },
  { value: "month", label: "Monthly" },
  { value: "year", label: "Yearly" },
]
