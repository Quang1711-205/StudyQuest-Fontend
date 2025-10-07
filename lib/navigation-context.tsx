"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface NavigationContextType {
  isOpen: boolean
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openNav = () => setIsOpen(true)
  const closeNav = () => setIsOpen(false)
  const toggleNav = () => setIsOpen((prev) => !prev)

  return (
    <NavigationContext.Provider value={{ isOpen, openNav, closeNav, toggleNav }}>{children}</NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
