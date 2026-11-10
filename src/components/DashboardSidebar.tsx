"use client"

import Link from "next/link"
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
import type { LucideIcon } from "lucide-react"
import {
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FileUser,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react"

type Role = "seeker" | "recruiter" | "admin"
type MenuItem = { name: string; url: string; icon: LucideIcon }

const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Find jobs", url: "/dashboard/seeker/jobs", icon: Search },
    {
      name: "My applications",
      url: "/dashboard/seeker/applications",
      icon: ClipboardList,
    },
    { name: "Saved jobs", url: "/dashboard/seeker/saved-jobs", icon: BriefcaseBusiness },
    { name: "My profile", url: "/dashboard/seeker/profile", icon: FileUser },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recuiter", icon: LayoutDashboard },
    { name: "My jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
    { name: "Post a job", url: "/dashboard/recruiter/jobs/new", icon: ClipboardList },
    { name: "Candidates", url: "/dashboard/recruiter/candidates", icon: Users },
    { name: "Company profile", url: "/dashboard/recruiter/company", icon: Building2 },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
    { name: "Moderation", url: "/dashboard/admin/moderation", icon: ShieldCheck },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const role = (session?.user?.role ?? "seeker") as Role
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
