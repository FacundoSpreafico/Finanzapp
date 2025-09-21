import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { transactions: true }
        },
        transactions: {
          select: {
            amount: true
          }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 })
    }

    // Calcular estadísticas
    const totalAmount = category.transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

    const categoryWithStats = {
      ...category,
      totalAmount,
      transactionCount: category._count.transactions
    }

    return NextResponse.json(categoryWithStats)
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Error al obtener categoría" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, color } = body

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name?.toUpperCase(),
        color,
        updatedAt: new Date()
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Error al actualizar categoría" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Verificar si tiene transacciones asociadas
    const transactionCount = await prisma.transaction.count({
      where: { categoryId: id }
    })

    if (transactionCount > 0) {
      return NextResponse.json(
        { error: `No se puede eliminar una categoría con ${transactionCount} transacciones asociadas. Elimina primero las transacciones.` }, 
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Categoría eliminada exitosamente" })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Error al eliminar categoría" }, { status: 500 })
  }
}
