"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const CreditCard = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
)

const Tag = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06-.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
)

const TrendingUp = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const Plus = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const Check = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Settings = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06-.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
)

const colorOptions = [
  { name: "Azul", value: "bg-blue-500", textColor: "text-blue-600", lightBg: "bg-blue-100" },
  { name: "Verde", value: "bg-green-500", textColor: "text-green-600", lightBg: "bg-green-100" },
  { name: "Rojo", value: "bg-red-500", textColor: "text-red-600", lightBg: "bg-red-100" },
  { name: "Púrpura", value: "bg-purple-500", textColor: "text-purple-600", lightBg: "bg-purple-100" },
  { name: "Naranja", value: "bg-orange-500", textColor: "text-orange-600", lightBg: "bg-orange-100" },
  { name: "Amarillo", value: "bg-amber-500", textColor: "text-amber-600", lightBg: "bg-amber-100" },
  { name: "Rosa", value: "bg-pink-500", textColor: "text-pink-600", lightBg: "bg-pink-100" },
  { name: "Índigo", value: "bg-indigo-500", textColor: "text-indigo-600", lightBg: "bg-indigo-100" },
  { name: "Esmeralda", value: "bg-emerald-500", textColor: "text-emerald-600", lightBg: "bg-emerald-100" },
  { name: "Gris", value: "bg-gray-500", textColor: "text-gray-600", lightBg: "bg-gray-100" },
]

export function QuickConfigAccordion() {
  // Estados para medios de pago
  const [newPaymentMethod, setNewPaymentMethod] = useState("")
  const [selectedPaymentColor, setSelectedPaymentColor] = useState(colorOptions[0])
  const [paymentMethods, setPaymentMethods] = useState([
    { name: "Mercado Pago", color: colorOptions[0] },
    { name: "Efectivo", color: colorOptions[1] },
  ])

  // Estados para categorías
  const [newCategory, setNewCategory] = useState("")
  const [selectedCategoryColor, setSelectedCategoryColor] = useState(colorOptions[2])
  const [categories, setCategories] = useState([
    { name: "NAFTA", color: colorOptions[4] },
    { name: "SALIDAS", color: colorOptions[3] },
    { name: "COMIDAS", color: colorOptions[5] },
  ])

  // Estados para tipos de ingreso
  const [newIncomeType, setNewIncomeType] = useState("")
  const [selectedIncomeColor, setSelectedIncomeColor] = useState(colorOptions[1])
  const [incomeTypes, setIncomeTypes] = useState([
    { name: "Salario", color: colorOptions[1] },
    { name: "Rendimientos", color: colorOptions[0] },
    { name: "Transferencia", color: colorOptions[3] },
  ])

  const addPaymentMethod = () => {
    if (newPaymentMethod.trim()) {
      setPaymentMethods([...paymentMethods, { name: newPaymentMethod, color: selectedPaymentColor }])
      setNewPaymentMethod("")
    }
  }

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { name: newCategory.toUpperCase(), color: selectedCategoryColor }])
      setNewCategory("")
    }
  }

  const addIncomeType = () => {
    if (newIncomeType.trim()) {
      setIncomeTypes([...incomeTypes, { name: newIncomeType, color: selectedIncomeColor }])
      setNewIncomeType("")
    }
  }

  const ColorPicker = ({
    selectedColor,
    onColorSelect,
    title,
  }: {
    selectedColor: (typeof colorOptions)[0]
    onColorSelect: (color: (typeof colorOptions)[0]) => void
    title: string
  }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</Label>
      <div className="grid grid-cols-5 gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorSelect(color)}
            className={`relative h-8 w-8 rounded-full ${color.value} hover:scale-110 transition-transform`}
            title={color.name}
          >
            {selectedColor.value === color.value && <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className={`h-4 w-4 rounded-full ${selectedColor.value}`} />
        <span className="text-sm text-slate-600 dark:text-slate-400">Color seleccionado: {selectedColor.name}</span>
      </div>
    </div>
  )

  return (
    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 dark:border-slate-700">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl text-slate-700 dark:text-slate-200">
          <Settings className="h-6 w-6" />
          Configuración Rápida
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          {/* Medios de Pago */}
          <AccordionItem value="payment-methods" className="border-slate-200 dark:border-slate-700">
            <AccordionTrigger className="hover:no-underline text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Agregar Medio de Pago</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nombre del medio de pago
                  </Label>
                  <Input
                    id="payment-method"
                    placeholder="Ej: Tarjeta Visa, Billetera Virtual..."
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value)}
                    className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <ColorPicker
                  selectedColor={selectedPaymentColor}
                  onColorSelect={setSelectedPaymentColor}
                  title="Color del medio de pago"
                />

                <Button onClick={addPaymentMethod} className="w-full" disabled={!newPaymentMethod.trim()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Medio de Pago
                </Button>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Medios de pago actuales:
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {paymentMethods.map((method, index) => (
                      <Badge key={index} className={`${method.color.lightBg} ${method.color.textColor} border-0`}>
                        <div className={`w-2 h-2 rounded-full ${method.color.value} mr-2`} />
                        {method.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Categorías */}
          <AccordionItem value="categories" className="border-slate-200 dark:border-slate-700">
            <AccordionTrigger className="hover:no-underline text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Agregar Categoría</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nombre de la categoría
                  </Label>
                  <Input
                    id="category"
                    placeholder="Ej: ENTRETENIMIENTO, EDUCACIÓN..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <ColorPicker
                  selectedColor={selectedCategoryColor}
                  onColorSelect={setSelectedCategoryColor}
                  title="Color de la categoría"
                />

                <Button onClick={addCategory} className="w-full" disabled={!newCategory.trim()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Categoría
                </Button>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Categorías actuales:</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <Badge key={index} className={`${category.color.lightBg} ${category.color.textColor} border-0`}>
                        <div className={`w-2 h-2 rounded-full ${category.color.value} mr-2`} />
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Tipos de Ingreso */}
          <AccordionItem value="income-types" className="border-slate-200 dark:border-slate-700">
            <AccordionTrigger className="hover:no-underline text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Agregar Tipo de Ingreso</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="income-type" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nombre del tipo de ingreso
                  </Label>
                  <Input
                    id="income-type"
                    placeholder="Ej: Freelance, Inversiones, Bonos..."
                    value={newIncomeType}
                    onChange={(e) => setNewIncomeType(e.target.value)}
                    className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <ColorPicker
                  selectedColor={selectedIncomeColor}
                  onColorSelect={setSelectedIncomeColor}
                  title="Color del tipo de ingreso"
                />

                <Button onClick={addIncomeType} className="w-full" disabled={!newIncomeType.trim()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Tipo de Ingreso
                </Button>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Tipos de ingreso actuales:
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {incomeTypes.map((type, index) => (
                      <Badge key={index} className={`${type.color.lightBg} ${type.color.textColor} border-0`}>
                        <div className={`w-2 h-2 rounded-full ${type.color.value} mr-2`} />
                        {type.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
