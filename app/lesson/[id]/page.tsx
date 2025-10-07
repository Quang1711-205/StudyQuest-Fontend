"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Confetti } from "@/components/confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Volume2, Mic, CheckCircle2, XCircle, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

// Mock lesson data
const lessonData = {
  id: 1,
  name: "Hello & Goodbye",
  type: "vocab",
  topicName: "Greetings & Introductions",
  questions: [
    {
      id: 1,
      type: "vocab",
      question: "What does 'Hello' mean?",
      options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"],
      correctAnswer: 0,
      audioUrl: "/audio/hello.mp3",
    },
    {
      id: 2,
      type: "vocab",
      question: "How do you say 'Goodbye'?",
      options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"],
      correctAnswer: 1,
      audioUrl: "/audio/goodbye.mp3",
    },
    {
      id: 3,
      type: "listening",
      question: "Listen and select the correct phrase",
      audioUrl: "/audio/hello.mp3",
      options: ["Hello", "Goodbye", "Thank you", "Sorry"],
      correctAnswer: 0,
    },
    {
      id: 4,
      type: "speaking",
      question: "Say: 'Hello, how are you?'",
      targetPhrase: "Hello, how are you?",
      audioUrl: "/audio/how-are-you.mp3",
    },
  ],
}

export default function LessonPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        const target = lessonData.questions[currentQuestion].targetPhrase?.toLowerCase() || ""
        const similarity = calculateSimilarity(transcript, target)

        setIsRecording(false)
        setIsAnswered(true)
        const correct = similarity >= 0.7
        setIsCorrect(correct)

        if (correct) {
          setScore(score + 25)
          setShowConfetti(true)
        }
      }

      recognitionInstance.onerror = () => {
        setIsRecording(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    if (longer.length === 0) return 1.0
    const editDistance = levenshteinDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
  }

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = []
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        }
      }
    }
    return matrix[str2.length][str1.length]
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const question = lessonData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / lessonData.questions.length) * 100

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    const correct = answerIndex === question.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 25)
      setShowConfetti(true)
    }
  }

  const handleNext = () => {
    if (currentQuestion < lessonData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
    } else {
      setShowConfetti(true)
      setIsComplete(true)
    }
  }

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(question.question)
    window.speechSynthesis.speak(utterance)
  }

  const handleRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    if (isRecording) {
      recognition.stop()
      setIsRecording(false)
    } else {
      setIsRecording(true)
      recognition.start()
    }
  }

  if (isComplete) {
    const earnedXP = score * 4
    const earnedCoins = score

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <Navigation />
        <TopBar />
        <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

        {/* <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-4 md:p-8 transition-all duration-300"> */}
        <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center border-2 border-success shadow-2xl">
              <CardHeader>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center animate-bounce shadow-lg">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl md:text-4xl bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-transparent">
                  Lesson Complete!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl md:text-7xl font-bold text-success animate-pulse">{score}%</div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-gradient-to-br from-success/10 to-emerald-500/10 rounded-2xl border border-success/20 shadow-lg">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-success" />
                    <div className="text-sm text-muted-foreground mb-1">XP Earned</div>
                    <div className="text-3xl font-bold text-success">+{earnedXP}</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-accent/10 to-yellow-500/10 rounded-2xl border border-accent/20 shadow-lg">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-sm text-muted-foreground mb-1">Coins Earned</div>
                    <div className="text-3xl font-bold text-accent">+{earnedCoins}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/map" className="flex-1">
                    <Button variant="outline" className="w-full h-12 text-base bg-transparent">
                      Back to Map
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 h-12 text-base bg-gradient-to-r from-primary to-secondary"
                    onClick={() => window.location.reload()}
                  >
                    Practice Again
                  </Button>
                </div>
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
          <div className="flex items-center justify-between mb-6">
            <Link href="/map">
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1 mx-4">
              <Progress value={progress} className="h-3 shadow-inner" />
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              {currentQuestion + 1}/{lessonData.questions.length}
            </div>
          </div>

          <Card className="border-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white">{question.type}</Badge>
                <div className="text-sm text-muted-foreground">{lessonData.topicName}</div>
              </div>
              <CardTitle className="text-2xl md:text-3xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(question.type === "listening" || question.type === "speaking") && (
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

              {question.options && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all shadow-md hover:shadow-lg ${
                        isAnswered
                          ? index === question.correctAnswer
                            ? "border-success bg-success/10 shadow-success/20"
                            : index === selectedAnswer
                              ? "border-destructive bg-destructive/10 shadow-destructive/20"
                              : "border-border bg-muted"
                          : "border-border hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{option}</span>
                        {isAnswered && index === question.correctAnswer && (
                          <CheckCircle2 className="w-6 h-6 text-success" />
                        )}
                        {isAnswered && index === selectedAnswer && index !== question.correctAnswer && (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {question.type === "speaking" && (
                <div className="space-y-3">
                  <Button
                    onClick={handleRecording}
                    variant="outline"
                    className={`w-full h-20 text-lg shadow-md hover:shadow-lg transition-all ${
                      isRecording ? "bg-destructive/10 border-destructive animate-pulse" : ""
                    }`}
                    size="lg"
                    disabled={isAnswered}
                  >
                    <Mic className={`w-8 h-8 mr-2 ${isRecording ? "text-destructive" : ""}`} />
                    {isRecording ? "Recording..." : "Hold to Record"}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    {isRecording ? "Speak now..." : "Click and speak clearly into your microphone"}
                  </p>
                </div>
              )}

              {isAnswered && (
                <div
                  className={`p-4 rounded-xl shadow-lg ${
                    isCorrect
                      ? "bg-gradient-to-r from-success/10 to-emerald-500/10 border-2 border-success"
                      : "bg-gradient-to-r from-destructive/10 to-red-500/10 border-2 border-destructive"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-success" />
                        <span className="font-bold text-success text-lg">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-destructive" />
                        <span className="font-bold text-destructive text-lg">Not quite right</span>
                      </>
                    )}
                  </div>
                  {!isCorrect && question.options && (
                    <p className="text-sm">The correct answer is: {question.options[question.correctAnswer]}</p>
                  )}
                </div>
              )}

              {isAnswered && (
                <Button
                  onClick={handleNext}
                  className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-shadow"
                  size="lg"
                >
                  {currentQuestion < lessonData.questions.length - 1 ? "Next Question" : "Complete Lesson"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
