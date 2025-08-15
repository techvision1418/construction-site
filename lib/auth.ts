export type UserRole = "admin" | "user" | "guest" | "demo" | "trial"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company?: string
  avatar?: string
  createdAt: Date
  lastLogin?: Date
  trialExpiresAt?: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock user data for demo purposes
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@constructionsite.com",
    name: "John Smith",
    role: "admin",
    company: "BuildCorp Construction",
    avatar: "/construction-manager.png",
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    email: "manager@constructionsite.com",
    name: "Sarah Johnson",
    role: "user",
    company: "BuildCorp Construction",
    avatar: "/project-manager-team.png",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  },
  {
    id: "3",
    email: "demo@constructionsite.com",
    name: "Demo User",
    role: "demo",
    company: "Demo Company",
    avatar: "/demo-user-profile.png",
    createdAt: new Date(),
    lastLogin: new Date(),
  },
  {
    id: "4",
    email: "trial@constructionsite.com",
    name: "Trial User",
    role: "trial",
    company: "Trial Company",
    avatar: "/trial-user-badge.png",
    createdAt: new Date(),
    lastLogin: new Date(),
    trialExpiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  },
]

export const rolePermissions = {
  admin: {
    canManageUsers: true,
    canManageProjects: true,
    canViewReports: true,
    canManageInventory: true,
    canApproveForms: true,
    canManageSafety: true,
    canTrackTime: true,
  },
  user: {
    canManageUsers: false,
    canManageProjects: true,
    canViewReports: true,
    canManageInventory: true,
    canApproveForms: false,
    canManageSafety: true,
    canTrackTime: true,
  },
  guest: {
    canManageUsers: false,
    canManageProjects: false,
    canViewReports: false,
    canManageInventory: false,
    canApproveForms: false,
    canManageSafety: false,
    canTrackTime: false,
  },
  demo: {
    canManageUsers: false,
    canManageProjects: true,
    canViewReports: true,
    canManageInventory: true,
    canApproveForms: false,
    canManageSafety: true,
    canTrackTime: true,
  },
  trial: {
    canManageUsers: false,
    canManageProjects: true,
    canViewReports: false,
    canManageInventory: true,
    canApproveForms: false,
    canManageSafety: true,
    canTrackTime: true,
  },
}

export function hasPermission(role: UserRole, permission: keyof typeof rolePermissions.admin): boolean {
  return rolePermissions[role][permission]
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames = {
    admin: "Administrator",
    user: "Project Manager",
    guest: "Guest",
    demo: "Demo User",
    trial: "Trial User",
  }
  return roleNames[role]
}
