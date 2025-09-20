import { prisma } from '@/lib/prisma'

export async function GET() {
  const accounts = await prisma.account.findMany()
  return Response.json(accounts)
}