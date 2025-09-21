import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getDefaultUserId } from "@/lib/default-user"

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        account: true,
        category: true,
      },
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Error fetching transactions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { description, amount, account, category, categoryType, date } = body

    // Get default user ID
    const userId = await getDefaultUserId()

    // Find account by ID
    let accountRecord = await prisma.account.findUnique({
      where: { 
        id: account
      },
    })

    if (!accountRecord) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 })
    }

    // Find category by ID (required)
    const categoryRecord = await prisma.category.findUnique({
      where: { id: category },
      include: {
        type: true
      }
    })

    if (!categoryRecord) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Create transaction (sin campo type, se determina por categoría)
    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        date: new Date(date),
        userId: userId,
        accountId: accountRecord.id,
        categoryId: categoryRecord.id, // Ahora es requerido
      },
      include: {
        account: true,
        category: true,
      },
    })

    // Update account balance - usar el tipo de la categoría
    const balanceChange = categoryRecord.type?.description === "INCOME" ? amount : -amount
    await prisma.account.update({
      where: { id: accountRecord.id },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Error creating transaction" }, { status: 500 })
  }
}
