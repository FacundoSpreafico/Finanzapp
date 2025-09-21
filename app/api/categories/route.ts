import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getDefaultUserId } from "@/lib/default-user"

export async function GET(request: NextRequest) {
  try {
    // Obtener el tipo de categoría de los query params
    const { searchParams } = new URL(request.url)
    const categoryType = searchParams.get('type') || 'EXPENSE'
    
    // Obtener categorías según el tipo solicitado
    const categories = await prisma.category.findMany({
      where: {
        type: {
          description: categoryType // Puede ser "EXPENSE" o "INCOME"
        }
      },
      include: {
        type: true, // Incluir el tipo relacionado
        _count: {
          select: { transactions: true },
        },
        transactions: {
          select: {
            amount: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    // Calcular el monto total por categoría
    const categoriesWithStats = categories.map(category => ({
      id: category.id,
      name: category.name,
      color: category.color,
      type: category.type?.description || 'UNKNOWN',
      userId: category.userId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      _count: category._count,
      totalAmount: category.transactions.reduce((sum, transaction) => sum + transaction.amount, 0),
      transactionCount: category._count.transactions,
    }))

    return NextResponse.json(categoriesWithStats)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, color, typeDescription = "EXPENSE" } = body

    // Buscar el tipo correspondiente
    const type = await prisma.type.findFirst({
      where: { description: typeDescription }
    })

    if (!type) {
      return NextResponse.json({ error: "Tipo no encontrado" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name: name.toUpperCase(),
        color,
        typeId: type.id
      },
      include: {
        type: true
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Error creating category" }, { status: 500 })
  }
}
