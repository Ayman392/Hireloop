import { MyApplications } from "@/components/seeker/MyApplications"
import { requireDashboardRole } from "@/lib/dashboard-auth"

export default async function MyApplicationsPage() {
  await requireDashboardRole("seeker")

  return <MyApplications />
}
