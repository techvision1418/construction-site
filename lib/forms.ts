export type FormStatus = "draft" | "submitted" | "under-review" | "approved" | "rejected" | "requires-changes"
export type FormType = "work-order" | "change-request" | "inspection" | "permit" | "daily-report" | "incident-report"
export type ApprovalAction = "approve" | "reject" | "request-changes"

export interface FormField {
  id: string
  name: string
  label: string
  type: "text" | "textarea" | "select" | "date" | "number" | "checkbox" | "file"
  required: boolean
  options?: string[]
  value?: any
}

export interface FormTemplate {
  id: string
  name: string
  type: FormType
  description: string
  fields: FormField[]
  approvalRequired: boolean
  approvers: string[]
}

export interface FormSubmission {
  id: string
  templateId: string
  templateName: string
  type: FormType
  title: string
  status: FormStatus
  submittedBy: string
  submittedAt: Date
  projectId?: string
  projectName?: string
  data: Record<string, any>
  approvals: FormApproval[]
  comments: FormComment[]
  attachments: FormAttachment[]
}

export interface FormApproval {
  id: string
  approverName: string
  approverRole: string
  action: ApprovalAction
  comment?: string
  timestamp: Date
}

export interface FormComment {
  id: string
  authorName: string
  authorRole: string
  content: string
  timestamp: Date
}

export interface FormAttachment {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: Date
}

// Mock form templates
export const mockFormTemplates: FormTemplate[] = [
  {
    id: "1",
    name: "Work Order Request",
    type: "work-order",
    description: "Request for new work or modifications to existing work",
    approvalRequired: true,
    approvers: ["Project Manager", "Site Supervisor"],
    fields: [
      {
        id: "title",
        name: "title",
        label: "Work Order Title",
        type: "text",
        required: true,
      },
      {
        id: "description",
        name: "description",
        label: "Work Description",
        type: "textarea",
        required: true,
      },
      {
        id: "priority",
        name: "priority",
        label: "Priority Level",
        type: "select",
        required: true,
        options: ["Low", "Medium", "High", "Critical"],
      },
      {
        id: "requestedBy",
        name: "requestedBy",
        label: "Requested By",
        type: "text",
        required: true,
      },
      {
        id: "dueDate",
        name: "dueDate",
        label: "Due Date",
        type: "date",
        required: true,
      },
      {
        id: "estimatedCost",
        name: "estimatedCost",
        label: "Estimated Cost ($)",
        type: "number",
        required: false,
      },
    ],
  },
  {
    id: "2",
    name: "Change Request",
    type: "change-request",
    description: "Request for changes to project scope, timeline, or budget",
    approvalRequired: true,
    approvers: ["Project Manager", "Client"],
    fields: [
      {
        id: "changeTitle",
        name: "changeTitle",
        label: "Change Request Title",
        type: "text",
        required: true,
      },
      {
        id: "currentState",
        name: "currentState",
        label: "Current State",
        type: "textarea",
        required: true,
      },
      {
        id: "proposedChange",
        name: "proposedChange",
        label: "Proposed Change",
        type: "textarea",
        required: true,
      },
      {
        id: "justification",
        name: "justification",
        label: "Justification",
        type: "textarea",
        required: true,
      },
      {
        id: "impactOnSchedule",
        name: "impactOnSchedule",
        label: "Impact on Schedule (days)",
        type: "number",
        required: false,
      },
      {
        id: "impactOnBudget",
        name: "impactOnBudget",
        label: "Impact on Budget ($)",
        type: "number",
        required: false,
      },
    ],
  },
  {
    id: "3",
    name: "Safety Inspection",
    type: "inspection",
    description: "Daily safety inspection checklist",
    approvalRequired: true,
    approvers: ["Safety Officer"],
    fields: [
      {
        id: "inspectionDate",
        name: "inspectionDate",
        label: "Inspection Date",
        type: "date",
        required: true,
      },
      {
        id: "inspector",
        name: "inspector",
        label: "Inspector Name",
        type: "text",
        required: true,
      },
      {
        id: "area",
        name: "area",
        label: "Area/Location",
        type: "text",
        required: true,
      },
      {
        id: "ppeCompliance",
        name: "ppeCompliance",
        label: "PPE Compliance",
        type: "select",
        required: true,
        options: ["Excellent", "Good", "Fair", "Poor"],
      },
      {
        id: "equipmentSafety",
        name: "equipmentSafety",
        label: "Equipment Safety",
        type: "select",
        required: true,
        options: ["Excellent", "Good", "Fair", "Poor"],
      },
      {
        id: "housekeeping",
        name: "housekeeping",
        label: "Housekeeping",
        type: "select",
        required: true,
        options: ["Excellent", "Good", "Fair", "Poor"],
      },
      {
        id: "hazardsIdentified",
        name: "hazardsIdentified",
        label: "Hazards Identified",
        type: "textarea",
        required: false,
      },
      {
        id: "correctiveActions",
        name: "correctiveActions",
        label: "Corrective Actions Required",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    id: "4",
    name: "Daily Progress Report",
    type: "daily-report",
    description: "Daily progress and activity report",
    approvalRequired: false,
    approvers: [],
    fields: [
      {
        id: "reportDate",
        name: "reportDate",
        label: "Report Date",
        type: "date",
        required: true,
      },
      {
        id: "weather",
        name: "weather",
        label: "Weather Conditions",
        type: "select",
        required: true,
        options: ["Clear", "Partly Cloudy", "Overcast", "Light Rain", "Heavy Rain", "Snow"],
      },
      {
        id: "crewSize",
        name: "crewSize",
        label: "Crew Size",
        type: "number",
        required: true,
      },
      {
        id: "workCompleted",
        name: "workCompleted",
        label: "Work Completed",
        type: "textarea",
        required: true,
      },
      {
        id: "materialsUsed",
        name: "materialsUsed",
        label: "Materials Used",
        type: "textarea",
        required: false,
      },
      {
        id: "equipmentUsed",
        name: "equipmentUsed",
        label: "Equipment Used",
        type: "textarea",
        required: false,
      },
      {
        id: "delays",
        name: "delays",
        label: "Delays or Issues",
        type: "textarea",
        required: false,
      },
    ],
  },
]

// Mock form submissions
export const mockFormSubmissions: FormSubmission[] = [
  {
    id: "1",
    templateId: "1",
    templateName: "Work Order Request",
    type: "work-order",
    title: "Electrical Panel Upgrade - Building A",
    status: "under-review",
    submittedBy: "Mike Chen",
    submittedAt: new Date("2024-03-10T09:30:00"),
    projectId: "1",
    projectName: "Downtown Office Complex",
    data: {
      title: "Electrical Panel Upgrade - Building A",
      description:
        "Replace outdated electrical panel in Building A basement with new 400A panel to support increased load requirements.",
      priority: "High",
      requestedBy: "Mike Chen",
      dueDate: "2024-03-25",
      estimatedCost: 15000,
    },
    approvals: [
      {
        id: "1",
        approverName: "Sarah Johnson",
        approverRole: "Project Manager",
        action: "approve",
        comment: "Approved. This is critical for the project timeline.",
        timestamp: new Date("2024-03-10T14:20:00"),
      },
    ],
    comments: [
      {
        id: "1",
        authorName: "Mike Chen",
        authorRole: "Site Supervisor",
        content: "This upgrade is necessary to meet the new electrical code requirements.",
        timestamp: new Date("2024-03-10T09:35:00"),
      },
    ],
    attachments: [
      {
        id: "1",
        name: "electrical-panel-specs.pdf",
        url: "/electrical-panel-specs.pdf",
        size: 2048000,
        type: "application/pdf",
        uploadedAt: new Date("2024-03-10T09:32:00"),
      },
    ],
  },
  {
    id: "2",
    templateId: "2",
    templateName: "Change Request",
    type: "change-request",
    title: "Additional Parking Spaces",
    status: "approved",
    submittedBy: "Sarah Johnson",
    submittedAt: new Date("2024-03-08T11:15:00"),
    projectId: "1",
    projectName: "Downtown Office Complex",
    data: {
      changeTitle: "Additional Parking Spaces",
      currentState: "Current design includes 150 parking spaces in the underground garage.",
      proposedChange: "Add 25 additional parking spaces by extending the garage footprint.",
      justification: "Client has requested additional parking to meet increased tenant demand.",
      impactOnSchedule: 14,
      impactOnBudget: 75000,
    },
    approvals: [
      {
        id: "2",
        approverName: "Sarah Johnson",
        approverRole: "Project Manager",
        action: "approve",
        comment: "Change approved. Will adjust timeline accordingly.",
        timestamp: new Date("2024-03-09T10:30:00"),
      },
      {
        id: "3",
        approverName: "Metro Development Corp",
        approverRole: "Client",
        action: "approve",
        comment: "Approved. Please proceed with the additional parking spaces.",
        timestamp: new Date("2024-03-09T16:45:00"),
      },
    ],
    comments: [],
    attachments: [
      {
        id: "2",
        name: "revised-parking-layout.dwg",
        url: "/revised-parking-layout.dwg",
        size: 5120000,
        type: "application/dwg",
        uploadedAt: new Date("2024-03-08T11:18:00"),
      },
    ],
  },
  {
    id: "3",
    templateId: "3",
    templateName: "Safety Inspection",
    type: "inspection",
    title: "Daily Safety Inspection - March 12",
    status: "requires-changes",
    submittedBy: "Lisa Rodriguez",
    submittedAt: new Date("2024-03-12T16:00:00"),
    projectId: "1",
    projectName: "Downtown Office Complex",
    data: {
      inspectionDate: "2024-03-12",
      inspector: "Lisa Rodriguez",
      area: "Construction Site - Level 5",
      ppeCompliance: "Good",
      equipmentSafety: "Fair",
      housekeeping: "Poor",
      hazardsIdentified: "Loose scaffolding on east side, debris accumulation near elevator shaft",
      correctiveActions: "Secure scaffolding, clear debris, improve housekeeping protocols",
    },
    approvals: [
      {
        id: "4",
        approverName: "Lisa Rodriguez",
        approverRole: "Safety Officer",
        action: "request-changes",
        comment: "Immediate action required on scaffolding and debris. Re-inspection needed within 24 hours.",
        timestamp: new Date("2024-03-12T16:30:00"),
      },
    ],
    comments: [
      {
        id: "2",
        authorName: "Mike Chen",
        authorRole: "Site Supervisor",
        content: "Will address scaffolding issue immediately and schedule debris cleanup for tomorrow morning.",
        timestamp: new Date("2024-03-12T17:15:00"),
      },
    ],
    attachments: [
      {
        id: "3",
        name: "safety-inspection-photos.zip",
        url: "/safety-inspection-photos.zip",
        size: 8192000,
        type: "application/zip",
        uploadedAt: new Date("2024-03-12T16:05:00"),
      },
    ],
  },
  {
    id: "4",
    templateId: "4",
    templateName: "Daily Progress Report",
    type: "daily-report",
    title: "Daily Report - March 11, 2024",
    status: "submitted",
    submittedBy: "Mike Chen",
    submittedAt: new Date("2024-03-11T17:30:00"),
    projectId: "1",
    projectName: "Downtown Office Complex",
    data: {
      reportDate: "2024-03-11",
      weather: "Clear",
      crewSize: 24,
      workCompleted: "Completed concrete pour for Level 4 slab. Started steel beam installation for Level 5.",
      materialsUsed: "15 cubic yards concrete, 8 steel beams (W14x30), rebar #4 and #5",
      equipmentUsed: "Tower crane, concrete pump, welding equipment",
      delays: "None",
    },
    approvals: [],
    comments: [],
    attachments: [],
  },
]

export function getStatusColor(status: FormStatus): string {
  const colors = {
    draft: "bg-gray-100 text-gray-800",
    submitted: "bg-blue-100 text-blue-800",
    "under-review": "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    "requires-changes": "bg-orange-100 text-orange-800",
  }
  return colors[status]
}

export function getFormTypeColor(type: FormType): string {
  const colors = {
    "work-order": "bg-blue-100 text-blue-800",
    "change-request": "bg-purple-100 text-purple-800",
    inspection: "bg-orange-100 text-orange-800",
    permit: "bg-green-100 text-green-800",
    "daily-report": "bg-teal-100 text-teal-800",
    "incident-report": "bg-red-100 text-red-800",
  }
  return colors[type]
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
