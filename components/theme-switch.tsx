"use client"

import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const Sun = ({ isActive }: { isActive: boolean }) => (
  <svg 
    className={`h-4 w-4 transition-all duration-300 ${
      isActive 
        ? 'text-yellow-500 scale-110 rotate-45' 
        : 'text-slate-400 scale-95 rotate-0'
    }`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const Moon = ({ isActive }: { isActive: boolean }) => (
  <svg 
    className={`h-4 w-4 transition-all duration-300 ${
      isActive 
        ? 'text-blue-400 scale-110 -rotate-12' 
        : 'text-slate-400 scale-95 rotate-0'
    }`} 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export function ThemeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!theme || theme === "system") {
      setTheme("light")
    }
  }, [theme, setTheme])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Switch personalizado con íconos internos */}
      <div 
        onClick={() => handleThemeChange(!isDark)}
        className={`relative w-14 h-7 rounded-full cursor-pointer transition-all duration-300 ${
          isDark 
            ? 'bg-slate-600' 
            : 'bg-yellow-400'
        }`}
      >
        {/* Botón deslizable con ícono */}
        <div 
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
            isDark 
              ? 'translate-x-8' 
              : 'translate-x-1'
          }`}
        >
          {isDark ? (
            <svg className="h-3 w-3 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg className="h-3 w-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
