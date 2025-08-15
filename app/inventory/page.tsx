"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { InventoryList } from "@/components/inventory/inventory-list"
import { InventoryDetail } from "@/components/inventory/inventory-detail"
import { PurchaseOrders } from "@/components/inventory/purchase-orders"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ViewMode = "list" | "detail" | "orders"

export default function InventoryPage() {
  const { isAuthenticated, user } = useAuth()
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("materials")

  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId)
    setViewMode("detail")
  }

  const handleBackToList = () => {
    setViewMode("list")
    setSelectedItemId(null)
  }

  const handleAddItem = () => {
    // In a real app, this would open a form to add new material
    console.log("Add new material")
  }

  const handleCreateOrder = () => {
    // In a real app, this would open a form to create new purchase order
    console.log("Create new purchase order")
  }

  const handleOrderSelect = (orderId: string) => {
    // In a real app, this would show order details
    console.log("Selected order:", orderId)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {viewMode === "detail" && selectedItemId ? (
            <InventoryDetail itemId={selectedItemId} onBack={handleBackToList} />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="materials">
                <InventoryList
                  onItemSelect={handleItemSelect}
                  onAddItem={handleAddItem}
                  onCreateOrder={handleCreateOrder}
                />
              </TabsContent>

              <TabsContent value="orders">
                <PurchaseOrders onOrderSelect={handleOrderSelect} onCreateOrder={handleCreateOrder} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}
