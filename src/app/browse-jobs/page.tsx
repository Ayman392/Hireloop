import { BrowseJobsView } from "@/components/browse-jobs/components/BrowseJobsView"
import { getJobs } from "@/lib/api/jobs"

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const initialSearch = typeof params.search === "string" ? params.search : ""
  const urlParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) urlParams.append(key, item)
    } else if (typeof value === "string") {
      urlParams.append(key, value)
    }
  }

  const activeFilters = Object.fromEntries(
    ["jobType", "category", "remoteAllowed"].map((key) => [
      key,
      urlParams.getAll(key),
    ])
  )
  const jobs = await getJobs(urlParams.toString())

  return (
    <BrowseJobsView
      key={urlParams.toString()}
      jobs={jobs}
      initialSearch={initialSearch}
      activeFilters={activeFilters}
    />
  )
}
