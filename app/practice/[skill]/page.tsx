// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Textarea } from "@/components/ui/textarea"
// import { ArrowLeft, Volume2, Mic, CheckCircle2, XCircle, Star } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState } from "react"

// // Mock practice questions for each skill
// const practiceData: Record<string, any> = {
//   listening: {
//     name: "Listening Practice",
//     questions: [
//       {
//         id: 1,
//         audio: "Listen to the conversation",
//         question: "What did the speaker say?",
//         options: ["I am going to the store", "I went to the park", "I like coffee", "I am tired"],
//         correctAnswer: 0,
//       },
//       {
//         id: 2,
//         audio: "Listen carefully",
//         question: "Where is the person going?",
//         options: ["Home", "School", "Work", "Restaurant"],
//         correctAnswer: 3,
//       },
//     ],
//   },
//   speaking: {
//     name: "Speaking Practice",
//     questions: [
//       {
//         id: 1,
//         prompt: "Introduce yourself in 30 seconds",
//         targetPhrase: "Hello, my name is...",
//       },
//       {
//         id: 2,
//         prompt: "Describe your favorite hobby",
//         targetPhrase: "My favorite hobby is...",
//       },
//     ],
//   },
//   reading: {
//     name: "Reading Practice",
//     questions: [
//       {
//         id: 1,
//         passage:
//           "The sun was setting over the mountains, casting a golden glow across the valley. Birds were returning to their nests, and the air was filled with the sounds of evening.",
//         question: "What time of day is described?",
//         options: ["Morning", "Afternoon", "Evening", "Night"],
//         correctAnswer: 2,
//       },
//       {
//         id: 2,
//         passage:
//           "Maria loved to read books. Every weekend, she would visit the local library and spend hours browsing through different sections. Her favorite genre was mystery novels.",
//         question: "What is Maria's favorite genre?",
//         options: ["Romance", "Mystery", "Science Fiction", "Biography"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   writing: {
//     name: "Writing Practice",
//     questions: [
//       {
//         id: 1,
//         prompt: "Write a short paragraph about your daily routine",
//         minWords: 50,
//       },
//       {
//         id: 2,
//         prompt: "Describe your dream vacation destination",
//         minWords: 50,
//       },
//     ],
//   },
// }

// interface IncorrectAnswer {
//   questionIndex: number
//   question: any
//   userAnswer: number | string
//   correctAnswer: number | string
// }

// export default function PracticeSkillPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const skill = params.skill as string

//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [writtenAnswer, setWrittenAnswer] = useState("")
//   const [isAnswered, setIsAnswered] = useState(false)
//   const [isCorrect, setIsCorrect] = useState(false)
//   const [score, setScore] = useState(0)
//   const [isComplete, setIsComplete] = useState(false)
//   const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([])
//   const [isReviewMode, setIsReviewMode] = useState(false)
//   const [reviewIndex, setReviewIndex] = useState(0)

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   const practice = practiceData[skill]
//   if (!practice) {
//     return <div>Practice not found</div>
//   }

//   const question = practice.questions[currentQuestion]
//   const progress = ((currentQuestion + 1) / practice.questions.length) * 100

//   const handleAnswer = (answerIndex: number) => {
//     if (isAnswered) return

//     setSelectedAnswer(answerIndex)
//     setIsAnswered(true)

//     const correct = answerIndex === question.correctAnswer
//     setIsCorrect(correct)

//     if (correct) {
//       setScore(score + 50)
//     } else {
//       setIncorrectAnswers([
//         ...incorrectAnswers,
//         {
//           questionIndex: currentQuestion,
//           question: question,
//           userAnswer: answerIndex,
//           correctAnswer: question.correctAnswer,
//         },
//       ])
//     }
//   }

//   const handleWritingSubmit = () => {
//     if (isAnswered) return

//     setIsAnswered(true)
//     // Simple validation: check if meets minimum word count
//     const wordCount = writtenAnswer.trim().split(/\s+/).length
//     const correct = wordCount >= question.minWords
//     setIsCorrect(correct)

//     if (correct) {
//       setScore(score + 50)
//     } else {
//       setIncorrectAnswers([
//         ...incorrectAnswers,
//         {
//           questionIndex: currentQuestion,
//           question: question,
//           userAnswer: writtenAnswer,
//           correctAnswer: `At least ${question.minWords} words`,
//         },
//       ])
//     }
//   }

//   const handleNext = () => {
//     if (currentQuestion < practice.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//       setWrittenAnswer("")
//       setIsAnswered(false)
//       setIsCorrect(false)
//     } else {
//       setIsComplete(true)
//     }
//   }

//   const playAudio = () => {
//     const utterance = new SpeechSynthesisUtterance(question.audio || question.prompt)
//     window.speechSynthesis.speak(utterance)
//   }

//   const startReviewMode = () => {
//     setIsReviewMode(true)
//     setReviewIndex(0)
//   }

//   const handleReviewNext = () => {
//     if (reviewIndex < incorrectAnswers.length - 1) {
//       setReviewIndex(reviewIndex + 1)
//     } else {
//       setIsReviewMode(false)
//       setReviewIndex(0)
//     }
//   }

//   if (isReviewMode && incorrectAnswers.length > 0) {
//     const mistake = incorrectAnswers[reviewIndex]
//     const reviewQuestion = mistake.question

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//         <Navigation />
//         <TopBar />

//         <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             {/* Review Header */}
//             <div className="flex items-center justify-between mb-6">
//               <Button variant="ghost" size="icon" onClick={() => setIsReviewMode(false)}>
//                 <ArrowLeft className="w-5 h-5" />
//               </Button>
//               <div className="flex-1 mx-4">
//                 <Progress value={((reviewIndex + 1) / incorrectAnswers.length) * 100} className="h-3" />
//               </div>
//               <div className="text-sm font-semibold text-muted-foreground">
//                 {reviewIndex + 1}/{incorrectAnswers.length}
//               </div>
//             </div>

//             {/* Review Card */}
//             <Card className="border-2 border-destructive">
//               <CardHeader>
//                 <div className="flex items-center justify-between mb-2">
//                   <Badge variant="destructive">Review Mistake</Badge>
//                   <Badge className="capitalize">{skill}</Badge>
//                 </div>
//                 <CardTitle className="text-2xl">Question {mistake.questionIndex + 1}</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Listening/Reading Review */}
//                 {(skill === "listening" || skill === "reading") && (
//                   <>
//                     {skill === "reading" && reviewQuestion.passage && (
//                       <div className="p-4 bg-muted rounded-xl">
//                         <p className="text-base leading-relaxed">{reviewQuestion.passage}</p>
//                       </div>
//                     )}
//                     {skill === "listening" && (
//                       <Button onClick={playAudio} variant="outline" className="w-full h-16 bg-transparent" size="lg">
//                         <Volume2 className="w-6 h-6 mr-2" />
//                         Play Audio
//                       </Button>
//                     )}
//                     <p className="text-lg font-medium">{reviewQuestion.question}</p>
//                     <div className="space-y-3">
//                       {reviewQuestion.options.map((option: string, index: number) => (
//                         <div
//                           key={index}
//                           className={`w-full p-4 rounded-xl border-2 ${
//                             index === mistake.correctAnswer
//                               ? "border-success bg-success/10"
//                               : index === mistake.userAnswer
//                                 ? "border-destructive bg-destructive/10"
//                                 : "border-border bg-muted"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="font-medium">{option}</span>
//                             {index === mistake.correctAnswer && <CheckCircle2 className="w-6 h-6 text-success" />}
//                             {index === mistake.userAnswer && index !== mistake.correctAnswer && (
//                               <XCircle className="w-6 h-6 text-destructive" />
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}

//                 {/* Writing Review */}
//                 {skill === "writing" && (
//                   <>
//                     <div className="p-4 bg-muted rounded-xl">
//                       <p className="text-lg font-medium">{reviewQuestion.prompt}</p>
//                       <p className="text-sm text-muted-foreground mt-2">Minimum {reviewQuestion.minWords} words</p>
//                     </div>
//                     <div className="p-4 bg-destructive/10 border-2 border-destructive rounded-xl">
//                       <p className="text-sm font-semibold text-destructive mb-2">Your Answer:</p>
//                       <p className="text-sm">{mistake.userAnswer as string}</p>
//                       <p className="text-xs text-muted-foreground mt-2">
//                         Word count:{" "}
//                         {
//                           (mistake.userAnswer as string)
//                             .trim()
//                             .split(/\s+/)
//                             .filter((w) => w).length
//                         }
//                       </p>
//                     </div>
//                     <div className="p-4 bg-success/10 border-2 border-success rounded-xl">
//                       <p className="text-sm font-semibold text-success">Required: {mistake.correctAnswer}</p>
//                     </div>
//                   </>
//                 )}

//                 {/* Speaking Review */}
//                 {skill === "speaking" && (
//                   <>
//                     <div className="p-4 bg-muted rounded-xl">
//                       <p className="text-lg font-medium mb-2">{reviewQuestion.prompt}</p>
//                       <p className="text-sm text-muted-foreground">Example: {reviewQuestion.targetPhrase}</p>
//                     </div>
//                     <Button onClick={playAudio} variant="outline" className="w-full h-16 bg-transparent" size="lg">
//                       <Volume2 className="w-6 h-6 mr-2" />
//                       Listen to Example
//                     </Button>
//                   </>
//                 )}

//                 {/* Explanation */}
//                 <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
//                   <p className="text-sm font-semibold text-blue-900 mb-1">💡 Tip:</p>
//                   <p className="text-sm text-blue-800">
//                     {skill === "listening" && "Listen carefully to the pronunciation and context clues."}
//                     {skill === "speaking" && "Practice speaking slowly and clearly. Record yourself to improve."}
//                     {skill === "reading" && "Read the passage carefully and look for key details."}
//                     {skill === "writing" && "Make sure to meet the minimum word count and stay on topic."}
//                   </p>
//                 </div>

//                 {/* Navigation */}
//                 <Button onClick={handleReviewNext} className="w-full" size="lg">
//                   {reviewIndex < incorrectAnswers.length - 1 ? "Next Mistake" : "Finish Review"}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   if (isComplete) {
//     const earnedXP = score * 2
//     const earnedCoins = score

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//         <Navigation />
//         <TopBar />

//         <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300">
//           <div className="max-w-2xl mx-auto">
//             <Card className="text-center border-2 border-success">
//               <CardHeader>
//                 <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
//                   <Star className="w-12 h-12 text-white" />
//                 </div>
//                 <CardTitle className="text-3xl">Practice Complete!</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="text-6xl font-bold text-success">{score}%</div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-4 bg-muted rounded-xl">
//                     <div className="text-sm text-muted-foreground mb-1">XP Earned</div>
//                     <div className="text-2xl font-bold text-success">+{earnedXP}</div>
//                   </div>
//                   <div className="p-4 bg-muted rounded-xl">
//                     <div className="text-sm text-muted-foreground mb-1">Coins Earned</div>
//                     <div className="text-2xl font-bold text-accent">+{earnedCoins}</div>
//                   </div>
//                 </div>

//                 {incorrectAnswers.length > 0 && (
//                   <div className="p-4 bg-destructive/10 border-2 border-destructive rounded-xl">
//                     <p className="text-sm font-semibold text-destructive mb-1">
//                       {incorrectAnswers.length} {incorrectAnswers.length === 1 ? "Mistake" : "Mistakes"}
//                     </p>
//                     <p className="text-xs text-muted-foreground">Review your mistakes to improve faster!</p>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-3">
//                   {incorrectAnswers.length > 0 && (
//                     <Button variant="outline" className="w-full bg-transparent" onClick={startReviewMode}>
//                       <XCircle className="w-4 h-4 mr-2" />
//                       Review Mistakes
//                     </Button>
//                   )}
//                   <div className="flex gap-3">
//                     <Link href="/practice" className="flex-1">
//                       <Button variant="outline" className="w-full bg-transparent">
//                         Back to Practice
//                       </Button>
//                     </Link>
//                     <Button className="flex-1" onClick={() => window.location.reload()}>
//                       Practice Again
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       <Navigation />
//       <TopBar />

//       <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-3xl mx-auto">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <Link href="/practice">
//               <Button variant="ghost" size="icon">
//                 <ArrowLeft className="w-5 h-5" />
//               </Button>
//             </Link>
//             <div className="flex-1 mx-4">
//               <Progress value={progress} className="h-3" />
//             </div>
//             <div className="text-sm font-semibold text-muted-foreground">
//               {currentQuestion + 1}/{practice.questions.length}
//             </div>
//           </div>

//           {/* Question Card */}
//           <Card className="border-2">
//             <CardHeader>
//               <div className="flex items-center justify-between mb-2">
//                 <Badge className="capitalize">{skill}</Badge>
//                 <div className="text-sm font-semibold text-primary">Score: {score}%</div>
//               </div>
//               <CardTitle className="text-2xl">{practice.name}</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {/* Listening Questions */}
//               {skill === "listening" && (
//                 <>
//                   <Button onClick={playAudio} variant="outline" className="w-full h-16 bg-transparent" size="lg">
//                     <Volume2 className="w-6 h-6 mr-2" />
//                     Play Audio
//                   </Button>
//                   <p className="text-lg font-medium">{question.question}</p>
//                   <div className="space-y-3">
//                     {question.options.map((option: string, index: number) => (
//                       <button
//                         key={index}
//                         onClick={() => handleAnswer(index)}
//                         disabled={isAnswered}
//                         className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
//                           isAnswered
//                             ? index === question.correctAnswer
//                               ? "border-success bg-success/10"
//                               : index === selectedAnswer
//                                 ? "border-destructive bg-destructive/10"
//                                 : "border-border bg-muted"
//                             : "border-border hover:border-primary hover:bg-primary/5"
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span>{option}</span>
//                           {isAnswered && index === question.correctAnswer && (
//                             <CheckCircle2 className="w-6 h-6 text-success" />
//                           )}
//                           {isAnswered && index === selectedAnswer && index !== question.correctAnswer && (
//                             <XCircle className="w-6 h-6 text-destructive" />
//                           )}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}

//               {/* Speaking Questions */}
//               {skill === "speaking" && (
//                 <>
//                   <div className="p-4 bg-muted rounded-xl">
//                     <p className="text-lg font-medium mb-2">{question.prompt}</p>
//                     <p className="text-sm text-muted-foreground">Example: {question.targetPhrase}</p>
//                   </div>
//                   <Button onClick={playAudio} variant="outline" className="w-full h-16 bg-transparent" size="lg">
//                     <Volume2 className="w-6 h-6 mr-2" />
//                     Listen to Example
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       setIsAnswered(true)
//                       setIsCorrect(true)
//                       setScore(score + 50)
//                     }}
//                     disabled={isAnswered}
//                     variant="outline"
//                     className="w-full h-20 bg-transparent"
//                     size="lg"
//                   >
//                     <Mic className="w-8 h-8 mr-2" />
//                     Hold to Record
//                   </Button>
//                   <p className="text-sm text-muted-foreground text-center">Speak clearly into your microphone</p>
//                 </>
//               )}

//               {/* Reading Questions */}
//               {skill === "reading" && (
//                 <>
//                   <div className="p-4 bg-muted rounded-xl">
//                     <p className="text-base leading-relaxed">{question.passage}</p>
//                   </div>
//                   <p className="text-lg font-medium">{question.question}</p>
//                   <div className="space-y-3">
//                     {question.options.map((option: string, index: number) => (
//                       <button
//                         key={index}
//                         onClick={() => handleAnswer(index)}
//                         disabled={isAnswered}
//                         className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
//                           isAnswered
//                             ? index === question.correctAnswer
//                               ? "border-success bg-success/10"
//                               : index === selectedAnswer
//                                 ? "border-destructive bg-destructive/10"
//                                 : "border-border bg-muted"
//                             : "border-border hover:border-primary hover:bg-primary/5"
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span>{option}</span>
//                           {isAnswered && index === question.correctAnswer && (
//                             <CheckCircle2 className="w-6 h-6 text-success" />
//                           )}
//                           {isAnswered && index === selectedAnswer && index !== question.correctAnswer && (
//                             <XCircle className="w-6 h-6 text-destructive" />
//                           )}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}

//               {/* Writing Questions */}
//               {skill === "writing" && (
//                 <>
//                   <div className="p-4 bg-muted rounded-xl">
//                     <p className="text-lg font-medium">{question.prompt}</p>
//                     <p className="text-sm text-muted-foreground mt-2">Minimum {question.minWords} words</p>
//                   </div>
//                   <Textarea
//                     value={writtenAnswer}
//                     onChange={(e) => setWrittenAnswer(e.target.value)}
//                     placeholder="Type your answer here..."
//                     className="min-h-[200px]"
//                     disabled={isAnswered}
//                   />
//                   <div className="text-sm text-muted-foreground">
//                     Word count:{" "}
//                     {
//                       writtenAnswer
//                         .trim()
//                         .split(/\s+/)
//                         .filter((w) => w).length
//                     }
//                   </div>
//                   {!isAnswered && (
//                     <Button onClick={handleWritingSubmit} className="w-full" size="lg">
//                       Submit Answer
//                     </Button>
//                   )}
//                 </>
//               )}

//               {/* Feedback */}
//               {isAnswered && (
//                 <div
//                   className={`p-4 rounded-xl ${isCorrect ? "bg-success/10 border-2 border-success" : "bg-destructive/10 border-2 border-destructive"}`}
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     {isCorrect ? (
//                       <>
//                         <CheckCircle2 className="w-6 h-6 text-success" />
//                         <span className="font-bold text-success">Great job!</span>
//                       </>
//                     ) : (
//                       <>
//                         <XCircle className="w-6 h-6 text-destructive" />
//                         <span className="font-bold text-destructive">Keep practicing!</span>
//                       </>
//                     )}
//                   </div>
//                   {!isCorrect && question.correctAnswer !== undefined && (
//                     <p className="text-sm">The correct answer is: {question.options[question.correctAnswer]}</p>
//                   )}
//                   {!isCorrect && skill === "writing" && (
//                     <p className="text-sm">Try to write at least {question.minWords} words.</p>
//                   )}
//                 </div>
//               )}

//               {/* Next Button */}
//               {isAnswered && (
//                 <Button onClick={handleNext} className="w-full" size="lg">
//                   {currentQuestion < practice.questions.length - 1 ? "Next Question" : "Complete Practice"}
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }



//1. "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Headphones, Mic, BookOpen, PenTool, ArrowLeft, Star, Clock, TrendingUp, Lock } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect } from "react"
// import { useNavigation } from "@/lib/navigation-context"

// const skillConfig = {
//   listening: {
//     name: "Listening",
//     description: "Practice understanding spoken language",
//     icon: Headphones,
//     colorStart: "#3b82f6",
//     colorEnd: "#60a5fa",
//   },
//   speaking: {
//     name: "Speaking",
//     description: "Improve your pronunciation and fluency",
//     icon: Mic,
//     colorStart: "#ec4899",
//     colorEnd: "#f472b6",
//   },
//   reading: {
//     name: "Reading",
//     description: "Enhance reading comprehension skills",
//     icon: BookOpen,
//     colorStart: "#8b5cf6",
//     colorEnd: "#a78bfa",
//   },
//   writing: {
//     name: "Writing",
//     description: "Practice writing and composition",
//     icon: PenTool,
//     colorStart: "#f97316",
//     colorEnd: "#fb923c",
//   },
// }

// // Mock data cho các bài luyện tập
// const lessonsBySkill = {
//   listening: [
//     {
//       id: "l1",
//       title: "Daily Conversations",
//       level: "Beginner",
//       duration: "10 min",
//       xp: 100,
//       questions: 5,
//       description: "Practice listening to everyday conversations at home, school, and work",
//       completed: false,
//       locked: false,
//     },
//     {
//       id: "l2",
//       title: "Travel & Transportation",
//       level: "Beginner",
//       duration: "12 min",
//       xp: 120,
//       questions: 6,
//       description: "Learn vocabulary about airports, hotels, and getting around",
//       completed: true,
//       locked: false,
//     },
//     {
//       id: "l3",
//       title: "News & Current Events",
//       level: "Intermediate",
//       duration: "15 min",
//       xp: 150,
//       questions: 7,
//       description: "Listen to news reports and discussions about current topics",
//       completed: false,
//       locked: false,
//     },
//     {
//       id: "l4",
//       title: "Business Meetings",
//       level: "Intermediate",
//       duration: "18 min",
//       xp: 180,
//       questions: 8,
//       description: "Understand professional workplace conversations and meetings",
//       completed: false,
//       locked: true,
//     },
//     {
//       id: "l5",
//       title: "Academic Lectures",
//       level: "Advanced",
//       duration: "20 min",
//       xp: 200,
//       questions: 10,
//       description: "Comprehend complex academic content and university lectures",
//       completed: false,
//       locked: true,
//     },
//   ],
//   speaking: [
//     {
//       id: "s1",
//       title: "Pronunciation Basics",
//       level: "Beginner",
//       duration: "12 min",
//       xp: 100,
//       questions: 8,
//       description: "Master fundamental pronunciation patterns and sounds",
//       completed: true,
//       locked: false,
//     },
//     {
//       id: "s2",
//       title: "Everyday Phrases",
//       level: "Beginner",
//       duration: "10 min",
//       xp: 100,
//       questions: 6,
//       description: "Learn common expressions used in daily situations",
//       completed: false,
//       locked: false,
//     },
//     {
//       id: "s3",
//       title: "Conversation Practice",
//       level: "Intermediate",
//       duration: "15 min",
//       xp: 150,
//       questions: 7,
//       description: "Practice natural conversation flow and responses",
//       completed: false,
//       locked: false,
//     },
//     {
//       id: "s4",
//       title: "Job Interviews",
//       level: "Intermediate",
//       duration: "20 min",
//       xp: 180,
//       questions: 9,
//       description: "Prepare for professional interview situations",
//       completed: false,
//       locked: true,
//     },
//     {
//       id: "s5",
//       title: "Presentation Skills",
//       level: "Advanced",
//       duration: "25 min",
//       xp: 200,
//       questions: 10,
//       description: "Deliver effective presentations with confidence",
//       completed: false,
//       locked: true,
//     },
//   ],
//   reading: [
//     {
//       id: "r1",
//       title: "Short Stories",
//       level: "Beginner",
//       duration: "15 min",
//       xp: 120,
//       questions: 8,
//       description: "Read and understand simple narratives and tales",
//       completed: true,
//       locked: false,
//     },
//     {
//       id: "r2",
//       title: "Emails & Messages",
//       level: "Beginner",
//       duration: "10 min",
//       xp: 100,
//       questions: 6,
//       description: "Comprehend everyday written communication",
//       completed: true,
//       locked: false,
//     },
//     {
//       id: "r3",
//       title: "Articles & Essays",
//       level: "Intermediate",
//       duration: "20 min",
//       xp: 160,
//       questions: 10,
//       description: "Analyze informative and opinion texts",
//       completed: false,
//       locked: false,
//     },
//     {
//       id: "r4",
//       title: "Scientific Reports",
//       level: "Intermediate",
//       duration: "25 min",
//       xp: 190,
//       questions: 12,
//       description: "Understand technical and scientific writing",
//       completed: false,
//       locked: true,
//     },
//     {
//       id: "r5",
//       title: "Academic Texts",
//       level: "Advanced",
//       duration: "30 min",
//       xp: 220,
//       questions: 15,
//       description: "Comprehend complex academic writing and research",
//       completed: false,
//       locked: true,
//     },
//   ],
//   writing: [
//     {
//       id: "w1",
//       title: "Basic Sentences",
//       level: "Beginner",
//       duration: "10 min",
//       xp: 90,
//       questions: 8,
//       description: "Write clear and correct simple sentences",
//       completed: true,
//       locked: false,
//     },
//     {
//       id: "w2",
//       title: "Paragraph Writing",
//       level: "Beginner",
//       duration: "15 min",
//       xp: 120,
//       questions: 6,
//       description: "Organize ideas into coherent paragraphs",
//       completed: false,
//       locked: false,
//     },
//     {
//       id: "w3",
//       title: "Essay Writing",
//       level: "Intermediate",
//       duration: "25 min",
//       xp: 180,
//       questions: 8,
//       description: "Compose structured argumentative essays",
//       completed: false,
//       locked: false,
//     },
//     {
//       id: "w4",
//       title: "Business Writing",
//       level: "Intermediate",
//       duration: "20 min",
//       xp: 170,
//       questions: 7,
//       description: "Write professional emails and reports",
//       completed: false,
//       locked: true,
//     },
//     {
//       id: "w5",
//       title: "Creative Writing",
//       level: "Advanced",
//       duration: "30 min",
//       xp: 250,
//       questions: 10,
//       description: "Express ideas creatively through storytelling",
//       completed: false,
//       locked: true,
//     },
//   ],
// }

// const levelColors = {
//   Beginner: "bg-green-500",
//   Intermediate: "bg-yellow-500",
//   Advanced: "bg-red-500",
// }

// export default function PracticeSkillPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const { isOpen, closeNav } = useNavigation()
  
//   const skillId = params.skill as keyof typeof skillConfig
//   const skill = skillConfig[skillId]
//   const lessons = lessonsBySkill[skillId] || []

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   if (!skill) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl">Skill not found</p>
//       </div>
//     )
//   }

//   const Icon = skill.icon
//   const completedCount = lessons.filter((l) => l.completed).length
//   const totalTime = lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={() => {}} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-5xl mx-auto">
//           {/* Back Button */}
//           <Link href="/practice">
//             <Button variant="ghost" className="mb-6 hover:bg-muted">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Practice Hub
//             </Button>
//           </Link>

//           {/* Header */}
//           <div className="mb-12">
//             <div className="flex items-center gap-6 mb-6">
//               <div
//                 className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shadow-xl"
//                 style={{
//                   background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                 }}
//               >
//                 <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl md:text-5xl font-black mb-2">{skill.name} Practice</h1>
//                 <p className="text-lg md:text-xl text-muted-foreground">{skill.description}</p>
//               </div>
//             </div>

//             {/* Stats Overview */}
//             <div className="grid grid-cols-3 gap-4">
//               <Card className="border-none shadow-md">
//                 <CardContent className="p-4 md:p-5 flex items-center gap-3">
//                   <div
//                     className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
//                     style={{
//                       background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                     }}
//                   >
//                     <Star className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
//                       Total Lessons
//                     </p>
//                     <p className="text-2xl md:text-3xl font-bold">{lessons.length}</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="border-none shadow-md">
//                 <CardContent className="p-4 md:p-5 flex items-center gap-3">
//                   <div
//                     className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
//                     style={{
//                       background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                     }}
//                   >
//                     <TrendingUp className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
//                       Completed
//                     </p>
//                     <p className="text-2xl md:text-3xl font-bold text-green-600">
//                       {completedCount}/{lessons.length}
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="border-none shadow-md">
//                 <CardContent className="p-4 md:p-5 flex items-center gap-3">
//                   <div
//                     className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
//                     style={{
//                       background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                     }}
//                   >
//                     <Clock className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
//                       Total Time
//                     </p>
//                     <p className="text-2xl md:text-3xl font-bold">{totalTime}m</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           {/* Lessons List */}
//           <div>
//             <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
//               <span>📚</span>
//               Choose Your Lesson
//             </h2>

//             <div className="space-y-5">
//               {lessons.map((lesson) => (
//                 <Card
//                   key={lesson.id}
//                   className={`relative overflow-hidden border-none shadow-lg transition-all bg-card ${
//                     !lesson.locked ? "hover:shadow-2xl hover:-translate-y-1" : "opacity-60"
//                   }`}
//                 >
//                   <div
//                     className="absolute top-0 left-0 right-0 h-1.5"
//                     style={{
//                       background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                     }}
//                   />

//                   {lesson.completed && (
//                     <div className="absolute top-5 right-5 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
//                       <Star className="w-3.5 h-3.5 fill-white" />
//                       Completed
//                     </div>
//                   )}

//                   {lesson.locked && (
//                     <div className="absolute top-5 right-5 bg-slate-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
//                       <Lock className="w-3.5 h-3.5" />
//                       Locked
//                     </div>
//                   )}

//                   <CardContent className="p-6 md:p-7">
//                     <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           <h3 className="text-xl md:text-2xl font-bold">{lesson.title}</h3>
//                           <Badge
//                             className={`${
//                               levelColors[lesson.level as keyof typeof levelColors]
//                             } text-white border-none text-xs px-2.5 py-1`}
//                           >
//                             {lesson.level}
//                           </Badge>
//                         </div>
//                         <p className="text-muted-foreground mb-5 text-sm md:text-base">
//                           {lesson.description}
//                         </p>

//                         <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
//                           <div className="flex items-center gap-2">
//                             <Clock className="w-4 h-4" />
//                             <span className="font-medium">{lesson.duration}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Star className="w-4 h-4 text-yellow-500" />
//                             <span className="font-medium">+{lesson.xp} XP</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <span className="font-medium">{lesson.questions} Questions</span>
//                           </div>
//                         </div>
//                       </div>

//                       {lesson.locked ? (
//                         <Button
//                           disabled
//                           className="w-full md:w-auto h-12 md:h-14 px-8 text-base font-bold"
//                         >
//                           <Lock className="w-4 h-4 mr-2" />
//                           Complete previous lessons
//                         </Button>
//                       ) : (
//                         <Link href={`/practice/${skillId}/${lesson.id}`}>
//                           <Button
//                             className="w-full md:w-auto h-12 md:h-14 px-8 text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
//                             style={{
//                               background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                             }}
//                           >
//                             {lesson.completed ? "Practice Again" : "Start Lesson"}
//                             <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
//                           </Button>
//                         </Link>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }


"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Headphones, Mic, BookOpen, PenTool, ArrowLeft, Star, Clock, TrendingUp, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect } from "react"
import { useNavigation } from "@/lib/navigation-context"

const skillConfig = {
  listening: {
    name: "Listening",
    description: "Practice understanding spoken language",
    icon: Headphones,
    colorStart: "#3b82f6",
    colorEnd: "#60a5fa",
  },
  speaking: {
    name: "Speaking",
    description: "Improve your pronunciation and fluency",
    icon: Mic,
    colorStart: "#ec4899",
    colorEnd: "#f472b6",
  },
  reading: {
    name: "Reading",
    description: "Enhance reading comprehension skills",
    icon: BookOpen,
    colorStart: "#8b5cf6",
    colorEnd: "#a78bfa",
  },
  writing: {
    name: "Writing",
    description: "Practice writing and composition",
    icon: PenTool,
    colorStart: "#f97316",
    colorEnd: "#fb923c",
  },
}

// Mock data cho các bài luyện tập
const lessonsBySkill = {
  listening: [
    {
      id: "l1",
      title: "Daily Conversations",
      level: "Beginner",
      duration: "10 min",
      xp: 100,
      questions: 5,
      description: "Practice listening to everyday conversations at home, school, and work",
      completed: false,
      locked: false,
    },
    {
      id: "l2",
      title: "Travel & Transportation",
      level: "Beginner",
      duration: "12 min",
      xp: 120,
      questions: 6,
      description: "Learn vocabulary about airports, hotels, and getting around",
      completed: true,
      locked: false,
    },
    {
      id: "l3",
      title: "News & Current Events",
      level: "Intermediate",
      duration: "15 min",
      xp: 150,
      questions: 7,
      description: "Listen to news reports and discussions about current topics",
      completed: false,
      locked: false,
    },
    {
      id: "l4",
      title: "Business Meetings",
      level: "Intermediate",
      duration: "18 min",
      xp: 180,
      questions: 8,
      description: "Understand professional workplace conversations and meetings",
      completed: false,
      locked: true,
    },
    {
      id: "l5",
      title: "Academic Lectures",
      level: "Advanced",
      duration: "20 min",
      xp: 200,
      questions: 10,
      description: "Comprehend complex academic content and university lectures",
      completed: false,
      locked: true,
    },
  ],
  speaking: [
    {
      id: "s1",
      title: "Pronunciation Basics",
      level: "Beginner",
      duration: "12 min",
      xp: 100,
      questions: 8,
      description: "Master fundamental pronunciation patterns and sounds",
      completed: true,
      locked: false,
    },
    {
      id: "s2",
      title: "Everyday Phrases",
      level: "Beginner",
      duration: "10 min",
      xp: 100,
      questions: 6,
      description: "Learn common expressions used in daily situations",
      completed: false,
      locked: false,
    },
    {
      id: "s3",
      title: "Conversation Practice",
      level: "Intermediate",
      duration: "15 min",
      xp: 150,
      questions: 7,
      description: "Practice natural conversation flow and responses",
      completed: false,
      locked: false,
    },
    {
      id: "s4",
      title: "Job Interviews",
      level: "Intermediate",
      duration: "20 min",
      xp: 180,
      questions: 9,
      description: "Prepare for professional interview situations",
      completed: false,
      locked: true,
    },
    {
      id: "s5",
      title: "Presentation Skills",
      level: "Advanced",
      duration: "25 min",
      xp: 200,
      questions: 10,
      description: "Deliver effective presentations with confidence",
      completed: false,
      locked: true,
    },
  ],
  reading: [
    {
      id: "r1",
      title: "Short Stories",
      level: "Beginner",
      duration: "15 min",
      xp: 120,
      questions: 8,
      description: "Read and understand simple narratives and tales",
      completed: true,
      locked: false,
    },
    {
      id: "r2",
      title: "Emails & Messages",
      level: "Beginner",
      duration: "10 min",
      xp: 100,
      questions: 6,
      description: "Comprehend everyday written communication",
      completed: true,
      locked: false,
    },
    {
      id: "r3",
      title: "Articles & Essays",
      level: "Intermediate",
      duration: "20 min",
      xp: 160,
      questions: 10,
      description: "Analyze informative and opinion texts",
      completed: false,
      locked: false,
    },
    {
      id: "r4",
      title: "Scientific Reports",
      level: "Intermediate",
      duration: "25 min",
      xp: 190,
      questions: 12,
      description: "Understand technical and scientific writing",
      completed: false,
      locked: true,
    },
    {
      id: "r5",
      title: "Academic Texts",
      level: "Advanced",
      duration: "30 min",
      xp: 220,
      questions: 15,
      description: "Comprehend complex academic writing and research",
      completed: false,
      locked: true,
    },
  ],
  writing: [
    {
      id: "w1",
      title: "Basic Sentences",
      level: "Beginner",
      duration: "10 min",
      xp: 90,
      questions: 8,
      description: "Write clear and correct simple sentences",
      completed: true,
      locked: false,
    },
    {
      id: "w2",
      title: "Paragraph Writing",
      level: "Beginner",
      duration: "15 min",
      xp: 120,
      questions: 6,
      description: "Organize ideas into coherent paragraphs",
      completed: false,
      locked: false,
    },
    {
      id: "w3",
      title: "Essay Writing",
      level: "Intermediate",
      duration: "25 min",
      xp: 180,
      questions: 8,
      description: "Compose structured argumentative essays",
      completed: false,
      locked: false,
    },
    {
      id: "w4",
      title: "Business Writing",
      level: "Intermediate",
      duration: "20 min",
      xp: 170,
      questions: 7,
      description: "Write professional emails and reports",
      completed: false,
      locked: true,
    },
    {
      id: "w5",
      title: "Creative Writing",
      level: "Advanced",
      duration: "30 min",
      xp: 250,
      questions: 10,
      description: "Express ideas creatively through storytelling",
      completed: false,
      locked: true,
    },
  ],
}

const levelColors = {
  Beginner: "bg-green-500",
  Intermediate: "bg-yellow-500",
  Advanced: "bg-red-500",
}

export default function PracticeSkillPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { isOpen, closeNav } = useNavigation()
  
  const skillId = params.skill as keyof typeof skillConfig
  const skill = skillConfig[skillId]
  const lessons = lessonsBySkill[skillId] || []

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

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Skill not found</p>
      </div>
    )
  }

  const Icon = skill.icon
  const completedCount = lessons.filter((l) => l.completed).length
  const totalTime = lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={() => {}} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <div className="max-w-5xl mx-auto">
          {/* Back Button - Thu nhỏ trên mobile */}
          <Link href="/practice">
            <Button variant="ghost" className="mb-4 sm:mb-6 hover:bg-muted text-sm sm:text-base">
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Back to Practice Hub
            </Button>
          </Link>

          {/* Header - Responsive */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg sm:shadow-xl flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                }}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-1 sm:mb-2 truncate">
                  {skill.name} Practice
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground line-clamp-2">
                  {skill.description}
                </p>
              </div>
            </div>

            {/* Stats Overview - Responsive Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              <Card className="border-none shadow-md">
                <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                    }}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left min-w-0">
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wide truncate">
                      Total
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{lessons.length}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                    }}
                  >
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left min-w-0">
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wide truncate">
                      Done
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600">
                      {completedCount}/{lessons.length}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                    }}
                  >
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left min-w-0">
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wide truncate">
                      Time
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{totalTime}m</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Lessons List */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">📚</span>
              <span className="truncate">Choose Your Lesson</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              {lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className={`relative overflow-hidden border-none shadow-lg transition-all bg-card ${
                    !lesson.locked ? "hover:shadow-2xl hover:-translate-y-1" : "opacity-60"
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 sm:h-1.5"
                    style={{
                      background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
                    }}
                  />

                  {/* Status badges - positioned to not overlap with level badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-5 lg:right-5 flex flex-col items-end gap-1.5 sm:gap-2">
                    {lesson.completed && (
                      <div className="bg-green-500 text-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 shadow-lg">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
                        <span className="hidden sm:inline">Completed</span>
                        <span className="sm:hidden">✓</span>
                      </div>
                    )}

                    {lesson.locked && (
                      <div className="bg-slate-500 text-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 shadow-lg">
                        <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Locked</span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4 sm:p-5 md:p-6 lg:p-7 pt-12 sm:pt-14">
                    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold flex-1 min-w-0 pr-24 sm:pr-28">
                            {lesson.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground mb-3 sm:mb-4 lg:mb-5 text-xs sm:text-sm md:text-base line-clamp-2">
                          {lesson.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-5 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                            <span className="font-medium">{lesson.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-yellow-500 flex-shrink-0" />
                            <span className="font-medium">+{lesson.xp} XP</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="font-medium">{lesson.questions} Questions</span>
                          </div>
                        </div>
                      </div>

                      {lesson.locked ? (
                        <Button
                          disabled
                          className="w-full h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm md:text-base font-bold"
                        >
                          <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1.5 sm:mr-2" />
                          <span className="hidden sm:inline">Complete previous lessons</span>
                          <span className="sm:hidden">Locked</span>
                        </Button>
                      ) : (
                        <Link href={`/practice/${skillId}/${lesson.id}`} className="w-full">
                          <Button
                            className="w-full h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            style={{
                              background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                            }}
                          >
                            <span className="hidden sm:inline">
                              {lesson.completed ? "Practice Again" : "Start Lesson"}
                            </span>
                            <span className="sm:hidden">
                              {lesson.completed ? "Again" : "Start"}
                            </span>
                            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ml-1.5 sm:ml-2 rotate-180" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}