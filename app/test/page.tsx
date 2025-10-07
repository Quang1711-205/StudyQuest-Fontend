"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const testLevels = [
  {
    level: "A",
    name: "Beginner",
    description: "Test your basic language skills",
    duration: "15 minutes",
    questions: 15,
    color: "from-green-500 to-emerald-600",
  },
  {
    level: "B",
    name: "Intermediate",
    description: "Evaluate your intermediate proficiency",
    duration: "20 minutes",
    questions: 15,
    color: "from-blue-500 to-cyan-600",
  },
  {
    level: "C",
    name: "Advanced",
    description: "Challenge your advanced knowledge",
    duration: "25 minutes",
    questions: 15,
    color: "from-purple-500 to-pink-600",
  },
]

const previousTests = [
  {
    id: 1,
    level: "B",
    score: 87,
    date: "2025-01-05",
    skillScores: { vocab: 100, grammar: 75, listening: 100, reading: 67 },
  },
  {
    id: 2,
    level: "A",
    score: 93,
    date: "2025-01-01",
    skillScores: { vocab: 100, grammar: 100, listening: 80, reading: 90 },
  },
]

export default function TestsPage() {
  const { user, isLoading } = useAuth()
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <Navigation />
      <TopBar />

      <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              Placement Tests
            </h1>
            <p className="text-muted-foreground text-lg">
              Take a placement test to evaluate your language proficiency and get personalized feedback
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testLevels.map((test) => (
              <Card
                key={test.level}
                className="border-2 hover:border-primary hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${test.color}`} />
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${test.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Level {test.level}</CardTitle>
                  <CardDescription className="text-base font-medium">{test.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{test.description}</p>

                  <div className="space-y-2 bg-muted/50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{test.questions} questions</span>
                    </div>
                  </div>

                  <Link href={`/tests/${test.level.toLowerCase()}`}>
                    <Button
                      className={`w-full bg-gradient-to-r ${test.color} hover:opacity-90 shadow-lg hover:shadow-xl transition-all`}
                      size="lg"
                    >
                      Start Test
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {previousTests.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-7 h-7 text-primary" />
                Previous Tests
              </h2>
              <div className="space-y-4">
                {previousTests.map((test) => (
                  <Card key={test.id} className="border-2 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-white">{test.level}</span>
                          </div>
                          <div>
                            <div className="font-bold text-lg">Level {test.level} Test</div>
                            <div className="text-sm text-muted-foreground">
                              Completed on {new Date(test.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                          <div className="text-center bg-gradient-to-br from-success/10 to-emerald-500/10 px-6 py-3 rounded-xl border border-success/20">
                            <div className="text-3xl font-bold text-success">{test.score}%</div>
                            <div className="text-xs text-muted-foreground">Overall Score</div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {Object.entries(test.skillScores).map(([skill, score]) => (
                              <Badge key={skill} variant="outline" className="capitalize font-medium">
                                {skill}: {score}%
                              </Badge>
                            ))}
                          </div>

                          <Link href={`/tests/result/${test.id}`}>
                            <Button
                              variant="outline"
                              className="shadow-md hover:shadow-lg transition-shadow bg-transparent"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Award className="w-7 h-7 text-primary" />
                About Placement Tests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Our placement tests evaluate your language proficiency across four key skills: vocabulary, grammar,
                listening, and reading comprehension.
              </p>
              <p>
                After completing a test, you'll receive detailed AI-generated feedback highlighting your strengths,
                areas for improvement, and personalized recommendations for your learning journey.
              </p>
              <p className="font-medium text-foreground">
                Choose the level that best matches your current abilities and take your time with each question.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
