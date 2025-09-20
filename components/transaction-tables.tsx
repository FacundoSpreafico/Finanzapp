import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TransactionTables() {
  const incomeTransactions = [
    { date: "9/9", description: "Rendimientos MP", amount: 5, medio: "MERC PAGO" },
    { date: "9/9", description: "Trabajo MP", amount: 680000, medio: "MERC PAGO" },
    { date: "10/9", description: "Efectivo", amount: 40000, medio: "EFECTIVO" },
    { date: "10/9", description: "Marcela seom", amount: 10000, medio: "MERC PAGO" },
    { date: "12/9", description: "Catre", amount: 1000, medio: "MERC PAGO" },
  ]

  const expenseTransactions = [
    { date: "9/9", description: "Visa", amount: 35359, medio: "MERC PAGO", category: "TARJETA" },
    { date: "9/9", description: "Cabal", amount: 79000, medio: "MERC PAGO", category: "TARJETA" },
    { date: "9/9", description: "Monotributo", amount: 37085, medio: "MERC PAGO", category: "IMPUESTO" },
    { date: "9/9", description: "Monotributo", amount: 38585, medio: "MERC PAGO", category: "IMPUESTO" },
    { date: "9/9", description: "Segundo pago", amount: 70000, medio: "MERC PAGO", category: "CIUDADANIA" },
    { date: "9/9", description: "NAFTA", amount: 40000, medio: "MERC PAGO", category: "NAFTA" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Income Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-primary">INGRESOS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
              <span>Fecha</span>
              <span>Descripción</span>
              <span>Monto</span>
              <span>Medio</span>
            </div>
            {incomeTransactions.map((transaction, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-border/50">
                <span className="text-muted-foreground">{transaction.date}</span>
                <span className="text-foreground truncate">{transaction.description}</span>
                <span className="font-semibold text-primary">${transaction.amount.toLocaleString()}</span>
                <Badge variant="outline" className="text-xs">
                  {transaction.medio}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expense Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-destructive">GASTOS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
              <span>Fecha</span>
              <span>Categoría</span>
              <span>Descripción</span>
              <span>Monto</span>
              <span>Medio</span>
            </div>
            {expenseTransactions.map((transaction, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 text-sm py-2 border-b border-border/50">
                <span className="text-muted-foreground">{transaction.date}</span>
                <Badge variant="secondary" className="text-xs">
                  {transaction.category}
                </Badge>
                <span className="text-foreground truncate">{transaction.description}</span>
                <span className="font-semibold text-destructive">${transaction.amount.toLocaleString()}</span>
                <Badge variant="outline" className="text-xs">
                  {transaction.medio}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
