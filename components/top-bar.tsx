// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useTheme } from "@/lib/theme-context"
// import { Flame, Zap, Moon, Sun, Menu } from "lucide-react"
// import { Progress } from "@/components/ui/progress"
// import { Button } from "@/components/ui/button"

// interface TopBarProps {
//   onMenuClick?: () => void
// }

// export function TopBar({ onMenuClick }: TopBarProps) {
//   const { user } = useAuth()
//   const { theme, toggleTheme } = useTheme()

//   if (!user) return null

//   const xpToNextLevel = 2000
//   const xpProgress = (user.xp / xpToNextLevel) * 100

//   return (
//     <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-16 bg-card/95 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 lg:px-6 z-30 transition-all duration-300 shadow-sm">
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={onMenuClick}
//         className="md:hidden rounded-full hover:bg-accent transition-colors"
//         aria-label="Open menu"
//       >
//         <Menu className="w-6 h-6" />
//       </Button>

//       <div className="flex items-center gap-4">
//         <img
//           src={user.avatar || "/placeholder.svg"}
//           alt={user.username}
//           className="w-10 h-10 rounded-full border-2 border-primary shadow-lg ring-2 ring-primary/20"
//         />
//         <div className="hidden sm:block">
//           <div className="font-bold text-foreground">{user.username}</div>
//           <div className="text-xs text-muted-foreground">Level {user.level}</div>
//         </div>
//       </div>

//       <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden min-[768px]:block">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-xs text-muted-foreground">XP Progress</span>
//           <span className="text-xs font-bold text-primary">
//             {user.xp} / {xpToNextLevel}
//           </span>
//         </div>
//         <Progress value={xpProgress} className="h-2.5 bg-secondary" />
//       </div>

//       <div className="flex items-center gap-2 lg:gap-4">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={toggleTheme}
//           className="rounded-full hover:bg-accent transition-colors hidden min-[768px]:flex"
//           aria-label="Toggle theme"
//         >
//           {theme === "dark" ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
//         </Button>

//         <div className="flex items-center gap-2 px-2 lg:px-3 py-1.5 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full border border-orange-500/20">
//           <Flame className="w-4 lg:w-5 h-4 lg:h-5 text-orange-500" />
//           <div className="hidden sm:block">
//             <div className="text-xs text-muted-foreground">Streak</div>
//             <div className="text-sm font-bold text-orange-500">{user.streak} days</div>
//           </div>
//           <div className="sm:hidden text-sm font-bold text-orange-500">{user.streak}</div>
//         </div>

//         {user.isPro && (
//           <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 rounded-full shadow-lg">
//             <Zap className="w-4 h-4 text-white" />
//             <span className="text-xs font-bold text-white">PRO</span>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


"use client"

import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { Flame, Zap, Moon, Sun, Menu } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface TopBarProps {
  onMenuClick?: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  if (!user) return null

  const xpToNextLevel = 2000
  const xpProgress = (user.xp / xpToNextLevel) * 100

  return (
    <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-16 bg-card/95 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 lg:px-6 z-30 transition-all duration-300 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="md:hidden rounded-full hover:bg-accent transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      <div className="flex items-center gap-4">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.username}
          className="w-10 h-10 rounded-full border-2 border-sky-400 shadow-lg ring-2 ring-sky-400/20"
        />
        <div className="hidden sm:block">
          <div className="font-bold text-foreground">{user.username}</div>
          <div className="text-xs text-muted-foreground">Level {user.level}</div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden min-[768px]:block">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">XP Progress</span>
          <span className="text-xs font-bold text-sky-500">
            {user.xp} / {xpToNextLevel}
          </span>
        </div>
        <Progress value={xpProgress} className="h-2.5 bg-secondary" />
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full hover:bg-accent transition-colors hidden min-[768px]:flex"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </Button>

        <div className="flex items-center gap-2 px-2 lg:px-3 py-1.5 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full border border-orange-500/20">
          <Flame className="w-4 lg:w-5 h-4 lg:h-5 text-orange-500" />
          <div className="hidden sm:block">
            <div className="text-xs text-muted-foreground">Streak</div>
            <div className="text-sm font-bold text-orange-500">{user.streak} days</div>
          </div>
          <div className="sm:hidden text-sm font-bold text-orange-500">{user.streak}</div>
        </div>

        {user.isPro && (
          <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 px-3 py-1.5 rounded-full shadow-lg">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">PRO</span>
          </div>
        )}
      </div>
    </div>
  )
}