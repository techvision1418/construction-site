export type MaterialCategory =
  | "concrete"
  | "steel"
  | "lumber"
  | "electrical"
  | "plumbing"
  | "tools"
  | "safety"
  | "hardware"
export type StockStatus = "in-stock" | "low-stock" | "out-of-stock" | "on-order"
export type MovementType = "in" | "out" | "transfer" | "adjustment"
export type OrderStatus = "draft" | "pending" | "approved" | "ordered" | "received" | "cancelled"

export interface Material {
  id: string
  name: string
  description: string
  category: MaterialCategory
  sku: string
  unit: string
  costPerUnit: number
  currentStock: number
  minStockLevel: number
  maxStockLevel: number
  location: string
  supplier: string
  lastUpdated: Date
  status: StockStatus
}

export interface StockMovement {
  id: string
  materialId: string
  materialName: string
  type: MovementType
  quantity: number
  unit: string
  costPerUnit: number
  totalCost: number
  projectId?: string
  projectName?: string
  reference: string
  notes?: string
  performedBy: string
  timestamp: Date
}

export interface PurchaseOrder {
  id: string
  orderNumber: string
  supplier: string
  status: OrderStatus
  orderDate: Date
  expectedDelivery?: Date
  actualDelivery?: Date
  items: PurchaseOrderItem[]
  subtotal: number
  tax: number
  total: number
  createdBy: string
  approvedBy?: string
  notes?: string
}

export interface PurchaseOrderItem {
  id: string
  materialId: string
  materialName: string
  quantity: number
  unit: string
  unitCost: number
  totalCost: number
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  paymentTerms: string
  rating: number
  isActive: boolean
}

// Mock materials data
export const mockMaterials: Material[] = [
  {
    id: "1",
    name: "Portland Cement",
    description: "Type I Portland cement for general construction",
    category: "concrete",
    sku: "CEM-001",
    unit: "bags",
    costPerUnit: 12.5,
    currentStock: 150,
    minStockLevel: 50,
    maxStockLevel: 300,
    location: "Warehouse A - Bay 1",
    supplier: "BuildMart Supply Co.",
    lastUpdated: new Date("2024-03-12"),
    status: "in-stock",
  },
  {
    id: "2",
    name: "Rebar #4 (1/2 inch)",
    description: "Grade 60 deformed steel rebar, 20ft lengths",
    category: "steel",
    sku: "REB-004",
    unit: "pieces",
    costPerUnit: 8.75,
    currentStock: 25,
    minStockLevel: 50,
    maxStockLevel: 200,
    location: "Yard - Steel Section",
    supplier: "Metro Steel Works",
    lastUpdated: new Date("2024-03-11"),
    status: "low-stock",
  },
  {
    id: "3",
    name: "2x4 Lumber (8ft)",
    description: "Pressure treated pine lumber, 2x4x8",
    category: "lumber",
    sku: "LUM-248",
    unit: "pieces",
    costPerUnit: 4.25,
    currentStock: 0,
    minStockLevel: 100,
    maxStockLevel: 500,
    location: "Lumber Yard",
    supplier: "Forest Products Inc.",
    lastUpdated: new Date("2024-03-10"),
    status: "out-of-stock",
  },
  {
    id: "4",
    name: "12 AWG Electrical Wire",
    description: "THHN copper wire, 500ft roll",
    category: "electrical",
    sku: "ELE-012",
    unit: "rolls",
    costPerUnit: 89.99,
    currentStock: 12,
    minStockLevel: 5,
    maxStockLevel: 25,
    location: "Warehouse B - Electrical",
    supplier: "ElectroMax Supply",
    lastUpdated: new Date("2024-03-12"),
    status: "in-stock",
  },
  {
    id: "5",
    name: "PVC Pipe 4 inch",
    description: "Schedule 40 PVC pipe, 10ft lengths",
    category: "plumbing",
    sku: "PVC-410",
    unit: "pieces",
    costPerUnit: 15.5,
    currentStock: 35,
    minStockLevel: 20,
    maxStockLevel: 100,
    location: "Warehouse C - Plumbing",
    supplier: "PlumbPro Distributors",
    lastUpdated: new Date("2024-03-11"),
    status: "in-stock",
  },
  {
    id: "6",
    name: "Cordless Drill",
    description: "18V lithium-ion cordless drill with battery",
    category: "tools",
    sku: "TOL-CD18",
    unit: "units",
    costPerUnit: 129.99,
    currentStock: 8,
    minStockLevel: 5,
    maxStockLevel: 15,
    location: "Tool Crib",
    supplier: "ToolMaster Pro",
    lastUpdated: new Date("2024-03-09"),
    status: "in-stock",
  },
  {
    id: "7",
    name: "Safety Helmets",
    description: "ANSI Z89.1 compliant hard hats, white",
    category: "safety",
    sku: "SAF-HH1",
    unit: "units",
    costPerUnit: 18.75,
    currentStock: 45,
    minStockLevel: 30,
    maxStockLevel: 100,
    location: "Safety Equipment Room",
    supplier: "SafetyFirst Equipment",
    lastUpdated: new Date("2024-03-12"),
    status: "in-stock",
  },
  {
    id: "8",
    name: "Galvanized Bolts 1/2x6",
    description: "Hex head bolts with nuts and washers",
    category: "hardware",
    sku: "HW-B126",
    unit: "boxes",
    costPerUnit: 24.99,
    currentStock: 18,
    minStockLevel: 10,
    maxStockLevel: 50,
    location: "Hardware Storage",
    supplier: "FastenerWorld",
    lastUpdated: new Date("2024-03-11"),
    status: "in-stock",
  },
]

// Mock suppliers data
export const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "BuildMart Supply Co.",
    contactPerson: "John Martinez",
    email: "john@buildmart.com",
    phone: "(555) 123-4567",
    address: "1234 Industrial Blvd, Construction City, CC 12345",
    paymentTerms: "Net 30",
    rating: 4.5,
    isActive: true,
  },
  {
    id: "2",
    name: "Metro Steel Works",
    contactPerson: "Sarah Chen",
    email: "sarah@metrosteel.com",
    phone: "(555) 234-5678",
    address: "5678 Steel Ave, Industrial Park, IP 23456",
    paymentTerms: "Net 15",
    rating: 4.8,
    isActive: true,
  },
  {
    id: "3",
    name: "Forest Products Inc.",
    contactPerson: "Mike Thompson",
    email: "mike@forestproducts.com",
    phone: "(555) 345-6789",
    address: "9012 Lumber Rd, Timber Town, TT 34567",
    paymentTerms: "Net 30",
    rating: 4.2,
    isActive: true,
  },
  {
    id: "4",
    name: "ElectroMax Supply",
    contactPerson: "Lisa Wang",
    email: "lisa@electromax.com",
    phone: "(555) 456-7890",
    address: "3456 Electric St, Power City, PC 45678",
    paymentTerms: "Net 30",
    rating: 4.6,
    isActive: true,
  },
]

// Mock stock movements
export const mockStockMovements: StockMovement[] = [
  {
    id: "1",
    materialId: "1",
    materialName: "Portland Cement",
    type: "in",
    quantity: 100,
    unit: "bags",
    costPerUnit: 12.5,
    totalCost: 1250.0,
    reference: "PO-2024-001",
    notes: "Delivery from BuildMart Supply Co.",
    performedBy: "Mike Chen",
    timestamp: new Date("2024-03-12T08:30:00"),
  },
  {
    id: "2",
    materialId: "1",
    materialName: "Portland Cement",
    type: "out",
    quantity: 25,
    unit: "bags",
    costPerUnit: 12.5,
    totalCost: 312.5,
    projectId: "1",
    projectName: "Downtown Office Complex",
    reference: "WO-2024-015",
    notes: "Used for foundation work",
    performedBy: "Sarah Johnson",
    timestamp: new Date("2024-03-12T14:15:00"),
  },
  {
    id: "3",
    materialId: "2",
    materialName: "Rebar #4 (1/2 inch)",
    type: "out",
    quantity: 50,
    unit: "pieces",
    costPerUnit: 8.75,
    totalCost: 437.5,
    projectId: "1",
    projectName: "Downtown Office Complex",
    reference: "WO-2024-016",
    notes: "Foundation reinforcement",
    performedBy: "Mike Chen",
    timestamp: new Date("2024-03-11T10:45:00"),
  },
  {
    id: "4",
    materialId: "4",
    materialName: "12 AWG Electrical Wire",
    type: "in",
    quantity: 5,
    unit: "rolls",
    costPerUnit: 89.99,
    totalCost: 449.95,
    reference: "PO-2024-002",
    notes: "Emergency restock",
    performedBy: "Lisa Rodriguez",
    timestamp: new Date("2024-03-10T16:20:00"),
  },
]

// Mock purchase orders
export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    orderNumber: "PO-2024-001",
    supplier: "BuildMart Supply Co.",
    status: "received",
    orderDate: new Date("2024-03-08"),
    expectedDelivery: new Date("2024-03-12"),
    actualDelivery: new Date("2024-03-12"),
    items: [
      {
        id: "1",
        materialId: "1",
        materialName: "Portland Cement",
        quantity: 100,
        unit: "bags",
        unitCost: 12.5,
        totalCost: 1250.0,
      },
    ],
    subtotal: 1250.0,
    tax: 100.0,
    total: 1350.0,
    createdBy: "Sarah Johnson",
    approvedBy: "John Smith",
    notes: "Regular cement restock",
  },
  {
    id: "2",
    orderNumber: "PO-2024-002",
    supplier: "Metro Steel Works",
    status: "ordered",
    orderDate: new Date("2024-03-13"),
    expectedDelivery: new Date("2024-03-18"),
    items: [
      {
        id: "2",
        materialId: "2",
        materialName: "Rebar #4 (1/2 inch)",
        quantity: 100,
        unit: "pieces",
        unitCost: 8.75,
        totalCost: 875.0,
      },
    ],
    subtotal: 875.0,
    tax: 70.0,
    total: 945.0,
    createdBy: "Mike Chen",
    approvedBy: "Sarah Johnson",
    notes: "Urgent restock - low inventory",
  },
  {
    id: "3",
    orderNumber: "PO-2024-003",
    supplier: "Forest Products Inc.",
    status: "pending",
    orderDate: new Date("2024-03-14"),
    expectedDelivery: new Date("2024-03-20"),
    items: [
      {
        id: "3",
        materialId: "3",
        materialName: "2x4 Lumber (8ft)",
        quantity: 200,
        unit: "pieces",
        unitCost: 4.25,
        totalCost: 850.0,
      },
    ],
    subtotal: 850.0,
    tax: 68.0,
    total: 918.0,
    createdBy: "Sarah Johnson",
    notes: "Restock lumber for upcoming phase",
  },
]

export function getStockStatusColor(status: StockStatus): string {
  const colors = {
    "in-stock": "bg-green-100 text-green-800",
    "low-stock": "bg-yellow-100 text-yellow-800",
    "out-of-stock": "bg-red-100 text-red-800",
    "on-order": "bg-blue-100 text-blue-800",
  }
  return colors[status]
}

export function getCategoryColor(category: MaterialCategory): string {
  const colors = {
    concrete: "bg-gray-100 text-gray-800",
    steel: "bg-slate-100 text-slate-800",
    lumber: "bg-amber-100 text-amber-800",
    electrical: "bg-yellow-100 text-yellow-800",
    plumbing: "bg-blue-100 text-blue-800",
    tools: "bg-purple-100 text-purple-800",
    safety: "bg-orange-100 text-orange-800",
    hardware: "bg-green-100 text-green-800",
  }
  return colors[category]
}

export function getOrderStatusColor(status: OrderStatus): string {
  const colors = {
    draft: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
    ordered: "bg-purple-100 text-purple-800",
    received: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return colors[status]
}

export function getMovementTypeColor(type: MovementType): string {
  const colors = {
    in: "bg-green-100 text-green-800",
    out: "bg-red-100 text-red-800",
    transfer: "bg-blue-100 text-blue-800",
    adjustment: "bg-yellow-100 text-yellow-800",
  }
  return colors[type]
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount)
}

export function calculateStockValue(materials: Material[]): number {
  return materials.reduce((total, material) => total + material.currentStock * material.costPerUnit, 0)
}

export function getLowStockItems(materials: Material[]): Material[] {
  return materials.filter((material) => material.currentStock <= material.minStockLevel)
}
