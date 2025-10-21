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
//           className="w-10 h-10 rounded-full border-2 border-sky-400 shadow-lg ring-2 ring-sky-400/20"
//         />
//         <div className="hidden sm:block">
//           <div className="font-bold text-foreground">{user.username}</div>
//           <div className="text-xs text-muted-foreground">Level {user.level}</div>
//         </div>
//       </div>

//       <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden min-[768px]:block">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-xs text-muted-foreground">XP Progress</span>
//           <span className="text-xs font-bold text-sky-500">
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
//           {theme === "dark" ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
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
//           <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 px-3 py-1.5 rounded-full shadow-lg">
//             <Zap className="w-4 h-4 text-white" />
//             <span className="text-xs font-bold text-white">PRO</span>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// Được chọn

// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useTheme } from "@/lib/theme-context"
// import { Flame, Zap, Moon, Sun, Menu, Languages, Check } from "lucide-react"
// import { Progress } from "@/components/ui/progress"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { UserLanguage, AVAILABLE_LANGUAGES } from "@/lib/language-utils"
// import { mockSwitchLanguage } from "@/lib/mock-api"
// import { useState } from "react"
// import { useRouter } from "next/navigation"

// interface TopBarProps {
//   onMenuClick?: () => void
//   activeLanguage?: UserLanguage | null
//   allLanguages?: UserLanguage[]
// }

// export function TopBar({ onMenuClick, activeLanguage, allLanguages = [] }: TopBarProps) {
//   const { user } = useAuth()
//   const { theme, toggleTheme } = useTheme()
//   const router = useRouter()
//   const [isSwitching, setIsSwitching] = useState(false)

//   if (!user) return null

//   const xpToNextLevel = 2000
//   const currentXp = activeLanguage?.progress?.xp || user.xp
//   const xpProgress = (currentXp / xpToNextLevel) * 100
//   const currentLevel = activeLanguage?.progress?.level || user.level

//   const handleSwitchLanguage = async (languageCode: string) => {
//     if (!user || isSwitching) return
    
//     setIsSwitching(true)
//     try {
//       await mockSwitchLanguage(parseInt(user.id), languageCode)
      
//       // Update user in localStorage
//       const storedUser = localStorage.getItem("user")
//       if (storedUser) {
//         const userData = JSON.parse(storedUser)
//         userData.activeLanguage = languageCode
//         localStorage.setItem("user", JSON.stringify(userData))
//       }
      
//       // Reload page to update all components
//       window.location.reload()
//     } catch (error) {
//       console.error("Error switching language:", error)
//       alert("Không thể chuyển đổi ngôn ngữ. Vui lòng thử lại!")
//     } finally {
//       setIsSwitching(false)
//     }
//   }

//   const handleAddNewLanguage = () => {
//     router.push("/selectLanguage")
//   }

//   const activeLangInfo = activeLanguage 
//     ? AVAILABLE_LANGUAGES.find(l => l.code === activeLanguage.code)
//     : null

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
//           className="w-10 h-10 rounded-full border-2 border-sky-400 shadow-lg ring-2 ring-sky-400/20"
//         />
//         <div className="hidden sm:block">
//           <div className="font-bold text-foreground">{user.username}</div>
//           <div className="text-xs text-muted-foreground">Level {currentLevel}</div>
//         </div>
//       </div>

//       <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden min-[768px]:block">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-xs text-muted-foreground">XP Progress</span>
//           <span className="text-xs font-bold text-sky-500">
//             {currentXp} / {xpToNextLevel}
//           </span>
//         </div>
//         <Progress value={xpProgress} className="h-2.5 bg-secondary" />
//       </div>

//       <div className="flex items-center gap-2 lg:gap-4">
//         {/* Language Switcher - Only show if activeLanguage exists */}
//         {activeLanguage && activeLangInfo && (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="flex items-center gap-2 px-3 py-2 h-auto rounded-full hover:bg-accent transition-colors"
//                 disabled={isSwitching}
//               >
//                 <span className="text-2xl">{activeLangInfo.flag}</span>
//                 <div className="hidden lg:block text-left">
//                   <div className="text-xs text-muted-foreground">Learning</div>
//                   <div className="text-sm font-semibold">{activeLangInfo.name}</div>
//                 </div>
//                 <Languages className="w-4 h-4 text-muted-foreground" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-64">
//               <DropdownMenuLabel className="flex items-center gap-2">
//                 <Languages className="w-4 h-4" />
//                 Chuyển đổi ngôn ngữ
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
              
//               {allLanguages.length > 0 ? (
//                 <>
//                   {allLanguages.map((lang) => {
//                     const langInfo = AVAILABLE_LANGUAGES.find(l => l.code === lang.code)
//                     return (
//                       <DropdownMenuItem
//                         key={lang.code}
//                         onClick={() => handleSwitchLanguage(lang.code)}
//                         disabled={lang.isActive || isSwitching}
//                         className="flex items-center justify-between cursor-pointer"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-2xl">{langInfo?.flag}</span>
//                           <div>
//                             <div className="font-semibold">{langInfo?.name}</div>
//                             <div className="text-xs text-muted-foreground">
//                               Level {lang.progress?.level || 1} • {lang.progress?.xp || 0} XP
//                             </div>
//                           </div>
//                         </div>
//                         {lang.isActive && (
//                           <Check className="w-4 h-4 text-green-500" />
//                         )}
//                       </DropdownMenuItem>
//                     )
//                   })}
//                   <DropdownMenuSeparator />
//                 </>
//               ) : null}
              
//               <DropdownMenuItem
//                 onClick={handleAddNewLanguage}
//                 className="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold"
//               >
//                 <span className="mr-2">➕</span>
//                 Thêm ngôn ngữ mới
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         )}

//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={toggleTheme}
//           className="rounded-full hover:bg-accent transition-colors hidden min-[768px]:flex"
//           aria-label="Toggle theme"
//         >
//           {theme === "dark" ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
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
//           <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 px-3 py-1.5 rounded-full shadow-lg">
//             <Zap className="w-4 h-4 text-white" />
//             <span className="text-xs font-bold text-white">PRO</span>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useTheme } from "@/lib/theme-context"
// import { Flame, Moon, Sun, Menu, Languages, Check, Coins } from "lucide-react"
// import { Progress } from "@/components/ui/progress"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"

// const API_BASE_URL = "http://localhost:3000/api"

// interface ActiveLanguage {
//   id: number
//   code: string
//   name: string
//   level: number
//   totalXp: number
//   currentXp: number
//   xpToNextLevel: number
//   currentStreak: number
//   longestStreak: number
// }

// interface UserProfile {
//   id: number
//   username: string
//   email: string
//   coins: number
//   gems: number
//   activeLanguage: ActiveLanguage
//   avatar: {
//     id: number
//     name: string
//     iconUrl: string
//     rarity: string
//   } | null
// }

// interface Language {
//   id: number
//   code: string
//   name: string
//   nativeName: string
//   flagEmoji: string
//   iconUrl: string | null
//   isActive: boolean
// }

// interface TopBarProps {
//   onMenuClick?: () => void
// }

// export function TopBar({ onMenuClick }: TopBarProps) {
//   const { user, logout } = useAuth()
//   const { theme, toggleTheme } = useTheme()
//   const router = useRouter()
  
//   const [profile, setProfile] = useState<UserProfile | null>(null)
//   const [allLanguages, setAllLanguages] = useState<Language[]>([])
//   const [isSwitching, setIsSwitching] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   // Get access token
//   const getAccessToken = () => {
//     return localStorage.getItem('accessToken') || localStorage.getItem('access_token')
//   }

//   // Fetch user profile
//   const fetchProfile = async () => {
//     try {
//       const token = getAccessToken()
//       if (!token) {
//         router.push('/login')
//         return
//       }

//       const response = await fetch(`${API_BASE_URL}/users/profile`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       })

//       if (!response.ok) {
//         if (response.status === 401) {
//           logout()
//           router.push('/login')
//           return
//         }
//         throw new Error('Failed to fetch profile')
//       }

//       const data = await response.json()
//       setProfile(data)
//     } catch (err) {
//       console.error('Error fetching profile:', err)
//     }
//   }

//   // Fetch all available languages
//   const fetchLanguages = async () => {
//     try {
//       const token = getAccessToken()
//       if (!token) return

//       const response = await fetch(`${API_BASE_URL}/languages`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setAllLanguages(data)
//       }
//     } catch (err) {
//       console.error('Error fetching languages:', err)
//     }
//   }

//   // Load data on mount
//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true)
//       await Promise.all([
//         fetchProfile(),
//         fetchLanguages()
//       ])
//       setIsLoading(false)
//     }

//     if (user) {
//       loadData()
//     }
//   }, [user])

//   // Handle language switch
//   const handleSwitchLanguage = async (languageId: number) => {
//     if (isSwitching) return
    
//     setIsSwitching(true)
//     try {
//       const token = getAccessToken()
//       if (!token) return

//       const response = await fetch(`${API_BASE_URL}/users/languages/switch`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ languageId })
//       })

//       if (response.ok) {
//         // Reload page to update all components with new language
//         window.location.reload()
//       } else {
//         throw new Error('Failed to switch language')
//       }
//     } catch (error) {
//       console.error('Error switching language:', error)
//       alert('Không thể chuyển đổi ngôn ngữ. Vui lòng thử lại!')
//     } finally {
//       setIsSwitching(false)
//     }
//   }

//   // Handle add new language
//   const handleAddNewLanguage = () => {
//     router.push("/selectLanguage")
//   }

//   if (!user || isLoading || !profile) {
//     return (
//       <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-16 bg-card/95 backdrop-blur-xl border-b border-border/50 flex items-center justify-center z-30">
//         <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   const xpProgress = (profile.activeLanguage.currentXp / profile.activeLanguage.xpToNextLevel) * 100
//   const activeLangInfo = allLanguages.find(l => l.id === profile.activeLanguage.id)

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

//       {/* User Info */}
//       <div className="flex items-center gap-4">
//         <img
//           src={profile.avatar?.iconUrl || "/placeholder.svg"}
//           alt={profile.username}
//           className="w-10 h-10 rounded-full border-2 border-sky-400 shadow-lg ring-2 ring-sky-400/20"
//         />
//         <div className="hidden sm:block">
//           <div className="font-bold text-foreground">{profile.username}</div>
//           <div className="text-xs text-muted-foreground">Level {profile.activeLanguage.level}</div>
//         </div>
//       </div>

//       {/* XP Progress Bar */}
//       <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden min-[768px]:block">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-xs text-muted-foreground">XP Progress</span>
//           <span className="text-xs font-bold text-sky-500">
//             {profile.activeLanguage.currentXp} / {profile.activeLanguage.xpToNextLevel}
//           </span>
//         </div>
//         <Progress value={xpProgress} className="h-2.5 bg-secondary" />
//       </div>

//       {/* Right Side Actions */}
//       <div className="flex items-center gap-2 lg:gap-4">
//         {/* Language Switcher */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               className="flex items-center gap-2 px-3 py-2 h-auto rounded-full hover:bg-accent transition-colors"
//               disabled={isSwitching}
//             >
//               <span className="text-2xl">{activeLangInfo?.flagEmoji || '🌐'}</span>
//               <div className="hidden lg:block text-left">
//                 <div className="text-xs text-muted-foreground">Learning</div>
//                 <div className="text-sm font-semibold">{profile.activeLanguage.name}</div>
//               </div>
//               <Languages className="w-4 h-4 text-muted-foreground" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-64">
//             <DropdownMenuLabel className="flex items-center gap-2">
//               <Languages className="w-4 h-4" />
//               Chuyển đổi ngôn ngữ
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
            
//             {allLanguages.length > 0 ? (
//               <>
//                 {allLanguages.map((lang) => {
//                   const isActive = lang.id === profile.activeLanguage.id
//                   return (
//                     <DropdownMenuItem
//                       key={lang.id}
//                       onClick={() => !isActive && handleSwitchLanguage(lang.id)}
//                       disabled={isActive || isSwitching}
//                       className="flex items-center justify-between cursor-pointer"
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">{lang.flagEmoji}</span>
//                         <div>
//                           <div className="font-semibold">{lang.name}</div>
//                           <div className="text-xs text-muted-foreground">
//                             {lang.nativeName}
//                           </div>
//                         </div>
//                       </div>
//                       {isActive && (
//                         <Check className="w-4 h-4 text-green-500" />
//                       )}
//                     </DropdownMenuItem>
//                   )
//                 })}
//                 <DropdownMenuSeparator />
//               </>
//             ) : null}
            
//             <DropdownMenuItem
//               onClick={handleAddNewLanguage}
//               className="cursor-pointer text-blue-600 dark:text-blue-400 font-semibold"
//             >
//               <span className="mr-2">➕</span>
//               Thêm ngôn ngữ mới
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Theme Toggle */}
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={toggleTheme}
//           className="rounded-full hover:bg-accent transition-colors hidden min-[768px]:flex"
//           aria-label="Toggle theme"
//         >
//           {theme === "dark" ? (
//             <Sun className="w-5 h-5 text-amber-500" />
//           ) : (
//             <Moon className="w-5 h-5 text-slate-600" />
//           )}
//         </Button>

//         {/* Streak */}
//         <div className="flex items-center gap-2 px-2 lg:px-3 py-1.5 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full border border-orange-500/20">
//           <Flame className="w-4 lg:w-5 h-4 lg:h-5 text-orange-500" />
//           <div className="hidden sm:block">
//             <div className="text-xs text-muted-foreground">Streak</div>
//             <div className="text-sm font-bold text-orange-500">
//               {profile.activeLanguage.currentStreak} days
//             </div>
//           </div>
//           <div className="sm:hidden text-sm font-bold text-orange-500">
//             {profile.activeLanguage.currentStreak}
//           </div>
//         </div>

//         {/* Coins */}
//         <div className="flex items-center gap-2 px-2 lg:px-3 py-1.5 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-full border border-amber-500/20">
//           <Coins className="w-4 lg:w-5 h-4 lg:h-5 text-amber-500" />
//           <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
//             {profile.coins}
//           </div>
//         </div>

//         {/* Gems */}
//         <div className="flex items-center gap-2 px-2 lg:px-3 py-1.5 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-full border border-pink-500/20">
//           <span className="text-base">💎</span>
//           <div className="text-sm font-bold text-pink-600 dark:text-pink-400">
//             {profile.gems}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// API ổn
// "use client"

// import { useState, useEffect } from "react"
// import { Flame, Moon, Sun, Menu, Languages, Check } from "lucide-react"
// import { useTheme } from "@/lib/theme-context"

// // API client
// const API_BASE_URL = "http://localhost:3000/api"

// const apiClient = {
//   async getProfile() {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (!response.ok) throw new Error("Failed to fetch profile")
//     return response.json()
//   },

//   async getUserLanguages() {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/languages`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (!response.ok) throw new Error("Failed to fetch user languages")
//     return response.json()
//   },

//   async switchLanguage(languageCode: string) {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/languages/switch`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ languageCode }),
//     })
//     if (!response.ok) throw new Error("Failed to switch language")
//     return response.json()
//   },
// }

// interface TopBarProps {
//   onMenuClick?: () => void
// }

// export default function TopBar({ onMenuClick }: TopBarProps) {
//   const { theme, toggleTheme } = useTheme()
//   const [profile, setProfile] = useState<any>(null)
//   const [userLanguages, setUserLanguages] = useState<any[]>([])
//   const [isSwitching, setIsSwitching] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [profileData, languagesData] = await Promise.all([
//           apiClient.getProfile(),
//           apiClient.getUserLanguages(),
//         ])
//         setProfile(profileData)
//         setUserLanguages(languagesData)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   const handleSwitchLanguage = async (languageCode: string) => {
//     if (isSwitching) return

//     setIsSwitching(true)
//     try {
//       await apiClient.switchLanguage(languageCode)

//       // Refetch profile and languages
//       const [updatedProfile, updatedLanguages] = await Promise.all([
//         apiClient.getProfile(),
//         apiClient.getUserLanguages(),
//       ])

//       setProfile(updatedProfile)
//       setUserLanguages(updatedLanguages)
//     } catch (error) {
//       console.error("Error switching language:", error)
//       alert("Không thể chuyển đổi ngôn ngữ. Vui lòng thử lại!")
//     } finally {
//       setIsSwitching(false)
//     }
//   }

//   if (isLoading || !profile) {
//     return (
//       <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center z-30">
//         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500"></div>
//       </div>
//     )
//   }

//   const activeLanguage = profile.activeLanguage
//   const xpToNextLevel = activeLanguage?.xpToNextLevel || 2000
//   const currentXp = activeLanguage?.currentXp || 0
//   const xpProgress = (currentXp / xpToNextLevel) * 100
//   const currentLevel = activeLanguage?.level || 1

//   // Map language code to flag emoji
//   const getFlagEmoji = (code: string) => {
//     const flags: Record<string, string> = {
//       en: "🇬🇧",
//       es: "🇪🇸",
//       fr: "🇫🇷",
//       ja: "🇯🇵",
//       ko: "🇰🇷",
//       zh: "🇨🇳",
//     }
//     return flags[code] || "🌐"
//   }

//   return (
//     <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6 z-30 transition-all duration-300 shadow-sm">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={onMenuClick}
//         className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//         aria-label="Open menu"
//       >
//         <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//       </button>

//       {/* User Info */}
//       <div className="flex items-center gap-4">
//         <img
//           src={profile.avatar?.iconUrl || "/placeholder.svg"}
//           alt={profile.username}
//           className="w-10 h-10 rounded-full border-2 border-sky-400 shadow-lg ring-2 ring-sky-400/20"
//         />
//         <div className="hidden sm:block">
//           <div className="font-bold text-gray-900 dark:text-white">{profile.username}</div>
//           <div className="text-xs text-gray-500 dark:text-gray-400">Level {currentLevel}</div>
//         </div>
//       </div>

//       {/* XP Progress Bar */}
//       <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden min-[768px]:block">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-xs text-gray-500 dark:text-gray-400">XP Progress</span>
//           <span className="text-xs font-bold text-sky-500">
//             {currentXp} / {xpToNextLevel}
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
//           <div
//             className="bg-sky-500 h-full rounded-full transition-all duration-300"
//             style={{ width: `${xpProgress}%` }}
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-2 lg:gap-4">
//         {/* Language Switcher */}
//         {activeLanguage && (
//           <div className="relative group">
//             <button
//               className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               disabled={isSwitching}
//             >
//               <span className="text-2xl">{getFlagEmoji(activeLanguage.code)}</span>
//               <div className="hidden lg:block text-left">
//                 <div className="text-xs text-gray-500 dark:text-gray-400">Learning</div>
//                 <div className="text-sm font-semibold text-gray-900 dark:text-white">
//                   {activeLanguage.name}
//                 </div>
//               </div>
//               <Languages className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//             </button>

//             {/* Dropdown */}
//             <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//               <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
//                 <Languages className="w-4 h-4 text-gray-700 dark:text-gray-300" />
//                 <span className="font-semibold text-gray-900 dark:text-white">
//                   Chuyển đổi ngôn ngữ
//                 </span>
//               </div>

//               <div className="py-1">
//                 {userLanguages.length > 0 ? (
//                   <>
//                     {userLanguages.map((lang) => (
//                       <button
//                         key={lang.code}
//                         onClick={() => handleSwitchLanguage(lang.code)}
//                         disabled={lang.isActive || isSwitching}
//                         className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-2xl">{getFlagEmoji(lang.code)}</span>
//                           <div className="text-left">
//                             <div className="font-semibold text-gray-900 dark:text-white">
//                               {lang.name}
//                             </div>
//                             <div className="text-xs text-gray-500 dark:text-gray-400">
//                               Level {lang.progress?.level || 1} • {lang.progress?.currentXp || 0} XP
//                             </div>
//                           </div>
//                         </div>
//                         {lang.isActive && <Check className="w-4 h-4 text-green-500" />}
//                       </button>
//                     ))}
//                     <div className="border-t border-gray-200 dark:border-gray-700" />
//                   </>
//                 ) : null}

//                 <button
//                   onClick={() => (window.location.href = "/selectLanguage")}
//                   className="w-full px-4 py-3 flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <span className="mr-2">➕</span>
//                   Thêm ngôn ngữ mới
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Theme Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden min-[768px]:flex"
//           aria-label="Toggle theme"
//         >
//           {theme === "dark" ? (
//             <Sun className="w-5 h-5 text-amber-500" />
//           ) : (
//             <Moon className="w-5 h-5 text-slate-600" />
//           )}
//         </button>

//         {/* Streak */}
//         <div className="flex items-center gap-2 px-2 lg:px-3 py-1.5 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full border border-orange-500/20">
//           <Flame className="w-4 lg:w-5 h-4 lg:h-5 text-orange-500" />
//           <div className="hidden sm:block">
//             <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
//             <div className="text-sm font-bold text-orange-500">
//               {activeLanguage?.currentStreak || 0} days
//             </div>
//           </div>
//           <div className="sm:hidden text-sm font-bold text-orange-500">
//             {activeLanguage?.currentStreak || 0}
//           </div>
//         </div>

//         {/* Coins */}
//         <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-full border border-yellow-500/20">
//           <span className="text-lg">💰</span>
//           <span className="text-sm font-bold text-yellow-600 dark:text-yellow-500">
//             {profile.coins}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }










// "use client"

// import { useState, useEffect } from "react"
// import { Flame, Moon, Sun, Menu, Languages, Check } from "lucide-react"
// import { useTheme } from "@/lib/theme-context"

// // API client
// const API_BASE_URL = "http://localhost:3000/api"

// const apiClient = {
//   async getProfile() {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (!response.ok) throw new Error("Failed to fetch profile")
//     return response.json()
//   },

//   async getUserLanguages() {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/languages`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (!response.ok) throw new Error("Failed to fetch user languages")
//     return response.json()
//   },

//   async switchLanguage(languageCode: string) {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/languages/switch`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ languageCode }),
//     })
//     if (!response.ok) throw new Error("Failed to switch language")
//     return response.json()
//   },
// }

// interface TopBarProps {
//   onMenuClick?: () => void
// }

// export default function TopBar({ onMenuClick }: TopBarProps) {
//   const { theme, toggleTheme } = useTheme()
//   const [profile, setProfile] = useState<any>(null)
//   const [userLanguages, setUserLanguages] = useState<any[]>([])
//   const [isSwitching, setIsSwitching] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [profileData, languagesData] = await Promise.all([
//           apiClient.getProfile(),
//           apiClient.getUserLanguages(),
//         ])
//         setProfile(profileData)
//         setUserLanguages(languagesData)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   const handleSwitchLanguage = async (languageCode: string) => {
//     if (isSwitching) return

//     setIsSwitching(true)
//     try {
//       await apiClient.switchLanguage(languageCode)

//       // Refetch profile and languages
//       const [updatedProfile, updatedLanguages] = await Promise.all([
//         apiClient.getProfile(),
//         apiClient.getUserLanguages(),
//       ])

//       setProfile(updatedProfile)
//       setUserLanguages(updatedLanguages)
//     } catch (error) {
//       console.error("Error switching language:", error)
//       alert("Không thể chuyển đổi ngôn ngữ. Vui lòng thử lại!")
//     } finally {
//       setIsSwitching(false)
//     }
//   }

//   if (isLoading || !profile) {
//     return (
//       <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-center z-30">
//         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500"></div>
//       </div>
//     )
//   }

//   const activeLanguage = profile.activeLanguage
//   const xpToNextLevel = activeLanguage?.xpToNextLevel || 2000
//   const currentXp = activeLanguage?.currentXp || 0
//   const xpProgress = (currentXp / xpToNextLevel) * 100
//   const currentLevel = activeLanguage?.level || 1

//   // Map language code to flag emoji
//   const getFlagEmoji = (code: string) => {
//     const flags: Record<string, string> = {
//       en: "🇬🇧",
//       es: "🇪🇸",
//       fr: "🇫🇷",
//       ja: "🇯🇵",
//       ko: "🇰🇷",
//       zh: "🇨🇳",
//     }
//     return flags[code] || "🌐"
//   }

//   return (
//     <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-6 z-30 transition-all duration-300 shadow-sm">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={onMenuClick}
//         className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
//         aria-label="Open menu"
//       >
//         <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//       </button>

//       {/* User Info */}
//       <div className="flex items-center gap-4">
//         <img
//           src={profile.avatar?.iconUrl || "/placeholder.svg"}
//           alt={profile.username}
//           className="w-10 h-10 rounded-full border-2 border-sky-400 shadow-lg ring-2 ring-sky-400/20"
//         />
//         <div className="hidden sm:block">
//           <div className="font-bold text-gray-900 dark:text-white">{profile.username}</div>
//           <div className="text-xs text-gray-500 dark:text-gray-400">Level {currentLevel}</div>
//         </div>
//       </div>

//       {/* XP Progress Bar */}
//       <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden min-[768px]:block">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-xs text-gray-500 dark:text-gray-400">XP Progress</span>
//           <span className="text-xs font-bold text-sky-500 dark:text-sky-400">
//             {currentXp} / {xpToNextLevel}
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
//           <div
//             className="bg-gradient-to-r from-sky-500 to-blue-500 dark:from-sky-400 dark:to-blue-400 h-full rounded-full transition-all duration-300"
//             style={{ width: `${xpProgress}%` }}
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-2 lg:gap-4">
//         {/* Language Switcher */}
//         {activeLanguage && (
//           <div className="relative group">
//             <button
//               className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
//               disabled={isSwitching}
//             >
//               <span className="text-2xl">{getFlagEmoji(activeLanguage.code)}</span>
//               <div className="hidden lg:block text-left">
//                 <div className="text-xs text-gray-500 dark:text-gray-400">Learning</div>
//                 <div className="text-sm font-semibold text-gray-900 dark:text-white">
//                   {activeLanguage.name}
//                 </div>
//               </div>
//               <Languages className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//             </button>

//             {/* Dropdown */}
//             <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//               <div className="p-3 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
//                 <Languages className="w-4 h-4 text-gray-700 dark:text-gray-300" />
//                 <span className="font-semibold text-gray-900 dark:text-white">
//                   Chuyển đổi ngôn ngữ
//                 </span>
//               </div>

//               <div className="py-1">
//                 {userLanguages.length > 0 ? (
//                   <>
//                     {userLanguages.map((lang) => (
//                       <button
//                         key={lang.code}
//                         onClick={() => handleSwitchLanguage(lang.code)}
//                         disabled={lang.isActive || isSwitching}
//                         className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-2xl">{getFlagEmoji(lang.code)}</span>
//                           <div className="text-left">
//                             <div className="font-semibold text-gray-900 dark:text-white">
//                               {lang.name}
//                             </div>
//                             <div className="text-xs text-gray-500 dark:text-gray-400">
//                               Level {lang.progress?.level || 1} • {lang.progress?.currentXp || 0} XP
//                             </div>
//                           </div>
//                         </div>
//                         {lang.isActive && <Check className="w-4 h-4 text-green-500" />}
//                       </button>
//                     ))}
//                     <div className="border-t border-gray-200 dark:border-slate-700" />
//                   </>
//                 ) : null}

//                 <button
//                   onClick={() => (window.location.href = "/selectLanguage")}
//                   className="w-full px-4 py-3 flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
//                 >
//                   <span className="mr-2">➕</span>
//                   Thêm ngôn ngữ mới
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Theme Toggle - Improved Design */}
//         <button
//           onClick={toggleTheme}
//           className="relative p-2.5 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 hover:shadow-lg transition-all duration-300 hidden min-[768px]:flex items-center justify-center group border border-gray-300 dark:border-slate-600"
//           aria-label="Toggle theme"
//           title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
//         >
//           <div className="relative w-5 h-5">
//             {theme === "dark" ? (
//               <Sun className="w-5 h-5 text-amber-500 animate-in spin-in-180 duration-500" />
//             ) : (
//               <Moon className="w-5 h-5 text-slate-700 animate-in spin-in-180 duration-500" />
//             )}
//           </div>
//           <span className="absolute -bottom-8 right-0 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//             {theme === "dark" ? "Light Mode" : "Dark Mode"}
//           </span>
//         </button>

//         {/* Streak */}
//         <div className="flex items-center gap-2 px-2 lg:px-3 py-1.5 bg-gradient-to-br from-orange-500/10 to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/20 rounded-full border border-orange-500/20 dark:border-orange-500/30">
//           <Flame className="w-4 lg:w-5 h-4 lg:h-5 text-orange-500" />
//           <div className="hidden sm:block">
//             <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
//             <div className="text-sm font-bold text-orange-500 dark:text-orange-400">
//               {activeLanguage?.currentStreak || 0} days
//             </div>
//           </div>
//           <div className="sm:hidden text-sm font-bold text-orange-500 dark:text-orange-400">
//             {activeLanguage?.currentStreak || 0}
//           </div>
//         </div>

//         {/* Coins */}
//         {/* <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 dark:from-yellow-500/20 dark:to-yellow-600/20 rounded-full border border-yellow-500/20 dark:border-yellow-500/30">
//           <span className="text-lg">💰</span>
//           <span className="text-sm font-bold text-yellow-600 dark:text-yellow-500">
//             {profile.coins}
//           </span>
//         </div> */}
//       </div>
//     </div>
//   )
// }

















// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Flame, Moon, Sun, Menu, Languages, Check, LogOut } from "lucide-react"
// import { useTheme } from "@/lib/theme-context"

// const API_BASE_URL = "http://localhost:3000/api"

// const apiClient = {
//   async getProfile() {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (!response.ok) throw new Error("Failed to fetch profile")
//     return response.json()
//   },

//   async getUserLanguages() {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/languages`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (!response.ok) throw new Error("Failed to fetch user languages")
//     return response.json()
//   },

//   async getAllLanguages() {
//     const response = await fetch(`${API_BASE_URL}/languages`)
//     if (!response.ok) throw new Error("Failed to fetch all languages")
//     return response.json()
//   },

//   async switchLanguage(languageCode: string) {
//     const token = localStorage.getItem("accessToken")
//     const response = await fetch(`${API_BASE_URL}/users/languages/switch`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ languageCode }),
//     })
//     if (!response.ok) throw new Error("Failed to switch language")
//     return response.json()
//   },
// }

// interface TopBarProps {
//   onMenuClick?: () => void
// }

// export default function TopBar({ onMenuClick }: TopBarProps) {
//   const { theme, toggleTheme } = useTheme()
//   const [profile, setProfile] = useState<any>(null)
//   const [userLanguages, setUserLanguages] = useState<any[]>([])
//   const [allLanguages, setAllLanguages] = useState<any[]>([])
//   const [isSwitching, setIsSwitching] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [profileData, languagesData, allLangsData] = await Promise.all([
//           apiClient.getProfile(),
//           apiClient.getUserLanguages(),
//           apiClient.getAllLanguages(),
//         ])
//         setProfile(profileData)
//         setUserLanguages(languagesData)
//         setAllLanguages(allLangsData)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   const handleSwitchLanguage = async (languageCode: string) => {
//     if (isSwitching) return

//     setIsSwitching(true)
//     try {
//       await apiClient.switchLanguage(languageCode)
//       setIsDropdownOpen(false)
      
//       // Reload page để làm mới toàn bộ app
//       setTimeout(() => {
//         window.location.reload()
//       }, 300)
//     } catch (error) {
//       console.error("Error switching language:", error)
//       alert("Không thể chuyển đổi ngôn ngữ. Vui lòng thử lại!")
//     } finally {
//       setIsSwitching(false)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken")
//     window.location.href = "/login"
//   }

//   if (isLoading || !profile) {
//     return (
//       <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-center z-30">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
//       </div>
//     )
//   }

//   const activeLanguage = profile.activeLanguage
//   const xpToNextLevel = activeLanguage?.xpToNextLevel || 2000
//   const currentXp = activeLanguage?.currentXp || 0
//   const xpProgress = (currentXp / xpToNextLevel) * 100
//   const currentLevel = activeLanguage?.level || 1

//   const getFlagEmoji = (code: string) => {
//     const flags: Record<string, string> = {
//       en: "🇬🇧",
//       es: "🇪🇸",
//       fr: "🇫🇷",
//       ja: "🇯🇵",
//       ko: "🇰🇷",
//       zh: "🇨🇳",
//       vi: "🇻🇳",
//     }
//     return flags[code] || "🌐"
//   }

//   return (
//     <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 z-30 transition-all duration-300 shadow-md">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={onMenuClick}
//         className="md:hidden p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
//         aria-label="Open menu"
//       >
//         <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//       </button>

//       {/* User Info */}
//       <div className="flex items-center gap-4">
//         <img
//           src={profile.avatar?.iconUrl || "/placeholder.svg"}
//           alt={profile.username}
//           className="w-12 h-12 rounded-full border-2 border-sky-400 shadow-lg ring-2 ring-sky-400/20"
//         />
//         <div className="hidden sm:block">
//           <div className="font-bold text-lg text-gray-900 dark:text-white">{profile.username}</div>
//           <div className="text-sm text-gray-500 dark:text-gray-400">Level {currentLevel}</div>
//         </div>
//       </div>

//       {/* XP Progress Bar */}
//       <div className="flex-1 max-w-lg mx-4 lg:mx-8 hidden min-[768px]:block">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">XP Progress</span>
//           <span className="text-sm font-bold text-sky-500 dark:text-sky-400">
//             {currentXp} / {xpToNextLevel}
//           </span>
//         </div>
//         <div className="w-full bg-gray-300 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
//           <div
//             className="bg-gradient-to-r from-sky-500 to-blue-500 dark:from-sky-400 dark:to-blue-400 h-full rounded-full transition-all duration-300"
//             style={{ width: `${xpProgress}%` }}
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-3 lg:gap-6">
//         {/* Language Switcher - Click Dropdown */}
//         {activeLanguage && (
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors font-semibold border-2 border-transparent hover:border-sky-400/50"
//               disabled={isSwitching}
//             >
//               <span className="text-3xl">{getFlagEmoji(activeLanguage.code)}</span>
//               <div className="hidden lg:block text-left">
//                 <div className="text-xs text-gray-500 dark:text-gray-400">Learning</div>
//                 <div className="text-base font-bold text-gray-900 dark:text-white">
//                   {activeLanguage.name}
//                 </div>
//               </div>
//               <Languages className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//             </button>

//             {/* Dropdown Menu - Click to open */}
//             {isDropdownOpen && (
//               <div className="absolute right-0 top-full mt-3 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 z-50 animate-in fade-in slide-in-from-top-2">
//                 <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
//                   <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
//                   <span className="font-bold text-lg text-gray-900 dark:text-white">
//                     Chuyển đổi ngôn ngữ
//                   </span>
//                 </div>

//                 <div className="py-2 max-h-96 overflow-y-auto">
//                   {/* Các ngôn ngữ đang học */}
//                   {userLanguages.length > 0 && (
//                     <>
//                       <div className="px-4 py-2">
//                         <div className="text-xs font-bold text-gray-500 uppercase px-2 mb-3">Các ngôn ngữ đang học</div>
//                         {userLanguages.map((lang) => (
//                           <button
//                             key={lang.code}
//                             onClick={() => handleSwitchLanguage(lang.code)}
//                             disabled={lang.isActive || isSwitching}
//                             className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg text-left mb-2"
//                           >
//                             <div className="flex items-center gap-3">
//                               <span className="text-3xl">{lang.flagEmoji || getFlagEmoji(lang.code)}</span>
//                               <div>
//                                 <div className="font-bold text-gray-900 dark:text-white text-base">
//                                   {lang.name}
//                                 </div>
//                                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                                   Level {lang.progress?.level || 1} • {lang.progress?.currentXp || 0} XP
//                                 </div>
//                               </div>
//                             </div>
//                             {lang.isActive && <Check className="w-5 h-5 text-green-500" />}
//                           </button>
//                         ))}
//                       </div>

//                       <div className="border-t border-gray-200 dark:border-slate-700 my-2" />
//                     </>
//                   )}

//                   {/* Tất cả ngôn ngữ có sẵn */}
//                   {allLanguages.length > 0 && (
//                     <div className="px-4 py-2">
//                       <div className="text-xs font-bold text-gray-500 uppercase px-2 mb-3">Tất cả ngôn ngữ</div>
//                       {allLanguages.map((lang) => {
//                         const isLearning = userLanguages.find(ul => ul.code === lang.code)
//                         return (
//                           <button
//                             key={lang.code}
//                             onClick={() => {
//                               if (!isLearning) {
//                                 // Nếu chưa học → thêm ngôn ngữ mới
//                                 handleSwitchLanguage(lang.code)
//                               } else if (!isLearning.isActive) {
//                                 // Nếu đã học nhưng chưa active → switch
//                                 handleSwitchLanguage(lang.code)
//                               }
//                             }}
//                             disabled={isLearning?.isActive || isSwitching}
//                             className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg text-left mb-2"
//                           >
//                             <div className="flex items-center gap-3">
//                               <span className="text-3xl">{lang.flagEmoji}</span>
//                               <div>
//                                 <div className="font-bold text-gray-900 dark:text-white text-base">
//                                   {lang.name}
//                                 </div>
//                                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                                   {lang.nativeName}
//                                 </div>
//                               </div>
//                             </div>
//                             {isLearning?.isActive && <Check className="w-5 h-5 text-green-500" />}
//                           </button>
//                         )
//                       })}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Theme Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:shadow-lg transition-all border border-gray-300 dark:border-slate-600"
//           aria-label="Toggle theme"
//           title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
//         >
//           {theme === "dark" ? (
//             <Sun className="w-5 h-5 text-amber-500" />
//           ) : (
//             <Moon className="w-5 h-5 text-slate-700" />
//           )}
//         </button>

//         {/* Streak */}
//         <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-orange-500/10 to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/20 rounded-lg border border-orange-500/20 dark:border-orange-500/30 font-semibold">
//           <Flame className="w-5 h-5 text-orange-500" />
//           <div className="hidden sm:block">
//             <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
//             <div className="text-base font-bold text-orange-500 dark:text-orange-400">
//               {activeLanguage?.currentStreak || 0} days
//             </div>
//           </div>
//           <div className="sm:hidden text-base font-bold text-orange-500 dark:text-orange-400">
//             {activeLanguage?.currentStreak || 0}
//           </div>
//         </div>

//         {/* Logout Button */}
//         {/* <button
//           onClick={handleLogout}
//           className="p-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
//           aria-label="Logout"
//           title="Logout"
//         >
//           <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
//         </button> */}
//       </div>
//     </div>
//   )
// }







"use client"

import { useState, useEffect, useRef } from "react"
import { Flame, Moon, Sun, Menu, Languages, Check, LogOut } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

const API_BASE_URL = "http://localhost:3000/api"

const apiClient = {
  async getProfile() {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error("Failed to fetch profile")
    return response.json()
  },

  async getUserLanguages() {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE_URL}/users/languages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error("Failed to fetch user languages")
    return response.json()
  },

  async getAllLanguages() {
    const response = await fetch(`${API_BASE_URL}/languages`)
    if (!response.ok) throw new Error("Failed to fetch all languages")
    return response.json()
  },

  async switchLanguage(languageCode: string) {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE_URL}/users/languages/switch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ languageCode }),
    })
    if (!response.ok) throw new Error("Failed to switch language")
    return response.json()
  },
}

interface TopBarProps {
  onMenuClick?: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { theme, toggleTheme } = useTheme()
  const [profile, setProfile] = useState<any>(null)
  const [userLanguages, setUserLanguages] = useState<any[]>([])
  const [allLanguages, setAllLanguages] = useState<any[]>([])
  const [isSwitching, setIsSwitching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, languagesData, allLangsData] = await Promise.all([
          apiClient.getProfile(),
          apiClient.getUserLanguages(),
          apiClient.getAllLanguages(),
        ])
        setProfile(profileData)
        setUserLanguages(languagesData)
        setAllLanguages(allLangsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSwitchLanguage = async (languageCode: string) => {
    if (isSwitching) return

    setIsSwitching(true)
    try {
      await apiClient.switchLanguage(languageCode)
      setIsDropdownOpen(false)
      
      // Reload page để làm mới toàn bộ app
      setTimeout(() => {
        window.location.reload()
      }, 300)
    } catch (error) {
      console.error("Error switching language:", error)
      alert("Không thể chuyển đổi ngôn ngữ. Vui lòng thử lại!")
    } finally {
      setIsSwitching(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    window.location.href = "/login"
  }

  if (isLoading || !profile) {
    return (
      <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-center z-30">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  const activeLanguage = profile.activeLanguage
  const xpToNextLevel = activeLanguage?.xpToNextLevel || 2000
  const currentXp = activeLanguage?.currentXp || 0
  const xpProgress = (currentXp / xpToNextLevel) * 100
  const currentLevel = activeLanguage?.level || 1

  const getFlagEmoji = (code: string) => {
    const flags: Record<string, string> = {
      en: "🇬🇧",
      es: "🇪🇸",
      fr: "🇫🇷",
      ja: "🇯🇵",
      ko: "🇰🇷",
      zh: "🇨🇳",
      vi: "🇻🇳",
    }
    return flags[code] || "🌐"
  }

  return (
    <div className="fixed top-0 left-0 md:left-20 xl:left-64 right-0 h-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 z-30 transition-all duration-300 shadow-md">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>

      {/* User Info */}
      <div className="flex items-center gap-3.5">
        <img
          src={profile.avatar?.iconUrl || "/placeholder.svg"}
          alt={profile.username}
          className="w-14 h-12 rounded-full border-2 border-sky-400 shadow-lg ring-2 ring-sky-400/20"
        />
        <div className="hidden md:block flex-1">
          <div className="font-bold text-lg text-gray-900 dark:text-white">{profile.username}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Level {currentLevel}</div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="hidden min-[1024px]:flex flex-1 max-w-lg mx-4 lg:mx-6 flex-col justify-center">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">XP Progress</span>
          <span className="text-sm font-bold text-sky-500 dark:text-sky-400">
            {currentXp} / {xpToNextLevel}
          </span>
        </div>
        <div className="w-full bg-gray-300 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-blue-500 dark:from-sky-400 dark:to-blue-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-2 sm:ml-3 lg:ml-4">
        {/* Language Switcher - Click Dropdown */}
        {activeLanguage && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors font-semibold border-2 border-transparent hover:border-sky-400/50"
              disabled={isSwitching}
            >
              <span className="text-3xl">{getFlagEmoji(activeLanguage.code)}</span>
              <div className="hidden lg:block text-left">
                <div className="text-xs text-gray-500 dark:text-gray-400">Learning</div>
                <div className="text-base font-bold text-gray-900 dark:text-white">
                  {activeLanguage.name}
                </div>
              </div>
              {/* <span className="text-sm font-bold text-gray-700 dark:text-white">GB</span> */}
              <Languages className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Dropdown Menu - Click to open */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 sm:w-72 md:w-80 max-w-[calc(100vw-1rem)] bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-slate-700 flex items-center gap-1.5">
                  <Languages className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-700 dark:text-gray-300" />
                  <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                    Chuyển đổi ngôn ngữ
                  </span>
                </div>

                <div className="py-1 max-h-80 overflow-y-auto">
                  {/* Các ngôn ngữ đang học */}
                  {userLanguages.length > 0 && (
                    <>
                      <div className="px-2 sm:px-3 py-1">
                        <div className="text-xs font-bold text-gray-500 uppercase px-1.5 mb-1">Đang học</div>
                        {userLanguages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleSwitchLanguage(lang.code)}
                            disabled={lang.isActive || isSwitching}
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded text-left mb-0.5"
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                              <span className="text-lg sm:text-xl flex-shrink-0">{lang.flagEmoji || getFlagEmoji(lang.code)}</span>
                              <div className="min-w-0">
                                <div className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate">
                                  {lang.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  Lv {lang.progress?.level || 1}
                                </div>
                              </div>
                            </div>
                            {lang.isActive && <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-500 flex-shrink-0" />}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 dark:border-slate-700 my-0.5" />
                    </>
                  )}

                  {/* Tất cả ngôn ngữ có sẵn */}
                  {allLanguages.length > 0 && (
                    <div className="px-2 sm:px-3 py-1">
                      <div className="text-xs font-bold text-gray-500 uppercase px-1.5 mb-1">Tất cả</div>
                      {allLanguages.map((lang) => {
                        const isLearning = userLanguages.find(ul => ul.code === lang.code)
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              if (!isLearning) {
                                handleSwitchLanguage(lang.code)
                              } else if (!isLearning.isActive) {
                                handleSwitchLanguage(lang.code)
                              }
                            }}
                            disabled={isLearning?.isActive || isSwitching}
                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded text-left mb-0.5"
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                              <span className="text-lg sm:text-xl flex-shrink-0">{lang.flagEmoji}</span>
                              <div className="min-w-0">
                                <div className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate">
                                  {lang.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {lang.nativeName}
                                </div>
                              </div>
                            </div>
                            {isLearning?.isActive && <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-500 flex-shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:shadow-lg transition-all border border-gray-300 dark:border-slate-600"
          aria-label="Toggle theme"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>

        {/* Streak */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-orange-500/10 to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/20 rounded-lg border border-orange-500/20 dark:border-orange-500/30 font-semibold">
          <Flame className="w-5 h-5 text-orange-500" />
          <div className="hidden sm:block">
            <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
            <div className="text-base font-bold text-orange-500 dark:text-orange-400">
              {activeLanguage?.currentStreak || 0} days
            </div>
          </div>
          <div className="sm:hidden text-base font-bold text-orange-500 dark:text-orange-400">
            {activeLanguage?.currentStreak || 0}
          </div>
        </div>


      </div>
    </div>
  )
}