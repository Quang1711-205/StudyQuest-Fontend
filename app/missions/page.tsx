// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Target, Calendar, Trophy, Gift, CheckCircle2, Clock } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

// // Mock missions data
// const missionsData = {
//   daily: [
//     {
//       id: 1,
//       title: "Complete 3 Lessons",
//       description: "Finish any 3 lessons today",
//       progress: 1,
//       target: 3,
//       rewards: { coins: 50, gems: 5, xp: 100 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//     {
//       id: 2,
//       title: "Practice Speaking",
//       description: "Complete 1 speaking practice session",
//       progress: 0,
//       target: 1,
//       rewards: { coins: 30, gems: 3, xp: 60 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//     {
//       id: 3,
//       title: "Earn 200 XP",
//       description: "Gain 200 XP from any activities",
//       progress: 120,
//       target: 200,
//       rewards: { coins: 40, gems: 4, xp: 0 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//   ],
//   weekly: [
//     {
//       id: 4,
//       title: "Complete 15 Lessons",
//       description: "Finish 15 lessons this week",
//       progress: 8,
//       target: 15,
//       rewards: { coins: 200, gems: 20, xp: 500 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//     {
//       id: 5,
//       title: "Practice All Skills",
//       description: "Complete at least 1 practice in each skill",
//       progress: 3,
//       target: 4,
//       rewards: { coins: 150, gems: 15, xp: 400 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//     {
//       id: 6,
//       title: "Maintain 7-Day Streak",
//       description: "Log in and complete activities for 7 days",
//       progress: 5,
//       target: 7,
//       rewards: { coins: 300, gems: 30, xp: 600 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//   ],
// }

// export default function MissionsPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()
//   const [missions, setMissions] = useState(missionsData)

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

//   const handleClaimReward = (missionId: number, type: "daily" | "weekly") => {
//     setMissions((prev) => ({
//       ...prev,
//       [type]: prev[type].map((mission) => (mission.id === missionId ? { ...mission, isClaimed: true } : mission)),
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       {/* <main className="md:ml-20 min-[1200px]:ml-96 mt-16 p-8 transition-all duration-300"> */}
//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold mb-2">Missions</h1>
//             <p className="text-muted-foreground text-lg">Complete missions to earn rewards and level up faster</p>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid md:grid-cols-3 gap-4 mb-8">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
//                     <Target className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Active Missions</div>
//                     <div className="text-2xl font-bold">6</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
//                     <CheckCircle2 className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Completed Today</div>
//                     <div className="text-2xl font-bold">2</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-pink-600 flex items-center justify-center">
//                     <Gift className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Rewards Claimed</div>
//                     <div className="text-2xl font-bold">12</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Daily Missions */}
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <Calendar className="w-6 h-6 text-primary" />
//               <h2 className="text-2xl font-bold">Daily Missions</h2>
//               <Badge variant="secondary">Resets in 23h 45m</Badge>
//             </div>

//             <div className="space-y-4">
//               {missions.daily.map((mission) => (
//                 <MissionCard
//                   key={mission.id}
//                   mission={mission}
//                   onClaim={() => handleClaimReward(mission.id, "daily")}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Weekly Missions */}
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <Trophy className="w-6 h-6 text-accent" />
//               <h2 className="text-2xl font-bold">Weekly Missions</h2>
//               <Badge variant="secondary">Resets in 5d 12h</Badge>
//             </div>

//             <div className="space-y-4">
//               {missions.weekly.map((mission) => (
//                 <MissionCard
//                   key={mission.id}
//                   mission={mission}
//                   onClaim={() => handleClaimReward(mission.id, "weekly")}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// function MissionCard({ mission, onClaim }: { mission: any; onClaim: () => void }) {
//   const progressPercent = (mission.progress / mission.target) * 100
//   const isComplete = mission.progress >= mission.target

//   return (
//     <Card className={`border-2 ${isComplete && !mission.isClaimed ? "border-success" : ""}`}>
//       <CardContent className="p-6">
//         <div className="flex items-start justify-between gap-4">
//           {/* Mission Info */}
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-2">
//               <h3 className="text-xl font-bold">{mission.title}</h3>
//               {isComplete && !mission.isClaimed && <Badge className="bg-success">Complete!</Badge>}
//               {mission.isClaimed && <Badge variant="outline">Claimed</Badge>}
//             </div>
//             <p className="text-muted-foreground mb-4">{mission.description}</p>

//             {/* Progress */}
//             <div className="space-y-2 mb-4">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">Progress</span>
//                 <span className="font-semibold">
//                   {mission.progress} / {mission.target}
//                 </span>
//               </div>
//               <Progress value={progressPercent} className="h-2" />
//             </div>

//             {/* Rewards */}
//             <div className="flex items-center gap-4 text-sm">
//               <span className="text-muted-foreground">Rewards:</span>
//               {mission.rewards.coins > 0 && (
//                 <div className="flex items-center gap-1">
//                   <span className="font-bold text-accent">{mission.rewards.coins}</span>
//                   <span className="text-muted-foreground">coins</span>
//                 </div>
//               )}
//               {mission.rewards.gems > 0 && (
//                 <div className="flex items-center gap-1">
//                   <span className="font-bold text-secondary">{mission.rewards.gems}</span>
//                   <span className="text-muted-foreground">gems</span>
//                 </div>
//               )}
//               {mission.rewards.xp > 0 && (
//                 <div className="flex items-center gap-1">
//                   <span className="font-bold text-success">{mission.rewards.xp}</span>
//                   <span className="text-muted-foreground">XP</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Action Button */}
//           <div className="flex flex-col items-end gap-2">
//             {isComplete && !mission.isClaimed ? (
//               <Button onClick={onClaim} className="bg-success hover:bg-success/90">
//                 <Gift className="w-4 h-4 mr-2" />
//                 Claim
//               </Button>
//             ) : mission.isClaimed ? (
//               <Button disabled variant="outline">
//                 <CheckCircle2 className="w-4 h-4 mr-2" />
//                 Claimed
//               </Button>
//             ) : (
//               <Button disabled variant="outline">
//                 In Progress
//               </Button>
//             )}

//             <div className="flex items-center gap-1 text-xs text-muted-foreground">
//               <Clock className="w-3 h-3" />
//               {mission.expiresIn}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Target, Calendar, Trophy, Gift, CheckCircle2, Clock } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

// // Mock missions data
// const missionsData = {
//   daily: [
//     {
//       id: 1,
//       title: "Complete 3 Lessons",
//       description: "Finish any 3 lessons today",
//       progress: 1,
//       target: 3,
//       rewards: { coins: 50, gems: 5, xp: 100 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//     {
//       id: 2,
//       title: "Practice Speaking",
//       description: "Complete 1 speaking practice session",
//       progress: 0,
//       target: 1,
//       rewards: { coins: 30, gems: 3, xp: 60 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//     {
//       id: 3,
//       title: "Earn 200 XP",
//       description: "Gain 200 XP from any activities",
//       progress: 120,
//       target: 200,
//       rewards: { coins: 40, gems: 4, xp: 0 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//   ],
//   weekly: [
//     {
//       id: 4,
//       title: "Complete 15 Lessons",
//       description: "Finish 15 lessons this week",
//       progress: 8,
//       target: 15,
//       rewards: { coins: 200, gems: 20, xp: 500 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//     {
//       id: 5,
//       title: "Practice All Skills",
//       description: "Complete at least 1 practice in each skill",
//       progress: 3,
//       target: 4,
//       rewards: { coins: 150, gems: 15, xp: 400 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//     {
//       id: 6,
//       title: "Maintain 7-Day Streak",
//       description: "Log in and complete activities for 7 days",
//       progress: 5,
//       target: 7,
//       rewards: { coins: 300, gems: 30, xp: 350 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//   ],
// }

// export default function MissionsPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()
//   const [missions, setMissions] = useState(missionsData)

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

//   const handleClaimReward = (missionId: number, type: "daily" | "weekly") => {
//     setMissions((prev) => ({
//       ...prev,
//       [type]: prev[type].map((mission) => (mission.id === missionId ? { ...mission, isClaimed: true } : mission)),
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white">🎯 Missions</h1>
//             <p className="text-base text-slate-600 dark:text-slate-400">
//               Complete missions to earn rewards and level up faster
//             </p>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid md:grid-cols-3 gap-4 mb-8">
//             <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
//               <CardContent className="pt-5 pb-5">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-md">
//                     <span className="text-2xl">🎯</span>
//                   </div>
//                   <div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-0.5">Active Missions</div>
//                     <div className="text-2xl font-bold text-slate-900 dark:text-white">6</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
//               <CardContent className="pt-5 pb-5">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-md">
//                     <span className="text-2xl">✅</span>
//                   </div>
//                   <div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-0.5">Completed Today</div>
//                     <div className="text-2xl font-bold text-slate-900 dark:text-white">2</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
//               <CardContent className="pt-5 pb-5">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-md">
//                     <span className="text-2xl">🎁</span>
//                   </div>
//                   <div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-0.5">Rewards Claimed</div>
//                     <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Daily Missions */}
//           <div className="mb-8">
//             <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
//               <div className="flex items-center gap-3 flex-1">
//                 <span className="text-2xl">📅</span>
//                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Daily Missions</h2>
//               </div>
//               <Badge className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium px-3 py-1 text-xs w-fit border-0">
//                 🕐 Resets in 23h 45m
//               </Badge>
//             </div>

//             <div className="space-y-4">
//               {missions.daily.map((mission) => (
//                 <MissionCard
//                   key={mission.id}
//                   mission={mission}
//                   onClaim={() => handleClaimReward(mission.id, "daily")}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Weekly Missions */}
//           <div>
//             <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
//               <div className="flex items-center gap-3 flex-1">
//                 <span className="text-2xl">📆</span>
//                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Weekly Missions</h2>
//               </div>
//               <Badge className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium px-3 py-1 text-xs w-fit border-0">
//                 🕐 Resets in 5d 12h
//               </Badge>
//             </div>

//             <div className="space-y-4">
//               {missions.weekly.map((mission) => (
//                 <MissionCard
//                   key={mission.id}
//                   mission={mission}
//                   onClaim={() => handleClaimReward(mission.id, "weekly")}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// function MissionCard({ mission, onClaim }: { mission: any; onClaim: () => void }) {
//   const progressPercent = (mission.progress / mission.target) * 100
//   const isComplete = mission.progress >= mission.target

//   return (
//     <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700 overflow-hidden relative">
//       <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
//       <CardContent className="p-5 md:p-6">
//         <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//           {/* Mission Info */}
//           <div className="flex-1">
//             <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
//               <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{mission.title}</h3>
//               <Badge className="bg-blue-500 hover:bg-blue-500 text-white font-semibold px-3 py-0.5 text-xs w-fit border-0">
//                 In Progress
//               </Badge>
//             </div>
//             <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{mission.description}</p>

//             {/* Progress */}
//             <div className="space-y-2 mb-4">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-slate-600 dark:text-slate-400 font-medium">Progress</span>
//                 <span className="font-bold text-slate-900 dark:text-white">
//                   {mission.progress} / {mission.target}
//                 </span>
//               </div>
//               <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
//                   style={{ width: `${progressPercent}%` }}
//                 />
//               </div>
//             </div>

//             {/* Rewards */}
//             <div className="flex flex-wrap items-center gap-2 text-sm">
//               <span className="text-slate-600 dark:text-slate-400 font-medium">Rewards:</span>
//               {mission.rewards.coins > 0 && (
//                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
//                   <span className="text-base">🪙</span>
//                   <span className="font-semibold text-slate-900 dark:text-white">{mission.rewards.coins} coins</span>
//                 </div>
//               )}
//               {mission.rewards.gems > 0 && (
//                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
//                   <span className="text-base">💎</span>
//                   <span className="font-semibold text-slate-900 dark:text-white">{mission.rewards.gems} gems</span>
//                 </div>
//               )}
//               {mission.rewards.xp > 0 && (
//                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
//                   <span className="text-base">⭐</span>
//                   <span className="font-semibold text-emerald-600 dark:text-emerald-400">{mission.rewards.xp} XP</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Action Button - Right Side */}
//           <div className="flex flex-row md:flex-col items-start md:items-end gap-2 md:min-w-[140px]">
//             <Badge variant="outline" className="font-medium px-3 py-1 text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 w-fit md:ml-auto">
//               In Progress
//             </Badge>
            
//             <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium md:ml-auto">
//               <Clock className="w-3 h-3" />
//               🕐 {mission.expiresIn}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

//1
// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Target, Calendar, Trophy, Gift, CheckCircle2, Clock } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

// // Mock missions data
// const missionsData = {
//   daily: [
//     {
//       id: 1,
//       title: "Complete 3 Lessons",
//       description: "Finish any 3 lessons today",
//       progress: 1,
//       target: 3,
//       rewards: { coins: 50, gems: 5, xp: 100 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//     {
//       id: 2,
//       title: "Practice Speaking",
//       description: "Complete 1 speaking practice session",
//       progress: 0,
//       target: 1,
//       rewards: { coins: 30, gems: 3, xp: 60 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//     {
//       id: 3,
//       title: "Earn 200 XP",
//       description: "Gain 200 XP from any activities",
//       progress: 120,
//       target: 200,
//       rewards: { coins: 40, gems: 4, xp: 0 },
//       isClaimed: false,
//       expiresIn: "23h 45m",
//     },
//   ],
//   weekly: [
//     {
//       id: 4,
//       title: "Complete 15 Lessons",
//       description: "Finish 15 lessons this week",
//       progress: 8,
//       target: 15,
//       rewards: { coins: 200, gems: 20, xp: 500 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//     {
//       id: 5,
//       title: "Practice All Skills",
//       description: "Complete at least 1 practice in each skill",
//       progress: 3,
//       target: 4,
//       rewards: { coins: 150, gems: 15, xp: 400 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//     {
//       id: 6,
//       title: "Maintain 7-Day Streak",
//       description: "Log in and complete activities for 7 days",
//       progress: 5,
//       target: 7,
//       rewards: { coins: 300, gems: 30, xp: 350 },
//       isClaimed: false,
//       expiresIn: "5d 12h",
//     },
//   ],
// }

// export default function MissionsPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()
//   const [missions, setMissions] = useState(missionsData)

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

//   const handleClaimReward = (missionId: number, type: "daily" | "weekly") => {
//     setMissions((prev) => ({
//       ...prev,
//       [type]: prev[type].map((mission) => (mission.id === missionId ? { ...mission, isClaimed: true } : mission)),
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white">🎯 Missions</h1>
//             <p className="text-lg text-slate-600 dark:text-slate-400">
//               Complete missions to earn rewards and level up faster
//             </p>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid md:grid-cols-3 gap-4 mb-8">
//             <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
//               <CardContent className="pt-5 pb-5">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-md">
//                     <span className="text-2xl">🎯</span>
//                   </div>
//                   <div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-0.5">Active Missions</div>
//                     <div className="text-2xl font-bold text-slate-900 dark:text-white">6</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
//               <CardContent className="pt-5 pb-5">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-md">
//                     <span className="text-2xl">✅</span>
//                   </div>
//                   <div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-0.5">Completed Today</div>
//                     <div className="text-2xl font-bold text-slate-900 dark:text-white">2</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
//               <CardContent className="pt-5 pb-5">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-md">
//                     <span className="text-2xl">🎁</span>
//                   </div>
//                   <div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-0.5">Rewards Claimed</div>
//                     <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Daily Missions */}
//           <div className="mb-8">
//             <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
//               <div className="flex items-center gap-3 flex-1">
//                 <span className="text-2xl">📅</span>
//                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Daily Missions</h2>
//               </div>
//               <Badge className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium px-3 py-1 text-xs w-fit border-0">
//                 🕐 Resets in 23h 45m
//               </Badge>
//             </div>

//             <div className="space-y-4">
//               {missions.daily.map((mission) => (
//                 <MissionCard
//                   key={mission.id}
//                   mission={mission}
//                   onClaim={() => handleClaimReward(mission.id, "daily")}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Weekly Missions */}
//           <div>
//             <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
//               <div className="flex items-center gap-3 flex-1">
//                 <span className="text-2xl">📆</span>
//                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Weekly Missions</h2>
//               </div>
//               <Badge className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium px-3 py-1 text-xs w-fit border-0">
//                 🕐 Resets in 5d 12h
//               </Badge>
//             </div>

//             <div className="space-y-4">
//               {missions.weekly.map((mission) => (
//                 <MissionCard
//                   key={mission.id}
//                   mission={mission}
//                   onClaim={() => handleClaimReward(mission.id, "weekly")}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// function MissionCard({ mission, onClaim }: { mission: any; onClaim: () => void }) {
//   const progressPercent = (mission.progress / mission.target) * 100
//   const isComplete = mission.progress >= mission.target

//   return (
//     <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700 overflow-hidden relative">
//       <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
//       <CardContent className="p-5 md:p-6">
//         <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//           {/* Mission Info */}
//           <div className="flex-1">
//             <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
//               <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{mission.title}</h3>
//               <Badge className="bg-blue-500 hover:bg-blue-500 text-white font-semibold px-3 py-0.5 text-xs w-fit border-0">
//                 In Progress
//               </Badge>
//             </div>
//             <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{mission.description}</p>

//             {/* Progress */}
//             <div className="space-y-2 mb-4">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-slate-600 dark:text-slate-400 font-medium">Progress</span>
//                 <span className="font-bold text-slate-900 dark:text-white">
//                   {mission.progress} / {mission.target}
//                 </span>
//               </div>
//               <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
//                   style={{ width: `${progressPercent}%` }}
//                 />
//               </div>
//             </div>

//             {/* Rewards */}
//             <div className="flex flex-wrap items-center gap-2 text-sm">
//               <span className="text-slate-600 dark:text-slate-400 font-medium">Rewards:</span>
//               {mission.rewards.coins > 0 && (
//                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
//                   <span className="text-base">🪙</span>
//                   <span className="font-semibold text-slate-900 dark:text-white">{mission.rewards.coins} coins</span>
//                 </div>
//               )}
//               {mission.rewards.gems > 0 && (
//                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
//                   <span className="text-base">💎</span>
//                   <span className="font-semibold text-slate-900 dark:text-white">{mission.rewards.gems} gems</span>
//                 </div>
//               )}
//               {mission.rewards.xp > 0 && (
//                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
//                   <span className="text-base">⭐</span>
//                   <span className="font-semibold text-emerald-600 dark:text-emerald-400">{mission.rewards.xp} XP</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Action Button - Right Side */}
//           <div className="flex flex-row md:flex-col items-start md:items-end gap-2 md:min-w-[140px]">
//             <Badge variant="outline" className="font-medium px-3 py-1 text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 w-fit md:ml-auto">
//               In Progress
//             </Badge>
            
//             <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium md:ml-auto">
//               <Clock className="w-3 h-3" />
//               🕐 {mission.expiresIn}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Calendar, Trophy, Gift, CheckCircle2, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Mock missions data
const missionsData = {
  daily: [
    {
      id: 1,
      title: "Complete 3 Lessons",
      description: "Finish any 3 lessons today",
      progress: 1,
      target: 3,
      rewards: { coins: 50, gems: 5, xp: 100 },
      isClaimed: false,
      expiresIn: "23h 45m",
    },
    {
      id: 2,
      title: "Practice Speaking",
      description: "Complete 1 speaking practice session",
      progress: 0,
      target: 1,
      rewards: { coins: 30, gems: 3, xp: 60 },
      isClaimed: false,
      expiresIn: "23h 45m",
    },
    {
      id: 3,
      title: "Earn 200 XP",
      description: "Gain 200 XP from any activities",
      progress: 120,
      target: 200,
      rewards: { coins: 40, gems: 4, xp: 0 },
      isClaimed: false,
      expiresIn: "23h 45m",
    },
  ],
  weekly: [
    {
      id: 4,
      title: "Complete 15 Lessons",
      description: "Finish 15 lessons this week",
      progress: 8,
      target: 15,
      rewards: { coins: 200, gems: 20, xp: 500 },
      isClaimed: false,
      expiresIn: "5d 12h",
    },
    {
      id: 5,
      title: "Practice All Skills",
      description: "Complete at least 1 practice in each skill",
      progress: 3,
      target: 4,
      rewards: { coins: 150, gems: 15, xp: 400 },
      isClaimed: false,
      expiresIn: "5d 12h",
    },
    {
      id: 6,
      title: "Maintain 7-Day Streak",
      description: "Log in and complete activities for 7 days",
      progress: 5,
      target: 7,
      rewards: { coins: 300, gems: 30, xp: 350 },
      isClaimed: false,
      expiresIn: "5d 12h",
    },
  ],
}

export default function MissionsPage() {
  const { user, isLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()
  const [missions, setMissions] = useState(missionsData)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const handleClaimReward = (missionId: number, type: "daily" | "weekly") => {
    setMissions((prev) => ({
      ...prev,
      [type]: prev[type].map((mission) => (mission.id === missionId ? { ...mission, isClaimed: true } : mission)),
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-6 md:p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-black mb-2 text-slate-900 dark:text-white">🎯 Missions</h1>
            <p className="text-xl text-gray-600 font-medium">
              Complete missions to earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">rewards and level up faster</span> ✨
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-md">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-0.5">Active Missions</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">6</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-md">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-0.5">Completed Today</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">2</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-md">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-0.5">Rewards Claimed</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Missions */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-3xl">📅</span>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Daily Missions</h2>
              </div>
              <Badge className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium px-3 py-1.5 text-sm w-fit border-0">
                🕐 Resets in 23h 45m
              </Badge>
            </div>

            <div className="space-y-4">
              {missions.daily.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onClaim={() => handleClaimReward(mission.id, "daily")}
                />
              ))}
            </div>
          </div>

          {/* Weekly Missions */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-3xl">📆</span>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Weekly Missions</h2>
              </div>
              <Badge className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium px-3 py-1.5 text-sm w-fit border-0">
                🕐 Resets in 5d 12h
              </Badge>
            </div>

            <div className="space-y-4">
              {missions.weekly.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onClaim={() => handleClaimReward(mission.id, "weekly")}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function MissionCard({ mission, onClaim }: { mission: any; onClaim: () => void }) {
  const progressPercent = (mission.progress / mission.target) * 100
  const isComplete = mission.progress >= mission.target

  return (
    <Card className="bg-white dark:bg-slate-800 shadow-md border-slate-200 dark:border-slate-700 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <CardContent className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          {/* Mission Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{mission.title}</h3>
              <Badge className="bg-blue-500 hover:bg-blue-500 text-white font-semibold px-3 py-1 text-sm w-fit border-0">
                In Progress
              </Badge>
            </div>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-4">{mission.description}</p>

            {/* Progress */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-base">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Progress</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {mission.progress} / {mission.target}
                </span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Rewards */}
            <div className="flex flex-wrap items-center gap-2 text-base">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Rewards:</span>
              {mission.rewards.coins > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <span className="text-lg">🪙</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{mission.rewards.coins} coins</span>
                </div>
              )}
              {mission.rewards.gems > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <span className="text-lg">💎</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{mission.rewards.gems} gems</span>
                </div>
              )}
              {mission.rewards.xp > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <span className="text-lg">⭐</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{mission.rewards.xp} XP</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button - Right Side */}
          <div className="flex flex-row md:flex-col items-start md:items-end gap-2 md:min-w-[140px]">
            <Badge variant="outline" className="font-medium px-3 py-1 text-sm border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 w-fit md:ml-auto">
              In Progress
            </Badge>
            
            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 font-medium md:ml-auto">
              <Clock className="w-4 h-4" />
              🕐 {mission.expiresIn}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}