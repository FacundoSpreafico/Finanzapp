import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Función para obtener o crear el usuario por defecto
async function getDefaultUserId(): Promise<string> {
  let user = await prisma.user.findFirst()
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        username: "usuario_demo",
        email: "demo@finanzapp.com",
        password: "hashed_password_demo",
        name: "Usuario Demo",
      },
    })
  }
  
  return user.id
}

// Datos de categorías actualizados con la nueva estructura
const EXPENSE_CATEGORIES = [
  { name: 'SUPERMERCADO', color: '#dc2626', descriptions: ['Compras en Carrefour', 'Supermercado Coto', 'Jumbo compras', 'Mercado local', 'Verdulería del barrio'] },
  { name: 'TRANSPORTE', color: '#3b82f6', descriptions: ['Uber al centro', 'Colectivo al trabajo', 'Nafta para el auto', 'SUBE recarga', 'Taxi nocturno'] },
  { name: 'RESTAURANT', color: '#f59e0b', descriptions: ['Almuerzo en restaurant', 'Cena familiar', 'McDonald\'s', 'Parrilla del domingo', 'Delivery de pizza'] },
  { name: 'ENTRETENIMIENTO', color: '#8b5cf6', descriptions: ['Netflix subscription', 'Cine con amigos', 'Spotify Premium', 'Videojuegos Steam', 'Concierto en vivo'] },
  { name: 'ROPA', color: '#ec4899', descriptions: ['Zapatillas Nike', 'Camisa para trabajo', 'Jeans nuevos', 'Ropa interior', 'Abrigo de invierno'] },
  { name: 'FARMACIA', color: '#10b981', descriptions: ['Medicamentos recetados', 'Vitaminas', 'Paracetamol', 'Crema solar', 'Productos de higiene'] },
  { name: 'SERVICIOS', color: '#14b8a6', descriptions: ['Internet Fibertel', 'Luz y gas', 'Agua corriente', 'Telefonía móvil', 'Netflix y Spotify'] },
  { name: 'EDUCACION', color: '#6366f1', descriptions: ['Curso de inglés', 'Libros universitarios', 'Capacitación online', 'Gym mensual', 'Taller de programación'] },
  { name: 'HOGAR', color: '#6b7280', descriptions: ['Productos de limpieza', 'Decoración living', 'Reparación heladera', 'Muebles IKEA', 'Plantas para jardín'] },
  { name: 'TECNOLOGIA', color: '#06b6d4', descriptions: ['Nuevo smartphone', 'Auriculares Bluetooth', 'Cable USB-C', 'Mouse inalámbrico', 'Cargador portátil'] },
]

const INCOME_CATEGORIES = [
  { name: 'SALARIO', color: '#16a34a', descriptions: ['Sueldo mensual empresa', 'Aguinaldo diciembre', 'Bono por objetivos', 'Horas extra trabajadas', 'Salario base'] },
  { name: 'FREELANCE', color: '#2563eb', descriptions: ['Proyecto web desarrollo', 'Consultoría IT', 'Diseño de logo', 'Traducción documentos', 'Clases particulares'] },
  { name: 'INVERSIONES', color: '#7c2d12', descriptions: ['Dividendos acciones', 'Intereses plazo fijo', 'Crypto trading', 'Fondos comunes', 'Bonos del tesoro'] },
  { name: 'VENTAS', color: '#0891b2', descriptions: ['Venta auto usado', 'MercadoLibre productos', 'Ropa usada', 'Muebles antiguos', 'Instrumentos musicales'] },
  { name: 'OTROS_INGRESOS', color: '#4338ca', descriptions: ['Reembolso seguro', 'Cashback tarjeta', 'Premio concurso', 'Devolución impuestos', 'Regalo familiar'] },
]

// Función para generar monto realista según categoría
function generateRealisticAmount(categoryName: string, isIncome: boolean): number {
  if (isIncome) {
    switch (categoryName) {
      case 'SALARIO':
        return Math.floor(Math.random() * 300000) + 200000 // 200k - 500k
      case 'FREELANCE':
        return Math.floor(Math.random() * 150000) + 50000  // 50k - 200k
      case 'INVERSIONES':
        return Math.floor(Math.random() * 100000) + 10000  // 10k - 110k
      case 'VENTAS':
        return Math.floor(Math.random() * 200000) + 20000  // 20k - 220k
      case 'OTROS_INGRESOS':
        return Math.floor(Math.random() * 50000) + 5000    // 5k - 55k
      default:
        return Math.floor(Math.random() * 100000) + 10000
    }
  } else {
    switch (categoryName) {
      case 'SUPERMERCADO':
        return Math.floor(Math.random() * 25000) + 5000   // 5k - 30k
      case 'TRANSPORTE':
        return Math.floor(Math.random() * 15000) + 2000   // 2k - 17k
      case 'RESTAURANT':
        return Math.floor(Math.random() * 20000) + 3000   // 3k - 23k
      case 'ENTRETENIMIENTO':
        return Math.floor(Math.random() * 12000) + 1000   // 1k - 13k
      case 'ROPA':
        return Math.floor(Math.random() * 30000) + 5000   // 5k - 35k
      case 'FARMACIA':
        return Math.floor(Math.random() * 10000) + 1000   // 1k - 11k
      case 'SERVICIOS':
        return Math.floor(Math.random() * 20000) + 5000   // 5k - 25k
      case 'EDUCACION':
        return Math.floor(Math.random() * 25000) + 5000   // 5k - 30k
      case 'HOGAR':
        return Math.floor(Math.random() * 15000) + 2000   // 2k - 17k
      case 'TECNOLOGIA':
        return Math.floor(Math.random() * 50000) + 10000  // 10k - 60k
      default:
        return Math.floor(Math.random() * 10000) + 1000
    }
  }
}

async function generateMassiveTestData() {
  console.log('🚀 Generando datos masivos de prueba con nueva estructura...')
  
  try {
    const userId = await getDefaultUserId()

    // 1. Obtener los tipos existentes
    console.log('📋 Obteniendo tipos de categorías...')
    const incomeType = await prisma.type.findUnique({
      where: { description: 'INCOME' }
    })
    const expenseType = await prisma.type.findUnique({
      where: { description: 'EXPENSE' }
    })

    if (!incomeType || !expenseType) {
      throw new Error('Los tipos INCOME y EXPENSE deben existir en la base de datos')
    }

    // 2. Limpiar datos existentes
    console.log('🧹 Limpiando datos anteriores...')
    await prisma.transaction.deleteMany()
    await prisma.category.deleteMany()

    // 3. Crear categorías de gastos
    console.log('💰 Creando categorías de gastos...')
    const createdExpenseCategories = []
    for (const category of EXPENSE_CATEGORIES) {
      const created = await prisma.category.create({
        data: {
          name: category.name,
          color: category.color,
          typeId: expenseType.id,
          userId: userId,
        },
      })
      createdExpenseCategories.push({ ...created, descriptions: category.descriptions })
    }

    // 4. Crear categorías de ingresos
    console.log('💸 Creando categorías de ingresos...')
    const createdIncomeCategories = []
    for (const category of INCOME_CATEGORIES) {
      const created = await prisma.category.create({
        data: {
          name: category.name,
          color: category.color,
          typeId: incomeType.id,
          userId: userId,
        },
      })
      createdIncomeCategories.push({ ...created, descriptions: category.descriptions })
    }

    // 5. Crear cuentas adicionales
    console.log('🏦 Creando cuentas...')
    await prisma.account.deleteMany()
    
    const accounts = await Promise.all([
      prisma.account.create({
        data: { type: "Cuenta Corriente", balance: 150000, userId }
      }),
      prisma.account.create({
        data: { type: "Cuenta Ahorro", balance: 300000, userId }
      }),
      prisma.account.create({
        data: { type: "Cuenta USD", balance: 85000, userId }
      }),
    ])

    // 6. Generar transacciones masivas
    console.log('📊 Generando 800 transacciones...')
    const allCategories = [...createdExpenseCategories, ...createdIncomeCategories]
    
    const transactions = []
    for (let i = 0; i < 800; i++) {
      // Seleccionar categoría aleatoria
      const category = allCategories[Math.floor(Math.random() * allCategories.length)]
      const isIncome = createdIncomeCategories.some(c => c.id === category.id)
      
      // Generar fecha aleatoria en los últimos 12 meses
      const now = new Date()
      const pastDate = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      
      // Seleccionar cuenta aleatoria
      const account = accounts[Math.floor(Math.random() * accounts.length)]
      
      // Generar descripción realista
      const descriptions = category.descriptions || ['Transacción general']
      const description = descriptions[Math.floor(Math.random() * descriptions.length)]
      
      // Generar monto realista (siempre positivo)
      const amount = generateRealisticAmount(category.name, isIncome)
      
      transactions.push({
        description,
        amount: amount, // Siempre positivo - el tipo se determina por la categoría
        categoryId: category.id,
        accountId: account.id,
        userId: userId,
        createdAt: pastDate,
        updatedAt: pastDate,
      })

      if ((i + 1) % 100 === 0) {
        console.log(`   ⏳ Procesadas ${i + 1}/800 transacciones...`)
      }
    }

    // Crear todas las transacciones
    await prisma.transaction.createMany({ data: transactions })

    // 7. Actualizar balances de las cuentas
    console.log('💳 Actualizando balances de cuentas...')
    for (const account of accounts) {
      const accountTransactions = await prisma.transaction.findMany({
        where: { accountId: account.id },
        include: {
          category: {
            include: { type: true }
          }
        }
      })
      
      const totalMovement = accountTransactions.reduce((sum, t) => {
        // Ingresos suman, gastos restan
        const isIncome = t.category.type.description === 'INCOME'
        return sum + (isIncome ? t.amount : -t.amount)
      }, 0)
      const newBalance = account.balance + totalMovement
      
      await prisma.account.update({
        where: { id: account.id },
        data: { balance: newBalance }
      })
    }

    // 8. Mostrar estadísticas finales
    console.log('\n📈 ESTADÍSTICAS FINALES:')
    
    const stats = await prisma.category.findMany({
      include: {
        type: true,
        transactions: true,
        _count: { select: { transactions: true } }
      }
    })

    let totalIncome = 0
    let totalExpense = 0
    
    console.log('\n💰 CATEGORÍAS DE GASTOS:')
    stats.filter(cat => cat.type.description === 'EXPENSE').forEach(cat => {
      const total = cat.transactions.reduce((sum, t) => sum + t.amount, 0)
      totalExpense += total
      console.log(`   ${cat.name}: ${cat._count.transactions} transacciones - $${total.toLocaleString('es-AR')}`)
    })

    console.log('\n💸 CATEGORÍAS DE INGRESOS:')
    stats.filter(cat => cat.type.description === 'INCOME').forEach(cat => {
      const total = cat.transactions.reduce((sum, t) => sum + t.amount, 0)
      totalIncome += total
      console.log(`   ${cat.name}: ${cat._count.transactions} transacciones - $${total.toLocaleString('es-AR')}`)
    })

    console.log(`\n🏦 RESUMEN CUENTAS:`)
    const finalAccounts = await prisma.account.findMany()
    finalAccounts.forEach(acc => {
      console.log(`   ${acc.type}: $${acc.balance.toLocaleString('es-AR')}`)
    })

    console.log(`\n📊 TOTALES:`)
    console.log(`   Total Ingresos: $${totalIncome.toLocaleString('es-AR')}`)
    console.log(`   Total Gastos: $${totalExpense.toLocaleString('es-AR')}`)
    console.log(`   Balance Neto: $${(totalIncome - totalExpense).toLocaleString('es-AR')}`)

    console.log('\n🎉 ¡Generación de datos masivos completada exitosamente!')

  } catch (error) {
    console.error('❌ Error durante la generación:', error)
  } finally {
    await prisma.$disconnect()
  }
}

generateMassiveTestData()