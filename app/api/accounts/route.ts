import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getDefaultUserId } from "@/lib/default-user"

export async function GET() {
  try {
    const userId = await getDefaultUserId()
    const accounts = await prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(accounts)
  } catch (error) {
    console.error("Error fetching accounts:", error)
    return NextResponse.json({ error: "Error al obtener cuentas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    // Check if account type already exists for this user
    const existingAccount = await prisma.account.findFirst({
      where: { 
        userId,
        type: type.trim()
      }
    })

    if (existingAccount) {
      return NextResponse.json(
        { error: "Ya existe una cuenta de este tipo" }, 
        { status: 400 }
      )
    }

    // Create new account
    const account = await prisma.account.create({
      data: {
        type: type.trim(),
        balance,
        userId
      }
    })

    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    console.error("Error creating account:", error)
    return NextResponse.json({ error: "Error al crear cuenta" }, { status: 500 })
  }
}







