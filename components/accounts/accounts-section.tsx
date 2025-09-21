"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2, Edit, Plus, Wallet, DollarSign } from "lucide-react"

interface Account {
  id: string
  type: string
  balance: number
  createdAt: string
  updatedAt: string
}

interface AccountFormData {
  type: string
  balance: number
}

const ACCOUNT_TYPES = [
  "Mercado Pago",
  "Efectivo", 
  "Ahorro",
  "Cuenta Corriente",
  "Cuenta USD", 
  "Tarjeta de Crédito",
  "Inversiones",
  "Otro"
]

export function AccountsSection() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [formData, setFormData] = useState<AccountFormData>({
    type: "",
    balance: 0
  })

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/accounts')
      if (!response.ok) {
        throw new Error('Error al cargar cuentas')
      }
      
      const data = await response.json()
      setAccounts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingAccount ? `/api/accounts/${editingAccount.id}` : '/api/accounts'
      const method = editingAccount ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al guardar cuenta')
      }

      handleDialogClose()
      fetchAccounts()

    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al guardar')
    }
  }

  // Handle delete
  const handleDelete = async (accountId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) return

    try {
      const response = await fetch(`/api/accounts/${accountId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Error al eliminar cuenta')
      }

      fetchAccounts()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar')
    }
  }

  // Handle edit
  const handleEdit = (account: Account) => {
    setEditingAccount(account)
    setFormData({
      type: account.type,
      balance: account.balance
    })
    setIsCreateDialogOpen(true)
  }

  // Reset form when dialog closes
  const handleDialogClose = () => {
    setIsCreateDialogOpen(false)
    setEditingAccount(null)
    setFormData({ type: "", balance: 0 })
  }

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Cargando cuentas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <Button onClick={fetchAccounts} className="mt-4">Reintentar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Mis cuentas
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Gestiona tus cuentas bancarias</p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
              if (open) {
                setIsCreateDialogOpen(true)
              } else {
                handleDialogClose()
              }
            }}>
              <DialogTrigger asChild>
                <Button 
                  className="w-fit bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-gray-100 hover:shadow-xl"
                >
                  <Plus />
                  Nueva cuenta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingAccount ? 'Editar Cuenta' : 'Crear Nueva Cuenta'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="type">Tipo de Cuenta</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de cuenta" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACCOUNT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="balance">Saldo Inicial</Label>
                    <Input
                      id="balance"
                      type="number"
                      step="0.01"
                      value={formData.balance}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        balance: parseFloat(e.target.value) || 0 
                      }))}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleDialogClose}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingAccount ? 'Actualizar' : 'Crear'} Cuenta
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="border-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Balance Total</CardTitle>
            <Wallet />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalBalance.toLocaleString('es-AR')}</div>
            <p className="text-xs opacity-90">{accounts.length} cuenta{accounts.length !== 1 ? 's' : ''} registrada{accounts.length !== 1 ? 's' : ''}</p>
          </CardContent>
        </Card>

        {/* Accounts Grid */}
        {accounts.length === 0 ? (
          <Card className="border-dashed border-2 border-slate-300 dark:border-slate-700">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Wallet className="h-16 w-16 text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                No tienes cuentas registradas
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Crea tu primera cuenta para comenzar a gestionar tus finanzas
              </p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Cuenta
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account, index) => {
              const isPositive = account.balance >= 0
              const colorClass = isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              
              // Asignar colores diferentes a cada cuenta
              const cardColors = [
                "from-blue-500 to-blue-600",
                "from-purple-500 to-purple-600", 
                "from-green-500 to-green-600",
                "from-orange-500 to-orange-600",
                "from-pink-500 to-pink-600",
                "from-indigo-500 to-indigo-600"
              ]
              const cardColor = cardColors[index % cardColors.length]
              
              return (
                <Card key={account.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className={`bg-gradient-to-br ${cardColor} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        Cuenta
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(account)}
                          className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(account.id)}
                          className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{account.type}</h3>
                      <p className="text-sm opacity-90">Cuenta bancaria</p>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-white dark:bg-slate-800">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Saldo Actual</span>
                        <span className={`text-xl font-bold ${colorClass}`}>
                          ${account.balance.toLocaleString('es-AR')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Creada</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {new Date(account.createdAt).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Actualizada</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {new Date(account.updatedAt).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}