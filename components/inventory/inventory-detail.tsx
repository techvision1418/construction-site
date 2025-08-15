"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  mockMaterials,
  mockStockMovements,
  getStockStatusColor,
  getCategoryColor,
  getMovementTypeColor,
  formatCurrency,
} from "@/lib/inventory"
import {
  ArrowLeft,
  Edit,
  Package,
  MapPin,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Settings,
} from "lucide-react"

interface InventoryDetailProps {
  itemId: string
  onBack: () => void
  onEdit?: (itemId: string) => void
}

export function InventoryDetail({ itemId, onBack, onEdit }: InventoryDetailProps) {
  const material = mockMaterials.find((m) => m.id === itemId)
  const movements = mockStockMovements.filter((m) => m.materialId === itemId)

  if (!material) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Material not found.</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const stockPercentage = (material.currentStock / material.maxStockLevel) * 100
  const totalValue = material.currentStock * material.costPerUnit

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "in":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "out":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "transfer":
        return <ArrowUpDown className="h-4 w-4 text-blue-600" />
      case "adjustment":
        return <Settings className="h-4 w-4 text-yellow-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inventory
          </Button>
        </div>
        <Button onClick={() => onEdit?.(material.id)} className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Material
        </Button>
      </div>

      {/* Material Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{material.name}</h1>
            <p className="text-muted-foreground mt-2">{material.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStockStatusColor(material.status)} variant="secondary">
              {material.status.replace("-", " ")}
            </Badge>
            <Badge className={getCategoryColor(material.category)} variant="secondary">
              {material.category}
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{material.currentStock}</p>
                  <p className="text-sm text-muted-foreground">Current Stock ({material.unit})</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(material.costPerUnit)}</p>
                  <p className="text-sm text-muted-foreground">Unit Cost</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
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
                <Settings className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{stockPercentage.toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">Stock Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stock Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Stock</span>
                    <span className="font-medium">
                      {material.currentStock} {material.unit}
                    </span>
                  </div>
                  <Progress value={stockPercentage} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: {material.minStockLevel}</span>
                    <span>Max: {material.maxStockLevel}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Minimum Level</span>
                    <span className="text-sm font-medium">
                      {material.minStockLevel} {material.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Maximum Level</span>
                    <span className="text-sm font-medium">
                      {material.maxStockLevel} {material.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reorder Point</span>
                    <span className="text-sm font-medium">
                      {material.minStockLevel} {material.unit}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">SKU</p>
                    <p className="text-sm text-muted-foreground">{material.sku}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{material.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Supplier</p>
                    <p className="text-sm text-muted-foreground">{material.supplier}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">{material.lastUpdated.toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <div className="space-y-4">
            {movements.length > 0 ? (
              movements.map((movement) => (
                <Card key={movement.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getMovementIcon(movement.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getMovementTypeColor(movement.type)} variant="secondary">
                              {movement.type}
                            </Badge>
                            <span className="font-medium">
                              {movement.type === "in" ? "+" : "-"}
                              {movement.quantity} {movement.unit}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {movement.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Reference</p>
                            <p className="text-muted-foreground">{movement.reference}</p>
                          </div>
                          <div>
                            <p className="font-medium">Performed By</p>
                            <p className="text-muted-foreground">{movement.performedBy}</p>
                          </div>
                          <div>
                            <p className="font-medium">Total Cost</p>
                            <p className="text-muted-foreground">{formatCurrency(movement.totalCost)}</p>
                          </div>
                        </div>
                        {movement.projectName && (
                          <div className="mt-2">
                            <p className="text-sm">
                              <span className="font-medium">Project:</span> {movement.projectName}
                            </p>
                          </div>
                        )}
                        {movement.notes && (
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">{movement.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No stock movements recorded.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Material Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Material Name</p>
                    <p className="text-muted-foreground">{material.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Description</p>
                    <p className="text-muted-foreground">{material.description}</p>
                  </div>
                  <div>
                    <p className="font-medium">Category</p>
                    <p className="text-muted-foreground capitalize">{material.category}</p>
                  </div>
                  <div>
                    <p className="font-medium">SKU</p>
                    <p className="text-muted-foreground">{material.sku}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Unit of Measure</p>
                    <p className="text-muted-foreground">{material.unit}</p>
                  </div>
                  <div>
                    <p className="font-medium">Cost Per Unit</p>
                    <p className="text-muted-foreground">{formatCurrency(material.costPerUnit)}</p>
                  </div>
                  <div>
                    <p className="font-medium">Storage Location</p>
                    <p className="text-muted-foreground">{material.location}</p>
                  </div>
                  <div>
                    <p className="font-medium">Primary Supplier</p>
                    <p className="text-muted-foreground">{material.supplier}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
