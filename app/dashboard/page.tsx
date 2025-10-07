"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Map, Dumbbell, Target, Trophy, Flame, Star, Coins } from "lucide-react"
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
    <div className="min-h-screen bg-background">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 min-[1200px]:ml-96 mt-16 p-6 md:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome back, {user.username}!
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">Ready to continue your learning journey?</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <StatCard
              icon={<Star className="w-5 h-5 md:w-6 md:h-6" />}
              label="Level"
              value={user.level.toString()}
              color="primary"
            />
            <StatCard
              icon={<Flame className="w-5 h-5 md:w-6 md:h-6" />}
              label="Day Streak"
              value={`${user.streak}`}
              color="orange"
            />
            <StatCard
              icon={<Trophy className="w-5 h-5 md:w-6 md:h-6" />}
              label="XP"
              value={user.xp.toString()}
              color="success"
            />
            <StatCard
              icon={<Coins className="w-5 h-5 md:w-6 md:h-6" />}
              label="Coins"
              value={user.coins.toString()}
              color="accent"
            />
          </div>

          {/* Main Actions */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <Link href="/map" className="group">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary hover:scale-[1.02] duration-300 bg-gradient-to-br from-card to-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Map className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl md:text-2xl">Learning Map</CardTitle>
                      <CardDescription className="text-sm">Continue your structured lessons</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-primary">35%</span>
                    </div>
                    <Progress value={35} className="h-2.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice" className="group">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-pink-500 hover:scale-[1.02] duration-300 bg-gradient-to-br from-card to-pink-500/5">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Dumbbell className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl md:text-2xl">Practice Zone</CardTitle>
                      <CardDescription className="text-sm">Free practice in 4 skills</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
                      <div className="text-xs text-muted-foreground">Listen</div>
                      <div className="font-bold text-blue-600 dark:text-blue-400">12</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-lg border border-pink-500/20">
                      <div className="text-xs text-muted-foreground">Speak</div>
                      <div className="font-bold text-pink-600 dark:text-pink-400">8</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
                      <div className="text-xs text-muted-foreground">Read</div>
                      <div className="font-bold text-purple-600 dark:text-purple-400">15</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg border border-orange-500/20">
                      <div className="text-xs text-muted-foreground">Write</div>
                      <div className="font-bold text-orange-600 dark:text-orange-400">10</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Daily Mission */}
          <Card className="mb-8 border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle>Daily Mission</CardTitle>
                </div>
                <Link href="/missions">
                  <Button variant="outline" size="sm" className="hover:bg-amber-500/10 bg-transparent">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Complete 3 lessons today</span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">1/3</span>
                </div>
                <Progress value={33} className="h-2.5 bg-secondary" />
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Reward:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Coins className="w-4 h-4" />
                    +50 coins
                  </span>
                  <span className="font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1">💎 +5 gems</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/missions" className="group">
              <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] duration-300 border-2 hover:border-amber-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Missions</div>
                      <div className="text-sm text-muted-foreground">3 active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/shop" className="group">
              <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] duration-300 border-2 hover:border-pink-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg transition-shadow">
                      🛍️
                    </div>
                    <div>
                      <div className="font-bold text-lg">Shop</div>
                      <div className="text-sm text-muted-foreground">New items</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/leaderboard" className="group">
              <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] duration-300 border-2 hover:border-emerald-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Leaderboard</div>
                      <div className="text-sm text-muted-foreground">Rank #42</div>
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
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  const colorClasses = {
    primary: "from-indigo-500 via-purple-500 to-pink-500",
    orange: "from-orange-500 via-red-500 to-pink-500",
    success: "from-emerald-500 via-teal-500 to-cyan-500",
    accent: "from-amber-500 via-orange-500 to-red-500",
  }

  return (
    <Card className="hover:shadow-lg transition-all hover:scale-[1.02] duration-300 border-2 hover:border-primary/50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-white shadow-md`}
          >
            {icon}
          </div>
          <div>
            <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
            <div className="text-xl md:text-2xl font-bold">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
