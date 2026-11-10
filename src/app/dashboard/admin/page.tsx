import React from "react"
import { requireDashboardRole } from "@/lib/dashboard-auth"

const AdminDashboardPage = async () => {
  await requireDashboardRole("admin")

  return (
    <div>
      <h2>Admin Dashboard</h2>
    </div>
  )
}

export default AdminDashboardPage
