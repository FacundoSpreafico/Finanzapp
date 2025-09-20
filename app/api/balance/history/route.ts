import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get transactions grouped by date to show balance evolution
    const transactions = await prisma.transaction.findMany({
      include: {
        account: true,
      },
      orderBy: {
        date: "asc",
      },
    })

    // Calculate running balance for each account over time
    const balanceHistory: { [key: string]: number } = {}
    const historyData: Array<{ date: string; balance: number; account: string }> = []

    // Initialize account balances
    const accounts = await prisma.account.findMany()
    accounts.forEach((account) => {
      balanceHistory[account.id] = 0
    })

    // Process transactions chronologically
    transactions.forEach((transaction) => {
      const change = transaction.type === "INCOME" ? transaction.amount : -transaction.amount
      balanceHistory[transaction.accountId] += change

      historyData.push({
        date: transaction.date.toISOString().split("T")[0],
        balance: balanceHistory[transaction.accountId],
        account: transaction.account.name,
      })
    })

    // Group by date and sum all account balances
    const dailyTotals: { [key: string]: number } = {}
    historyData.forEach((entry) => {
      if (!dailyTotals[entry.date]) {
        dailyTotals[entry.date] = 0
      }
      dailyTotals[entry.date] = Object.values(balanceHistory).reduce((sum, balance) => sum + balance, 0)
    })

    const result = Object.entries(dailyTotals).map(([date, balance]) => ({
      date,
      balance,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching balance history:", error)
    return NextResponse.json({ error: "Error fetching balance history" }, { status: 500 })
  }
}
