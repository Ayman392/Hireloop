import { NewJobForm } from "@/components/recruiter/NewJobForm"
import { requireDashboardRole } from "@/lib/dashboard-auth"

const NewJobPage = async () => {
  await requireDashboardRole("recruiter")

  return <NewJobForm />
}

export default NewJobPage
