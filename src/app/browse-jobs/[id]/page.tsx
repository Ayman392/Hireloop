import { notFound } from "next/navigation"

import JobCard from "@/components/JobCard"
import { SiteNavbar } from "@/components/site-navbar"
import { getJobs } from "@/lib/api/jobs"

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const jobs = await getJobs()
  const job = jobs.find((listing) => listing.id === id)

  if (!job) notFound()

  return (
    <main className="min-h-svh overflow-x-clip bg-[#080809] text-white">
      <SiteNavbar />
      <JobCard job={job} />
    </main>
  )
}
