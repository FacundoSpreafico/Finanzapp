"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const CreditCard = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
)

const Plus = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export function CardsSection() {
  const tarjetas = [
    {
      nombre: "Mercado Pago",
      numero: "**** **** **** 1234",
      saldo: 3648,
      limite: 50000,
      tipo: "Débito",
      color: "from-blue-500 to-blue-600",
    },
    {
      nombre: "Tarjeta Crédito",
      numero: "**** **** **** 5678",
      saldo: -15000,
      limite: 100000,
      tipo: "Crédito",
      color: "from-purple-500 to-purple-600",
    },
    {
      nombre: "Cuenta Ahorro",
      numero: "**** **** **** 9012",
      saldo: 200000,
      limite: 0,
      tipo: "Ahorro",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Mis tarjetas
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Gestiona tus medios de pago</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="w-fit bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-gray-100 hover:shadow-xl">
              <Plus />
              Nueva tarjeta
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tarjetas.map((tarjeta, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${tarjeta.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {tarjeta.tipo}
                  </Badge>
                  <CreditCard />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{tarjeta.nombre}</h3>
                  <p className="text-sm opacity-90">{tarjeta.numero}</p>
                </div>
              </div>
              <CardContent className="p-6 bg-white dark:bg-slate-800">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Saldo Actual</span>
                    <span
                      className={`text-xl font-bold ${tarjeta.saldo >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      ${Math.abs(tarjeta.saldo).toLocaleString()}
                    </span>
                  </div>
                  {tarjeta.limite > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Límite</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        ${tarjeta.limite.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {tarjeta.limite > 0 && (
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${tarjeta.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min((Math.abs(tarjeta.saldo) / tarjeta.limite) * 100, 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
