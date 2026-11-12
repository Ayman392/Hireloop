import type { ReactNode } from "react"
import { Bookmark, BriefcaseBusiness, MapPin } from "lucide-react"
import type { JobListing } from "@/lib/api/jobs"

function formatPay(job: JobListing) {
  if (job.minimumRate === null && job.maximumRate === null) return null

  const formatRate = (rate: number | null) =>
    rate === null ? null : `$${new Intl.NumberFormat("en-US").format(rate)}`
  const minimum = formatRate(job.minimumRate)
  const maximum = formatRate(job.maximumRate)
  const range = minimum && maximum ? `${minimum} - ${maximum}` : minimum ?? maximum
  const frequency =
    job.payFrequency === "hour"
      ? "/hr"
      : job.payFrequency === "month"
        ? "/mo"
        : "/yr"

  return `${range}${frequency}`
}

export function JobCard({ job }: { job: JobListing }) {
  const pay = formatPay(job)
  const initials = job.companyName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()

  return (
    <article className="flex gap-3.5 rounded-xl border border-white/[0.06] bg-[#131316] p-4 transition-colors hover:border-white/[0.12] sm:gap-4 sm:p-5">
      <div
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-[#1d1d21] text-xs font-semibold text-white/65"
      >
        {initials || "J"}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white sm:text-base">
              {job.title}
            </h3>
            <p className="mt-1 truncate text-xs text-white/50">
              {job.companyName}
              <span className="px-1.5 text-white/25">&middot;</span>
              {job.location}
              {job.remoteAllowed && <span> (Remote)</span>}
            </p>
          </div>
          <button
            aria-label={`Save ${job.title}`}
            className="-mr-1 -mt-1 rounded-md p-1.5 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white"
            type="button"
          >
            <Bookmark aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {pay && (
            <JobTag icon={<BriefcaseBusiness className="size-3" />}>
              {pay}
            </JobTag>
          )}
          <JobTag icon={<BriefcaseBusiness className="size-3" />}>
            {job.jobType.replaceAll("-", " ")}
          </JobTag>
          <JobTag icon={<MapPin className="size-3" />}>
            {job.department || job.category}
          </JobTag>
        </div>
      </div>
    </article>
  )
}

function JobTag({
  children,
  icon,
}: {
  children: ReactNode
  icon: ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[10px] capitalize text-white/65">
      {icon}
      {children}
    </span>
  )
}
