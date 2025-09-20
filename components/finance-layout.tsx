"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ModernFinanceDashboard } from "./modern-finance-dashboard"
import { CardsSection } from "./cards-section"
import { HistorySection } from "./history-section"
import { ConfigurationSection } from "./configuration-section"

const MenuIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export function FinanceLayout() {
  const [activeSection, setActiveSection] = useState("resumen")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "resumen":
        return <ModernFinanceDashboard />
      case "tarjetas":
        return <CardsSection />
      case "historial":
        return <HistorySection />
      case "configuracion":
        return <ConfigurationSection />
      default:
        return <ModernFinanceDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
