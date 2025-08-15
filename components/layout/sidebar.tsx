"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import { HardHat, LayoutDashboard, FolderOpen, FileText, Package, Shield, Clock, Users, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    permission: null,
  },
  {
    title: "Projects",
    icon: FolderOpen,
    href: "/projects",
    permission: "canManageProjects" as const,
  },
  {
    title: "Forms & Approvals",
    icon: FileText,
    href: "/forms",
    permission: "canApproveForms" as const,
  },
  {
    title: "Inventory",
    icon: Package,
    href: "/inventory",
    permission: "canManageInventory" as const,
  },
  {
    title: "Safety & Observations",
    icon: Shield,
    href: "/safety",
    permission: "canManageSafety" as const,
  },
  {
    title: "Time Tracking",
    icon: Clock,
    href: "/time-tracking",
    permission: "canTrackTime" as const,
  },
  {
    title: "User Management",
    icon: Users,
    href: "/users",
    permission: "canManageUsers" as const,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const filteredItems = navigationItems.filter((item) => !item.permission || hasPermission(user.role, item.permission))

  return (
    <div className={cn("flex flex-col h-full bg-sidebar border-r border-sidebar-border", className)}>
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <HardHat className="h-8 w-8 text-sidebar-primary" />
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">ConstructionSite</h2>
            <p className="text-sm text-sidebar-foreground/60">Pro Management</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">{user.role}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
