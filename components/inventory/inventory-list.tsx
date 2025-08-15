"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  mockMaterials,
  getStockStatusColor,
  getCategoryColor,
  formatCurrency,
  type MaterialCategory,
  type StockStatus,
} from "@/lib/inventory"
import { Search, Plus, Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"

interface InventoryListProps {
  onItemSelect?: (itemId: string) => void
  onAddItem?: () => void
  onCreateOrder?: () => void
}

export function InventoryList({ onItemSelect, onAddItem, onCreateOrder }: InventoryListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<MaterialCategory | "all">("all")
  const [statusFilter, setStatusFilter] = useState<StockStatus | "all">("all")

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || material.category === categoryFilter
    const matchesStatus = statusFilter === "all" || material.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalValue = mockMaterials.reduce((sum, material) => sum + material.currentStock * material.costPerUnit, 0)
  const lowStockCount = mockMaterials.filter((material) => material.currentStock <= material.minStockLevel).length
  const outOfStockCount = mockMaterials.filter((material) => material.currentStock === 0).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track materials, stock levels, and manage orders</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onCreateOrder} variant="outline" className="gap-2 bg-transparent">
            <Package className="h-4 w-4" />
            Create Order
          </Button>
          <Button onClick={onAddItem} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockMaterials.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{lowStockCount}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{outOfStockCount}</p>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as MaterialCategory | "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="concrete">Concrete</SelectItem>
            <SelectItem value="steel">Steel</SelectItem>
            <SelectItem value="lumber">Lumber</SelectItem>
            <SelectItem value="electrical">Electrical</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="tools">Tools</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
            <SelectItem value="hardware">Hardware</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StockStatus | "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            <SelectItem value="on-order">On Order</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => {
          const stockPercentage = (material.currentStock / material.maxStockLevel) * 100

          return (
            <Card
              key={material.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onItemSelect?.(material.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{material.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getStockStatusColor(material.status)} variant="secondary">
                      {material.status.replace("-", " ")}
                    </Badge>
                    <Badge className={getCategoryColor(material.category)} variant="secondary">
                      {material.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">SKU</p>
                    <p className="text-muted-foreground">{material.sku}</p>
                  </div>
                  <div>
                    <p className="font-medium">Unit Cost</p>
                    <p className="text-muted-foreground">{formatCurrency(material.costPerUnit)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Stock Level</span>
                    <span className="font-medium">
                      {material.currentStock} / {material.maxStockLevel} {material.unit}
                    </span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: {material.minStockLevel}</span>
                    <span>Max: {material.maxStockLevel}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{material.location}</p>
                  </div>
                  <div>
                    <p className="font-medium">Supplier</p>
                    <p className="text-muted-foreground">{material.supplier}</p>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-medium">{formatCurrency(material.currentStock * material.costPerUnit)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No materials found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
