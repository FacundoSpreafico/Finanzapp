import { NextResponse, type NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") // 'INCOME', 'EXPENSE', or null for all
    const offset = parseInt(searchParams.get("offset") || "0")

    const whereClause = type ? { 
      category: { 
        type: type.toUpperCase() 
      } 
    } : {}

    const transacciones = await prisma.transaction.findMany({
      where: whereClause,
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        account: {
          select: {
            type: true,
            id: true
          }
        },
        category: {
          select: {
            name: true,
            color: true,
            type: true,
            id: true
          }
        }
      }
    })

    // Formatear datos para el frontend
    const transaccionesFormateadas = transacciones.map(t => ({
      id: t.id,
      fecha: t.createdAt.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit' 
      }),
      descripcion: t.description,
      monto: t.amount,
      tipo: t.category?.type || 'EXPENSE', // Obtener tipo de la categoría
      medio: t.account?.type || 'DESCONOCIDO',
      categoria: t.category?.name || null,
      categoriaColor: t.category?.color || null,
      categoriaTipo: t.category?.type || null,
      createdAt: t.createdAt
    }))

    // Contar total de transacciones para paginación
    const total = await prisma.transaction.count({
      where: whereClause
    })

    return NextResponse.json({
      transacciones: transaccionesFormateadas,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })

  } catch (error) {
    console.error("Error fetching recent transactions:", error)
    return NextResponse.json({ error: "Error al obtener transacciones recientes" }, { status: 500 })
  }
}