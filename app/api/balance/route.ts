import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get all accounts with their balances
    const accounts = await prisma.account.findMany()

    // Calculate total income and expenses
    const transactions = await prisma.transaction.findMany()

    const totalIncome = transactions.filter((t) => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions.filter((t) => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0)

    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
    const netBalance = totalIncome - totalExpenses

    return NextResponse.json({
      totalBalance,
      accounts,
      totalIncome,
      totalExpenses,
      netBalance,
    })
  } catch (error) {
    console.error("Error fetching balance data:", error)
    return NextResponse.json({ error: "Error fetching balance data" }, { status: 500 })
  }
}
