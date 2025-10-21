// components/ui/dropdown-menu.tsx
"use client"

import * as React from "react"

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  align?: "start" | "center" | "end"
  className?: string
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

interface DropdownMenuLabelProps {
  children: React.ReactNode
  className?: string
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  return (
    <div ref={ref} onClick={() => setIsOpen(!isOpen)}>
      {children}
    </div>
  )
}

export function DropdownMenuContent({ children, align = "end", className = "" }: DropdownMenuContentProps) {
  const { isOpen } = React.useContext(DropdownMenuContext)

  if (!isOpen) return null

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }

  return (
    <div
      className={`absolute ${alignmentClasses[align]} mt-2 z-50 min-w-[12rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg animate-in fade-in-0 zoom-in-95 ${className}`}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

export function DropdownMenuItem({ children, onClick, disabled, className = "" }: DropdownMenuItemProps) {
  const { setIsOpen } = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
      setIsOpen(false)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors ${
        disabled
          ? "pointer-events-none opacity-50"
          : "hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function DropdownMenuLabel({ children, className = "" }: DropdownMenuLabelProps) {
  return (
    <div className={`px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </div>
  )
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
}