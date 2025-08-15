"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockFormSubmissions, getStatusColor, getFormTypeColor, formatFileSize, type ApprovalAction } from "@/lib/forms"
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  FileText,
  Download,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react"

interface FormDetailProps {
  formId: string
  onBack: () => void
  onEdit?: (formId: string) => void
}

export function FormDetail({ formId, onBack, onEdit }: FormDetailProps) {
  const [newComment, setNewComment] = useState("")
  const [approvalComment, setApprovalComment] = useState("")
  const form = mockFormSubmissions.find((f) => f.id === formId)

  if (!form) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Form not found.</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const handleApproval = (action: ApprovalAction) => {
    // In a real app, this would make an API call
    console.log(`${action} form with comment:`, approvalComment)
    setApprovalComment("")
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would make an API call
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
  }

  const getApprovalIcon = (action: ApprovalAction) => {
    switch (action) {
      case "approve":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "reject":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "request-changes":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forms
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit?.(form.id)} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Form Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{form.title}</h1>
            <p className="text-muted-foreground mt-2">{form.templateName}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(form.status)} variant="secondary">
              {form.status.replace("-", " ")}
            </Badge>
            <Badge className={getFormTypeColor(form.type)} variant="secondary">
              {form.type.replace("-", " ")}
            </Badge>
          </div>
        </div>

        {/* Form Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium">{form.submittedBy}</p>
                  <p className="text-sm text-muted-foreground">Submitted by</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium">{form.submittedAt.toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium">{form.projectName || "No Project"}</p>
                  <p className="text-sm text-muted-foreground">Project</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="font-medium">{form.approvals.length}</p>
                  <p className="text-sm text-muted-foreground">Approvals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Form Details</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(form.data).map(([key, value]) => (
                <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="font-medium text-muted-foreground">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                  </div>
                  <div className="md:col-span-2">
                    {typeof value === "string" && value.length > 100 ? (
                      <div className="whitespace-pre-wrap">{value}</div>
                    ) : (
                      <div>{String(value)}</div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <div className="space-y-4">
            {form.approvals.length > 0 ? (
              form.approvals.map((approval) => (
                <Card key={approval.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {approval.approverName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getApprovalIcon(approval.action)}
                          <span className="font-medium">{approval.approverName}</span>
                          <span className="text-sm text-muted-foreground">({approval.approverRole})</span>
                          <span className="text-sm text-muted-foreground">{approval.action.replace("-", " ")}d</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{approval.timestamp.toLocaleString()}</p>
                        {approval.comment && <p className="text-sm bg-muted p-2 rounded">{approval.comment}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No approvals yet.</p>
                </CardContent>
              </Card>
            )}

            {/* Approval Actions */}
            {form.status === "submitted" || form.status === "under-review" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Approval Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Add a comment (optional)"
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleApproval("approve")} className="gap-2 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleApproval("request-changes")}
                      variant="outline"
                      className="gap-2 border-orange-600 text-orange-600 hover:bg-orange-50"
                    >
                      <AlertCircle className="h-4 w-4" />
                      Request Changes
                    </Button>
                    <Button
                      onClick={() => handleApproval("reject")}
                      variant="outline"
                      className="gap-2 border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <div className="space-y-4">
            {form.comments.length > 0 ? (
              form.comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {comment.authorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{comment.authorName}</span>
                          <span className="text-sm text-muted-foreground">({comment.authorRole})</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{comment.timestamp.toLocaleString()}</p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No comments yet.</p>
                </CardContent>
              </Card>
            )}

            {/* Add Comment */}
            <Card>
              <CardHeader>
                <CardTitle>Add Comment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()} className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Add Comment
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-4">
          <div className="space-y-4">
            {form.attachments.length > 0 ? (
              form.attachments.map((attachment) => (
                <Card key={attachment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(attachment.size)} • {attachment.type} •{" "}
                            {attachment.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No attachments.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
