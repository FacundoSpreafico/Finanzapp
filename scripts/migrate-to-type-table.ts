import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrateToTypeTable() {
  console.log('🚀 Migrando datos a la nueva estructura con tabla Type...')
  
  try {
    // 1. Crear los tipos básicos
    console.log('📊 Creando tipos básicos...')
    
    const incomeType = await prisma.type.upsert({
      where: { description: 'INCOME' },
      update: {},
      create: {
        description: 'INCOME'
      }
    })
    
    const expenseType = await prisma.type.upsert({
      where: { description: 'EXPENSE' },
      update: {},
      create: {
        description: 'EXPENSE'
      }
    })
    
    console.log(`✅ Tipo INCOME: ${incomeType.id}`)
    console.log(`✅ Tipo EXPENSE: ${expenseType.id}`)
    
    // 2. Migrar categorías existentes (si las hay)
    console.log('\n📁 Verificando categorías existentes...')
    
    // Nota: Como el schema cambió, las categorías existentes podrían no tener typeId
    // Necesitaríamos verificar si la migración automática funcionó o si hay datos que migrar
    
    const categoriesCount = await prisma.category.count()
    console.log(`📊 Total de categorías: ${categoriesCount}`)
    
    if (categoriesCount === 0) {
      console.log('\n🆕 No hay categorías existentes. Creando categorías de ejemplo...')
      
      // Crear categorías de gastos
      const expenseCategories = [
        { name: 'COMIDA', color: '#ef4444' },
        { name: 'TRANSPORTE', color: '#3b82f6' },
        { name: 'ENTRETENIMIENTO', color: '#8b5cf6' },
        { name: 'SALUD', color: '#10b981' },
        { name: 'EDUCACION', color: '#f59e0b' },
        { name: 'ROPA', color: '#ec4899' },
        { name: 'HOGAR', color: '#6b7280' },
        { name: 'SERVICIOS', color: '#14b8a6' },
        { name: 'TECNOLOGIA', color: '#06b6d4' },
        { name: 'VIAJES', color: '#84cc16' }
      ]
      
      for (const cat of expenseCategories) {
        await prisma.category.create({
          data: {
            name: cat.name,
            typeId: expenseType.id,
            color: cat.color
          }
        })
      }
      
      // Crear categorías de ingresos
      const incomeCategories = [
        { name: 'SALARIO', color: '#16a34a' },
        { name: 'FREELANCE', color: '#2563eb' },
        { name: 'BONUS', color: '#dc2626' },
        { name: 'INVERSIONES', color: '#7c2d12' },
        { name: 'VENTA', color: '#0891b2' }
      ]
      
      for (const cat of incomeCategories) {
        await prisma.category.create({
          data: {
            name: cat.name,
            typeId: incomeType.id,
            color: cat.color
          }
        })
      }
      
      console.log(`✅ Creadas ${expenseCategories.length} categorías de gastos`)
      console.log(`✅ Creadas ${incomeCategories.length} categorías de ingresos`)
    }
    
    // 3. Verificar la nueva estructura
    console.log('\n🔍 Verificando nueva estructura...')
    
    const types = await prisma.type.findMany({
      include: {
        categories: true
      }
    })
    
    types.forEach(type => {
      console.log(`📋 Tipo: ${type.description} (${type.categories.length} categorías)`)
      type.categories.forEach(cat => {
        console.log(`   - ${cat.name} (${cat.color})`)
      })
    })
    
    console.log('\n🎉 ¡Migración completada exitosamente!')
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  migrateToTypeTable()
}

export { migrateToTypeTable }