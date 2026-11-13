import { notFound } from "next/navigation"
import { headers } from "next/headers"

import JobCard from "@/components/JobCard"
import { SiteNavbar } from "@/components/site-navbar"
import { auth } from "@/lib/auth"
import { getJobById } from "@/lib/api/jobs"

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [job, session] = await Promise.all([
    getJobById(id),
    auth.api.getSession({
      headers: await headers(),
      query: { disableCookieCache: true },
    }),
  ])

  if (!job) notFound()

  return (
    <main className="min-h-svh overflow-x-clip bg-[#080809] text-white">
      <SiteNavbar />
      <JobCard job={job} userRole={session?.user.role ?? null} />
    </main>
  )
}
