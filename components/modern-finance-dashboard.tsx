"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { NewTransactionDialog } from "./new-transaction-dialog"

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

  // Mock data basado en tu ejemplo
  const balanceData = {
    mercadoPago: 3648,
    efectivo: 0,
    ahorro: 3648,
    saldoInicial: 749,
    saldoRestante: 28625,
    totalPlata: 29374,
  }

  const totales = {
    ingresos: {
      mercadoPago: 697380,
      efectivo: 40000,
      total: 737380,
    },
    gastos: {
      mercadoPago: 700279.01,
      efectivo: 11375,
      total: 711654.01,
    },
  }

  const categorias = [
    { nombre: "NAFTA", monto: 40000, color: "bg-orange-500", icon: Car, textColor: "text-orange-600" },
    { nombre: "SALIDAS", monto: 148795, color: "bg-purple-500", icon: Plane, textColor: "text-purple-600" },
    { nombre: "COMIDAS", monto: 21230, color: "bg-amber-500", icon: Coffee, textColor: "text-amber-600" },
    { nombre: "SEOM", monto: 9000, color: "bg-blue-500", icon: Heart, textColor: "text-blue-600" },
    { nombre: "COMPRAS", monto: 32600, color: "bg-green-500", icon: ShoppingCart, textColor: "text-green-600" },
    { nombre: "TARJETA", monto: 114359, color: "bg-red-500", icon: CreditCard, textColor: "text-red-600" },
    { nombre: "IMPUESTO", monto: 75670, color: "bg-gray-500", icon: Receipt, textColor: "text-gray-600" },
    { nombre: "CIUDADANIA", monto: 70000, color: "bg-indigo-500", icon: Building, textColor: "text-indigo-600" },
    { nombre: "AHORRO", monto: 200000, color: "bg-emerald-500", icon: PiggyBank, textColor: "text-emerald-600" },
  ]

  const ingresos = [
    { fecha: "15/9", descripcion: "Rendimientos MP", monto: 5, medio: "MERC PAGO", tipo: "rendimiento" },
    { fecha: "14/9", descripcion: "Trabajo MP", monto: 680000, medio: "MERC PAGO", tipo: "salario" },
    { fecha: "13/9", descripcion: "Efectivo", monto: 40000, medio: "EFECTIVO", tipo: "efectivo" },
    { fecha: "12/9", descripcion: "Marcela seom", monto: 10000, medio: "MERC PAGO", tipo: "transferencia" },
    { fecha: "11/9", descripcion: "Catre", monto: 1000, medio: "MERC PAGO", tipo: "venta" },
  ]

  const gastos = [
    { fecha: "16/9", categoria: "COMPRAS", descripcion: "Coca", monto: 5000, medio: "EFECTIVO" },
    { fecha: "16/9", categoria: "SEOM", descripcion: "SEOM", monto: 3000, medio: "MERC PAGO" },
    { fecha: "15/9", categoria: "SALIDAS", descripcion: "Nafta viaje", monto: 27875, medio: "MERC PAGO" },
    { fecha: "13/9", categoria: "AHORRO", descripcion: "Ahorro", monto: 200000, medio: "MERC PAGO" },
    { fecha: "13/9", categoria: "SALIDAS", descripcion: "Cordoba", monto: 31800, medio: "MERC PAGO" },
  ]

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

        {/* Balance Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Saldo restante</CardTitle>
              <Wallet />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${balanceData.saldoRestante.toLocaleString()}</div>
              <p className="text-xs opacity-90">Total disponible</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Mercado Pago</CardTitle>
              <CreditCard />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${balanceData.mercadoPago.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Saldo digital</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Efectivo</CardTitle>
              <Wallet />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${balanceData.efectivo.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Dinero físico</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Ahorro</CardTitle>
              <PiggyBank />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${balanceData.ahorro.toLocaleString()}</div>
              <p className="text-xs opacity-90">Reservas</p>
            </CardContent>
          </Card>
        </div>

        {/* Income vs Expenses */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-green-700 dark:text-green-400">
                <ArrowUpRight />
                Total Ingresos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                ${totales.ingresos.total.toLocaleString()}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Mercado Pago</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ${totales.ingresos.mercadoPago.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Efectivo</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ${totales.ingresos.efectivo.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-red-700 dark:text-red-400">
                <TrendingDown />
                Total Gastos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                ${totales.gastos.total.toLocaleString()}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-sm font-medium text-red-700 dark:text-red-400">Mercado Pago</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    ${totales.gastos.mercadoPago.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-sm font-medium text-red-700 dark:text-red-400">Efectivo</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    ${totales.gastos.efectivo.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories and Transactions */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Categories */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 lg:col-span-1 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-t-lg">
              <CardTitle className="text-xl text-slate-700 dark:text-slate-200">Total por Categoría</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {categorias.map((categoria, index) => {
                  const IconComponent = categoria.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${categoria.color}`}>
                          <IconComponent />
                        </div>
                        <span className={`text-sm font-semibold ${categoria.textColor} dark:text-slate-300`}>
                          {categoria.nombre}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
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
                  {ingresos.map((ingreso, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-green-100 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10 p-4 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                    >
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {ingreso.descripcion}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
                          >
                            {ingreso.fecha}
                          </Badge>
                          <Badge className={`text-xs ${getIncomeBadgeColor(ingreso.tipo)}`}>
                            {ingreso.tipo.toUpperCase()}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          >
                            {ingreso.medio}
                          </Badge>
                        </div>
                      </div>
                      <span className="font-bold text-green-600 dark:text-green-400 text-lg">
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
                  {gastos.map((gasto, index) => {
                    const categoria = categorias.find((c) => c.nombre === gasto.categoria)
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-red-100 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
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
                        <span className="font-bold text-red-600 dark:text-red-400 text-lg">
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

      <NewTransactionDialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen} />
    </div>
  )
}
