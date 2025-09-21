"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

const Settings = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const User = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const Bell = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-5 5v-5zM10.07 2.82l3.93 3.93-3.93 3.93-3.93-3.93 3.93-3.93z"
    />
  </svg>
)

const Shield = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

export function ConfigurationSection() {
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Configuración
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Personaliza tu experiencia financiera</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Settings */}
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-blue-700 dark:text-blue-400">
                <User />
                Perfil de Usuario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" placeholder="Tu nombre" defaultValue="Usuario" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" defaultValue="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda predeterminada</Label>
                <Input id="currency" placeholder="ARS" defaultValue="ARS" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Guardar Cambios</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-green-700 dark:text-green-400">
                <Bell />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notificaciones push</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Recibe alertas sobre transacciones</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Respaldo automático</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Guarda tus datos automáticamente</p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Autenticación de dos factores</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Seguridad adicional para tu cuenta</p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-red-700 dark:text-red-400">
                <Shield />
                Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
              <Button variant="destructive" className="w-full">
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>

          {/* App Settings */}
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-purple-700 dark:text-purple-400">
                <Settings />
                Configuración de la App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="budget-limit">Límite de presupuesto mensual</Label>
                <Input id="budget-limit" type="number" placeholder="50000" defaultValue="50000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categories">Categorías personalizadas</Label>
                <Input id="categories" placeholder="Agregar nueva categoría" />
              </div>
              <div className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Exportar Datos
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Importar Datos
                </Button>
                <Button variant="destructive" className="w-full">
                  Eliminar Cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
