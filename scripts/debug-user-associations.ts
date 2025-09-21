import { PrismaClient } from '@prisma/client'
import { getDefaultUserId } from '../lib/default-user'

const prisma = new PrismaClient()

async function debugUserAssociations() {
  console.log('🔍 Debugging user associations...')
  
  try {
    const userId = await getDefaultUserId()
    console.log(`👤 Default User ID: ${userId}`)

    // Ver cuentas del usuario por defecto
    const userAccounts = await prisma.account.findMany({
      where: { userId }
    })
    console.log(`\n🏦 Cuentas del usuario ${userId}: ${userAccounts.length}`)
    userAccounts.forEach(acc => {
      console.log(`   ${acc.type}: $${acc.balance.toLocaleString('es-AR')}`)
    })

    // Ver transacciones del usuario por defecto
    const userTransactions = await prisma.transaction.findMany({
      where: { userId },
      take: 5,
      include: {
        category: {
          include: { type: true }
        },
        account: true
      }
    })
    console.log(`\n💳 Transacciones del usuario ${userId}: primeras 5`)
    userTransactions.forEach(t => {
      console.log(`   ${t.description}: $${t.amount} - ${t.category?.type?.description}`)
    })

    // Contar todas las transacciones del usuario
    const totalUserTransactions = await prisma.transaction.count({
      where: { userId }
    })
    console.log(`\n📊 Total transacciones del usuario: ${totalUserTransactions}`)

    // Ver todos los usuarios y sus transacciones
    const allUsers = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            transactions: true,
            accounts: true
          }
        }
      }
    })
    
    console.log('\n👥 Todos los usuarios:')
    allUsers.forEach(user => {
      console.log(`   ${user.email}: ${user._count.transactions} transacciones, ${user._count.accounts} cuentas`)
    })

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugUserAssociations()