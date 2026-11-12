import React from "react"
import { getJobs } from "@/lib/api/jobs"

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()
  const jobs = await getJobs(query)

  return (
    <div>
      <h1>Browse Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>{job.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default BrowseJobsPage
