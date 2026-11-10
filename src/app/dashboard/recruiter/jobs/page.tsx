import React from "react"
import { requireDashboardRole } from "@/lib/dashboard-auth"

const ManageJobsPage = async () => {
  await requireDashboardRole("recruiter")

  return (
    <div>
      <h2>Manage Jobs</h2>
    </div>
  )
}

export default ManageJobsPage
