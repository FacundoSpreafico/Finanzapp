"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const Search = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const Filter = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
    />
  </svg>
)

const ArrowUpRight = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7m10 0v10" />
  </svg>
)

const ArrowDownRight = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10M17 7v10H7" />
  </svg>
)

export function HistorySection() {
  const [searchTerm, setSearchTerm] = useState("")

  const historialCompleto = [
    { fecha: "16/9/2024", tipo: "gasto", descripcion: "Coca", categoria: "COMPRAS", monto: 5000, medio: "EFECTIVO" },
    { fecha: "16/9/2024", tipo: "gasto", descripcion: "SEOM", categoria: "SEOM", monto: 3000, medio: "MERC PAGO" },
    {
      fecha: "15/9/2024",
      tipo: "ingreso",
      descripcion: "Rendimientos MP",
      categoria: "rendimiento",
      monto: 5,
      medio: "MERC PAGO",
    },
    {
      fecha: "15/9/2024",
      tipo: "gasto",
      descripcion: "Nafta viaje",
      categoria: "SALIDAS",
      monto: 27875,
      medio: "MERC PAGO",
    },
    {
      fecha: "14/9/2024",
      tipo: "ingreso",
      descripcion: "Trabajo MP",
      categoria: "salario",
      monto: 680000,
      medio: "MERC PAGO",
    },
    {
      fecha: "13/9/2024",
      tipo: "ingreso",
      descripcion: "Efectivo",
      categoria: "efectivo",
      monto: 40000,
      medio: "EFECTIVO",
    },
    {
      fecha: "13/9/2024",
      tipo: "gasto",
      descripcion: "Ahorro",
      categoria: "AHORRO",
      monto: 200000,
      medio: "MERC PAGO",
    },
    {
      fecha: "13/9/2024",
      tipo: "gasto",
      descripcion: "Cordoba",
      categoria: "SALIDAS",
      monto: 31800,
      medio: "MERC PAGO",
    },
    {
      fecha: "12/9/2024",
      tipo: "ingreso",
      descripcion: "Marcela seom",
      categoria: "transferencia",
      monto: 10000,
      medio: "MERC PAGO",
    },
    { fecha: "11/9/2024", tipo: "ingreso", descripcion: "Catre", categoria: "venta", monto: 1000, medio: "MERC PAGO" },
  ]

  const filteredHistory = historialCompleto.filter(
    (item) =>
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTransactionIcon = (tipo: string) => {
    return tipo === "ingreso" ? <ArrowUpRight /> : <ArrowDownRight />
  }

  const getTransactionColor = (tipo: string) => {
    return tipo === "ingreso" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
  }

  const getBadgeColor = (tipo: string, categoria: string) => {
    if (tipo === "ingreso") {
      switch (categoria) {
        case "salario":
          return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
        case "rendimiento":
          return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
        case "transferencia":
          return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
        case "venta":
          return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      }
    } else {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Historial de Transacciones
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Revisa todas tus transacciones</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Search />
                </div>
                <Input
                  placeholder="Buscar transacciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                />
              </div>
              <Button variant="outline" className="w-fit bg-transparent flex items-center gap-2">
                <Filter />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700 dark:text-slate-200">
              Todas las Transacciones ({filteredHistory.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredHistory.map((transaction, index) => (
                <div key={index} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${transaction.tipo === "ingreso" ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                      >
                        <span className={getTransactionColor(transaction.tipo)}>
                          {getTransactionIcon(transaction.tipo)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{transaction.descripcion}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                          >
                            {transaction.fecha}
                          </Badge>
                          <Badge className={`text-xs ${getBadgeColor(transaction.tipo, transaction.categoria)}`}>
                            {transaction.categoria.toUpperCase()}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          >
                            {transaction.medio}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${getTransactionColor(transaction.tipo)}`}>
                        {transaction.tipo === "ingreso" ? "+" : "-"}${transaction.monto.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
