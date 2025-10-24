import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    console.log('🔍 Verificando y creando tipos...')
    
    // Crear EXPENSE si no existe
    const expenseType = await prisma.type.upsert({
      where: { description: 'EXPENSE' },
      update: {},
      create: {
        description: 'EXPENSE'
      }
    })
    
    // Crear INCOME si no existe
    const incomeType = await prisma.type.upsert({
      where: { description: 'INCOME' },
      update: {},
      create: {
        description: 'INCOME'
      }
    })
    
    // Obtener todos los tipos
    const allTypes = await prisma.type.findMany()
    
    return NextResponse.json({
      success: true,
      message: 'Tipos verificados y creados exitosamente',
      types: allTypes
    })
  } catch (error) {
    console.error('Error ensuring types:', error)
    return NextResponse.json(
      { 
        error: 'Error ensuring types',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
