"use client"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, Users, Crown, Medal, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Mock leaderboard data
const leaderboardData = {
  global: [
    { rank: 1, name: "Alex Chen", level: 42, xp: 125000, streak: 365, avatar: "🦸" },
    { rank: 2, name: "Maria Garcia", level: 40, xp: 118000, streak: 280, avatar: "🧙" },
    { rank: 3, name: "John Smith", level: 38, xp: 112000, streak: 245, avatar: "🦹" },
    { rank: 4, name: "Sarah Johnson", level: 36, xp: 105000, streak: 220, avatar: "🧝" },
    { rank: 5, name: "David Lee", level: 35, xp: 98000, streak: 200, avatar: "🦊" },
    { rank: 6, name: "Emma Wilson", level: 34, xp: 92000, streak: 180, avatar: "🐱" },
    { rank: 7, name: "Michael Brown", level: 33, xp: 88000, streak: 165, avatar: "🐼" },
    { rank: 8, name: "Lisa Anderson", level: 32, xp: 84000, streak: 150, avatar: "🦁" },
    { rank: 9, name: "James Taylor", level: 31, xp: 80000, streak: 140, avatar: "🐯" },
    { rank: 10, name: "You", level: 15, xp: 45000, streak: 7, avatar: "🎯", isCurrentUser: true },
  ],
  friends: [
    { rank: 1, name: "Sarah Johnson", level: 36, xp: 105000, streak: 220, avatar: "🧝" },
    { rank: 2, name: "Emma Wilson", level: 34, xp: 92000, streak: 180, avatar: "🐱" },
    { rank: 3, name: "You", level: 15, xp: 45000, streak: 7, avatar: "🎯", isCurrentUser: true },
    { rank: 4, name: "Tom Harris", level: 12, xp: 38000, streak: 5, avatar: "🐶" },
    { rank: 5, name: "Nina Patel", level: 10, xp: 32000, streak: 3, avatar: "🦄" },
  ],
  weekly: [
    { rank: 1, name: "Emma Wilson", level: 34, xp: 8500, streak: 7, avatar: "🐱" },
    { rank: 2, name: "You", level: 15, xp: 7200, streak: 7, avatar: "🎯", isCurrentUser: true },
    { rank: 3, name: "Sarah Johnson", level: 36, xp: 6800, streak: 7, avatar: "🧝" },
    { rank: 4, name: "Tom Harris", level: 12, xp: 5500, streak: 6, avatar: "🐶" },
    { rank: 5, name: "Nina Patel", level: 10, xp: 4200, streak: 5, avatar: "🦄" },
  ],
}

export default function LeaderboardPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      {/* <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300"> */}
      <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground text-lg">Compete with learners around the world</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Global Rank</div>
                    <div className="text-2xl font-bold">#10</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">+3</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Players</div>
                    <div className="text-2xl font-bold">1.2M</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Tabs */}
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
              <TabsTrigger value="global" className="gap-2">
                <Trophy className="w-4 h-4" />
                Global
              </TabsTrigger>
              <TabsTrigger value="friends" className="gap-2">
                <Users className="w-4 h-4" />
                Friends
              </TabsTrigger>
              <TabsTrigger value="weekly" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                This Week
              </TabsTrigger>
            </TabsList>

            <TabsContent value="global">
              <Card>
                <CardHeader>
                  <CardTitle>Global Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboardData.global.map((player) => (
                      <LeaderboardRow key={player.rank} player={player} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="friends">
              <Card>
                <CardHeader>
                  <CardTitle>Friends Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboardData.friends.map((player) => (
                      <LeaderboardRow key={player.rank} player={player} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboardData.weekly.map((player) => (
                      <LeaderboardRow key={player.rank} player={player} />
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

function LeaderboardRow({ player }: { player: any }) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-amber-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
        player.isCurrentUser
          ? "bg-primary/10 border-2 border-primary"
          : player.rank <= 3
            ? "bg-gradient-to-r from-teal-500/5 to-transparent"
            : "bg-muted hover:bg-muted/80"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Rank */}
        <div className="w-12 flex items-center justify-center">{getRankIcon(player.rank)}</div>

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
          {player.avatar}
        </div>

        {/* Player Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{player.name}</span>
            {player.isCurrentUser && <Badge variant="secondary">You</Badge>}
          </div>
          <div className="text-sm text-muted-foreground">Level {player.level}</div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">XP</div>
            <div className="font-bold">{player.xp.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Streak</div>
            <div className="font-bold text-teal-600 dark:text-teal-400">{player.streak} 🔥</div>
          </div>
        </div>
      </div>
    </div>
  )
}
