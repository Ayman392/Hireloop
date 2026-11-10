"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
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
  PlusCircle,
} from "lucide-react"

type Role = "seeker" | "recruiter" | "admin"
type MenuItem = { id: string; name: string; url: string; icon: LucideIcon }

const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "seeker-find-jobs",
      name: "Find jobs",
      url: "/dashboard/seeker/jobs",
      icon: Search,
    },
    {
      id: "seeker-applications",
      name: "My applications",
      url: "/dashboard/seeker/applications",
      icon: ClipboardList,
    },
    {
      id: "seeker-saved-jobs",
      name: "Saved jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "seeker-profile",
      name: "My profile",
      url: "/dashboard/seeker/profile",
      icon: FileUser,
    },
  ],
  recruiter: [
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "recruiter-jobs",
      name: "My jobs",
      url: "/dashboard/recruiter/jobs",
      icon: ClipboardList,
    },
    {
      id: "requiter-my-company",
      name: "My Company",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "recruiter-add-job",
      name: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "recruiter-candidates",
      name: "Candidates",
      url: "/dashboard/recruiter/candidates",
      icon: Users,
    },
    {
      id: "recruiter-company",
      name: "Company profile",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
  ],
  admin: [
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "admin-moderation",
      name: "Moderation",
      url: "/dashboard/admin/moderation",
      icon: ShieldCheck,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar() {
  const { data: session, refetch } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    void refetch({ query: { disableCookieCache: true } })
  }, [refetch])

  const pathRole = pathname.match(
    /^\/dashboard\/(seeker|recruiter|admin)(?:\/|$)/
  )?.[1]
  const role = pathRole ?? session?.user?.role ?? "seeker"
  const menuItems = menuItemsByRole[role as Role] ?? menuItemsByRole.seeker
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
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
