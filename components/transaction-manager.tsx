"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"

export function TransactionManager() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Add Transaction Button */}
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Transacción
        </Button>
      </div>

      {/* Transaction Form */}
      {showForm && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Agregar Transacción</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm onClose={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      {/* Transaction List */}
      <TransactionList />
    </div>
  )
}
