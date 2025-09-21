import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testCategoriesAPI() {
  console.log('🔧 Simulando la API /api/categories...')
  
  try {
    // Simular exactamente lo que hace la API
    const categories = await prisma.category.findMany({
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
      },
      orderBy: {
        name: "asc",
      },
    })

    // Mapear los datos como lo hace la API
    const categoriesWithStats = categories.map(category => ({
      id: category.id,
      name: category.name,
      color: category.color,
      type: category.type?.description || 'UNKNOWN',
      userId: category.userId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      _count: category._count,
      totalAmount: category.transactions.reduce((sum, transaction) => sum + transaction.amount, 0),
      transactionCount: category._count.transactions,
    }))

    console.log(`\n✅ API devolvería ${categoriesWithStats.length} categorías`)
    
    console.log('\n📋 Categorías devueltas por la API:')
    categoriesWithStats.forEach(cat => {
      console.log(`   • ${cat.name} (${cat.type})`)
      console.log(`     - ${cat.transactionCount} transacciones`)
      console.log(`     - Total: $${cat.totalAmount.toLocaleString('es-AR')}`)
    })

    // Verificar que SALARIO y FREELANCE NO aparezcan
    const salarioFound = categoriesWithStats.find(cat => cat.name === 'SALARIO')
    const freelanceFound = categoriesWithStats.find(cat => cat.name === 'FREELANCE')

    console.log('\n🔍 Verificación crítica:')
    console.log(`   SALARIO aparece en API: ${salarioFound ? '❌ SÍ (ERROR!)' : '✅ NO (correcto)'}`)
    console.log(`   FREELANCE aparece en API: ${freelanceFound ? '❌ SÍ (ERROR!)' : '✅ NO (correcto)'}`)

    // Mostrar tipos únicos devueltos
    const uniqueTypes = [...new Set(categoriesWithStats.map(cat => cat.type))]
    console.log(`\n📊 Tipos únicos en respuesta: ${uniqueTypes.join(', ')}`)

    if (uniqueTypes.length === 1 && uniqueTypes[0] === 'EXPENSE') {
      console.log('✅ ¡Perfecto! Solo se devuelven categorías EXPENSE')
    } else {
      console.log('❌ Error: Se están devolviendo tipos incorrectos')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testCategoriesAPI()