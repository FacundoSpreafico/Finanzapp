"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ThemeSwitch } from "./theme-switch"
import { CreditCard, Clock, MenuIcon, BarChart, Settings, ChartBarStacked, Wallet } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ activeSection, onSectionChange, collapsed = false, onToggleCollapse }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["platform"])
  const [isHovered, setIsHovered] = useState(false)
  const [collapseTimer, setCollapseTimer] = useState<NodeJS.Timeout | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    // Limpiar cualquier timer de colapso pendiente
    if (collapseTimer) {
      clearTimeout(collapseTimer)
      setCollapseTimer(null)
    }
  }

  const handleMouseLeave = () => {
    // Solo configurar timer para quitar hover si está en modo colapsado
    if (collapsed) {
      const timer = setTimeout(() => {
        setIsHovered(false)
        setCollapseTimer(null)
      }, 150)
      setCollapseTimer(timer)
    } else {
      setIsHovered(false)
    }
  }

  // Limpiar timer al desmontar el componente
  useEffect(() => {
    return () => {
      if (collapseTimer) {
        clearTimeout(collapseTimer)
      }
    }
  }, [collapseTimer])

  // Determinar si mostrar expandido
  const showExpanded = !collapsed || isHovered

  return (
    <div 
      className={`flex flex-col h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ${
        showExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className={`flex items-center border-b border-slate-200 dark:border-slate-700 p-4 ${
        showExpanded ? 'justify-between' : 'justify-center'
      }`}>
        {showExpanded && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900 dark:text-white">Finanzapp</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">;)</div>
            </div>
          </div>
        )}
        {!showExpanded && (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
        )}
        {showExpanded && (
          <button 
            onClick={onToggleCollapse} 
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
            title="Pin/Unpin sidebar"
          >
            <MenuIcon />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {showExpanded ? (
          <>
            {/* Platform Section */}
            <div>
           
              <div className="space-y-1">
                {/* Resumen */}
                <button
                  onClick={() => onSectionChange("resumen")}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
                    activeSection === "resumen"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <BarChart />
                  <span>Resumen</span>
                </button>
                
                 {/* Categorias */}
                <button
                  onClick={() => onSectionChange("categorias")}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
                    activeSection === "categorias"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <ChartBarStacked />
                  <span>Categorias</span>
                </button>

                {/* Cuentas */}
                <button
                  onClick={() => onSectionChange("cuentas")}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
                    activeSection === "cuentas"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <Wallet />
                  <span>Cuentas</span>
                </button>

                {/* Tarjetas */}
                <button
                  onClick={() => onSectionChange("tarjetas")}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
                    activeSection === "tarjetas"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <CreditCard />
                  <span>Tarjetas</span>
                </button>

                <button
                  onClick={() => onSectionChange("historial")}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
                    activeSection === "historial"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <Clock />
                  <span>Historial</span>
                </button>

                <button
                  onClick={() => onSectionChange("configuracion")}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
                    activeSection === "configuracion"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <Settings />
                  <span>Configuración</span>
                </button>
              </div>
            </div>

    

          
          </>
        ) : (
          // Versión colapsada usando los mismos íconos (mismo tamaño visual)
          <div className="space-y-1">
            <button
              onClick={() => onSectionChange("resumen")}
              className={cn(
                "flex items-center justify-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                activeSection === "resumen"
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
              title="Resumen"
            >
              <BarChart />
            </button>

            <button
              onClick={() => onSectionChange("categorias")}
              className={cn(
                "flex items-center justify-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                activeSection === "categorias"
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
              title="Categorias"
            >
              <ChartBarStacked />
            </button>
            <button
              onClick={() => onSectionChange("tarjetas")}
              className={cn(
                "flex items-center justify-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                activeSection === "tarjetas"
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
              title="Tarjetas"
            >
              <CreditCard />
            </button>

            <button
              onClick={() => onSectionChange("historial")}
              className={cn(
                "flex items-center justify-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                activeSection === "historial"
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
              title="Historial"
            >
              <Clock />
            </button>

            <button
              onClick={() => onSectionChange("configuracion")}
              className={cn(
                "flex items-center justify-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                activeSection === "configuracion"
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
              title="Configuración"
            >
              <Settings />
            </button>
          </div>
        )}
      </nav>

      <div className="mt-auto">
        {/* Theme Switch */}
        <div className={`border-t border-slate-200 dark:border-slate-700 ${showExpanded ? 'p-4' : 'px-3 py-3'}`}>
          {showExpanded ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700 dark:text-slate-300">Tema</span>
              <ThemeSwitch />
            </div>
          ) : (
            <div className="flex justify-center">
              <ThemeSwitch />
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className={`border-t border-slate-200 dark:border-slate-700 ${showExpanded ? 'p-4' : 'px-3 py-3'}`}>
          {showExpanded ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-white truncate">fspreafico</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">fspreafico@gmail.com</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">U</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}