import type { ReactNode } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react"

import type { JobListing } from "@/lib/api/jobs"
import { ApplyJobButton } from "@/components/jobs/ApplyJobButton"

function getSalary(job: JobListing) {
  if (job.minimumRate === null && job.maximumRate === null) {
    return "Not specified"
  }

  const formatRate = (rate: number | null) =>
    rate === null ? null : `$${new Intl.NumberFormat("en-US").format(rate)}`
  const minimum = formatRate(job.minimumRate)
  const maximum = formatRate(job.maximumRate)
  const range =
    minimum && maximum ? `${minimum} – ${maximum}` : minimum ?? maximum
  const period =
    job.payFrequency === "hour"
      ? "/ hour"
      : job.payFrequency === "month"
        ? "/ month"
        : "/ year"

  return `${range} ${period}`
}

function DetailTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#131316] p-4">
      <div className="flex items-center gap-2 text-white/50">
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium capitalize text-white">{value}</p>
    </div>
  )
}

function DetailsSection({ title, content }: { title: string; content: string }) {
  return (
    <section className="border-b border-white/[0.07] py-5 last:border-0 last:pb-0">
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-xs leading-6 text-white/60">
        {content.trim() || "No details provided."}
      </p>
    </section>
  )
}

export default function JobCard({
  job,
  userRole,
}: {
  job: JobListing
  userRole: string | null
}) {
  const companyInitials = job.companyName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
  const location = job.remoteAllowed
    ? `Remote · ${job.location}`
    : job.location

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/browse-jobs"
        className="mb-5 inline-flex items-center gap-2 text-xs text-white/55 transition-colors hover:text-white"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to jobs
      </Link>

      <header className="flex flex-wrap items-center gap-4 rounded-xl border border-white/[0.07] bg-[#131316] p-5 sm:p-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-[#1d1d21] text-sm font-semibold text-white/75">
          {companyInitials || <Building2 aria-hidden="true" className="size-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold text-white sm:text-xl">
            {job.title}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/55">
            <span>{job.companyName}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{job.postedNote}</span>
            <span className="text-emerald-400">{job.status}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Save job"
            className="flex size-10 items-center justify-center rounded-lg border border-white/[0.08] text-white/65 hover:bg-white/[0.06] hover:text-white"
          >
            <Bookmark aria-hidden="true" className="size-4" />
          </button>
          <ApplyJobButton
            jobId={job.id}
            canApply={job.status === "Active"}
            userRole={userRole}
          />
        </div>
      </header>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DetailTile
          icon={<BriefcaseBusiness aria-hidden="true" className="size-4" />}
          label="Salary range"
          value={getSalary(job)}
        />
        <DetailTile
          icon={<MapPin aria-hidden="true" className="size-4" />}
          label="Location"
          value={location}
        />
        <DetailTile
          icon={<BriefcaseBusiness aria-hidden="true" className="size-4" />}
          label="Job type"
          value={job.jobType.replaceAll("-", " ")}
        />
        <DetailTile
          icon={<CalendarDays aria-hidden="true" className="size-4" />}
          label="Application deadline"
          value={job.applicationDeadline ?? "Not specified"}
        />
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-xl border border-white/[0.07] bg-[#131316] px-5 sm:px-6">
          <DetailsSection
            title="Responsibilities"
            content={job.responsibilities}
          />
          <DetailsSection title="Requirements" content={job.qualifications} />
        </article>

        <aside className="rounded-xl border border-white/[0.07] bg-[#131316] p-5">
          <h2 className="text-sm font-semibold text-white">Company overview</h2>
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/[0.06] bg-[#1a1a1e] p-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#25252a] text-xs font-semibold text-white/70">
              {companyInitials || <Building2 aria-hidden="true" className="size-4" />}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {job.companyName}
              </p>
              <p className="mt-1 truncate text-xs text-white/50">
                {job.department || job.category}
              </p>
            </div>
          </div>
          <dl className="mt-4 space-y-3">
            <div className="flex justify-between gap-3 text-xs">
              <dt className="text-white/45">Category</dt>
              <dd className="text-right text-white/75">
                {job.department || job.category}
              </dd>
            </div>
            <div className="flex justify-between gap-3 text-xs">
              <dt className="text-white/45">Location</dt>
              <dd className="text-right text-white/75">{location}</dd>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <dt className="inline-flex items-center gap-1.5 text-white/45">
                <Users aria-hidden="true" className="size-3.5" />
                Applicants
              </dt>
              <dd className="text-white/75">{job.applicants}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  )
}
