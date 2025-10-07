"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Home, Map, Dumbbell, Target, ShoppingBag, Trophy, User, LogOut, Moon, Sun, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/map", icon: Map, label: "Map" },
  { href: "/practice", icon: Dumbbell, label: "Practice" },
  { href: "/missions", icon: Target, label: "Missions" },
  { href: "/tests", icon: FileText, label: "Tests" },
  { href: "/shop", icon: ShoppingBag, label: "Shop" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/profile", icon: User, label: "Profile" },
]

interface NavigationProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Navigation({ isOpen = false, onClose }: NavigationProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleLinkClick = () => {
    if (onClose) onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

<nav
  className={cn(
    "fixed top-0 h-screen bg-card border-r border-border flex flex-col py-6 transition-all duration-300 z-50",
    "md:left-0 md:w-20 min-[1200px]:w-96 min-[1200px]:left-0", // ← Đã thêm min-[1200px]:left-0
    isOpen ? "left-0 w-64" : "-left-64 w-64 md:left-0",
  )}
>
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <Link href="/dashboard" className="mb-8 px-4 flex items-center gap-3" onClick={handleLinkClick}>
          <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg">
            SQ
          </div>
          <span
            className={cn(
              "font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-opacity duration-200 whitespace-nowrap",
              isOpen ? "block md:hidden min-[1200px]:block" : "hidden min-[1200px]:block",
            )}
          >
            StudyQuest
          </span>
        </Link>

        <div className="flex-1 flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 h-12 rounded-xl transition-all duration-200 shrink-0",
                  "px-3 md:px-3 min-[1200px]:px-4",
                  isOpen
                    ? "justify-start md:justify-center min-[1200px]:justify-start"
                    : "justify-center min-[1200px]:justify-start",
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md",
                )}
                title={item.label}
              >
                <Icon className="w-6 h-6 shrink-0" />
                <span
                  className={cn(
                    "font-medium transition-opacity duration-200 whitespace-nowrap",
                    isOpen ? "block md:hidden min-[1200px]:block" : "hidden min-[1200px]:block",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="px-3 pb-2 shrink-0 md:hidden">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-full h-12 rounded-xl hover:bg-muted justify-start px-4"
            title={theme === "light" ? "Dark Mode" : "Light Mode"}
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span className="font-medium ml-3">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </Button>
        </div>

        <div className="px-3 shrink-0">
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "w-full h-12 rounded-xl hover:bg-destructive/10 hover:text-destructive",
              isOpen
                ? "justify-start px-4 md:justify-center md:px-0 min-[1200px]:justify-start min-[1200px]:px-4"
                : "justify-center min-[1200px]:justify-start min-[1200px]:px-4",
            )}
            title="Logout"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span
              className={cn(
                "font-medium transition-opacity duration-200 whitespace-nowrap",
                isOpen
                  ? "block ml-3 md:hidden min-[1200px]:block min-[1200px]:ml-3"
                  : "hidden min-[1200px]:block min-[1200px]:ml-3",
              )}
            >
              Logout
            </span>
          </Button>
        </div>
      </nav>
    </>
  )
}
