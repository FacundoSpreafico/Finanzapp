import { Car, Plane, Coffee, Heart, ShoppingCart, CreditCard, Receipt, Building, PiggyBank, Folder } from "lucide-react"

// Mapeo de nombres de categoría a íconos
export const categoryIconMap: Record<string, any> = {
  'NAFTA': Car,
  'GASOLINA': Car,
  'COMBUSTIBLE': Car,
  'SALIDAS': Plane,
  'VIAJES': Plane,
  'ENTRETENIMIENTO': Plane,
  'COMIDAS': Coffee,
  'RESTAURANTE': Coffee,
  'ALIMENTACION': Coffee,
  'SEOM': Heart,
  'SALUD': Heart,
  'MEDICO': Heart,
  'COMPRAS': ShoppingCart,
  'SUPERMERCADO': ShoppingCart,
  'SHOPPING': ShoppingCart,
  'TARJETA': CreditCard,
  'CREDITO': CreditCard,
  'BANCO': CreditCard,
  'IMPUESTO': Receipt,
  'IMPUESTOS': Receipt,
  'SERVICIOS': Receipt,
  'CIUDADANIA': Building,
  'GOBIERNO': Building,
  'TRAMITES': Building,
  'AHORRO': PiggyBank,
  'AHORROS': PiggyBank,
  'INVERSION': PiggyBank,
}

// Mapeo de nombres de categoría a colores Tailwind
export const categoryColorMap: Record<string, { bg: string, text: string }> = {
  'NAFTA': { bg: 'bg-orange-500', text: 'text-orange-600' },
  'GASOLINA': { bg: 'bg-orange-500', text: 'text-orange-600' },
  'COMBUSTIBLE': { bg: 'bg-orange-500', text: 'text-orange-600' },
  'SALIDAS': { bg: 'bg-purple-500', text: 'text-purple-600' },
  'VIAJES': { bg: 'bg-purple-500', text: 'text-purple-600' },
  'ENTRETENIMIENTO': { bg: 'bg-purple-500', text: 'text-purple-600' },
  'COMIDAS': { bg: 'bg-amber-500', text: 'text-amber-600' },
  'RESTAURANTE': { bg: 'bg-amber-500', text: 'text-amber-600' },
  'ALIMENTACION': { bg: 'bg-amber-500', text: 'text-amber-600' },
  'SEOM': { bg: 'bg-blue-500', text: 'text-blue-600' },
  'SALUD': { bg: 'bg-blue-500', text: 'text-blue-600' },
  'MEDICO': { bg: 'bg-blue-500', text: 'text-blue-600' },
  'COMPRAS': { bg: 'bg-green-500', text: 'text-green-600' },
  'SUPERMERCADO': { bg: 'bg-green-500', text: 'text-green-600' },
  'SHOPPING': { bg: 'bg-green-500', text: 'text-green-600' },
  'TARJETA': { bg: 'bg-red-500', text: 'text-red-600' },
  'CREDITO': { bg: 'bg-red-500', text: 'text-red-600' },
  'BANCO': { bg: 'bg-red-500', text: 'text-red-600' },
  'IMPUESTO': { bg: 'bg-gray-500', text: 'text-gray-600' },
  'IMPUESTOS': { bg: 'bg-gray-500', text: 'text-gray-600' },
  'SERVICIOS': { bg: 'bg-gray-500', text: 'text-gray-600' },
  'CIUDADANIA': { bg: 'bg-indigo-500', text: 'text-indigo-600' },
  'GOBIERNO': { bg: 'bg-indigo-500', text: 'text-indigo-600' },
  'TRAMITES': { bg: 'bg-indigo-500', text: 'text-indigo-600' },
  'AHORRO': { bg: 'bg-emerald-500', text: 'text-emerald-600' },
  'AHORROS': { bg: 'bg-emerald-500', text: 'text-emerald-600' },
  'INVERSION': { bg: 'bg-emerald-500', text: 'text-emerald-600' },
}

// Función para obtener el ícono de una categoría
export function getCategoryIcon(categoryName: string) {
  const normalizedName = categoryName.toUpperCase().trim()
  return categoryIconMap[normalizedName] || Folder
}

// Función para obtener los colores de una categoría
export function getCategoryColors(categoryName: string) {
  const normalizedName = categoryName.toUpperCase().trim()
  return categoryColorMap[normalizedName] || { bg: 'bg-slate-500', text: 'text-slate-600' }
}

// Función para obtener colores desde el color almacenado en la DB
export function getColorsFromHex(hexColor: string | null): { bg: string, text: string } {
  if (!hexColor) return { bg: 'bg-slate-500', text: 'text-slate-600' }
  
  // Mapeo de colores hex comunes a clases Tailwind
  const hexToTailwind: Record<string, { bg: string, text: string }> = {
    '#0891b2': { bg: 'bg-cyan-600', text: 'text-cyan-600' },
    '#f97316': { bg: 'bg-orange-500', text: 'text-orange-600' },
    '#dc2626': { bg: 'bg-red-600', text: 'text-red-600' },
    '#16a34a': { bg: 'bg-green-600', text: 'text-green-600' },
    '#8b5cf6': { bg: 'bg-violet-500', text: 'text-violet-600' },
    '#06b6d4': { bg: 'bg-cyan-500', text: 'text-cyan-600' },
    '#84cc16': { bg: 'bg-lime-500', text: 'text-lime-600' },
    '#f59e0b': { bg: 'bg-amber-500', text: 'text-amber-600' },
    '#ef4444': { bg: 'bg-red-500', text: 'text-red-600' },
    '#6b7280': { bg: 'bg-gray-500', text: 'text-gray-600' },
    '#14b8a6': { bg: 'bg-teal-500', text: 'text-teal-600' },
    '#22c55e': { bg: 'bg-green-500', text: 'text-green-600' },
    '#3b82f6': { bg: 'bg-blue-500', text: 'text-blue-600' },
    '#10b981': { bg: 'bg-emerald-500', text: 'text-emerald-600' },
  }
  
  return hexToTailwind[hexColor] || { bg: 'bg-slate-500', text: 'text-slate-600' }
}