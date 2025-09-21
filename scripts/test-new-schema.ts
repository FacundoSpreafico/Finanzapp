import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testNewSchema() {
  console.log('🔍 Probando nueva estructura de base de datos...')
  
  try {
    // 1. Verificar los tipos
    console.log('\n📊 Tipos disponibles:')
    const types = await prisma.type.findMany({
      include: {
        _count: {
          select: { categories: true }
        }
      }
    })
    
    types.forEach(type => {
      console.log(`  ${type.description}: ${type._count.categories} categorías`)
    })

    // 2. Verificar categorías con sus tipos
    console.log('\n📁 Categorías por tipo:')
    const categoriesByType = await prisma.category.findMany({
      include: {
        type: true,
        _count: {
          select: { transactions: true }
        }
      },
      orderBy: [
        { type: { description: 'asc' } },
        { name: 'asc' }
      ]
    })

    let currentType = ''
    categoriesByType.forEach(category => {
      if (currentType !== category.type.description) {
        currentType = category.type.description
        console.log(`\n  ${currentType}:`)
      }
      console.log(`    - ${category.name} (${category._count.transactions} transacciones)`)
    })

    // 3. Probar filtrado de categorías EXPENSE (como lo hace la API)
    console.log('\n💰 Solo categorías EXPENSE (como la API):')
    const expenseCategories = await prisma.category.findMany({
      where: {
        type: {
          description: "EXPENSE"
        }
      },
      include: {
        type: true,
        _count: {
          select: { transactions: true }
        }
      },
      orderBy: {
        name: "asc",
      },
    })

    console.log(`  Total: ${expenseCategories.length} categorías de gastos`)
    expenseCategories.forEach(category => {
      console.log(`    - ${category.name} (${category.color})`)
    })

    // 4. Verificar que SALARIO y FREELANCE sean INCOME
    console.log('\n🔍 Verificando SALARIO y FREELANCE:')
    const incomeCategories = await prisma.category.findMany({
      where: {
        type: {
          description: "INCOME"
        }
      },
      include: {
        type: true
      }
    })

    const salario = incomeCategories.find(cat => cat.name === 'SALARIO')
    const freelance = incomeCategories.find(cat => cat.name === 'FREELANCE')

    console.log(`  SALARIO: ${salario ? `✅ Es ${salario.type.description}` : '❌ No encontrado'}`)
    console.log(`  FREELANCE: ${freelance ? `✅ Es ${freelance.type.description}` : '❌ No encontrado'}`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testNewSchema()