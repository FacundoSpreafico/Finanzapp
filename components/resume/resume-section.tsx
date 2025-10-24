"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { NewTransactionDialog } from "@/components/resume/new-transaction-dialog"
import type { DashboardSummaryResponse, TransaccionReciente, CategoriaResumen } from "@/lib/models/dashboard"
import { getCategoryIcon } from "@/lib/category-helpers"

const TrendingUp = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TrendingDown = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
)

const Wallet = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
)

const CreditCard = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
)

const PiggyBank = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)

const Plus = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const ArrowUpRight = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7m10 0v10" />
  </svg>
)

const ArrowDownRight = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7l10 10H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
    />
  </svg>
)

const Car = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM4 12V6a1 1 0 011-1h14a1 1 0 011 1v6M4 12l2 5h12l2-5M4 12h16"
    />
  </svg>
)

const ShoppingCart = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
    />
  </svg>
)

const Coffee = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 13v4a2 2 0 002 2h4a2 2 0 002-2v-4M8 13V9a2 2 0 012-2h4a2 2 0 012 2v4M8 13h8m-4-6V5"
    />
  </svg>
)

const Receipt = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5l-5-5 4-4 5 5v6a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h7l5 5v11z"
    />
  </svg>
)

const Plane = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const Heart = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const Building = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

export function ModernFinanceDashboard() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardSummaryResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/balance/summary')
      if (!response.ok) {
        throw new Error('Error al obtener datos del dashboard')
      }
      
      const data: DashboardSummaryResponse = await response.json()
      setDashboardData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Refetch data when new transaction dialog closes
  const handleTransactionDialogChange = (open: boolean) => {
    setIsNewTransactionOpen(open)
    if (!open) {
      // Refetch data after a short delay to ensure transaction is processed
      setTimeout(() => {
        fetchDashboardData()
      }, 500)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-300">Cargando resumen financiero...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 mb-4">⚠️</div>
              <p className="text-red-600 dark:text-red-400">Error: {error}</p>
              <Button 
                onClick={fetchDashboardData} 
                className="mt-4"
                variant="outline"
              >
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  // Extract data from API response
  const { accounts, balanceData, balanceCards, transaccionesRecientes, categorias } = dashboardData

  const getIncomeBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "salario":
        return "bg-green-100 text-green-800 border-green-200"
      case "rendimiento":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "transferencia":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "venta":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Mirá tu resumen acá
            </h1>
           
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="w-fit bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-gray-100 hover:shadow-xl"
              onClick={() => setIsNewTransactionOpen(true)}
            >
              <Plus />
              ¿Nuevo gasto o nuevo ingreso? Registrálo
            </Button>
          </div>
        </div>

        {/* Balance Overview - Dynamic Accounts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Balance Total Card */}
          <Card className="border-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Balance Total</CardTitle>
              <Wallet />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${balanceData.saldoTotal.toLocaleString()}</div>
              <p className="text-xs opacity-90 select-none cursor-default">Total disponible</p>
            </CardContent>
          </Card>

          {/* Dynamic Account Cards */}
          {accounts.map((account, index) => {
            const isPositive = account.balance >= 0
            const colorClass = isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            
            return (
              <Card key={account.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">{account.type}</CardTitle>
                  <Wallet />
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${colorClass}`}>
                    ${account.balance.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 select-none cursor-default">
                    Ingresos: ${account.ingresos.toLocaleString()} | Gastos: ${account.gastos.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Income vs Expenses */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-green-700 dark:text-green-400">
                <ArrowUpRight />
                Total ingresos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                ${balanceData.totalIngresos.toLocaleString()}
              </div>
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div key={`income-${account.id}`} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-sm font-medium text-green-700 dark:text-green-400 select-none cursor-default">{account.type}</span>
                    <span className="font-bold text-green-600 dark:text-green-400 select-none cursor-default">
                      ${account.ingresos.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-red-700 dark:text-red-400">
                <TrendingDown />
                Total gastos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                ${balanceData.totalGastos.toLocaleString()}
              </div>
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div key={`expense-${account.id}`} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-sm font-medium text-red-700 dark:text-red-400 select-none cursor-default">{account.type}</span>
                    <span className="font-bold text-red-600 dark:text-red-400 select-none cursor-default">
                      ${account.gastos.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Categories */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 lg:col-span-1 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-t-lg">
              <CardTitle className="text-xl text-slate-700 dark:text-slate-200">Total gasto por categoría</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {categorias.map((categoria, index) => {
                  const IconComponent = getCategoryIcon(categoria.nombre)
                  return (
                    <div
                      key={categoria.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${categoria.color}`}>
                          <IconComponent />
                        </div>
                        <span className={`text-sm font-semibold ${categoria.textColor} dark:text-slate-300 select-none cursor-default`}>
                          {categoria.nombre}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200 select-none cursor-default">
                        ${categoria.monto.toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <div className="space-y-6 lg:col-span-2">
            {/* Ingresos */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl text-green-700 dark:text-green-400">
                  <TrendingUp />
                  Ingresos Recientes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {transaccionesRecientes.ingresos.map((ingreso, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-green-100 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10 p-4 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                    >
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 select-none cursor-default">
                          {ingreso.descripcion}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
                          >
                            {ingreso.fecha}
                          </Badge>
                          <Badge className={`text-xs ${getIncomeBadgeColor(ingreso.tipo || 'general')}`}>
                            {(ingreso.tipo || 'GENERAL').toUpperCase()}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          >
                            {ingreso.medio}
                          </Badge>
                        </div>
                      </div>
                      <span className="font-bold text-green-600 dark:text-green-400 text-lg select-none cursor-default">
                        +${ingreso.monto.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gastos */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl text-red-700 dark:text-red-400">
                  <TrendingDown />
                  Gastos Recientes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {transaccionesRecientes.gastos.map((gasto, index) => {
                    const categoria = categorias.find((c) => c.nombre === gasto.categoria)
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-red-100 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 select-none cursor-default">
                            {gasto.descripcion}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
                            >
                              {gasto.fecha}
                            </Badge>
                            <Badge className={`text-xs ${categoria?.color || "bg-gray-500"} text-white`}>
                              {gasto.categoria}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            >
                              {gasto.medio}
                            </Badge>
                          </div>
                        </div>
                        <span className="font-bold text-red-600 dark:text-red-400 text-lg select-none cursor-default">
                          -${gasto.monto.toLocaleString()}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <NewTransactionDialog open={isNewTransactionOpen} onOpenChange={handleTransactionDialogChange} />
    </div>
  )
}
