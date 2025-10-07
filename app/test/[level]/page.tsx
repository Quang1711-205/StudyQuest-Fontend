"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Confetti } from "@/components/confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, CheckCircle2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const mockTestData = {
  a: {
    name: "Beginner Test",
    duration: 900,
    questions: [
      {
        id: 1,
        type: "vocab",
        question: "What is the meaning of 'apple'?",
        options: ["Táo", "Chuối", "Cam", "Nho"],
        correctAnswer: 0,
      },
      {
        id: 2,
        type: "grammar",
        question: "Choose the correct sentence:",
        options: ["I am student", "I is a student", "I am a student", "I are student"],
        correctAnswer: 2,
      },
      {
        id: 3,
        type: "listening",
        question: "Listen and select what you hear:",
        audioUrl: "/audio/test.mp3",
        options: ["Good morning", "Good evening", "Good night", "Good afternoon"],
        correctAnswer: 0,
      },
    ],
  },
  b: {
    name: "Intermediate Test",
    duration: 1200,
    questions: [
      {
        id: 1,
        type: "vocab",
        question: "What does 'accomplish' mean?",
        options: ["Hoàn thành", "Bắt đầu", "Tiếp tục", "Dừng lại"],
        correctAnswer: 0,
      },
      {
        id: 2,
        type: "grammar",
        question: "Which sentence uses the present perfect correctly?",
        options: ["I have went to Paris", "I have gone to Paris", "I has gone to Paris", "I have go to Paris"],
        correctAnswer: 1,
      },
    ],
  },
  c: {
    name: "Advanced Test",
    duration: 1500,
    questions: [
      {
        id: 1,
        type: "vocab",
        question: "What is a synonym for 'ubiquitous'?",
        options: ["Rare", "Omnipresent", "Absent", "Limited"],
        correctAnswer: 1,
      },
      {
        id: 2,
        type: "grammar",
        question: "Identify the sentence with correct subjunctive mood:",
        options: [
          "If I was rich, I would travel",
          "If I were rich, I would travel",
          "If I am rich, I would travel",
          "If I be rich, I would travel",
        ],
        correctAnswer: 1,
      },
    ],
  },
}

export default function TestLevelPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const level = params.level as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const testData = mockTestData[level as keyof typeof mockTestData]

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (testData) {
      setTimeLeft(testData.duration)
    }
  }, [testData])

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isComplete) {
      handleComplete()
    }
  }, [timeLeft, isComplete])

  if (isLoading || !user || !testData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const question = testData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / testData.questions.length) * 100

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return
    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
  }

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer ?? -1]
    setAnswers(newAnswers)

    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    setShowConfetti(true)
    setIsComplete(true)
  }

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(question.question)
    window.speechSynthesis.speak(utterance)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isComplete) {
    const correctAnswers = answers.filter((ans, idx) => ans === testData.questions[idx]?.correctAnswer).length
    const score = Math.round((correctAnswers / testData.questions.length) * 100)

    setTimeout(() => {
      router.push(`/tests/result/${Date.now()}`)
    }, 3000)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <Navigation />
        <TopBar />
        <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

        <main className="ml-20 min-[1200px]:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center border-2 border-primary shadow-2xl">
              <CardHeader>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-bounce shadow-lg">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl md:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Test Complete!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-transparent animate-pulse">
                  {score}%
                </div>
                <p className="text-muted-foreground text-lg">Redirecting to detailed results...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <Navigation />
      <TopBar />
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white capitalize">
                  {question.type}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1}/{testData.questions.length}
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.type === "listening" && (
                <Button
                  onClick={playAudio}
                  variant="outline"
                  className="w-full h-16 text-lg shadow-md hover:shadow-lg transition-shadow bg-transparent"
                  size="lg"
                >
                  <Volume2 className="w-6 h-6 mr-2" />
                  Play Audio
                </Button>
              )}

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all shadow-md hover:shadow-lg ${
                      selectedAnswer === index
                        ? "border-primary bg-primary/10 shadow-primary/20"
                        : "border-border hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{option}</span>
                      {selectedAnswer === index && <CheckCircle2 className="w-6 h-6 text-primary" />}
                    </div>
                  </button>
                ))}
              </div>

              {isAnswered && (
                <Button
                  onClick={handleNext}
                  className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-shadow"
                  size="lg"
                >
                  {currentQuestion < testData.questions.length - 1 ? "Next Question" : "Complete Test"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
