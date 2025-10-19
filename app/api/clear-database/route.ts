import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    console.log('🗑️  Iniciando limpieza de la base de datos...')

    // Eliminar en orden correcto (respetando las relaciones)
    const deletedTransactions = await prisma.transaction.deleteMany({})
    const deletedAccounts = await prisma.account.deleteMany({})
    const deletedCategories = await prisma.category.deleteMany({})
    const deletedTypes = await prisma.type.deleteMany({})
    const deletedUsers = await prisma.user.deleteMany({})

    const summary = {
      transacciones: deletedTransactions.count,
      cuentas: deletedAccounts.count,
      categorias: deletedCategories.count,
      tipos: deletedTypes.count,
      usuarios: deletedUsers.count,
      total: deletedTransactions.count + deletedAccounts.count + deletedCategories.count + deletedTypes.count + deletedUsers.count
    }

    console.log('✨ ¡Base de datos completamente limpia!', summary)

    return NextResponse.json({
      success: true,
      message: "Base de datos limpiada exitosamente",
      summary
    })

  } catch (error) {
    console.error('❌ Error al limpiar la base de datos:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Error al limpiar la base de datos",
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    )
  }
}

// También permitir GET para facilitar el uso desde navegador
export async function GET() {
  return NextResponse.json({
    message: "Para limpiar la base de datos, haz una petición POST a este endpoint",
    warning: "⚠️ ESTO ELIMINARÁ TODOS LOS DATOS DE LA BASE DE DATOS ⚠️",
    usage: "POST /api/clear-database"
  })
}