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
import { Settings, Trophy, Target, Calendar, Award, BookOpen, Headphones, Mic, PenTool } from "lucide-react"
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
    { id: 1, name: "Week Warrior", description: "7-day streak", icon: "🔥", date: "Today" },
    { id: 2, name: "Practice Master", description: "Complete 50 practices", icon: "🎯", date: "2 days ago" },
    { id: 3, name: "Level 15", description: "Reach level 15", icon: "⭐", date: "3 days ago" },
    { id: 4, name: "Reading Pro", description: "90% reading accuracy", icon: "📚", date: "1 week ago" },
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const nextLevelXP = user.level * 1000
  const xpProgress = (user.xp / nextLevelXP) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      {/* Profile Header */}
      {/* <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300"> */}
      <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl">
                  🎯
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{user.email?.split("@")[0]}</h1>
                    <Badge className="bg-accent">Level {user.level}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{user.email}</p>

                  {/* XP Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress to Level {user.level + 1}</span>
                      <span className="font-semibold">
                        {user.xp} / {nextLevelXP} XP
                      </span>
                    </div>
                    <Progress value={xpProgress} className="h-3" />
                  </div>
                </div>

                {/* Settings Button */}
                <Button variant="outline" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total XP</div>
                    <div className="text-xl font-bold">{profileStats.totalXP.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                    <div className="text-xl font-bold">{profileStats.lessonsCompleted}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                    <div className="text-xl font-bold">{profileStats.currentStreak} 🔥</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-pink-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                    <div className="text-xl font-bold">{profileStats.achievements}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <SkillProgressBar
                    name="Listening"
                    progress={profileStats.skillProgress.listening}
                    icon={Headphones}
                    color="from-blue-500 to-cyan-600"
                  />
                  <SkillProgressBar
                    name="Speaking"
                    progress={profileStats.skillProgress.speaking}
                    icon={Mic}
                    color="from-pink-500 to-rose-600"
                  />
                  <SkillProgressBar
                    name="Reading"
                    progress={profileStats.skillProgress.reading}
                    icon={BookOpen}
                    color="from-purple-500 to-indigo-600"
                  />
                  <SkillProgressBar
                    name="Writing"
                    progress={profileStats.skillProgress.writing}
                    icon={PenTool}
                    color="from-orange-500 to-amber-600"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {profileStats.recentAchievements.map((achievement) => (
                      <div key={achievement.id} className="p-4 bg-muted rounded-xl hover:bg-muted/80 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="font-bold">{achievement.name}</div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{achievement.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profileStats.activityHistory.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-semibold">{new Date(activity.date).toLocaleDateString()}</div>
                            <div className="text-sm text-muted-foreground">{activity.lessons} lessons completed</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-success">+{activity.xp} XP</div>
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
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold">{name}</span>
        </div>
        <span className="font-bold text-success">{progress}%</span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  )
}
