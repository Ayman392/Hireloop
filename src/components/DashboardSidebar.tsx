import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"

import { useSession } from "@/lib/auth-client"
import { Plus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type MenuItem = { name: string; url: string; icon: LucideIcon }

const menuItemsByRole: Record<"seeker" | "recruiter" | "admin", MenuItem[]> = {
  seeker: [],
  recruiter: [],
  admin: [],
}

export function DashboardSidebar() {
  const { data: session, isLoading } = useSession()
  const role = session?.user?.role || "seeker"
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {
              // menuItemsByRole[role]?.map((item) => (
              //   <SidebarMenuItem key={item.name}>
              //     <SidebarMenuButton render={<a href={item.url} />}>
              //       <item.icon />
              //       <span>{item.name}</span>
              //     </SidebarMenuButton>
              //   </SidebarMenuItem>
              // ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
