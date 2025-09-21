import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getDefaultUserId } from "@/lib/default-user"

export async function GET() {
  try {
    const userId = await getDefaultUserId()

    // Obtener todas las cuentas
    const accounts = await prisma.account.findMany({
      where: { userId }
    })

    // Obtener todas las transacciones
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        account: true,
        category: {
          include: {
            type: true
          }
        }
      }
    })

    // Calcular totales
    const totalIngresos = transactions
      .filter(t => t.category?.type?.description === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalGastos = transactions
      .filter(t => t.category?.type?.description === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0)

    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

    // Separar por cuentas
    const accountDetails = accounts.map(account => {
      const accountTransactions = transactions.filter(t => t.account?.id === account.id)
      
      const ingresos = accountTransactions
        .filter(t => t.category?.type?.description === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0)
      
      const gastos = accountTransactions
        .filter(t => t.category?.type?.description === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0)

      return {
        id: account.id,
        type: account.type,
        currentBalance: account.balance,
        ingresos: ingresos,
        gastos: gastos,
        calculatedBalance: ingresos - gastos, // Lo que debería ser si empezara en 0
        possibleInitialBalance: account.balance - ingresos + gastos
      }
    })

    return NextResponse.json({
      summary: {
        totalIngresos,
        totalGastos,
        totalBalance,
        calculatedBalance: totalIngresos - totalGastos,
        difference: totalBalance - (totalIngresos - totalGastos)
      },
      accounts: accountDetails,
      transactions: transactions.map(t => ({
        id: t.id,
        amount: t.amount,
        date: t.date,
        accountType: t.account?.type,
        categoryName: t.category?.name,
        categoryType: t.category?.type?.description
      }))
    })

  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json({ error: "Debug error" }, { status: 500 })
  }
}