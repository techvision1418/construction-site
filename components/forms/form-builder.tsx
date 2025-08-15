"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockFormTemplates, type FormTemplate, type FormField } from "@/lib/forms"

interface FormBuilderProps {
  onBack: () => void
  onSave?: (formData: any) => void
  templateId?: string
  formId?: string
}

export function FormBuilder({ onBack, onSave, templateId, formId }: FormBuilderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(
    templateId ? mockFormTemplates.find((t) => t.id === templateId) || null : null,
  )
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [title, setTitle] = useState("")

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submissionData = {
      templateId: selectedTemplate?.id,
      title: title || `${selectedTemplate?.name} - ${new Date().toLocaleDateString()}`,
      data: formData,
    }
    onSave?.(submissionData)
  }

  const renderField = (field: FormField) => {
    const value = formData[field.name]

    switch (field.type) {
      case "text":
        return (
          <Input
            value={value || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        )

      case "textarea":
        return (
          <Textarea
            value={value || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            rows={3}
            required={field.required}
          />
        )

      case "select":
        return (
          <Select value={value || ""} onValueChange={(val) => handleFieldChange(field.name, val)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(new Date(value), "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => handleFieldChange(field.name, date?.toISOString().split("T")[0])}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )

      case "number":
        return (
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        )

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox checked={value || false} onCheckedChange={(checked) => handleFieldChange(field.name, checked)} />
            <Label className="text-sm font-normal">{field.label}</Label>
          </div>
        )

      case "file":
        return (
          <div className="space-y-2">
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Upload File
            </Button>
            <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
          </div>
        )

      default:
        return null
    }
  }

  const isEditing = !!formId

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Forms
        </Button>
        <h1 className="text-3xl font-bold text-foreground">
          {isEditing ? "Edit Form" : selectedTemplate ? `New ${selectedTemplate.name}` : "Create New Form"}
        </h1>
      </div>

      {!selectedTemplate ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Form Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockFormTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{template.fields.length} fields</span>
                        {template.approvalRequired && <span className="text-orange-600">Approval required</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Form Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`${selectedTemplate.name} - ${new Date().toLocaleDateString()}`}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{selectedTemplate.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedTemplate.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setSelectedTemplate(null)}>
              Change Template
            </Button>
            <Button type="button" variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update Form" : "Submit Form"}</Button>
          </div>
        </form>
      )}
    </div>
  )
}
