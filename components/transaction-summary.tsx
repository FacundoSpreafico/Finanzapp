import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TransactionSummaryProps {
  type: "income" | "expense"
}

export function TransactionSummary({ type }: TransactionSummaryProps) {
  const incomeData = {
    total: 737380,
    mercadoPago: 697380,
    efectivo: 40000,
  }

  const expenseData = {
    total: 711654.01,
    mercadoPago: 700279.01,
    efectivo: 11375,
  }

  const data = type === "income" ? incomeData : expenseData
  const title = type === "income" ? "TOTAL INGRESOS" : "TOTAL GASTOS"
  const titleColor = type === "income" ? "text-primary" : "text-destructive"

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className={`text-lg font-bold ${titleColor}`}>{title}</CardTitle>
        <div className="text-3xl font-bold text-foreground">${data.total.toLocaleString()}</div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="font-medium text-foreground">MERCADO PAGO</span>
          <span className="font-bold text-primary">${data.mercadoPago.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="font-medium text-foreground">EFECTIVO</span>
          <span className="font-bold text-secondary">${data.efectivo.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
