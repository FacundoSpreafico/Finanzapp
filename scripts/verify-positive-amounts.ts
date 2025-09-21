import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyPositiveAmounts() {
  console.log('🔍 Verificando que todos los montos sean positivos...')
  
  try {
    // Buscar transacciones con montos negativos
    const negativeTransactions = await prisma.transaction.findMany({
      where: {
        amount: {
          lt: 0
        }
      },
      include: {
        category: {
          include: { type: true }
        }
      }
    })

    console.log(`\n📊 Transacciones con montos negativos: ${negativeTransactions.length}`)
    
    if (negativeTransactions.length > 0) {
      console.log('\n❌ TRANSACCIONES CON MONTOS NEGATIVOS ENCONTRADAS:')
      negativeTransactions.forEach(t => {
        console.log(`   • ${t.description}: $${t.amount} (${t.category.name} - ${t.category.type.description})`)
      })
    } else {
      console.log('\n✅ ¡Perfecto! Todas las transacciones tienen montos positivos')
    }

    // Mostrar estadísticas generales
    const totalTransactions = await prisma.transaction.count()
    const minAmount = await prisma.transaction.findFirst({
      orderBy: { amount: 'asc' }
    })
    const maxAmount = await prisma.transaction.findFirst({
      orderBy: { amount: 'desc' }
    })

    console.log(`\n📈 ESTADÍSTICAS GENERALES:`)
    console.log(`   Total transacciones: ${totalTransactions}`)
    console.log(`   Monto mínimo: $${minAmount?.amount.toLocaleString('es-AR')}`)
    console.log(`   Monto máximo: $${maxAmount?.amount.toLocaleString('es-AR')}`)

    // Verificar distribución por tipo
    const transactionsByType = await prisma.transaction.findMany({
      include: {
        category: {
          include: { type: true }
        }
      }
    })

    const incomeTransactions = transactionsByType.filter(t => t.category.type.description === 'INCOME')
    const expenseTransactions = transactionsByType.filter(t => t.category.type.description === 'EXPENSE')

    console.log(`\n💰 DISTRIBUCIÓN POR TIPO:`)
    console.log(`   Transacciones INCOME: ${incomeTransactions.length}`)
    console.log(`   Transacciones EXPENSE: ${expenseTransactions.length}`)
    
    // Verificar que todos los montos sean positivos por tipo
    const negativeIncome = incomeTransactions.filter(t => t.amount < 0)
    const negativeExpense = expenseTransactions.filter(t => t.amount < 0)
    
    console.log(`\n🔍 VERIFICACIÓN POR TIPO:`)
    console.log(`   INCOME negativos: ${negativeIncome.length} (debe ser 0)`)
    console.log(`   EXPENSE negativos: ${negativeExpense.length} (debe ser 0)`)
    
    if (negativeIncome.length === 0 && negativeExpense.length === 0) {
      console.log('\n🎉 ¡VALIDACIÓN EXITOSA! Todos los montos son positivos correctamente')
    } else {
      console.log('\n❌ ERROR: Se encontraron montos negativos')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyPositiveAmounts()