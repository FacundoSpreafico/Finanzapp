import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromAccountId, toAccountId, amount } = body

    if (fromAccountId === toAccountId) {
      return NextResponse.json({ error: "Cannot transfer to the same account" }, { status: 400 })
    }

    // Check if source account has sufficient balance
    const fromAccount = await prisma.account.findUnique({
      where: { id: fromAccountId },
    })

    if (!fromAccount || fromAccount.balance < amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    // Perform the transfer using a transaction
    await prisma.$transaction([
      // Deduct from source account
      prisma.account.update({
        where: { id: fromAccountId },
        data: {
          balance: {
            decrement: amount,
          },
        },
      }),
      // Add to destination account
      prisma.account.update({
        where: { id: toAccountId },
        data: {
          balance: {
            increment: amount,
          },
        },
      }),
      // Create transfer record as expense from source
      prisma.transaction.create({
        data: {
          description: `Transferencia a cuenta destino`,
          amount,
          type: "EXPENSE",
          date: new Date(),
          accountId: fromAccountId,
        },
      }),
      // Create transfer record as income to destination
      prisma.transaction.create({
        data: {
          description: `Transferencia desde cuenta origen`,
          amount,
          type: "INCOME",
          date: new Date(),
          accountId: toAccountId,
        },
      }),
    ])

    return NextResponse.json({ message: "Transfer completed successfully" })
  } catch (error) {
    console.error("Error transferring funds:", error)
    return NextResponse.json({ error: "Error transferring funds" }, { status: 500 })
  }
}
