"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BalanceData {
  totalBalance: number
  accounts: {
    id: string
    name: string
    type: string
    balance: number
  }[]
  totalIncome: number
  totalExpenses: number
  netBalance: number
}

export function BalanceOverview() {
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBalanceData()
  }, [])

  const fetchBalanceData = async () => {
    try {
      const response = await fetch("/api/balance")
      if (response.ok) {
        const data = await response.json()
        setBalanceData(data)
      }
    } catch (error) {
      console.error("Error fetching balance data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!balanceData) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Error cargando datos de balance</div>
        </CardContent>
      </Card>
    )
  }

  const mercadoPagoAccount = balanceData.accounts.find((acc) => acc.type === "MERCADO_PAGO")
  const efectivoAccount = balanceData.accounts.find((acc) => acc.type === "EFECTIVO")
  const ahorroAccount = balanceData.accounts.find((acc) => acc.type === "AHORRO")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Income */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Ingresos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">${balanceData.totalIncome.toLocaleString()}</div>
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">${balanceData.totalExpenses.toLocaleString()}</div>
        </CardContent>
      </Card>

      {/* Net Balance */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Balance Neto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balanceData.netBalance >= 0 ? "text-primary" : "text-destructive"}`}>
            ${balanceData.netBalance.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Account Balances */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Cuentas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">MP</span>
            <span className="font-semibold text-primary">${mercadoPagoAccount?.balance.toLocaleString() || "0"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Efectivo</span>
            <span className="font-semibold text-secondary">${efectivoAccount?.balance.toLocaleString() || "0"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Ahorro</span>
            <span className="font-semibold text-accent">${ahorroAccount?.balance.toLocaleString() || "0"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
