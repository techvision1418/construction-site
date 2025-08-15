"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectDetail } from "@/components/projects/project-detail"
import { ProjectForm } from "@/components/projects/project-form"

type ViewMode = "list" | "detail" | "create" | "edit"

export default function ProjectsPage() {
  const { isAuthenticated, user } = useAuth()
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId)
    setViewMode("detail")
  }

  const handleCreateProject = () => {
    setViewMode("create")
  }

  const handleEditProject = (projectId: string) => {
    setSelectedProjectId(projectId)
    setViewMode("edit")
  }

  const handleBackToList = () => {
    setViewMode("list")
    setSelectedProjectId(null)
  }

  const handleSaveProject = (projectData: any) => {
    // In a real app, this would save to the backend
    console.log("Saving project:", projectData)
    handleBackToList()
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {viewMode === "list" && (
            <ProjectList onProjectSelect={handleProjectSelect} onCreateProject={handleCreateProject} />
          )}

          {viewMode === "detail" && selectedProjectId && (
            <ProjectDetail projectId={selectedProjectId} onBack={handleBackToList} onEdit={handleEditProject} />
          )}

          {(viewMode === "create" || viewMode === "edit") && (
            <ProjectForm
              onBack={handleBackToList}
              onSave={handleSaveProject}
              projectId={viewMode === "edit" ? selectedProjectId || undefined : undefined}
            />
          )}
        </div>
      </main>
    </div>
  )
}
