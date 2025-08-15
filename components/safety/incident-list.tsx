"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  mockSafetyIncidents,
  getIncidentSeverityColor,
  getIncidentStatusColor,
  type IncidentSeverity,
  type IncidentStatus,
} from "@/lib/safety"
import { Search, Plus, AlertTriangle, Calendar, User, MapPin } from "lucide-react"

interface IncidentListProps {
  onIncidentSelect?: (incidentId: string) => void
  onCreateIncident?: () => void
}

export function IncidentList({ onIncidentSelect, onCreateIncident }: IncidentListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<IncidentSeverity | "all">("all")
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all")

  const filteredIncidents = mockSafetyIncidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Safety Incidents</h1>
          <p className="text-muted-foreground">Track and manage safety incidents and investigations</p>
        </div>
        <Button onClick={onCreateIncident} className="gap-2">
          <Plus className="h-4 w-4" />
          Report Incident
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value as IncidentSeverity | "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="minor">Minor</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="serious">Serious</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as IncidentStatus | "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="reported">Reported</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredIncidents.map((incident) => (
          <Card
            key={incident.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onIncidentSelect?.(incident.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{incident.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getIncidentSeverityColor(incident.severity)} variant="secondary">
                    {incident.severity}
                  </Badge>
                  <Badge className={getIncidentStatusColor(incident.status)} variant="secondary">
                    {incident.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{incident.incidentNumber}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">{incident.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{incident.reportedBy}</p>
                    <p className="text-muted-foreground">Reported by</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{incident.reportedAt.toLocaleDateString()}</p>
                    <p className="text-muted-foreground">Reported</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground truncate">{incident.location}</span>
              </div>

              {incident.projectName && (
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{incident.projectName}</span>
                </div>
              )}

              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {incident.injuredPersons.length} injured, {incident.witnesses.length} witnesses
                  </span>
                  {incident.followUpRequired && <span className="text-orange-600 font-medium">Follow-up required</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No incidents found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
