import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearDatabase() {
  try {
    console.log('🗑️  Iniciando limpieza de la base de datos...')

    // Eliminar en orden correcto (respetando las relaciones)
    console.log('🔄 Eliminando transacciones...')
    const deletedTransactions = await prisma.transaction.deleteMany({})
    console.log(`✅ ${deletedTransactions.count} transacciones eliminadas`)

    console.log('🔄 Eliminando cuentas...')
    const deletedAccounts = await prisma.account.deleteMany({})
    console.log(`✅ ${deletedAccounts.count} cuentas eliminadas`)

    console.log('🔄 Eliminando categorías...')
    const deletedCategories = await prisma.category.deleteMany({})
    console.log(`✅ ${deletedCategories.count} categorías eliminadas`)

    console.log('🔄 Eliminando tipos...')
    const deletedTypes = await prisma.type.deleteMany({})
    console.log(`✅ ${deletedTypes.count} tipos eliminados`)

    console.log('🔄 Eliminando usuarios...')
    const deletedUsers = await prisma.user.deleteMany({})
    console.log(`✅ ${deletedUsers.count} usuarios eliminados`)

    console.log('✨ ¡Base de datos completamente limpia!')
    
    // Mostrar resumen
    console.log('\n📊 Resumen de limpieza:')
    console.log(`- Transacciones: ${deletedTransactions.count}`)
    console.log(`- Cuentas: ${deletedAccounts.count}`)
    console.log(`- Categorías: ${deletedCategories.count}`)
    console.log(`- Tipos: ${deletedTypes.count}`)
    console.log(`- Usuarios: ${deletedUsers.count}`)

  } catch (error) {
    console.error('❌ Error al limpiar la base de datos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  console.log('⚠️  ADVERTENCIA: Este script eliminará TODOS los datos de la base de datos.')
  console.log('⚠️  ¿Estás seguro de que quieres continuar? (Presiona Ctrl+C para cancelar)')
  
  // Dar tiempo para cancelar
  setTimeout(() => {
    clearDatabase()
  }, 3000)
}

export { clearDatabase }