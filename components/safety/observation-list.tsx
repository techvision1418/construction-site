"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockSafetyObservations, getObservationTypeColor, type ObservationType } from "@/lib/safety"
import { Search, Plus, Eye, Calendar, User, MapPin } from "lucide-react"

interface ObservationListProps {
  onObservationSelect?: (observationId: string) => void
  onCreateObservation?: () => void
}

export function ObservationList({ onObservationSelect, onCreateObservation }: ObservationListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<ObservationType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<"open" | "in-progress" | "closed" | "all">("all")

  const filteredObservations = mockSafetyObservations.filter((observation) => {
    const matchesSearch =
      observation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      observation.observationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      observation.observedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || observation.type === typeFilter
    const matchesStatus = statusFilter === "all" || observation.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Safety Observations</h1>
          <p className="text-muted-foreground">Track safety behaviors, hazards, and improvement opportunities</p>
        </div>
        <Button onClick={onCreateObservation} className="gap-2">
          <Plus className="h-4 w-4" />
          New Observation
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search observations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as ObservationType | "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="safe-behavior">Safe Behavior</SelectItem>
            <SelectItem value="unsafe-behavior">Unsafe Behavior</SelectItem>
            <SelectItem value="near-miss">Near Miss</SelectItem>
            <SelectItem value="hazard">Hazard</SelectItem>
            <SelectItem value="suggestion">Suggestion</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Observations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredObservations.map((observation) => (
          <Card
            key={observation.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onObservationSelect?.(observation.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{observation.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getObservationTypeColor(observation.type)} variant="secondary">
                    {observation.type.replace("-", " ")}
                  </Badge>
                  <Badge
                    className={
                      observation.status === "closed"
                        ? "bg-green-100 text-green-800"
                        : observation.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }
                    variant="secondary"
                  >
                    {observation.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{observation.observationNumber}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">{observation.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{observation.observedBy}</p>
                    <p className="text-muted-foreground">Observed by</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{observation.observedAt.toLocaleDateString()}</p>
                    <p className="text-muted-foreground">Observed</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground truncate">{observation.location}</span>
              </div>

              {observation.personInvolved && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Person: {observation.personInvolved}</span>
                </div>
              )}

              {observation.projectName && (
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{observation.projectName}</span>
                </div>
              )}

              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{observation.followUpActions.length} follow-up actions</span>
                  {observation.followUpRequired && (
                    <span className="text-orange-600 font-medium">Follow-up required</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredObservations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No observations found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
