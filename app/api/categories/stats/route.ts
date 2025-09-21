import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        type: {
          description: "EXPENSE"
        }
      },
      include: {
        type: true,
        transactions: true
      },
    })

    const stats = categories.map((category) => ({
      name: category.name,
      color: category.color,
      totalAmount: category.transactions.reduce((sum, transaction) => sum + transaction.amount, 0),
      transactionCount: category.transactions.length,
    }))

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching category stats:", error)
    return NextResponse.json({ error: "Error fetching category stats" }, { status: 500 })
  }
}
