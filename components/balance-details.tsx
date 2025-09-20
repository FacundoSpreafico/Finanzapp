"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

interface Account {
  id: string
  name: string
  type: string
  balance: number
}

interface BalanceHistory {
  date: string
  balance: number
  account: string
}

export function BalanceDetails() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [balanceHistory, setBalanceHistory] = useState<BalanceHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [transferForm, setTransferForm] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
  })

  useEffect(() => {
    fetchAccounts()
    fetchBalanceHistory()
  }, [])

  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/accounts")
      if (response.ok) {
        const data = await response.json()
        setAccounts(data)
      }
    } catch (error) {
      console.error("Error fetching accounts:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBalanceHistory = async () => {
    try {
      const response = await fetch("/api/balance/history")
      if (response.ok) {
        const data = await response.json()
        setBalanceHistory(data)
      }
    } catch (error) {
      console.error("Error fetching balance history:", error)
    }
  }

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/balance/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromAccountId: transferForm.fromAccount,
          toAccountId: transferForm.toAccount,
          amount: Number.parseFloat(transferForm.amount),
        }),
      })

      if (response.ok) {
        setTransferForm({ fromAccount: "", toAccount: "", amount: "" })
        fetchAccounts()
        fetchBalanceHistory()
      }
    } catch (error) {
      console.error("Error transferring funds:", error)
    }
  }

  const pieData = accounts.map((account, index) => ({
    name: account.name,
    value: account.balance,
    color: ["#0891b2", "#f97316", "#16a34a"][index % 3],
  }))

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-foreground">{account.name}</CardTitle>
              <div className="text-sm text-muted-foreground">{account.type.replace("_", " ")}</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">${account.balance.toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Transfer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Distribución de Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Balance"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transfer Form */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Transferir Fondos</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fromAccount">Desde</Label>
                <Select
                  value={transferForm.fromAccount}
                  onValueChange={(value) => setTransferForm({ ...transferForm, fromAccount: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cuenta origen" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} (${account.balance.toLocaleString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="toAccount">Hacia</Label>
                <Select
                  value={transferForm.toAccount}
                  onValueChange={(value) => setTransferForm({ ...transferForm, toAccount: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cuenta destino" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts
                      .filter((account) => account.id !== transferForm.fromAccount)
                      .map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} (${account.balance.toLocaleString()})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Monto</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={transferForm.amount}
                  onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!transferForm.fromAccount || !transferForm.toAccount || !transferForm.amount}
              >
                Transferir Fondos
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Balance History */}
      {balanceHistory.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Historial de Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={balanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Balance"]} />
                <Line type="monotone" dataKey="balance" stroke="#0891b2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
