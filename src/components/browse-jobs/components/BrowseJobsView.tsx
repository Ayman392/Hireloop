"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { JobCard } from "@/components/browse-jobs/components/JobCard"
import { JobFilters } from "@/components/browse-jobs/components/JobFilters"
import { JobSearchBar } from "@/components/browse-jobs/components/JobSearchBar"
import { SiteNavbar } from "@/components/site-navbar"
import type { JobListing } from "@/lib/api/jobs"

function matchesSearch(job: JobListing, query: string) {
  const searchableFields = [
    job.title,
    job.companyName,
    job.location,
    job.category,
    job.department,
    job.jobType,
    job.responsibilities,
    job.qualifications,
  ]

  return searchableFields.some((field) =>
    field.toLocaleLowerCase().includes(query)
  )
}

export function BrowseJobsView({
  jobs,
  initialSearch,
  activeFilters,
}: {
  jobs: JobListing[]
  initialSearch: string
  activeFilters: Record<string, string[]>
}) {
  const router = useRouter()
  const normalizedQuery = initialSearch.trim().toLocaleLowerCase()
  const filteredJobs = normalizedQuery
    ? jobs.filter((job) => matchesSearch(job, normalizedQuery))
    : jobs

  function handleViewJobDetail(jobId: string) {
    router.push(`/browse-jobs/${encodeURIComponent(jobId)}`)
  }

  return (
    <main className="min-h-svh overflow-x-clip bg-[#080809] text-white">
      <SiteNavbar />

      <div className="mx-auto w-full max-w-[1320px] px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <JobSearchBar
          initialSearch={initialSearch}
          activeFilters={activeFilters}
        />

        <div className="mt-5 grid gap-5 lg:grid-cols-[270px_minmax(0,1fr)]">
          <JobFilters activeFilters={activeFilters} />

          <section aria-labelledby="browse-jobs-heading" className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h1
                id="browse-jobs-heading"
                className="text-sm font-semibold text-white/90"
              >
                Found {filteredJobs.length.toLocaleString()} Professional Jobs
              </h1>
              <label className="flex items-center gap-2 text-[11px] text-white/45">
                Sort by:
                <select
                  aria-label="Sort jobs"
                  className="h-8 rounded-lg border border-white/[0.08] bg-[#141416] px-2.5 text-xs text-white/80 outline-none focus-visible:border-[#6258f5]"
                  defaultValue="recent"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                </select>
              </label>
            </div>

            {filteredJobs.length > 0 ? (
              <ul className="space-y-3">
                {filteredJobs.map((job) => (
                  <li key={job._id}>
                    <JobCard job={job} onViewDetails={handleViewJobDetail} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-white/[0.07] bg-[#111113] px-5 py-12 text-center">
                <h2 className="text-sm font-medium text-white/85">
                  {normalizedQuery
                    ? "No matching jobs found"
                    : "No jobs to show yet"}
                </h2>
                <p className="mt-2 text-xs text-white/45">
                  {normalizedQuery
                    ? "Try another title, keyword, company, or location."
                    : "New opportunities will appear here when they are posted."}
                </p>
              </div>
            )}

            <nav
              aria-label="Job listing pages"
              className="mt-7 flex items-center justify-center gap-1.5"
            >
              <button
                aria-label="Previous page"
                className="flex size-8 items-center justify-center rounded-md border border-white/[0.08] text-white/60 hover:bg-white/[0.06]"
                type="button"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                aria-current="page"
                className="size-8 rounded-md bg-white text-xs font-semibold text-black"
                type="button"
              >
                1
              </button>
              <button
                className="size-8 rounded-md border border-white/[0.08] text-xs text-white/60 hover:bg-white/[0.06]"
                type="button"
              >
                2
              </button>
              <button
                className="size-8 rounded-md border border-white/[0.08] text-xs text-white/60 hover:bg-white/[0.06]"
                type="button"
              >
                3
              </button>
              <span className="px-1 text-xs text-white/45">&hellip;</span>
              <button
                className="size-8 rounded-md border border-white/[0.08] text-xs text-white/60 hover:bg-white/[0.06]"
                type="button"
              >
                42
              </button>
              <button
                aria-label="Next page"
                className="flex size-8 items-center justify-center rounded-md border border-white/[0.08] text-white/60 hover:bg-white/[0.06]"
                type="button"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </nav>
          </section>
        </div>
      </div>
    </main>
  )
}
