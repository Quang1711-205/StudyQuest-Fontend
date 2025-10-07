"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Confetti } from "@/components/confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, TrendingDown, Award, Lightbulb, Target, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const mockResult = {
  id: 1,
  level: "B",
  score: 87,
  date: "2025-01-05",
  duration: "18:32",
  skillScores: {
    vocab: { score: 100, correct: 5, total: 5 },
    grammar: { score: 75, correct: 3, total: 4 },
    listening: { score: 100, correct: 3, total: 3 },
    reading: { score: 67, correct: 2, total: 3 },
  },
  strengths: [
    "Excellent vocabulary knowledge at intermediate level",
    "Perfect listening comprehension",
    "Strong understanding of common phrases",
  ],
  improvements: [
    "Focus on complex grammar structures, especially conditionals",
    "Practice reading longer passages for better comprehension",
    "Review verb tenses and their usage in different contexts",
  ],
  recommendations: [
    "Complete the 'Advanced Grammar' topic in the learning map",
    "Practice reading exercises daily for 15 minutes",
    "Take the Advanced (Level C) test when you feel ready",
  ],
}

export default function TestResultPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [showConfetti, setShowConfetti] = useState(true)

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <Navigation />
      <TopBar />
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/tests">
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Test Results
              </h1>
              <p className="text-muted-foreground">
                Level {mockResult.level} • {mockResult.date}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-success shadow-xl bg-gradient-to-br from-success/5 to-emerald-500/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-success mb-2">{mockResult.score}%</div>
                <p className="text-sm text-muted-foreground">Great performance!</p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Test Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-primary mb-2">{mockResult.duration}</div>
                <p className="text-sm text-muted-foreground">Time taken</p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-xl bg-gradient-to-br from-accent/5 to-yellow-500/5">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-accent mb-2">{mockResult.level}</div>
                <p className="text-sm text-muted-foreground">Intermediate</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Target className="w-6 h-6 text-primary" />
                Skill Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(mockResult.skillScores).map(([skill, data]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="capitalize font-bold text-lg">{skill}</span>
                      <Badge variant="outline" className="font-medium">
                        {data.correct}/{data.total} correct
                      </Badge>
                    </div>
                    <span className="text-2xl font-bold text-primary">{data.score}%</span>
                  </div>
                  <Progress value={data.score} className="h-3 shadow-inner" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-success/30 shadow-xl bg-gradient-to-br from-success/5 to-emerald-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-success">
                  <TrendingUp className="w-6 h-6" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockResult.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/30 shadow-xl bg-gradient-to-br from-accent/5 to-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-accent">
                  <TrendingDown className="w-6 h-6" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockResult.improvements.map((improvement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Target className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lightbulb className="w-7 h-7 text-primary" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {mockResult.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 bg-card rounded-xl border shadow-sm">
                    <Award className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Link href="/tests" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 text-base shadow-md hover:shadow-lg transition-shadow bg-transparent"
              >
                Back to Tests
              </Button>
            </Link>
            <Link href="/map" className="flex-1">
              <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-shadow">
                Continue Learning
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
