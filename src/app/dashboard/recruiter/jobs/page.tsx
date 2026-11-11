import { ManageJobs } from "@/components/recruiter/ManageJobs"
import { requireDashboardRole } from "@/lib/dashboard-auth"

const ManageJobsPage = async () => {
  await requireDashboardRole("recruiter")

  return <ManageJobs />
}

export default ManageJobsPage
