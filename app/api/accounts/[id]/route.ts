import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getDefaultUserId } from "@/lib/default-user"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getDefaultUserId()
    const account = await prisma.account.findUnique({
      where: { 
        id: params.id,
        userId 
      }
    })

    if (!account) {
      return NextResponse.json({ error: "Cuenta no encontrada" }, { status: 404 })
    }

    return NextResponse.json(account)
  } catch (error) {
    console.error("Error fetching account:", error)
    return NextResponse.json({ error: "Error al obtener cuenta" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getDefaultUserId()
    const { type, balance } = await request.json()

    // Validate required fields
    if (!type || typeof balance !== 'number') {
      return NextResponse.json(
        { error: "Tipo de cuenta y balance son requeridos" }, 
        { status: 400 }
      )
    }

    // Check if account exists and belongs to user
    const existingAccount = await prisma.account.findUnique({
      where: { id: params.id }
    })

    if (!existingAccount || existingAccount.userId !== userId) {
      return NextResponse.json({ error: "Cuenta no encontrada" }, { status: 404 })
    }

    // Check if new type conflicts with existing accounts (except current one)
    const conflictingAccount = await prisma.account.findFirst({
      where: { 
        userId,
        type: type.trim(),
        id: { not: params.id }
      }
    })

    if (conflictingAccount) {
      return NextResponse.json(
        { error: "Ya existe otra cuenta de este tipo" }, 
        { status: 400 }
      )
    }

    // Update account
    const account = await prisma.account.update({
      where: { id: params.id },
      data: {
        type: type.trim(),
        balance
      }
    })

    return NextResponse.json(account)
  } catch (error) {
    console.error("Error updating account:", error)
    return NextResponse.json({ error: "Error al actualizar cuenta" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getDefaultUserId()

    // Check if account exists and belongs to user
    const account = await prisma.account.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { transactions: true }
        }
      }
    })

    if (!account || account.userId !== userId) {
      return NextResponse.json({ error: "Cuenta no encontrada" }, { status: 404 })
    }

    // Check if account has transactions
    if (account._count.transactions > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar una cuenta con transacciones asociadas" }, 
        { status: 400 }
      )
    }

    // Delete account
    await prisma.account.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Cuenta eliminada exitosamente" })
  } catch (error) {
    console.error("Error deleting account:", error)
    return NextResponse.json({ error: "Error al eliminar cuenta" }, { status: 500 })
  }
}