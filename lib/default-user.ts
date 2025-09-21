import { prisma } from "./prisma"

let defaultUserId: string | null = null

export async function getDefaultUser() {
  if (defaultUserId) {
    return { id: defaultUserId }
  }

  try {
    // Intentar encontrar el usuario por defecto
    let user = await prisma.user.findFirst({
      where: { email: "demo@finanzapp.com" }
    })

    // Si no existe, crearlo
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: "demo",
          email: "demo@finanzapp.com",
          password: "demo123", // En producción esto debería ser hasheado
          name: "Usuario Demo"
        }
      })
      console.log("Usuario por defecto creado:", user.email)
    }

    defaultUserId = user.id
    return user
  } catch (error) {
    console.error("Error obteniendo usuario por defecto:", error)
    throw new Error("No se pudo obtener el usuario por defecto")
  }
}

export async function getDefaultUserId(): Promise<string> {
  try {
    // Primero intentar encontrar cualquier usuario que tenga datos
    const userWithTransactions = await prisma.user.findFirst({
      include: {
        _count: {
          select: {
            transactions: true
          }
        }
      },
      where: {
        transactions: {
          some: {}
        }
      }
    })

    if (userWithTransactions) {
      return userWithTransactions.id
    }

    // Si no hay usuarios con transacciones, usar el usuario demo por defecto
    const user = await getDefaultUser()
    return user.id
  } catch (error) {
    console.error("Error obteniendo usuario por defecto:", error)
    throw new Error("No se pudo obtener el usuario por defecto")
  }
}