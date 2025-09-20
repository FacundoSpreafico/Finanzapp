"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ThemeSwitch } from "./theme-switch"

const ChevronDown = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronRight = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const BarChart = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const CreditCard = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
)

const Clock = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Settings = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const Folder = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
)

const Book = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13M3 6.253C4.168 5.477 5.754 5 7.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

const MenuIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

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