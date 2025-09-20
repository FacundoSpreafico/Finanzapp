"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, Wallet, Plus, AlertCircle, CheckCircle } from "lucide-react"

interface NewTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTransactionDialog({ open, onOpenChange }: NewTransactionDialogProps) {
  const [transactionType, setTransactionType] = useState<"ingreso" | "gasto">("gasto")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    descripcion: "",
    monto: "",
    categoria: "",
    medio: "",
    fecha: new Date().toISOString().split("T")[0],
  })

  const categorias = [
    "NAFTA",
    "SALIDAS",
    "COMIDAS",
    "SEOM",
    "COMPRAS",
    "TARJETA",
    "IMPUESTO",
    "CIUDADANIA",
    "AHORRO",
    "SALUD",
    "CASA",
    "TRANSPORTE",
    "ENTRETENIMIENTO",
    "SERVICIOS",
  ]

  const tiposIngreso = ["SALARIO", "RENDIMIENTO", "TRANSFERENCIA", "VENTA", "FREELANCE", "BONIFICACION", "OTROS"]

  const mediosPago = ["MERCADO PAGO", "EFECTIVO", "TARJETA", "TRANSFERENCIA"]

  const isFormValid = () => {
    return (
      formData.descripcion.trim() !== "" &&
      formData.monto !== "" &&
      Number.parseFloat(formData.monto) > 0 &&
      formData.categoria !== "" &&
      formData.medio !== "" &&
      formData.fecha !== ""
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Nueva transacción:", { ...formData, tipo: transactionType })

      // Mostrar éxito
      setShowSuccess(true)

      // Resetear formulario después de un delay
      setTimeout(() => {
        setFormData({
          descripcion: "",
          monto: "",
          categoria: "",
          medio: "",
          fecha: new Date().toISOString().split("T")[0],
        })
        setShowSuccess(false)
        setIsSubmitting(false)
        onOpenChange(false)
      }, 1500)
    } catch (error) {
      console.error("Error al guardar transacción:", error)
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      descripcion: "",
      monto: "",
      categoria: "",
      medio: "",
      fecha: new Date().toISOString().split("T")[0],
    })
    setShowSuccess(false)
    setIsSubmitting(false)
    onOpenChange(false)
  }

  const getMedioIcon = (medio: string) => {
    switch (medio) {
      case "MERCADO PAGO":
        return <CreditCard className="h-4 w-4" />
      case "EFECTIVO":
        return <Wallet className="h-4 w-4" />
      case "TARJETA":
        return <CreditCard className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-slate-800 border-0 shadow-2xl">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">¡Transacción Guardada!</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Tu {transactionType} de ${Number.parseFloat(formData.monto || "0").toLocaleString()} ha sido registrado
              correctamente.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-slate-900 dark:text-slate-100">
            <Plus className="h-6 w-6 text-blue-600" />
            Nueva Transacción
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Transacción */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo de Transacción</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={transactionType === "ingreso" ? "default" : "outline"}
                className={`flex-1 transition-all ${
                  transactionType === "ingreso"
                    ? "bg-green-600 hover:bg-green-700 shadow-lg text-white"
                    : "hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600"
                }`}
                onClick={() => setTransactionType("ingreso")}
              >
                💰 Ingreso
              </Button>
              <Button
                type="button"
                variant={transactionType === "gasto" ? "default" : "outline"}
                className={`flex-1 transition-all ${
                  transactionType === "gasto"
                    ? "bg-red-600 hover:bg-red-700 shadow-lg text-white"
                    : "hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600"
                }`}
                onClick={() => setTransactionType("gasto")}
              >
                💸 Gasto
              </Button>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Descripción *
            </Label>
            <Input
              id="descripcion"
              placeholder="Ej: Compra en supermercado"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="border-2 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              disabled={isSubmitting}
            />
          </div>

          {/* Monto */}
          <div className="space-y-2">
            <Label htmlFor="monto" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Monto *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">
                $
              </span>
              <Input
                id="monto"
                type="number"
                placeholder="0.00"
                value={formData.monto}
                onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                className="pl-8 border-2 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                step="0.01"
                min="0"
                disabled={isSubmitting}
              />
            </div>
            {formData.monto && Number.parseFloat(formData.monto) <= 0 && (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="h-3 w-3" />
                El monto debe ser mayor a 0
              </div>
            )}
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {transactionType === "gasto" ? "Categoría" : "Tipo de Ingreso"} *
            </Label>
            <Select
              value={formData.categoria}
              onValueChange={(value) => setFormData({ ...formData, categoria: value })}
              disabled={isSubmitting}
            >
              <SelectTrigger className="border-2 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                <SelectValue placeholder={`Selecciona ${transactionType === "gasto" ? "categoría" : "tipo"}`} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border dark:border-slate-600">
                {(transactionType === "gasto" ? categorias : tiposIngreso).map((item) => (
                  <SelectItem key={item} value={item} className="text-slate-900 dark:text-slate-100">
                    <Badge variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Medio de Pago */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Medio de Pago *</Label>
            <Select
              value={formData.medio}
              onValueChange={(value) => setFormData({ ...formData, medio: value })}
              disabled={isSubmitting}
            >
              <SelectTrigger className="border-2 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                <SelectValue placeholder="Selecciona medio de pago" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border dark:border-slate-600">
                {mediosPago.map((medio) => (
                  <SelectItem key={medio} value={medio} className="text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      {getMedioIcon(medio)}
                      <span>{medio}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fecha */}
          <div className="space-y-2">
            <Label htmlFor="fecha" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Fecha *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                id="fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="pl-10 border-2 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Preview mejorado */}
          {formData.descripcion && formData.monto && Number.parseFloat(formData.monto) > 0 && (
            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-500">
              <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-2">
                👁️ Vista Previa:
              </h4>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="font-medium text-slate-800 dark:text-slate-200">{formData.descripcion}</p>
                  <div className="flex gap-2 flex-wrap">
                    {formData.categoria && (
                      <Badge variant={transactionType === "gasto" ? "destructive" : "default"} className="text-xs">
                        {formData.categoria}
                      </Badge>
                    )}
                    {formData.medio && (
                      <Badge variant="secondary" className="text-xs">
                        {formData.medio}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {formData.fecha}
                    </Badge>
                  </div>
                </div>
                <span
                  className={`font-bold text-xl ${transactionType === "gasto" ? "text-red-600" : "text-green-600"}`}
                >
                  {transactionType === "gasto" ? "-" : "+"}${Number.parseFloat(formData.monto || "0").toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={`flex-1 transition-all ${
                transactionType === "gasto" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              } ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""} text-white`}
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </div>
              ) : (
                `Guardar ${transactionType === "gasto" ? "Gasto" : "Ingreso"}`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
