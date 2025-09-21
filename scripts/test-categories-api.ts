async function testCategoriesAPI() {
  try {
    console.log('🔍 PROBANDO API /api/categories...\n')
    
    // Probar ambos puertos por si acaso
    const ports = [3000, 3001]
    
    for (const port of ports) {
      try {
        console.log(`📡 Probando puerto ${port}...`)
        const response = await fetch(`http://localhost:${port}/api/categories`)
        
        if (response.ok) {
          const data = await response.json()
          
          console.log(`✅ Puerto ${port} funcionando`)
          console.log(`📊 Total de categorías devueltas: ${data.length}`)
          console.log('\n🏷️ CATEGORÍAS DEVUELTAS POR LA API:')
          
          data.forEach((cat: any, index: number) => {
            console.log(`${index + 1}. ${cat.name} (${cat.type}) - $${cat.totalAmount?.toLocaleString() || 0}`)
          })
          
          // Verificar si hay categorías de INCOME
          const incomeCategories = data.filter((cat: any) => cat.type === 'INCOME')
          const expenseCategories = data.filter((cat: any) => cat.type === 'EXPENSE')
          
          console.log(`\n📈 Categorías de INCOME: ${incomeCategories.length}`)
          incomeCategories.forEach((cat: any) => {
            console.log(`   - ${cat.name}: $${cat.totalAmount?.toLocaleString() || 0}`)
          })
          
          console.log(`\n📉 Categorías de EXPENSE: ${expenseCategories.length}`)
          expenseCategories.forEach((cat: any) => {
            console.log(`   - ${cat.name}: $${cat.totalAmount?.toLocaleString() || 0}`)
          })
          
          if (incomeCategories.length > 0) {
            console.log('\n❌ PROBLEMA ENCONTRADO: La API sigue devolviendo categorías de INCOME!')
          } else {
            console.log('\n✅ CORRECTO: La API solo devuelve categorías de EXPENSE')
          }
          
          return // Salir después del primer puerto que funcione
        } else {
          console.log(`❌ Puerto ${port} no disponible (${response.status})`)
        }
      } catch (error) {
        console.log(`❌ Error en puerto ${port}:`, (error as Error).message)
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error)
  }
}

testCategoriesAPI()