import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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
    const { description, amount, type, account, category, date } = body

    // Find or create account
    let accountRecord = await prisma.account.findFirst({
      where: { type: account.toUpperCase() },
    })

    if (!accountRecord) {
      accountRecord = await prisma.account.create({
        data: {
          name: account,
          type: account.toUpperCase(),
          balance: 0,
        },
      })
    }

    // Find or create category
    let categoryRecord = null
    if (category) {
      categoryRecord = await prisma.category.findFirst({
        where: { name: category.toUpperCase() },
      })

      if (!categoryRecord) {
        categoryRecord = await prisma.category.create({
          data: {
            name: category.toUpperCase(),
          },
        })
      }
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        type: type.toUpperCase(),
        date: new Date(date),
        accountId: accountRecord.id,
        categoryId: categoryRecord?.id,
      },
      include: {
        account: true,
        category: true,
      },
    })

    // Update account balance
    const balanceChange = type === "INCOME" ? amount : -amount
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
