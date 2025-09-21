export interface AccountBalance {
  id: string
  type: string
  balance: number
  ingresos: number
  gastos: number
}

export interface BalanceData {
  saldoTotal: number
  totalIngresos: number
  totalGastos: number
}

export interface TransaccionReciente {
  id: string
  fecha: string
  descripcion: string
  monto: number
  medio: string
  tipo?: string
  categoria?: string
}

export interface TransaccionesRecientes {
  ingresos: TransaccionReciente[]
  gastos: TransaccionReciente[]
}

export interface CategoriaResumen {
  id: string
  nombre: string
  monto: number
  color: string
  textColor: string
  tipo: string
}

export interface DashboardSummaryResponse {
  accounts: AccountBalance[]
  balanceData: BalanceData
  balanceCards: AccountBalance[]
  transaccionesRecientes: TransaccionesRecientes
  categorias: CategoriaResumen[]
}