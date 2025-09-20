import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
  // Option 1: Create account with a new user
  const mercadoPago = await prisma.account.create({
    data: {
      type: "Mercado Pago",
      balance: 1500.75,
      user: {
        create: {
          // Add required user fields here
          name: "John Doe",
          email: "john@example.com",
          username: "johndoe",
          password: "securepassword123"
          // Add other required user fields based on your schema
        }
      }
    }
  })
  console.log('✅ Seed completado', mercadoPago)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })