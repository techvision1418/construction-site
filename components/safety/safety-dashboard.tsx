"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  mockSafetyIncidents,
  mockSafetyInspections,
  mockSafetyObservations,
  mockSafetyTraining,
  getIncidentSeverityColor,
  getObservationTypeColor,
  calculateSafetyMetrics,
} from "@/lib/safety"
import { Shield, AlertTriangle, CheckCircle, Eye, Users, Calendar, TrendingUp, FileText, Plus } from "lucide-react"

interface SafetyDashboardProps {
  onCreateIncident?: () => void
  onCreateInspection?: () => void
  onCreateObservation?: () => void
}

export function SafetyDashboard({ onCreateIncident, onCreateInspection, onCreateObservation }: SafetyDashboardProps) {
  const metrics = calculateSafetyMetrics()
  const recentIncidents = mockSafetyIncidents.slice(0, 3)
  const recentObservations = mockSafetyObservations.slice(0, 3)
  const upcomingInspections = mockSafetyInspections.filter((i) => i.status === "scheduled").slice(0, 3)
  const expiredTraining = mockSafetyTraining.filter((t) => t.status === "expired")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Safety & Observations</h1>
          <p className="text-muted-foreground">Monitor safety performance and manage incidents</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onCreateObservation} variant="outline" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            New Observation
          </Button>
          <Button onClick={onCreateInspection} variant="outline" className="gap-2 bg-transparent">
            <CheckCircle className="h-4 w-4" />
            New Inspection
          </Button>
          <Button onClick={onCreateIncident} className="gap-2">
            <Plus className="h-4 w-4" />
            Report Incident
          </Button>
        </div>
      </div>

      {/* Safety Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{metrics.totalIncidents}</p>
                <p className="text-sm text-muted-foreground">Total Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{metrics.openIncidents}</p>
                <p className="text-sm text-muted-foreground">Open Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{metrics.completedInspections}</p>
                <p className="text-sm text-muted-foreground">Inspections Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockSafetyObservations.length}</p>
                <p className="text-sm text-muted-foreground">Observations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{expiredTraining.length}</p>
                <p className="text-sm text-muted-foreground">Expired Training</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{incident.title}</p>
                      <Badge className={getIncidentSeverityColor(incident.severity)} variant="secondary">
                        {incident.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{incident.incidentNumber}</p>
                    <p className="text-sm text-muted-foreground">{incident.reportedAt.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {recentIncidents.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No recent incidents</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Observations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Recent Observations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentObservations.map((observation) => (
                <div key={observation.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Eye className="h-4 w-4 text-blue-600 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{observation.title}</p>
                      <Badge className={getObservationTypeColor(observation.type)} variant="secondary">
                        {observation.type.replace("-", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{observation.observationNumber}</p>
                    <p className="text-sm text-muted-foreground">{observation.observedAt.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {recentObservations.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No recent observations</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Inspections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInspections.map((inspection) => (
                <div key={inspection.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{inspection.title}</p>
                    <p className="text-sm text-muted-foreground mb-1">{inspection.type}</p>
                    <p className="text-sm text-muted-foreground">
                      Scheduled: {inspection.scheduledDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Inspector: {inspection.inspector}</p>
                  </div>
                </div>
              ))}
              {upcomingInspections.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No upcoming inspections</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Training Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Training Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Training Compliance</span>
                  <span>
                    {mockSafetyTraining.filter((t) => t.status === "completed").length}/{mockSafetyTraining.length}
                  </span>
                </div>
                <Progress
                  value={
                    (mockSafetyTraining.filter((t) => t.status === "completed").length / mockSafetyTraining.length) *
                    100
                  }
                  className="h-2"
                />
              </div>

              {expiredTraining.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-red-600">Expired Training</p>
                  {expiredTraining.map((training) => (
                    <div key={training.id} className="text-sm">
                      <p className="font-medium">{training.employeeName}</p>
                      <p className="text-muted-foreground">{training.trainingType}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  View All Training Records
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Safety Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Safety performance charts would be displayed here</p>
              <p className="text-sm text-muted-foreground">
                Incident trends, inspection scores, training completion rates
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
