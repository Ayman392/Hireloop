import Link from "next/link"
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  EllipsisVertical,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react"

import type { JobFormData } from "@/components/recruiter/NewJobForm"

type JobStatus = "Active" | "Ended"
type JobPost = JobFormData & {
  id: string
  department: string
  status: JobStatus
  applicants: number
  postedNote: string
}

const sampleJobs: JobPost[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    companyName: "HirePulse Network",
    category: "engineering-tech",
    department: "Engineering",
    jobType: "full-time",
    remoteAllowed: true,
    location: "New York, USA",
    applicationDeadline: "2025-05-30",
    minimumRate: 25,
    maximumRate: 40,
    payFrequency: "hour",
    responsibilities: "Build and maintain product interfaces.",
    qualifications: "Experience with React and TypeScript.",
    status: "Active",
    applicants: 34,
    postedNote: "Posted 14 days ago",
  },
  {
    id: "job-2",
    title: "Senior Product Designer",
    companyName: "HirePulse Labs",
    category: "design",
    department: "Design",
    jobType: "full-time",
    remoteAllowed: false,
    location: "London, UK (Hybrid)",
    applicationDeadline: "2025-06-14",
    minimumRate: 90000,
    maximumRate: 115000,
    payFrequency: "year",
    responsibilities: "Lead product design across the full user journey.",
    qualifications: "A strong portfolio and product design experience.",
    status: "Active",
    applicants: 19,
    postedNote: "Posted 7 days ago",
  },
  {
    id: "job-3",
    title: "DevOps Specialist",
    companyName: "HirePulse Platform",
    category: "engineering-tech",
    department: "Infrastructure",
    jobType: "full-time",
    remoteAllowed: false,
    location: "Berlin, Germany",
    applicationDeadline: "2025-06-30",
    minimumRate: 95000,
    maximumRate: 120000,
    payFrequency: "year",
    responsibilities: "Improve cloud infrastructure and deployment workflows.",
    qualifications: "Experience with cloud platforms and CI/CD.",
    status: "Active",
    applicants: 12,
    postedNote: "Posted 3 days ago",
  },
  {
    id: "job-4",
    title: "Product Marketing Lead",
    companyName: "HirePulse Network",
    category: "marketing",
    department: "Marketing",
    jobType: "full-time",
    remoteAllowed: true,
    location: "EU / US",
    applicationDeadline: "2025-07-15",
    minimumRate: 80000,
    maximumRate: 105000,
    payFrequency: "year",
    responsibilities: "Shape messaging and go-to-market campaigns.",
    qualifications: "Experience leading product marketing programs.",
    status: "Active",
    applicants: 27,
    postedNote: "Posted 5 days ago",
  },
  {
    id: "job-5",
    title: "QA Automation Engineer",
    companyName: "HirePulse Platform",
    category: "quality-assurance",
    department: "Quality",
    jobType: "part-time",
    remoteAllowed: false,
    location: "Dublin, Ireland (Hybrid)",
    applicationDeadline: "2025-05-01",
    minimumRate: 35,
    maximumRate: 50,
    payFrequency: "hour",
    responsibilities: "Create and maintain automated test coverage.",
    qualifications: "Experience with test automation frameworks.",
    status: "Ended",
    applicants: 8,
    postedNote: "Closed",
  },
]

const departmentColors = [
  "text-[#a99dff] bg-[#7168ff]/15",
  "text-orange-300 bg-orange-400/10",
  "text-sky-300 bg-sky-400/10",
  "text-violet-300 bg-violet-400/10",
  "text-blue-300 bg-blue-400/10",
]

function formatRate(value: number | null) {
  if (value === null) return null
  return value >= 1000 && value % 1000 === 0
    ? `${value / 1000}k`
    : new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)
}

function formatPay(job: JobFormData) {
  const amounts = [job.minimumRate, job.maximumRate]
    .map(formatRate)
    .filter((amount): amount is string => amount !== null)
    .map((amount) => `€${amount}`)
    .join(" – ")
  if (!amounts) return "Not specified"

  const frequency = { hour: "/ hr", month: "/ mo", year: "/ yr" }[
    job.payFrequency
  ]
  return `${amounts}${frequency}`
}

function formatDeadline(value: string | null) {
  if (!value) return "No deadline"
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`))
}

function StatusPill({ status }: { status: JobStatus }) {
  const active = status === "Active"
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
        active
          ? "bg-emerald-400/10 text-emerald-300"
          : "bg-white/[0.06] text-white/55"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          active ? "bg-emerald-400" : "bg-white/40"
        }`}
      />
      {status}
    </span>
  )
}

export function ManageJobs() {
  return (
    <section className="mx-auto min-h-[calc(100svh-1rem)] w-full max-w-7xl px-4 py-7 text-white sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center gap-1.5 text-[10px] text-white/45"
          >
            <Link
              href="/dashboard/recruiter"
              className="transition-colors hover:text-white/80"
            >
              Manage Jobs
            </Link>
            <ChevronRight className="size-3" aria-hidden="true" />
            <span className="text-[#a99dff]">Job Listings &amp; Postings</span>
          </nav>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-xs text-white/45">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex h-9 items-center justify-center gap-1.5 self-start whitespace-nowrap rounded-lg bg-[#6258f5] px-3.5 text-xs font-medium text-white transition hover:bg-[#7067ff] sm:self-auto"
        >
          <Plus className="size-3.5" aria-hidden="true" />
          New Job Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111113]">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[1050px] table-fixed text-left">
            <colgroup>
              <col className="w-[17%]" />
              <col className="w-[17%]" />
              <col className="w-[8%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
              <col className="w-[7%]" />
              <col className="w-[11%]" />
              <col className="w-[18%]" />
            </colgroup>
            <thead className="bg-[#171719] text-[9px] font-medium uppercase tracking-[0.08em] text-white/45">
              <tr>
                <th className="px-3 py-3">Job title &amp; dept</th>
                <th className="px-3 py-3">Company &amp; location</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Compensation</th>
                <th className="px-3 py-3">Applicants</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Deadline</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {sampleJobs.map((job, index) => (
                <tr key={job.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-3 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-md ${departmentColors[index]}`}
                      >
                        <BriefcaseBusiness className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[10px] font-semibold text-white/90">
                          {job.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[9px] text-white/45">
                          {job.department}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="block truncate text-[10px] font-medium text-white/80">
                      {job.companyName}
                    </span>
                    <span className="mt-0.5 flex min-w-0 items-center gap-1 text-[9px] text-white/45">
                      {job.remoteAllowed ? (
                        <BriefcaseBusiness
                          className="size-3 shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <MapPin className="size-3 shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate">
                        {job.remoteAllowed ? `Remote (${job.location})` : job.location}
                      </span>
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-white/[0.06] px-2 py-1 text-[9px] text-white/65">
                      {job.jobType === "full-time" ? "Full-time" : "Part-time"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-[9px] text-white/75">
                    {formatPay(job)}
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1 whitespace-nowrap text-[9px] text-[#c3bcff]">
                      <Users className="size-3" aria-hidden="true" />
                      {job.applicants} Candidates
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <StatusPill status={job.status} />
                  </td>
                  <td className="px-3 py-3">
                    <span className="block whitespace-nowrap text-[9px] text-white/75">
                      {formatDeadline(job.applicationDeadline)}
                    </span>
                    <span className="mt-0.5 block text-[8px] text-white/35">
                      {job.postedNote}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`Update ${job.title}`}
                        title="Update job"
                        className="inline-flex h-6 items-center gap-1 rounded-md bg-[#6258f5]/20 px-2 text-[9px] font-medium text-[#b9b2ff] transition hover:bg-[#6258f5]/35"
                      >
                        <Pencil className="size-2.5" aria-hidden="true" />
                        Update
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${job.title}`}
                        title="Delete job"
                        className="flex size-6 items-center justify-center rounded-md border border-white/10 text-white/45 transition hover:border-red-400/30 hover:text-red-300"
                      >
                        <Trash2 className="size-3" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={`More actions for ${job.title}`}
                        title="More actions"
                        className="flex size-6 items-center justify-center rounded-md text-white/45 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <EllipsisVertical className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="divide-y divide-white/[0.06] md:hidden">
          {sampleJobs.map((job, index) => (
            <li key={job.id} className="space-y-3 px-4 py-4">
              <div className="flex items-start gap-3">
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${departmentColors[index]}`}
                >
                  <BriefcaseBusiness className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-sm font-medium text-white/90">{job.title}</h2>
                    <StatusPill status={job.status} />
                  </div>
                  <p className="mt-1 text-xs text-white/45">
                    {job.department} <span aria-hidden="true">·</span> {job.companyName}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-white/45">
                    <MapPin className="size-3" aria-hidden="true" />
                    {job.remoteAllowed ? `Remote (${job.location})` : job.location}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 pl-12 text-xs text-white/55">
                <span>{job.jobType === "full-time" ? "Full-time" : "Part-time"}</span>
                <span>{formatPay(job)}</span>
                <span className="flex items-center gap-1.5 text-[#c3bcff]">
                  <Users className="size-3.5" aria-hidden="true" />
                  {job.applicants} Candidates
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {formatDeadline(job.applicationDeadline)}
                </span>
              </div>
              <div className="flex justify-end gap-2 pl-12">
                <button
                  type="button"
                  aria-label={`Update ${job.title}`}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#6258f5]/20 px-3 text-xs text-[#b9b2ff]"
                >
                  <Pencil className="size-3" aria-hidden="true" />
                  Update
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${job.title}`}
                  className="flex size-8 items-center justify-center rounded-md border border-white/10 text-white/45"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
