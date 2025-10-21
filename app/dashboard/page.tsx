"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Map, Dumbbell, Target, Trophy, Flame, Star, Coins, Sparkles, Zap, Award, Gift } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import TopBar from "@/components/top-bar"
import { useNavigation } from "@/lib/navigation-context"
import { useTheme } from "@/lib/theme-context"

// API Client
const API_BASE_URL = "http://localhost:3000/api"

const apiClient = {
  async getProfile() {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Failed to fetch profile")
    return response.json()
  },

  async getProgress() {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE_URL}/learning/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Failed to fetch progress")
    return response.json()
  },

  async getMissions() {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE_URL}/missions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Failed to fetch missions")
    return response.json()
  },
}

export default function DashboardPage() {
  const router = useRouter()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [progress, setProgress] = useState<any>(null)
  const [missions, setMissions] = useState<any[]>([])

  const items = [
    { label: "Listen", lightBg: "bg-blue-50", darkBg: "dark:bg-blue-900/30", color: "blue" },
    { label: "Speak", lightBg: "bg-pink-50", darkBg: "dark:bg-slate-800", color: "pink" },
    { label: "Read", lightBg: "bg-purple-50", darkBg: "dark:bg-slate-800", color: "purple" },
    { label: "Write", lightBg: "bg-orange-50", darkBg: "dark:bg-orange-900/30", color: "orange" },
  ]


  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/login")
      return
    }

    const fetchData = async () => {
      try {
        const [profileData, progressData, missionsData] = await Promise.all([
          apiClient.getProfile(),
          apiClient.getProgress(),
          apiClient.getMissions(),
        ])

        setProfile(profileData)
        setProgress(progressData)
        setMissions(missionsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        if (error instanceof Error && error.message.includes("401")) {
          localStorage.removeItem("accessToken")
          router.push("/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!profile || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Unable to load dashboard data</p>
          <Button onClick={() => window.location.reload()} className="bg-sky-500 hover:bg-sky-600">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  const activeLanguage = profile.activeLanguage
  const dailyMission = missions.find((m) => m.type === "daily")
  const activeMissionsCount = missions.filter((m) => m.status === "in_progress").length

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
                Welcome back, {profile.username}!
              </h1>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Ready to continue your {activeLanguage?.name} learning journey?
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<Star className="w-6 h-6" />}
              label="Level"
              value={activeLanguage?.level?.toString() || "1"}
              color="from-indigo-500 to-purple-500"
            />
            <StatCard
              icon={<Flame className="w-6 h-6" />}
              label="Day Streak"
              value={`${activeLanguage?.currentStreak || 0}`}
              color="from-orange-500 to-red-500"
            />
            <StatCard
              icon={<Trophy className="w-6 h-6" />}
              label="XP"
              value={activeLanguage?.totalXp || "0"}
              color="from-emerald-500 to-teal-500"
            />
            <StatCard
              icon={<Coins className="w-6 h-6" />}
              label="Coins"
              value={profile.coins.toString()}
              color="from-amber-500 to-yellow-500"
            />
          </div>

          {/* Main Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link href="/map" className="block">
              <Card className="hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 dark:hover:border-indigo-500 h-full">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                      <Map className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-900 dark:text-white">
                        Learning Map
                        <Badge className="bg-purple-500 text-white border-0 text-xs">Active</Badge>
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                        Continue your structured lessons
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-600 dark:text-gray-400">Overall Progress</span>
                      <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                        {progress.overall.completionPercentage}%
                      </span>
                    </div>
                    <Progress value={progress.overall.completionPercentage} className="h-2.5 bg-gray-200 dark:bg-slate-700" />
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {progress.overall.completedLessons} / {progress.overall.totalLessons} lessons
                      </span>
                      <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Keep going! 🚀</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice" className="block">
              <Card className="hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-slate-800 border-pink-200 dark:border-pink-700 hover:border-pink-400 dark:hover:border-pink-500 h-full">
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
                      <Dumbbell className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-900 dark:text-white">
                        Practice Zone
                        <Badge className="bg-pink-500 text-white border-0 text-xs">Hot 🔥</Badge>
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                        Free practice in 4 skills
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Listen", color: "blue" },
                      { label: "Speak", color: "pink" },
                      { label: "Read", color: "purple" },
                      { label: "Write", color: "orange" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`
                          flex flex-col items-center justify-center
                          py-4 md:py-5 px-3
                          rounded-xl border
                          bg-${item.color}-50
                          ${
                            item.color === "pink" || item.color === "purple"
                              ? "dark:bg-blue-900/30" // 👈 fix: dùng cùng nền như Listen/Write
                              : `dark:bg-${item.color}-900/30`
                          }
                          border-${item.color}-200 dark:border-${item.color}-700
                          hover:shadow-sm hover:scale-[1.01]
                          transition-all duration-200
                        `}
                      >
                        <div
                          className={`text-base font-semibold text-${item.color}-700 dark:text-${item.color}-300`}
                        >
                          {item.label}
                        </div>
                        <div
                          className={`text-xs text-${item.color}-500 dark:text-${item.color}-400 mt-0.5`}
                        >
                          Practice
                        </div>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Daily Mission */}
          {dailyMission && (
            <Card className="mb-8 bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-700 shadow-md">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold flex items-center gap-2 mb-1 text-gray-900 dark:text-white">
                        Daily Mission
                        <Badge className="bg-red-500 text-white border-0 text-xs">Limited Time</Badge>
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{dailyMission.description}</p>
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
                    <span className="font-semibold text-base text-gray-900 dark:text-white">
                      {dailyMission.description}
                    </span>
                    <span className="text-xl font-semibold text-amber-600 dark:text-amber-400">
                      {dailyMission.currentProgress}/{dailyMission.targetProgress}
                    </span>
                  </div>
                  <Progress value={dailyMission.progressPercentage} className="h-2.5 bg-gray-200 dark:bg-slate-700" />
                  <div className="flex items-center gap-4 text-sm flex-wrap pt-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-700">
                      <Gift className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">Rewards:</span>
                    </div>
                    {dailyMission.rewards.coins > 0 && (
                      <div className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Coins className="w-4 h-4" />+{dailyMission.rewards.coins} coins
                      </div>
                    )}
                    {dailyMission.rewards.gems > 0 && (
                      <div className="font-semibold text-pink-600 dark:text-pink-400 flex items-center gap-1">
                        💎 +{dailyMission.rewards.gems} gems
                      </div>
                    )}
                    {dailyMission.rewards.xp > 0 && (
                      <div className="font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                        <Star className="w-4 h-4" />+{dailyMission.rewards.xp} XP
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link href="/missions" className="block">
              <Card className="hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-base mb-1 text-gray-900 dark:text-white">Missions</div>
                      <div className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {activeMissionsCount} active missions
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/shop" className="block">
              <Card className="hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-slate-800 border-pink-200 dark:border-pink-700 hover:border-pink-400 dark:hover:border-pink-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl shadow-md">
                      🛍️
                    </div>
                    <div>
                      <div className="font-semibold text-base mb-1 text-gray-900 dark:text-white">Shop</div>
                      <div className="text-sm font-medium text-pink-600 dark:text-pink-400 flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        New items available
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/leaderboard" className="block">
              <Card className="hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-base mb-1 text-gray-900 dark:text-white">Leaderboard</div>
                      <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        Compete now
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Topics Progress */}
          {progress.topics && progress.topics.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Progress by Topic</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {progress.topics.map((topic: any) => (
                  <Card key={topic.topicId} className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-base text-gray-900 dark:text-white">{topic.topicTitle}</h3>
                        {topic.isCompleted && <Badge className="bg-green-500 text-white border-0">✓ Done</Badge>}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            {topic.completed}/{topic.total}
                          </span>
                        </div>
                        <Progress value={topic.percentage} className="h-2 bg-gray-200 dark:bg-slate-700" />
                        <div className="text-xs text-gray-500 dark:text-gray-400">{topic.percentage}% complete</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
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
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <Card className="hover:shadow-lg transition-all bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md`}>
            {icon}
          </div>
          <div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
              {label}
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}