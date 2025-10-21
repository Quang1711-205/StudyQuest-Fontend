// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Confetti } from "@/components/confetti"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Volume2, CheckCircle2 } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState } from "react"

// const mockTestData = {
//   a: {
//     name: "Beginner Test",
//     duration: 900,
//     questions: [
//       {
//         id: 1,
//         type: "vocab",
//         question: "What is the meaning of 'apple'?",
//         options: ["Táo", "Chuối", "Cam", "Nho"],
//         correctAnswer: 0,
//       },
//       {
//         id: 2,
//         type: "grammar",
//         question: "Choose the correct sentence:",
//         options: ["I am student", "I is a student", "I am a student", "I are student"],
//         correctAnswer: 2,
//       },
//       {
//         id: 3,
//         type: "listening",
//         question: "Listen and select what you hear:",
//         audioUrl: "/audio/test.mp3",
//         options: ["Good morning", "Good evening", "Good night", "Good afternoon"],
//         correctAnswer: 0,
//       },
//     ],
//   },
//   b: {
//     name: "Intermediate Test",
//     duration: 1200,
//     questions: [
//       {
//         id: 1,
//         type: "vocab",
//         question: "What does 'accomplish' mean?",
//         options: ["Hoàn thành", "Bắt đầu", "Tiếp tục", "Dừng lại"],
//         correctAnswer: 0,
//       },
//       {
//         id: 2,
//         type: "grammar",
//         question: "Which sentence uses the present perfect correctly?",
//         options: ["I have went to Paris", "I have gone to Paris", "I has gone to Paris", "I have go to Paris"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   c: {
//     name: "Advanced Test",
//     duration: 1500,
//     questions: [
//       {
//         id: 1,
//         type: "vocab",
//         question: "What is a synonym for 'ubiquitous'?",
//         options: ["Rare", "Omnipresent", "Absent", "Limited"],
//         correctAnswer: 1,
//       },
//       {
//         id: 2,
//         type: "grammar",
//         question: "Identify the sentence with correct subjunctive mood:",
//         options: [
//           "If I was rich, I would travel",
//           "If I were rich, I would travel",
//           "If I am rich, I would travel",
//           "If I be rich, I would travel",
//         ],
//         correctAnswer: 1,
//       },
//     ],
//   },
// }

// export default function TestLevelPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const level = params.level as string

//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswered, setIsAnswered] = useState(false)
//   const [answers, setAnswers] = useState<number[]>([])
//   const [timeLeft, setTimeLeft] = useState(0)
//   const [isComplete, setIsComplete] = useState(false)
//   const [showConfetti, setShowConfetti] = useState(false)

//   const testData = mockTestData[level as keyof typeof mockTestData]

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   useEffect(() => {
//     if (testData) {
//       setTimeLeft(testData.duration)
//     }
//   }, [testData])

//   useEffect(() => {
//     if (timeLeft > 0 && !isComplete) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
//       return () => clearTimeout(timer)
//     } else if (timeLeft === 0 && !isComplete) {
//       handleComplete()
//     }
//   }, [timeLeft, isComplete])

//   if (isLoading || !user || !testData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   const question = testData.questions[currentQuestion]
//   const progress = ((currentQuestion + 1) / testData.questions.length) * 100

//   const handleAnswer = (answerIndex: number) => {
//     if (isAnswered) return
//     setSelectedAnswer(answerIndex)
//     setIsAnswered(true)
//   }

//   const handleNext = () => {
//     const newAnswers = [...answers, selectedAnswer ?? -1]
//     setAnswers(newAnswers)

//     if (currentQuestion < testData.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//       setIsAnswered(false)
//     } else {
//       handleComplete()
//     }
//   }

//   const handleComplete = () => {
//     setShowConfetti(true)
//     setIsComplete(true)
//   }

//   const playAudio = () => {
//     const utterance = new SpeechSynthesisUtterance(question.question)
//     window.speechSynthesis.speak(utterance)
//   }

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   if (isComplete) {
//     const correctAnswers = answers.filter((ans, idx) => ans === testData.questions[idx]?.correctAnswer).length
//     const score = Math.round((correctAnswers / testData.questions.length) * 100)

//     setTimeout(() => {
//       router.push(`/test/result/${Date.now()}`)
//     }, 3000)

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//         <Navigation />
//         <TopBar />
//         <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

//         <main className="ml-20 min-[1200px]:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
//           <div className="max-w-2xl mx-auto">
//             <Card className="text-center border-2 border-primary shadow-2xl">
//               <CardHeader>
//                 <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-bounce shadow-lg">
//                   <CheckCircle2 className="w-12 h-12 text-white" />
//                 </div>
//                 <CardTitle className="text-3xl md:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                   Test Complete!
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-transparent animate-pulse">
//                   {score}%
//                 </div>
//                 <p className="text-muted-foreground text-lg">Redirecting to detailed results...</p>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation />
//       <TopBar />
//       <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

//       <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-4 md:p-8 transition-all duration-300">
//         <div className="max-w-3xl mx-auto">
//           <Card className="border-2 shadow-xl">
//             <CardHeader>
//               <div className="flex items-center justify-between mb-2">
//                 <Badge className="bg-gradient-to-r from-primary to-secondary text-white capitalize">
//                   {question.type}
//                 </Badge>
//                 <div className="text-sm text-muted-foreground">
//                   Question {currentQuestion + 1}/{testData.questions.length}
//                 </div>
//               </div>
//               <CardTitle className="text-2xl md:text-3xl">{question.question}</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {question.type === "listening" && (
//                 <Button
//                   onClick={playAudio}
//                   variant="outline"
//                   className="w-full h-16 text-lg shadow-md hover:shadow-lg transition-shadow bg-transparent"
//                   size="lg"
//                 >
//                   <Volume2 className="w-6 h-6 mr-2" />
//                   Play Audio
//                 </Button>
//               )}

//               <div className="space-y-3">
//                 {question.options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswer(index)}
//                     disabled={isAnswered}
//                     className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all shadow-md hover:shadow-lg ${
//                       selectedAnswer === index
//                         ? "border-primary bg-primary/10 shadow-primary/20"
//                         : "border-border hover:border-primary hover:bg-primary/5"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="text-base">{option}</span>
//                       {selectedAnswer === index && <CheckCircle2 className="w-6 h-6 text-primary" />}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {isAnswered && (
//                 <Button
//                   onClick={handleNext}
//                   className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-shadow"
//                   size="lg"
//                 >
//                   {currentQuestion < testData.questions.length - 1 ? "Next Question" : "Complete Test"}
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }


// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Confetti } from "@/components/confetti"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Volume2, CheckCircle2, Clock, BookOpen, Edit3, FileText, AlertCircle } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState, useRef } from "react"

// const mockTestData = {
//   a: {
//     name: "Beginner Test",
//     duration: 900,
//     questions: [
//       // Vocabulary
//       {
//         id: 1,
//         type: "vocab",
//         question: "What is the meaning of 'apple'?",
//         options: ["Táo", "Chuối", "Cam", "Nho"],
//         correctAnswer: 0,
//       },
//       {
//         id: 2,
//         type: "vocab",
//         question: "Choose the correct translation for 'book':",
//         options: ["Bút", "Sách", "Bàn", "Ghế"],
//         correctAnswer: 1,
//       },
//       {
//         id: 3,
//         type: "vocab",
//         question: "What does 'water' mean?",
//         options: ["Lửa", "Đất", "Nước", "Không khí"],
//         correctAnswer: 2,
//       },
//       // Grammar
//       {
//         id: 4,
//         type: "grammar",
//         question: "Choose the correct sentence:",
//         options: ["I am student", "I is a student", "I am a student", "I are student"],
//         correctAnswer: 2,
//       },
//       {
//         id: 5,
//         type: "grammar",
//         question: "Fill in the blank: She ___ to school every day.",
//         options: ["go", "goes", "going", "gone"],
//         correctAnswer: 1,
//       },
//       {
//         id: 6,
//         type: "grammar",
//         question: "Which is correct?",
//         options: ["He don't like pizza", "He doesn't likes pizza", "He doesn't like pizza", "He not like pizza"],
//         correctAnswer: 2,
//       },
//       // Listening
//       {
//         id: 7,
//         type: "listening",
//         question: "Listen and select what you hear:",
//         audioText: "Good morning",
//         options: ["Good morning", "Good evening", "Good night", "Good afternoon"],
//         correctAnswer: 0,
//       },
//       {
//         id: 8,
//         type: "listening",
//         question: "What is the speaker saying?",
//         audioText: "How are you today?",
//         options: ["How are you today?", "Where are you going?", "What are you doing?", "When will you come?"],
//         correctAnswer: 0,
//       },
//       {
//         id: 9,
//         type: "listening",
//         question: "Listen carefully:",
//         audioText: "I like reading books",
//         options: ["I like reading books", "I like writing stories", "I like watching movies", "I like playing games"],
//         correctAnswer: 0,
//       },
//       // Reading
//       {
//         id: 10,
//         type: "reading",
//         question: "Read the passage and answer:\n\n'My name is John. I am 10 years old. I live in Hanoi with my family. I go to school every day.'\n\nWhere does John live?",
//         options: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hue"],
//         correctAnswer: 1,
//       },
//       {
//         id: 11,
//         type: "reading",
//         question: "Read: 'The cat is sleeping on the sofa. It is very comfortable.'\n\nWhere is the cat?",
//         options: ["On the bed", "On the sofa", "On the floor", "On the chair"],
//         correctAnswer: 1,
//       },
//       {
//         id: 12,
//         type: "reading",
//         question: "Read: 'I eat breakfast at 7 AM every morning. I usually have bread and milk.'\n\nWhat time does the person eat breakfast?",
//         options: ["6 AM", "7 AM", "8 AM", "9 AM"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   b: {
//     name: "Intermediate Test",
//     duration: 1200,
//     questions: [
//       {
//         id: 1,
//         type: "vocab",
//         question: "What does 'accomplish' mean?",
//         options: ["Hoàn thành", "Bắt đầu", "Tiếp tục", "Dừng lại"],
//         correctAnswer: 0,
//       },
//       {
//         id: 2,
//         type: "vocab",
//         question: "Choose the synonym for 'brave':",
//         options: ["Cowardly", "Fearful", "Courageous", "Timid"],
//         correctAnswer: 2,
//       },
//       {
//         id: 3,
//         type: "vocab",
//         question: "What is the opposite of 'ancient'?",
//         options: ["Old", "Modern", "Historic", "Traditional"],
//         correctAnswer: 1,
//       },
//       {
//         id: 4,
//         type: "grammar",
//         question: "Which sentence uses the present perfect correctly?",
//         options: ["I have went to Paris", "I have gone to Paris", "I has gone to Paris", "I have go to Paris"],
//         correctAnswer: 1,
//       },
//       {
//         id: 5,
//         type: "grammar",
//         question: "Choose the correct conditional: If I ___ rich, I would travel the world.",
//         options: ["am", "was", "were", "be"],
//         correctAnswer: 2,
//       },
//       {
//         id: 6,
//         type: "grammar",
//         question: "Which sentence is in passive voice?",
//         options: ["She writes a letter", "A letter is written by her", "She is writing a letter", "She wrote a letter"],
//         correctAnswer: 1,
//       },
//       {
//         id: 7,
//         type: "listening",
//         question: "Listen to the announcement:",
//         audioText: "The meeting has been postponed until next Monday",
//         options: ["The meeting is today", "The meeting is cancelled", "The meeting is next Monday", "The meeting is tomorrow"],
//         correctAnswer: 2,
//       },
//       {
//         id: 8,
//         type: "listening",
//         question: "What is the speaker requesting?",
//         audioText: "Could you please send me the report by Friday?",
//         options: ["To receive a report by Friday", "To write a report", "To read a report", "To cancel a report"],
//         correctAnswer: 0,
//       },
//       {
//         id: 9,
//         type: "listening",
//         question: "Listen carefully:",
//         audioText: "Despite the bad weather, the event will continue as planned",
//         options: ["The event is cancelled", "The event is postponed", "The event will continue", "The event is rescheduled"],
//         correctAnswer: 2,
//       },
//       {
//         id: 10,
//         type: "reading",
//         question: "Read the passage:\n\n'Climate change is one of the most pressing issues of our time. Scientists worldwide are working to find solutions to reduce carbon emissions and protect our planet for future generations.'\n\nWhat is the main topic?",
//         options: ["Space exploration", "Climate change", "Technology", "Education"],
//         correctAnswer: 1,
//       },
//       {
//         id: 11,
//         type: "reading",
//         question: "Read: 'The company announced a significant increase in profits this quarter, attributing the success to innovative marketing strategies and improved customer service.'\n\nWhat led to the company's success?",
//         options: ["Lower prices", "New products", "Marketing and service", "More employees"],
//         correctAnswer: 2,
//       },
//       {
//         id: 12,
//         type: "reading",
//         question: "Read: 'Although technology has made communication easier, many argue that face-to-face interactions are still essential for building meaningful relationships.'\n\nWhat is the author's point?",
//         options: ["Technology is bad", "Face-to-face interaction is important", "Communication is difficult", "Relationships are meaningless"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   c: {
//     name: "Advanced Test",
//     duration: 1500,
//     questions: [
//       {
//         id: 1,
//         type: "vocab",
//         question: "What is a synonym for 'ubiquitous'?",
//         options: ["Rare", "Omnipresent", "Absent", "Limited"],
//         correctAnswer: 1,
//       },
//       {
//         id: 2,
//         type: "vocab",
//         question: "Choose the word that best fits: The politician's speech was filled with ___ language designed to appeal to emotions.",
//         options: ["Pragmatic", "Rhetorical", "Literal", "Technical"],
//         correctAnswer: 1,
//       },
//       {
//         id: 3,
//         type: "vocab",
//         question: "What does 'ephemeral' mean?",
//         options: ["Eternal", "Short-lived", "Beautiful", "Mysterious"],
//         correctAnswer: 1,
//       },
//       {
//         id: 4,
//         type: "grammar",
//         question: "Identify the sentence with correct subjunctive mood:",
//         options: [
//           "If I was rich, I would travel",
//           "If I were rich, I would travel",
//           "If I am rich, I would travel",
//           "If I be rich, I would travel",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 5,
//         type: "grammar",
//         question: "Which sentence correctly uses a participle phrase?",
//         options: [
//           "Walking down the street, the trees were beautiful",
//           "Walking down the street, I admired the trees",
//           "The trees walking down the street were beautiful",
//           "Down the street walking, the trees were beautiful",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 6,
//         type: "grammar",
//         question: "Choose the sentence with proper parallel structure:",
//         options: [
//           "She likes reading, to write, and painting",
//           "She likes reading, writing, and to paint",
//           "She likes reading, writing, and painting",
//           "She likes to read, writing, and painting",
//         ],
//         correctAnswer: 2,
//       },
//       {
//         id: 7,
//         type: "listening",
//         question: "Listen to the academic lecture excerpt:",
//         audioText: "The phenomenon of quantum entanglement suggests that particles can be intrinsically connected regardless of the distance separating them",
//         options: [
//           "Particles are always separate",
//           "Particles can be connected across distances",
//           "Quantum physics is simple",
//           "Distance affects all particles equally",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 8,
//         type: "listening",
//         question: "What is the speaker's main argument?",
//         audioText: "While artificial intelligence offers unprecedented opportunities, we must remain vigilant about ethical implications and ensure human values guide its development",
//         options: [
//           "AI should be banned",
//           "AI needs ethical guidance",
//           "AI has no benefits",
//           "AI is perfectly safe",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 9,
//         type: "listening",
//         question: "Listen carefully:",
//         audioText: "The researcher's groundbreaking findings have challenged long-held assumptions about neural plasticity in adult brains",
//         options: [
//           "The research confirms old beliefs",
//           "The research challenges assumptions",
//           "The research is inconclusive",
//           "The research is about children",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 10,
//         type: "reading",
//         question: "Read the passage:\n\n'The Renaissance marked a pivotal transition in European history, characterized by a renewed interest in classical learning, humanism, and artistic innovation. This cultural movement fundamentally reshaped society's understanding of human potential and individual achievement.'\n\nWhat was the Renaissance primarily characterized by?",
//         options: [
//           "Military conquest",
//           "Religious reform only",
//           "Classical learning and humanism",
//           "Industrial development",
//         ],
//         correctAnswer: 2,
//       },
//       {
//         id: 11,
//         type: "reading",
//         question: "Read: 'Postmodernism challenges the notion of objective truth, suggesting instead that meaning is constructed through language and cultural context. This philosophical stance has profound implications for how we interpret literature, art, and historical narratives.'\n\nWhat does postmodernism question?",
//         options: ["The existence of art", "Objective truth", "Language itself", "Cultural diversity"],
//         correctAnswer: 1,
//       },
//       {
//         id: 12,
//         type: "reading",
//         question: "Read: 'Economists debate whether globalization has been a net positive for developing nations. While some argue it has lifted millions out of poverty, critics contend that it has also exacerbated inequality and undermined local cultures.'\n\nWhat is presented in this passage?",
//         options: [
//           "A definitive answer about globalization",
//           "Different perspectives on globalization",
//           "Only negative effects",
//           "Only positive effects",
//         ],
//         correctAnswer: 1,
//       },
//     ],
//   },
// }

// const skillIcons = {
//   vocab: BookOpen,
//   grammar: Edit3,
//   listening: Volume2,
//   reading: BookOpen,
// }

// const skillColors = {
//   vocab: "from-emerald-500 to-green-600",
//   grammar: "from-blue-500 to-indigo-600",
//   listening: "from-purple-500 to-pink-600",
//   reading: "from-orange-500 to-amber-600",
// }

// const skillLabels = {
//   vocab: "Vocabulary",
//   grammar: "Grammar",
//   listening: "Listening",
//   reading: "Reading",
// }

// export default function TestLevelPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const level = params.level as string

//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [answers, setAnswers] = useState<number[]>([])
//   const [timeLeft, setTimeLeft] = useState(0)
//   const [isComplete, setIsComplete] = useState(false)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [testStarted, setTestStarted] = useState(false)
  
//   const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

//   const testData = mockTestData[level as keyof typeof mockTestData]

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   // Reset all states when component mounts or level changes
//   useEffect(() => {
//     setCurrentQuestion(0)
//     setSelectedAnswer(null)
//     setAnswers([])
//     setIsComplete(false)
//     setShowConfetti(false)
//     setTestStarted(false)
    
//     if (testData) {
//       setTimeLeft(testData.duration)
//     }
    
//     // Cleanup any existing redirect timeout
//     if (redirectTimeoutRef.current) {
//       clearTimeout(redirectTimeoutRef.current)
//       redirectTimeoutRef.current = null
//     }
//   }, [level, testData])

//   useEffect(() => {
//     if (testStarted && timeLeft > 0 && !isComplete) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
//       return () => clearTimeout(timer)
//     } else if (testStarted && timeLeft === 0 && !isComplete) {
//       handleComplete()
//     }
//   }, [timeLeft, isComplete, testStarted])

//   // Cleanup redirect timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (redirectTimeoutRef.current) {
//         clearTimeout(redirectTimeoutRef.current)
//       }
//     }
//   }, [])

//   if (isLoading || !user || !testData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   const question = testData.questions[currentQuestion]
//   const progress = ((currentQuestion + 1) / testData.questions.length) * 100
//   const SkillIcon = skillIcons[question.type as keyof typeof skillIcons]

//   const handleAnswer = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex)
//   }

//   const handleNext = () => {
//     if (selectedAnswer === null) return
    
//     const newAnswers = [...answers, selectedAnswer]
//     setAnswers(newAnswers)

//     if (currentQuestion < testData.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//     } else {
//       handleComplete()
//     }
//   }

//   const handleComplete = () => {
//     setIsComplete(true)
//     setShowConfetti(true)
    
//     // Calculate final score
//     const finalAnswers = [...answers, selectedAnswer ?? -1]
//     const correctAnswers = finalAnswers.filter((ans, idx) => ans === testData.questions[idx]?.correctAnswer).length
//     const score = Math.round((correctAnswers / testData.questions.length) * 100)
    
//     // Prepare data for result page
//     const answersEncoded = encodeURIComponent(JSON.stringify(finalAnswers))
//     const questionsEncoded = encodeURIComponent(JSON.stringify(testData.questions))
    
//     // Redirect after 3 seconds
//     redirectTimeoutRef.current = setTimeout(() => {
//       router.push(`/test/result/${Date.now()}?score=${score}&level=${level}&answers=${answersEncoded}&questions=${questionsEncoded}`)
//     }, 3000)
//   }

//   const playAudio = () => {
//     if ((question as any).audioText) {
//       const utterance = new SpeechSynthesisUtterance((question as any).audioText)
//       utterance.rate = 0.9
//       window.speechSynthesis.speak(utterance)
//     }
//   }

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   // Add start test handler
//   const handleStartTest = () => {
//     setTestStarted(true)
//   }

//   // Show start screen before test begins
//   if (!testStarted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//         <Navigation />
//         <TopBar />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             <Card className="border-2 shadow-2xl overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
//               <CardHeader className="text-center space-y-4 pb-8">
//                 <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
//                   <FileText className="w-10 h-10 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
//                     {testData.name}
//                   </CardTitle>
//                   <p className="text-xl text-muted-foreground font-medium">
//                     Level {level.toUpperCase()}
//                   </p>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-8 pb-10">
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl border-2 border-primary/20">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Clock className="w-6 h-6 text-primary" />
//                       <span className="font-bold text-lg text-foreground">Duration</span>
//                     </div>
//                     <p className="text-3xl font-bold text-primary">{formatTime(testData.duration)}</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-accent/10 to-yellow-500/10 p-6 rounded-2xl border-2 border-accent/20">
//                     <div className="flex items-center gap-3 mb-2">
//                       <FileText className="w-6 h-6 text-accent" />
//                       <span className="font-bold text-lg text-foreground">Questions</span>
//                     </div>
//                     <p className="text-3xl font-bold text-accent">{testData.questions.length}</p>
//                   </div>
//                 </div>

//                 <div className="bg-muted/50 p-8 rounded-2xl space-y-4 border-2">
//                   <h3 className="font-bold text-xl text-foreground mb-4 flex items-center gap-2">
//                     <AlertCircle className="w-6 h-6 text-primary" />
//                     Test Instructions
//                   </h3>
//                   <ul className="space-y-3 text-base text-muted-foreground">
//                     <li className="flex items-start gap-3">
//                       <span className="text-primary font-bold text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">Answer all questions to the best of your ability</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <span className="text-primary font-bold text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">You can change your answer before clicking "Next"</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <span className="text-primary font-bold text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">The timer will start when you click "Begin Test"</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <span className="text-primary font-bold text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">You'll receive detailed feedback after completion</span>
//                     </li>
//                   </ul>
//                 </div>

//                 <Button
//                   onClick={handleStartTest}
//                   className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-2xl hover:shadow-primary/50 transition-all hover:scale-[1.02]"
//                   size="lg"
//                 >
//                   Begin Test
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // Show completion screen
//   if (isComplete) {
//     const finalAnswers = [...answers, selectedAnswer ?? -1]
//     const correctAnswers = finalAnswers.filter((ans, idx) => ans === testData.questions[idx]?.correctAnswer).length
//     const score = Math.round((correctAnswers / testData.questions.length) * 100)

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//         <Navigation />
//         <TopBar />
//         <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300 flex items-center justify-center min-h-[calc(100vh-4rem)]">
//           <div className="max-w-2xl mx-auto w-full">
//             <Card className="text-center border-2 border-primary shadow-2xl overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
//               <CardHeader className="pt-12 pb-8">
//                 <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-bounce shadow-2xl">
//                   <CheckCircle2 className="w-16 h-16 text-white" />
//                 </div>
//                 <CardTitle className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
//                   Test Complete!
//                 </CardTitle>
//                 <p className="text-xl text-muted-foreground">Calculating your results...</p>
//               </CardHeader>
//               <CardContent className="space-y-8 pb-12">
//                 <div className="bg-gradient-to-br from-success/10 to-emerald-600/10 p-10 rounded-3xl border-2 border-success/30">
//                   <p className="text-sm font-medium text-muted-foreground mb-3">Your Score</p>
//                   <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-transparent animate-pulse">
//                     {score}%
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//                   <span className="ml-2 font-medium">Redirecting to detailed results</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // Show test questions
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation />
//       <TopBar />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {/* Header with Timer */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-foreground">{testData.name}</h1>
//               <p className="text-lg text-muted-foreground mt-1">Level {level.toUpperCase()}</p>
//             </div>
//             <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 shadow-lg ${
//               timeLeft < 60 ? 'bg-destructive/10 border-destructive/30' : 'bg-card border-border'
//             }`}>
//               <Clock className={`w-6 h-6 ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-primary'}`} />
//               <span className={`text-3xl font-bold font-mono ${
//                 timeLeft < 60 ? 'text-destructive' : 'text-foreground'
//               }`}>
//                 {formatTime(timeLeft)}
//               </span>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <Card className="border-2 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-base font-bold text-foreground">
//                   Question {currentQuestion + 1} of {testData.questions.length}
//                 </span>
//                 <span className="text-lg font-bold text-primary">{Math.round(progress)}% Complete</span>
//               </div>
//               <Progress value={progress} className="h-4 shadow-inner" />
//             </CardContent>
//           </Card>

//           {/* Question Card */}
//           <Card className="border-2 shadow-2xl overflow-hidden">
//             <div className={`h-2 bg-gradient-to-r ${skillColors[question.type as keyof typeof skillColors]}`} />
//             <CardHeader className="pb-6 space-y-6">
//               <div className="flex items-center gap-4">
//                 <div
//                   className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
//                     skillColors[question.type as keyof typeof skillColors]
//                   } flex items-center justify-center shadow-lg`}
//                 >
//                   <SkillIcon className="w-8 h-8 text-white" />
//                 </div>
//                 <Badge className="text-base font-bold capitalize px-4 py-2 shadow-md">
//                   {skillLabels[question.type as keyof typeof skillLabels]}
//                 </Badge>
//               </div>
//               <CardTitle className="text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap font-semibold text-foreground">
//                 {question.question}
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-6 pb-8">
//               {/* Audio Player for Listening Questions */}
//               {question.type === "listening" && (
//                 <Button
//                   onClick={playAudio}
//                   variant="outline"
//                   className="w-full h-20 text-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 hover:border-primary hover:bg-primary/5"
//                   size="lg"
//                 >
//                   <Volume2 className="w-8 h-8 mr-4" />
//                   Play Audio
//                 </Button>
//               )}

//               {/* Answer Options */}
//               <div className="space-y-4 pt-2">
//                 {question.options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswer(index)}
//                     className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
//                       selectedAnswer === index
//                         ? "border-primary bg-gradient-to-r from-primary/15 to-secondary/15 shadow-xl shadow-primary/30 scale-[1.02]"
//                         : "border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between gap-4">
//                       <div className="flex items-center gap-4 flex-1">
//                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border-2 transition-all ${
//                           selectedAnswer === index
//                             ? "bg-primary text-white border-primary"
//                             : "bg-muted text-muted-foreground border-border"
//                         }`}>
//                           {String.fromCharCode(65 + index)}
//                         </div>
//                         <span className="text-lg font-medium leading-relaxed">{option}</span>
//                       </div>
//                       {selectedAnswer === index && (
//                         <CheckCircle2 className="w-8 h-8 text-primary shrink-0 animate-in zoom-in duration-300" />
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {/* Next Button */}
//               <div className="pt-6">
//                 {selectedAnswer !== null ? (
//                   <Button
//                     onClick={handleNext}
//                     className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
//                     size="lg"
//                   >
//                     {currentQuestion < testData.questions.length - 1 ? (
//                       <>Next Question →</>
//                     ) : (
//                       <>Complete Test ✓</>
//                     )}
//                   </Button>
//                 ) : (
//                   <div className="w-full h-16 flex items-center justify-center text-base text-muted-foreground bg-muted/50 rounded-2xl border-2 border-dashed">
//                     Please select an answer to continue
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Question Navigator */}
//           <Card className="border-2 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-sm font-bold text-muted-foreground">Question Progress</span>
//                 <span className="text-sm font-medium text-muted-foreground">
//                   {answers.length} of {testData.questions.length} answered
//                 </span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {testData.questions.map((_, idx) => (
//                   <div
//                     key={idx}
//                     className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
//                       idx === currentQuestion
//                         ? "bg-primary text-white shadow-lg scale-110"
//                         : idx < answers.length
//                         ? "bg-success/20 text-success border-2 border-success/30"
//                         : "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {idx + 1}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }




// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { useNavigation } from "@/lib/navigation-context"
// import { TopBar } from "@/components/top-bar"
// import { Confetti } from "@/components/confetti"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Volume2, CheckCircle2, Clock, BookOpen, Edit3, FileText, AlertCircle } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState, useRef } from "react"
// import { getActiveLanguage, getAllUserLanguages, UserLanguage, AVAILABLE_LANGUAGES } from "@/lib/language-utils"

// const mockTestData = {
//   a: {
//     name: "Beginner Test",
//     duration: 900,
//     questions: [
//       // Vocabulary
//       {
//         id: 1,
//         type: "vocab",
//         question: "What is the meaning of 'apple'?",
//         options: ["Táo", "Chuối", "Cam", "Nho"],
//         correctAnswer: 0,
//       },
//       {
//         id: 2,
//         type: "vocab",
//         question: "Choose the correct translation for 'book':",
//         options: ["Bút", "Sách", "Bàn", "Ghế"],
//         correctAnswer: 1,
//       },
//       {
//         id: 3,
//         type: "vocab",
//         question: "What does 'water' mean?",
//         options: ["Lửa", "Đất", "Nước", "Không khí"],
//         correctAnswer: 2,
//       },
//       // Grammar
//       {
//         id: 4,
//         type: "grammar",
//         question: "Choose the correct sentence:",
//         options: ["I am student", "I is a student", "I am a student", "I are student"],
//         correctAnswer: 2,
//       },
//       {
//         id: 5,
//         type: "grammar",
//         question: "Fill in the blank: She ___ to school every day.",
//         options: ["go", "goes", "going", "gone"],
//         correctAnswer: 1,
//       },
//       {
//         id: 6,
//         type: "grammar",
//         question: "Which is correct?",
//         options: ["He don't like pizza", "He doesn't likes pizza", "He doesn't like pizza", "He not like pizza"],
//         correctAnswer: 2,
//       },
//       // Listening
//       {
//         id: 7,
//         type: "listening",
//         question: "Listen and select what you hear:",
//         audioText: "Good morning",
//         options: ["Good morning", "Good evening", "Good night", "Good afternoon"],
//         correctAnswer: 0,
//       },
//       {
//         id: 8,
//         type: "listening",
//         question: "What is the speaker saying?",
//         audioText: "How are you today?",
//         options: ["How are you today?", "Where are you going?", "What are you doing?", "When will you come?"],
//         correctAnswer: 0,
//       },
//       {
//         id: 9,
//         type: "listening",
//         question: "Listen carefully:",
//         audioText: "I like reading books",
//         options: ["I like reading books", "I like writing stories", "I like watching movies", "I like playing games"],
//         correctAnswer: 0,
//       },
//       // Reading
//       {
//         id: 10,
//         type: "reading",
//         question: "Read the passage and answer:\n\n'My name is John. I am 10 years old. I live in Hanoi with my family. I go to school every day.'\n\nWhere does John live?",
//         options: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hue"],
//         correctAnswer: 1,
//       },
//       {
//         id: 11,
//         type: "reading",
//         question: "Read: 'The cat is sleeping on the sofa. It is very comfortable.'\n\nWhere is the cat?",
//         options: ["On the bed", "On the sofa", "On the floor", "On the chair"],
//         correctAnswer: 1,
//       },
//       {
//         id: 12,
//         type: "reading",
//         question: "Read: 'I eat breakfast at 7 AM every morning. I usually have bread and milk.'\n\nWhat time does the person eat breakfast?",
//         options: ["6 AM", "7 AM", "8 AM", "9 AM"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   b: {
//     name: "Intermediate Test",
//     duration: 1200,
//     questions: [
//       {
//         id: 1,
//         type: "vocab",
//         question: "What does 'accomplish' mean?",
//         options: ["Hoàn thành", "Bắt đầu", "Tiếp tục", "Dừng lại"],
//         correctAnswer: 0,
//       },
//       {
//         id: 2,
//         type: "vocab",
//         question: "Choose the synonym for 'brave':",
//         options: ["Cowardly", "Fearful", "Courageous", "Timid"],
//         correctAnswer: 2,
//       },
//       {
//         id: 3,
//         type: "vocab",
//         question: "What is the opposite of 'ancient'?",
//         options: ["Old", "Modern", "Historic", "Traditional"],
//         correctAnswer: 1,
//       },
//       {
//         id: 4,
//         type: "grammar",
//         question: "Which sentence uses the present perfect correctly?",
//         options: ["I have went to Paris", "I have gone to Paris", "I has gone to Paris", "I have go to Paris"],
//         correctAnswer: 1,
//       },
//       {
//         id: 5,
//         type: "grammar",
//         question: "Choose the correct conditional: If I ___ rich, I would travel the world.",
//         options: ["am", "was", "were", "be"],
//         correctAnswer: 2,
//       },
//       {
//         id: 6,
//         type: "grammar",
//         question: "Which sentence is in passive voice?",
//         options: ["She writes a letter", "A letter is written by her", "She is writing a letter", "She wrote a letter"],
//         correctAnswer: 1,
//       },
//       {
//         id: 7,
//         type: "listening",
//         question: "Listen to the announcement:",
//         audioText: "The meeting has been postponed until next Monday",
//         options: ["The meeting is today", "The meeting is cancelled", "The meeting is next Monday", "The meeting is tomorrow"],
//         correctAnswer: 2,
//       },
//       {
//         id: 8,
//         type: "listening",
//         question: "What is the speaker requesting?",
//         audioText: "Could you please send me the report by Friday?",
//         options: ["To receive a report by Friday", "To write a report", "To read a report", "To cancel a report"],
//         correctAnswer: 0,
//       },
//       {
//         id: 9,
//         type: "listening",
//         question: "Listen carefully:",
//         audioText: "Despite the bad weather, the event will continue as planned",
//         options: ["The event is cancelled", "The event is postponed", "The event will continue", "The event is rescheduled"],
//         correctAnswer: 2,
//       },
//       {
//         id: 10,
//         type: "reading",
//         question: "Read the passage:\n\n'Climate change is one of the most pressing issues of our time. Scientists worldwide are working to find solutions to reduce carbon emissions and protect our planet for future generations.'\n\nWhat is the main topic?",
//         options: ["Space exploration", "Climate change", "Technology", "Education"],
//         correctAnswer: 1,
//       },
//       {
//         id: 11,
//         type: "reading",
//         question: "Read: 'The company announced a significant increase in profits this quarter, attributing the success to innovative marketing strategies and improved customer service.'\n\nWhat led to the company's success?",
//         options: ["Lower prices", "New products", "Marketing and service", "More employees"],
//         correctAnswer: 2,
//       },
//       {
//         id: 12,
//         type: "reading",
//         question: "Read: 'Although technology has made communication easier, many argue that face-to-face interactions are still essential for building meaningful relationships.'\n\nWhat is the author's point?",
//         options: ["Technology is bad", "Face-to-face interaction is important", "Communication is difficult", "Relationships are meaningless"],
//         correctAnswer: 1,
//       },
//     ],
//   },
//   c: {
//     name: "Advanced Test",
//     duration: 1500,
//     questions: [
//       {
//         id: 1,
//         type: "vocab",
//         question: "What is a synonym for 'ubiquitous'?",
//         options: ["Rare", "Omnipresent", "Absent", "Limited"],
//         correctAnswer: 1,
//       },
//       {
//         id: 2,
//         type: "vocab",
//         question: "Choose the word that best fits: The politician's speech was filled with ___ language designed to appeal to emotions.",
//         options: ["Pragmatic", "Rhetorical", "Literal", "Technical"],
//         correctAnswer: 1,
//       },
//       {
//         id: 3,
//         type: "vocab",
//         question: "What does 'ephemeral' mean?",
//         options: ["Eternal", "Short-lived", "Beautiful", "Mysterious"],
//         correctAnswer: 1,
//       },
//       {
//         id: 4,
//         type: "grammar",
//         question: "Identify the sentence with correct subjunctive mood:",
//         options: [
//           "If I was rich, I would travel",
//           "If I were rich, I would travel",
//           "If I am rich, I would travel",
//           "If I be rich, I would travel",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 5,
//         type: "grammar",
//         question: "Which sentence correctly uses a participle phrase?",
//         options: [
//           "Walking down the street, the trees were beautiful",
//           "Walking down the street, I admired the trees",
//           "The trees walking down the street were beautiful",
//           "Down the street walking, the trees were beautiful",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 6,
//         type: "grammar",
//         question: "Choose the sentence with proper parallel structure:",
//         options: [
//           "She likes reading, to write, and painting",
//           "She likes reading, writing, and to paint",
//           "She likes reading, writing, and painting",
//           "She likes to read, writing, and painting",
//         ],
//         correctAnswer: 2,
//       },
//       {
//         id: 7,
//         type: "listening",
//         question: "Listen to the academic lecture excerpt:",
//         audioText: "The phenomenon of quantum entanglement suggests that particles can be intrinsically connected regardless of the distance separating them",
//         options: [
//           "Particles are always separate",
//           "Particles can be connected across distances",
//           "Quantum physics is simple",
//           "Distance affects all particles equally",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 8,
//         type: "listening",
//         question: "What is the speaker's main argument?",
//         audioText: "While artificial intelligence offers unprecedented opportunities, we must remain vigilant about ethical implications and ensure human values guide its development",
//         options: [
//           "AI should be banned",
//           "AI needs ethical guidance",
//           "AI has no benefits",
//           "AI is perfectly safe",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 9,
//         type: "listening",
//         question: "Listen carefully:",
//         audioText: "The researcher's groundbreaking findings have challenged long-held assumptions about neural plasticity in adult brains",
//         options: [
//           "The research confirms old beliefs",
//           "The research challenges assumptions",
//           "The research is inconclusive",
//           "The research is about children",
//         ],
//         correctAnswer: 1,
//       },
//       {
//         id: 10,
//         type: "reading",
//         question: "Read the passage:\n\n'The Renaissance marked a pivotal transition in European history, characterized by a renewed interest in classical learning, humanism, and artistic innovation. This cultural movement fundamentally reshaped society's understanding of human potential and individual achievement.'\n\nWhat was the Renaissance primarily characterized by?",
//         options: [
//           "Military conquest",
//           "Religious reform only",
//           "Classical learning and humanism",
//           "Industrial development",
//         ],
//         correctAnswer: 2,
//       },
//       {
//         id: 11,
//         type: "reading",
//         question: "Read: 'Postmodernism challenges the notion of objective truth, suggesting instead that meaning is constructed through language and cultural context. This philosophical stance has profound implications for how we interpret literature, art, and historical narratives.'\n\nWhat does postmodernism question?",
//         options: ["The existence of art", "Objective truth", "Language itself", "Cultural diversity"],
//         correctAnswer: 1,
//       },
//       {
//         id: 12,
//         type: "reading",
//         question: "Read: 'Economists debate whether globalization has been a net positive for developing nations. While some argue it has lifted millions out of poverty, critics contend that it has also exacerbated inequality and undermined local cultures.'\n\nWhat is presented in this passage?",
//         options: [
//           "A definitive answer about globalization",
//           "Different perspectives on globalization",
//           "Only negative effects",
//           "Only positive effects",
//         ],
//         correctAnswer: 1,
//       },
//     ],
//   },
// }

// const skillIcons = {
//   vocab: BookOpen,
//   grammar: Edit3,
//   listening: Volume2,
//   reading: BookOpen,
// }

// const skillColors = {
//   vocab: "from-emerald-500 to-green-600",
//   grammar: "from-blue-500 to-indigo-600",
//   listening: "from-purple-500 to-pink-600",
//   reading: "from-orange-500 to-amber-600",
// }

// const skillLabels = {
//   vocab: "Vocabulary",
//   grammar: "Grammar",
//   listening: "Listening",
//   reading: "Reading",
// }

// export default function TestLevelPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()
//   const params = useParams()
//   const level = params.level as string
//   const [activeLanguage, setActiveLanguage] = useState<UserLanguage | null>(null)
//   const [allLanguages, setAllLanguages] = useState<UserLanguage[]>([])
//   const [isLoadingLanguage, setIsLoadingLanguage] = useState(true)

//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [answers, setAnswers] = useState<number[]>([])
//   const [timeLeft, setTimeLeft] = useState(0)
//   const [isComplete, setIsComplete] = useState(false)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [testStarted, setTestStarted] = useState(false)

//   const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

//   const testData = mockTestData[level as keyof typeof mockTestData]

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//       return
//     }

//     // Load user's languages
//     if (user) {
//       console.log("Loading languages for user:", user.id)
//       const active = getActiveLanguage(user.id)
//       const all = getAllUserLanguages(user.id)
      
//       console.log("Active language:", active)
//       console.log("All languages:", all)
      
//       setActiveLanguage(active)
//       setAllLanguages(all)
//       setIsLoadingLanguage(false)

//       // If no active language, redirect to language selection
//       if (!active) {
//         console.log("No active language found, redirecting to /selectLanguage")
//         router.push("/selectLanguage")
//       }
//     }
//   }, [user, isLoading, router])

//   // Reset all states when component mounts or level changes
//   useEffect(() => {
//     setCurrentQuestion(0)
//     setSelectedAnswer(null)
//     setAnswers([])
//     setIsComplete(false)
//     setShowConfetti(false)
//     setTestStarted(false)

//     if (testData) {
//       setTimeLeft(testData.duration)
//     }

//     // Cleanup any existing redirect timeout
//     if (redirectTimeoutRef.current) {
//       clearTimeout(redirectTimeoutRef.current)
//       redirectTimeoutRef.current = null
//     }
//   }, [level, testData])

//   useEffect(() => {
//     if (testStarted && timeLeft > 0 && !isComplete) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
//       return () => clearTimeout(timer)
//     } else if (testStarted && timeLeft === 0 && !isComplete) {
//       handleComplete()
//     }
//   }, [timeLeft, isComplete, testStarted])

//   // Cleanup redirect timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (redirectTimeoutRef.current) {
//         clearTimeout(redirectTimeoutRef.current)
//       }
//     }
//   }, [])

//   if (isLoading || !user || !testData || isLoadingLanguage) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//     // Wait for language to load
//     if (!activeLanguage) {
//       return (
//         <div className="min-h-screen flex items-center justify-center bg-background">
//           <div className="text-center">
//             <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your language...</p>
//           </div>
//         </div>
//       )
//     }
  
//     const activeLangInfo = AVAILABLE_LANGUAGES.find(l => l.code === activeLanguage.code)
  

//   const question = testData.questions[currentQuestion]
//   const progress = ((currentQuestion + 1) / testData.questions.length) * 100
//   const SkillIcon = skillIcons[question.type as keyof typeof skillIcons]

//   const handleAnswer = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex)
//   }

//   const handleNext = () => {
//     if (selectedAnswer === null) return

//     const newAnswers = [...answers, selectedAnswer]
//     setAnswers(newAnswers)

//     if (currentQuestion < testData.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//     } else {
//       handleComplete()
//     }
//   }

//   const handleComplete = () => {
//     setIsComplete(true)
//     setShowConfetti(true)

//     // Calculate final score
//     const finalAnswers = [...answers, selectedAnswer ?? -1]
//     const correctAnswers = finalAnswers.filter((ans, idx) => ans === testData.questions[idx]?.correctAnswer).length
//     const score = Math.round((correctAnswers / testData.questions.length) * 100)

//     // Prepare data for result page
//     const answersEncoded = encodeURIComponent(JSON.stringify(finalAnswers))
//     const questionsEncoded = encodeURIComponent(JSON.stringify(testData.questions))

//     // Redirect after 3 seconds
//     redirectTimeoutRef.current = setTimeout(() => {
//       router.push(`/test/result/${Date.now()}?score=${score}&level=${level}&answers=${answersEncoded}&questions=${questionsEncoded}`)
//     }, 3000)
//   }

//   const playAudio = () => {
//     if ((question as any).audioText) {
//       const utterance = new SpeechSynthesisUtterance((question as any).audioText)
//       utterance.rate = 0.9
//       window.speechSynthesis.speak(utterance)
//     }
//   }

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   // Add start test handler
//   const handleStartTest = () => {
//     setTestStarted(true)
//   }

//   // Show start screen before test begins
//   if (!testStarted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar 
//         onMenuClick={toggleNav}
//         activeLanguage={activeLanguage}
//         allLanguages={allLanguages}
//       />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             <Card className="border-2 shadow-2xl overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600" />
//               <CardHeader className="text-center space-y-3 sm:space-y-4 pb-6 sm:pb-8 px-4 sm:px-6">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
//                   <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
//                     {testData.name}
//                   </CardTitle>
//                   <p className="text-base sm:text-lg text-muted-foreground font-medium">
//                     Level {level.toUpperCase()}
//                   </p>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6 sm:space-y-8 pb-8 sm:pb-10 px-4 sm:px-6">
//                 <div className="grid grid-cols-2 gap-3 sm:gap-6">
//                   <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 sm:p-6 rounded-2xl border-2 border-blue-500/20">
//                     <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
//                       <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
//                       <span className="font-bold text-sm sm:text-base text-foreground">Duration</span>
//                     </div>
//                     <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">{formatTime(testData.duration)}</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 sm:p-6 rounded-2xl border-2 border-cyan-500/20">
//                     <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
//                       <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
//                       <span className="font-bold text-sm sm:text-base text-foreground">Questions</span>
//                     </div>
//                     <p className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-600">{testData.questions.length}</p>
//                   </div>
//                 </div>

//                 <div className="bg-muted/50 p-4 sm:p-6 md:p-8 rounded-2xl space-y-3 sm:space-y-4 border-2">
//                   <h3 className="font-bold text-base sm:text-lg md:text-xl text-foreground mb-3 sm:mb-4 flex items-center gap-2">
//                     <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
//                     Test Instructions
//                   </h3>
//                   <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
//                     <li className="flex items-start gap-2 sm:gap-3">
//                       <span className="text-blue-600 font-bold text-base sm:text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">Answer all questions to the best of your ability</span>
//                     </li>
//                     <li className="flex items-start gap-2 sm:gap-3">
//                       <span className="text-blue-600 font-bold text-base sm:text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">You can change your answer before clicking "Next"</span>
//                     </li>
//                     <li className="flex items-start gap-2 sm:gap-3">
//                       <span className="text-blue-600 font-bold text-base sm:text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">The timer will start when you click "Begin Test"</span>
//                     </li>
//                     <li className="flex items-start gap-2 sm:gap-3">
//                       <span className="text-blue-600 font-bold text-base sm:text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">You'll receive detailed feedback after completion</span>
//                     </li>
//                   </ul>
//                 </div>

//                 <Button
//                   onClick={handleStartTest}
//                   className="w-full h-14 sm:h-16 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:opacity-90 shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-[1.02]"
//                   size="lg"
//                 >
//                   Begin Test
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // Show completion screen
//   if (isComplete) {
//     const finalAnswers = [...answers, selectedAnswer ?? -1]
//     const correctAnswers = finalAnswers.filter((ans, idx) => ans === testData.questions[idx]?.correctAnswer).length
//     const score = Math.round((correctAnswers / testData.questions.length) * 100)

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar 
//         onMenuClick={toggleNav}
//         activeLanguage={activeLanguage}
//         allLanguages={allLanguages}
//       />
//         <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-8 transition-all duration-300 flex items-center justify-center min-h-[calc(100vh-4rem)]">
//           <div className="max-w-2xl mx-auto w-full">
//             <Card className="text-center border-2 border-primary shadow-2xl overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
//               <CardHeader className="pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6">
//                 <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-bounce shadow-2xl">
//                   <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
//                 </div>
//                 <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 sm:mb-4">
//                   Test Complete!
//                 </CardTitle>
//                 <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Calculating your results...</p>
//               </CardHeader>
//               <CardContent className="space-y-6 sm:space-y-8 pb-8 sm:pb-12 px-4 sm:px-6">
//                 <div className="bg-gradient-to-br from-success/10 to-emerald-600/10 p-6 sm:p-8 md:p-10 rounded-3xl border-2 border-success/30">
//                   <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">Your Score</p>
//                   <div className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-transparent animate-pulse">
//                     {score}%
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg text-muted-foreground">
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//                   <span className="ml-2 font-medium">Redirecting to detailed results</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // Show test questions
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar 
//         onMenuClick={toggleNav}
//         activeLanguage={activeLanguage}
//         allLanguages={allLanguages}
//       />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
//           {/* Header with Timer */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{testData.name}</h1>
//               <p className="text-base sm:text-lg text-muted-foreground mt-1">Level {level.toUpperCase()}</p>
//             </div>
//             <div className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 shadow-lg ${
//               timeLeft < 60 ? 'bg-destructive/10 border-destructive/30' : 'bg-card border-border'
//             }`}>
//               <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-primary'}`} />
//               <span className={`text-xl sm:text-2xl md:text-3xl font-bold font-mono ${
//                 timeLeft < 60 ? 'text-destructive' : 'text-foreground'
//               }`}>
//                 {formatTime(timeLeft)}
//               </span>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <Card className="border-2 shadow-lg">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <span className="text-sm sm:text-base font-bold text-foreground">
//                   Question {currentQuestion + 1} of {testData.questions.length}
//                 </span>
//                 <span className="text-base sm:text-lg font-bold text-primary">{Math.round(progress)}%</span>
//               </div>
//               <Progress value={progress} className="h-3 sm:h-4 shadow-inner" />
//             </CardContent>
//           </Card>

//           {/* Question Card */}
//           <Card className="border-2 shadow-2xl overflow-hidden">
//             <div className={`h-2 bg-gradient-to-r ${skillColors[question.type as keyof typeof skillColors]}`} />
//             <CardHeader className="pb-4 sm:pb-6 space-y-4 sm:space-y-6 px-4 sm:px-6">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div
//                   className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${
//                     skillColors[question.type as keyof typeof skillColors]
//                   } flex items-center justify-center shadow-lg`}
//                 >
//                   <SkillIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//                 </div>
//                 <Badge className="text-sm sm:text-base font-bold capitalize px-3 sm:px-4 py-1 sm:py-2 shadow-md">
//                   {skillLabels[question.type as keyof typeof skillLabels]}
//                 </Badge>
//               </div>
//               <CardTitle className="text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-wrap font-semibold text-foreground">
//                 {question.question}
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-4 sm:px-6">
//               {/* Audio Player for Listening Questions */}
//               {question.type === "listening" && (
//                 <Button
//                   onClick={playAudio}
//                   variant="outline"
//                   className="w-full h-16 sm:h-20 text-base sm:text-lg md:text-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 hover:border-primary hover:bg-primary/5"
//                   size="lg"
//                 >
//                   <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4" />
//                   Play Audio
//                 </Button>
//               )}

//               {/* Answer Options */}
//               <div className="space-y-3 sm:space-y-4 pt-2">
//                 {question.options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswer(index)}
//                     className={`w-full p-4 sm:p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
//                       selectedAnswer === index
//                         ? "border-primary bg-gradient-to-r from-primary/15 to-secondary/15 shadow-xl shadow-primary/30 scale-[1.02]"
//                         : "border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between gap-3 sm:gap-4">
//                       <div className="flex items-center gap-3 sm:gap-4 flex-1">
//                         <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg border-2 transition-all ${
//                           selectedAnswer === index
//                             ? "bg-primary text-white border-primary"
//                             : "bg-muted text-muted-foreground border-border"
//                         }`}>
//                           {String.fromCharCode(65 + index)}
//                         </div>
//                         <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">{option}</span>
//                       </div>
//                       {selectedAnswer === index && (
//                         <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0 animate-in zoom-in duration-300" />
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {/* Next Button */}
//               <div className="pt-4 sm:pt-6">
//                 {selectedAnswer !== null ? (
//                   <Button
//                     onClick={handleNext}
//                     className="w-full h-14 sm:h-16 text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
//                     size="lg"
//                   >
//                     {currentQuestion < testData.questions.length - 1 ? (
//                       <>Next Question →</>
//                     ) : (
//                       <>Complete Test ✓</>
//                     )}
//                   </Button>
//                 ) : (
//                   <div className="w-full h-14 sm:h-16 flex items-center justify-center text-sm sm:text-base text-muted-foreground bg-muted/50 rounded-2xl border-2 border-dashed">
//                     Please select an answer to continue
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Question Navigator */}
//           <Card className="border-2 shadow-lg">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <span className="text-xs sm:text-sm font-bold text-muted-foreground">Question Progress</span>
//                 <span className="text-xs sm:text-sm font-medium text-muted-foreground">
//                   {answers.length} of {testData.questions.length} answered
//                 </span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {testData.questions.map((_, idx) => (
//                   <div
//                     key={idx}
//                     className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
//                       idx === currentQuestion
//                         ? "bg-primary text-white shadow-lg scale-110"
//                         : idx < answers.length
//                         ? "bg-success/20 text-success border-2 border-success/30"
//                         : "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {idx + 1}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }


// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { useNavigation } from "@/lib/navigation-context"
// import TopBar from "@/components/top-bar"
// import { Confetti } from "@/components/confetti"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Volume2, CheckCircle2, Clock, BookOpen, Edit3, FileText, AlertCircle, Loader2 } from "lucide-react"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState, useRef, useCallback } from "react"
// import { placementAPI, userAPI } from "@/lib/api-service"

// const skillIcons = {
//   vocabulary: BookOpen,
//   grammar: Edit3,
//   listening: Volume2,
//   reading: BookOpen,
// }

// const skillColors = {
//   vocabulary: "from-emerald-500 to-green-600",
//   grammar: "from-blue-500 to-indigo-600",
//   listening: "from-purple-500 to-pink-600",
//   reading: "from-orange-500 to-amber-600",
// }

// const skillLabels = {
//   vocabulary: "Vocabulary",
//   grammar: "Grammar",
//   listening: "Listening",
//   reading: "Reading",
// }

// interface Question {
//   id: number
//   type: "vocabulary" | "grammar" | "listening" | "reading"
//   question: string
//   textToSpeak?: string | null
//   passage?: string | null
//   options: string[]
// }

// export default function TestLevelPage() {
//   const { user, isLoading: authLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()
//   const params = useParams()
//   const level = (params.level as string).toUpperCase() as 'A' | 'B' | 'C'

//   const [testData, setTestData] = useState<any>(null)
//   const [testId, setTestId] = useState<number | null>(null)
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
//   const [answers, setAnswers] = useState<Array<{ questionId: number; answer: string }>>([])
//   const [timeLeft, setTimeLeft] = useState(0)
//   const [isComplete, setIsComplete] = useState(false)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [testStarted, setTestStarted] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeLanguage, setActiveLanguage] = useState<any>(null)
//   const [error, setError] = useState<string | null>(null)

//   const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
//   const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null)

//   // Auto-save progress every 30 seconds
//   const autoSaveProgress = useCallback(async () => {
//     if (!testId || !testStarted || isComplete) return

//     try {
//       await placementAPI.saveProgress({
//         testId,
//         answers,
//         currentQuestion,
//         timeRemaining: timeLeft,
//       })
//       console.log("Progress auto-saved")
//     } catch (error) {
//       console.error("Auto-save failed:", error)
//     }
//   }, [testId, answers, currentQuestion, timeLeft, testStarted, isComplete])

//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push("/login")
//       return
//     }

//     if (user) {
//       initializeTest()
//     }
//   }, [user, authLoading, router, level])

//   const initializeTest = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)

//       // Get active language
//       const profile = await userAPI.getProfile()
//       setActiveLanguage(profile.activeLanguage)

//       if (!profile.activeLanguage?.code) {
//         setError("Please select a language first")
//         setTimeout(() => router.push("/selectLanguage"), 2000)
//         return
//       }

//       console.log("Checking for in-progress test...")
      
//       // Check for in-progress test
//       const inProgress = await placementAPI.getInProgressTest(
//         profile.activeLanguage.code,
//         level
//       )

//       console.log("In-progress test result:", inProgress)

//       // If there's an in-progress test, resume it
//       if (inProgress && inProgress.testId) {
//         console.log("Resuming test:", inProgress.testId)
        
//         try {
//           const testData = await placementAPI.getTestQuestions(inProgress.testId)
          
//           if (!testData || !testData.questions) {
//             console.error("Invalid test data received")
//             setError("Failed to load test data")
//             return
//           }

//           setTestId(inProgress.testId)
//           setTestData({ 
//             questions: testData.questions, 
//             timeLimit: testData.timeRemaining 
//           })
//           setCurrentQuestion(testData.currentQuestion || 0)
//           setAnswers(testData.savedAnswers || [])
//           setTimeLeft(testData.timeRemaining)
//           setTestStarted(true)
          
//           console.log("Test resumed successfully")
//         } catch (resumeError: any) {
//           console.error("Failed to resume test:", resumeError)
//           setError("Failed to resume test. Please start a new one.")
//         }
//       } else {
//         // No in-progress test, user needs to start a new one
//         console.log("No in-progress test found, showing start screen")
//       }
//     } catch (error: any) {
//       console.error("Error initializing test:", error)
//       setError(error.message || "Failed to initialize test")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStartTest = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)

//       const result = await placementAPI.startTest(activeLanguage.code, level)
      
//       setTestId(result.testId)
//       setTestData({
//         questions: result.questions,
//         timeLimit: result.timeLimit,
//       })
//       setTimeLeft(result.timeLimit)
//       setTestStarted(true)
//     } catch (error: any) {
//       console.error("Error starting test:", error)
//       setError(error.message || "Failed to start test")
//       alert(error.message || "Failed to start test. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Timer
//   useEffect(() => {
//     if (testStarted && timeLeft > 0 && !isComplete) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
//       return () => clearTimeout(timer)
//     } else if (testStarted && timeLeft === 0 && !isComplete) {
//       handleComplete()
//     }
//   }, [timeLeft, isComplete, testStarted])

//   // Auto-save interval
//   useEffect(() => {
//     if (testStarted && !isComplete) {
//       autoSaveIntervalRef.current = setInterval(autoSaveProgress, 30000) // Every 30s
//       return () => {
//         if (autoSaveIntervalRef.current) {
//           clearInterval(autoSaveIntervalRef.current)
//         }
//       }
//     }
//   }, [testStarted, isComplete, autoSaveProgress])

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current)
//       if (autoSaveIntervalRef.current) clearInterval(autoSaveIntervalRef.current)
//     }
//   }, [])

//   const handleAnswer = (answerOption: string) => {
//     setSelectedAnswer(answerOption)
//   }

//   const handleNext = () => {
//     if (!selectedAnswer || !testData) return

//     const question = testData.questions[currentQuestion]
//     const newAnswers = [...answers, { questionId: question.id, answer: selectedAnswer }]
//     setAnswers(newAnswers)

//     if (currentQuestion < testData.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//       setSelectedAnswer(null)
//     } else {
//       handleComplete()
//     }
//   }

//   const handleComplete = async () => {
//     if (!testId || !testData) return

//     setIsComplete(true)
//     setShowConfetti(true)

//     try {
//       // Submit final answers
//       const finalAnswers = selectedAnswer
//         ? [...answers, { questionId: testData.questions[currentQuestion].id, answer: selectedAnswer }]
//         : answers

//       const result = await placementAPI.submitTest(testId, finalAnswers)

//       // Redirect to results page
//       redirectTimeoutRef.current = setTimeout(() => {
//         router.push(`/test/result/${testId}`)
//       }, 3000)
//     } catch (error: any) {
//       console.error("Error submitting test:", error)
//       alert("Failed to submit test. Please try again.")
//       setIsComplete(false)
//       setShowConfetti(false)
//     }
//   }

//   const playAudio = () => {
//     if (!testData) return
//     const question = testData.questions[currentQuestion]
//     if (question.textToSpeak) {
//       const utterance = new SpeechSynthesisUtterance(question.textToSpeak)
//       utterance.rate = 0.9
//       utterance.lang = activeLanguage?.code === 'en' ? 'en-US' : 'vi-VN'
//       window.speechSynthesis.speak(utterance)
//     }
//   }

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   if (authLoading || isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading test...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!user || !activeLanguage) return null

//   // Error screen
//   if (error && !testStarted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//         <Navigation isOpen={isOpen} onClose={closeNav} />
//         <TopBar onMenuClick={toggleNav} />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             <Card className="border-2 border-destructive shadow-2xl">
//               <CardHeader className="text-center space-y-4 pb-8 px-6">
//                 <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-destructive to-red-600 flex items-center justify-center shadow-xl">
//                   <AlertCircle className="w-10 h-10 text-white" />
//                 </div>
//                 <CardTitle className="text-4xl font-bold text-destructive">Error</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6 pb-10 px-6 text-center">
//                 <p className="text-lg text-muted-foreground">{error}</p>
//                 <Button
//                   onClick={() => router.push("/test")}
//                   className="w-full h-16 text-xl font-bold"
//                   size="lg"
//                 >
//                   Return to Tests
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // Start screen
//   if (!testStarted) {
//     const questionCounts = {
//       A: { total: 60, duration: 60 },
//       B: { total: 70, duration: 70 },
//       C: { total: 80, duration: 80 }
//     }
//     const config = questionCounts[level]

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//         <Navigation isOpen={isOpen} onClose={closeNav} />
//         <TopBar onMenuClick={toggleNav} />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-8 transition-all duration-300">
//           <div className="max-w-3xl mx-auto">
//             <Card className="border-2 shadow-2xl overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600" />
//               <CardHeader className="text-center space-y-4 pb-8 px-6">
//                 <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
//                   <FileText className="w-10 h-10 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
//                     Level {level} Test
//                   </CardTitle>
//                   <p className="text-lg text-muted-foreground font-medium">
//                     {level === 'A' ? 'Beginner (A1-A2)' : level === 'B' ? 'Intermediate (B1-B2)' : 'Advanced (C1-C2)'}
//                   </p>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-8 pb-10 px-6">
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-2xl border-2 border-blue-500/20">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Clock className="w-6 h-6 text-blue-600" />
//                       <span className="font-bold text-foreground">Duration</span>
//                     </div>
//                     <p className="text-3xl font-bold text-blue-600">
//                       {config.duration} min
//                     </p>
//                   </div>
//                   <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl border-2 border-cyan-500/20">
//                     <div className="flex items-center gap-3 mb-2">
//                       <FileText className="w-6 h-6 text-cyan-600" />
//                       <span className="font-bold text-foreground">Questions</span>
//                     </div>
//                     <p className="text-3xl font-bold text-cyan-600">
//                       {config.total}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-muted/50 p-8 rounded-2xl space-y-4 border-2">
//                   <h3 className="font-bold text-xl text-foreground mb-4 flex items-center gap-2">
//                     <AlertCircle className="w-6 h-6 text-blue-600" />
//                     Test Instructions
//                   </h3>
//                   <ul className="space-y-3 text-base text-muted-foreground">
//                     <li className="flex items-start gap-3">
//                       <span className="text-blue-600 font-bold text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">Answer all questions to the best of your ability</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <span className="text-blue-600 font-bold text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">Progress is auto-saved every 30 seconds</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <span className="text-blue-600 font-bold text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">You can pause and resume later</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <span className="text-blue-600 font-bold text-lg shrink-0">•</span>
//                       <span className="leading-relaxed">You'll receive AI-powered feedback after completion</span>
//                     </li>
//                   </ul>
//                 </div>

//                 <Button
//                   onClick={handleStartTest}
//                   disabled={isLoading}
//                   className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:opacity-90 shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-[1.02]"
//                   size="lg"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-6 h-6 mr-2 animate-spin" />
//                       Generating Questions...
//                     </>
//                   ) : (
//                     "Begin Test"
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // Completion screen
//   if (isComplete) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//         <Navigation isOpen={isOpen} onClose={closeNav} />
//         <TopBar onMenuClick={toggleNav} />
//         <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

//         <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300 flex items-center justify-center min-h-[calc(100vh-4rem)]">
//           <div className="max-w-2xl mx-auto w-full">
//             <Card className="text-center border-2 border-primary shadow-2xl overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
//               <CardHeader className="pt-12 pb-8 px-6">
//                 <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-bounce shadow-2xl">
//                   <CheckCircle2 className="w-16 h-16 text-white" />
//                 </div>
//                 <CardTitle className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
//                   Test Complete!
//                 </CardTitle>
//                 <p className="text-xl text-muted-foreground">Analyzing your results...</p>
//               </CardHeader>
//               <CardContent className="space-y-8 pb-12 px-6">
//                 <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//                   <span className="ml-2 font-medium">Redirecting to detailed results</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   // Test questions screen
//   if (!testData || !testData.questions || currentQuestion >= testData.questions.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <Loader2 className="w-12 h-12 animate-spin text-primary" />
//       </div>
//     )
//   }

//   const question: Question = testData.questions[currentQuestion]
//   const progress = ((currentQuestion + 1) / testData.questions.length) * 100
//   const SkillIcon = skillIcons[question.type] || BookOpen

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
//           {/* Header with Timer */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Level {level} Test</h1>
//               <p className="text-base sm:text-lg text-muted-foreground mt-1">
//                 {activeLanguage.name} - {level === 'A' ? 'Beginner' : level === 'B' ? 'Intermediate' : 'Advanced'}
//               </p>
//             </div>
//             <div className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 shadow-lg ${
//               timeLeft < 60 ? 'bg-destructive/10 border-destructive/30' : 'bg-card border-border'
//             }`}>
//               <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-primary'}`} />
//               <span className={`text-xl sm:text-2xl md:text-3xl font-bold font-mono ${
//                 timeLeft < 60 ? 'text-destructive' : 'text-foreground'
//               }`}>
//                 {formatTime(timeLeft)}
//               </span>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <Card className="border-2 shadow-lg">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <span className="text-sm sm:text-base font-bold text-foreground">
//                   Question {currentQuestion + 1} of {testData.questions.length}
//                 </span>
//                 <span className="text-base sm:text-lg font-bold text-primary">{Math.round(progress)}%</span>
//               </div>
//               <Progress value={progress} className="h-3 sm:h-4 shadow-inner" />
//             </CardContent>
//           </Card>

//           {/* Question Card */}
//           <Card className="border-2 shadow-2xl overflow-hidden">
//             <div className={`h-2 bg-gradient-to-r ${skillColors[question.type]}`} />
//             <CardHeader className="pb-4 sm:pb-6 space-y-4 sm:space-y-6 px-4 sm:px-6">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div
//                   className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${
//                     skillColors[question.type]
//                   } flex items-center justify-center shadow-lg`}
//                 >
//                   <SkillIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//                 </div>
//                 <Badge className="text-sm sm:text-base font-bold capitalize px-3 sm:px-4 py-1 sm:py-2 shadow-md">
//                   {skillLabels[question.type]}
//                 </Badge>
//               </div>
              
//               {question.passage && (
//                 <div className="bg-muted/50 p-4 rounded-xl border-2 border-border">
//                   <p className="text-sm font-medium text-muted-foreground mb-2">Reading Passage:</p>
//                   <p className="text-base leading-relaxed whitespace-pre-wrap">{question.passage}</p>
//                 </div>
//               )}
              
//               <CardTitle className="text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-wrap font-semibold text-foreground">
//                 {question.question}
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-4 sm:px-6">
//               {/* Audio Player for Listening Questions */}
//               {question.type === "listening" && question.textToSpeak && (
//                 <Button
//                   onClick={playAudio}
//                   variant="outline"
//                   className="w-full h-16 sm:h-20 text-base sm:text-lg md:text-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 hover:border-primary hover:bg-primary/5"
//                   size="lg"
//                 >
//                   <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4" />
//                   Play Audio
//                 </Button>
//               )}

//               {/* Answer Options */}
//               <div className="space-y-3 sm:space-y-4 pt-2">
//                 {question.options.map((option, index) => {
//                   const optionLetter = String.fromCharCode(65 + index) // A, B, C, D
//                   const cleanOption = option.replace(/^[A-D]\)\s*/, '') // Remove "A) " prefix if exists
                  
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => handleAnswer(optionLetter)}
//                       className={`w-full p-4 sm:p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
//                         selectedAnswer === optionLetter
//                           ? "border-primary bg-gradient-to-r from-primary/15 to-secondary/15 shadow-xl shadow-primary/30 scale-[1.02]"
//                           : "border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg"
//                       }`}
//                     >
//                       <div className="flex items-center justify-between gap-3 sm:gap-4">
//                         <div className="flex items-center gap-3 sm:gap-4 flex-1">
//                           <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg border-2 transition-all ${
//                             selectedAnswer === optionLetter
//                               ? "bg-primary text-white border-primary"
//                               : "bg-muted text-muted-foreground border-border"
//                           }`}>
//                             {optionLetter}
//                           </div>
//                           <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">{cleanOption}</span>
//                         </div>
//                         {selectedAnswer === optionLetter && (
//                           <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0 animate-in zoom-in duration-300" />
//                         )}
//                       </div>
//                     </button>
//                   )
//                 })}
//               </div>

//               {/* Next Button */}
//               <div className="pt-4 sm:pt-6">
//                 {selectedAnswer !== null ? (
//                   <Button
//                     onClick={handleNext}
//                     className="w-full h-14 sm:h-16 text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
//                     size="lg"
//                   >
//                     {currentQuestion < testData.questions.length - 1 ? (
//                       <>Next Question →</>
//                     ) : (
//                       <>Complete Test ✓</>
//                     )}
//                   </Button>
//                 ) : (
//                   <div className="w-full h-14 sm:h-16 flex items-center justify-center text-sm sm:text-base text-muted-foreground bg-muted/50 rounded-2xl border-2 border-dashed">
//                     Please select an answer to continue
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Question Navigator */}
//           <Card className="border-2 shadow-lg">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <span className="text-xs sm:text-sm font-bold text-muted-foreground">Question Progress</span>
//                 <span className="text-xs sm:text-sm font-medium text-muted-foreground">
//                   {answers.length} of {testData.questions.length} answered
//                 </span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {testData.questions.map((_: any, idx: number) => (
//                   <div
//                     key={idx}
//                     className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
//                       idx === currentQuestion
//                         ? "bg-primary text-white shadow-lg scale-110"
//                         : idx < answers.length
//                         ? "bg-success/20 text-success border-2 border-success/30"
//                         : "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {idx + 1}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }

























"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { useNavigation } from "@/lib/navigation-context"
import TopBar from "@/components/top-bar"
import { Confetti } from "@/components/confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Volume2, CheckCircle2, Clock, BookOpen, Edit3, FileText, AlertCircle, Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState, useRef, useCallback } from "react"
import { placementAPI, userAPI } from "@/lib/api-service"

const skillIcons = {
  vocabulary: BookOpen,
  grammar: Edit3,
  listening: Volume2,
  reading: BookOpen,
}

const skillColors = {
  vocabulary: "from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500",
  grammar: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
  listening: "from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500",
  reading: "from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500",
}

const skillLabels = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  listening: "Listening",
  reading: "Reading",
}

interface Question {
  id: number
  type: "vocabulary" | "grammar" | "listening" | "reading"
  question: string
  textToSpeak?: string | null
  passage?: string | null
  options: string[]
}

export default function TestLevelPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()
  const params = useParams()
  const level = (params.level as string).toUpperCase() as 'A' | 'B' | 'C'

  const [testData, setTestData] = useState<any>(null)
  const [testId, setTestId] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Array<{ questionId: number; answer: string }>>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeLanguage, setActiveLanguage] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-save progress every 30 seconds
  const autoSaveProgress = useCallback(async () => {
    if (!testId || !testStarted || isComplete) return

    try {
      await placementAPI.saveProgress({
        testId,
        answers,
        currentQuestion,
        timeRemaining: timeLeft,
      })
      console.log("Progress auto-saved")
    } catch (error) {
      console.error("Auto-save failed:", error)
    }
  }, [testId, answers, currentQuestion, timeLeft, testStarted, isComplete])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      initializeTest()
    }
  }, [user, authLoading, router, level])

  const initializeTest = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Get active language
      const profile = await userAPI.getProfile()
      setActiveLanguage(profile.activeLanguage)

      if (!profile.activeLanguage?.code) {
        setError("Please select a language first")
        setTimeout(() => router.push("/selectLanguage"), 2000)
        return
      }

      console.log("Checking for in-progress test...")
      
      // Check for in-progress test
      const inProgress = await placementAPI.getInProgressTest(
        profile.activeLanguage.code,
        level
      )

      console.log("In-progress test result:", inProgress)

      // If there's an in-progress test, resume it
      if (inProgress && inProgress.testId) {
        console.log("Resuming test:", inProgress.testId)
        
        try {
          const testData = await placementAPI.getTestQuestions(inProgress.testId)
          
          if (!testData || !testData.questions) {
            console.error("Invalid test data received")
            setError("Failed to load test data")
            return
          }

          setTestId(inProgress.testId)
          setTestData({ 
            questions: testData.questions, 
            timeLimit: testData.timeRemaining 
          })
          setCurrentQuestion(testData.currentQuestion || 0)
          setAnswers(testData.savedAnswers || [])
          setTimeLeft(testData.timeRemaining)
          setTestStarted(true)
          
          console.log("Test resumed successfully")
        } catch (resumeError: any) {
          console.error("Failed to resume test:", resumeError)
          setError("Failed to resume test. Please start a new one.")
        }
      } else {
        // No in-progress test, user needs to start a new one
        console.log("No in-progress test found, showing start screen")
      }
    } catch (error: any) {
      console.error("Error initializing test:", error)
      setError(error.message || "Failed to initialize test")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartTest = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await placementAPI.startTest(activeLanguage.code, level)
      
      setTestId(result.testId)
      setTestData({
        questions: result.questions,
        timeLimit: result.timeLimit,
      })
      setTimeLeft(result.timeLimit)
      setTestStarted(true)
    } catch (error: any) {
      console.error("Error starting test:", error)
      setError(error.message || "Failed to start test")
      alert(error.message || "Failed to start test. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Timer
  useEffect(() => {
    if (testStarted && timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (testStarted && timeLeft === 0 && !isComplete) {
      handleComplete()
    }
  }, [timeLeft, isComplete, testStarted])

  // Auto-save interval
  useEffect(() => {
    if (testStarted && !isComplete) {
      autoSaveIntervalRef.current = setInterval(autoSaveProgress, 30000) // Every 30s
      return () => {
        if (autoSaveIntervalRef.current) {
          clearInterval(autoSaveIntervalRef.current)
        }
      }
    }
  }, [testStarted, isComplete, autoSaveProgress])

  // Cleanup
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current)
      if (autoSaveIntervalRef.current) clearInterval(autoSaveIntervalRef.current)
    }
  }, [])

  const handleAnswer = (answerOption: string) => {
    setSelectedAnswer(answerOption)
  }

  const handleNext = () => {
    if (!selectedAnswer || !testData) return

    const question = testData.questions[currentQuestion]
    const newAnswers = [...answers, { questionId: question.id, answer: selectedAnswer }]
    setAnswers(newAnswers)

    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    if (!testId || !testData) return

    setIsComplete(true)
    setShowConfetti(true)

    try {
      // Submit final answers
      const finalAnswers = selectedAnswer
        ? [...answers, { questionId: testData.questions[currentQuestion].id, answer: selectedAnswer }]
        : answers

      const result = await placementAPI.submitTest(testId, finalAnswers)

      // Redirect to results page
      redirectTimeoutRef.current = setTimeout(() => {
        router.push(`/test/result/${testId}`)
      }, 3000)
    } catch (error: any) {
      console.error("Error submitting test:", error)
      alert("Failed to submit test. Please try again.")
      setIsComplete(false)
      setShowConfetti(false)
    }
  }

  const playAudio = () => {
    if (!testData) return
    const question = testData.questions[currentQuestion]
    if (question.textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(question.textToSpeak)
      utterance.rate = 0.9
      utterance.lang = activeLanguage?.code === 'en' ? 'en-US' : 'vi-VN'
      window.speechSynthesis.speak(utterance)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading test...</p>
        </div>
      </div>
    )
  }

  if (!user || !activeLanguage) return null

  // Error screen
  if (error && !testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Navigation isOpen={isOpen} onClose={closeNav} />
        <TopBar onMenuClick={toggleNav} />

        <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 transition-all duration-300">
          <div className="max-w-2xl mx-auto">
            <Card className="border border-red-200 dark:border-red-900/50 shadow-xl bg-white dark:bg-slate-900">
              <CardHeader className="text-center space-y-4 pb-6 px-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">Error</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pb-8 px-6 text-center">
                <p className="text-base text-slate-700 dark:text-slate-300">{error}</p>
                <Button
                  onClick={() => router.push("/test")}
                  className="w-full h-12 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  size="lg"
                >
                  Return to Tests
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Start screen
  if (!testStarted) {
    const questionCounts = {
      A: { total: 60, duration: 60 },
      B: { total: 70, duration: 70 },
      C: { total: 80, duration: 80 }
    }
    const config = questionCounts[level]

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Navigation isOpen={isOpen} onClose={closeNav} />
        <TopBar onMenuClick={toggleNav} />

        <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 transition-all duration-300">
          <div className="max-w-2xl mx-auto">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden bg-white dark:bg-slate-800">
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 dark:from-blue-400 dark:via-blue-500 dark:to-blue-400" />
              <CardHeader className="text-center space-y-4 pb-6 px-6 pt-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Level {level} Test
                  </CardTitle>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    {level === 'A' ? 'Beginner (A1-A2)' : level === 'B' ? 'Intermediate (B1-B2)' : 'Advanced (C1-C2)'}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pb-8 px-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 p-5 rounded-xl border border-blue-200 dark:border-blue-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Duration</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {config.duration} min
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 p-5 rounded-xl border border-blue-200 dark:border-blue-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Questions</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {config.total}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl space-y-3 border border-slate-200 dark:border-slate-600">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Test Instructions
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-base shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">Answer all questions to the best of your ability</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-base shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">Progress is auto-saved every 30 seconds</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-base shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">You can pause and resume later</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-base shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">You'll receive AI-powered feedback after completion</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={handleStartTest}
                  disabled={isLoading}
                  className="w-full h-14 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 dark:from-blue-500 dark:to-blue-500 dark:hover:from-blue-600 dark:hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Questions...
                    </>
                  ) : (
                    "Begin Test"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Navigation isOpen={isOpen} onClose={closeNav} />
        <TopBar onMenuClick={toggleNav} />
        <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

        <main className="md:ml-20 xl:ml-64 mt-16 p-6 transition-all duration-300 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="max-w-xl mx-auto w-full">
            <Card className="text-center border border-blue-200 dark:border-blue-800/50 shadow-xl overflow-hidden bg-white dark:bg-slate-800">
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 dark:from-blue-400 dark:via-green-400 dark:to-blue-400" />
              <CardHeader className="pt-10 pb-6 px-6">
                <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-to-br from-blue-500 to-green-500 dark:from-blue-400 dark:to-green-400 flex items-center justify-center animate-bounce shadow-xl">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  Test Complete!
                </CardTitle>
                <p className="text-base text-slate-600 dark:text-slate-300">Analyzing your results...</p>
              </CardHeader>
              <CardContent className="space-y-6 pb-10 px-6">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-2 font-medium">Redirecting to detailed results</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Test questions screen
  if (!testData || !testData.questions || currentQuestion >= testData.questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    )
  }

  const question: Question = testData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / testData.questions.length) * 100
  const SkillIcon = skillIcons[question.type] || BookOpen

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 transition-all duration-300">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Header with Timer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Level {level} Test</h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1">
                {activeLanguage.name} - {level === 'A' ? 'Beginner' : level === 'B' ? 'Intermediate' : 'Advanced'}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border shadow-lg ${
              timeLeft < 60 
                ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800/50' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}>
              <Clock className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-blue-600 dark:text-blue-400'}`} />
              <span className={`text-xl sm:text-2xl font-bold font-mono ${
                timeLeft < 60 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="border border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Question {currentQuestion + 1} of {testData.questions.length}
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2.5 bg-slate-100 dark:bg-slate-700" />
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden bg-white dark:bg-slate-800">
            <div className={`h-1.5 bg-gradient-to-r ${skillColors[question.type]}`} />
            <CardHeader className="pb-4 space-y-4 px-5 pt-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    skillColors[question.type]
                  } flex items-center justify-center shadow-md`}
                >
                  <SkillIcon className="w-6 h-6 text-white" />
                </div>
                <Badge className="text-xs font-semibold capitalize px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-0">
                  {skillLabels[question.type]}
                </Badge>
              </div>
              
              {question.passage && (
                <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Reading Passage:</p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200">{question.passage}</p>
                </div>
              )}
              
              <CardTitle className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-semibold text-slate-900 dark:text-slate-100">
                {question.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-6 px-5">
              {/* Audio Player for Listening Questions */}
              {question.type === "listening" && question.textToSpeak && (
                <Button
                  onClick={playAudio}
                  variant="outline"
                  className="w-full h-14 text-base font-semibold text-white dark:text-white shadow-md hover:shadow-lg transition-all border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  size="lg"
                >
                  <Volume2 className="w-5 h-5 mr-3" />
                  Play Audio
                </Button>
              )}

              {/* Answer Options */}
              <div className="space-y-3 pt-1">
                {question.options.map((option, index) => {
                  const optionLetter = String.fromCharCode(65 + index)
                  const cleanOption = option.replace(/^[A-D]\)\s*/, '')
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(optionLetter)}
                      className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedAnswer === optionLetter
                          ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 shadow-md"
                          : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 bg-white dark:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border transition-all ${
                            selectedAnswer === optionLetter
                              ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                          }`}>
                            {optionLetter}
                          </div>
                          <span className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">{cleanOption}</span>
                        </div>
                        {selectedAnswer === optionLetter && (
                          <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 animate-in zoom-in duration-200" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Next Button */}
              <div className="pt-4">
                {selectedAnswer !== null ? (
                  <Button
                    onClick={handleNext}
                    className="w-full h-13 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 dark:from-blue-500 dark:to-blue-500 dark:hover:from-blue-600 dark:hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    {currentQuestion < testData.questions.length - 1 ? (
                      <>Next Question →</>
                    ) : (
                      <>Complete Test ✓</>
                    )}
                  </Button>
                ) : (
                  <div className="w-full h-13 flex items-center justify-center text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
                    Please select an answer to continue
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Question Navigator */}
          <Card className="border border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Question Progress</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {answers.length} of {testData.questions.length} answered
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {testData.questions.map((_: any, idx: number) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-xs transition-all ${
                      idx === currentQuestion
                        ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md scale-110"
                        : idx < answers.length
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600"
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}