"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface Account {
  id: string
  type: string
  balance: number
}

export function NewTransactionDialog({ open, onOpenChange }: NewTransactionDialogProps) {
  const [transactionType, setTransactionType] = useState<"ingreso" | "gasto">("gasto")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loadingAccounts, setLoadingAccounts] = useState(true)
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [formData, setFormData] = useState({
    monto: "",
    categoria: "",
    cuenta: "",
    fecha: new Date().toISOString().split("T")[0],
  })

  // Función para cargar las cuentas disponibles
  const fetchAccounts = async () => {
    try {
      setLoadingAccounts(true)
      const response = await fetch('/api/accounts')
      
      if (!response.ok) {
        throw new Error('Error al cargar cuentas')
      }
      
      const accountsData = await response.json()
      setAccounts(accountsData)
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      setLoadingAccounts(false)
    }
  }

  // Función para cargar categorías según el tipo de transacción
  const fetchCategories = async (type: 'EXPENSE' | 'INCOME') => {
    try {
      setLoadingCategories(true)
      const response = await fetch(`/api/categories?type=${type}`)
      
      if (!response.ok) {
        throw new Error('Error al cargar categorías')
      }
      
      const categoriesData = await response.json()
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoadingCategories(false)
    }
  }

  // Cargar datos cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      fetchAccounts()
      fetchCategories(transactionType === 'gasto' ? 'EXPENSE' : 'INCOME')
    } else {
      // Limpiar formulario cuando se cierra el diálogo
      setFormData({
        monto: "",
        categoria: "",
        cuenta: "",
        fecha: new Date().toISOString().split("T")[0],
      })
      setShowSuccess(false)
      setIsSubmitting(false)
    }
  }, [open])

  // Cargar categorías cuando cambia el tipo de transacción
  useEffect(() => {
    if (open) {
      fetchCategories(transactionType === 'gasto' ? 'EXPENSE' : 'INCOME')
      // Limpiar la categoría seleccionada cuando cambia el tipo
      setFormData(prev => ({ ...prev, categoria: "" }))
    }
  }, [transactionType, open])

  const isFormValid = () => (
    formData.monto !== "" &&
    Number.parseFloat(formData.monto) > 0 &&
    formData.categoria !== "" &&
    formData.cuenta !== ""
  )

  // Función helper para obtener el nombre de la categoría
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : ''
  }

  // Función helper para obtener el nombre de la cuenta
  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId)
    return account ? account.type : ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Generar descripción automática según el tipo
      const description = transactionType === "ingreso" ? "INCOME" : "EXPENSE"
      
      // Preparar datos para la API
      const transactionData = {
        description: description,
        amount: parseFloat(formData.monto),
        categoryType: transactionType === "ingreso" ? "INCOME" : "EXPENSE",
        account: formData.cuenta,
        category: formData.categoria,
        date: formData.fecha
      }

      // Llamar a la API
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      })

      if (!response.ok) {
        throw new Error('Error al crear la transacción')
      }

      const result = await response.json()
      console.log("Transacción creada:", result)

      // Mostrar éxito
      setShowSuccess(true)

      // Resetear formulario después de un delay
      setTimeout(() => {
        setFormData({
          monto: "",
          categoria: "",
          cuenta: "",
          fecha: new Date().toISOString().split("T")[0],
        })
        setShowSuccess(false)
        setIsSubmitting(false)
        onOpenChange(false)
      }, 1500)
    } catch (error) {
      console.error("Error al guardar transacción:", error)
      setIsSubmitting(false)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  const handleCancel = () => {
    setFormData({
      monto: "",
      categoria: "",
      cuenta: "",
      fecha: new Date().toISOString().split("T")[0],
    })
    setShowSuccess(false)
    setIsSubmitting(false)
    onOpenChange(false)
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
                <SelectValue placeholder={loadingCategories ? "Cargando categorías..." : `Selecciona ${transactionType === "gasto" ? "categoría" : "tipo"}`} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border dark:border-slate-600">
                {loadingCategories ? (
                  <SelectItem value="loading" disabled>
                    Cargando categorías...
                  </SelectItem>
                ) : categories.length === 0 ? (
                  <SelectItem value="no-categories" disabled>
                    No hay categorías disponibles
                  </SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-slate-900 dark:text-slate-100">
                      <Badge variant="outline" className="text-xs">
                        {category.name}
                      </Badge>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Medio de Pago */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cuenta *</Label>
            <Select
              value={formData.cuenta}
              onValueChange={(value) => setFormData({ ...formData, cuenta: value })}
              disabled={isSubmitting}
            >
              <SelectTrigger className="border-2 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                <SelectValue placeholder={loadingAccounts ? "Cargando cuentas..." : "Selecciona cuenta"} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border dark:border-slate-600">
                {loadingAccounts ? (
                  <SelectItem value="loading" disabled>
                    Cargando cuentas...
                  </SelectItem>
                ) : accounts.length === 0 ? (
                  <SelectItem value="no-accounts" disabled>
                    No hay cuentas disponibles
                  </SelectItem>
                ) : (
                  accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id} className="text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        <span>{account.type}</span>
                        <Badge variant="outline" className="ml-auto">
                          ${account.balance.toLocaleString('es-AR')}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))
                )}
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
          {formData.monto && Number.parseFloat(formData.monto) > 0 && (
            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-500">
              <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-2">
                👁️ Vista Previa:
              </h4>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {transactionType === "ingreso" ? "💰 Ingreso" : "💸 Gasto"}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {formData.categoria && (
                      <Badge variant={transactionType === "gasto" ? "destructive" : "default"} className="text-xs">
                        {getCategoryName(formData.categoria)}
                      </Badge>
                    )}
                    {formData.cuenta && (
                      <Badge variant="secondary" className="text-xs">
                        {getAccountName(formData.cuenta)}
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
