"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"

interface Transaction {
  id: string
  description: string
  amount: number
  type: string
  date: string
  account: {
    name: string
    type: string
  }
  category?: {
    name: string
  }
}

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions")
      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setTransactions(transactions.filter((t) => t.id !== id))
      }
    } catch (error) {
      console.error("Error deleting transaction:", error)
    }
  }

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Cargando transacciones...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-foreground">Historial de Transacciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No hay transacciones registradas</div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Fecha</span>
                <span>Descripción</span>
                <span>Tipo</span>
                <span>Monto</span>
                <span>Cuenta</span>
                <span>Categoría</span>
                <span>Acciones</span>
              </div>
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-7 gap-4 items-center py-3 border-b border-border/50"
                >
                  <span className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-foreground truncate">{transaction.description}</span>
                  <Badge variant={transaction.type === "INCOME" ? "default" : "destructive"} className="text-xs">
                    {transaction.type === "INCOME" ? "Ingreso" : "Gasto"}
                  </Badge>
                  <span
                    className={`text-sm font-semibold ${
                      transaction.type === "INCOME" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    ${transaction.amount.toLocaleString()}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {transaction.account.name}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category?.name || "Sin categoría"}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
