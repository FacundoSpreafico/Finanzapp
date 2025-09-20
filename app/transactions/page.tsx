import { TransactionManager } from "@/components/transaction-manager"

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Gestión de Transacciones</h1>
        </div>
        <TransactionManager />
      </div>
    </main>
  )
}
