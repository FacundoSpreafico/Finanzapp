import { prisma } from "../lib/prisma"
import { getDefaultUserId } from "../lib/default-user"

async function seedTestData() {
  try {
    const userId = await getDefaultUserId()
    console.log("Usuario por defecto:", userId)

    // Crear cuentas si no existen
    const cuentas = [
      { type: "MERCADO_PAGO", balance: 0 },
      { type: "EFECTIVO", balance: 0 },
      { type: "AHORRO", balance: 0 }
    ]

    for (const cuenta of cuentas) {
      const existingAccount = await prisma.account.findFirst({
        where: { type: cuenta.type, userId }
      })

      if (!existingAccount) {
        await prisma.account.create({
          data: {
            type: cuenta.type,
            balance: cuenta.balance,
            userId
          }
        })
        console.log(`Cuenta creada: ${cuenta.type}`)
      }
    }

    // Crear categorías si no existen
    const categorias = [
      { name: "SALARIO", type: "INCOME", color: "bg-green-500" },
      { name: "FREELANCE", type: "INCOME", color: "bg-blue-500" },
      { name: "NAFTA", type: "EXPENSE", color: "bg-orange-500" },
      { name: "COMIDAS", type: "EXPENSE", color: "bg-amber-500" },
      { name: "COMPRAS", type: "EXPENSE", color: "bg-purple-500" },
      { name: "SERVICIOS", type: "EXPENSE", color: "bg-red-500" },
      { name: "ENTRETENIMIENTO", type: "EXPENSE", color: "bg-pink-500" }
    ]

    for (const categoria of categorias) {
      const existingCategory = await prisma.category.findFirst({
        where: { name: categoria.name }
      })

      if (!existingCategory) {
        await prisma.category.create({
          data: categoria
        })
        console.log(`Categoría creada: ${categoria.name}`)
      }
    }

    // Crear transacciones de ejemplo
    const transacciones = [
      // Ingresos
      {
        description: "Salario Septiembre",
        amount: 500000,
        type: "INCOME",
        accountType: "MERCADO_PAGO",
        categoryName: "SALARIO",
        date: new Date("2025-09-01")
      },
      {
        description: "Proyecto Freelance",
        amount: 150000,
        type: "INCOME",
        accountType: "MERCADO_PAGO",
        categoryName: "FREELANCE",
        date: new Date("2025-09-15")
      },
      {
        description: "Efectivo recibido",
        amount: 50000,
        type: "INCOME",
        accountType: "EFECTIVO",
        categoryName: "FREELANCE",
        date: new Date("2025-09-10")
      },

      // Gastos
      {
        description: "Combustible",
        amount: 25000,
        type: "EXPENSE",
        accountType: "MERCADO_PAGO",
        categoryName: "NAFTA",
        date: new Date("2025-09-18")
      },
      {
        description: "Almuerzo",
        amount: 8500,
        type: "EXPENSE",
        accountType: "EFECTIVO",
        categoryName: "COMIDAS",
        date: new Date("2025-09-19")
      },
      {
        description: "Compras supermercado",
        amount: 45000,
        type: "EXPENSE",
        accountType: "MERCADO_PAGO",
        categoryName: "COMPRAS",
        date: new Date("2025-09-17")
      },
      {
        description: "Internet y luz",
        amount: 35000,
        type: "EXPENSE",
        accountType: "MERCADO_PAGO",
        categoryName: "SERVICIOS",
        date: new Date("2025-09-05")
      },
      {
        description: "Cine",
        amount: 12000,
        type: "EXPENSE",
        accountType: "MERCADO_PAGO",
        categoryName: "ENTRETENIMIENTO",
        date: new Date("2025-09-16")
      }
    ]

    for (const transaccion of transacciones) {
      // Buscar cuenta
      const cuenta = await prisma.account.findFirst({
        where: { type: transaccion.accountType, userId }
      })

      // Buscar categoría
      const categoria = await prisma.category.findFirst({
        where: { name: transaccion.categoryName }
      })

      if (cuenta && categoria) {
        // Crear transacción (sin campo type)
        await prisma.transaction.create({
          data: {
            description: transaccion.description,
            amount: transaccion.amount,
            date: transaccion.date,
            userId,
            accountId: cuenta.id,
            categoryId: categoria.id
          }
        })

        // Actualizar balance de la cuenta
        const balanceChange = transaccion.type === "INCOME" ? transaccion.amount : -transaccion.amount
        await prisma.account.update({
          where: { id: cuenta.id },
          data: {
            balance: {
              increment: balanceChange
            }
          }
        })

        console.log(`Transacción creada: ${transaccion.description} - $${transaccion.amount}`)
      }
    }

    console.log("✅ Datos de prueba agregados exitosamente!")

    // Mostrar resumen
    const totalIncome = await prisma.transaction.aggregate({
      where: { 
        userId, 
        category: { 
          type: "INCOME" 
        } 
      },
      _sum: { amount: true }
    })

    const totalExpenses = await prisma.transaction.aggregate({
      where: { 
        userId, 
        category: { 
          type: "EXPENSE" 
        } 
      },
      _sum: { amount: true }
    })

    const accounts = await prisma.account.findMany({
      where: { userId }
    })

    console.log("\n📊 RESUMEN:")
    console.log(`Total Ingresos: $${totalIncome._sum?.amount?.toLocaleString() || 0}`)
    console.log(`Total Gastos: $${totalExpenses._sum?.amount?.toLocaleString() || 0}`)
    console.log(`Saldo Neto: $${((totalIncome._sum?.amount || 0) - (totalExpenses._sum?.amount || 0)).toLocaleString()}`)
    console.log("\nBalances por cuenta:")
    accounts.forEach(account => {
      console.log(`${account.type}: $${account.balance.toLocaleString()}`)
    })

  } catch (error) {
    console.error("Error agregando datos de prueba:", error)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedTestData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { seedTestData }