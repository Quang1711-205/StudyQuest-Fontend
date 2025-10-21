// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Trophy, TrendingUp, Users, Crown, Medal, Award } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// // Mock leaderboard data
// const leaderboardData = {
//   global: [
//     { rank: 1, name: "Alex Chen", level: 42, xp: 125000, streak: 365, avatar: "🦸" },
//     { rank: 2, name: "Maria Garcia", level: 40, xp: 118000, streak: 280, avatar: "🧙" },
//     { rank: 3, name: "John Smith", level: 38, xp: 112000, streak: 245, avatar: "🦹" },
//     { rank: 4, name: "Sarah Johnson", level: 36, xp: 105000, streak: 220, avatar: "🧝" },
//     { rank: 5, name: "David Lee", level: 35, xp: 98000, streak: 200, avatar: "🦊" },
//     { rank: 6, name: "Emma Wilson", level: 34, xp: 92000, streak: 180, avatar: "🐱" },
//     { rank: 7, name: "Michael Brown", level: 33, xp: 88000, streak: 165, avatar: "🐼" },
//     { rank: 8, name: "Lisa Anderson", level: 32, xp: 84000, streak: 150, avatar: "🦁" },
//     { rank: 9, name: "James Taylor", level: 31, xp: 80000, streak: 140, avatar: "🐯" },
//     { rank: 10, name: "You", level: 15, xp: 45000, streak: 7, avatar: "🎯", isCurrentUser: true },
//   ],
//   friends: [
//     { rank: 1, name: "Sarah Johnson", level: 36, xp: 105000, streak: 220, avatar: "🧝" },
//     { rank: 2, name: "Emma Wilson", level: 34, xp: 92000, streak: 180, avatar: "🐱" },
//     { rank: 3, name: "You", level: 15, xp: 45000, streak: 7, avatar: "🎯", isCurrentUser: true },
//     { rank: 4, name: "Tom Harris", level: 12, xp: 38000, streak: 5, avatar: "🐶" },
//     { rank: 5, name: "Nina Patel", level: 10, xp: 32000, streak: 3, avatar: "🦄" },
//   ],
//   weekly: [
//     { rank: 1, name: "Emma Wilson", level: 34, xp: 8500, streak: 7, avatar: "🐱" },
//     { rank: 2, name: "You", level: 15, xp: 7200, streak: 7, avatar: "🎯", isCurrentUser: true },
//     { rank: 3, name: "Sarah Johnson", level: 36, xp: 6800, streak: 7, avatar: "🧝" },
//     { rank: 4, name: "Tom Harris", level: 12, xp: 5500, streak: 6, avatar: "🐶" },
//     { rank: 5, name: "Nina Patel", level: 10, xp: 4200, streak: 5, avatar: "🦄" },
//   ],
// }

// export default function LeaderboardPage() {
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
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       {/* <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300"> */}
//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
//             <p className="text-muted-foreground text-lg">Compete with learners around the world</p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid md:grid-cols-3 gap-4 mb-8">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
//                     <Trophy className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Global Rank</div>
//                     <div className="text-2xl font-bold">#10</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
//                     <TrendingUp className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">This Week</div>
//                     <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">+3</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center">
//                     <Users className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Total Players</div>
//                     <div className="text-2xl font-bold">1.2M</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Leaderboard Tabs */}
//           <Tabs defaultValue="global" className="w-full">
//             <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
//               <TabsTrigger value="global" className="gap-2">
//                 <Trophy className="w-4 h-4" />
//                 Global
//               </TabsTrigger>
//               <TabsTrigger value="friends" className="gap-2">
//                 <Users className="w-4 h-4" />
//                 Friends
//               </TabsTrigger>
//               <TabsTrigger value="weekly" className="gap-2">
//                 <TrendingUp className="w-4 h-4" />
//                 This Week
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="global">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Global Rankings</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     {leaderboardData.global.map((player) => (
//                       <LeaderboardRow key={player.rank} player={player} />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="friends">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Friends Rankings</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     {leaderboardData.friends.map((player) => (
//                       <LeaderboardRow key={player.rank} player={player} />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="weekly">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Weekly Rankings</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     {leaderboardData.weekly.map((player) => (
//                       <LeaderboardRow key={player.rank} player={player} />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   )
// }

// function LeaderboardRow({ player }: { player: any }) {
//   const getRankIcon = (rank: number) => {
//     if (rank === 1) return <Crown className="w-6 h-6 text-amber-500" />
//     if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
//     if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />
//     return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
//   }

//   return (
//     <div
//       className={`flex items-center justify-between p-4 rounded-xl transition-all ${
//         player.isCurrentUser
//           ? "bg-primary/10 border-2 border-primary"
//           : player.rank <= 3
//             ? "bg-gradient-to-r from-teal-500/5 to-transparent"
//             : "bg-muted hover:bg-muted/80"
//       }`}
//     >
//       <div className="flex items-center gap-4 flex-1">
//         {/* Rank */}
//         <div className="w-12 flex items-center justify-center">{getRankIcon(player.rank)}</div>

//         {/* Avatar */}
//         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
//           {player.avatar}
//         </div>

//         {/* Player Info */}
//         <div className="flex-1">
//           <div className="flex items-center gap-2">
//             <span className="font-bold text-lg">{player.name}</span>
//             {player.isCurrentUser && <Badge variant="secondary">You</Badge>}
//           </div>
//           <div className="text-sm text-muted-foreground">Level {player.level}</div>
//         </div>

//         {/* Stats */}
//         <div className="hidden md:flex items-center gap-6">
//           <div className="text-center">
//             <div className="text-xs text-muted-foreground">XP</div>
//             <div className="font-bold">{player.xp.toLocaleString()}</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xs text-muted-foreground">Streak</div>
//             <div className="font-bold text-teal-600 dark:text-teal-400">{player.streak} 🔥</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



//1
// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Trophy, TrendingUp, Users, Crown, Medal, Award, Flame, Star, Zap } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// // Mock leaderboard data
// const leaderboardData = {
//   global: [
//     { rank: 1, name: "Alex Chen", level: 42, xp: 125000, streak: 365, avatar: "🦸" },
//     { rank: 2, name: "Maria Garcia", level: 40, xp: 118000, streak: 280, avatar: "🧙" },
//     { rank: 3, name: "John Smith", level: 38, xp: 112000, streak: 245, avatar: "🦹" },
//     { rank: 4, name: "Sarah Johnson", level: 36, xp: 105000, streak: 220, avatar: "🧝" },
//     { rank: 5, name: "David Lee", level: 35, xp: 98000, streak: 200, avatar: "🦊" },
//     { rank: 6, name: "Emma Wilson", level: 34, xp: 92000, streak: 180, avatar: "🐱" },
//     { rank: 7, name: "Michael Brown", level: 33, xp: 88000, streak: 165, avatar: "🐼" },
//     { rank: 8, name: "Lisa Anderson", level: 32, xp: 84000, streak: 150, avatar: "🦁" },
//     { rank: 9, name: "James Taylor", level: 31, xp: 80000, streak: 140, avatar: "🐯" },
//     { rank: 10, name: "You", level: 15, xp: 45000, streak: 7, avatar: "🎯", isCurrentUser: true },
//   ],
//   friends: [
//     { rank: 1, name: "Sarah Johnson", level: 36, xp: 105000, streak: 220, avatar: "🧝" },
//     { rank: 2, name: "Emma Wilson", level: 34, xp: 92000, streak: 180, avatar: "🐱" },
//     { rank: 3, name: "You", level: 15, xp: 45000, streak: 7, avatar: "🎯", isCurrentUser: true },
//     { rank: 4, name: "Tom Harris", level: 12, xp: 38000, streak: 5, avatar: "🐶" },
//     { rank: 5, name: "Nina Patel", level: 10, xp: 32000, streak: 3, avatar: "🦄" },
//   ],
//   weekly: [
//     { rank: 1, name: "Emma Wilson", level: 34, xp: 8500, streak: 7, avatar: "🐱" },
//     { rank: 2, name: "You", level: 15, xp: 7200, streak: 7, avatar: "🎯", isCurrentUser: true },
//     { rank: 3, name: "Sarah Johnson", level: 36, xp: 6800, streak: 7, avatar: "🧝" },
//     { rank: 4, name: "Tom Harris", level: 12, xp: 5500, streak: 6, avatar: "🐶" },
//     { rank: 5, name: "Nina Patel", level: 10, xp: 4200, streak: 5, avatar: "🦄" },
//   ],
// }

// export default function LeaderboardPage() {
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
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto">
//           {/* Header with Decorative Elements */}
//           <div className="mb-8 text-center md:text-left relative">
//             <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl" />
//             <div className="absolute -top-8 right-0 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-3xl" />
//             <div className="relative">
//               <div className="inline-flex items-center gap-2 mb-3">
//                 <Trophy className="w-10 h-10 text-amber-500" />
//                 <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
//                   Leaderboard
//                 </h1>
//                 <Trophy className="w-10 h-10 text-amber-500" />
//               </div>
//               <p className="text-lg md:text-xl text-muted-foreground font-medium">
//                 Compete with learners around the world 🌍
//               </p>
//             </div>
//           </div>

//           {/* Enhanced Stats Cards */}
//           <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
//             <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 dark:border-amber-900/50">
//               <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent" />
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
//               <CardContent className="pt-6 relative z-10">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <Trophy className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
//                       Global Rank
//                     </div>
//                     <div className="text-4xl font-black text-amber-600 dark:text-amber-500">#10</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 border-teal-200 dark:border-teal-900/50">
//               <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent" />
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
//               <CardContent className="pt-6 relative z-10">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <TrendingUp className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
//                       This Week
//                     </div>
//                     <div className="text-4xl font-black text-teal-600 dark:text-teal-400 flex items-center">
//                       +3
//                       <Zap className="w-6 h-6 ml-1 text-yellow-500" />
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-900/50">
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent" />
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
//               <CardContent className="pt-6 relative z-10">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <Users className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
//                       Total Players
//                     </div>
//                     <div className="text-4xl font-black text-purple-600 dark:text-purple-400">1.2M</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Enhanced Leaderboard Tabs */}
//           <Tabs defaultValue="global" className="w-full">
//             <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6 h-14 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1.5">
//               <TabsTrigger 
//                 value="global" 
//                 className="gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
//               >
//                 <Trophy className="w-5 h-5" />
//                 <span className="hidden sm:inline">Global</span>
//               </TabsTrigger>
//               <TabsTrigger 
//                 value="friends" 
//                 className="gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
//               >
//                 <Users className="w-5 h-5" />
//                 <span className="hidden sm:inline">Friends</span>
//               </TabsTrigger>
//               <TabsTrigger 
//                 value="weekly" 
//                 className="gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
//               >
//                 <TrendingUp className="w-5 h-5" />
//                 <span className="hidden sm:inline">This Week</span>
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="global">
//               <Card className="border-2 border-amber-100 dark:border-amber-900/30 shadow-xl">
//                 <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-b-2 border-amber-200 dark:border-amber-900/50">
//                   <CardTitle className="text-2xl font-bold flex items-center gap-2">
//                     <Star className="w-6 h-6 text-amber-500" />
//                     Global Rankings
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                   <div className="space-y-3">
//                     {leaderboardData.global.map((player) => (
//                       <LeaderboardRow key={player.rank} player={player} />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="friends">
//               <Card className="border-2 border-teal-100 dark:border-teal-900/30 shadow-xl">
//                 <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-b-2 border-teal-200 dark:border-teal-900/50">
//                   <CardTitle className="text-2xl font-bold flex items-center gap-2">
//                     <Users className="w-6 h-6 text-teal-500" />
//                     Friends Rankings
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                   <div className="space-y-3">
//                     {leaderboardData.friends.map((player) => (
//                       <LeaderboardRow key={player.rank} player={player} />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="weekly">
//               <Card className="border-2 border-purple-100 dark:border-purple-900/30 shadow-xl">
//                 <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b-2 border-purple-200 dark:border-purple-900/50">
//                   <CardTitle className="text-2xl font-bold flex items-center gap-2">
//                     <TrendingUp className="w-6 h-6 text-purple-500" />
//                     Weekly Rankings
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                   <div className="space-y-3">
//                     {leaderboardData.weekly.map((player) => (
//                       <LeaderboardRow key={player.rank} player={player} />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   )
// }

// function LeaderboardRow({ player }: { player: any }) {
//   const getRankIcon = (rank: number) => {
//     if (rank === 1) return (
//       <div className="relative">
//         <Crown className="w-8 h-8 text-amber-500 drop-shadow-lg animate-pulse" />
//         <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full" />
//       </div>
//     )
//     if (rank === 2) return (
//       <div className="relative">
//         <Medal className="w-8 h-8 text-gray-400 drop-shadow-lg" />
//         <div className="absolute inset-0 bg-gray-400/30 blur-xl rounded-full" />
//       </div>
//     )
//     if (rank === 3) return (
//       <div className="relative">
//         <Award className="w-8 h-8 text-orange-600 drop-shadow-lg" />
//         <div className="absolute inset-0 bg-orange-400/30 blur-xl rounded-full" />
//       </div>
//     )
//     return (
//       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center font-black text-lg shadow-md">
//         {rank}
//       </div>
//     )
//   }

//   const getRankBg = (rank: number) => {
//     if (rank === 1) return "bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-amber-950/40 border-2 border-amber-300 dark:border-amber-700/50 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30"
//     if (rank === 2) return "bg-gradient-to-r from-gray-100 via-slate-50 to-gray-100 dark:from-slate-800/40 dark:via-slate-700/30 dark:to-slate-800/40 border-2 border-gray-300 dark:border-slate-600/50 shadow-lg shadow-gray-200/50 dark:shadow-slate-900/30"
//     if (rank === 3) return "bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-orange-950/40 border-2 border-orange-300 dark:border-orange-700/50 shadow-lg shadow-orange-200/50 dark:shadow-orange-900/30"
//     return "bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
//   }

//   return (
//     <div
//       className={`flex items-center justify-between p-4 md:p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
//         player.isCurrentUser
//           ? "bg-gradient-to-r from-teal-100 via-cyan-50 to-teal-100 dark:from-teal-950/50 dark:via-cyan-950/40 dark:to-teal-950/50 border-3 border-teal-400 dark:border-teal-600 shadow-xl shadow-teal-200/50 dark:shadow-teal-900/30 ring-2 ring-teal-300 dark:ring-teal-700"
//           : getRankBg(player.rank)
//       }`}
//     >
//       <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
//         {/* Rank */}
//         <div className="w-12 md:w-14 flex items-center justify-center flex-shrink-0">
//           {getRankIcon(player.rank)}
//         </div>

//         {/* Avatar */}
//         <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-lg flex-shrink-0 ${
//           player.rank <= 3 
//             ? "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 ring-4 ring-amber-300/50 dark:ring-amber-700/50" 
//             : "bg-gradient-to-br from-teal-400 to-cyan-600 ring-2 ring-teal-300/50 dark:ring-teal-700/50"
//         }`}>
//           {player.avatar}
//         </div>

//         {/* Player Info */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-1">
//             <span className="font-bold text-lg md:text-xl truncate">
//               {player.name}
//             </span>
//             {player.isCurrentUser && (
//               <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold px-2 py-0.5 text-xs shadow-md flex-shrink-0">
//                 YOU
//               </Badge>
//             )}
//             {player.rank <= 3 && (
//               <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-500 fill-amber-500 flex-shrink-0" />
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <Badge variant="outline" className="text-xs font-semibold bg-white/50 dark:bg-slate-900/50">
//               Level {player.level}
//             </Badge>
//             <div className="md:hidden flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400">
//               <Flame className="w-3 h-3" />
//               {player.streak}
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
//           <div className="text-center min-w-[80px]">
//             <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
//               XP
//             </div>
//             <div className="font-black text-lg text-teal-600 dark:text-teal-400">
//               {player.xp.toLocaleString()}
//             </div>
//           </div>
//           <div className="text-center min-w-[80px]">
//             <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
//               Streak
//             </div>
//             <div className="font-black text-lg text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
//               <Flame className="w-5 h-5" />
//               {player.streak}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import TopBar from "@/components/top-bar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Trophy, TrendingUp, Users, Crown, Medal, Award, Flame, Star } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import { leaderboardAPI } from "@/lib/api-service"

// interface LeaderboardPlayer {
//   rank: number
//   userId: string
//   username: string
//   avatar: {
//     name?: string
//     iconUrl?: string
//     rarity?: string
//   } | null
//   xp: number
//   level: number
//   isCurrentUser?: boolean
//   currentStreak?: number
// }

// interface LeaderboardResponse {
//   leaderboard: LeaderboardPlayer[]
//   currentUserRank: number | null
// }

// export default function LeaderboardPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()

//   const [globalLeaderboard, setGlobalLeaderboard] = useState<LeaderboardPlayer[]>([])
//   const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardPlayer[]>([])
//   const [currentUserRankGlobal, setCurrentUserRankGlobal] = useState<number | null>(null)
//   const [currentUserRankWeekly, setCurrentUserRankWeekly] = useState<number | null>(null)
//   const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   useEffect(() => {
//     if (!user) return

//     const fetchLeaderboards = async () => {
//       try {
//         setIsLoadingLeaderboard(true)
//         setError(null)

//         const [globalRes, weeklyRes] = await Promise.all([
//           leaderboardAPI.getGlobal(100),
//           leaderboardAPI.getWeekly(100)
//         ])

//         // Process global leaderboard
//         if (globalRes?.leaderboard && Array.isArray(globalRes.leaderboard)) {
//           const processedGlobal = globalRes.leaderboard.map((player: any) => ({
//             rank: player.rank,
//             userId: player.userId,
//             username: player.username,
//             avatar: player.avatar || null,
//             xp: player.totalXp || 0,
//             level: player.level || 1,
//             currentStreak: player.currentStreak || 0,
//             isCurrentUser: player.userId === user.id,
//           }))
//           setGlobalLeaderboard(processedGlobal)
//           setCurrentUserRankGlobal(globalRes.currentUserRank || null)
//         }

//         // Process weekly leaderboard
//         if (weeklyRes?.leaderboard && Array.isArray(weeklyRes.leaderboard)) {
//           const processedWeekly = weeklyRes.leaderboard.map((player: any) => ({
//             rank: player.rank,
//             userId: player.userId,
//             username: player.username,
//             avatar: player.avatar || null,
//             xp: player.weeklyXp || 0,
//             level: player.level || 1,
//             currentStreak: player.currentStreak || 0,
//             isCurrentUser: player.userId === user.id,
//           }))
//           setWeeklyLeaderboard(processedWeekly)
//           setCurrentUserRankWeekly(weeklyRes.currentUserRank || null)
//         }
//       } catch (err) {
//         console.error("Failed to fetch leaderboard:", err)
//         setError(err instanceof Error ? err.message : "Failed to load leaderboard")
//       } finally {
//         setIsLoadingLeaderboard(false)
//       }
//     }

//     fetchLeaderboards()
//   }, [user])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-8">
//             <div className="flex items-center gap-2 mb-2">
//               <Trophy className="w-8 h-8 text-amber-500" />
//               <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                 Leaderboard
//               </h1>
//             </div>
//             <p className="text-base text-gray-600 dark:text-gray-400">
//               Compete with learners around the world
//             </p>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
//               <p className="text-red-700 dark:text-red-300">{error}</p>
//             </div>
//           )}

//           <div className="grid md:grid-cols-3 gap-4 mb-8">
//             <Card className="border-2 border-amber-200 dark:border-amber-900">
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
//                     <Trophy className="w-7 h-7 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
//                       Global Rank
//                     </div>
//                     <div className="text-3xl font-semibold text-amber-600 dark:text-amber-500">
//                       #{isLoadingLeaderboard ? "..." : currentUserRankGlobal || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-2 border-teal-200 dark:border-teal-900">
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
//                     <TrendingUp className="w-7 h-7 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
//                       Weekly Rank
//                     </div>
//                     <div className="text-3xl font-semibold text-teal-600 dark:text-teal-400">
//                       #{isLoadingLeaderboard ? "..." : currentUserRankWeekly || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-2 border-purple-200 dark:border-purple-900">
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
//                     <Users className="w-7 h-7 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
//                       Total Players
//                     </div>
//                     <div className="text-3xl font-semibold text-purple-600 dark:text-purple-400">
//                       {isLoadingLeaderboard ? "..." : globalLeaderboard.length > 0 ? "1.2M+" : "0"}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Tabs defaultValue="global" className="w-full">
//             <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 mb-6 h-12 bg-white dark:bg-slate-800 p-1">
//               <TabsTrigger 
//                 value="global" 
//                 className="gap-2 text-sm font-medium data-[state=active]:bg-amber-500 data-[state=active]:text-white"
//               >
//                 <Trophy className="w-4 h-4" />
//                 <span className="hidden sm:inline">Global</span>
//               </TabsTrigger>
//               <TabsTrigger 
//                 value="weekly" 
//                 className="gap-2 text-sm font-medium data-[state=active]:bg-purple-500 data-[state=active]:text-white"
//               >
//                 <TrendingUp className="w-4 h-4" />
//                 <span className="hidden sm:inline">This Week</span>
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="global">
//               <Card className="border-2 border-amber-100 dark:border-amber-900/30">
//                 <CardHeader className="bg-amber-50 dark:bg-amber-950/30 border-b">
//                   <CardTitle className="text-xl font-semibold flex items-center gap-2">
//                     <Star className="w-5 h-5 text-amber-500" />
//                     Global Rankings
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                   {isLoadingLeaderboard ? (
//                     <div className="flex justify-center items-center h-32">
//                       <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
//                     </div>
//                   ) : globalLeaderboard.length > 0 ? (
//                     <div className="space-y-3">
//                       {globalLeaderboard.map((player) => (
//                         <LeaderboardRow key={player.rank} player={player} />
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-center text-gray-500 dark:text-gray-400">No data available</p>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="weekly">
//               <Card className="border-2 border-purple-100 dark:border-purple-900/30">
//                 <CardHeader className="bg-purple-50 dark:bg-purple-950/30 border-b">
//                   <CardTitle className="text-xl font-semibold flex items-center gap-2">
//                     <TrendingUp className="w-5 h-5 text-purple-500" />
//                     Weekly Rankings
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                   {isLoadingLeaderboard ? (
//                     <div className="flex justify-center items-center h-32">
//                       <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
//                     </div>
//                   ) : weeklyLeaderboard.length > 0 ? (
//                     <div className="space-y-3">
//                       {weeklyLeaderboard.map((player) => (
//                         <LeaderboardRow key={player.rank} player={player} />
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-center text-gray-500 dark:text-gray-400">No data available</p>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   )
// }

// function LeaderboardRow({ player }: { player: LeaderboardPlayer }) {
//   if (!player || !player.rank || !player.username) {
//     return null
//   }

//   const getRankIcon = (rank: number) => {
//     if (rank === 1) return <Crown className="w-7 h-7 text-amber-500" />
//     if (rank === 2) return <Medal className="w-7 h-7 text-gray-400" />
//     if (rank === 3) return <Award className="w-7 h-7 text-orange-600" />
//     return (
//       <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-slate-700 flex items-center justify-center font-semibold text-base">
//         {rank}
//       </div>
//     )
//   }

//   const getRankBg = (rank: number) => {
//     if (rank === 1) return "bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700"
//     if (rank === 2) return "bg-gray-50 dark:bg-slate-800/40 border-2 border-gray-300 dark:border-slate-600"
//     if (rank === 3) return "bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-300 dark:border-orange-700"
//     return "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
//   }

//   const rank = Number(player.rank) || 0
//   const level = Number(player.level) || 1
//   const xp = Number(player.xp) || 0
//   const streak = Number(player.currentStreak) || 0
//   const username = String(player.username || "Unknown")
  
//   // Handle avatar properly - it's now an object or null
//   const avatarDisplay = player.avatar?.iconUrl 
//     ? player.avatar.iconUrl 
//     : "🎯"

//   return (
//     <div
//       className={`flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md ${
//         player.isCurrentUser
//           ? "bg-teal-50 dark:bg-teal-950/50 border-2 border-teal-400 dark:border-teal-600"
//           : getRankBg(rank)
//       }`}
//     >
//       <div className="flex items-center gap-4 flex-1 min-w-0">
//         <div className="w-12 flex items-center justify-center flex-shrink-0">
//           {getRankIcon(rank)}
//         </div>

//         <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md flex-shrink-0 ${
//           rank <= 3 
//             ? "bg-gradient-to-br from-amber-400 to-orange-500" 
//             : "bg-gradient-to-br from-teal-400 to-cyan-600"
//         }`}>
//           {avatarDisplay.startsWith('http') ? (
//             <img src={avatarDisplay} alt={player.avatar?.name || 'avatar'} className="w-full h-full rounded-xl object-cover" />
//           ) : (
//             avatarDisplay
//           )}
//         </div>

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-1">
//             <span className="font-semibold text-base truncate">
//               {username}
//             </span>
//             {player.isCurrentUser && (
//               <Badge className="bg-teal-500 text-white font-semibold px-2 py-0 text-xs flex-shrink-0">
//                 YOU
//               </Badge>
//             )}
//           </div>
//           <Badge variant="outline" className="text-xs font-medium">
//             Level {level}
//           </Badge>
//         </div>

//         <div className="hidden md:flex items-center gap-8 flex-shrink-0">
//           <div className="text-center min-w-[80px]">
//             <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase mb-1">
//               XP
//             </div>
//             <div className="font-semibold text-base text-teal-600 dark:text-teal-400">
//               {xp.toLocaleString()}
//             </div>
//           </div>
//           {streak > 0 && (
//             <div className="text-center min-w-[80px]">
//               <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase mb-1">
//                 Streak
//               </div>
//               <div className="font-semibold text-base text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
//                 <Flame className="w-4 h-4" />
//                 {streak}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import TopBar from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, Users, Crown, Medal, Award, Flame, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { leaderboardAPI } from "@/lib/api-service"

interface LeaderboardPlayer {
  rank: number
  userId: string
  username: string
  avatar: {
    name?: string
    iconUrl?: string
    rarity?: string
  } | null
  xp: number
  level: number
  isCurrentUser?: boolean
  currentStreak?: number
}

interface LeaderboardResponse {
  leaderboard: LeaderboardPlayer[]
  currentUserRank: number | null
}

export default function LeaderboardPage() {
  const { user, isLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()

  const [globalLeaderboard, setGlobalLeaderboard] = useState<LeaderboardPlayer[]>([])
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardPlayer[]>([])
  const [currentUserRankGlobal, setCurrentUserRankGlobal] = useState<number | null>(null)
  const [currentUserRankWeekly, setCurrentUserRankWeekly] = useState<number | null>(null)
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (!user) return

    const fetchLeaderboards = async () => {
      try {
        setIsLoadingLeaderboard(true)
        setError(null)

        const [globalRes, weeklyRes] = await Promise.all([
          leaderboardAPI.getGlobal(100),
          leaderboardAPI.getWeekly(100)
        ])

        // Process global leaderboard
        if (globalRes?.leaderboard && Array.isArray(globalRes.leaderboard)) {
          const processedGlobal = globalRes.leaderboard.map((player: any) => ({
            rank: player.rank,
            userId: player.userId,
            username: player.username,
            avatar: player.avatar || null,
            xp: player.totalXp || 0,
            level: player.level || 1,
            currentStreak: player.currentStreak || 0,
            isCurrentUser: player.userId === user.id,
          }))
          setGlobalLeaderboard(processedGlobal)
          setCurrentUserRankGlobal(globalRes.currentUserRank || null)
        }

        // Process weekly leaderboard
        if (weeklyRes?.leaderboard && Array.isArray(weeklyRes.leaderboard)) {
          const processedWeekly = weeklyRes.leaderboard.map((player: any) => ({
            rank: player.rank,
            userId: player.userId,
            username: player.username,
            avatar: player.avatar || null,
            xp: player.weeklyXp || 0,
            level: player.level || 1,
            currentStreak: player.currentStreak || 0,
            isCurrentUser: player.userId === user.id,
          }))
          setWeeklyLeaderboard(processedWeekly)
          setCurrentUserRankWeekly(weeklyRes.currentUserRank || null)
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err)
        setError(err instanceof Error ? err.message : "Failed to load leaderboard")
      } finally {
        setIsLoadingLeaderboard(false)
      }
    }

    fetchLeaderboards()
  }, [user])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 dark:from-amber-600 dark:via-orange-600 dark:to-red-600 flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                Leaderboard
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
              Compete with learners around the world 🌍
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-2 border-amber-200 dark:border-amber-700/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/30 shadow-lg dark:shadow-amber-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 flex items-center justify-center shadow-md">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-600 dark:text-amber-300/80 uppercase tracking-wide mb-1">
                      Global Rank
                    </div>
                    <div className="text-3xl font-semibold text-amber-600 dark:text-amber-400">
                      #{isLoadingLeaderboard ? "..." : currentUserRankGlobal || "N/A"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 dark:border-teal-700/50 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/40 dark:to-cyan-900/30 shadow-lg dark:shadow-teal-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 flex items-center justify-center shadow-md">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-600 dark:text-teal-300/80 uppercase tracking-wide mb-1">
                      Weekly Rank
                    </div>
                    <div className="text-3xl font-semibold text-teal-600 dark:text-teal-400">
                      #{isLoadingLeaderboard ? "..." : currentUserRankWeekly || "N/A"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-700/50 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/30 shadow-lg dark:shadow-purple-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 flex items-center justify-center shadow-md">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-600 dark:text-purple-300/80 uppercase tracking-wide mb-1">
                      Total Players
                    </div>
                    <div className="text-3xl font-semibold text-purple-600 dark:text-purple-400">
                      {isLoadingLeaderboard ? "..." : globalLeaderboard.length > 0 ? "1.2M+" : "0"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="global" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 mb-8 h-14 bg-white dark:bg-slate-700 p-1.5 shadow-lg rounded-xl border-2 border-gray-200 dark:border-slate-600">
              <TabsTrigger 
                value="global" 
                className="gap-2 text-base font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:text-gray-300 dark:data-[state=active]:from-amber-600 dark:data-[state=active]:to-orange-600 transition-all"
              >
                <Trophy className="w-5 h-5" />
                <span>Global</span>
              </TabsTrigger>
              <TabsTrigger 
                value="weekly" 
                className="gap-2 text-base font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:text-gray-300 dark:data-[state=active]:from-teal-600 dark:data-[state=active]:to-cyan-600 transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                <span>This Week</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="global">
              <Card className="border-2 border-amber-200 dark:border-amber-600/60 bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-800/40 dark:to-orange-800/30 shadow-lg">
                <CardHeader className="bg-amber-100/50 dark:bg-amber-800/50 border-b border-amber-200 dark:border-amber-600/50">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-amber-50">
                    <Star className="w-5 h-5 text-amber-600 dark:text-amber-300" />
                    Global Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {isLoadingLeaderboard ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : globalLeaderboard.length > 0 ? (
                    <div className="space-y-3">
                      {globalLeaderboard.map((player) => (
                        <LeaderboardRow key={player.rank} player={player} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No data available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly">
              <Card className="border-2 border-teal-200 dark:border-teal-600/60 bg-gradient-to-br from-teal-50/80 to-cyan-50/50 dark:from-teal-800/40 dark:to-cyan-800/30 shadow-lg">
                <CardHeader className="bg-teal-100/50 dark:bg-teal-800/50 border-b border-teal-200 dark:border-teal-600/50">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-teal-50">
                    <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-300" />
                    Weekly Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {isLoadingLeaderboard ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : weeklyLeaderboard.length > 0 ? (
                    <div className="space-y-3">
                      {weeklyLeaderboard.map((player) => (
                        <LeaderboardRow key={player.rank} player={player} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No data available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function LeaderboardRow({ player }: { player: LeaderboardPlayer }) {
  if (!player || !player.rank || !player.username) {
    return null
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-8 h-8 text-amber-500" />
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />
    if (rank === 3) return <Award className="w-8 h-8 text-orange-600" />
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-slate-700 flex items-center justify-center font-semibold text-lg">
        {rank}
      </div>
    )
  }

  const getRankBg = (rank: number) => {
    if (rank === 1) return "bg-amber-50 dark:bg-amber-800/60 border-2 border-amber-300 dark:border-amber-500/70 shadow-sm"
    if (rank === 2) return "bg-gray-50 dark:bg-slate-600/60 border-2 border-gray-300 dark:border-slate-400/70 shadow-sm"
    if (rank === 3) return "bg-orange-50 dark:bg-orange-800/60 border-2 border-orange-300 dark:border-orange-500/70 shadow-sm"
    return "bg-white dark:bg-slate-700/70 border border-gray-200 dark:border-slate-500/50"
  }

  const rank = Number(player.rank) || 0
  const level = Number(player.level) || 1
  const xp = Number(player.xp) || 0
  const streak = Number(player.currentStreak) || 0
  const username = String(player.username || "Unknown")
  
  // Handle avatar properly - it's now an object or null
  const avatarDisplay = player.avatar?.iconUrl 
    ? player.avatar.iconUrl 
    : "🎯"

  return (
    <div
      className={`flex items-center justify-between p-5 rounded-xl transition-all hover:shadow-lg ${
        player.isCurrentUser
          ? "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-700/70 dark:to-cyan-700/60 border-2 border-teal-400 dark:border-teal-400/80 shadow-md"
          : getRankBg(rank)
      }`}
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className="w-14 flex items-center justify-center flex-shrink-0">
          {getRankIcon(rank)}
        </div>

        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md flex-shrink-0 ${
          rank <= 3 
            ? "bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600" 
            : "bg-gradient-to-br from-teal-400 to-cyan-600 dark:from-teal-500 dark:to-cyan-700"
        }`}>
          {avatarDisplay.startsWith('http') ? (
            <img src={avatarDisplay} alt={player.avatar?.name || 'avatar'} className="w-full h-full rounded-xl object-cover" />
          ) : (
            avatarDisplay
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-lg truncate text-gray-900 dark:text-gray-50">
              {username}
            </span>
            {player.isCurrentUser && (
              <Badge className="bg-teal-500 dark:bg-teal-600 text-white font-semibold px-2 py-0 text-xs flex-shrink-0 shadow-sm">
                YOU
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs font-medium border-gray-300 dark:border-gray-400 text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-slate-600/50">
            Level {level}
          </Badge>
        </div>

        <div className="hidden md:flex items-center gap-10 flex-shrink-0">
          <div className="text-center min-w-[90px]">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase mb-1">
              XP
            </div>
            <div className="font-semibold text-lg text-teal-600 dark:text-teal-300">
              {xp.toLocaleString()}
            </div>
          </div>
          {streak > 0 && (
            <div className="text-center min-w-[90px]">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase mb-1">
                Streak
              </div>
              <div className="font-semibold text-lg text-orange-600 dark:text-orange-300 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5" />
                {streak}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}