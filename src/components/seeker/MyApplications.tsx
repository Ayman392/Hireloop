"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Search,
} from "lucide-react"

import type {
  ApplicationStatus,
  JobApplication,
} from "@/lib/types/application"

type ApplicationTab = "Active" | "Archived"

const PAGE_SIZE = 5

const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "bg-white/[0.08] text-white/70",
  Review: "bg-amber-400/15 text-amber-300",
  Shortlisted: "bg-sky-400/15 text-sky-300",
  Interview: "bg-violet-400/15 text-violet-300",
  Rejected: "bg-red-400/15 text-red-300",
  Offered: "bg-emerald-400/15 text-emerald-300",
  Withdrawn: "bg-white/[0.08] text-white/55",
}

function getRelativeDate(date: string) {
  const elapsed = Math.max(0, Date.now() - new Date(date).getTime())
  const minutes = Math.floor(elapsed / 60_000)
  if (minutes < 60) return `${Math.max(1, minutes)} minutes ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`

  const weeks = Math.floor(days / 7)
  return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
}

function MetricCard({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#141417] px-4 py-3">
      <p className="text-[11px] text-white/45">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${valueClassName ?? "text-white"}`}>
        {value}
      </p>
    </div>
  )
}

export function MyApplications({
  applications,
  loadError,
}: {
  applications: JobApplication[]
  loadError: boolean
}) {
  const [tab, setTab] = useState<ApplicationTab>("Active")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const activeApplications = applications.filter(
    (application) => !application.isArchived
  )
  const shortlistedCount = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length
  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length
  const offerCount = applications.filter(
    (application) => application.status === "Offered"
  ).length
  const successRate = applications.length
    ? Math.round((offerCount / applications.length) * 100)
    : 0

  const visibleApplications = useMemo(() => {
    const query = search.trim().toLowerCase()
    return applications.filter((application) => {
      const matchesTab =
        tab === "Archived" ? application.isArchived : !application.isArchived
      const matchesSearch =
        !query ||
        `${application.jobTitle} ${application.companyName}`
          .toLowerCase()
          .includes(query)
      return matchesTab && matchesSearch
    })
  }, [applications, search, tab])

  const pageCount = Math.max(1, Math.ceil(visibleApplications.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageApplications = visibleApplications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )
  const firstVisible = visibleApplications.length
    ? (currentPage - 1) * PAGE_SIZE + 1
    : 0
  const lastVisible = Math.min(
    currentPage * PAGE_SIZE,
    visibleApplications.length
  )
  const pageNumbers = Array.from(
    { length: Math.min(pageCount, 3) },
    (_, index) => index + 1
  )

  function changeTab(nextTab: ApplicationTab) {
    setTab(nextTab)
    setPage(1)
  }

  function changeSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  return (
    <section className="min-h-[calc(100svh-3rem)] bg-[#0d0d0f] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-7 flex items-center justify-between gap-4">
          <label className="flex h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-white/[0.08] bg-[#111114] px-3 text-white/45">
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <input
              aria-label="Search applications"
              className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/35"
              onChange={(event) => changeSearch(event.currentTarget.value)}
              placeholder="Search applications..."
              value={search}
            />
          </label>
          <div className="flex shrink-0 items-center gap-3 text-white/55">
            <button
              aria-label="Notifications"
              className="rounded-md p-2 hover:bg-white/[0.06] hover:text-white"
              type="button"
            >
              <Bell aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Messages"
              className="rounded-md p-2 hover:bg-white/[0.06] hover:text-white"
              type="button"
            >
              <Mail aria-hidden="true" className="size-4" />
            </button>
            <div className="flex size-8 items-center justify-center rounded-full bg-[#29292e] text-[10px] font-semibold text-white/75">
              AM
            </div>
          </div>
        </header>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              My Applications
            </h1>
            <p className="mt-1 text-xs text-white/50">
              Track your job applications and interview progress in real time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-white/[0.08] bg-[#141417] p-1">
              {(["Active", "Archived"] as const).map((item) => (
                <button
                  key={item}
                  aria-pressed={tab === item}
                  className={`rounded-md px-3 py-1.5 text-[11px] transition-colors ${
                    tab === item
                      ? "bg-[#242429] text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                  onClick={() => changeTab(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-3 text-[11px] font-medium text-[#111113] transition-colors hover:bg-white/90"
              onClick={() => window.print()}
              type="button"
            >
              <Download aria-hidden="true" className="size-3.5" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <MetricCard label="Total Applied" value={String(applications.length)} />
          <MetricCard label="Shortlisted" value={String(shortlistedCount)} />
          <MetricCard
            label="Interviews"
            value={String(interviewCount)}
            valueClassName="text-amber-300"
          />
          <MetricCard
            label="Success Rate"
            value={`${successRate}%`}
            valueClassName="text-emerald-400"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#141417]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">Your job applications</caption>
              <thead className="bg-white/[0.02] text-[10px] text-white/40">
                <tr>
                  <th className="px-4 py-3 font-medium">Job Title</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Applied</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {pageApplications.map((application) => (
                  <tr
                    key={application._id}
                    className="border-t border-white/[0.06] text-xs"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#242429] text-[10px] font-semibold text-white/70">
                          {application.companyName
                            .split(/\s+/)
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-white/85">
                            {application.jobTitle}
                          </span>
                          <span className="mt-1 block text-[10px] capitalize text-white/40">
                            {application.jobType.replaceAll("-", " ")} · {application.remoteAllowed ? "Remote" : "On-site"}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/65">
                      {application.companyName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-white/50">
                      {getRelativeDate(application.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${statusStyles[application.status]}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        className="text-[11px] text-white/60 transition-colors hover:text-white"
                        href={`/browse-jobs/${encodeURIComponent(application.jobId)}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
                {pageApplications.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-12 text-center text-xs text-white/45"
                      colSpan={5}
                    >
                      {loadError
                        ? "Applications could not be loaded. Please try again later."
                        : search.trim()
                          ? "No applications match your search."
                          : `No ${tab.toLowerCase()} applications found for this account.`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3">
            <p className="text-[10px] text-white/40">
              Showing {firstVisible}–{lastVisible} of {visibleApplications.length} applications
            </p>
            <nav aria-label="Application pages" className="flex items-center gap-1">
              <button
                aria-label="Previous page"
                className="flex size-7 items-center justify-center rounded-md border border-white/[0.08] text-white/45 hover:bg-white/[0.06] disabled:opacity-35"
                disabled={currentPage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                type="button"
              >
                <ChevronLeft aria-hidden="true" className="size-3.5" />
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                  className={`size-7 rounded-md text-[10px] ${
                    currentPage === pageNumber
                      ? "bg-white font-semibold text-black"
                      : "border border-white/[0.08] text-white/55 hover:bg-white/[0.06]"
                  }`}
                  onClick={() => setPage(pageNumber)}
                  type="button"
                >
                  {pageNumber}
                </button>
              ))}
              {pageCount > 4 && <span className="px-1 text-[10px] text-white/40">…</span>}
              {pageCount > 3 && (
                <button
                  aria-current={currentPage === pageCount ? "page" : undefined}
                  className={`size-7 rounded-md text-[10px] ${
                    currentPage === pageCount
                      ? "bg-white font-semibold text-black"
                      : "border border-white/[0.08] text-white/55 hover:bg-white/[0.06]"
                  }`}
                  onClick={() => setPage(pageCount)}
                  type="button"
                >
                  {pageCount}
                </button>
              )}
              <button
                aria-label="Next page"
                className="flex size-7 items-center justify-center rounded-md border border-white/[0.08] text-white/45 hover:bg-white/[0.06] disabled:opacity-35"
                disabled={currentPage === pageCount}
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                type="button"
              >
                <ChevronRight aria-hidden="true" className="size-3.5" />
              </button>
            </nav>
          </footer>
        </div>
      </div>
    </section>
  )
}
