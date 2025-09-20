import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data basado en tu ejemplo
const mockData = {
  balance: {
    mercadoPago: 3648,
    efectivo: 0,
    ahorro: 3648,
    saldoRestante: 749,
    totalPlata: 28625,
    totalBalance: 29374,
  },
  ingresos: {
    total: 737380,
    mercadoPago: 697380,
    efectivo: 40000,
    items: [
      { fecha: "15/9", descripcion: "Rendimientos MP", monto: 5, medio: "MERC PAGO" },
      { fecha: "14/9", descripcion: "Trabajo MP", monto: 680000, medio: "MERC PAGO" },
      { fecha: "13/9", descripcion: "Efectivo", monto: 40000, medio: "EFECTIVO" },
      { fecha: "12/9", descripcion: "Marcela seom", monto: 10000, medio: "MERC PAGO" },
      { fecha: "11/9", descripcion: "Catre", monto: 1000, medio: "MERC PAGO" },
    ],
  },
  gastos: {
    total: 711654,
    mercadoPago: 700279,
    efectivo: 11375,
    items: [
      { fecha: "16/9", descripcion: "SEOM", monto: 3000, categoria: "SEOM", medio: "MERC PAGO" },
      { fecha: "15/9", descripcion: "Coca", monto: 5000, categoria: "COMPRAS", medio: "EFECTIVO" },
      { fecha: "14/9", descripcion: "peaje", monto: 6375, categoria: "SALIDAS", medio: "MERC PAGO" },
      { fecha: "13/9", descripcion: "Ahorro", monto: 200000, categoria: "AHORRO", medio: "MERC PAGO" },
      { fecha: "13/9", descripcion: "Nafta viaje", monto: 27875, categoria: "NAFTA", medio: "MERC PAGO" },
    ],
  },
  categorias: {
    NAFTA: 40000,
    SALIDAS: 148795,
    COMIDAS: 21230,
    SEOM: 9000,
    COMPRAS: 32600,
    SALUD: 0,
    "ACTIV FISICA": 0,
    CASA: 0,
    TARJETA: 114359,
    IMPUESTO: 75670,
    CIUDADANIA: 70000,
    AHORRO: 200000,
  },
}

export function FinanceDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Saldo Inicial</h1>
        <div className="text-4xl font-bold text-blue-600 mb-4">SALDO RESTANTE</div>
        <div className="flex justify-center items-center gap-8 text-sm">
          <div>MERCADO PAGO EFECTIVO</div>
          <div>TOTAL PLATA</div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-600">BALANCE</div>
            <div className="text-lg font-bold text-blue-600">MP ${mockData.balance.mercadoPago.toLocaleString()}</div>
            <div className="text-sm">Efect ${mockData.balance.efectivo.toLocaleString()}</div>
            <div className="text-sm">Ahorro ${mockData.balance.ahorro.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">${mockData.balance.saldoRestante}</div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">${mockData.balance.totalPlata.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">${mockData.balance.totalBalance.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Income and Expenses Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Ingresos */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">TOTAL INGRESOS</CardTitle>
            <div className="text-2xl font-bold text-green-600">${mockData.ingresos.total.toLocaleString()}</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>MERCADO PAGO</span>
                <span className="font-semibold">${mockData.ingresos.mercadoPago.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>EFECTIVO</span>
                <span className="font-semibold">${mockData.ingresos.efectivo.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gastos */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">TOTAL GASTOS</CardTitle>
            <div className="text-2xl font-bold text-red-600">${mockData.gastos.total.toLocaleString()}</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>MERCADO PAGO</span>
                <span className="font-semibold">${mockData.gastos.mercadoPago.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>EFECTIVO</span>
                <span className="font-semibold">${mockData.gastos.efectivo.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ingresos Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">INGRESOS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-gray-600 border-b pb-2">
                <span>Fecha</span>
                <span>Descripción</span>
                <span>Monto</span>
                <span>Medio</span>
              </div>
              {mockData.ingresos.items.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 text-xs py-1">
                  <span>{item.fecha}</span>
                  <span className="truncate">{item.descripcion}</span>
                  <span className="font-semibold">${item.monto.toLocaleString()}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.medio}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gastos Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">GASTOS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-1 text-xs font-semibold text-gray-600 border-b pb-2">
                <span>Fecha</span>
                <span>Categoría</span>
                <span>Descripción</span>
                <span>Monto</span>
                <span>Medio</span>
              </div>
              {mockData.gastos.items.map((item, index) => (
                <div key={index} className="grid grid-cols-5 gap-1 text-xs py-1">
                  <span>{item.fecha}</span>
                  <Badge variant="secondary" className="text-xs">
                    {item.categoria}
                  </Badge>
                  <span className="truncate">{item.descripcion}</span>
                  <span className="font-semibold">${item.monto.toLocaleString()}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.medio}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories Summary */}
        <Card>
          <CardHeader>
            <CardTitle>TOTAL POR CATEGORIA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(mockData.categorias).map(([categoria, monto]) => (
                <div key={categoria} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{categoria}</span>
                  <span className="font-semibold">${monto.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
