// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Headphones, Mic, BookOpen, PenTool, ArrowLeft, Volume2, CheckCircle2, XCircle, Play } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { useNavigation } from "@/lib/navigation-context"

// const skillConfig = {
//   listening: {
//     name: "Listening",
//     icon: Headphones,
//     colorStart: "#3b82f6",
//     colorEnd: "#60a5fa",
//   },
//   speaking: {
//     name: "Speaking",
//     icon: Mic,
//     colorStart: "#ec4899",
//     colorEnd: "#f472b6",
//   },
//   reading: {
//     name: "Reading",
//     icon: BookOpen,
//     colorStart: "#8b5cf6",
//     colorEnd: "#a78bfa",
//   },
//   writing: {
//     name: "Writing",
//     icon: PenTool,
//     colorStart: "#f97316",
//     colorEnd: "#fb923c",
//   },
// }

// // Mock data for questions
// const questionsByLesson: Record<string, any> = {
//   l1: {
//     title: "Daily Conversations",
//     questions: [
//       {
//         id: 1,
//         type: "listening",
//         audio: "I am going to the restaurant for dinner.",
//         question: "Where is the person going?",
//         options: ["Home", "School", "Work", "Restaurant"],
//         correctAnswer: 3,
//       },
//       {
//         id: 2,
//         type: "listening",
//         audio: "The meeting starts at ten o'clock in the morning.",
//         question: "What time does the meeting start?",
//         options: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   l2: {
//     title: "Travel & Transportation",
//     questions: [
//       {
//         id: 1,
//         type: "listening",
//         audio: "I need to book a flight to Paris next week.",
//         question: "What does the person need to do?",
//         options: ["Book a hotel", "Book a flight", "Buy tickets", "Pack bags"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   s1: {
//     title: "Pronunciation Basics",
//     questions: [
//       {
//         id: 1,
//         type: "speaking",
//         question: "Pronounce the following word:",
//         word: "Restaurant",
//         phonetic: "/ˈres.tə.rɑːnt/",
//       },
//     ],
//   },
//   r1: {
//     title: "Short Stories",
//     questions: [
//       {
//         id: 1,
//         type: "reading",
//         passage: "The weather was beautiful yesterday. The sun was shining and birds were singing in the trees. Many people went to the park to enjoy the lovely day.",
//         question: "What was the weather like?",
//         options: ["Rainy", "Cloudy", "Beautiful", "Cold"],
//         correctAnswer: 2,
//       },
//     ],
//   },
//   w1: {
//     title: "Basic Sentences",
//     questions: [
//       {
//         id: 1,
//         type: "writing",
//         question: "Complete the sentence: I ___ to school every day.",
//         options: ["go", "goes", "going", "gone"],
//         correctAnswer: 0,
//       },
//     ],
//   },
// }

// // Confetti Component
// const Confetti = () => {
//   return (
//     <div className="fixed inset-0 pointer-events-none z-50">
//       {[...Array(50)].map((_, i) => (
//         <div
//           key={i}
//           className="confetti"
//           style={{
//             left: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 0.5}s`,
//             backgroundColor: ['#3b82f6', '#ec4899', '#8b5cf6', '#f97316', '#10b981'][Math.floor(Math.random() * 5)],
//           }}
//         />
//       ))}
//       <style jsx>{`
//         .confetti {
//           position: absolute;
//           width: 10px;
//           height: 10px;
//           top: -10px;
//           animation: fall 3s linear forwards;
//         }
//         @keyframes fall {
//           to {
//             transform: translateY(100vh) rotate(360deg);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default function LessonDetailPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const { isOpen, closeNav } = useNavigation()

//   const skillId = params.skill as keyof typeof skillConfig
//   const lessonId = params.lessonId as string
//   const skill = skillConfig[skillId]
//   const lessonData = questionsByLesson[lessonId]

//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswered, setIsAnswered] = useState(false)
//   const [correctCount, setCorrectCount] = useState(0)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [score, setScore] = useState<number | null>(null)

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

//   if (!skill || !lessonData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl mb-4">Lesson not found</p>
//           <Link href="/practice">
//             <Button>Back to Practice</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const Icon = skill.icon
//   const questions = lessonData.questions
//   const progress = ((currentQuestion + 1) / questions.length) * 100
//   const currentQ = questions[currentQuestion]

//   const playAudio = (text: string) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text)
//       utterance.rate = 0.9
//       utterance.pitch = 1
//       utterance.volume = 1
//       window.speechSynthesis.cancel()
//       window.speechSynthesis.speak(utterance)
//     }
//   }

//   const handleSelectAnswer = (optionIndex: number) => {
//     if (isAnswered) return
    
//     setSelectedAnswer(optionIndex)
//     setIsAnswered(true)
    
//     const isCorrect = optionIndex === currentQ.correctAnswer
    
//     if (isCorrect) {
//       setCorrectCount(correctCount + 1)
//       setShowConfetti(true)
//       setTimeout(() => setShowConfetti(false), 3000)
//     }
//   }

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//       setIsAnswered(false)
//     } else {
//       const finalScore = Math.round((correctCount / questions.length) * 100)
//       setScore(finalScore)
//     }
//   }

//   const handleRetry = () => {
//     setCurrentQuestion(0)
//     setSelectedAnswer(null)
//     setIsAnswered(false)
//     setCorrectCount(0)
//     setScore(null)
//   }

//   // Results screen
//   if (score !== null) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//         <Navigation isOpen={isOpen} onClose={closeNav} />
//         <TopBar onMenuClick={() => {}} />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             <Card className="border-none shadow-2xl overflow-hidden">
//               <div
//                 className="h-2"
//                 style={{
//                   background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                 }}
//               />
//               <CardContent className="p-12 text-center">
//                 <div className="mb-8">
//                   <div
//                     className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl mb-6 animate-bounce"
//                     style={{
//                       background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                     }}
//                   >
//                     <CheckCircle2 className="w-16 h-16 text-white" />
//                   </div>
//                   <h1 className="text-5xl font-black mb-4">
//                     Lesson Complete! 🎉
//                   </h1>
//                   <p className="text-2xl text-muted-foreground mb-2">{lessonData.title}</p>
//                   <p className="text-lg text-muted-foreground">
//                     You got {correctCount} out of {questions.length} correct!
//                   </p>
//                 </div>

//                 <div className="mb-10">
//                   <div 
//                     className="text-7xl font-black mb-2" 
//                     style={{ color: score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' }}
//                   >
//                     {score}%
//                   </div>
//                   <p className="text-xl text-muted-foreground">Your Score</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6 mb-10">
//                   <div className="p-6 bg-muted/30 rounded-2xl">
//                     <div className="text-3xl font-bold mb-2 text-green-600 dark:text-green-500">
//                       {correctCount}/{questions.length}
//                     </div>
//                     <div className="text-sm text-muted-foreground">Correct Answers</div>
//                   </div>
//                   <div className="p-6 bg-muted/30 rounded-2xl">
//                     <div className="text-3xl font-bold mb-2 text-yellow-500">+{score * 2}</div>
//                     <div className="text-sm text-muted-foreground">XP Earned</div>
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <Button
//                     onClick={handleRetry}
//                     variant="outline"
//                     className="flex-1 h-14 text-base font-bold"
//                   >
//                     Try Again
//                   </Button>
//                   <Link href={`/practice/${skillId}`} className="flex-1">
//                     <Button
//                       className="w-full h-14 text-base font-bold"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                     >
//                       Back to Lessons
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   const isCorrectAnswer = selectedAnswer === currentQ.correctAnswer

//   // Question screen
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={() => {}} />
      
//       {showConfetti && <Confetti />}

//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <Link href={`/practice/${skillId}`}>
//               <Button variant="ghost" className="mb-4 hover:bg-muted">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Lessons
//               </Button>
//             </Link>

//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-4">
//                 <div
//                   className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
//                   style={{
//                     background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                   }}
//                 >
//                   <Icon className="w-7 h-7 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold">{lessonData.title}</h2>
//                   <p className="text-sm text-muted-foreground">
//                     Question {currentQuestion + 1} of {questions.length}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-sm text-muted-foreground mb-1">Score</div>
//                 <div className="text-2xl font-bold text-green-600 dark:text-green-500">
//                   {correctCount}/{currentQuestion + (isAnswered ? 1 : 0)}
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <Progress value={progress} className="h-3" />
//               <div 
//                 className="absolute top-0 left-0 h-3 rounded-full transition-all duration-500"
//                 style={{
//                   width: `${(correctCount / questions.length) * 100}%`,
//                   background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                 }}
//               />
//             </div>
//           </div>

//           {/* Question Card */}
//           <Card className="border-none shadow-xl mb-8 overflow-hidden">
//             <div
//               className="h-1.5"
//               style={{
//                 background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//               }}
//             />
//             <CardContent className="p-8 md:p-10">
//               {/* Listening Question */}
//               {currentQ.type === "listening" && (
//                 <>
//                   <div className="mb-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl flex items-center justify-center">
//                     <Button
//                       size="lg"
//                       onClick={() => playAudio(currentQ.audio)}
//                       className="h-20 px-10"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                     >
//                       <Volume2 className="w-7 h-7 mr-3" />
//                       <span className="text-lg font-bold">Play Audio</span>
//                     </Button>
//                   </div>

//                   <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">{currentQ.question}</h3>

//                   <div className="space-y-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`w-full p-6 text-left rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-500 bg-green-50 dark:bg-green-950 shadow-lg"
//                                 : isSelected
//                                   ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                   : "border-border bg-muted opacity-60"
//                               : "border-border hover:border-primary/50 hover:bg-primary/5"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="text-lg font-medium">{option}</span>
//                             {isAnswered && isCorrect && (
//                               <CheckCircle2 className="w-7 h-7 text-green-600 animate-bounce" />
//                             )}
//                             {isAnswered && isSelected && !isCorrect && (
//                               <XCircle className="w-7 h-7 text-red-600" />
//                             )}
//                           </div>
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Reading Question */}
//               {currentQ.type === "reading" && (
//                 <>
//                   <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-2xl">
//                     <p className="text-base md:text-lg leading-relaxed">{currentQ.passage}</p>
//                   </div>

//                   <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">{currentQ.question}</h3>

//                   <div className="space-y-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`w-full p-6 text-left rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-500 bg-green-50 dark:bg-green-950 shadow-lg"
//                                 : isSelected
//                                   ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                   : "border-border bg-muted opacity-60"
//                               : "border-border hover:border-primary/50 hover:bg-primary/5"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="text-lg font-medium">{option}</span>
//                             {isAnswered && isCorrect && (
//                               <CheckCircle2 className="w-7 h-7 text-green-600 animate-bounce" />
//                             )}
//                             {isAnswered && isSelected && !isCorrect && (
//                               <XCircle className="w-7 h-7 text-red-600" />
//                             )}
//                           </div>
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Speaking Question */}
//               {currentQ.type === "speaking" && (
//                 <>
//                   <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">{currentQ.question}</h3>
                  
//                   {currentQ.word && (
//                     <div className="mb-8 p-10 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950 rounded-2xl text-center">
//                       <div className="text-5xl font-black mb-4">{currentQ.word}</div>
//                       <div className="text-2xl text-muted-foreground mb-6">{currentQ.phonetic}</div>
//                       <Button
//                         size="lg"
//                         onClick={() => playAudio(currentQ.word)}
//                         variant="outline"
//                       >
//                         <Volume2 className="w-5 h-5 mr-2" />
//                         Listen
//                       </Button>
//                     </div>
//                   )}

//                   <div className="flex flex-col items-center gap-6">
//                     <Button
//                       size="lg"
//                       className="h-32 w-32 rounded-full shadow-2xl"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                       onClick={() => handleSelectAnswer(0)}
//                       disabled={isAnswered}
//                     >
//                       <Mic className="w-12 h-12" />
//                     </Button>
//                     <p className="text-center text-muted-foreground">
//                       {isAnswered ? "Recording saved!" : "Click to record your answer"}
//                     </p>
//                   </div>
//                 </>
//               )}

//               {/* Writing Question */}
//               {currentQ.type === "writing" && (
//                 <>
//                   <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">{currentQ.question}</h3>

//                   <div className="space-y-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`w-full p-6 text-left rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-500 bg-green-50 dark:bg-green-950 shadow-lg"
//                                 : isSelected
//                                   ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                   : "border-border bg-muted opacity-60"
//                               : "border-border hover:border-primary/50 hover:bg-primary/5"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="text-lg font-medium">{option}</span>
//                             {isAnswered && isCorrect && (
//                               <CheckCircle2 className="w-7 h-7 text-green-600 animate-bounce" />
//                             )}
//                             {isAnswered && isSelected && !isCorrect && (
//                               <XCircle className="w-7 h-7 text-red-600" />
//                             )}
//                           </div>
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Feedback */}
//               {isAnswered && (
//                 <div
//                   className={`mt-8 p-6 rounded-2xl border-2 animate-in slide-in-from-bottom-4 ${
//                     isCorrectAnswer
//                       ? "bg-green-50 dark:bg-green-950 border-green-500"
//                       : "bg-red-50 dark:bg-red-950 border-red-500"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3 mb-2">
//                     {isCorrectAnswer ? (
//                       <>
//                         <CheckCircle2 className="w-8 h-8 text-green-600" />
//                         <span className="font-bold text-xl text-green-700 dark:text-green-400">
//                           Excellent! 🎉
//                         </span>
//                       </>
//                     ) : (
//                       <>
//                         <XCircle className="w-8 h-8 text-red-600" />
//                         <span className="font-bold text-xl text-red-700 dark:text-red-400">
//                           Not quite right
//                         </span>
//                       </>
//                     )}
//                   </div>
//                   {!isCorrectAnswer && (
//                     <p className="text-base text-muted-foreground">
//                       The correct answer is: <strong>{currentQ.options[currentQ.correctAnswer]}</strong>
//                     </p>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Navigation */}
//           {isAnswered && (
//             <Button
//               onClick={handleNext}
//               className="w-full h-16 text-lg font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
//               style={{
//                 background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//               }}
//             >
//               {currentQuestion === questions.length - 1 ? "Finish Lesson" : "Next Question"}
//               <Play className="w-6 h-6 ml-2" />
//             </Button>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }


// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Headphones, Mic, BookOpen, PenTool, ArrowLeft, Volume2, CheckCircle2, XCircle, Play } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { useNavigation } from "@/lib/navigation-context"

// const skillConfig = {
//   listening: {
//     name: "Listening",
//     icon: Headphones,
//     colorStart: "#3b82f6",
//     colorEnd: "#60a5fa",
//   },
//   speaking: {
//     name: "Speaking",
//     icon: Mic,
//     colorStart: "#ec4899",
//     colorEnd: "#f472b6",
//   },
//   reading: {
//     name: "Reading",
//     icon: BookOpen,
//     colorStart: "#8b5cf6",
//     colorEnd: "#a78bfa",
//   },
//   writing: {
//     name: "Writing",
//     icon: PenTool,
//     colorStart: "#f97316",
//     colorEnd: "#fb923c",
//   },
// }

// // Mock data for questions
// const questionsByLesson: Record<string, any> = {
//   l1: {
//     title: "Daily Conversations",
//     questions: [
//       {
//         id: 1,
//         type: "listening",
//         audio: "I am going to the restaurant for dinner.",
//         question: "Where is the person going?",
//         options: ["Home", "School", "Work", "Restaurant"],
//         correctAnswer: 3,
//       },
//       {
//         id: 2,
//         type: "listening",
//         audio: "The meeting starts at ten o'clock in the morning.",
//         question: "What time does the meeting start?",
//         options: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   l2: {
//     title: "Travel & Transportation",
//     questions: [
//       {
//         id: 1,
//         type: "listening",
//         audio: "I need to book a flight to Paris next week.",
//         question: "What does the person need to do?",
//         options: ["Book a hotel", "Book a flight", "Buy tickets", "Pack bags"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   s1: {
//     title: "Pronunciation Basics",
//     questions: [
//       {
//         id: 1,
//         type: "speaking",
//         question: "Pronounce the following word:",
//         word: "Restaurant",
//         phonetic: "/ˈres.tə.rɑːnt/",
//       },
//     ],
//   },
//   r1: {
//     title: "Short Stories",
//     questions: [
//       {
//         id: 1,
//         type: "reading",
//         passage: "The weather was beautiful yesterday. The sun was shining and birds were singing in the trees. Many people went to the park to enjoy the lovely day.",
//         question: "What was the weather like?",
//         options: ["Rainy", "Cloudy", "Beautiful", "Cold"],
//         correctAnswer: 2,
//       },
//     ],
//   },
//   w1: {
//     title: "Basic Sentences",
//     questions: [
//       {
//         id: 1,
//         type: "writing",
//         question: "Complete the sentence: I ___ to school every day.",
//         options: ["go", "goes", "going", "gone"],
//         correctAnswer: 0,
//       },
//     ],
//   },
// }

// // Epic Fireworks Confetti Component
// const Confetti = () => {
//   return (
//     <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
//       {/* Multiple explosion bursts */}
//       {[...Array(5)].map((_, burstIndex) => (
//         <div key={`burst-${burstIndex}`} style={{ animationDelay: `${burstIndex * 0.3}s` }}>
//           {[...Array(60)].map((_, i) => {
//             const angle = (i / 60) * Math.PI * 2
//             const velocity = 150 + Math.random() * 350
//             const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#f97316', '#10b981', '#eab308', '#06b6d4', '#f43f5e', '#a855f7', '#14b8a6']
//             const startX = 20 + Math.random() * 60
//             const startY = 20 + Math.random() * 60
            
//             return (
//               <div
//                 key={`${burstIndex}-${i}`}
//                 className="firework-particle"
//                 style={{
//                   left: `${startX}%`,
//                   top: `${startY}%`,
//                   width: `${10 + Math.random() * 12}px`,
//                   height: `${10 + Math.random() * 12}px`,
//                   backgroundColor: colors[Math.floor(Math.random() * colors.length)],
//                   animationDelay: `${burstIndex * 0.3 + Math.random() * 0.2}s`,
//                   '--angle': `${angle}rad`,
//                   '--velocity': `${velocity}px`,
//                   '--rotation': `${Math.random() * 1080}deg`,
//                 } as any}
//               />
//             )
//           })}
//         </div>
//       ))}
//       <style jsx>{`
//         .firework-particle {
//           position: absolute;
//           border-radius: 50%;
//           animation: firework-explode 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
//           box-shadow: 
//             0 0 20px currentColor,
//             0 0 40px currentColor,
//             0 0 60px currentColor;
//         }
//         @keyframes firework-explode {
//           0% {
//             transform: translate(0, 0) rotate(0deg) scale(0);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//             transform: translate(0, 0) rotate(0deg) scale(1);
//           }
//           100% {
//             transform: 
//               translate(
//                 calc(cos(var(--angle)) * var(--velocity)),
//                 calc(sin(var(--angle)) * var(--velocity) + 200px)
//               )
//               rotate(var(--rotation))
//               scale(0);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default function LessonDetailPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const { isOpen, closeNav } = useNavigation()

//   const skillId = params.skill as keyof typeof skillConfig
//   const lessonId = params.lessonId as string
//   const skill = skillConfig[skillId]
//   const lessonData = questionsByLesson[lessonId]

//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswered, setIsAnswered] = useState(false)
//   const [correctCount, setCorrectCount] = useState(0)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [score, setScore] = useState<number | null>(null)

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

//   if (!skill || !lessonData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl mb-4">Lesson not found</p>
//           <Link href="/practice">
//             <Button>Back to Practice</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const Icon = skill.icon
//   const questions = lessonData.questions
//   const progress = ((currentQuestion + 1) / questions.length) * 100
//   const currentQ = questions[currentQuestion]

//   const playAudio = (text: string) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text)
//       utterance.rate = 0.9
//       utterance.pitch = 1
//       utterance.volume = 1
//       window.speechSynthesis.cancel()
//       window.speechSynthesis.speak(utterance)
//     }
//   }

//   const handleSelectAnswer = (optionIndex: number) => {
//     if (isAnswered) return
    
//     setSelectedAnswer(optionIndex)
//     setIsAnswered(true)
    
//     const isCorrect = optionIndex === currentQ.correctAnswer
    
//     if (isCorrect) {
//       setCorrectCount(correctCount + 1)
//       setShowConfetti(true)
//       setTimeout(() => setShowConfetti(false), 3000)
//     }
//   }

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//       setIsAnswered(false)
//     } else {
//       const finalScore = Math.round((correctCount / questions.length) * 100)
//       setScore(finalScore)
//     }
//   }

//   const handleRetry = () => {
//     setCurrentQuestion(0)
//     setSelectedAnswer(null)
//     setIsAnswered(false)
//     setCorrectCount(0)
//     setScore(null)
//   }

//   // Results screen
//   if (score !== null) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//         <Navigation isOpen={isOpen} onClose={closeNav} />
//         <TopBar onMenuClick={() => {}} />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             <Card className="border-none shadow-2xl overflow-hidden">
//               <div
//                 className="h-2"
//                 style={{
//                   background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                 }}
//               />
//               <CardContent className="p-6 sm:p-8 md:p-12 text-center">
//                 <div className="mb-6 sm:mb-8">
//                   <div
//                     className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl mb-4 sm:mb-6 animate-bounce"
//                     style={{
//                       background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                     }}
//                   >
//                     <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
//                   </div>
//                   <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
//                     Lesson Complete! 🎉
//                   </h1>
//                   <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2">{lessonData.title}</p>
//                   <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
//                     You got {correctCount} out of {questions.length} correct!
//                   </p>
//                 </div>

//                 <div className="mb-8 sm:mb-10">
//                   <div 
//                     className="text-5xl sm:text-6xl md:text-7xl font-black mb-2" 
//                     style={{ color: score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' }}
//                   >
//                     {score}%
//                   </div>
//                   <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Your Score</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
//                   <div className="p-4 sm:p-5 md:p-6 bg-muted/30 rounded-2xl">
//                     <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 text-green-600 dark:text-green-500">
//                       {correctCount}/{questions.length}
//                     </div>
//                     <div className="text-xs sm:text-sm text-muted-foreground">Correct Answers</div>
//                   </div>
//                   <div className="p-4 sm:p-5 md:p-6 bg-muted/30 rounded-2xl">
//                     <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 text-yellow-500">+{score * 2}</div>
//                     <div className="text-xs sm:text-sm text-muted-foreground">XP Earned</div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//                   <Button
//                     onClick={handleRetry}
//                     variant="outline"
//                     className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-bold"
//                   >
//                     Try Again
//                   </Button>
//                   <Link href={`/practice/${skillId}`} className="flex-1">
//                     <Button
//                       className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                     >
//                       Back to Lessons
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   const isCorrectAnswer = selectedAnswer === currentQ.correctAnswer

//   // Question screen
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={() => {}} />
      
//       {showConfetti && <Confetti />}

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-6 sm:mb-8">
//             <Link href={`/practice/${skillId}`}>
//               <Button variant="ghost" className="mb-3 sm:mb-4 hover:bg-muted text-sm sm:text-base">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Lessons
//               </Button>
//             </Link>

//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div
//                   className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg"
//                   style={{
//                     background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                   }}
//                 >
//                   <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl sm:text-2xl font-bold">{lessonData.title}</h2>
//                   <p className="text-xs sm:text-sm text-muted-foreground">
//                     Question {currentQuestion + 1} of {questions.length}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-xs sm:text-sm text-muted-foreground mb-1">Score</div>
//                 <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500">
//                   {correctCount}/{currentQuestion + (isAnswered ? 1 : 0)}
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <Progress value={progress} className="h-2 sm:h-3" />
//               <div 
//                 className="absolute top-0 left-0 h-2 sm:h-3 rounded-full transition-all duration-500"
//                 style={{
//                   width: `${(correctCount / questions.length) * 100}%`,
//                   background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                 }}
//               />
//             </div>
//           </div>

//           {/* Question Card */}
//           <Card className="border-none shadow-xl mb-6 sm:mb-8 overflow-hidden bg-slate-800/40 dark:bg-slate-900/60 backdrop-blur-sm">
//             <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10">
//               {/* Listening Question */}
//               {currentQ.type === "listening" && (
//                 <>
//                   <div className="mb-6 sm:mb-8 p-6 sm:p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30 dark:border-blue-500/30">
//                     <Button
//                       size="lg"
//                       onClick={() => playAudio(currentQ.audio)}
//                       className="h-16 sm:h-20 px-8 sm:px-10 shadow-lg hover:shadow-2xl transition-all"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                     >
//                       <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3" />
//                       <span className="text-base sm:text-lg font-bold">Play Audio</span>
//                     </Button>
//                   </div>

//                   <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">{currentQ.question}</h3>

//                   <div className="space-y-3 sm:space-y-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`w-full p-4 sm:p-5 md:p-6 text-left rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-400 bg-green-500/20 dark:bg-green-500/30 shadow-lg shadow-green-500/50"
//                                 : isSelected
//                                   ? "border-red-400 bg-red-500/20 dark:bg-red-500/30 shadow-lg shadow-red-500/50"
//                                   : "border-slate-600/40 dark:border-slate-700/40 bg-slate-700/20 dark:bg-slate-800/30 opacity-50"
//                               : "border-slate-600/60 dark:border-slate-700/50 bg-slate-700/30 dark:bg-slate-800/40 hover:border-blue-400/60 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="text-base sm:text-lg font-medium">{option}</span>
//                             {isAnswered && isCorrect && (
//                               <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 animate-bounce" />
//                             )}
//                             {isAnswered && isSelected && !isCorrect && (
//                               <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
//                             )}
//                           </div>
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Reading Question */}
//               {currentQ.type === "reading" && (
//                 <>
//                   <div className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-600/30 dark:to-pink-600/30 rounded-2xl backdrop-blur-sm border border-purple-400/30 dark:border-purple-500/30">
//                     <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-100 dark:text-slate-200">{currentQ.passage}</p>
//                   </div>

//                   <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">{currentQ.question}</h3>

//                   <div className="space-y-3 sm:space-y-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`w-full p-4 sm:p-5 md:p-6 text-left rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-500 bg-green-50 dark:bg-green-950 shadow-lg"
//                                 : isSelected
//                                   ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                   : "border-border bg-muted opacity-60"
//                               : "border-border hover:border-primary/50 hover:bg-primary/5"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="text-base sm:text-lg font-medium">{option}</span>
//                             {isAnswered && isCorrect && (
//                               <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 animate-bounce" />
//                             )}
//                             {isAnswered && isSelected && !isCorrect && (
//                               <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
//                             )}
//                           </div>
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Speaking Question */}
//               {currentQ.type === "speaking" && (
//                 <>
//                   <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">{currentQ.question}</h3>
                  
//                   {currentQ.word && (
//                     <div className="mb-6 sm:mb-8 p-8 sm:p-10 bg-gradient-to-br from-pink-500/20 to-red-500/20 dark:from-pink-600/30 dark:to-red-600/30 rounded-2xl text-center backdrop-blur-sm border border-pink-400/30 dark:border-pink-500/30">
//                       <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-white drop-shadow-lg">{currentQ.word}</div>
//                       <div className="text-lg sm:text-xl md:text-2xl text-slate-200 dark:text-slate-300 mb-4 sm:mb-6">{currentQ.phonetic}</div>
//                       <Button
//                         size="lg"
//                         onClick={() => playAudio(currentQ.word)}
//                         variant="outline"
//                         className="text-sm sm:text-base border-white/40 hover:bg-white/10 text-white"
//                       >
//                         <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
//                         Listen
//                       </Button>
//                     </div>
//                   )}

//                   <div className="flex flex-col items-center gap-4 sm:gap-6">
//                     <Button
//                       size="lg"
//                       className="h-28 w-28 sm:h-32 sm:w-32 rounded-full shadow-2xl"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                       onClick={() => handleSelectAnswer(0)}
//                       disabled={isAnswered}
//                     >
//                       <Mic className="w-10 h-10 sm:w-12 sm:h-12" />
//                     </Button>
//                     <p className="text-center text-sm sm:text-base text-muted-foreground">
//                       {isAnswered ? "Recording saved!" : "Click to record your answer"}
//                     </p>
//                   </div>
//                 </>
//               )}

//               {/* Writing Question */}
//               {currentQ.type === "writing" && (
//                 <>
//                   <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">{currentQ.question}</h3>

//                   <div className="space-y-3 sm:space-y-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`w-full p-4 sm:p-5 md:p-6 text-left rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-500 bg-green-50 dark:bg-green-950 shadow-lg"
//                                 : isSelected
//                                   ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                   : "border-border bg-muted opacity-60"
//                               : "border-border hover:border-primary/50 hover:bg-primary/5"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="text-base sm:text-lg font-medium">{option}</span>
//                             {isAnswered && isCorrect && (
//                               <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 animate-bounce" />
//                             )}
//                             {isAnswered && isSelected && !isCorrect && (
//                               <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
//                             )}
//                           </div>
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Feedback */}
//               {isAnswered && (
//                 <div
//                   className={`mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 rounded-2xl border-2 animate-in slide-in-from-bottom-4 ${
//                     isCorrectAnswer
//                       ? "bg-green-50 dark:bg-green-950 border-green-500"
//                       : "bg-red-50 dark:bg-red-950 border-red-500"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2 sm:gap-3 mb-2">
//                     {isCorrectAnswer ? (
//                       <>
//                         <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
//                         <span className="font-bold text-lg sm:text-xl text-green-700 dark:text-green-400">
//                           Excellent! 🎉
//                         </span>
//                       </>
//                     ) : (
//                       <>
//                         <XCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-600" />
//                         <span className="font-bold text-lg sm:text-xl text-red-700 dark:text-red-400">
//                           Not quite right
//                         </span>
//                       </>
//                     )}
//                   </div>
//                   {!isCorrectAnswer && (
//                     <p className="text-sm sm:text-base text-muted-foreground">
//                       The correct answer is: <strong>{currentQ.options[currentQ.correctAnswer]}</strong>
//                     </p>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Navigation */}
//           {isAnswered && (
//             <Button
//               onClick={handleNext}
//               className="w-full h-14 sm:h-16 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
//               style={{
//                 background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//               }}
//             >
//               {currentQuestion === questions.length - 1 ? "Finish Lesson" : "Next Question"}
//               <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
//             </Button>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }

// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Headphones, Mic, BookOpen, PenTool, ArrowLeft, Volume2, CheckCircle2, XCircle, Play } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { useNavigation } from "@/lib/navigation-context"

// const skillConfig = {
//   listening: {
//     name: "Listening",
//     icon: Headphones,
//     colorStart: "#3b82f6",
//     colorEnd: "#60a5fa",
//   },
//   speaking: {
//     name: "Speaking",
//     icon: Mic,
//     colorStart: "#ec4899",
//     colorEnd: "#f472b6",
//   },
//   reading: {
//     name: "Reading",
//     icon: BookOpen,
//     colorStart: "#8b5cf6",
//     colorEnd: "#a78bfa",
//   },
//   writing: {
//     name: "Writing",
//     icon: PenTool,
//     colorStart: "#f97316",
//     colorEnd: "#fb923c",
//   },
// }

// // Mock data for questions
// const questionsByLesson: Record<string, any> = {
//   l1: {
//     title: "Daily Conversations",
//     questions: [
//       {
//         id: 1,
//         type: "listening",
//         audio: "I am going to the restaurant for dinner.",
//         question: "Where is the person going?",
//         options: ["Home", "School", "Work", "Restaurant"],
//         correctAnswer: 3,
//       },
//       {
//         id: 2,
//         type: "listening",
//         audio: "The meeting starts at ten o'clock in the morning.",
//         question: "What time does the meeting start?",
//         options: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   l2: {
//     title: "Travel & Transportation",
//     questions: [
//       {
//         id: 1,
//         type: "listening",
//         audio: "I need to book a flight to Paris next week.",
//         question: "What does the person need to do?",
//         options: ["Book a hotel", "Book a flight", "Buy tickets", "Pack bags"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   s1: {
//     title: "Pronunciation Basics",
//     questions: [
//       {
//         id: 1,
//         type: "speaking",
//         question: "Pronounce the following word:",
//         word: "Restaurant",
//         phonetic: "/ˈres.tə.rɑːnt/",
//       },
//     ],
//   },
//   r1: {
//     title: "Short Stories",
//     questions: [
//       {
//         id: 1,
//         type: "reading",
//         passage: "The weather was beautiful yesterday. The sun was shining and birds were singing in the trees. Many people went to the park to enjoy the lovely day.",
//         question: "What was the weather like?",
//         options: ["Rainy", "Cloudy", "Beautiful", "Cold"],
//         correctAnswer: 2,
//       },
//     ],
//   },
//   w1: {
//     title: "Basic Sentences",
//     questions: [
//       {
//         id: 1,
//         type: "writing",
//         question: "Complete the sentence: I ___ to school every day.",
//         options: ["go", "goes", "going", "gone"],
//         correctAnswer: 0,
//       },
//     ],
//   },
// }

// // Sparkle Stars Confetti Component
// const Confetti = () => {
//   return (
//     <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
//       {[...Array(50)].map((_, i) => {
//         const startX = Math.random() * 100
//         const startY = -10
//         const endX = startX + (Math.random() - 0.5) * 40
//         const endY = 100 + Math.random() * 20
//         const delay = Math.random() * 0.5
//         const duration = 1.5 + Math.random() * 1
//         const colors = ['#fbbf24', '#f59e0b', '#fcd34d', '#fde68a', '#ffffff']
//         const size = 4 + Math.random() * 8
        
//         return (
//           <div
//             key={i}
//             className="confetti-star"
//             style={{
//               left: `${startX}%`,
//               top: `${startY}%`,
//               width: `${size}px`,
//               height: `${size}px`,
//               backgroundColor: colors[Math.floor(Math.random() * colors.length)],
//               animationDelay: `${delay}s`,
//               animationDuration: `${duration}s`,
//               '--end-x': `${endX - startX}%`,
//               '--end-y': `${endY}vh`,
//               '--start-x': `${startX}%`,
//             } as React.CSSProperties & { '--end-x': string; '--end-y': string; '--start-x': string }}
//           />
//         )
//       })}
//       <style jsx>{`
//         .confetti-star {
//           position: absolute;
//           clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
//           animation: fall-and-fade linear forwards;
//           filter: drop-shadow(0 0 3px currentColor);
//         }
//         @keyframes fall-and-fade {
//           0% {
//             transform: translate(0, 0) rotate(0deg) scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: translateX(calc(var(--end-x) - var(--start-x))) translateY(var(--end-y)) rotate(720deg) scale(0);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default function LessonDetailPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const { isOpen, closeNav } = useNavigation()

//   const skillId = params.skill as keyof typeof skillConfig
//   const lessonId = params.lessonId as string
//   const skill = skillConfig[skillId]
//   const lessonData = questionsByLesson[lessonId]

//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswered, setIsAnswered] = useState(false)
//   const [correctCount, setCorrectCount] = useState(0)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [score, setScore] = useState<number | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [transcribedText, setTranscribedText] = useState("")
//   const [recognition, setRecognition] = useState<any>(null)

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
//       const recognitionInstance = new SpeechRecognition()
//       recognitionInstance.continuous = false
//       recognitionInstance.interimResults = false
//       recognitionInstance.lang = 'en-US'

//       recognitionInstance.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript
//         setTranscribedText(transcript)
//         setIsRecording(false)
//       }

//       recognitionInstance.onerror = (event: any) => {
//         console.error('Speech recognition error:', event.error)
//         setIsRecording(false)
//         alert(`Speech recognition error: ${event.error}. Please make sure your microphone is enabled.`)
//       }

//       recognitionInstance.onend = () => {
//         setIsRecording(false)
//       }

//       setRecognition(recognitionInstance)
//     }
//   }, [])

//   // Auto-check transcribed text for speaking questions
//   useEffect(() => {
//     if (!lessonData || !lessonData.questions) return
    
//     const currentQ = lessonData.questions[currentQuestion]
    
//     if (transcribedText && !isAnswered && currentQ && currentQ.type === "speaking" && currentQ.word) {
//       const isCorrect = transcribedText.toLowerCase().trim() === currentQ.word.toLowerCase().trim()
//       setSelectedAnswer(isCorrect ? 0 : -1)
//       setIsAnswered(true)
      
//       if (isCorrect) {
//         setCorrectCount(prev => prev + 1)
//       }
//     }
//   }, [transcribedText, isAnswered, currentQuestion, lessonData, correctCount])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   if (!skill || !lessonData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl mb-4">Lesson not found</p>
//           <Link href="/practice">
//             <Button>Back to Practice</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const Icon = skill.icon
//   const questions = lessonData.questions
//   const progress = ((currentQuestion + 1) / questions.length) * 100
//   const currentQ = questions[currentQuestion]

//   const playAudio = (text: string) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text)
//       utterance.rate = 0.9
//       utterance.pitch = 1
//       utterance.volume = 1
//       window.speechSynthesis.cancel()
//       window.speechSynthesis.speak(utterance)
//     }
//   }

//   const handleSelectAnswer = (optionIndex: number) => {
//     if (isAnswered) return
    
//     setSelectedAnswer(optionIndex)
//     setIsAnswered(true)
    
//     const isCorrect = optionIndex === currentQ.correctAnswer
    
//     if (isCorrect) {
//       setCorrectCount(correctCount + 1)
//     }
//   }

//   const handleStartRecording = () => {
//     if (!recognition) {
//       alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
//       return
//     }

//     if (isRecording) {
//       recognition.stop()
//       setIsRecording(false)
//     } else {
//       setTranscribedText("")
//       setIsRecording(true)
//       recognition.start()
//     }
//   }

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//       setIsAnswered(false)
//       setTranscribedText("")
//       setIsRecording(false)
//     } else {
//       const finalScore = Math.round((correctCount / questions.length) * 100)
//       setScore(finalScore)
//       setShowConfetti(true)
//       setTimeout(() => setShowConfetti(false), 4000)
//     }
//   }

//   const handleRetry = () => {
//     setCurrentQuestion(0)
//     setSelectedAnswer(null)
//     setIsAnswered(false)
//     setCorrectCount(0)
//     setScore(null)
//     setTranscribedText("")
//     setIsRecording(false)
//   }

//   // Results screen
//   if (score !== null) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//         <Navigation isOpen={isOpen} onClose={closeNav} />
//         <TopBar onMenuClick={() => {}} />
        
//         {showConfetti && <Confetti />}

//         <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             <Card className="border-none shadow-2xl overflow-hidden">
//               <div
//                 className="h-2"
//                 style={{
//                   background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                 }}
//               />
//               <CardContent className="p-6 sm:p-8 md:p-12 text-center">
//                 <div className="mb-6 sm:mb-8">
//                   <div
//                     className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl mb-4 sm:mb-6 animate-bounce"
//                     style={{
//                       background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                     }}
//                   >
//                     <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
//                   </div>
//                   <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
//                     Lesson Complete! 🎉
//                   </h1>
//                   <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2">{lessonData.title}</p>
//                   <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
//                     You got {correctCount} out of {questions.length} correct!
//                   </p>
//                 </div>

//                 <div className="mb-8 sm:mb-10">
//                   <div 
//                     className="text-5xl sm:text-6xl md:text-7xl font-black mb-2" 
//                     style={{ color: score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' }}
//                   >
//                     {score}%
//                   </div>
//                   <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Your Score</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
//                   <div className="p-4 sm:p-5 md:p-6 bg-muted/30 rounded-2xl">
//                     <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 text-green-600 dark:text-green-500">
//                       {correctCount}/{questions.length}
//                     </div>
//                     <div className="text-xs sm:text-sm text-muted-foreground">Correct Answers</div>
//                   </div>
//                   <div className="p-4 sm:p-5 md:p-6 bg-muted/30 rounded-2xl">
//                     <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 text-yellow-500">+{score * 2}</div>
//                     <div className="text-xs sm:text-sm text-muted-foreground">XP Earned</div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//                   <Button
//                     onClick={handleRetry}
//                     variant="outline"
//                     className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-bold"
//                   >
//                     Try Again
//                   </Button>
//                   <Link href={`/practice/${skillId}`} className="flex-1">
//                     <Button
//                       className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                     >
//                       Back to Lessons
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   const isCorrectAnswer = selectedAnswer === currentQ.correctAnswer

//   // Question screen
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={() => {}} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-6 sm:mb-8">
//             <Link href={`/practice/${skillId}`}>
//               <Button variant="ghost" className="mb-3 sm:mb-4 hover:bg-muted text-sm sm:text-base">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Lessons
//               </Button>
//             </Link>

//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div
//                   className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg"
//                   style={{
//                     background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                   }}
//                 >
//                   <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl sm:text-2xl font-bold">{lessonData.title}</h2>
//                   <p className="text-xs sm:text-sm text-muted-foreground">
//                     Question {currentQuestion + 1} / {questions.length}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-xs sm:text-sm text-muted-foreground mb-1">Score</div>
//                 <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500">
//                   {correctCount}/{currentQuestion + (isAnswered ? 1 : 0)}
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <Progress value={progress} className="h-2 sm:h-3" />
//               <div 
//                 className="absolute top-0 left-0 h-2 sm:h-3 rounded-full transition-all duration-500"
//                 style={{
//                   width: `${(correctCount / questions.length) * 100}%`,
//                   background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                 }}
//               />
//             </div>
//           </div>

//           {/* Question Card */}
//           <Card className="border-none shadow-xl mb-6 sm:mb-8 overflow-hidden">
//             <CardContent className="p-6 sm:p-8 md:p-10">
//               {/* Listening Question */}
//               {currentQ.type === "listening" && (
//                 <>
//                   <div className="mb-8 flex justify-center">
//                     <Button
//                       size="lg"
//                       onClick={() => playAudio(currentQ.audio)}
//                       className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                     >
//                       <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
//                       Play Audio
//                     </Button>
//                   </div>

//                   <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center">{currentQ.question}</h3>

//                   <div className="grid grid-cols-2 gap-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                 : isSelected
//                                   ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                   : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
//                               : "border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
//                           }`}
//                         >
//                           {option}
//                           {isAnswered && isCorrect && (
//                             <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mt-2" />
//                           )}
//                           {isAnswered && isSelected && !isCorrect && (
//                             <XCircle className="w-5 h-5 text-red-600 mx-auto mt-2" />
//                           )}
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Reading Question */}
//               {currentQ.type === "reading" && (
//                 <>
//                   <div className="mb-8 p-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
//                     <p className="text-base leading-relaxed">{currentQ.passage}</p>
//                   </div>

//                   <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center">{currentQ.question}</h3>

//                   <div className="grid grid-cols-2 gap-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                 : isSelected
//                                   ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                   : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
//                               : "border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 cursor-pointer"
//                           }`}
//                         >
//                           {option}
//                           {isAnswered && isCorrect && (
//                             <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mt-2" />
//                           )}
//                           {isAnswered && isSelected && !isCorrect && (
//                             <XCircle className="w-5 h-5 text-red-600 mx-auto mt-2" />
//                           )}
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Speaking Question */}
//               {currentQ.type === "speaking" && (
//                 <>
//                   <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center">{currentQ.question}</h3>
                  
//                   {currentQ.word && (
//                     <div className="mb-8 p-8 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/30 dark:to-red-950/30 rounded-xl text-center border border-pink-200 dark:border-pink-800">
//                       <div className="text-4xl font-black mb-3">{currentQ.word}</div>
//                       <div className="text-xl text-muted-foreground mb-6">{currentQ.phonetic}</div>
//                       <Button
//                         size="lg"
//                         onClick={() => playAudio(currentQ.word)}
//                         variant="outline"
//                         className="text-base"
//                       >
//                         <Volume2 className="w-5 h-5 mr-2" />
//                         Listen
//                       </Button>
//                     </div>
//                   )}

//                   <div className="flex flex-col items-center gap-6">
//                     <Button
//                       size="lg"
//                       className={`h-32 w-32 rounded-full shadow-xl transition-all ${
//                         isRecording ? 'animate-pulse' : ''
//                       }`}
//                       style={{
//                         background: isRecording 
//                           ? 'linear-gradient(135deg, #ef4444, #dc2626)'
//                           : `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                       onClick={handleStartRecording}
//                       disabled={isAnswered}
//                     >
//                       <Mic className="w-12 h-12" />
//                     </Button>
//                     <p className="text-center text-base text-muted-foreground">
//                       {isRecording 
//                         ? "Recording... Click to stop" 
//                         : isAnswered 
//                           ? "Recording complete!" 
//                           : "Click to record your answer"}
//                     </p>
                    
//                     {transcribedText && (
//                       <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                         <p className="text-sm text-muted-foreground mb-1">You said:</p>
//                         <p className="text-lg font-semibold">{transcribedText}</p>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {/* Writing Question */}
//               {currentQ.type === "writing" && (
//                 <>
//                   <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center">{currentQ.question}</h3>

//                   <div className="grid grid-cols-2 gap-4">
//                     {currentQ.options.map((option: string, index: number) => {
//                       const isSelected = selectedAnswer === index
//                       const isCorrect = index === currentQ.correctAnswer
                      
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => handleSelectAnswer(index)}
//                           disabled={isAnswered}
//                           className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base ${
//                             isAnswered
//                               ? isCorrect
//                                 ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                 : isSelected
//                                   ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                   : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
//                               : "border-slate-200 dark:border-slate-700 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 cursor-pointer"
//                           }`}
//                         >
//                           {option}
//                           {isAnswered && isCorrect && (
//                             <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mt-2" />
//                           )}
//                           {isAnswered && isSelected && !isCorrect && (
//                             <XCircle className="w-5 h-5 text-red-600 mx-auto mt-2" />
//                           )}
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </>
//               )}

//               {/* Feedback */}
//               {isAnswered && (
//                 <div
//                   className={`mt-8 p-5 rounded-xl border-2 ${
//                     isCorrectAnswer || (currentQ.type === "speaking" && selectedAnswer === 0)
//                       ? "bg-green-50 dark:bg-green-950 border-green-500"
//                       : "bg-red-50 dark:bg-red-950 border-red-500"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3 mb-2">
//                     {(isCorrectAnswer || (currentQ.type === "speaking" && selectedAnswer === 0)) ? (
//                       <>
//                         <CheckCircle2 className="w-6 h-6 text-green-600" />
//                         <span className="font-bold text-lg text-green-700 dark:text-green-400">
//                           Excellent! 🎉
//                         </span>
//                       </>
//                     ) : (
//                       <>
//                         <XCircle className="w-6 h-6 text-red-600" />
//                         <span className="font-bold text-lg text-red-700 dark:text-red-400">
//                           Not quite right
//                         </span>
//                       </>
//                     )}
//                   </div>
//                   {currentQ.type === "speaking" ? (
//                     <p className="text-sm text-muted-foreground">
//                       {selectedAnswer === 0 ? (
//                         <>Perfect pronunciation! ✨</>
//                       ) : (
//                         <>Try again! The correct pronunciation is: <strong>{currentQ.word}</strong></>
//                       )}
//                     </p>
//                   ) : (
//                     !isCorrectAnswer && (
//                       <p className="text-sm text-muted-foreground">
//                         The correct answer is: <strong>{currentQ.options[currentQ.correctAnswer]}</strong>
//                       </p>
//                     )
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Navigation */}
//           {isAnswered && (
//             <Button
//               onClick={handleNext}
//               className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
//               style={{
//                 background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//               }}
//             >
//               {currentQuestion === questions.length - 1 ? "Finish Lesson" : "Next Question"}
//               <Play className="w-5 h-5 ml-2" />
//             </Button>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }












































// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import TopBar from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Headphones, Mic, BookOpen, PenTool, ArrowLeft, Volume2, CheckCircle2, XCircle, Play, AlertCircle } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { useNavigation } from "@/lib/navigation-context"

// const skillConfig = {
//   listening: {
//     name: "Listening",
//     icon: Headphones,
//     colorStart: "#3b82f6",
//     colorEnd: "#60a5fa",
//   },
//   speaking: {
//     name: "Speaking",
//     icon: Mic,
//     colorStart: "#ec4899",
//     colorEnd: "#f472b6",
//   },
//   reading: {
//     name: "Reading",
//     icon: BookOpen,
//     colorStart: "#8b5cf6",
//     colorEnd: "#a78bfa",
//   },
//   writing: {
//     name: "Writing",
//     icon: PenTool,
//     colorStart: "#f97316",
//     colorEnd: "#fb923c",
//   },
// }

// // Fireworks Confetti Component
// const Confetti = () => {
//   const particles = Array.from({ length: 80 }, (_, i) => {
//     const angle = (i / 80) * Math.PI * 2
//     const speed = 200 + Math.random() * 150
//     const delay = Math.random() * 0.3
//     const x = Math.cos(angle) * speed
//     const y = Math.sin(angle) * speed
    
//     return {
//       id: i,
//       x,
//       y,
//       delay,
//       size: 6 + Math.random() * 10,
//       color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FF1493', '#00FF00', '#FF69B4', '#FFA500'][Math.floor(Math.random() * 10)],
//     }
//   })

//   return (
//     <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
//       <div className="absolute w-16 h-16 bg-yellow-400 rounded-full animate-ping" style={{ animationDuration: '0.5s' }} />
      
//       {particles.map((particle) => (
//         <div
//           key={particle.id}
//           className="absolute"
//           style={{
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//             backgroundColor: particle.color,
//             borderRadius: '50%',
//             boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
//             animation: `firework 1.5s ease-out forwards`,
//             animationDelay: `${particle.delay}s`,
//             '--tx': `${particle.x}px`,
//             '--ty': `${particle.y}px`,
//           } as any}
//         />
//       ))}
      
//       <style jsx>{`
//         @keyframes firework {
//           0% {
//             transform: translate(0, 0) scale(1);
//             opacity: 1;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             transform: translate(var(--tx), var(--ty)) scale(0);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// interface AnswerFeedback {
//   isCorrect: boolean
//   correctAnswer: string | null  // null if correct
//   explanation: string
//   userAnswer: string
// }

// export default function LessonDetailPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const { isOpen, closeNav, toggleNav } = useNavigation()

//   const skillId = params.skill as keyof typeof skillConfig
//   const lessonId = params.lessonId as string
//   const skill = skillConfig[skillId]

//   const [lessonData, setLessonData] = useState<any>(null)
//   const [questions, setQuestions] = useState<any[]>([])
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswered, setIsAnswered] = useState(false)
//   const [answerFeedback, setAnswerFeedback] = useState<AnswerFeedback | null>(null)
//   const [isCheckingAnswer, setIsCheckingAnswer] = useState(false)
//   const [userAnswers, setUserAnswers] = useState<Array<{ questionId: number; userAnswer: string }>>([])
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [score, setScore] = useState<number | null>(null)
//   const [completionResult, setCompletionResult] = useState<any>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [transcribedText, setTranscribedText] = useState("")
//   const [writingAnswer, setWritingAnswer] = useState("")
//   const [recognition, setRecognition] = useState<any>(null)
//   const [isLoadingLesson, setIsLoadingLesson] = useState(true)
//   const [startTime] = useState(Date.now())

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//       return
//     }

//     if (user && lessonId) {
//       loadLesson()
//     }
//   }, [user, isLoading, router, lessonId])

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
//       const recognitionInstance = new SpeechRecognition()
//       recognitionInstance.continuous = false
//       recognitionInstance.interimResults = false
//       recognitionInstance.lang = 'en-US'

//       recognitionInstance.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript
//         setTranscribedText(transcript)
//         setIsRecording(false)
//       }

//       recognitionInstance.onerror = (event: any) => {
//         console.error('Speech recognition error:', event.error)
//         setIsRecording(false)
//         alert(`Speech recognition error: ${event.error}. Please make sure your microphone is enabled.`)
//       }

//       recognitionInstance.onend = () => {
//         setIsRecording(false)
//       }

//       setRecognition(recognitionInstance)
//     }
//   }, [])

//   // Auto-check transcribed text for speaking questions
//   useEffect(() => {
//     if (!questions.length) return
    
//     const currentQ = questions[currentQuestion]
    
//     if (transcribedText && !isAnswered && currentQ && currentQ.type === "speaking") {
//       handleCheckAnswer(0, transcribedText)
//     }
//   }, [transcribedText, isAnswered, currentQuestion, questions])

//   const loadLesson = async () => {
//     try {
//       setIsLoadingLesson(true)
//       const response = await fetch(
//         `http://localhost:3000/api/practice/start`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//           body: JSON.stringify({ practiceLessonId: parseInt(lessonId) })
//         }
//       )
      
//       if (!response.ok) throw new Error('Failed to start lesson')
      
//       const data = await response.json()
//       setLessonData(data.lesson)
//       setQuestions(data.questions)
//     } catch (error) {
//       console.error("Error loading lesson:", error)
//       alert("Failed to load lesson. Please try again.")
//       router.push(`/practice/${skillId}`)
//     } finally {
//       setIsLoadingLesson(false)
//     }
//   }

//   const handleCheckAnswer = async (optionIndex: number, customAnswer?: string) => {
//     if (isAnswered || isCheckingAnswer) return
    
//     setIsCheckingAnswer(true)
//     setSelectedAnswer(optionIndex)
    
//     try {
//       const currentQ = questions[currentQuestion]
//       const answer = customAnswer || (currentQ.options ? currentQ.options[optionIndex] : optionIndex.toString())
      
//       // Call check-answer API
//       const response = await fetch(
//         `http://localhost:3000/api/practice/check-answer`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//           body: JSON.stringify({
//             questionId: currentQ.id,
//             userAnswer: answer
//           })
//         }
//       )
      
//       if (!response.ok) throw new Error('Failed to check answer')
      
//       const feedback: AnswerFeedback = await response.json()
//       setAnswerFeedback(feedback)
//       setIsAnswered(true)
      
//       // Store answer
//       setUserAnswers(prev => [...prev, {
//         questionId: currentQ.id,
//         userAnswer: answer
//       }])
      
//       // Show confetti only if correct
//       if (feedback.isCorrect) {
//         setShowConfetti(true)
//         setTimeout(() => setShowConfetti(false), 2500)
//       }
      
//     } catch (error) {
//       console.error("Error checking answer:", error)
//       alert("Failed to check answer. Please try again.")
//     } finally {
//       setIsCheckingAnswer(false)
//     }
//   }

//   const completeLesson = async () => {
//     try {
//       const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      
//       const response = await fetch(
//         `http://localhost:3000/api/practice/complete`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//           body: JSON.stringify({
//             practiceLessonId: parseInt(lessonId),
//             answers: userAnswers,
//             timeSpent
//           })
//         }
//       )
      
//       if (!response.ok) throw new Error('Failed to complete lesson')
      
//       const result = await response.json()
//       setCompletionResult(result)
//       setScore(result.accuracy)
//       setShowConfetti(true)
//       setTimeout(() => setShowConfetti(false), 4000)
//     } catch (error) {
//       console.error("Error completing lesson:", error)
//       alert("Failed to complete lesson. Please try again.")
//     }
//   }

//   if (isLoading || !user || isLoadingLesson) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   if (!skill || !lessonData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
//         <div className="text-center">
//           <p className="text-xl mb-4 text-slate-900 dark:text-white">Lesson not found</p>
//           <Link href="/practice">
//             <Button className="text-white" style={{
//               background: `linear-gradient(135deg, ${skill?.colorStart || '#3b82f6'}, ${skill?.colorEnd || '#60a5fa'})`,
//             }}>Back to Practice</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const Icon = skill.icon
//   const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0
//   const currentQ = questions[currentQuestion]

//   const playAudio = (text: string) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text)
//       utterance.rate = 0.9
//       utterance.pitch = 1
//       utterance.volume = 1
//       window.speechSynthesis.cancel()
//       window.speechSynthesis.speak(utterance)
//     }
//   }

//   const handleStartRecording = () => {
//     if (!recognition) {
//       alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
//       return
//     }

//     if (isRecording) {
//       recognition.stop()
//       setIsRecording(false)
//     } else {
//       setTranscribedText("")
//       setIsRecording(true)
//       recognition.start()
//     }
//   }

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//       setIsAnswered(false)
//       setAnswerFeedback(null)
//       setTranscribedText("")
//       setWritingAnswer("")
//       setIsRecording(false)
//     } else {
//       completeLesson()
//     }
//   }

//   const handleRetry = () => {
//     setCurrentQuestion(0)
//     setSelectedAnswer(null)
//     setIsAnswered(false)
//     setAnswerFeedback(null)
//     setUserAnswers([])
//     setScore(null)
//     setCompletionResult(null)
//     setTranscribedText("")
//     setWritingAnswer("")
//     setIsRecording(false)
//     loadLesson()
//   }

//   // Results screen
//   if (score !== null && completionResult) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
//         <Navigation isOpen={isOpen} onClose={closeNav} />
//         <TopBar onMenuClick={toggleNav} />
        
//         {showConfetti && <Confetti />}

//         <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             <Card className="border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-800">
//               <div
//                 className="h-2"
//                 style={{
//                   background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                 }}
//               />
//               <CardContent className="p-6 sm:p-8 md:p-12 text-center">
//                 <div className="mb-6 sm:mb-8">
//                   <div
//                     className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl mb-4 sm:mb-6 animate-bounce"
//                     style={{
//                       background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                     }}
//                   >
//                     <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
//                   </div>
//                   <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
//                     Lesson Complete! 🎉
//                   </h1>
//                   <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-2">{lessonData.title}</p>
//                   <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
//                     {completionResult.message}
//                   </p>
//                 </div>

//                 <div className="mb-8 sm:mb-10">
//                   <div 
//                     className="text-5xl sm:text-6xl md:text-7xl font-black mb-2" 
//                     style={{ color: score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' }}
//                   >
//                     {score}%
//                   </div>
//                   <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400">Your Score</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
//                   <div className="p-4 sm:p-5 md:p-6 bg-slate-100 dark:!bg-slate-900/80 rounded-2xl">
//                     <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 text-green-600 dark:text-green-500">
//                       {completionResult.correctAnswers}/{completionResult.totalQuestions}
//                     </div>
//                     <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Correct Answers</div>
//                   </div>
//                   <div className="p-4 sm:p-5 md:p-6 bg-slate-100 dark:!bg-slate-900/80 rounded-2xl">
//                     <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 text-yellow-500 dark:text-yellow-400">
//                       +{completionResult.xpEarned}
//                     </div>
//                     <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">XP Earned</div>
//                   </div>
//                 </div>

//                 {completionResult.newAchievements && completionResult.newAchievements.length > 0 && (
//                   <div className="mb-8 sm:mb-10 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
//                     <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">🏆 New Achievements!</h3>
//                     {completionResult.newAchievements.map((achievement: any, index: number) => (
//                       <p key={index} className="text-sm text-slate-600 dark:text-slate-400">{achievement.title}</p>
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//                   <Button
//                     onClick={handleRetry}
//                     variant="outline"
//                     className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-bold border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
//                   >
//                     Try Again
//                   </Button>
//                   <Link href={`/practice/${skillId}`} className="flex-1">
//                     <Button
//                       className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold text-white border-0"
//                       style={{
//                         background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                       }}
//                     >
//                       Back to Lessons
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // Question screen
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />
      
//       {showConfetti && <Confetti />}

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-6 sm:mb-8">
//             <Link href={`/practice/${skillId}`}>
//               <Button variant="ghost" className="mb-3 sm:mb-4 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm sm:text-base text-slate-900 dark:text-white">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Lessons
//               </Button>
//             </Link>

//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div
//                   className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg"
//                   style={{
//                     background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                   }}
//                 >
//                   <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{lessonData.title}</h2>
//                   <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
//                     Question {currentQuestion + 1} / {questions.length}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Progress</div>
//                 <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500">
//                   {currentQuestion + (isAnswered ? 1 : 0)}/{questions.length}
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <Progress value={progress} className="h-2 sm:h-3" />
//             </div>
//           </div>

//           {/* Question Card */}
//           {currentQ && (
//             <Card className="border-none shadow-xl mb-6 sm:mb-8 overflow-hidden bg-white dark:bg-slate-800">
//               <CardContent className="p-6 sm:p-8 md:p-10">
//                 {/* Listening Question */}
//                 {currentQ.type === "listening" && (
//                   <>
//                     {currentQ.textToSpeak && (
//                       <div className="mb-8 flex justify-center">
//                         <Button
//                           size="lg"
//                           onClick={() => playAudio(currentQ.textToSpeak)}
//                           className="h-20 w-20 sm:h-24 sm:w-24 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all text-white border-0"
//                           style={{
//                             background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                           }}
//                         >
//                           <Volume2 className="w-8 h-8 sm:w-10 sm:h-10" />
//                         </Button>
//                       </div>
//                     )}

//                     <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>

//                     {currentQ.options && currentQ.options.length > 0 && (
//                       <div className="grid grid-cols-2 gap-4">
//                         {currentQ.options.map((option: string, index: number) => {
//                           const isSelected = selectedAnswer === index
//                           const isCorrectOption = answerFeedback && answerFeedback.correctAnswer === option
                          
//                           return (
//                             <button
//                               key={index}
//                               onClick={() => handleCheckAnswer(index)}
//                               disabled={isAnswered || isCheckingAnswer}
//                               className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base text-slate-900 dark:text-white relative ${
//                                 isAnswered && isSelected && answerFeedback?.isCorrect
//                                   ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                   : isAnswered && isSelected && !answerFeedback?.isCorrect
//                                     ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                     : isAnswered && isCorrectOption
//                                       ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                       : isAnswered
//                                         ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
//                                         : "border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
//                               }`}
//                             >
//                               {option}
//                               {isAnswered && isSelected && answerFeedback?.isCorrect && (
//                                 <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
//                               )}
//                               {isAnswered && isSelected && !answerFeedback?.isCorrect && (
//                                 <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto mt-2" />
//                               )}
//                               {isAnswered && isCorrectOption && !isSelected && (
//                                 <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
//                               )}
//                             </button>
//                           )
//                         })}
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Reading Question */}
//                 {currentQ.type === "reading" && (
//                   <>
//                     <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>

//                     {currentQ.options && currentQ.options.length > 0 && (
//                       <div className="grid grid-cols-2 gap-4">
//                         {currentQ.options.map((option: string, index: number) => {
//                           const isSelected = selectedAnswer === index
//                           const isCorrectOption = answerFeedback && answerFeedback.correctAnswer === option
                          
//                           return (
//                             <button
//                               key={index}
//                               onClick={() => handleCheckAnswer(index)}
//                               disabled={isAnswered || isCheckingAnswer}
//                               className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base text-slate-900 dark:text-white ${
//                                 isAnswered && isSelected && answerFeedback?.isCorrect
//                                   ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                   : isAnswered && isSelected && !answerFeedback?.isCorrect
//                                     ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                     : isAnswered && isCorrectOption
//                                       ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                       : isAnswered
//                                         ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
//                                         : "border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 cursor-pointer"
//                               }`}
//                             >
//                               {option}
//                               {isAnswered && isSelected && answerFeedback?.isCorrect && (
//                                 <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
//                               )}
//                               {isAnswered && isSelected && !answerFeedback?.isCorrect && (
//                                 <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto mt-2" />
//                               )}
//                               {isAnswered && isCorrectOption && !isSelected && (
//                                 <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
//                               )}
//                             </button>
//                           )
//                         })}
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Speaking Question */}
//                 {currentQ.type === "speaking" && (
//                   <>
//                     <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>
                    
//                     {currentQ.textToSpeak && (
//                       <div className="mb-8 p-6 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/30 dark:to-red-950/30 rounded-xl border border-pink-200 dark:border-pink-800 flex flex-col items-center gap-4">
//                         <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white text-center">
//                           {currentQ.textToSpeak}
//                         </div>
//                         <Button
//                           size="lg"
//                           onClick={() => playAudio(currentQ.textToSpeak)}
//                           className="h-16 w-16 rounded-full text-white border-0"
//                           style={{
//                             background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                           }}
//                         >
//                           <Volume2 className="w-7 h-7" />
//                         </Button>
//                       </div>
//                     )}

//                     <div className="flex flex-col items-center gap-6">
//                       <Button
//                         size="lg"
//                         className={`h-32 w-32 rounded-full shadow-xl transition-all text-white border-0 ${
//                           isRecording ? 'animate-pulse' : ''
//                         }`}
//                         style={{
//                           background: isRecording 
//                             ? 'linear-gradient(135deg, #ef4444, #dc2626)'
//                             : `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                         }}
//                         onClick={handleStartRecording}
//                         disabled={isAnswered || isCheckingAnswer}
//                       >
//                         <Mic className="w-12 h-12" />
//                       </Button>
//                       <p className="text-center text-base text-slate-600 dark:text-slate-400">
//                         {isRecording 
//                           ? "Recording... Click to stop" 
//                           : isAnswered 
//                             ? "Recording complete!" 
//                             : "Click to record your answer"}
//                       </p>
                      
//                       {transcribedText && (
//                         <div className="w-full mt-4 p-4 bg-slate-100 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-700">
//                           <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">You said:</p>
//                           <p className="text-lg font-semibold text-slate-900 dark:text-white">{transcribedText}</p>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}

//                 {/* Writing Question */}
//                 {currentQ.type === "writing" && (
//                   <>
//                     <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>

//                     {/* Check if has options (multiple choice) or free text */}
//                     {currentQ.options && currentQ.options.length > 0 ? (
//                       <div className="grid grid-cols-2 gap-4">
//                         {currentQ.options.map((option: string, index: number) => {
//                           const isSelected = selectedAnswer === index
//                           const isCorrectOption = answerFeedback && answerFeedback.correctAnswer === option
                          
//                           return (
//                             <button
//                               key={index}
//                               onClick={() => handleCheckAnswer(index)}
//                               disabled={isAnswered || isCheckingAnswer}
//                               className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base text-slate-900 dark:text-white ${
//                                 isAnswered && isSelected && answerFeedback?.isCorrect
//                                   ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                   : isAnswered && isSelected && !answerFeedback?.isCorrect
//                                     ? "border-red-500 bg-red-50 dark:bg-red-950"
//                                     : isAnswered && isCorrectOption
//                                       ? "border-green-500 bg-green-50 dark:bg-green-950"
//                                       : isAnswered
//                                         ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
//                                         : "border-slate-200 dark:border-slate-700 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 cursor-pointer"
//                               }`}
//                             >
//                               {option}
//                               {isAnswered && isSelected && answerFeedback?.isCorrect && (
//                                 <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
//                               )}
//                               {isAnswered && isSelected && !answerFeedback?.isCorrect && (
//                                 <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto mt-2" />
//                               )}
//                               {isAnswered && isCorrectOption && !isSelected && (
//                                 <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
//                               )}
//                             </button>
//                           )
//                         })}
//                       </div>
//                     ) : (
//                       // Free text input for writing
//                       <div className="space-y-4">
//                         <textarea
//                           value={writingAnswer}
//                           onChange={(e) => setWritingAnswer(e.target.value)}
//                           disabled={isAnswered || isCheckingAnswer}
//                           placeholder="Type your answer here..."
//                           className="w-full min-h-[200px] p-4 text-base rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none resize-none"
//                         />
//                         {!isAnswered && writingAnswer.trim() && (
//                           <Button
//                             onClick={() => handleCheckAnswer(0, writingAnswer)}
//                             disabled={isCheckingAnswer}
//                             className="w-full h-12 text-base font-bold text-white border-0"
//                             style={{
//                               background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//                             }}
//                           >
//                             Submit Answer
//                           </Button>
//                         )}
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Feedback Section */}
//                 {answerFeedback && (
//                   <div className={`mt-8 p-6 rounded-xl border-2 ${
//                     answerFeedback.isCorrect 
//                       ? 'bg-green-50 dark:bg-green-950/30 border-green-500 dark:border-green-600' 
//                       : 'bg-red-50 dark:bg-red-950/30 border-red-500 dark:border-red-600'
//                   }`}>
//                     <div className="flex items-start gap-4">
//                       {answerFeedback.isCorrect ? (
//                         <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
//                       ) : (
//                         <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
//                       )}
//                       <div className="flex-1">
//                         <h4 className={`font-bold text-lg mb-2 ${
//                           answerFeedback.isCorrect 
//                             ? 'text-green-900 dark:text-green-300' 
//                             : 'text-red-900 dark:text-red-300'
//                         }`}>
//                           {answerFeedback.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
//                         </h4>
//                         <p className="text-slate-700 dark:text-slate-300 mb-3">
//                           {answerFeedback.explanation}
//                         </p>
//                         {!answerFeedback.isCorrect && answerFeedback.correctAnswer && (
//                           <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
//                             <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Correct answer:</p>
//                             <p className="font-semibold text-slate-900 dark:text-white">{answerFeedback.correctAnswer}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           )}

//           {/* Navigation */}
//           {isAnswered && (
//             <Button
//               onClick={handleNext}
//               className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all text-white border-0"
//               style={{
//                 background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
//               }}
//             >
//               {currentQuestion === questions.length - 1 ? "Finish Lesson" : "Next Question"}
//               <Play className="w-5 h-5 ml-2" />
//             </Button>
//           )}

//           {/* Checking Answer Loading State */}
//           {isCheckingAnswer && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//               <div className="bg-white dark:bg-slate-800 rounded-xl p-6 flex flex-col items-center gap-4">
//                 <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//                 <p className="text-slate-900 dark:text-white font-medium">Checking your answer...</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }


"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import TopBar from "@/components/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Headphones, Mic, BookOpen, PenTool, ArrowLeft, Volume2, CheckCircle2, XCircle, Play, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useNavigation } from "@/lib/navigation-context"

const skillConfig = {
  listening: {
    name: "Listening",
    icon: Headphones,
    colorStart: "#3b82f6",
    colorEnd: "#60a5fa",
  },
  speaking: {
    name: "Speaking",
    icon: Mic,
    colorStart: "#ec4899",
    colorEnd: "#f472b6",
  },
  reading: {
    name: "Reading",
    icon: BookOpen,
    colorStart: "#8b5cf6",
    colorEnd: "#a78bfa",
  },
  writing: {
    name: "Writing",
    icon: PenTool,
    colorStart: "#f97316",
    colorEnd: "#fb923c",
  },
}

// Fireworks Confetti Component
const Confetti = () => {
  const particles = Array.from({ length: 80 }, (_, i) => {
    const angle = (i / 80) * Math.PI * 2
    const speed = 200 + Math.random() * 150
    const delay = Math.random() * 0.3
    const x = Math.cos(angle) * speed
    const y = Math.sin(angle) * speed
    
    return {
      id: i,
      x,
      y,
      delay,
      size: 6 + Math.random() * 10,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FF1493', '#00FF00', '#FF69B4', '#FFA500'][Math.floor(Math.random() * 10)],
    }
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
      <div className="absolute w-16 h-16 bg-yellow-400 rounded-full animate-ping" style={{ animationDuration: '0.5s' }} />
      
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            animation: `firework 1.5s ease-out forwards`,
            animationDelay: `${particle.delay}s`,
            '--tx': `${particle.x}px`,
            '--ty': `${particle.y}px`,
          } as any}
        />
      ))}
      
      <style jsx>{`
        @keyframes firework {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

interface AnswerFeedback {
  isCorrect: boolean
  correctAnswer: string | null  // null if correct
  explanation: string
  userAnswer: string
}

export default function LessonDetailPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { isOpen, closeNav, toggleNav } = useNavigation()

  const skillId = params.skill as keyof typeof skillConfig
  const lessonId = params.lessonId as string
  const skill = skillConfig[skillId]

  const [lessonData, setLessonData] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answerFeedback, setAnswerFeedback] = useState<AnswerFeedback | null>(null)
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Array<{ questionId: number; userAnswer: string }>>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [completionResult, setCompletionResult] = useState<any>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [transcribedText, setTranscribedText] = useState("")
  const [writingAnswer, setWritingAnswer] = useState("")
  const [recognition, setRecognition] = useState<any>(null)
  const [isLoadingLesson, setIsLoadingLesson] = useState(true)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    if (user && lessonId) {
      loadLesson()
    }
  }, [user, isLoading, router, lessonId])

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setTranscribedText(transcript)
        setIsRecording(false)
      }

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
        alert(`Speech recognition error: ${event.error}. Please make sure your microphone is enabled.`)
      }

      recognitionInstance.onend = () => {
        setIsRecording(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  // Auto-check transcribed text for speaking questions
  useEffect(() => {
    if (!questions.length) return
    
    const currentQ = questions[currentQuestion]
    
    if (transcribedText && !isAnswered && currentQ && currentQ.type === "speaking") {
      handleCheckAnswer(0, transcribedText)
    }
  }, [transcribedText, isAnswered, currentQuestion, questions])

  const loadLesson = async () => {
    try {
      setIsLoadingLesson(true)
      const response = await fetch(
        `http://localhost:3000/api/practice/start`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({ practiceLessonId: parseInt(lessonId) })
        }
      )
      
      if (!response.ok) throw new Error('Failed to start lesson')
      
      const data = await response.json()
      setLessonData(data.lesson)
      setQuestions(data.questions)
    } catch (error) {
      console.error("Error loading lesson:", error)
      alert("Failed to load lesson. Please try again.")
      router.push(`/practice/${skillId}`)
    } finally {
      setIsLoadingLesson(false)
    }
  }

  const handleCheckAnswer = async (optionIndex: number, customAnswer?: string) => {
    if (isAnswered || isCheckingAnswer) return
    
    setIsCheckingAnswer(true)
    setSelectedAnswer(optionIndex)
    
    try {
      const currentQ = questions[currentQuestion]
      const answer = customAnswer || (currentQ.options ? currentQ.options[optionIndex] : optionIndex.toString())
      
      // Call check-answer API
      const response = await fetch(
        `http://localhost:3000/api/practice/check-answer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            questionId: currentQ.id,
            userAnswer: answer
          })
        }
      )
      
      if (!response.ok) throw new Error('Failed to check answer')
      
      const feedback: AnswerFeedback = await response.json()
      setAnswerFeedback(feedback)
      setIsAnswered(true)
      
      // Store answer
      setUserAnswers(prev => [...prev, {
        questionId: currentQ.id,
        userAnswer: answer
      }])
      
      // Show confetti only if correct
      if (feedback.isCorrect) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2500)
      }
      
    } catch (error) {
      console.error("Error checking answer:", error)
      alert("Failed to check answer. Please try again.")
    } finally {
      setIsCheckingAnswer(false)
    }
  }

const completeLesson = async () => {
  // ✅ KIỂM TRA user đã trả lời tất cả câu hỏi
  if (userAnswers.length !== questions.length) {
    alert(`Bạn chưa trả lời tất cả các câu hỏi. Đã trả lời: ${userAnswers.length}/${questions.length}`);
    return;
  }

  try {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    const response = await fetch(
      `http://localhost:3000/api/practice/complete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          practiceLessonId: parseInt(lessonId),
          answers: userAnswers,
          timeSpent
        })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to complete lesson');
    }
    
    const result = await response.json();
    setCompletionResult(result);
    setScore(result.accuracy);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  } catch (error: any) {
    console.error("Error completing lesson:", error);
    alert(`Failed to complete lesson: ${error.message}`);
  }
};

  if (isLoading || !user || isLoadingLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!skill || !lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <p className="text-xl mb-4 text-slate-900 dark:text-white">Lesson not found</p>
          <Link href="/practice">
            <Button className="text-white" style={{
              background: `linear-gradient(135deg, ${skill?.colorStart || '#3b82f6'}, ${skill?.colorEnd || '#60a5fa'})`,
            }}>Back to Practice</Button>
          </Link>
        </div>
      </div>
    )
  }

  const Icon = skill.icon
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0
  const currentQ = questions[currentQuestion]

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleStartRecording = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    if (isRecording) {
      recognition.stop()
      setIsRecording(false)
    } else {
      setTranscribedText("")
      setIsRecording(true)
      recognition.start()
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setAnswerFeedback(null)
      setTranscribedText("")
      setWritingAnswer("")
      setIsRecording(false)
    } else {
      completeLesson()
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setAnswerFeedback(null)
    setUserAnswers([])
    setScore(null)
    setCompletionResult(null)
    setTranscribedText("")
    setWritingAnswer("")
    setIsRecording(false)
    loadLesson()
  }

  // Results screen
  if (score !== null && completionResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Navigation isOpen={isOpen} onClose={closeNav} />
        <TopBar onMenuClick={toggleNav} />
        
        {showConfetti && <Confetti />}

        <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-800">
              <div
                className="h-2"
                style={{
                  background: `linear-gradient(90deg, ${skill.colorStart}, ${skill.colorEnd})`,
                }}
              />
              <CardContent className="p-6 sm:p-8 md:p-12 text-center">
                <div className="mb-6 sm:mb-8">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl mb-4 sm:mb-6 animate-bounce"
                    style={{
                      background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                    }}
                  >
                    <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
                    Lesson Complete! 🎉
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-2">{lessonData.title}</p>
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
                    {completionResult.message}
                  </p>
                </div>

                <div className="mb-8 sm:mb-10">
                  <div 
                    className="text-5xl sm:text-6xl md:text-7xl font-black mb-2" 
                    style={{ color: score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' }}
                  >
                    {score}%
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400">Your Score</p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
                  <div className="p-4 sm:p-5 md:p-6 bg-slate-100 dark:!bg-slate-900/80 rounded-2xl">
                    <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 text-green-600 dark:text-green-500">
                      {completionResult.correctAnswers}/{completionResult.totalQuestions}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Correct Answers</div>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 bg-slate-100 dark:!bg-slate-900/80 rounded-2xl">
                    <div className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 text-yellow-500 dark:text-yellow-400">
                      +{completionResult.xpEarned}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">XP Earned</div>
                  </div>
                </div>

                {completionResult.newAchievements && completionResult.newAchievements.length > 0 && (
                  <div className="mb-8 sm:mb-10 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">🏆 New Achievements!</h3>
                    {completionResult.newAchievements.map((achievement: any, index: number) => (
                      <p key={index} className="text-sm text-slate-600 dark:text-slate-400">{achievement.title}</p>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-bold border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    Try Again
                  </Button>
                  <Link href={`/practice/${skillId}`} className="flex-1">
                    <Button
                      className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold text-white border-0"
                      style={{
                        background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                      }}
                    >
                      Back to Lessons
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Question screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />
      
      {showConfetti && <Confetti />}

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Link href={`/practice/${skillId}`}>
              <Button variant="ghost" className="mb-3 sm:mb-4 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm sm:text-base text-slate-900 dark:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lessons
              </Button>
            </Link>

            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                  }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{lessonData.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Question {currentQuestion + 1} / {questions.length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Progress</div>
                <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500">
                  {currentQuestion + (isAnswered ? 1 : 0)}/{questions.length}
                </div>
              </div>
            </div>

            <div className="relative">
              <Progress value={progress} className="h-2 sm:h-3" />
            </div>
          </div>

          {/* Question Card */}
          {currentQ && (
            <Card className="border-none shadow-xl mb-6 sm:mb-8 overflow-hidden bg-white dark:bg-slate-800">
              <CardContent className="p-6 sm:p-8 md:p-10">
                {/* Listening Question */}
                {currentQ.type === "listening" && (
                  <>
                    {currentQ.textToSpeak && (
                      <div className="mb-8 flex justify-center">
                        <Button
                          size="lg"
                          onClick={() => playAudio(currentQ.textToSpeak)}
                          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all text-white border-0"
                          style={{
                            background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                          }}
                        >
                          <Volume2 className="w-8 h-8 sm:w-10 sm:h-10" />
                        </Button>
                      </div>
                    )}

                    <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>

                    {currentQ.options && currentQ.options.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {currentQ.options.map((option: string, index: number) => {
                          const isSelected = selectedAnswer === index
                          const isCorrectOption = answerFeedback && answerFeedback.correctAnswer === option
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleCheckAnswer(index)}
                              disabled={isAnswered || isCheckingAnswer}
                              className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base text-slate-900 dark:text-white relative ${
                                isAnswered && isSelected && answerFeedback?.isCorrect
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : isAnswered && isSelected && !answerFeedback?.isCorrect
                                    ? "border-red-500 bg-red-50 dark:bg-red-950"
                                    : isAnswered && isCorrectOption
                                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                                      : isAnswered
                                        ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
                                        : "border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
                              }`}
                            >
                              {option}
                              {isAnswered && isSelected && answerFeedback?.isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
                              )}
                              {isAnswered && isSelected && !answerFeedback?.isCorrect && (
                                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto mt-2" />
                              )}
                              {isAnswered && isCorrectOption && !isSelected && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </>
                )}

                {/* Reading Question */}
                {currentQ.type === "reading" && (
                  <>
                    <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>

                    {currentQ.options && currentQ.options.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {currentQ.options.map((option: string, index: number) => {
                          const isSelected = selectedAnswer === index
                          const isCorrectOption = answerFeedback && answerFeedback.correctAnswer === option
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleCheckAnswer(index)}
                              disabled={isAnswered || isCheckingAnswer}
                              className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base text-slate-900 dark:text-white ${
                                isAnswered && isSelected && answerFeedback?.isCorrect
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : isAnswered && isSelected && !answerFeedback?.isCorrect
                                    ? "border-red-500 bg-red-50 dark:bg-red-950"
                                    : isAnswered && isCorrectOption
                                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                                      : isAnswered
                                        ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
                                        : "border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 cursor-pointer"
                              }`}
                            >
                              {option}
                              {isAnswered && isSelected && answerFeedback?.isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
                              )}
                              {isAnswered && isSelected && !answerFeedback?.isCorrect && (
                                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto mt-2" />
                              )}
                              {isAnswered && isCorrectOption && !isSelected && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </>
                )}

                {/* Speaking Question */}
                {/* {currentQ.type === "speaking" && (
                  <>
                    <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>
                    
                    {currentQ.textToSpeak && (
                      <div className="mb-8 p-8 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/30 dark:to-red-950/30 rounded-xl border border-pink-200 dark:border-pink-800">
                        <div className="flex items-center justify-center gap-6">
                          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                            {currentQ.textToSpeak}
                          </div>
                          <Button
                            size="lg"
                            onClick={() => playAudio(currentQ.textToSpeak)}
                            className="h-16 w-16 rounded-full text-white border-0 flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                            }}
                          >
                            <Volume2 className="w-7 h-7" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col items-center gap-6">
                      <Button
                        size="lg"
                        className={`h-32 w-32 rounded-full shadow-xl transition-all text-white border-0 ${
                          isRecording ? 'animate-pulse' : ''
                        }`}
                        style={{
                          background: isRecording 
                            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                            : `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                        }}
                        onClick={handleStartRecording}
                        disabled={isAnswered || isCheckingAnswer}
                      >
                        <Mic className="w-12 h-12" />
                      </Button>
                      <p className="text-center text-base text-slate-600 dark:text-slate-400">
                        {isRecording 
                          ? "Recording... Click to stop" 
                          : isAnswered 
                            ? "Recording complete!" 
                            : "Click to record your answer"}
                      </p>
                      
                      {transcribedText && (
                        <div className="w-full mt-4 p-4 bg-slate-100 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">You said:</p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">{transcribedText}</p>
                        </div>
                      )}
                    </div>
                  </>
                )} */}

                {/* Speaking Question */}
                {currentQ.type === "speaking" && (
                  <>
                    {currentQ.textToSpeak && (
                      <div className="mb-8 flex justify-center">
                        <Button
                          size="lg"
                          onClick={() => playAudio(currentQ.textToSpeak)}
                          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all text-white border-0"
                          style={{
                            background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                          }}
                        >
                          <Volume2 className="w-8 h-8 sm:w-10 sm:h-10" />
                        </Button>
                      </div>
                    )}

                    <h3 className="text-xl sm:text-2xl font-bold mb-16 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>

                    <div className="flex flex-col items-center gap-6">
                      <Button
                        size="lg"
                        className={`h-32 w-32 rounded-full shadow-xl transition-all text-white border-0 ${
                          isRecording ? 'animate-pulse' : ''
                        }`}
                        style={{
                          background: isRecording 
                            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                            : `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                        }}
                        onClick={handleStartRecording}
                        disabled={isAnswered || isCheckingAnswer}
                      >
                        <Mic className="w-12 h-12" />
                      </Button>
                      <p className="text-center text-base text-slate-600 dark:text-slate-400">
                        {isRecording 
                          ? "Recording... Click to stop" 
                          : isAnswered 
                            ? "Recording complete!" 
                            : "Click to record your answer"}
                      </p>
                      
                      {transcribedText && (
                        <div className="w-full mt-4 p-4 bg-slate-100 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">You said:</p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">{transcribedText}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Writing Question */}
                {currentQ.type === "writing" && (
                  <>
                    <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{currentQ.questionText}</h3>

                    {/* Check if has options (multiple choice) or free text */}
                    {currentQ.options && currentQ.options.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {currentQ.options.map((option: string, index: number) => {
                          const isSelected = selectedAnswer === index
                          const isCorrectOption = answerFeedback && answerFeedback.correctAnswer === option
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleCheckAnswer(index)}
                              disabled={isAnswered || isCheckingAnswer}
                              className={`p-6 text-center rounded-xl border-2 transition-all font-medium text-base text-slate-900 dark:text-white ${
                                isAnswered && isSelected && answerFeedback?.isCorrect
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : isAnswered && isSelected && !answerFeedback?.isCorrect
                                    ? "border-red-500 bg-red-50 dark:bg-red-950"
                                    : isAnswered && isCorrectOption
                                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                                      : isAnswered
                                        ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-50"
                                        : "border-slate-200 dark:border-slate-700 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 cursor-pointer"
                              }`}
                            >
                              {option}
                              {isAnswered && isSelected && answerFeedback?.isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
                              )}
                              {isAnswered && isSelected && !answerFeedback?.isCorrect && (
                                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto mt-2" />
                              )}
                              {isAnswered && isCorrectOption && !isSelected && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      // Free text input for writing
                      <div className="space-y-4">
                        <textarea
                          value={writingAnswer}
                          onChange={(e) => setWritingAnswer(e.target.value)}
                          disabled={isAnswered || isCheckingAnswer}
                          placeholder="Type your answer here..."
                          className="w-full min-h-[200px] p-4 text-base rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none resize-none"
                        />
                        {!isAnswered && writingAnswer.trim() && (
                          <Button
                            onClick={() => handleCheckAnswer(0, writingAnswer)}
                            disabled={isCheckingAnswer}
                            className="w-full h-12 text-base font-bold text-white border-0"
                            style={{
                              background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
                            }}
                          >
                            Submit Answer
                          </Button>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Feedback Section */}
                {answerFeedback && (
                  <div className={`mt-8 p-6 rounded-xl border-2 ${
                    answerFeedback.isCorrect 
                      ? 'bg-green-50 dark:bg-green-950/30 border-green-500 dark:border-green-600' 
                      : 'bg-red-50 dark:bg-red-950/30 border-red-500 dark:border-red-600'
                  }`}>
                    <div className="flex items-start gap-4">
                      {answerFeedback.isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h4 className={`font-bold text-lg mb-2 ${
                          answerFeedback.isCorrect 
                            ? 'text-green-900 dark:text-green-300' 
                            : 'text-red-900 dark:text-red-300'
                        }`}>
                          {answerFeedback.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 mb-3">
                          {answerFeedback.explanation}
                        </p>
                        {!answerFeedback.isCorrect && answerFeedback.correctAnswer && (
                          <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Correct answer:</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{answerFeedback.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          {isAnswered && (
            <Button
              onClick={handleNext}
              className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all text-white border-0"
              style={{
                background: `linear-gradient(135deg, ${skill.colorStart}, ${skill.colorEnd})`,
              }}
            >
              {currentQuestion === questions.length - 1 ? "Finish Lesson" : "Next Question"}
              <Play className="w-5 h-5 ml-2" />
            </Button>
          )}

          {/* Checking Answer Loading State */}
          {isCheckingAnswer && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 flex flex-col items-center gap-4">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
                <p className="text-slate-900 dark:text-white font-medium">Checking your answer...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}