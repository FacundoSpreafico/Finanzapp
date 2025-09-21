import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getDefaultUserId } from "@/lib/default-user"

export async function GET() {
  try {
    // Get default user ID
    const userId = await getDefaultUserId()

    // Obtener todas las cuentas del usuario
    const accounts = await prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    })

    // Obtener todas las transacciones para calcular totales
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

    // Calcular balances dinámicamente por cuenta
    const accountBalances = accounts.map(account => {
      const accountTransactions = transactions.filter(t => t.account?.id === account.id)
      
      const ingresos = accountTransactions
        .filter(t => t.category?.type?.description === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0)
      
      const gastos = accountTransactions
        .filter(t => t.category?.type?.description === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0)
      
      // El balance actual ya está correcto en la DB (incluye saldo inicial + transacciones)
      // Solo necesitamos calcular el saldo inicial original
      const initialBalance = account.balance - ingresos + gastos

      return {
        id: account.id,
        type: account.type,
        balance: account.balance, // Balance real de la DB (incluye balance inicial)
        initialBalance: initialBalance, // Saldo inicial calculado (para referencia)
        ingresos: ingresos,
        gastos: gastos
      }
    })

    // Calcular totales generales (para estadísticas)
    const totalIngresos = transactions
      .filter(t => t.category?.type?.description === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalGastos = transactions
      .filter(t => t.category?.type?.description === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0)
    
    // El saldo total es la suma de todos los balances reales de las cuentas
    const saldoTotal = accounts.reduce((sum, account) => sum + account.balance, 0)
    
    // Para compatibilidad, calcular saldo inicial total real
    const totalInitialBalance = accountBalances.reduce((sum, acc) => sum + acc.initialBalance, 0)

    // Obtener transacciones recientes (últimas 10)
    const transaccionesRecientes = await prisma.transaction.findMany({
      where: { userId },
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        account: true,
        category: {
          include: {
            type: true
          }
        }
      }
    })

    const ingresosRecientes = transaccionesRecientes
      .filter(t => t.category?.type?.description === "INCOME")
      .slice(0, 5)

    const gastosRecientes = transaccionesRecientes
      .filter(t => t.category?.type?.description === "EXPENSE")  
      .slice(0, 5)

    // Agrupar gastos por categoría
    const gastosPorCategoria = transactions
      .filter(t => t.category?.type?.description === "EXPENSE")
      .reduce((acc, gasto) => {
        if (gasto.category) {
          const nombreCategoria = gasto.category.name
          if (!acc[nombreCategoria]) {
            acc[nombreCategoria] = {
              nombre: nombreCategoria,
              monto: 0,
              color: gasto.category.color || 'bg-gray-500',
              tipo: gasto.category.type?.description || 'EXPENSE'
            }
          }
          acc[nombreCategoria].monto += gasto.amount
        }
        return acc
      }, {} as Record<string, any>)

    // Filtrar solo categorías que tengan gastos > 0
    const resumenCategorias = Object.values(gastosPorCategoria)
      .filter((cat: any) => cat.monto > 0)
      .map((cat: any) => ({
        ...cat,
        id: cat.id || cat.nombre,
        textColor: '#000000'
      }))

    return NextResponse.json({
      // Estructura dinámica por cuentas
      accounts: accountBalances,
      
      // Balance total
      balanceData: {
        saldoTotal: saldoTotal,
        totalIngresos: totalIngresos,
        totalGastos: totalGastos
      },

      // Mantener compatibilidad con estructura antigua para las cards existentes
      balanceCards: accountBalances.concat([
        {
          id: 'total',
          type: 'Balance Total', 
          balance: saldoTotal,
          initialBalance: totalInitialBalance,
          ingresos: totalIngresos,
          gastos: totalGastos
        }
      ]),

      transaccionesRecientes: {
        ingresos: ingresosRecientes.map(t => ({
          id: t.id,
          fecha: t.createdAt.toISOString().slice(0, 10),
          descripcion: t.description,
          monto: t.amount,
          medio: t.account?.type || 'DESCONOCIDO',
          tipo: t.category?.type?.description || 'general'
        })),
        gastos: gastosRecientes.map(t => ({
          id: t.id,
          fecha: t.createdAt.toISOString().slice(0, 10),
          descripcion: t.description,
          monto: t.amount,
          categoria: t.category?.name || 'SIN CATEGORÍA',
          medio: t.account?.type || 'DESCONOCIDO'
        }))
      },
      
      categorias: resumenCategorias
    })

  } catch (error) {
    console.error("Error fetching dashboard summary:", error)
    return NextResponse.json({ error: "Error al obtener resumen del dashboard" }, { status: 500 })
  }
}