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

"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Headphones, Mic, BookOpen, PenTool, Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useNavigation } from "@/lib/navigation-context"

const practiceSkills = [
  {
    id: "listening",
    name: "Listening",
    description: "Practice understanding spoken language",
    icon: Headphones,
    colorStart: "#3b82f6",
    colorEnd: "#60a5fa",
    stats: { completed: 12, accuracy: 85 },
  },
  {
    id: "speaking",
    name: "Speaking",
    description: "Improve your pronunciation and fluency",
    icon: Mic,
    colorStart: "#ec4899",
    colorEnd: "#f472b6",
    stats: { completed: 8, accuracy: 78 },
  },
  {
    id: "reading",
    name: "Reading",
    description: "Enhance reading comprehension skills",
    icon: BookOpen,
    colorStart: "#8b5cf6",
    colorEnd: "#a78bfa",
    stats: { completed: 15, accuracy: 92 },
  },
  {
    id: "writing",
    name: "Writing",
    description: "Practice writing and composition",
    icon: PenTool,
    colorStart: "#f97316",
    colorEnd: "#fb923c",
    stats: { completed: 10, accuracy: 80 },
  },
]

const recentSessions = [
  { skill: "Reading", score: 95, xp: 120, time: "2 hours ago", icon: "R", color: "#8b5cf6" },
  { skill: "Listening", score: 88, xp: 100, time: "5 hours ago", icon: "L", color: "#3b82f6" },
  { skill: "Speaking", score: 82, xp: 90, time: "Yesterday", icon: "S", color: "#ec4899" },
  { skill: "Writing", score: 90, xp: 110, time: "Yesterday", icon: "W", color: "#f97316" },
]

export default function PracticePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { isOpen, closeNav } = useNavigation()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={() => {}} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-black mb-4 flex items-center justify-center gap-4">
              <span className="text-5xl">🎯</span>
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Practice Zone
              </span>
              <span className="text-5xl">💪</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              Master the 4 essential language skills through focused practice
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {practiceSkills.map((skill) => {
              const Icon = skill.icon
              return (
                <Card
                  key={skill.id}
                  className="relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 bg-card"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{
                      background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
                    }}
                  />

                  <CardContent className="p-8 md:p-9">
                    <div className="flex items-center gap-5 mb-6">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                        }}
                      >
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-1">{skill.name}</h3>
                        <p className="text-base text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide mb-1.5">
                          Completed
                        </div>
                        <div className="text-2xl font-bold">{skill.stats.completed}</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide mb-1.5">
                          Accuracy
                        </div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                          {skill.stats.accuracy}%
                        </div>
                      </div>
                    </div>

                    <Link href={`/practice/${skill.id}`}>
                      <Button
                        className="w-full h-12 md:h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                        style={{
                          background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                        }}
                      >
                        <Play className="w-5 h-5 mr-2 fill-white" />
                        Start Practice
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Recent Sessions */}
          <Card className="relative overflow-hidden border-none shadow-xl bg-card">
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #ec4899, #f97316)",
              }}
            />

            <div className="p-8 md:p-11">
              <div className="flex items-center justify-center gap-4 mb-9">
                <span className="text-3xl">📊</span>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                  Recent Practice Sessions
                </h2>
              </div>

              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 bg-muted/30 rounded-2xl hover:bg-muted/50 transition-all hover:translate-x-1"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${session.color}, ${session.color}dd)`,
                        }}
                      >
                        {session.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{session.skill} Practice</h4>
                        <span className="text-sm text-muted-foreground">{session.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500 mb-1">
                        {session.score}%
                      </div>
                      <div className="text-sm text-muted-foreground">+{session.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}