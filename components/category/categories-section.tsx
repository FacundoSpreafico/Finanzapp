"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Edit, Plus } from "lucide-react"
import { CategoryForm } from "./category-form"

// Interfaces
interface CategoryWithAnalytics {
  id: string
  name: string
  color?: string
  type: 'EXPENSE' | 'INCOME'
  totalAmount: number
  transactionCount: number
  createdAt: Date
  updatedAt: Date
}

interface CategoryModel {
  id: string
  name: string
  color?: string
  type: 'EXPENSE' | 'INCOME'
}

// Helper functions
const getCategoryIcon = () => Plus
const getCategoryColors = () => ({ bg: 'bg-blue-500', text: 'text-blue-700' })

export function CategoriesSection() {
  const [expenseCategories, setExpenseCategories] = useState<CategoryWithAnalytics[]>([])
  const [incomeCategories, setIncomeCategories] = useState<CategoryWithAnalytics[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<CategoryModel | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"EXPENSE" | "INCOME">("EXPENSE")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Cargar categorías de gastos
      const expenseResponse = await fetch("/api/categories?type=EXPENSE")
      if (!expenseResponse.ok) {
        throw new Error(`Error: ${expenseResponse.status}`)
      }
      const expenseData = await expenseResponse.json()
      
      // Cargar categorías de ingresos
      const incomeResponse = await fetch("/api/categories?type=INCOME")
      if (!incomeResponse.ok) {
        throw new Error(`Error: ${incomeResponse.status}`)
      }
      const incomeData = await incomeResponse.json()
      
      // Transformar los datos de gastos
      const transformedExpenseData: CategoryWithAnalytics[] = expenseData.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        color: cat.color,
        type: cat.type,
        totalAmount: cat.totalAmount || 0,
        transactionCount: cat.transactionCount || 0,
        createdAt: new Date(cat.createdAt),
        updatedAt: new Date(cat.updatedAt)
      }))
      
      // Transformar los datos de ingresos
      const transformedIncomeData: CategoryWithAnalytics[] = incomeData.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        color: cat.color,
        type: cat.type,
        totalAmount: cat.totalAmount || 0,
        transactionCount: cat.transactionCount || 0,
        createdAt: new Date(cat.createdAt),
        updatedAt: new Date(cat.updatedAt)
      }))
      
      // Ordenar por totalAmount de mayor a menor
      const sortedExpenseData = transformedExpenseData.sort((a, b) => b.totalAmount - a.totalAmount)
      const sortedIncomeData = transformedIncomeData.sort((a, b) => b.totalAmount - a.totalAmount)
      
      setExpenseCategories(sortedExpenseData)
      setIncomeCategories(sortedIncomeData)
    } catch (error) {
      console.error("Error fetching categories:", error)
      setError("Error al cargar las categorías. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      return
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al eliminar la categoría")
      }
      
      // Actualizar el estado local
      setExpenseCategories(expenseCategories.filter((c) => c.id !== id))
      setIncomeCategories(incomeCategories.filter((c) => c.id !== id))
      
    } catch (error) {
      console.error("Error deleting category:", error)
      setError(error instanceof Error ? error.message : "Error al eliminar la categoría")
    }
  }

  const renderCategoriesTab = (categories: CategoryWithAnalytics[], type: "expense" | "income") => {
    if (categories.length === 0) {
      return (
        <Card className="border-slate-200 bg-slate-50 dark:bg-slate-900/10 dark:border-slate-700">
          <CardContent className="p-8 text-center">
            <div className="text-slate-600 dark:text-slate-400 space-y-4">
              <span className="text-6xl">{type === "expense" ? "💸" : "💰"}</span>
              <h3 className="text-xl font-semibold">
                No hay categorías de {type === "expense" ? "gastos" : "ingresos"} aún
              </h3>
              <p className="text-sm max-w-md mx-auto">
                Crea categorías de {type === "expense" ? "gastos" : "ingresos"} para organizar mejor tus finanzas
              </p>
            </div>
          </CardContent>
        </Card>
      )
    }

    const totalAmount = categories.reduce((sum, cat) => sum + cat.totalAmount, 0)
    const topCategory = categories.length > 0 
      ? categories.reduce((prev, current) => prev.totalAmount > current.totalAmount ? prev : current)
      : null

    return (
      <div className="space-y-6">
        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/10 dark:via-orange-900/10 dark:to-red-900/10 rounded-xl border-l-4 border-amber-400">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">⚠️</span>
              <div>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  {topCategory?.name || 'N/A'}
                </p>
                <p className="text-sm text-amber-600/80 dark:text-amber-400/80">
                  Mayor {type === "expense" ? "gasto" : "ingreso"}
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">📊</span>
              <div>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {topCategory && totalAmount > 0 
                    ? ((topCategory.totalAmount / totalAmount) * 100).toFixed(0)
                    : 0}%
                </p>
                <p className="text-sm text-orange-600/80 dark:text-orange-400/80">Del total</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">💡</span>
              <div>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {categories.length}
                </p>
                <p className="text-sm text-green-600/80 dark:text-green-400/80">
                  Categorías activas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de categorías */}
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-t-lg p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                Categorías de {type === "expense" ? "Gastos" : "Ingresos"}
              </CardTitle>
              <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-600 px-3 py-1 text-sm font-medium">
                {categories.length} categorías
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {categories.map((category) => {
                const percentage = totalAmount > 0 ? (category.totalAmount / totalAmount) * 100 : 0
                const IconComponent = getCategoryIcon()
                const colors = getCategoryColors()

                return (
                  <div
                    key={category.id}
                    className="group flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} text-white shadow-lg`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">
                            {category.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {category.transactionCount} transacciones
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <span>{percentage.toFixed(1)}% del total</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right space-y-2">
                        <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                          ${category.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingCategory(category as any)}
                          className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900"
                          title="Editar categoría"
                        >
                          <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCategory(category.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                          title="Eliminar categoría"
                        >
                          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-300">Cargando análisis de categorías...</p>
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
                onClick={fetchCategories} 
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

  if (expenseCategories.length === 0 && incomeCategories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
            <CardContent className="p-8 text-center">
              <div className="text-amber-600 dark:text-amber-400 space-y-4">
                <span className="text-6xl">📊</span>
                <h3 className="text-xl font-semibold">No hay categorías aún</h3>
                <p className="text-sm max-w-md mx-auto">
                  Comienza creando tu primera categoría para organizar y analizar tus gastos e ingresos
                </p>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primera categoría
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Formulario de nueva categoría */}
          {showAddForm && (
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-lg p-6">
                <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300">Nueva Categoría</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CategoryForm
                  onClose={() => {
                    setShowAddForm(false)
                    fetchCategories()
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              ¿Dónde va tu dinero?
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Descubre patrones en tus gastos y toma mejores decisiones</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-fit bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-gray-100 hover:shadow-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Categoría
            </Button>
          </div>
        </div>

        {/* Tabs para Gastos e Ingresos */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "EXPENSE" | "INCOME")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="EXPENSE" className="flex items-center gap-2">
              <span>💸</span>
              Gastos ({expenseCategories.length})
            </TabsTrigger>
            <TabsTrigger value="INCOME" className="flex items-center gap-2">
              <span>💰</span>
              Ingresos ({incomeCategories.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="EXPENSE">
            {renderCategoriesTab(expenseCategories, "expense")}
          </TabsContent>

          <TabsContent value="INCOME">
            {renderCategoriesTab(incomeCategories, "income")}
          </TabsContent>
        </Tabs>

        {/* Formulario de nueva categoría */}
        {showAddForm && (
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-lg p-6">
              <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300">Nueva Categoría</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CategoryForm
                onClose={() => {
                  setShowAddForm(false)
                  fetchCategories()
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Formulario de edición */}
        {editingCategory && (
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-t-lg p-6">
              <CardTitle className="text-2xl font-bold text-orange-700 dark:text-orange-300">Editar Categoría</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CategoryForm
                category={{
                  id: editingCategory.id,
                  name: editingCategory.name,
                  color: editingCategory.color || "#0891b2",
                  type: editingCategory.type || "EXPENSE"
                }}
                onClose={() => {
                  setEditingCategory(null)
                  fetchCategories()
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}