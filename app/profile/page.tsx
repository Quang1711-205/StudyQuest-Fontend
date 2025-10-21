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
import TopBar from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Trophy, Calendar, Award, BookOpen, Headphones, Mic, PenTool, Flame, Star, Sparkles, Zap, TrendingUp, Crown, ChevronLeft, Check, Gift, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Helper to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

// API helper
async function apiCall<T>(endpoint: string): Promise<T> {
  const token = getAuthToken()
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

interface UserProfile {
  id: string
  username: string
  email: string
  coins: number
  gems: number
  darkMode: boolean
  activeLanguage: {
    id: number
    code: string
    name: string
    level: number
    totalXp: string
    currentXp: number
    xpToNextLevel: number
    currentStreak: number
    longestStreak: number
  }
  avatar: {
    id: number
    name: string
    iconUrl: string
    rarity: string
  }
  achievementsCount: number
}

interface Avatar {
  id: number
  name: string
  iconUrl: string
  rarity: string
  owned: boolean
  equipped: boolean
}

interface ProfileStats {
  totalXP: number
  practiceCompleted: number
  currentStreak: number
  longestStreak: number
  achievements: number
  skillProgress: {
    listening: number
    speaking: number
    reading: number
    writing: number
  }
  recentAchievements: Array<{
    id: number
    name: string
    description: string
    icon: string
    date: string
    color: string
  }>
  activityHistory: Array<{
    date: string
    xp: number
    lessons: number
  }>
}

// Thêm interface Achievement
interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  category: string
  requirementType: string
  requirementCount: number
  currentProgress: number
  progressPercentage: number
  status: 'locked' | 'unlocked' | 'claimed'
  title: string
  rewards: {
    xp: number
    coins: number
    gems: number
  }
  unlockedAt?: Date
  claimedAt?: Date
}

interface CelebrationData {
  achievementId: number
  name: string
  icon: string
  rewards: {
    xp: number
    coins: number
    gems: number
  }
}

// Confetti component
function Confetti({ id }: { id: number }) {
  const randomX = Math.random() * 100
  const randomDelay = Math.random() * 0.5
  const randomDuration = 2 + Math.random() * 1

  return (
    <div
      key={id}
      style={{
        position: 'fixed',
        left: `${randomX}%`,
        top: '-10px',
        animation: `fall ${randomDuration}s linear ${randomDelay}s forwards`,
      }}
      className="pointer-events-none text-4xl drop-shadow-lg"
    >
      {['🎉', '✨', '⭐', '🎊', '💫'][Math.floor(Math.random() * 5)]}
    </div>
  )
}

function Fireworks() {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; duration: number; side: 'left' | 'right' }>>([]);

  useEffect(() => {
    // Tạo particles ban đầu
    const initialParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      delay: (i % 10) * 0.1,
      duration: 2 + Math.random() * 1,
      side: (i % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
    }));
    setParticles(initialParticles);

    // Thêm particles liên tục
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          id: Math.random(),
          delay: 0,
          duration: 2 + Math.random() * 1,
          side: Math.random() > 0.5 ? 'left' : 'right',
        }
      ]);
    }, 100); // Thêm particle mới mỗi 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map(p => {
        const randomX = Math.random() * 100;
        const randomRotate = Math.random() * 360;
        const side = p.side === 'left' ? randomX * 0.5 : 50 + randomX * 0.5;

        return (
          <div
            key={p.id}
            style={{
              position: 'fixed',
              left: `${side}%`,
              bottom: '-50px',
              animation: `fireworks ${p.duration}s ease-out ${p.delay}s forwards`,
              fontSize: '2rem',
              pointerEvents: 'none',
              zIndex: 40,
            }}
          >
            {['🎉', '✨', '⭐', '🎊', '💫', '🎈', '🌟', '💥'][Math.floor(Math.random() * 8)]}
          </div>
        );
      })}
    </>
  );
}

// Celebration Modal - Lớn hơn, nổi bật hơn
function CelebrationModal({
  achievement,
  onContinue,
}: {
  achievement: CelebrationData
  onContinue: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes fireworks {
          0% {
            transform: translateY(0) rotateZ(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotateZ(360deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes slideUpBig {
          from {
            transform: scale(0.7) translateY(80px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(168, 85, 247, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(168, 85, 247, 0);
          }
        }

        .animate-slideUpBig {
          animation: slideUpBig 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bounce-lg {
          animation: bounce 1s ease-in-out;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>

      <Fireworks />

      {/* Modal chính */}
      <div className="animate-slideUpBig relative">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-3xl p-1.5 max-w-xl w-full shadow-2xl animate-pulse-ring">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10 text-center space-y-6">
            
            {/* Biểu tượng 🎉 */}
            <div className="space-y-2">
              <div className="text-6xl animate-bounce-lg inline-block">🎉</div>
              <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                Awesome!
              </h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold">
                Achievement Claimed!
              </p>
            </div>

            {/* Achievement Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 md:p-8 border border-purple-200 dark:border-purple-700 shadow-lg">
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {achievement.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base">
                Amazing progress!
              </p>
            </div>

            {/* Rewards */}
            <div className="grid grid-cols-3 gap-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              {/* XP */}
              <div className="space-y-1">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">XP</div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  +{achievement.rewards.xp}
                </div>
              </div>

              {/* Coins */}
              <div className="space-y-1">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md text-3xl">
                    🪙
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">Coins</div>
                <div className="text-2xl font-black text-yellow-600 dark:text-yellow-400">
                  +{achievement.rewards.coins}
                </div>
              </div>

              {/* Gems */}
              <div className="space-y-1">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md text-3xl">
                    💎
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">Gems</div>
                <div className="text-2xl font-black text-pink-600 dark:text-pink-400">
                  +{achievement.rewards.gems}
                </div>
              </div>
            </div>

            {/* Nút Continue */}
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-black py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-xl text-xl"
            >
              Continue 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



// Achievement Card Component
function AchievementCard({
  achievement,
  onClaim,
  isClaiming,
}: {
  achievement: Achievement
  onClaim: (id: number) => void
  isClaiming: boolean
}) {
  const categoryIcons: Record<string, string> = {
    listening: '👂',
    speaking: '🗣️',
    reading: '📖',
    writing: '✍️',
    grammar: '✏️',
    vocabulary: '📚',
    streak: '🔥',
    level: '⭐',
    topic: '📝',
    special: '✨',
  }

  const icon = categoryIcons[achievement.category] || '🏆'

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1" />

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="text-4xl">{icon}</div>
          {achievement.status === 'locked' && (
            <Lock className="w-5 h-5 text-slate-400" />
          )}
          {achievement.status === 'claimed' && (
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          )}
          {achievement.status === 'unlocked' && (
            <Gift className="w-5 h-5 text-purple-500" />
          )}
        </div>

        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
            {achievement.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {achievement.description}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>{achievement.currentProgress}/{achievement.requirementCount}</span>
            <span>{achievement.progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
              style={{ width: `${achievement.progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs pt-2">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded p-2 text-center">
            <div className="text-lg">⚡</div>
            <div className="font-bold text-blue-600 dark:text-blue-400">
              +{achievement.rewards.xp}
            </div>
            <div className="text-slate-600 dark:text-slate-400">XP</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded p-2 text-center">
            <div className="text-lg">🪙</div>
            <div className="font-bold text-yellow-600 dark:text-yellow-400">
              +{achievement.rewards.coins}
            </div>
            <div className="text-slate-600 dark:text-slate-400">Coins</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-950/30 rounded p-2 text-center">
            <div className="text-lg">💎</div>
            <div className="font-bold text-pink-600 dark:text-pink-400">
              +{achievement.rewards.gems}
            </div>
            <div className="text-slate-600 dark:text-slate-400">Gems</div>
          </div>
        </div>

        {achievement.status === 'locked' && (
          <button
            disabled
            className="w-full py-2 px-3 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg font-semibold cursor-not-allowed"
          >
            Locked
          </button>
        )}

        {achievement.status === 'unlocked' && (
          <button
            onClick={() => onClaim(achievement.id)}
            disabled={isClaiming}
            className="w-full py-2 px-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isClaiming ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Claiming...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" />
                Claim Reward
              </span>
            )}
          </button>
        )}

        {achievement.status === 'claimed' && (
          <button
            disabled
            className="w-full py-2 px-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg font-semibold border border-emerald-200 dark:border-emerald-800 cursor-default"
          >
            ✓ Claimed
          </button>
        )}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [ownedAvatars, setOwnedAvatars] = useState<Avatar[]>([])
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(false)
  const [equippingAvatarId, setEquippingAvatarId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("skills")

  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(false)
  const [claiming, setClaiming] = useState<number | null>(null)
  const [celebration, setCelebration] = useState<CelebrationData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      loadProfileData()
    }
  }, [user, isLoading, router])


  useEffect(() => {
    if (activeTab === "achievements" && achievements.length === 0 && !isLoadingAchievements) {
      loadAchievements()
    }
  }, [activeTab])

  // ✅ Load achievements from API
  const loadAchievements = async () => {
    try {
      setIsLoadingAchievements(true)
      const data = await apiCall<Achievement[]>('/achievements')
      setAchievements(data)
    } catch (error) {
      console.error('Failed to load achievements:', error)
    } finally {
      setIsLoadingAchievements(false)
    }
  }

  // ✅ Claim achievement
  const handleClaimAchievement = async (achievementId: number) => {
    try {
      setClaiming(achievementId)

      const token = getAuthToken()

      console.log('🎯 Claiming achievement:', achievementId)
      console.log('🔑 Token:', token ? 'exists' : 'missing')

      const response = await fetch(
        `${API_BASE_URL}/achievements/${achievementId}/claim`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      )

      console.log('📊 Response status:', response.status)
      console.log('📊 Response OK:', response.ok)

      const data = await response.json()
      console.log('📦 Response body:', data)

      if (!response.ok) {
        throw new Error(data?.message || `Failed: ${response.status}`)
      }

      // ✅ Show celebration
      const achievement = achievements.find(a => a.id === achievementId)
      if (achievement) {
        setCelebration({
          achievementId,
          name: achievement.name,
          icon: achievement.icon,
          rewards: data.rewards,
        })
      }

      // ✅ Reload achievements after 2 seconds
      setTimeout(() => {
        loadAchievements()
      }, 2000)
    } catch (error) {
      console.error('❌ Full error:', error)
      console.error('Error claiming achievement:', error)
      alert(error instanceof Error ? error.message : 'Failed to claim achievement')
    } finally {
      setClaiming(null)
    }
  }

  const handleContinue = () => {
    setCelebration(null)
    loadAchievements()
  }

  // ✅ Filter achievements by category
  const categories = [
    'all',
    ...Array.from(new Set(achievements.map(a => a.category))),
  ]

  const filteredAchievements =
    selectedCategory === 'all'
      ? achievements
      : achievements.filter(a => a.category === selectedCategory)

  const achievementStats = {
    total: achievements.length,
    locked: achievements.filter(a => a.status === 'locked').length,
    unlocked: achievements.filter(a => a.status === 'unlocked').length,
    claimed: achievements.filter(a => a.status === 'claimed').length,
  }

  useEffect(() => {
    // Auto-load avatars when switching to achievements tab
    if (activeTab === "achievements" && ownedAvatars.length === 0 && !isLoadingAvatars) {
      loadOwnedAvatars()
    }
  }, [activeTab])

  const loadProfileData = async () => {
    try {
      setIsLoadingStats(true)
      const profileData = await apiCall<UserProfile>('/users/profile')
      const statsData = await apiCall<ProfileStats>('/users/profile/stats')
      setProfile(profileData)
      setProfileStats(statsData)
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setIsLoadingStats(false)
    }
  }

  const loadOwnedAvatars = async () => {
    try {
      setIsLoadingAvatars(true)
      const avatars = await apiCall<Avatar[]>('/shop/avatars/owned')
      setOwnedAvatars(avatars)
    } catch (error) {
      console.error('Failed to load avatars:', error)
    } finally {
      setIsLoadingAvatars(false)
    }
  }

  const handleEquipAvatar = async (avatarId: number) => {
    try {
      setEquippingAvatarId(avatarId)
      
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/shop/avatars/equip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ avatarId })
      })

      if (!response.ok) {
        throw new Error(`Failed to equip avatar: ${response.status}`)
      }

      setOwnedAvatars(prev =>
        prev.map(avatar => ({
          ...avatar,
          equipped: avatar.id === avatarId
        }))
      )
      const equippedAvatar = ownedAvatars.find(a => a.id === avatarId)
      if (equippedAvatar && profile) {
        setProfile({
          ...profile,
          avatar: {
            id: equippedAvatar.id,
            name: equippedAvatar.name,
            iconUrl: equippedAvatar.iconUrl,
            rarity: equippedAvatar.rarity
          }
        })
      }
    } catch (error) {
      console.error('Failed to equip avatar:', error)
    } finally {
      setEquippingAvatarId(null)
    }
  }

  if (isLoading || !profile || isLoadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!profileStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Failed to load profile data</p>
          <Button onClick={loadProfileData}>Retry</Button>
        </div>
      </div>
    )
  }

  const nextLevelXP = profile.activeLanguage.xpToNextLevel
  const currentXP = profile.activeLanguage.currentXp
  const xpProgress = (currentXP / nextLevelXP) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        <h1 className="font-bold text-slate-900 dark:text-slate-100">Profile</h1>
        <Settings className="w-6 h-6 text-slate-600 dark:text-slate-400" />
      </div>

      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-20 md:mt-16 p-3 md:p-8 pb-20 md:pb-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
          
          {/* Profile Header Card */}
          <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900">
            <CardContent className="p-4 md:p-6">
              <div className="flex gap-4 md:gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
                  <div className="w-full h-full rounded-xl md:rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                    {/* <img 
                      src={profile.avatar.iconUrl} 
                      alt={profile.avatar.name}
                      className="w-full h-full object-cover"
                    /> */}

                    <div className="w-full h-full rounded-xl md:rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                      {profile.avatar?.iconUrl ? (
                        <img
                          src={profile.avatar.iconUrl}
                          alt={profile.avatar.name || "Default Avatar"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src="/default-avatar.png"
                          alt="Default Avatar"
                          className="w-full h-full object-cover opacity-80"
                        />
                      )}
                    </div>

                  </div>
                  <button 
                    onClick={() => setShowAvatarModal(true)}
                    className="absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-900 hover:scale-110 transition-transform z-10"
                    title="Change Avatar"
                  >
                    <Crown className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
                      {profile.username}
                    </h1>
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-2.5 md:px-3 py-1 text-xs md:text-base">
                      <Star className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      Level {profile.activeLanguage.level}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4 flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500 flex-shrink-0" />
                    {profile.email}
                  </p>

                  {/* XP Progress */}
                  <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between text-xs md:text-base">
                      <span className="font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
                        Progress to Level {profile.activeLanguage.level + 1}
                      </span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-xs md:text-base">
                        {currentXP} / {nextLevelXP}
                      </span>
                    </div>
                    <Progress value={xpProgress} className="h-2 md:h-3" />
                    <div className="flex items-center justify-between text-xs md:text-sm text-slate-500 dark:text-slate-400">
                      <span>{Math.round(xpProgress)}% Complete</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {nextLevelXP - currentXP} XP to go!
                      </span>
                    </div>
                  </div>
                </div>

                {/* Settings Button - Desktop */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hidden md:flex flex-shrink-0 self-start hover:scale-105 transition-transform border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <StatCard
              icon={Trophy}
              label="Total XP"
              value={profileStats.totalXP.toLocaleString()}
              bgColor="bg-emerald-50 dark:bg-emerald-950/30"
              borderColor="border-emerald-200 dark:border-emerald-900/50"
              iconGradient="from-emerald-500 to-teal-500"
              textColor="text-emerald-700 dark:text-emerald-400"
            />
            <StatCard
              icon={BookOpen}
              label="Practice"
              value={profileStats.practiceCompleted}
              bgColor="bg-blue-50 dark:bg-blue-950/30"
              borderColor="border-blue-200 dark:border-blue-900/50"
              iconGradient="from-blue-500 to-cyan-500"
              textColor="text-blue-700 dark:text-blue-400"
            />
            <StatCard
              icon={Flame}
              label="Streak"
              value={`${profileStats.currentStreak}`}
              bgColor="bg-orange-50 dark:bg-orange-950/30"
              borderColor="border-orange-200 dark:border-orange-900/50"
              iconGradient="from-orange-500 to-red-500"
              textColor="text-orange-700 dark:text-orange-400"
            />
            <button 
              onClick={() => setShowAvatarModal(true)}
              className="bg-pink-50 dark:bg-pink-950/30 border-2 border-pink-200 dark:border-pink-900/50 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center gap-2.5 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-0.5">
                    Avatar
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-pink-700 dark:text-pink-400 truncate">
                    {profileStats.achievements}
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4 md:mb-6 h-10 md:h-12 bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-lg">
              <TabsTrigger 
                value="skills" 
                className="gap-2 text-xs md:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded dark:text-slate-400 dark:data-[state=active]:text-white"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="gap-2 text-xs md:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded dark:text-slate-400 dark:data-[state=active]:text-white"
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Awards</span>
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="gap-2 text-xs md:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded dark:text-slate-400 dark:data-[state=active]:text-white"
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
            </TabsList>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    Skill Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-5 p-4 md:p-6">
                  <SkillProgressBar
                    name="Listening"
                    progress={Math.round(profileStats.skillProgress.listening)}
                    icon={Headphones}
                    color="from-blue-500 to-cyan-500"
                  />
                  <SkillProgressBar
                    name="Speaking"
                    progress={Math.round(profileStats.skillProgress.speaking)}
                    icon={Mic}
                    color="from-pink-500 to-rose-500"
                  />
                  <SkillProgressBar
                    name="Reading"
                    progress={Math.round(profileStats.skillProgress.reading)}
                    icon={BookOpen}
                    color="from-purple-500 to-indigo-500"
                  />
                  <SkillProgressBar
                    name="Writing"
                    progress={Math.round(profileStats.skillProgress.writing)}
                    icon={PenTool}
                    color="from-orange-500 to-amber-500"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
<TabsContent value="achievements">
  <div className="space-y-4 md:space-y-6">
    
    {/* ✅ NEW: Achievements Stats Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-center">
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {achievementStats.total}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">Total</div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-center">
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {achievementStats.locked}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">Locked</div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-center">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {achievementStats.unlocked}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">Unlocked</div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-center">
        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          {achievementStats.claimed}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">Claimed</div>
      </div>
    </div>

    {/* ✅ NEW: Category Filter */}
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-all ${
            selectedCategory === cat
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>

    {/* ✅ NEW: Achievements Grid (Unlocked + Lockable) */}
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
      <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Trophy className="w-5 h-5 text-amber-500" />
          All Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {isLoadingAchievements ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-slate-600 dark:text-slate-400">Loading achievements...</p>
            </div>
          </div>
        ) : filteredAchievements.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClaim={handleClaimAchievement}
                isClaiming={claiming === achievement.id}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-12 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <p className="text-slate-600 dark:text-slate-400">No achievements in this category</p>
          </div>
        )}
      </CardContent>
    </Card>

    {/* ✅ KEPT: Recent Achievements from Stats */}
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
      <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Recent Claims
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {profileStats.recentAchievements.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {profileStats.recentAchievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className="p-3 md:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-2xl md:text-3xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${achievement.color} flex-shrink-0`}>
                    {achievement.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base mb-0.5">{achievement.name}</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">{achievement.description}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs dark:border-slate-700 dark:text-slate-400">
                    {achievement.date}
                  </Badge>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="mb-1">No achievements claimed yet</p>
            <p className="text-sm">Claim achievements to see them here!</p>
          </div>
        )}
      </CardContent>
    </Card>

    {/* ✅ KEPT: Avatar Collection Section */}
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
      <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Crown className="w-5 h-5 text-amber-500" />
          Avatar Collection
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {isLoadingAvatars ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-slate-600 dark:text-slate-400 text-sm">Loading avatars...</p>
          </div>
        ) : ownedAvatars.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {ownedAvatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => handleEquipAvatar(avatar.id)}
                disabled={avatar.equipped || equippingAvatarId === avatar.id}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-default max-w-[180px] md:max-w-[200px] mx-auto ${
                  avatar.equipped
                    ? 'border-emerald-500 ring-2 ring-emerald-400 shadow-lg dark:border-emerald-400 dark:ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              >
                <img 
                  src={avatar.iconUrl}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                />
                {avatar.equipped && (
                  <div className="absolute inset-0 bg-emerald-500 dark:bg-emerald-600 bg-opacity-20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-emerald-500 dark:bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white drop-shadow-lg" />
                    </div>
                  </div>
                )}
                <div className="absolute top-1 right-1 px-2 py-1 bg-black bg-opacity-70 text-white text-xs font-semibold rounded">
                  {avatar.rarity}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Crown className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="mb-1">No avatars owned</p>
            <p className="text-sm">Visit the shop to purchase avatars!</p>
          </div>
        )}
      </CardContent>
    </Card>
  </div>

  {/* ✅ Celebration Modal */}
  {celebration && (
    <CelebrationModal
      achievement={celebration}
      onContinue={handleContinue}
    />
  )}
</TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  {profileStats.activityHistory.length > 0 ? (
                    <div className="space-y-2 md:space-y-3">
                      {profileStats.activityHistory.map((activity, index) => (
                        <div 
                          key={index} 
                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 p-3 md:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm hover:scale-[1.01] transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                              <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
                                {new Date(activity.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </div>
                              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5" />
                                {activity.lessons} lessons completed
                              </div>
                            </div>
                          </div>
                          <div className="text-right md:text-right">
                            <div className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1">
                              <TrendingUp className="w-4 h-4" />
                              +{activity.xp}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">XP Earned</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p className="mb-1">No recent activity</p>
                      <p className="text-sm">Start learning to see your progress!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl md:rounded-2xl w-full md:w-96 max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-800">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Select Avatar</h3>
              <button onClick={() => setShowAvatarModal(false)} className="text-slate-600 dark:text-slate-400 text-xl hover:scale-110 transition-transform">✕</button>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <button
                  key={i}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center text-3xl relative transition-all ${
                    i === 1 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-400' 
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:scale-105'
                  }`}
                >
                  {i === 1 && (
                    <div className="absolute top-1 right-1 w-6 h-6 bg-emerald-500 dark:bg-emerald-400 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span>{['🤖', '👨‍💻', '🧑‍🎓', '🎨', '🚀', '⭐'][i - 1]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  bgColor,
  borderColor,
  iconGradient,
  textColor,
  pulse = false,
}: {
  icon: any
  label: string
  value: string | number
  bgColor: string
  borderColor: string
  iconGradient: string
  textColor: string
  pulse?: boolean
}) {
  return (
    <Card className={`border ${borderColor} shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900`}>
      <CardContent className={`p-3 md:p-4 bg-gradient-to-br ${bgColor}`}>
        <div className="flex items-center gap-2.5 md:gap-3">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${iconGradient} flex items-center justify-center flex-shrink-0 ${pulse ? 'animate-pulse' : ''}`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-0.5">
              {label}
            </div>
            <div className={`text-xl md:text-2xl font-bold ${textColor} truncate`}>
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
    <div className="p-3 md:p-5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 md:gap-3">
          <div className={`w-9 h-9 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-lg">{name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-lg md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">{progress}%</span>
          {progress >= 80 && <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-500 fill-amber-500" />}
        </div>
      </div>
      <Progress value={progress} className="h-2 md:h-3" />
      <div className="mt-2 flex justify-between text-xs md:text-sm text-slate-500 dark:text-slate-400">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  )
}