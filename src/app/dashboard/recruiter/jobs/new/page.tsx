import React from "react"
import { requireDashboardRole } from "@/lib/dashboard-auth"

const NewJobPage = async () => {
  await requireDashboardRole("recruiter")

  return (
    <div>
      <h2>New Job Posting</h2>
    </div>
  )
}

export default NewJobPage
