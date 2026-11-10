import React from "react"
import { requireDashboardRole } from "@/lib/dashboard-auth"

const RecruiterDashboardPage = async () => {
  await requireDashboardRole("recruiter")

  return (
    <div>
      <h2>Recruiter Dashboard</h2>
    </div>
  )
}

export default RecruiterDashboardPage
