"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CategoryStat {
  name: string
  color: string
  totalAmount: number
  transactionCount: number
}

export function CategoryStats() {
  const [stats, setStats] = useState<CategoryStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategoryStats()
  }, [])

  const fetchCategoryStats = async () => {
    try {
      const response = await fetch("/api/categories/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching category stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Cargando estadísticas...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground">Gastos por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Monto"]} />
              <Bar dataKey="totalAmount" fill="#0891b2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground">Top Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats
              .sort((a, b) => b.totalAmount - a.totalAmount)
              .slice(0, 8)
              .map((stat, index) => (
                <div key={stat.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-muted-foreground">#{index + 1}</div>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                    <div>
                      <div className="font-medium text-foreground">{stat.name}</div>
                      <div className="text-sm text-muted-foreground">{stat.transactionCount} transacciones</div>
                    </div>
                  </div>
                  <div className="font-bold text-foreground">${stat.totalAmount.toLocaleString()}</div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
