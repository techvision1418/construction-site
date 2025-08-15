"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { SafetyDashboard } from "@/components/safety/safety-dashboard"
import { IncidentList } from "@/components/safety/incident-list"
import { ObservationList } from "@/components/safety/observation-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SafetyPage() {
  const { isAuthenticated, user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  const handleCreateIncident = () => {
    // In a real app, this would open a form to create new incident
    console.log("Create new incident")
  }

  const handleCreateInspection = () => {
    // In a real app, this would open a form to create new inspection
    console.log("Create new inspection")
  }

  const handleCreateObservation = () => {
    // In a real app, this would open a form to create new observation
    console.log("Create new observation")
  }

  const handleIncidentSelect = (incidentId: string) => {
    // In a real app, this would show incident details
    console.log("Selected incident:", incidentId)
  }

  const handleObservationSelect = (observationId: string) => {
    // In a real app, this would show observation details
    console.log("Selected observation:", observationId)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="observations">Observations</TabsTrigger>
              <TabsTrigger value="inspections">Inspections</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <SafetyDashboard
                onCreateIncident={handleCreateIncident}
                onCreateInspection={handleCreateInspection}
                onCreateObservation={handleCreateObservation}
              />
            </TabsContent>

            <TabsContent value="incidents">
              <IncidentList onIncidentSelect={handleIncidentSelect} onCreateIncident={handleCreateIncident} />
            </TabsContent>

            <TabsContent value="observations">
              <ObservationList
                onObservationSelect={handleObservationSelect}
                onCreateObservation={handleCreateObservation}
              />
            </TabsContent>

            <TabsContent value="inspections">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Inspections management would be implemented here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
