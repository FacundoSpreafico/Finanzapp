import {Category, Transaction, User} from '@prisma/client'

export type CategoryModel = Category

// Tipo para categorías con estadísticas calculadas
export interface CategoryWithStats extends Category {
  _count: {
    transactions: number
  }
  totalAmount?: number // Suma de todas las transacciones de esta categoría
}

// DTOs para API requests
export interface CreateCategoryRequest {
  name: string
  color?: string
}

export interface UpdateCategoryRequest {
  name?: string
  color?: string
}

// Respuesta de API
export interface CategoryResponse {
  id: string
  name: string
  color: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CategoriesListResponse {
  categories: CategoryResponse[]
  total: number
  page: number
  limit: number
}

// Para la sección de categorías con estadísticas
export interface CategoryWithAnalytics {
  id: string
  name: string
  color: string | null
  transactionCount: number
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}