import React from "react"
import { requireDashboardRole } from "@/lib/dashboard-auth"

const SeekerDashboardPage = async () => {
  await requireDashboardRole("seeker")

  return (
    <div>
      <h2>Seeker Dashboard</h2>
    </div>
  )
}

export default SeekerDashboardPage
