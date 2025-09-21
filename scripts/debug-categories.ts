import { prisma } from "../lib/prisma"
import { getDefaultUserId } from "../lib/default-user"

async function debugCategoriesAndTransactions() {
  try {
    const userId = await getDefaultUserId()
    
    // Obtener todas las transacciones con sus categorías
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
        account: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log("=== ANÁLISIS DE TRANSACCIONES POR TIPO ===")
    
    // Separar por tipo usando categoría
    const ingresos = transactions.filter(t => t.category?.type === "INCOME")
    const gastos = transactions.filter(t => t.category?.type === "EXPENSE")
    
    console.log(`\n📈 INGRESOS (${ingresos.length} transacciones):`)
    ingresos.forEach(t => {
      console.log(`  - ${t.description}: $${t.amount} | Categoría: ${t.category?.name || 'SIN CATEGORÍA'} | Tipo Cat: ${t.category?.type || 'N/A'}`)
    })
    
    console.log(`\n📉 GASTOS (${gastos.length} transacciones):`)
    gastos.forEach(t => {
      console.log(`  - ${t.description}: $${t.amount} | Categoría: ${t.category?.name || 'SIN CATEGORÍA'} | Tipo Cat: ${t.category?.type || 'N/A'}`)
    })

    // Agrupar gastos por categoría (como hace la API)
    const gastosPorCategoria = gastos.reduce((acc, gasto) => {
      if (gasto.category) {
        const nombreCategoria = gasto.category.name
        if (!acc[nombreCategoria]) {
          acc[nombreCategoria] = {
            nombre: nombreCategoria,
            monto: 0,
            transacciones: 0,
            tipo: gasto.category.type
          }
        }
        acc[nombreCategoria].monto += gasto.amount
        acc[nombreCategoria].transacciones += 1
      }
      return acc
    }, {} as Record<string, any>)

    console.log(`\n💳 RESUMEN DE GASTOS POR CATEGORÍA:`)
    Object.values(gastosPorCategoria).forEach((cat: any) => {
      console.log(`  - ${cat.nombre}: $${cat.monto.toLocaleString()} (${cat.transacciones} transacciones) | Tipo: ${cat.tipo}`)
    })

    // Verificar si hay categorías con ingresos que se estén colando
    const ingresosPorCategoria = ingresos.reduce((acc, ingreso) => {
      if (ingreso.category) {
        const nombreCategoria = ingreso.category.name
        if (!acc[nombreCategoria]) {
          acc[nombreCategoria] = {
            nombre: nombreCategoria,
            monto: 0,
            transacciones: 0,
            tipo: ingreso.category.type
          }
        }
        acc[nombreCategoria].monto += ingreso.amount
        acc[nombreCategoria].transacciones += 1
      }
      return acc
    }, {} as Record<string, any>)

    console.log(`\n💰 RESUMEN DE INGRESOS POR CATEGORÍA:`)
    Object.values(ingresosPorCategoria).forEach((cat: any) => {
      console.log(`  - ${cat.nombre}: $${cat.monto.toLocaleString()} (${cat.transacciones} transacciones) | Tipo: ${cat.tipo}`)
    })

  } catch (error) {
    console.error("Error analizando transacciones:", error)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  debugCategoriesAndTransactions()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { debugCategoriesAndTransactions }