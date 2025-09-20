"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CategoryForm } from "@/components/category-form"
import { CategoryList } from "@/components/category-list"
import { CategoryStats } from "@/components/category-stats"

export function CategoryManager() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Add Category Button */}
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {/* Category Form */}
      {showForm && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Agregar Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryForm onClose={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      {/* Category Stats */}
      <CategoryStats />

      {/* Category List */}
      <CategoryList />
    </div>
  )
}
