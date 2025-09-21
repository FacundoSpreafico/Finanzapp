import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Get transaction details before deletion
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { 
        account: true,
        category: {
          include: {
            type: true
          }
        }
      },
    })

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    // Delete transaction
    await prisma.transaction.delete({
      where: { id },
    })

    // Update account balance (reverse the transaction)
    const isIncome = transaction.category?.type?.description === "INCOME"
    const balanceChange = isIncome ? -transaction.amount : transaction.amount
    if (transaction.accountId) {
      await prisma.account.update({
        where: { id: transaction.accountId },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      })
    }

    return NextResponse.json({ message: "Transaction deleted successfully" })
  } catch (error) {
    console.error("Error deleting transaction:", error)
    return NextResponse.json({ error: "Error deleting transaction" }, { status: 500 })
  }
}
