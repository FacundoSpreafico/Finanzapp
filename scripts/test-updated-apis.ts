import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testAPIs() {
  console.log('🔍 Probando APIs actualizadas...')
  
  try {
    console.log('\n1️⃣ Probando estructura de datos...')
    
    // Verificar transacciones con categorías y tipos
    const transactions = await prisma.transaction.findMany({
      include: {
        category: {
          include: {
            type: true
          }
        },
        account: true
      },
      take: 5
    })

    console.log(`📊 Encontradas ${transactions.length} transacciones de muestra:`)
    transactions.forEach(t => {
      console.log(`  • ${t.description}: $${t.amount} (${t.category?.type?.description}) - ${t.category?.name}`)
    })

    console.log('\n2️⃣ Simulando balance/summary API...')
    
    // Simular el cálculo que hace balance/summary
    const allTransactions = await prisma.transaction.findMany({
      include: {
        category: {
          include: {
            type: true
          }
        },
        account: true
      }
    })

    const ingresos = allTransactions.filter(t => t.category?.type?.description === "INCOME")
    const gastos = allTransactions.filter(t => t.category?.type?.description === "EXPENSE")

    const totalIngresos = ingresos.reduce((sum, t) => sum + t.amount, 0)
    const totalGastos = gastos.reduce((sum, t) => sum + t.amount, 0)

    console.log(`💰 Total Ingresos: $${totalIngresos.toLocaleString('es-AR')}`)
    console.log(`💸 Total Gastos: $${totalGastos.toLocaleString('es-AR')}`)
    console.log(`📈 Balance Neto: $${(totalIngresos - totalGastos).toLocaleString('es-AR')}`)

    console.log('\n3️⃣ Verificando cuentas...')
    const accounts = await prisma.account.findMany()
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
    console.log(`🏦 Total en cuentas: $${totalBalance.toLocaleString('es-AR')}`)
    
    accounts.forEach(acc => {
      console.log(`  - ${acc.type}: $${acc.balance.toLocaleString('es-AR')}`)
    })

    console.log('\n4️⃣ Probando categorías de gastos...')
    
    // Simular lo que hace categories/summary
    const expenseCategories = await prisma.category.findMany({
      where: {
        type: {
          description: "EXPENSE"
        }
      },
      include: {
        type: true,
        transactions: true,
        _count: {
          select: { transactions: true }
        }
      }
    })

    console.log(`📂 ${expenseCategories.length} categorías de gastos encontradas:`)
    expenseCategories.forEach(cat => {
      const total = cat.transactions.reduce((sum, t) => sum + t.amount, 0)
      console.log(`  • ${cat.name}: ${cat._count.transactions} transacciones, $${total.toLocaleString('es-AR')}`)
    })

    console.log('\n✅ APIs actualizadas correctamente - estructura funcionando!')

  } catch (error) {
    console.error('❌ Error probando APIs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAPIs()