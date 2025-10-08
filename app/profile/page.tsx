// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Settings, Trophy, Target, Calendar, Award, BookOpen, Headphones, Mic, PenTool } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// // Mock profile data
// const profileStats = {
//   totalXP: 45000,
//   lessonsCompleted: 156,
//   practiceCompleted: 45,
//   currentStreak: 7,
//   longestStreak: 28,
//   achievements: 24,
//   skillProgress: {
//     listening: 85,
//     speaking: 72,
//     reading: 90,
//     writing: 78,
//   },
//   recentAchievements: [
//     { id: 1, name: "Week Warrior", description: "7-day streak", icon: "🔥", date: "Today" },
//     { id: 2, name: "Practice Master", description: "Complete 50 practices", icon: "🎯", date: "2 days ago" },
//     { id: 3, name: "Level 15", description: "Reach level 15", icon: "⭐", date: "3 days ago" },
//     { id: 4, name: "Reading Pro", description: "90% reading accuracy", icon: "📚", date: "1 week ago" },
//   ],
//   activityHistory: [
//     { date: "2024-01-15", xp: 850, lessons: 5 },
//     { date: "2024-01-14", xp: 720, lessons: 4 },
//     { date: "2024-01-13", xp: 900, lessons: 6 },
//     { date: "2024-01-12", xp: 650, lessons: 3 },
//     { date: "2024-01-11", xp: 800, lessons: 5 },
//     { date: "2024-01-10", xp: 750, lessons: 4 },
//     { date: "2024-01-09", xp: 880, lessons: 5 },
//   ],
// }

// export default function ProfilePage() {
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

//   const nextLevelXP = user.level * 1000
//   const xpProgress = (user.xp / nextLevelXP) * 100

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       {/* Profile Header */}
//       {/* <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300"> */}
//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto">
//           <Card className="mb-8 border-2">
//             <CardContent className="pt-6">
//               <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//                 {/* Avatar */}
//                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl">
//                   🎯
//                 </div>

//                 {/* User Info */}
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h1 className="text-3xl font-bold">{user.email?.split("@")[0]}</h1>
//                     <Badge className="bg-accent">Level {user.level}</Badge>
//                   </div>
//                   <p className="text-muted-foreground mb-4">{user.email}</p>

//                   {/* XP Progress */}
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">Progress to Level {user.level + 1}</span>
//                       <span className="font-semibold">
//                         {user.xp} / {nextLevelXP} XP
//                       </span>
//                     </div>
//                     <Progress value={xpProgress} className="h-3" />
//                   </div>
//                 </div>

//                 {/* Settings Button */}
//                 <Button variant="outline" size="icon">
//                   <Settings className="w-5 h-5" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Stats Grid */}
//           <div className="grid md:grid-cols-4 gap-4 mb-8">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
//                     <Trophy className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Total XP</div>
//                     <div className="text-xl font-bold">{profileStats.totalXP.toLocaleString()}</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
//                     <BookOpen className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Lessons</div>
//                     <div className="text-xl font-bold">{profileStats.lessonsCompleted}</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
//                     <Target className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Current Streak</div>
//                     <div className="text-xl font-bold">{profileStats.currentStreak} 🔥</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-pink-600 flex items-center justify-center">
//                     <Award className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Achievements</div>
//                     <div className="text-xl font-bold">{profileStats.achievements}</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Tabs */}
//           <Tabs defaultValue="skills" className="w-full">
//             <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
//               <TabsTrigger value="skills">Skills</TabsTrigger>
//               <TabsTrigger value="achievements">Achievements</TabsTrigger>
//               <TabsTrigger value="activity">Activity</TabsTrigger>
//             </TabsList>

//             {/* Skills Tab */}
//             <TabsContent value="skills">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Skill Progress</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <SkillProgressBar
//                     name="Listening"
//                     progress={profileStats.skillProgress.listening}
//                     icon={Headphones}
//                     color="from-blue-500 to-cyan-600"
//                   />
//                   <SkillProgressBar
//                     name="Speaking"
//                     progress={profileStats.skillProgress.speaking}
//                     icon={Mic}
//                     color="from-pink-500 to-rose-600"
//                   />
//                   <SkillProgressBar
//                     name="Reading"
//                     progress={profileStats.skillProgress.reading}
//                     icon={BookOpen}
//                     color="from-purple-500 to-indigo-600"
//                   />
//                   <SkillProgressBar
//                     name="Writing"
//                     progress={profileStats.skillProgress.writing}
//                     icon={PenTool}
//                     color="from-orange-500 to-amber-600"
//                   />
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Achievements Tab */}
//             <TabsContent value="achievements">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Achievements</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {profileStats.recentAchievements.map((achievement) => (
//                       <div key={achievement.id} className="p-4 bg-muted rounded-xl hover:bg-muted/80 transition-all">
//                         <div className="flex items-center gap-3 mb-2">
//                           <div className="text-3xl">{achievement.icon}</div>
//                           <div className="flex-1">
//                             <div className="font-bold">{achievement.name}</div>
//                             <div className="text-sm text-muted-foreground">{achievement.description}</div>
//                           </div>
//                         </div>
//                         <div className="text-xs text-muted-foreground">{achievement.date}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Activity Tab */}
//             <TabsContent value="activity">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Activity</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {profileStats.activityHistory.map((activity, index) => (
//                       <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl">
//                         <div className="flex items-center gap-3">
//                           <Calendar className="w-5 h-5 text-muted-foreground" />
//                           <div>
//                             <div className="font-semibold">{new Date(activity.date).toLocaleDateString()}</div>
//                             <div className="text-sm text-muted-foreground">{activity.lessons} lessons completed</div>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div className="font-bold text-success">+{activity.xp} XP</div>
//                         </div>
//                       </div>
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

// function SkillProgressBar({
//   name,
//   progress,
//   icon: Icon,
//   color,
// }: {
//   name: string
//   progress: number
//   icon: any
//   color: string
// }) {
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-2">
//           <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
//             <Icon className="w-4 h-4 text-white" />
//           </div>
//           <span className="font-semibold">{name}</span>
//         </div>
//         <span className="font-bold text-success">{progress}%</span>
//       </div>
//       <Progress value={progress} className="h-3" />
//     </div>
//   )
// }



"use client"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Trophy, Calendar, Award, BookOpen, Headphones, Mic, PenTool, Flame, Star, Sparkles, Zap, TrendingUp, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Mock profile data
const profileStats = {
  totalXP: 45000,
  lessonsCompleted: 156,
  practiceCompleted: 45,
  currentStreak: 7,
  longestStreak: 28,
  achievements: 24,
  skillProgress: {
    listening: 85,
    speaking: 72,
    reading: 90,
    writing: 78,
  },
  recentAchievements: [
    { id: 1, name: "Week Warrior", description: "7-day streak", icon: "🔥", date: "Today", color: "from-orange-500 to-red-500" },
    { id: 2, name: "Practice Master", description: "Complete 50 practices", icon: "🎯", date: "2 days ago", color: "from-blue-500 to-cyan-500" },
    { id: 3, name: "Level 15", description: "Reach level 15", icon: "⭐", date: "3 days ago", color: "from-amber-500 to-yellow-500" },
    { id: 4, name: "Reading Pro", description: "90% reading accuracy", icon: "📚", date: "1 week ago", color: "from-purple-500 to-pink-500" },
  ],
  activityHistory: [
    { date: "2024-01-15", xp: 850, lessons: 5 },
    { date: "2024-01-14", xp: 720, lessons: 4 },
    { date: "2024-01-13", xp: 900, lessons: 6 },
    { date: "2024-01-12", xp: 650, lessons: 3 },
    { date: "2024-01-11", xp: 800, lessons: 5 },
    { date: "2024-01-10", xp: 750, lessons: 4 },
    { date: "2024-01-09", xp: 880, lessons: 5 },
  ],
}

export default function ProfilePage() {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  const nextLevelXP = user.level * 1000
  const xpProgress = (user.xp / nextLevelXP) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          
          {/* Profile Header - Clean & Professional */}
          <Card className="mb-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-lg hover:scale-105 transition-transform duration-300">
                    🎯
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-800">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                      {user.email?.split("@")[0]}
                    </h1>
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Level {user.level}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-2.5 py-1">
                      Pro
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    {user.email}
                  </p>

                  {/* XP Progress - Refined */}
                  <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
                        Progress to Level {user.level + 1}
                      </span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {user.xp} / {nextLevelXP} XP
                      </span>
                    </div>
                    <Progress value={xpProgress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{Math.round(xpProgress)}% Complete</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {nextLevelXP - user.xp} XP to go! 🚀
                      </span>
                    </div>
                  </div>
                </div>

                {/* Settings Button */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="flex-shrink-0 hover:scale-105 transition-transform"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid - Optimized Spacing & Size */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={Trophy}
              label="Total XP"
              value={profileStats.totalXP.toLocaleString()}
              color="from-emerald-500 to-teal-500"
            />
            <StatCard
              icon={BookOpen}
              label="Lessons"
              value={profileStats.lessonsCompleted}
              color="from-blue-500 to-cyan-500"
            />
            <StatCard
              icon={Flame}
              label="Streak"
              value={`${profileStats.currentStreak} 🔥`}
              color="from-orange-500 to-red-500"
              pulse
            />
            <StatCard
              icon={Award}
              label="Achievements"
              value={profileStats.achievements}
              color="from-pink-500 to-purple-500"
            />
          </div>

          {/* Tabs - Clean Design */}
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6 h-12 bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <TabsTrigger 
                value="skills" 
                className="gap-2 text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="gap-2 text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="gap-2 text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
            </TabsList>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    Skill Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                  <SkillProgressBar
                    name="Listening"
                    progress={profileStats.skillProgress.listening}
                    icon={Headphones}
                    color="from-blue-500 to-cyan-500"
                  />
                  <SkillProgressBar
                    name="Speaking"
                    progress={profileStats.skillProgress.speaking}
                    icon={Mic}
                    color="from-pink-500 to-rose-500"
                  />
                  <SkillProgressBar
                    name="Reading"
                    progress={profileStats.skillProgress.reading}
                    icon={BookOpen}
                    color="from-purple-500 to-indigo-500"
                  />
                  <SkillProgressBar
                    name="Writing"
                    progress={profileStats.skillProgress.writing}
                    icon={PenTool}
                    color="from-orange-500 to-amber-500"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {profileStats.recentAchievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md hover:scale-[1.02] transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`text-3xl w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${achievement.color} flex-shrink-0`}>
                            {achievement.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-slate-900 dark:text-white mb-0.5">{achievement.name}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {achievement.date}
                          </Badge>
                          <Sparkles className="w-4 h-4 text-amber-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {profileStats.activityHistory.map((activity, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm hover:scale-[1.01] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">
                              {new Date(activity.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5" />
                              {activity.lessons} lessons completed
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            +{activity.xp}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">XP Earned</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  pulse = false,
}: {
  icon: any
  label: string
  value: string | number
  color: string
  pulse?: boolean
}) {
  return (
    <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 ${pulse ? 'animate-pulse' : ''}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">
              {label}
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white truncate">
              {value}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Skill Progress Bar Component
function SkillProgressBar({
  name,
  progress,
  icon: Icon,
  color,
}: {
  name: string
  progress: number
  icon: any
  color: string
}) {
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">{name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{progress}%</span>
          {progress >= 80 && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
        </div>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  )
}