import { MyApplications } from "@/components/seeker/MyApplications"
import { requireDashboardRole } from "@/lib/dashboard-auth"
import { getApplicationsForUser } from "@/lib/api/applications"
import type { JobApplication } from "@/lib/types/application"

export default async function MyApplicationsPage() {
  const session = await requireDashboardRole("seeker")
  let applications: JobApplication[] = []
  let loadError = false

  try {
    applications = await getApplicationsForUser(session.user.id)
  } catch (error) {
    console.error("[My applications load error]", error)
    loadError = true
  }

  return (
    <MyApplications
      applications={applications}
      loadError={loadError}
    />
  )
}
