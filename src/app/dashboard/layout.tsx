import { DashboardSidebar } from "@/components/DashboardSidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout
