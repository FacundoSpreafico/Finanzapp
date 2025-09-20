"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CategoryFormProps {
  onClose: () => void
  category?: {
    id: string
    name: string
    color: string
  }
}

export function CategoryForm({ onClose, category }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    color: category?.color || "#0891b2",
  })

  const predefinedColors = [
    "#0891b2", // cyan-600
    "#f97316", // orange-500
    "#dc2626", // red-600
    "#16a34a", // green-600
    "#8b5cf6", // violet-500
    "#06b6d4", // cyan-500
    "#84cc16", // lime-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#6b7280", // gray-500
    "#14b8a6", // teal-500
    "#22c55e", // green-500
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = category ? `/api/categories/${category.id}` : "/api/categories"
      const method = category ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onClose()
        window.location.reload()
      }
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la Categoría</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: COMIDAS, TRANSPORTE, etc."
            required
          />
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="flex flex-wrap gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color ? "border-foreground" : "border-border"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setFormData({ ...formData, color })}
              />
            ))}
          </div>
          <Input
            id="color"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-full h-10"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {category ? "Actualizar" : "Crear"} Categoría
        </Button>
      </div>
    </form>
  )
}
