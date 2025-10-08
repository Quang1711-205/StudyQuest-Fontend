// "use client"

// import type React from "react"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Map, Dumbbell, Target, Trophy, Flame, Star, Coins } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// export default function DashboardPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           {/* Welcome Section */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
//               Welcome back, {user.username}!
//             </h1>
//             <p className="text-muted-foreground text-base md:text-lg">Ready to continue your learning journey?</p>
//           </div>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
//             <StatCard
//               icon={<Star className="w-5 h-5 md:w-6 md:h-6" />}
//               label="Level"
//               value={user.level.toString()}
//               color="primary"
//             />
//             <StatCard
//               icon={<Flame className="w-5 h-5 md:w-6 md:h-6" />}
//               label="Day Streak"
//               value={`${user.streak}`}
//               color="orange"
//             />
//             <StatCard
//               icon={<Trophy className="w-5 h-5 md:w-6 md:h-6" />}
//               label="XP"
//               value={user.xp.toString()}
//               color="success"
//             />
//             <StatCard
//               icon={<Coins className="w-5 h-5 md:w-6 md:h-6" />}
//               label="Coins"
//               value={user.coins.toString()}
//               color="accent"
//             />
//           </div>

//           {/* Main Actions */}
//           <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
//             <Link href="/map" className="group">
//               <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary hover:scale-[1.02] duration-300 bg-gradient-to-br from-card to-primary/5">
//                 <CardHeader>
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
//                       <Map className="w-7 h-7 md:w-8 md:h-8 text-white" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-xl md:text-2xl">Learning Map</CardTitle>
//                       <CardDescription className="text-sm">Continue your structured lessons</CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Progress</span>
//                       <span className="font-semibold text-primary">35%</span>
//                     </div>
//                     <Progress value={35} className="h-2.5" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>

//             <Link href="/practice" className="group">
//               <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-pink-500 hover:scale-[1.02] duration-300 bg-gradient-to-br from-card to-pink-500/5">
//                 <CardHeader>
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
//                       <Dumbbell className="w-7 h-7 md:w-8 md:h-8 text-white" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-xl md:text-2xl">Practice Zone</CardTitle>
//                       <CardDescription className="text-sm">Free practice in 4 skills</CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-4 gap-2">
//                     <div className="text-center p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
//                       <div className="text-xs text-muted-foreground">Listen</div>
//                       <div className="font-bold text-blue-600 dark:text-blue-400">12</div>
//                     </div>
//                     <div className="text-center p-2 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-lg border border-pink-500/20">
//                       <div className="text-xs text-muted-foreground">Speak</div>
//                       <div className="font-bold text-pink-600 dark:text-pink-400">8</div>
//                     </div>
//                     <div className="text-center p-2 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
//                       <div className="text-xs text-muted-foreground">Read</div>
//                       <div className="font-bold text-purple-600 dark:text-purple-400">15</div>
//                     </div>
//                     <div className="text-center p-2 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg border border-orange-500/20">
//                       <div className="text-xs text-muted-foreground">Write</div>
//                       <div className="font-bold text-orange-600 dark:text-orange-400">10</div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           </div>

//           {/* Daily Mission */}
//           <Card className="mb-8 border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
//                     <Target className="w-5 h-5 text-white" />
//                   </div>
//                   <CardTitle>Daily Mission</CardTitle>
//                 </div>
//                 <Link href="/missions">
//                   <Button variant="outline" size="sm" className="hover:bg-amber-500/10 bg-transparent">
//                     View All
//                   </Button>
//                 </Link>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium">Complete 3 lessons today</span>
//                   <span className="text-sm font-bold text-amber-600 dark:text-amber-400">1/3</span>
//                 </div>
//                 <Progress value={33} className="h-2.5 bg-secondary" />
//                 <div className="flex items-center gap-3 text-sm">
//                   <span className="text-muted-foreground">Reward:</span>
//                   <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
//                     <Coins className="w-4 h-4" />
//                     +50 coins
//                   </span>
//                   <span className="font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1">💎 +5 gems</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Links */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Link href="/missions" className="group">
//               <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] duration-300 border-2 hover:border-amber-500">
//                 <CardContent className="pt-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
//                       <Target className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-lg">Missions</div>
//                       <div className="text-sm text-muted-foreground">3 active</div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>

//             <Link href="/shop" className="group">
//               <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] duration-300 border-2 hover:border-pink-500">
//                 <CardContent className="pt-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg transition-shadow">
//                       🛍️
//                     </div>
//                     <div>
//                       <div className="font-bold text-lg">Shop</div>
//                       <div className="text-sm text-muted-foreground">New items</div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>

//             <Link href="/leaderboard" className="group">
//               <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] duration-300 border-2 hover:border-emerald-500">
//                 <CardContent className="pt-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
//                       <Trophy className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-lg">Leaderboard</div>
//                       <div className="text-sm text-muted-foreground">Rank #42</div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// function StatCard({
//   icon,
//   label,
//   value,
//   color,
// }: {
//   icon: React.ReactNode
//   label: string
//   value: string
//   color: string
// }) {
//   const colorClasses = {
//     primary: "from-indigo-500 via-purple-500 to-pink-500",
//     orange: "from-orange-500 via-red-500 to-pink-500",
//     success: "from-emerald-500 via-teal-500 to-cyan-500",
//     accent: "from-amber-500 via-orange-500 to-red-500",
//   }

//   return (
//     <Card className="hover:shadow-lg transition-all hover:scale-[1.02] duration-300 border-2 hover:border-primary/50">
//       <CardContent className="pt-6">
//         <div className="flex items-center gap-3">
//           <div
//             className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-white shadow-md`}
//           >
//             {icon}
//           </div>
//           <div>
//             <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
//             <div className="text-xl md:text-2xl font-bold">{value}</div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



// 1
// "use client"

// import type React from "react"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Map, Dumbbell, Target, Trophy, Flame, Star, Coins, Sparkles, Zap, Award, Gift } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// export default function DashboardPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-[linear-gradient(135deg,rgb(239_246_255/0.6)_0%,rgb(243_232_255/0.6)_50%,rgb(252_231_243/0.6)_100%)] dark:bg-[linear-gradient(135deg,rgb(15_23_42/0.95)_0%,rgb(88_28_135/0.3)_50%,rgb(15_23_42/0.95)_100%)]">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           {/* Welcome Section with Decorative Elements */}
//           <div className="mb-10 relative">
//             <div className="absolute -top-8 left-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />
//             <div className="absolute -top-8 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
//             <div className="relative">
//               <div className="flex items-center gap-3 mb-3">
//                 <Sparkles className="w-7 h-7 text-amber-500 animate-pulse" />
//                 <h1 className="text-[2rem] md:text-[2.25rem] font-black leading-[1.2] tracking-[-0.02em] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Welcome back, {user.username}!
//                 </h1>
//                 <Sparkles className="w-7 h-7 text-pink-500 animate-pulse" />
//               </div>
//               <p className="text-[1rem] font-medium leading-normal opacity-80 flex items-center gap-2">
//                 Ready to continue your learning journey? 
//                 <Zap className="w-5 h-5 text-amber-500" />
//               </p>
//             </div>
//           </div>

//           {/* Enhanced Quick Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
//             <StatCard
//               icon={<Star className="w-6 h-6 md:w-7 md:h-7" />}
//               label="Level"
//               value={user.level.toString()}
//               color="from-indigo-500 via-purple-500 to-pink-500"
//               bgColor="from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40"
//               borderColor="border-purple-200/40 dark:border-purple-800/30"
//             />
//             <StatCard
//               icon={<Flame className="w-6 h-6 md:w-7 md:h-7" />}
//               label="Day Streak"
//               value={`${user.streak}`}
//               color="from-orange-500 via-red-500 to-pink-500"
//               bgColor="from-orange-50/80 to-red-50/80 dark:from-orange-950/40 dark:to-red-950/40"
//               borderColor="border-orange-200/40 dark:border-orange-800/30"
//               pulse
//             />
//             <StatCard
//               icon={<Trophy className="w-6 h-6 md:w-7 md:h-7" />}
//               label="XP"
//               value={user.xp.toString()}
//               color="from-emerald-500 via-teal-500 to-cyan-500"
//               bgColor="from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/40"
//               borderColor="border-teal-200/40 dark:border-teal-800/30"
//             />
//             <StatCard
//               icon={<Coins className="w-6 h-6 md:w-7 md:h-7" />}
//               label="Coins"
//               value={user.coins.toString()}
//               color="from-amber-500 via-yellow-500 to-orange-500"
//               bgColor="from-amber-50/80 to-yellow-50/80 dark:from-amber-950/40 dark:to-yellow-950/40"
//               borderColor="border-amber-200/40 dark:border-amber-800/30"
//             />
//           </div>

//           {/* Enhanced Main Actions */}
//           <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-10">
//             <Link href="/map" className="group">
//               <Card className="relative overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all cursor-pointer border-2 border-indigo-200/40 dark:border-indigo-900/30 hover:border-indigo-400/60 dark:hover:border-indigo-600/50 hover:scale-[1.02] duration-300 bg-white/95 dark:bg-slate-800/95">
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
//                 <CardHeader className="relative z-10 p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-all duration-300 ring-4 ring-purple-300/30 dark:ring-purple-700/30">
//                       <Map className="w-8 h-8 md:w-9 md:h-9 text-white" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-[1.5rem] md:text-[1.75rem] font-black leading-tight mb-1 flex items-center gap-2">
//                         Learning Map
//                         <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-[0.75rem] font-bold px-2 py-0.5">
//                           Active
//                         </Badge>
//                       </CardTitle>
//                       <CardDescription className="text-[0.9375rem] font-medium opacity-75">
//                         Continue your structured lessons
//                       </CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="relative z-10 p-6 pt-0">
//                   <div className="space-y-3">
//                     <div className="flex justify-between text-[0.9375rem]">
//                       <span className="font-semibold opacity-75">Overall Progress</span>
//                       <span className="font-black text-[1.25rem] text-purple-600 dark:text-purple-400">35%</span>
//                     </div>
//                     <div className="relative">
//                       <Progress value={35} className="h-3 bg-gradient-to-r from-purple-200/60 to-pink-200/60 dark:from-purple-900/60 dark:to-pink-900/60" />
//                       <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-sm pointer-events-none" />
//                     </div>
//                     <div className="flex items-center justify-between pt-1">
//                       <span className="text-[0.8125rem] opacity-70">12 lessons completed</span>
//                       <span className="text-[0.8125rem] font-bold text-purple-600 dark:text-purple-400">Keep going! 🚀</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>

//             <Link href="/practice" className="group">
//               <Card className="relative overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all cursor-pointer border-2 border-pink-200/40 dark:border-pink-900/30 hover:border-pink-400/60 dark:hover:border-pink-600/50 hover:scale-[1.02] duration-300 bg-white/95 dark:bg-slate-800/95">
//                 <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-red-500/5" />
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
//                 <CardHeader className="relative z-10 p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-all duration-300 ring-4 ring-pink-300/30 dark:ring-pink-700/30">
//                       <Dumbbell className="w-8 h-8 md:w-9 md:h-9 text-white" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-[1.5rem] md:text-[1.75rem] font-black leading-tight mb-1 flex items-center gap-2">
//                         Practice Zone
//                         <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 text-[0.75rem] font-bold px-2 py-0.5">
//                           Hot 🔥
//                         </Badge>
//                       </CardTitle>
//                       <CardDescription className="text-[0.9375rem] font-medium opacity-75">
//                         Free practice in 4 skills
//                       </CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="relative z-10 p-6 pt-0">
//                   <div className="grid grid-cols-4 gap-2 md:gap-3">
//                     <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-xl border border-blue-400/30 dark:border-blue-600/30 hover:scale-105 transition-transform duration-200">
//                       <div className="text-[0.8125rem] font-bold text-blue-700 dark:text-blue-300 mb-1">Listen</div>
//                       <div className="text-[1.5rem] font-black leading-tight text-blue-600 dark:text-blue-400">12</div>
//                     </div>
//                     <div className="text-center p-3 bg-gradient-to-br from-pink-500/10 to-pink-600/20 rounded-xl border border-pink-400/30 dark:border-pink-600/30 hover:scale-105 transition-transform duration-200">
//                       <div className="text-[0.8125rem] font-bold text-pink-700 dark:text-pink-300 mb-1">Speak</div>
//                       <div className="text-[1.5rem] font-black leading-tight text-pink-600 dark:text-pink-400">8</div>
//                     </div>
//                     <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-xl border border-purple-400/30 dark:border-purple-600/30 hover:scale-105 transition-transform duration-200">
//                       <div className="text-[0.8125rem] font-bold text-purple-700 dark:text-purple-300 mb-1">Read</div>
//                       <div className="text-[1.5rem] font-black leading-tight text-purple-600 dark:text-purple-400">15</div>
//                     </div>
//                     <div className="text-center p-3 bg-gradient-to-br from-orange-500/10 to-orange-600/20 rounded-xl border border-orange-400/30 dark:border-orange-600/30 hover:scale-105 transition-transform duration-200">
//                       <div className="text-[0.8125rem] font-bold text-orange-700 dark:text-orange-300 mb-1">Write</div>
//                       <div className="text-[1.5rem] font-black leading-tight text-orange-600 dark:text-orange-400">10</div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           </div>

//           {/* Enhanced Daily Mission */}
//           <Card className="mb-10 relative overflow-hidden border-2 border-amber-200/40 dark:border-amber-800/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 group bg-white/95 dark:bg-slate-800/95">
//             <div className="absolute inset-0 bg-gradient-to-r from-amber-500/8 via-orange-500/8 to-red-500/8" />
//             <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/15 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
//             <CardHeader className="relative z-10 p-8">
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] ring-4 ring-amber-300/30 dark:ring-amber-700/30">
//                     <Target className="w-7 h-7 md:w-8 md:h-8 text-white" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-[1.5rem] md:text-[1.75rem] font-black leading-tight flex items-center gap-2 mb-1">
//                       Daily Mission
//                       <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 animate-pulse text-[0.75rem] font-bold px-2 py-0.5">
//                         Limited Time
//                       </Badge>
//                     </CardTitle>
//                     <p className="text-[0.875rem] opacity-75 font-medium">Complete today's challenge</p>
//                   </div>
//                 </div>
//                 <Link href="/missions">
//                   <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all px-6 text-[0.9375rem]">
//                     View All Missions
//                   </Button>
//                 </Link>
//               </div>
//             </CardHeader>
//             <CardContent className="relative z-10 p-8 pt-0">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="font-bold text-[1.125rem] leading-tight">Complete 3 lessons today</span>
//                   <span className="text-[1.5rem] font-black leading-tight text-amber-600 dark:text-amber-400">1/3</span>
//                 </div>
//                 <div className="relative">
//                   <Progress value={33} className="h-3 bg-gradient-to-r from-amber-200/60 to-orange-200/60 dark:from-amber-900/60 dark:to-orange-900/60" />
//                   <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-sm pointer-events-none" />
//                 </div>
//                 <div className="flex items-center gap-4 md:gap-6 text-[0.9375rem] flex-wrap pt-2">
//                   <div className="flex items-center gap-2 px-3 py-2 bg-amber-100/80 dark:bg-amber-950/40 rounded-xl border border-amber-300/40 dark:border-amber-700/30">
//                     <Gift className="w-5 h-5 text-amber-600 dark:text-amber-400" />
//                     <span className="font-semibold opacity-75">Rewards:</span>
//                   </div>
//                   <div className="font-black text-amber-600 dark:text-amber-400 flex items-center gap-2 text-[1.0625rem]">
//                     <Coins className="w-5 h-5" />
//                     +50 coins
//                   </div>
//                   <div className="font-black text-pink-600 dark:text-pink-400 flex items-center gap-2 text-[1.0625rem]">
//                     💎 +5 gems
//                   </div>
//                   <div className="font-black text-purple-600 dark:text-purple-400 flex items-center gap-2 text-[1.0625rem]">
//                     <Star className="w-5 h-5" />
//                     +100 XP
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Enhanced Quick Links */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
//             <Link href="/missions" className="group">
//               <Card className="relative overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all cursor-pointer hover:scale-[1.03] duration-300 border-2 border-amber-200/40 dark:border-amber-900/30 hover:border-amber-400/60 dark:hover:border-amber-600/50 bg-white/95 dark:bg-slate-800/95">
//                 <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
//                 <CardContent className="p-8 relative z-10">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-all duration-300 ring-4 ring-amber-300/30 dark:ring-amber-700/30">
//                       <Target className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-black text-[1.25rem] leading-tight mb-1">Missions</div>
//                       <div className="text-[0.9375rem] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
//                         <Award className="w-4 h-4" />
//                         3 active missions
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>

//             <Link href="/shop" className="group">
//               <Card className="relative overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all cursor-pointer hover:scale-[1.03] duration-300 border-2 border-pink-200/40 dark:border-pink-900/30 hover:border-pink-400/60 dark:hover:border-pink-600/50 bg-white/95 dark:bg-slate-800/95">
//                 <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5" />
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
//                 <CardContent className="p-8 relative z-10">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.08)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-all duration-300 ring-4 ring-pink-300/30 dark:ring-pink-700/30">
//                       🛍️
//                     </div>
//                     <div>
//                       <div className="font-black text-[1.25rem] leading-tight mb-1">Shop</div>
//                       <div className="text-[0.9375rem] font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1">
//                         <Sparkles className="w-4 h-4" />
//                         New items available
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>

//             <Link href="/leaderboard" className="group">
//               <Card className="relative overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all cursor-pointer hover:scale-[1.03] duration-300 border-2 border-emerald-200/40 dark:border-emerald-900/30 hover:border-emerald-400/60 dark:hover:border-emerald-600/50 bg-white/95 dark:bg-slate-800/95">
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
//                 <CardContent className="p-8 relative z-10">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-all duration-300 ring-4 ring-emerald-300/30 dark:ring-emerald-700/30">
//                       <Trophy className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-black text-[1.25rem] leading-tight mb-1">Leaderboard</div>
//                       <div className="text-[0.9375rem] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
//                         <Zap className="w-4 h-4" />
//                         Rank #42
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// function StatCard({
//   icon,
//   label,
//   value,
//   color,
//   bgColor,
//   borderColor,
//   pulse = false,
// }: {
//   icon: React.ReactNode
//   label: string
//   value: string
//   color: string
//   bgColor: string
//   borderColor: string
//   pulse?: boolean
// }) {
//   return (
//     <Card className={`relative overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all hover:scale-[1.05] duration-300 border-2 ${borderColor} group bg-white/95 dark:bg-slate-800/95`}>
//       <div className={`absolute inset-0 bg-gradient-to-br ${bgColor}`} />
//       <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color.split(' ')[0]} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />
//       <CardContent className="p-6 relative z-10">
//         <div className="flex items-center gap-3 md:gap-4">
//           <div
//             className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-all duration-300 ring-4 ring-white/30 dark:ring-slate-800/30 ${pulse ? 'animate-pulse' : ''}`}
//           >
//             {icon}
//           </div>
//           <div>
//             <div className="text-[0.8125rem] font-bold opacity-70 uppercase tracking-[0.05em] mb-1">
//               {label}
//             </div>
//             <div className="text-[clamp(1.5rem,4vw,2rem)] font-black leading-tight">{value}</div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Map, Dumbbell, Target, Trophy, Flame, Star, Coins, Sparkles, Zap, Award, Gift } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Welcome back, {user.username}!
              </h1>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Ready to continue your learning journey?
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<Star className="w-6 h-6" />}
              label="Level"
              value={user.level.toString()}
              color="from-indigo-500 to-purple-500"
              bgColor="bg-indigo-50 dark:bg-indigo-950/40"
            />
            <StatCard
              icon={<Flame className="w-6 h-6" />}
              label="Day Streak"
              value={`${user.streak}`}
              color="from-orange-500 to-red-500"
              bgColor="bg-orange-50 dark:bg-orange-950/40"
            />
            <StatCard
              icon={<Trophy className="w-6 h-6" />}
              label="XP"
              value={user.xp.toString()}
              color="from-emerald-500 to-teal-500"
              bgColor="bg-emerald-50 dark:bg-emerald-950/40"
            />
            <StatCard
              icon={<Coins className="w-6 h-6" />}
              label="Coins"
              value={user.coins.toString()}
              color="from-amber-500 to-yellow-500"
              bgColor="bg-amber-50 dark:bg-amber-950/40"
            />
          </div>

          {/* Main Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link href="/map">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-indigo-200 dark:border-indigo-900 hover:border-indigo-400 dark:hover:border-indigo-600 h-full">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                      <Map className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold mb-1 flex items-center gap-2">
                        Learning Map
                        <Badge className="bg-purple-500 text-white border-0 text-xs">
                          Active
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Continue your structured lessons
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-600 dark:text-gray-400">Overall Progress</span>
                      <span className="font-semibold text-lg text-purple-600 dark:text-purple-400">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">12 lessons completed</span>
                      <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Keep going! 🚀</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-pink-200 dark:border-pink-900 hover:border-pink-400 dark:hover:border-pink-600 h-full">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
                      <Dumbbell className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold mb-1 flex items-center gap-2">
                        Practice Zone
                        <Badge className="bg-pink-500 text-white border-0 text-xs">
                          Hot 🔥
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Free practice in 4 skills
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Listen</div>
                      <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">12</div>
                    </div>
                    <div className="text-center p-3 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-800">
                      <div className="text-xs font-semibold text-pink-700 dark:text-pink-300 mb-1">Speak</div>
                      <div className="text-xl font-semibold text-pink-600 dark:text-pink-400">8</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">Read</div>
                      <div className="text-xl font-semibold text-purple-600 dark:text-purple-400">15</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/40 rounded-lg border border-orange-200 dark:border-orange-800">
                      <div className="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-1">Write</div>
                      <div className="text-xl font-semibold text-orange-600 dark:text-orange-400">10</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Daily Mission */}
          <Card className="mb-8 border-2 border-amber-200 dark:border-amber-800 shadow-md">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2 mb-1">
                      Daily Mission
                      <Badge className="bg-red-500 text-white border-0 text-xs">
                        Limited Time
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Complete today's challenge</p>
                  </div>
                </div>
                <Link href="/missions">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-md">
                    View All Missions
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base">Complete 3 lessons today</span>
                  <span className="text-xl font-semibold text-amber-600 dark:text-amber-400">1/3</span>
                </div>
                <Progress value={33} className="h-2" />
                <div className="flex items-center gap-4 text-sm flex-wrap pt-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-700">
                    <Gift className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium">Rewards:</span>
                  </div>
                  <div className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Coins className="w-4 h-4" />
                    +50 coins
                  </div>
                  <div className="font-semibold text-pink-600 dark:text-pink-400 flex items-center gap-1">
                    💎 +5 gems
                  </div>
                  <div className="font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    +100 XP
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/missions">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-amber-200 dark:border-amber-900 hover:border-amber-400 dark:hover:border-amber-600">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-base mb-1">Missions</div>
                      <div className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        3 active missions
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/shop">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-pink-200 dark:border-pink-900 hover:border-pink-400 dark:hover:border-pink-600">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl shadow-md">
                      🛍️
                    </div>
                    <div>
                      <div className="font-semibold text-base mb-1">Shop</div>
                      <div className="text-sm font-medium text-pink-600 dark:text-pink-400 flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        New items available
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/leaderboard">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-emerald-200 dark:border-emerald-900 hover:border-emerald-400 dark:hover:border-emerald-600">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-base mb-1">Leaderboard</div>
                      <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        Rank #42
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  bgColor: string
}) {
  return (
    <Card className="hover:shadow-lg transition-all border-2">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md`}
          >
            {icon}
          </div>
          <div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
              {label}
            </div>
            <div className="text-2xl font-semibold">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}