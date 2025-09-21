import { prisma } from "../lib/prisma"
import { getDefaultUserId } from "../lib/default-user"

async function cleanDuplicateAccounts() {
  try {
    const userId = await getDefaultUserId()
    
    // Buscar cuentas duplicadas
    const accounts = await prisma.account.findMany({
      where: { userId },
      include: {
        transactions: true
      }
    })

    console.log("Cuentas encontradas:")
    accounts.forEach(acc => {
      console.log(`${acc.type}: Balance $${acc.balance}, Transacciones: ${acc.transactions.length}`)
    })

    // Eliminar cuenta duplicada "MERCADO PAGO" (sin underscore) si existe y migrar transacciones
    const oldMercadoAccount = accounts.find(acc => acc.type === "MERCADO PAGO")
    const newMercadoAccount = accounts.find(acc => acc.type === "MERCADO_PAGO")

    if (oldMercadoAccount && newMercadoAccount && oldMercadoAccount.id !== newMercadoAccount.id) {
      console.log("\nMigrando transacciones de cuenta duplicada...")
      
      // Mover transacciones de la cuenta vieja a la nueva
      await prisma.transaction.updateMany({
        where: { accountId: oldMercadoAccount.id },
        data: { accountId: newMercadoAccount.id }
      })

      // Actualizar balance de la cuenta nueva
      await prisma.account.update({
        where: { id: newMercadoAccount.id },
        data: {
          balance: oldMercadoAccount.balance + newMercadoAccount.balance
        }
      })

      // Eliminar cuenta duplicada
      await prisma.account.delete({
        where: { id: oldMercadoAccount.id }
      })

      console.log("✅ Cuenta duplicada eliminada y transacciones migradas")
    }

    // Mostrar estado final
    const finalAccounts = await prisma.account.findMany({
      where: { userId },
      include: {
        transactions: true
      }
    })

    console.log("\nCuentas después de limpieza:")
    finalAccounts.forEach(acc => {
      console.log(`${acc.type}: Balance $${acc.balance}, Transacciones: ${acc.transactions.length}`)
    })

  } catch (error) {
    console.error("Error limpiando cuentas duplicadas:", error)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  cleanDuplicateAccounts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { cleanDuplicateAccounts }