"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Volume2, Mic, CheckCircle2, XCircle, Star } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

// Mock practice questions for each skill
const practiceData: Record<string, any> = {
  listening: {
    name: "Listening Practice",
    questions: [
      {
        id: 1,
        audio: "Listen to the conversation",
        question: "What did the speaker say?",
        options: ["I am going to the store", "I went to the park", "I like coffee", "I am tired"],
        correctAnswer: 0,
      },
      {
        id: 2,
        audio: "Listen carefully",
        question: "Where is the person going?",
        options: ["Home", "School", "Work", "Restaurant"],
        correctAnswer: 3,
      },
    ],
  },
  speaking: {
    name: "Speaking Practice",
    questions: [
      {
        id: 1,
        prompt: "Introduce yourself in 30 seconds",
        targetPhrase: "Hello, my name is...",
      },
      {
        id: 2,
        prompt: "Describe your favorite hobby",
        targetPhrase: "My favorite hobby is...",
      },
    ],
  },
  reading: {
    name: "Reading Practice",
    questions: [
      {
        id: 1,
        passage:
          "The sun was setting over the mountains, casting a golden glow across the valley. Birds were returning to their nests, and the air was filled with the sounds of evening.",
        question: "What time of day is described?",
        options: ["Morning", "Afternoon", "Evening", "Night"],
        correctAnswer: 2,
      },
      {
        id: 2,
        passage:
          "Maria loved to read books. Every weekend, she would visit the local library and spend hours browsing through different sections. Her favorite genre was mystery novels.",
        question: "What is Maria's favorite genre?",
        options: ["Romance", "Mystery", "Science Fiction", "Biography"],
        correctAnswer: 1,
      },
    ],
  },
  writing: {
    name: "Writing Practice",
    questions: [
      {
        id: 1,
        prompt: "Write a short paragraph about your daily routine",
        minWords: 50,
      },
      {
        id: 2,
        prompt: "Describe your dream vacation destination",
        minWords: 50,
      },
    ],
  },
}

interface IncorrectAnswer {
  questionIndex: number
  question: any
  userAnswer: number | string
  correctAnswer: number | string
}

export default function PracticeSkillPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const skill = params.skill as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [writtenAnswer, setWrittenAnswer] = useState("")
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([])
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)

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

  const practice = practiceData[skill]
  if (!practice) {
    return <div>Practice not found</div>
  }

  const question = practice.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / practice.questions.length) * 100

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    const correct = answerIndex === question.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 50)
    } else {
      setIncorrectAnswers([
        ...incorrectAnswers,
        {
          questionIndex: currentQuestion,
          question: question,
          userAnswer: answerIndex,
          correctAnswer: question.correctAnswer,
        },
      ])
    }
  }

  const handleWritingSubmit = () => {
    if (isAnswered) return

    setIsAnswered(true)
    // Simple validation: check if meets minimum word count
    const wordCount = writtenAnswer.trim().split(/\s+/).length
    const correct = wordCount >= question.minWords
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 50)
    } else {
      setIncorrectAnswers([
        ...incorrectAnswers,
        {
          questionIndex: currentQuestion,
          question: question,
          userAnswer: writtenAnswer,
          correctAnswer: `At least ${question.minWords} words`,
        },
      ])
    }
  }

  const handleNext = () => {
    if (currentQuestion < practice.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setWrittenAnswer("")
      setIsAnswered(false)
      setIsCorrect(false)
    } else {
      setIsComplete(true)
    }
  }

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(question.audio || question.prompt)
    window.speechSynthesis.speak(utterance)
  }

  const startReviewMode = () => {
    setIsReviewMode(true)
    setReviewIndex(0)
  }

  const handleReviewNext = () => {
    if (reviewIndex < incorrectAnswers.length - 1) {
      setReviewIndex(reviewIndex + 1)
    } else {
      setIsReviewMode(false)
      setReviewIndex(0)
    }
  }

  if (isReviewMode && incorrectAnswers.length > 0) {
    const mistake = incorrectAnswers[reviewIndex]
    const reviewQuestion = mistake.question

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Navigation />
        <TopBar />

        <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300">
          <div className="max-w-3xl mx-auto">
            {/* Review Header */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="icon" onClick={() => setIsReviewMode(false)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1 mx-4">
                <Progress value={((reviewIndex + 1) / incorrectAnswers.length) * 100} className="h-3" />
              </div>
              <div className="text-sm font-semibold text-muted-foreground">
                {reviewIndex + 1}/{incorrectAnswers.length}
              </div>
            </div>

            {/* Review Card */}
            <Card className="border-2 border-destructive">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="destructive">Review Mistake</Badge>
                  <Badge className="capitalize">{skill}</Badge>
                </div>
                <CardTitle className="text-2xl">Question {mistake.questionIndex + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Listening/Reading Review */}
                {(skill === "listening" || skill === "reading") && (
                  <>
                    {skill === "reading" && reviewQuestion.passage && (
                      <div className="p-4 bg-muted rounded-xl">
                        <p className="text-base leading-relaxed">{reviewQuestion.passage}</p>
                      </div>
                    )}
                    {skill === "listening" && (
                      <Button onClick={playAudio} variant="outline" className="w-full h-16 bg-transparent" size="lg">
                        <Volume2 className="w-6 h-6 mr-2" />
                        Play Audio
                      </Button>
                    )}
                    <p className="text-lg font-medium">{reviewQuestion.question}</p>
                    <div className="space-y-3">
                      {reviewQuestion.options.map((option: string, index: number) => (
                        <div
                          key={index}
                          className={`w-full p-4 rounded-xl border-2 ${
                            index === mistake.correctAnswer
                              ? "border-success bg-success/10"
                              : index === mistake.userAnswer
                                ? "border-destructive bg-destructive/10"
                                : "border-border bg-muted"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option}</span>
                            {index === mistake.correctAnswer && <CheckCircle2 className="w-6 h-6 text-success" />}
                            {index === mistake.userAnswer && index !== mistake.correctAnswer && (
                              <XCircle className="w-6 h-6 text-destructive" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Writing Review */}
                {skill === "writing" && (
                  <>
                    <div className="p-4 bg-muted rounded-xl">
                      <p className="text-lg font-medium">{reviewQuestion.prompt}</p>
                      <p className="text-sm text-muted-foreground mt-2">Minimum {reviewQuestion.minWords} words</p>
                    </div>
                    <div className="p-4 bg-destructive/10 border-2 border-destructive rounded-xl">
                      <p className="text-sm font-semibold text-destructive mb-2">Your Answer:</p>
                      <p className="text-sm">{mistake.userAnswer as string}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Word count:{" "}
                        {
                          (mistake.userAnswer as string)
                            .trim()
                            .split(/\s+/)
                            .filter((w) => w).length
                        }
                      </p>
                    </div>
                    <div className="p-4 bg-success/10 border-2 border-success rounded-xl">
                      <p className="text-sm font-semibold text-success">Required: {mistake.correctAnswer}</p>
                    </div>
                  </>
                )}

                {/* Speaking Review */}
                {skill === "speaking" && (
                  <>
                    <div className="p-4 bg-muted rounded-xl">
                      <p className="text-lg font-medium mb-2">{reviewQuestion.prompt}</p>
                      <p className="text-sm text-muted-foreground">Example: {reviewQuestion.targetPhrase}</p>
                    </div>
                    <Button onClick={playAudio} variant="outline" className="w-full h-16 bg-transparent" size="lg">
                      <Volume2 className="w-6 h-6 mr-2" />
                      Listen to Example
                    </Button>
                  </>
                )}

                {/* Explanation */}
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-sm font-semibold text-blue-900 mb-1">💡 Tip:</p>
                  <p className="text-sm text-blue-800">
                    {skill === "listening" && "Listen carefully to the pronunciation and context clues."}
                    {skill === "speaking" && "Practice speaking slowly and clearly. Record yourself to improve."}
                    {skill === "reading" && "Read the passage carefully and look for key details."}
                    {skill === "writing" && "Make sure to meet the minimum word count and stay on topic."}
                  </p>
                </div>

                {/* Navigation */}
                <Button onClick={handleReviewNext} className="w-full" size="lg">
                  {reviewIndex < incorrectAnswers.length - 1 ? "Next Mistake" : "Finish Review"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  if (isComplete) {
    const earnedXP = score * 2
    const earnedCoins = score

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Navigation />
        <TopBar />

        <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center border-2 border-success">
              <CardHeader>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl">Practice Complete!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl font-bold text-success">{score}%</div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="text-sm text-muted-foreground mb-1">XP Earned</div>
                    <div className="text-2xl font-bold text-success">+{earnedXP}</div>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="text-sm text-muted-foreground mb-1">Coins Earned</div>
                    <div className="text-2xl font-bold text-accent">+{earnedCoins}</div>
                  </div>
                </div>

                {incorrectAnswers.length > 0 && (
                  <div className="p-4 bg-destructive/10 border-2 border-destructive rounded-xl">
                    <p className="text-sm font-semibold text-destructive mb-1">
                      {incorrectAnswers.length} {incorrectAnswers.length === 1 ? "Mistake" : "Mistakes"}
                    </p>
                    <p className="text-xs text-muted-foreground">Review your mistakes to improve faster!</p>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {incorrectAnswers.length > 0 && (
                    <Button variant="outline" className="w-full bg-transparent" onClick={startReviewMode}>
                      <XCircle className="w-4 h-4 mr-2" />
                      Review Mistakes
                    </Button>
                  )}
                  <div className="flex gap-3">
                    <Link href="/practice" className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        Back to Practice
                      </Button>
                    </Link>
                    <Button className="flex-1" onClick={() => window.location.reload()}>
                      Practice Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      <TopBar />

      <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/practice">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1 mx-4">
              <Progress value={progress} className="h-3" />
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              {currentQuestion + 1}/{practice.questions.length}
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="capitalize">{skill}</Badge>
                <div className="text-sm font-semibold text-primary">Score: {score}%</div>
              </div>
              <CardTitle className="text-2xl">{practice.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Listening Questions */}
              {skill === "listening" && (
                <>
                  <Button onClick={playAudio} variant="outline" className="w-full h-16 bg-transparent" size="lg">
                    <Volume2 className="w-6 h-6 mr-2" />
                    Play Audio
                  </Button>
                  <p className="text-lg font-medium">{question.question}</p>
                  <div className="space-y-3">
                    {question.options.map((option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                          isAnswered
                            ? index === question.correctAnswer
                              ? "border-success bg-success/10"
                              : index === selectedAnswer
                                ? "border-destructive bg-destructive/10"
                                : "border-border bg-muted"
                            : "border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
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
                </>
              )}

              {/* Speaking Questions */}
              {skill === "speaking" && (
                <>
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-lg font-medium mb-2">{question.prompt}</p>
                    <p className="text-sm text-muted-foreground">Example: {question.targetPhrase}</p>
                  </div>
                  <Button onClick={playAudio} variant="outline" className="w-full h-16 bg-transparent" size="lg">
                    <Volume2 className="w-6 h-6 mr-2" />
                    Listen to Example
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAnswered(true)
                      setIsCorrect(true)
                      setScore(score + 50)
                    }}
                    disabled={isAnswered}
                    variant="outline"
                    className="w-full h-20 bg-transparent"
                    size="lg"
                  >
                    <Mic className="w-8 h-8 mr-2" />
                    Hold to Record
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">Speak clearly into your microphone</p>
                </>
              )}

              {/* Reading Questions */}
              {skill === "reading" && (
                <>
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-base leading-relaxed">{question.passage}</p>
                  </div>
                  <p className="text-lg font-medium">{question.question}</p>
                  <div className="space-y-3">
                    {question.options.map((option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                          isAnswered
                            ? index === question.correctAnswer
                              ? "border-success bg-success/10"
                              : index === selectedAnswer
                                ? "border-destructive bg-destructive/10"
                                : "border-border bg-muted"
                            : "border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
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
                </>
              )}

              {/* Writing Questions */}
              {skill === "writing" && (
                <>
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-lg font-medium">{question.prompt}</p>
                    <p className="text-sm text-muted-foreground mt-2">Minimum {question.minWords} words</p>
                  </div>
                  <Textarea
                    value={writtenAnswer}
                    onChange={(e) => setWrittenAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="min-h-[200px]"
                    disabled={isAnswered}
                  />
                  <div className="text-sm text-muted-foreground">
                    Word count:{" "}
                    {
                      writtenAnswer
                        .trim()
                        .split(/\s+/)
                        .filter((w) => w).length
                    }
                  </div>
                  {!isAnswered && (
                    <Button onClick={handleWritingSubmit} className="w-full" size="lg">
                      Submit Answer
                    </Button>
                  )}
                </>
              )}

              {/* Feedback */}
              {isAnswered && (
                <div
                  className={`p-4 rounded-xl ${isCorrect ? "bg-success/10 border-2 border-success" : "bg-destructive/10 border-2 border-destructive"}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-success" />
                        <span className="font-bold text-success">Great job!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-destructive" />
                        <span className="font-bold text-destructive">Keep practicing!</span>
                      </>
                    )}
                  </div>
                  {!isCorrect && question.correctAnswer !== undefined && (
                    <p className="text-sm">The correct answer is: {question.options[question.correctAnswer]}</p>
                  )}
                  {!isCorrect && skill === "writing" && (
                    <p className="text-sm">Try to write at least {question.minWords} words.</p>
                  )}
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <Button onClick={handleNext} className="w-full" size="lg">
                  {currentQuestion < practice.questions.length - 1 ? "Next Question" : "Complete Practice"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
