"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Headphones, Mic, BookOpen, PenTool, Play, Trophy } from "lucide-react"
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
    color: "from-blue-500 to-cyan-600",
    stats: { completed: 12, accuracy: 85 },
  },
  {
    id: "speaking",
    name: "Speaking",
    description: "Improve your pronunciation and fluency",
    icon: Mic,
    color: "from-pink-500 to-rose-600",
    stats: { completed: 8, accuracy: 78 },
  },
  {
    id: "reading",
    name: "Reading",
    description: "Enhance reading comprehension skills",
    icon: BookOpen,
    color: "from-purple-500 to-indigo-600",
    stats: { completed: 15, accuracy: 92 },
  },
  {
    id: "writing",
    name: "Writing",
    description: "Practice writing and composition",
    icon: PenTool,
    color: "from-orange-500 to-amber-600",
    stats: { completed: 10, accuracy: 80 },
  },
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
    <div className="min-h-screen bg-background">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={() => {}} />

      <main className="mt-16 p-8 transition-all duration-300 md:ml-20 min-[1200px]:ml-96">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Practice Zone</h1>
            <p className="text-muted-foreground text-lg">
              Master the 4 essential language skills through free practice
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {practiceSkills.map((skill) => {
              const Icon = skill.icon
              return (
                <Card key={skill.id} className="border-2 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{skill.name}</CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Completed</div>
                        <div className="text-xl font-bold">{skill.stats.completed}</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Accuracy</div>
                        <div className="text-xl font-bold text-success">{skill.stats.accuracy}%</div>
                      </div>
                    </div>

                    {/* Start Button */}
                    <Link href={`/practice/${skill.id}`}>
                      <Button className="w-full" size="lg">
                        <Play className="w-5 h-5 mr-2" />
                        Start Practice
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Practice Sessions</CardTitle>
                <Trophy className="w-6 h-6 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SessionItem skill="Reading" score={95} xp={120} time="2 hours ago" />
                <SessionItem skill="Listening" score={88} xp={100} time="5 hours ago" />
                <SessionItem skill="Speaking" score={82} xp={90} time="Yesterday" />
                <SessionItem skill="Writing" score={90} xp={110} time="Yesterday" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function SessionItem({ skill, score, xp, time }: { skill: string; score: number; xp: number; time: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Badge variant="secondary">{skill.slice(0, 1)}</Badge>
        </div>
        <div>
          <div className="font-semibold">{skill} Practice</div>
          <div className="text-sm text-muted-foreground">{time}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-success">{score}%</div>
        <div className="text-sm text-muted-foreground">+{xp} XP</div>
      </div>
    </div>
  )
}
