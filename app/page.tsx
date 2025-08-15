"use client"
import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, FolderOpen, AlertTriangle, TrendingUp, Clock, Package, Shield } from "lucide-react"
import Link from "next/link"

function Dashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 this month",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Team Members",
      value: "48",
      change: "+5 this week",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Safety Reports",
      value: "3",
      change: "Pending review",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+12% vs last month",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ]

  const recentActivity = [
    {
      title: "New safety report submitted",
      description: "Site A - Equipment inspection completed",
      time: "2 hours ago",
      type: "safety",
    },
    {
      title: "Project milestone reached",
      description: "Downtown Office Complex - Foundation complete",
      time: "4 hours ago",
      type: "project",
    },
    {
      title: "Inventory alert",
      description: "Steel beams running low - Reorder required",
      time: "6 hours ago",
      type: "inventory",
    },
    {
      title: "Time sheet approved",
      description: "Week ending 12/15 - 45 hours logged",
      time: "1 day ago",
      type: "time",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening on your construction sites today.</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {user?.role === "admin"
                ? "Administrator"
                : user?.role === "user"
                  ? "Project Manager"
                  : user?.role === "demo"
                    ? "Demo Account"
                    : user?.role === "trial"
                      ? "Trial Account"
                      : "Guest"}
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates from your construction sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "safety"
                            ? "bg-orange-100 text-orange-600"
                            : activity.type === "project"
                              ? "bg-blue-100 text-blue-600"
                              : activity.type === "inventory"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-green-100 text-green-600"
                        }`}
                      >
                        {activity.type === "safety" ? (
                          <Shield className="h-4 w-4" />
                        ) : activity.type === "project" ? (
                          <FolderOpen className="h-4 w-4" />
                        ) : activity.type === "inventory" ? (
                          <Package className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/projects">
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                      <FolderOpen className="h-6 w-6" />
                      <span className="text-sm">View Projects</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Safety Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Package className="h-6 w-6" />
                    <span className="text-sm">Check Inventory</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Clock className="h-6 w-6" />
                    <span className="text-sm">Log Time</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function HomePage() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  return <Dashboard />
}
