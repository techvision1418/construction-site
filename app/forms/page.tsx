"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { FormList } from "@/components/forms/form-list"
import { FormDetail } from "@/components/forms/form-detail"
import { FormBuilder } from "@/components/forms/form-builder"

type ViewMode = "list" | "detail" | "create" | "edit"

export default function FormsPage() {
  const { isAuthenticated, user } = useAuth()
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)

  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  const handleFormSelect = (formId: string) => {
    setSelectedFormId(formId)
    setViewMode("detail")
  }

  const handleCreateForm = () => {
    setViewMode("create")
  }

  const handleEditForm = (formId: string) => {
    setSelectedFormId(formId)
    setViewMode("edit")
  }

  const handleBackToList = () => {
    setViewMode("list")
    setSelectedFormId(null)
  }

  const handleSaveForm = (formData: any) => {
    // In a real app, this would save to the backend
    console.log("Saving form:", formData)
    handleBackToList()
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {viewMode === "list" && <FormList onFormSelect={handleFormSelect} onCreateForm={handleCreateForm} />}

          {viewMode === "detail" && selectedFormId && (
            <FormDetail formId={selectedFormId} onBack={handleBackToList} onEdit={handleEditForm} />
          )}

          {(viewMode === "create" || viewMode === "edit") && (
            <FormBuilder
              onBack={handleBackToList}
              onSave={handleSaveForm}
              formId={viewMode === "edit" ? selectedFormId || undefined : undefined}
            />
          )}
        </div>
      </main>
    </div>
  )
}
