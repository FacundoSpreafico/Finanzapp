import { prisma } from "../lib/prisma"

async function createDefaultUser() {
  try {
    // Verificar si ya existe un usuario por defecto
    const existingUser = await prisma.user.findUnique({
      where: { email: "demo@finanzapp.com" }
    })

    if (existingUser) {
      console.log("Usuario por defecto ya existe:", existingUser.email)
      return existingUser
    }

    // Crear usuario por defecto
    const defaultUser = await prisma.user.create({
      data: {
        username: "demo",
        email: "demo@finanzapp.com",
        password: "demo123", // En producción esto debería ser hasheado
        name: "Usuario Demo"
      }
    })

    console.log("Usuario por defecto creado:", defaultUser.email)
    return defaultUser
  } catch (error) {
    console.error("Error creando usuario por defecto:", error)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createDefaultUser()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { createDefaultUser }