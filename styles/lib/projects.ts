export type ProjectStatus = "planning" | "in-progress" | "on-hold" | "completed" | "cancelled"
export type ProjectPriority = "low" | "medium" | "high" | "critical"

export interface ProjectMember {
  id: string
  name: string
  role: string
  avatar?: string
  email: string
}

export interface ProjectPhase {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  status: "not-started" | "in-progress" | "completed" | "delayed"
  progress: number
  budget: number
  actualCost: number
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  priority: ProjectPriority
  startDate: Date
  endDate: Date
  budget: number
  actualCost: number
  progress: number
  location: string
  client: string
  projectManager: string
  members: ProjectMember[]
  phases: ProjectPhase[]
  createdAt: Date
  updatedAt: Date
}

// Mock project data
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Downtown Office Complex",
    description:
      "Construction of a 15-story office building with underground parking and retail space on the ground floor.",
    status: "in-progress",
    priority: "high",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-12-20"),
    budget: 2500000,
    actualCost: 1200000,
    progress: 48,
    location: "123 Main Street, Downtown",
    client: "Metro Development Corp",
    projectManager: "Sarah Johnson",
    members: [
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Project Manager",
        avatar: "/project-manager-team.png",
        email: "sarah@constructionsite.com",
      },
      {
        id: "2",
        name: "Mike Chen",
        role: "Site Supervisor",
        avatar: "/construction-manager.png",
        email: "mike@constructionsite.com",
      },
      {
        id: "3",
        name: "Lisa Rodriguez",
        role: "Safety Officer",
        avatar: "/demo-user-profile.png",
        email: "lisa@constructionsite.com",
      },
    ],
    phases: [
      {
        id: "1",
        name: "Foundation & Excavation",
        description: "Site preparation, excavation, and foundation work",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-03-30"),
        status: "completed",
        progress: 100,
        budget: 400000,
        actualCost: 385000,
      },
      {
        id: "2",
        name: "Structural Framework",
        description: "Steel framework and concrete structure",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-07-15"),
        status: "in-progress",
        progress: 65,
        budget: 800000,
        actualCost: 520000,
      },
      {
        id: "3",
        name: "MEP Installation",
        description: "Mechanical, electrical, and plumbing systems",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-10-30"),
        status: "not-started",
        progress: 0,
        budget: 600000,
        actualCost: 0,
      },
      {
        id: "4",
        name: "Interior & Finishing",
        description: "Interior work, finishes, and final inspections",
        startDate: new Date("2024-10-15"),
        endDate: new Date("2024-12-20"),
        status: "not-started",
        progress: 0,
        budget: 700000,
        actualCost: 0,
      },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    name: "Residential Complex Phase 2",
    description: "Second phase of luxury residential development with 50 units, amenities, and landscaping.",
    status: "planning",
    priority: "medium",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2025-02-28"),
    budget: 1800000,
    actualCost: 0,
    progress: 5,
    location: "456 Oak Avenue, Suburbs",
    client: "Greenfield Properties",
    projectManager: "John Smith",
    members: [
      {
        id: "1",
        name: "John Smith",
        role: "Project Manager",
        avatar: "/construction-manager.png",
        email: "john@constructionsite.com",
      },
      {
        id: "4",
        name: "Emma Wilson",
        role: "Architect",
        avatar: "/trial-user-badge.png",
        email: "emma@constructionsite.com",
      },
    ],
    phases: [
      {
        id: "5",
        name: "Design & Permits",
        description: "Architectural design and permit acquisition",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-06-30"),
        status: "in-progress",
        progress: 25,
        budget: 150000,
        actualCost: 35000,
      },
      {
        id: "6",
        name: "Site Preparation",
        description: "Land clearing and site preparation",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-08-31"),
        status: "not-started",
        progress: 0,
        budget: 200000,
        actualCost: 0,
      },
    ],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "3",
    name: "Highway Bridge Renovation",
    description:
      "Complete renovation of the historic Main Street bridge including structural reinforcement and aesthetic improvements.",
    status: "completed",
    priority: "critical",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2024-01-31"),
    budget: 950000,
    actualCost: 920000,
    progress: 100,
    location: "Main Street Bridge, City Center",
    client: "City Public Works Department",
    projectManager: "Sarah Johnson",
    members: [
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Project Manager",
        avatar: "/project-manager-team.png",
        email: "sarah@constructionsite.com",
      },
      {
        id: "5",
        name: "David Park",
        role: "Structural Engineer",
        avatar: "/demo-user-profile.png",
        email: "david@constructionsite.com",
      },
    ],
    phases: [
      {
        id: "7",
        name: "Structural Assessment",
        description: "Complete structural analysis and planning",
        startDate: new Date("2023-08-01"),
        endDate: new Date("2023-09-30"),
        status: "completed",
        progress: 100,
        budget: 100000,
        actualCost: 95000,
      },
      {
        id: "8",
        name: "Renovation Work",
        description: "Bridge renovation and reinforcement",
        startDate: new Date("2023-10-01"),
        endDate: new Date("2024-01-31"),
        status: "completed",
        progress: 100,
        budget: 850000,
        actualCost: 825000,
      },
    ],
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2024-02-01"),
  },
]

export function getStatusColor(status: ProjectStatus): string {
  const colors = {
    planning: "bg-blue-100 text-blue-800",
    "in-progress": "bg-green-100 text-green-800",
    "on-hold": "bg-yellow-100 text-yellow-800",
    completed: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return colors[status]
}

export function getPriorityColor(priority: ProjectPriority): string {
  const colors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  }
  return colors[priority]
}

export function getPhaseStatusColor(status: ProjectPhase["status"]): string {
  const colors = {
    "not-started": "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    delayed: "bg-red-100 text-red-800",
  }
  return colors[status]
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}
