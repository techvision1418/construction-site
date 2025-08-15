"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockFormSubmissions, getStatusColor, getFormTypeColor, type FormStatus, type FormType } from "@/lib/forms"
import { Search, Plus, Calendar, User, FileText, Clock } from "lucide-react"

interface FormListProps {
  onFormSelect?: (formId: string) => void
  onCreateForm?: () => void
}

export function FormList({ onFormSelect, onCreateForm }: FormListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<FormStatus | "all">("all")
  const [typeFilter, setTypeFilter] = useState<FormType | "all">("all")

  const filteredForms = mockFormSubmissions.filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.templateName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || form.status === statusFilter
    const matchesType = typeFilter === "all" || form.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forms & Approvals</h1>
          <p className="text-muted-foreground">Manage form submissions and approval workflows</p>
        </div>
        <Button onClick={onCreateForm} className="gap-2">
          <Plus className="h-4 w-4" />
          New Form
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as FormStatus | "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="requires-changes">Requires Changes</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as FormType | "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="work-order">Work Order</SelectItem>
            <SelectItem value="change-request">Change Request</SelectItem>
            <SelectItem value="inspection">Inspection</SelectItem>
            <SelectItem value="permit">Permit</SelectItem>
            <SelectItem value="daily-report">Daily Report</SelectItem>
            <SelectItem value="incident-report">Incident Report</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredForms.map((form) => (
          <Card
            key={form.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onFormSelect?.(form.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{form.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(form.status)} variant="secondary">
                    {form.status.replace("-", " ")}
                  </Badge>
                  <Badge className={getFormTypeColor(form.type)} variant="secondary">
                    {form.templateName}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{form.submittedBy}</p>
                    <p className="text-muted-foreground">Submitted by</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{form.submittedAt.toLocaleDateString()}</p>
                    <p className="text-muted-foreground">Submitted</p>
                  </div>
                </div>
              </div>

              {form.projectName && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{form.projectName}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {form.approvals.length} approval{form.approvals.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {form.attachments.length > 0 && (
                  <span className="text-muted-foreground">
                    {form.attachments.length} attachment{form.attachments.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {form.approvals.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Latest:</span> {form.approvals[form.approvals.length - 1].action} by{" "}
                    {form.approvals[form.approvals.length - 1].approverName}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No forms found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
