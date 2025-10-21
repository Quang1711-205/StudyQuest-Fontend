// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Headphones, Mic, BookOpen, PenTool, Play, Trophy } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { useNavigation } from "@/lib/navigation-context"

// const practiceSkills = [
//   {
//     id: "listening",
//     name: "Listening",
//     description: "Practice understanding spoken language",
//     icon: Headphones,
//     color: "from-blue-500 to-cyan-600",
//     stats: { completed: 12, accuracy: 85 },
//   },
//   {
//     id: "speaking",
//     name: "Speaking",
//     description: "Improve your pronunciation and fluency",
//     icon: Mic,
//     color: "from-pink-500 to-rose-600",
//     stats: { completed: 8, accuracy: 78 },
//   },
//   {
//     id: "reading",
//     name: "Reading",
//     description: "Enhance reading comprehension skills",
//     icon: BookOpen,
//     color: "from-purple-500 to-indigo-600",
//     stats: { completed: 15, accuracy: 92 },
//   },
//   {
//     id: "writing",
//     name: "Writing",
//     description: "Practice writing and composition",
//     icon: PenTool,
//     color: "from-orange-500 to-amber-600",
//     stats: { completed: 10, accuracy: 80 },
//   },
// ]

// export default function PracticePage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const { isOpen, closeNav } = useNavigation()

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
//     <div className="min-h-screen bg-background">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={() => {}} />

//       {/* <main className="mt-16 p-8 transition-all duration-300 md:ml-20 min-[1200px]:ml-96"> */}
//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold mb-2">Practice Zone</h1>
//             <p className="text-muted-foreground text-lg">
//               Master the 4 essential language skills through free practice
//             </p>
//           </div>

//           {/* Skills Grid */}
//           <div className="grid md:grid-cols-2 gap-6 mb-8">
//             {practiceSkills.map((skill) => {
//               const Icon = skill.icon
//               return (
//                 <Card key={skill.id} className="border-2 hover:shadow-xl transition-all">
//                   <CardHeader>
//                     <div className="flex items-center gap-4 mb-2">
//                       <div
//                         className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center`}
//                       >
//                         <Icon className="w-8 h-8 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <CardTitle className="text-2xl">{skill.name}</CardTitle>
//                         <CardDescription>{skill.description}</CardDescription>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {/* Stats */}
//                     <div className="grid grid-cols-2 gap-3">
//                       <div className="p-3 bg-muted rounded-lg">
//                         <div className="text-xs text-muted-foreground mb-1">Completed</div>
//                         <div className="text-xl font-bold">{skill.stats.completed}</div>
//                       </div>
//                       <div className="p-3 bg-muted rounded-lg">
//                         <div className="text-xs text-muted-foreground mb-1">Accuracy</div>
//                         <div className="text-xl font-bold text-success">{skill.stats.accuracy}%</div>
//                       </div>
//                     </div>

//                     {/* Start Button */}
//                     <Link href={`/practice/${skill.id}`}>
//                       <Button className="w-full" size="lg">
//                         <Play className="w-5 h-5 mr-2" />
//                         Start Practice
//                       </Button>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>

//           {/* Recent Sessions */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>Recent Practice Sessions</CardTitle>
//                 <Trophy className="w-6 h-6 text-accent" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <SessionItem skill="Reading" score={95} xp={120} time="2 hours ago" />
//                 <SessionItem skill="Listening" score={88} xp={100} time="5 hours ago" />
//                 <SessionItem skill="Speaking" score={82} xp={90} time="Yesterday" />
//                 <SessionItem skill="Writing" score={90} xp={110} time="Yesterday" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }

// function SessionItem({ skill, score, xp, time }: { skill: string; score: number; xp: number; time: string }) {
//   return (
//     <div className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-all">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
//           <Badge variant="secondary">{skill.slice(0, 1)}</Badge>
//         </div>
//         <div>
//           <div className="font-semibold">{skill} Practice</div>
//           <div className="text-sm text-muted-foreground">{time}</div>
//         </div>
//       </div>
//       <div className="text-right">
//         <div className="font-bold text-success">{score}%</div>
//         <div className="text-sm text-muted-foreground">+{xp} XP</div>
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Headphones, Mic, BookOpen, PenTool, Play } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { useNavigation } from "@/lib/navigation-context"

// const practiceSkills = [
//   {
//     id: "listening",
//     name: "Listening",
//     description: "Practice understanding spoken language",
//     icon: Headphones,
//     colorStart: "#3b82f6",
//     colorEnd: "#60a5fa",
//     stats: { completed: 12, accuracy: 85 },
//   },
//   {
//     id: "speaking",
//     name: "Speaking",
//     description: "Improve your pronunciation and fluency",
//     icon: Mic,
//     colorStart: "#ec4899",
//     colorEnd: "#f472b6",
//     stats: { completed: 8, accuracy: 78 },
//   },
//   {
//     id: "reading",
//     name: "Reading",
//     description: "Enhance reading comprehension skills",
//     icon: BookOpen,
//     colorStart: "#8b5cf6",
//     colorEnd: "#a78bfa",
//     stats: { completed: 15, accuracy: 92 },
//   },
//   {
//     id: "writing",
//     name: "Writing",
//     description: "Practice writing and composition",
//     icon: PenTool,
//     colorStart: "#f97316",
//     colorEnd: "#fb923c",
//     stats: { completed: 10, accuracy: 80 },
//   },
// ]

// const recentSessions = [
//   { skill: "Reading", score: 95, xp: 120, time: "2 hours ago", icon: "R", color: "#8b5cf6" },
//   { skill: "Listening", score: 88, xp: 100, time: "5 hours ago", icon: "L", color: "#3b82f6" },
//   { skill: "Speaking", score: 82, xp: 90, time: "Yesterday", icon: "S", color: "#ec4899" },
//   { skill: "Writing", score: 90, xp: 110, time: "Yesterday", icon: "W", color: "#f97316" },
// ]

// export default function PracticePage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const { isOpen, closeNav } = useNavigation()

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
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={() => {}} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-12 text-center">
//             <h1 className="text-5xl font-black mb-4 flex items-center justify-center gap-4">
//               <span className="text-5xl">🎯</span>
//               <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//                 Practice Zone
//               </span>
//               <span className="text-5xl">💪</span>
//             </h1>
//             <p className="text-muted-foreground text-lg font-medium">
//               Master the 4 essential language skills through free practice
//             </p>
//           </div>

//           {/* Skills Grid */}
//           <div className="grid md:grid-cols-2 gap-8 mb-12">
//             {practiceSkills.map((skill) => {
//               const Icon = skill.icon
//               return (
//                 <Card 
//                   key={skill.id} 
//                   className="relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 bg-card"
//                 >
//                   {/* Top colored bar */}
//                   <div 
//                     className="absolute top-0 left-0 right-0 h-1.5"
//                     style={{
//                       background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`
//                     }}
//                   />
                  
//                   <CardContent className="p-9">
//                     {/* Header */}
//                     <div className="flex items-center gap-5 mb-6">
//                       <div 
//                         className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
//                         style={{
//                           background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`
//                         }}
//                       >
//                         <Icon className="w-8 h-8 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-2xl font-bold mb-1">{skill.name}</h3>
//                         <p className="text-sm text-muted-foreground">{skill.description}</p>
//                       </div>
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                       <div className="p-4 bg-muted/50 rounded-xl">
//                         <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1.5">
//                           Completed
//                         </div>
//                         <div className="text-3xl font-extrabold">{skill.stats.completed}</div>
//                       </div>
//                       <div className="p-4 bg-muted/50 rounded-xl">
//                         <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1.5">
//                           Accuracy
//                         </div>
//                         <div className="text-3xl font-extrabold text-green-600 dark:text-green-500">
//                           {skill.stats.accuracy}%
//                         </div>
//                       </div>
//                     </div>

//                     {/* Start Button */}
//                     <Link href={`/practice/${skill.id}`}>
//                       <Button 
//                         className="w-full h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
//                         style={{
//                           background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`
//                         }}
//                       >
//                         <Play className="w-5 h-5 mr-2 fill-white" />
//                         Start Practice
//                       </Button>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>

//           {/* Recent Sessions */}
//           <Card className="relative overflow-hidden border-none shadow-xl bg-card">
//             {/* Top gradient bar */}
//             <div 
//               className="absolute top-0 left-0 right-0 h-1"
//               style={{
//                 background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #ec4899, #f97316)'
//               }}
//             />
            
//             <div className="p-11">
//               {/* Header */}
//               <div className="flex items-center justify-center gap-4 mb-9">
//                 <span className="text-3xl">📊</span>
//                 <h2 className="text-4xl font-black bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
//                   Recent Practice Sessions
//                 </h2>
//               </div>

//               {/* Sessions List */}
//               <div className="space-y-4">
//                 {recentSessions.map((session, index) => (
//                   <div 
//                     key={index}
//                     className="flex items-center justify-between p-6 bg-muted/30 rounded-2xl hover:bg-muted/50 transition-all hover:translate-x-1"
//                   >
//                     <div className="flex items-center gap-5">
//                       <div 
//                         className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
//                         style={{
//                           background: `linear-gradient(135deg, ${session.color}, ${session.color}dd)`
//                         }}
//                       >
//                         {session.icon}
//                       </div>
//                       <div>
//                         <h4 className="font-bold text-lg mb-1">{session.skill} Practice</h4>
//                         <span className="text-sm text-muted-foreground">{session.time}</span>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-3xl font-extrabold text-green-600 dark:text-green-500 mb-1">
//                         {session.score}%
//                       </div>
//                       <div className="text-sm text-muted-foreground">+{session.xp} XP</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }


//1"use client"














"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import TopBar from "@/components/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Headphones, Mic, BookOpen, PenTool, Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useNavigation } from "@/lib/navigation-context"

const skillConfig = {
  listening: {
    id: "listening",
    name: "Listening",
    description: "Practice understanding spoken language",
    icon: Headphones,
    colorStart: "#3b82f6",
    colorEnd: "#60a5fa",
    bgLight: "#dbeafe", // Light blue background
    bgDark: "#1e3a8a",  // Dark blue background
  },
  speaking: {
    id: "speaking",
    name: "Speaking",
    description: "Improve your pronunciation and fluency",
    icon: Mic,
    colorStart: "#ec4899",
    colorEnd: "#f472b6",
    bgLight: "#fce7f3", // Light pink background
    bgDark: "#831843",  // Dark pink background
  },
  reading: {
    id: "reading",
    name: "Reading",
    description: "Enhance reading comprehension skills",
    icon: BookOpen,
    colorStart: "#8b5cf6",
    colorEnd: "#a78bfa",
    bgLight: "#ede9fe", // Light purple background
    bgDark: "#4c1d95",  // Dark purple background
  },
  writing: {
    id: "writing",
    name: "Writing",
    description: "Practice writing and composition",
    icon: PenTool,
    colorStart: "#f97316",
    colorEnd: "#fb923c",
    bgLight: "#ffedd5", // Light orange background
    bgDark: "#7c2d12",  // Dark orange background
  },
}

interface SkillStat {
  skillType: string
  completed: number
  averageAccuracy: number
  bestAccuracy: number
  recentSessions: Array<{
    accuracy: number
    completedAt: string
    timeSpent: number
  }>
}

interface RecentSession {
  skill: string
  score: number
  xp: number
  time: string
  icon: string
  color: string
}

export default function PracticePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const [skillStats, setSkillStats] = useState<Record<string, SkillStat>>({})
  const [recentSessions, setRecentSessions] = useState<RecentSession[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      loadPracticeData()
    }
  }, [user, isLoading, router])

  const loadPracticeData = async () => {
    try {
      setIsLoadingData(true)
      const token = localStorage.getItem('accessToken')
      
      const skillTypes = ['listening', 'speaking', 'reading', 'writing']
      const skillStatsPromises = skillTypes.map(skillType =>
        fetch(`http://localhost:3000/api/practice/stats/${skillType}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => res.json())
      )

      const [statsResults, sessions] = await Promise.all([
        Promise.all(skillStatsPromises),
        fetch('http://localhost:3000/api/practice/recent-sessions?limit=4', {
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => res.json())
      ])
      
      const statsMap = statsResults.reduce((acc, stat) => {
        acc[stat.skillType] = stat
        return acc
      }, {} as Record<string, SkillStat>)
      
      setSkillStats(statsMap)
      setRecentSessions(sessions)
    } catch (error) {
      console.error("Error loading practice data:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-4">
              <span className="text-3xl sm:text-5xl">🎯</span>
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Practice Zone
              </span>
              <span className="text-3xl sm:text-5xl">💪</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-medium">
              Master the 4 essential language skills through focused practice
            </p>
          </div>

          {/* Skills Grid */}
          {isLoadingData ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {Object.keys(skillConfig).map((skillId) => {
                const config = skillConfig[skillId as keyof typeof skillConfig]
                const stats = skillStats[skillId]
                
                if (!stats) return null
                
                const Icon = config.icon
                return (
                  <Card
                    key={skillId}
                    className="relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 bg-white dark:bg-slate-800"
                  >
                    {/* Top gradient line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 sm:h-1.5"
                      style={{
                        background: `linear-gradient(90deg, ${config.colorStart}, ${config.colorEnd})`,
                      }}
                    />

                    <CardContent className="p-5 sm:p-6 lg:p-8">
                      {/* Header with Icon & Title */}
                      <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-6">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${config.colorStart}, ${config.colorEnd})`,
                          }}
                        >
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold mb-1 truncate text-slate-900 dark:text-white">
                            {config.name}
                          </h3>
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 line-clamp-1">
                            {config.description}
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid - FIXED with proper backgrounds */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        {/* Completed Box */}
                        <div 
                          className="p-3 sm:p-4 rounded-xl transition-colors dark:!bg-slate-900/80"
                          style={{
                            backgroundColor: config.bgLight,
                          }}
                        >
                          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1 sm:mb-1.5 text-slate-700 dark:text-slate-400">
                            Completed
                          </div>
                          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                            {stats.completed}
                          </div>
                        </div>
                        
                        {/* Accuracy Box */}
                        <div 
                          className="p-3 sm:p-4 rounded-xl transition-colors dark:!bg-slate-900/80"
                          style={{
                            backgroundColor: config.bgLight,
                          }}
                        >
                          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1 sm:mb-1.5 text-slate-700 dark:text-slate-400">
                            Accuracy
                          </div>
                          <div 
                            className="text-xl sm:text-2xl font-bold dark:text-white"
                            style={{ color: config.colorStart }}
                          >
                            {stats.averageAccuracy.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      {/* Start Practice Button */}
                      <Link href={`/practice/${skillId}`}>
                        <Button
                          className="w-full h-11 sm:h-12 lg:h-14 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-white border-0"
                          style={{
                            background: `linear-gradient(135deg, ${config.colorStart}, ${config.colorEnd})`,
                          }}
                        >
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 fill-white" />
                          Start Practice
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Recent Sessions */}
          {!isLoadingData && recentSessions.length > 0 && (
            <Card className="relative overflow-hidden border-none shadow-xl bg-white dark:bg-slate-800">
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #ec4899, #f97316)",
                }}
              />

              <div className="p-5 sm:p-6 lg:p-8">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-9">
                  <span className="text-2xl sm:text-3xl">📊</span>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                    Recent Practice Sessions
                  </h2>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {recentSessions.map((session, index) => {
                    const skillKey = session.skill.toLowerCase() as keyof typeof skillConfig
                    const config = skillConfig[skillKey]
                    
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl transition-all hover:translate-x-1 border border-slate-200 dark:border-slate-700 dark:!bg-slate-900/60"
                        style={{
                          backgroundColor: config ? config.bgLight : '#f1f5f9',
                        }}
                      >
                        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-1 min-w-0">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md flex-shrink-0"
                            style={{
                              background: config
                                ? `linear-gradient(135deg, ${config.colorStart}, ${config.colorEnd})`
                                : session.color,
                            }}
                          >
                            {session.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 truncate text-slate-900 dark:text-white">
                              {session.skill} Practice
                            </h4>
                            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                              {session.time}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <div 
                            className="text-xl sm:text-2xl font-bold mb-0.5 sm:mb-1 dark:text-white"
                            style={{ 
                              color: config ? config.colorStart : '#10b981' 
                            }}
                          >
                            {session.score}%
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            +{session.xp} XP
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}