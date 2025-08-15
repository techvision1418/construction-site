export type IncidentSeverity = "minor" | "moderate" | "serious" | "critical"
export type IncidentStatus = "reported" | "investigating" | "resolved" | "closed"
export type InspectionStatus = "scheduled" | "in-progress" | "completed" | "overdue"
export type SafetyRating = "excellent" | "good" | "fair" | "poor" | "critical"
export type ObservationType = "safe-behavior" | "unsafe-behavior" | "near-miss" | "hazard" | "suggestion"

export interface SafetyIncident {
  id: string
  incidentNumber: string
  title: string
  description: string
  severity: IncidentSeverity
  status: IncidentStatus
  reportedBy: string
  reportedAt: Date
  occurredAt: Date
  location: string
  projectId?: string
  projectName?: string
  injuredPersons: InjuredPerson[]
  witnesses: string[]
  immediateActions: string
  rootCause?: string
  correctiveActions: string[]
  investigatedBy?: string
  investigationDate?: Date
  attachments: SafetyAttachment[]
  followUpRequired: boolean
  followUpDate?: Date
}

export interface InjuredPerson {
  name: string
  role: string
  injuryType: string
  bodyPart: string
  medicalAttention: boolean
  hospitalRequired: boolean
}

export interface SafetyInspection {
  id: string
  inspectionNumber: string
  title: string
  type: string
  status: InspectionStatus
  scheduledDate: Date
  completedDate?: Date
  inspector: string
  location: string
  projectId?: string
  projectName?: string
  checklist: InspectionItem[]
  overallRating: SafetyRating
  findings: string[]
  recommendations: string[]
  correctiveActions: CorrectiveAction[]
  nextInspectionDate?: Date
}

export interface InspectionItem {
  id: string
  category: string
  item: string
  status: "pass" | "fail" | "na"
  notes?: string
  priority?: "low" | "medium" | "high"
}

export interface CorrectiveAction {
  id: string
  description: string
  assignedTo: string
  dueDate: Date
  status: "pending" | "in-progress" | "completed"
  completedDate?: Date
}

export interface SafetyObservation {
  id: string
  observationNumber: string
  type: ObservationType
  title: string
  description: string
  location: string
  observedBy: string
  observedAt: Date
  projectId?: string
  projectName?: string
  personInvolved?: string
  immediateAction: string
  followUpRequired: boolean
  followUpActions: string[]
  status: "open" | "in-progress" | "closed"
  attachments: SafetyAttachment[]
}

export interface SafetyTraining {
  id: string
  employeeName: string
  employeeId: string
  trainingType: string
  trainingDate: Date
  expiryDate?: Date
  instructor: string
  status: "completed" | "expired" | "upcoming"
  certificateNumber?: string
  score?: number
}

export interface SafetyAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedAt: Date
}

// Mock safety incidents
export const mockSafetyIncidents: SafetyIncident[] = [
  {
    id: "1",
    incidentNumber: "INC-2024-001",
    title: "Minor Cut from Sharp Metal Edge",
    description: "Worker sustained a minor cut on left hand while handling steel beam with sharp edge.",
    severity: "minor",
    status: "resolved",
    reportedBy: "Mike Chen",
    reportedAt: new Date("2024-03-12T14:30:00"),
    occurredAt: new Date("2024-03-12T14:15:00"),
    location: "Level 5 - Steel Installation Area",
    projectId: "1",
    projectName: "Downtown Office Complex",
    injuredPersons: [
      {
        name: "Robert Martinez",
        role: "Steel Worker",
        injuryType: "Laceration",
        bodyPart: "Left Hand",
        medicalAttention: true,
        hospitalRequired: false,
      },
    ],
    witnesses: ["Carlos Rodriguez", "James Wilson"],
    immediateActions: "First aid applied, wound cleaned and bandaged. Worker sent to medical clinic for evaluation.",
    rootCause: "Steel beam had unfinished sharp edge that was not properly ground down.",
    correctiveActions: [
      "All steel beams to be inspected for sharp edges before installation",
      "Additional safety briefing on handling materials with potential sharp edges",
      "Ensure proper PPE (cut-resistant gloves) are worn when handling steel",
    ],
    investigatedBy: "Lisa Rodriguez",
    investigationDate: new Date("2024-03-13"),
    attachments: [
      {
        id: "1",
        name: "incident-photos.jpg",
        url: "/incident-photos.jpg",
        type: "image/jpeg",
        size: 2048000,
        uploadedAt: new Date("2024-03-12T15:00:00"),
      },
    ],
    followUpRequired: true,
    followUpDate: new Date("2024-03-19"),
  },
  {
    id: "2",
    incidentNumber: "INC-2024-002",
    title: "Near Miss - Falling Tools",
    description: "Hammer fell from Level 3 scaffolding, narrowly missing workers below.",
    severity: "moderate",
    status: "investigating",
    reportedBy: "Sarah Johnson",
    reportedAt: new Date("2024-03-11T10:45:00"),
    occurredAt: new Date("2024-03-11T10:30:00"),
    location: "Level 3 - Scaffolding Area",
    projectId: "1",
    projectName: "Downtown Office Complex",
    injuredPersons: [],
    witnesses: ["Mike Chen", "David Park"],
    immediateActions: "Area cleared, tool tethering procedures reviewed with all workers on elevated surfaces.",
    correctiveActions: [
      "Mandatory tool tethering for all work above 6 feet",
      "Additional safety nets installed below scaffolding areas",
      "Daily tool inspection checklist implemented",
    ],
    investigatedBy: "Lisa Rodriguez",
    investigationDate: new Date("2024-03-12"),
    attachments: [],
    followUpRequired: true,
    followUpDate: new Date("2024-03-18"),
  },
]

// Mock safety inspections
export const mockSafetyInspections: SafetyInspection[] = [
  {
    id: "1",
    inspectionNumber: "INS-2024-001",
    title: "Weekly Safety Inspection - Level 5",
    type: "Weekly General Inspection",
    status: "completed",
    scheduledDate: new Date("2024-03-11"),
    completedDate: new Date("2024-03-11T16:00:00"),
    inspector: "Lisa Rodriguez",
    location: "Level 5 - Construction Area",
    projectId: "1",
    projectName: "Downtown Office Complex",
    checklist: [
      {
        id: "1",
        category: "PPE Compliance",
        item: "Hard hats worn by all personnel",
        status: "pass",
        notes: "All workers properly wearing hard hats",
      },
      {
        id: "2",
        category: "PPE Compliance",
        item: "Safety glasses/goggles in use",
        status: "pass",
        notes: "Good compliance observed",
      },
      {
        id: "3",
        category: "Fall Protection",
        item: "Guardrails properly installed",
        status: "fail",
        notes: "Missing guardrail on east side opening",
        priority: "high",
      },
      {
        id: "4",
        category: "Housekeeping",
        item: "Work areas clean and organized",
        status: "pass",
        notes: "Areas well maintained",
      },
      {
        id: "5",
        category: "Equipment Safety",
        item: "Tools in good working condition",
        status: "pass",
        notes: "All tools inspected and tagged",
      },
    ],
    overallRating: "good",
    findings: [
      "Missing guardrail creates fall hazard",
      "Overall good safety compliance",
      "Workers following proper procedures",
    ],
    recommendations: [
      "Install missing guardrail immediately",
      "Continue current safety practices",
      "Consider additional fall protection training",
    ],
    correctiveActions: [
      {
        id: "1",
        description: "Install guardrail on east side opening",
        assignedTo: "Mike Chen",
        dueDate: new Date("2024-03-13"),
        status: "completed",
        completedDate: new Date("2024-03-12"),
      },
    ],
    nextInspectionDate: new Date("2024-03-18"),
  },
  {
    id: "2",
    inspectionNumber: "INS-2024-002",
    title: "Electrical Safety Inspection",
    type: "Electrical Systems Inspection",
    status: "scheduled",
    scheduledDate: new Date("2024-03-15"),
    inspector: "David Park",
    location: "All Levels - Electrical Systems",
    projectId: "1",
    projectName: "Downtown Office Complex",
    checklist: [],
    overallRating: "good",
    findings: [],
    recommendations: [],
    correctiveActions: [],
  },
]

// Mock safety observations
export const mockSafetyObservations: SafetyObservation[] = [
  {
    id: "1",
    observationNumber: "OBS-2024-001",
    type: "safe-behavior",
    title: "Excellent Use of Fall Protection",
    description: "Observed worker properly using full body harness and double lanyard system while working on edge.",
    location: "Level 4 - Perimeter Work",
    observedBy: "Sarah Johnson",
    observedAt: new Date("2024-03-10T11:30:00"),
    projectId: "1",
    projectName: "Downtown Office Complex",
    personInvolved: "Carlos Rodriguez",
    immediateAction: "Recognized worker for excellent safety practices",
    followUpRequired: false,
    followUpActions: [],
    status: "closed",
    attachments: [],
  },
  {
    id: "2",
    observationNumber: "OBS-2024-002",
    type: "unsafe-behavior",
    title: "Improper Ladder Usage",
    description: "Worker observed using ladder without proper 4:1 ratio setup and no spotter present.",
    location: "Level 2 - Electrical Work Area",
    observedBy: "Mike Chen",
    observedAt: new Date("2024-03-09T14:20:00"),
    projectId: "1",
    projectName: "Downtown Office Complex",
    personInvolved: "James Wilson",
    immediateAction: "Stopped work, corrected ladder setup, provided refresher training",
    followUpRequired: true,
    followUpActions: ["Schedule ladder safety refresher training", "Implement buddy system for ladder work"],
    status: "in-progress",
    attachments: [],
  },
  {
    id: "3",
    observationNumber: "OBS-2024-003",
    type: "hazard",
    title: "Exposed Electrical Wiring",
    description: "Temporary electrical wiring found without proper protection in high-traffic area.",
    location: "Ground Level - Main Entrance",
    observedBy: "Lisa Rodriguez",
    observedAt: new Date("2024-03-08T09:15:00"),
    projectId: "1",
    projectName: "Downtown Office Complex",
    immediateAction: "Area cordoned off, electrical contractor notified immediately",
    followUpRequired: true,
    followUpActions: ["Install proper cable protection", "Review temporary electrical procedures"],
    status: "closed",
    attachments: [
      {
        id: "2",
        name: "hazard-photo.jpg",
        url: "/hazard-photo.jpg",
        type: "image/jpeg",
        size: 1536000,
        uploadedAt: new Date("2024-03-08T09:20:00"),
      },
    ],
  },
]

// Mock safety training records
export const mockSafetyTraining: SafetyTraining[] = [
  {
    id: "1",
    employeeName: "Robert Martinez",
    employeeId: "EMP-001",
    trainingType: "OSHA 10-Hour Construction",
    trainingDate: new Date("2024-01-15"),
    expiryDate: new Date("2027-01-15"),
    instructor: "Safety Training Institute",
    status: "completed",
    certificateNumber: "OSHA-10-2024-001",
    score: 95,
  },
  {
    id: "2",
    employeeName: "Carlos Rodriguez",
    employeeId: "EMP-002",
    trainingType: "Fall Protection Competent Person",
    trainingDate: new Date("2024-02-20"),
    expiryDate: new Date("2025-02-20"),
    instructor: "Lisa Rodriguez",
    status: "completed",
    certificateNumber: "FP-CP-2024-002",
    score: 88,
  },
  {
    id: "3",
    employeeName: "James Wilson",
    employeeId: "EMP-003",
    trainingType: "Scaffold Safety",
    trainingDate: new Date("2023-12-10"),
    expiryDate: new Date("2024-12-10"),
    instructor: "Construction Safety Corp",
    status: "expired",
    certificateNumber: "SS-2023-003",
    score: 92,
  },
  {
    id: "4",
    employeeName: "David Park",
    employeeId: "EMP-004",
    trainingType: "Electrical Safety",
    trainingDate: new Date("2024-03-20"),
    instructor: "ElectroSafe Training",
    status: "upcoming",
  },
]

export function getIncidentSeverityColor(severity: IncidentSeverity): string {
  const colors = {
    minor: "bg-yellow-100 text-yellow-800",
    moderate: "bg-orange-100 text-orange-800",
    serious: "bg-red-100 text-red-800",
    critical: "bg-red-200 text-red-900",
  }
  return colors[severity]
}

export function getIncidentStatusColor(status: IncidentStatus): string {
  const colors = {
    reported: "bg-blue-100 text-blue-800",
    investigating: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  }
  return colors[status]
}

export function getInspectionStatusColor(status: InspectionStatus): string {
  const colors = {
    scheduled: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    overdue: "bg-red-100 text-red-800",
  }
  return colors[status]
}

export function getSafetyRatingColor(rating: SafetyRating): string {
  const colors = {
    excellent: "bg-green-100 text-green-800",
    good: "bg-blue-100 text-blue-800",
    fair: "bg-yellow-100 text-yellow-800",
    poor: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  }
  return colors[rating]
}

export function getObservationTypeColor(type: ObservationType): string {
  const colors = {
    "safe-behavior": "bg-green-100 text-green-800",
    "unsafe-behavior": "bg-red-100 text-red-800",
    "near-miss": "bg-orange-100 text-orange-800",
    hazard: "bg-red-100 text-red-800",
    suggestion: "bg-blue-100 text-blue-800",
  }
  return colors[type]
}

export function getTrainingStatusColor(status: SafetyTraining["status"]): string {
  const colors = {
    completed: "bg-green-100 text-green-800",
    expired: "bg-red-100 text-red-800",
    upcoming: "bg-blue-100 text-blue-800",
  }
  return colors[status]
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function calculateSafetyMetrics() {
  const totalIncidents = mockSafetyIncidents.length
  const openIncidents = mockSafetyIncidents.filter((i) => i.status !== "closed").length
  const criticalIncidents = mockSafetyIncidents.filter((i) => i.severity === "critical").length
  const completedInspections = mockSafetyInspections.filter((i) => i.status === "completed").length
  const overdueInspections = mockSafetyInspections.filter((i) => i.status === "overdue").length

  return {
    totalIncidents,
    openIncidents,
    criticalIncidents,
    completedInspections,
    overdueInspections,
  }
}
