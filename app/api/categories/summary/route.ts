import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Obtener todas las categorías de tipo EXPENSE con sus transacciones
    const categorias = await prisma.category.findMany({
      where: {
        type: {
          description: "EXPENSE"
        }
      },
      include: {
        type: true,
        transactions: {
          select: {
            amount: true
          }
        }
      }
    })

    // Formatear datos para el resumen del dashboard
    const resumenCategorias = categorias.map(categoria => {
      const totalAmount = categoria.transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      
      return {
        id: categoria.id,
        nombre: categoria.name,
        monto: totalAmount,
        color: categoria.color || 'bg-gray-500',
        tipo: categoria.type?.description || 'EXPENSE',
        transactionCount: categoria.transactions.length,
        // Color de texto por defecto
        textColor: '#000000'
      }
    })
    .filter(categoria => categoria.monto > 0) // Solo mostrar categorías con gastos
    .sort((a, b) => b.monto - a.monto) // Ordenar por monto descendente

    return NextResponse.json(resumenCategorias)

  } catch (error) {
    console.error("Error fetching category summary:", error)
    return NextResponse.json({ error: "Error al obtener resumen de categorías" }, { status: 500 })
  }
}

// Helper function para mapear colores de fondo a colores de texto
function getTextColorFromBg(bgColor: string): string {
  const colorMap: Record<string, string> = {
    'bg-orange-500': 'text-orange-600',
    'bg-purple-500': 'text-purple-600',
    'bg-amber-500': 'text-amber-600',
    'bg-blue-500': 'text-blue-600',
    'bg-green-500': 'text-green-600',
    'bg-red-500': 'text-red-600',
    'bg-gray-500': 'text-gray-600',
    'bg-indigo-500': 'text-indigo-600',
    'bg-emerald-500': 'text-emerald-600',
    'bg-yellow-500': 'text-yellow-600',
    'bg-pink-500': 'text-pink-600',
    'bg-teal-500': 'text-teal-600'
  }
  
  return colorMap[bgColor] || 'text-gray-600'
}