"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Globe,
  MapPin,
  Send,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { createJob } from "@/lib/actions/jobs"
import {
  jobCategories,
  jobTypes,
  type JobType,
  type PayFrequency,
} from "@/lib/job-options"
import { useRouter } from "next/navigation"

export type JobFormData = {
  title: string
  companyName: string
  category: string
  jobType: JobType
  remoteAllowed: boolean
  location: string
  applicationDeadline: string | null
  minimumRate: number | null
  maximumRate: number | null
  payFrequency: PayFrequency
  responsibilities: string
  qualifications: string
}

const fieldClassName =
  "h-11 border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 focus-visible:border-[#7168ff] focus-visible:ring-[#7168ff]/25"

const selectClassName =
  "h-11 w-full rounded-lg border border-white/10 bg-[#19191d] px-3 text-sm text-white outline-none transition-colors focus-visible:border-[#7168ff] focus-visible:ring-3 focus-visible:ring-[#7168ff]/25"

function readOptionalNumber(value: FormDataEntryValue | null) {
  const rawValue = String(value ?? "").trim()
  if (!rawValue) return null

  const numberValue = Number(rawValue)
  return Number.isFinite(numberValue) ? numberValue : null
}

export function NewJobForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const requiredFields = [
      ["Job title", formData.get("title")],
      ["Company name", formData.get("companyName")],
      ["Job category", formData.get("category")],
      ["Job location", formData.get("location")],
      ["Key responsibilities", formData.get("responsibilities")],
      ["Qualifications", formData.get("qualifications")],
    ] as const
    const missingField = requiredFields.find(
      ([, value]) => !String(value ?? "").trim()
    )?.[0]

    if (missingField) {
      setError(`Please complete the required field: ${missingField}.`)
      return
    }

    const minimumRate = readOptionalNumber(formData.get("minimumRate"))
    const maximumRate = readOptionalNumber(formData.get("maximumRate"))

    if (
      minimumRate !== null &&
      maximumRate !== null &&
      maximumRate < minimumRate
    ) {
      setError(
        "Maximum rate must be greater than or equal to the minimum rate."
      )
      return
    }

    const job: JobFormData = {
      title: String(formData.get("title") ?? "").trim(),
      companyName: String(formData.get("companyName") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      jobType: String(formData.get("jobType") ?? "full-time") as JobType,
      remoteAllowed: formData.get("remoteAllowed") === "on",
      location: String(formData.get("location") ?? "").trim(),
      applicationDeadline:
        String(formData.get("applicationDeadline") ?? "") || null,
      minimumRate,
      maximumRate,
      payFrequency: String(
        formData.get("payFrequency") ?? "year"
      ) as PayFrequency,
      responsibilities: String(formData.get("responsibilities") ?? "").trim(),
      qualifications: String(formData.get("qualifications") ?? "").trim(),
    }

    setIsSubmitting(true)
    try {
      await createJob(job)
      router.push("/dashboard/recruiter/jobs")
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to publish this job."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex items-center gap-2 text-xs text-white/45"
          >
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-white/80"
            >
              Manage Jobs
            </Link>
            <ChevronRight className="size-3" aria-hidden="true" />
            <span className="text-white/70">Create New Listing</span>
          </nav>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Post a New Job
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
            Fill in the position details to attract qualified talent across our
            network.
          </p>
        </div>

        <Button
          type="submit"
          form="new-job-form"
          disabled={isSubmitting}
          className="h-10 gap-2 bg-[#6258f5] px-4 text-white hover:bg-[#7067ff]"
        >
          <Send className="size-4" aria-hidden="true" />
          {isSubmitting ? "Publishing…" : "Publish Job"}
        </Button>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      )}

      <form
        id="new-job-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        <Card className="gap-0 border border-white/10 bg-[#111113] py-0 text-white shadow-none ring-0">
          <CardHeader className="flex flex-row items-center gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#6258f5]/15 text-xs font-semibold text-[#a7a1ff]">
              1
            </span>
            <div>
              <CardTitle className="text-sm font-semibold text-white">
                Basic Information
              </CardTitle>
              <p className="mt-1 text-xs text-white/45">
                Add the role and company details.
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-5 px-5 py-5 sm:px-6 sm:py-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="job-title" className="text-white/75">
                  Job title <span className="text-[#a7a1ff]">*</span>
                </Label>
                <Input
                  id="job-title"
                  name="title"
                  placeholder="e.g. Frontend Developer"
                  required
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-white/75">
                  Company name <span className="text-[#a7a1ff]">*</span>
                </Label>
                <Input
                  id="company-name"
                  name="companyName"
                  placeholder="Your company"
                  required
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-category" className="text-white/75">
                  Job category <span className="text-[#a7a1ff]">*</span>
                </Label>
                <select
                  id="job-category"
                  name="category"
                  defaultValue=""
                  required
                  className={selectClassName}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {jobCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-white/75">
                Job type <span className="text-[#a7a1ff]">*</span>
              </legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {jobTypes.map((jobType, index) => (
                  <label key={jobType.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="jobType"
                      value={jobType.value}
                      defaultChecked={index === 0}
                      className="peer sr-only"
                    />
                    <span className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] px-3 text-sm text-white/65 transition peer-checked:border-[#6258f5]/70 peer-checked:bg-[#6258f5]/15 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#8c85ff] hover:bg-white/[0.06]">
                      {jobType.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </CardContent>
        </Card>

        <Card className="gap-0 border border-white/10 bg-[#111113] py-0 text-white shadow-none ring-0">
          <CardHeader className="flex flex-row items-center gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#6258f5]/15 text-xs font-semibold text-[#a7a1ff]">
              2
            </span>
            <div>
              <CardTitle className="text-sm font-semibold text-white">
                Location, Compensation &amp; Timeline
              </CardTitle>
              <p className="mt-1 text-xs text-white/45">
                Set where the job is based and its pay range.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5">
              <span className="flex items-start gap-3">
                <Globe
                  className="mt-0.5 size-4 text-[#a7a1ff]"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-sm font-medium text-white/85">
                    Remote work allowed
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/45">
                    Enable worldwide or distributed candidate applications.
                  </span>
                </span>
              </span>
              <input
                type="checkbox"
                name="remoteAllowed"
                className="size-4 shrink-0 accent-[#7168ff]"
              />
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job-location" className="text-white/75">
                  Job location <span className="text-[#a7a1ff]">*</span>
                </Label>
                <div className="relative">
                  <MapPin
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/35"
                    aria-hidden="true"
                  />
                  <Input
                    id="job-location"
                    name="location"
                    placeholder="City, country"
                    required
                    className={`${fieldClassName} pl-9`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="application-deadline" className="text-white/75">
                  Application deadline
                </Label>
                <Input
                  id="application-deadline"
                  name="applicationDeadline"
                  type="date"
                  className={`${fieldClassName} [color-scheme:dark]`}
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="minimum-rate" className="text-white/75">
                  Min salary / rate
                </Label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-white/40">
                    €
                  </span>
                  <Input
                    id="minimum-rate"
                    name="minimumRate"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="25"
                    className={`${fieldClassName} pl-8`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maximum-rate" className="text-white/75">
                  Max salary / rate
                </Label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-white/40">
                    €
                  </span>
                  <Input
                    id="maximum-rate"
                    name="maximumRate"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="40"
                    className={`${fieldClassName} pl-8`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pay-frequency" className="text-white/75">
                  Frequency
                </Label>
                <select
                  id="pay-frequency"
                  name="payFrequency"
                  defaultValue="hour"
                  className={selectClassName}
                >
                  <option value="hour">Per hour</option>
                  <option value="month">Per month</option>
                  <option value="year">Per year</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0 border border-white/10 bg-[#111113] py-0 text-white shadow-none ring-0">
          <CardHeader className="flex flex-row items-center gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#6258f5]/15 text-xs font-semibold text-[#a7a1ff]">
              3
            </span>
            <div>
              <CardTitle className="text-sm font-semibold text-white">
                Responsibilities &amp; Requirements
              </CardTitle>
              <p className="mt-1 text-xs text-white/45">
                Describe the role and who will be a good fit.
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-5 px-5 py-5 sm:px-6 sm:py-6">
            <div className="space-y-2">
              <Label htmlFor="responsibilities" className="text-white/75">
                Key responsibilities <span className="text-[#a7a1ff]">*</span>
              </Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                placeholder="What will this person work on day to day?"
                required
                className="border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 focus-visible:border-[#7168ff] focus-visible:ring-[#7168ff]/25"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications" className="text-white/75">
                Qualifications &amp; requirements{" "}
                <span className="text-[#a7a1ff]">*</span>
              </Label>
              <Textarea
                id="qualifications"
                name="qualifications"
                placeholder="List the skills and experience candidates need."
                required
                className="border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 focus-visible:border-[#7168ff] focus-visible:ring-[#7168ff]/25"
              />
            </div>
          </CardContent>
        </Card>

      </form>
    </div>
  )
}
