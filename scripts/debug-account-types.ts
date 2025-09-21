import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function debugAccountTypes() {
  console.log('🔍 Debugging account types and data...')
  
  try {
    // 1. Ver las cuentas y sus tipos
    console.log('\n📊 Cuentas en la base de datos:')
    const accounts = await prisma.account.findMany()
    accounts.forEach(acc => {
      console.log(`   ${acc.type}: $${acc.balance.toLocaleString('es-AR')}`)
    })

    // 2. Ver los tipos únicos de cuentas
    const uniqueAccountTypes = [...new Set(accounts.map(acc => acc.type))]
    console.log('\n🏦 Tipos únicos de cuentas:', uniqueAccountTypes)

    // 3. Ver algunas transacciones con sus cuentas
    console.log('\n💳 Muestra de transacciones:')
    const sampleTransactions = await prisma.transaction.findMany({
      take: 5,
      include: {
        account: true,
        category: {
          include: { type: true }
        }
      }
    })

    sampleTransactions.forEach(t => {
      console.log(`   ${t.description}: $${t.amount} - ${t.account?.type} - ${t.category?.name} (${t.category?.type?.description})`)
    })

    // 4. Contar transacciones por tipo de categoría
    const incomeTransactions = await prisma.transaction.count({
      where: {
        category: {
          type: {
            description: 'INCOME'
          }
        }
      }
    })

    const expenseTransactions = await prisma.transaction.count({
      where: {
        category: {
          type: {
            description: 'EXPENSE'
          }
        }
      }
    })

    console.log('\n📈 Conteos por tipo:')
    console.log(`   INCOME: ${incomeTransactions} transacciones`)
    console.log(`   EXPENSE: ${expenseTransactions} transacciones`)

    // 5. Verificar si hay usuario por defecto
    const users = await prisma.user.findMany()
    console.log(`\n👤 Usuarios en DB: ${users.length}`)
    users.forEach(user => {
      console.log(`   ${user.username} (${user.email})`)
    })

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugAccountTypes()