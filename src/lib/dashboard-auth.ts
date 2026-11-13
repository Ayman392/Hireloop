import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export type DashboardRole = "seeker" | "recruiter" | "admin"

const dashboardPathByRole: Record<DashboardRole, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
}

function isDashboardRole(role: unknown): role is DashboardRole {
  return typeof role === "string" && role in dashboardPathByRole
}

export async function requireDashboardRole(requiredRole: DashboardRole) {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  })

  if (!session) {
    redirect("/sign-in")
  }

  const role = session.user.role
  if (role !== requiredRole) {
    redirect(
      isDashboardRole(role)
        ? dashboardPathByRole[role]
        : dashboardPathByRole.seeker
    )
  }

  return session
}
