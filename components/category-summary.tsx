import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CategorySummary() {
  const categoryTotals = [
    { name: "NAFTA", amount: 40000, color: "bg-orange-500" },
    { name: "SALIDAS", amount: 148795, color: "bg-red-500" },
    { name: "COMIDAS", amount: 21230, color: "bg-green-500" },
    { name: "SEOM", amount: 9000, color: "bg-purple-500" },
    { name: "COMPRAS", amount: 32600, color: "bg-blue-500" },
    { name: "SALUD", amount: 0, color: "bg-cyan-500" },
    { name: "ACTIV FISICA", amount: 0, color: "bg-lime-500" },
    { name: "CASA", amount: 0, color: "bg-amber-500" },
    { name: "TARJETA", amount: 114359, color: "bg-red-400" },
    { name: "IMPUESTO", amount: 75670, color: "bg-gray-500" },
    { name: "CIUDADANIA", amount: 70000, color: "bg-teal-500" },
    { name: "AHORRO", amount: 200000, color: "bg-green-600" },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-foreground">TOTAL POR CATEGORIA</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categoryTotals.map((category, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="font-medium text-foreground">{category.name}</span>
              </div>
              <span className="font-bold text-foreground">${category.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
