// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Confetti } from "@/components/confetti"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { ArrowLeft, TrendingUp, TrendingDown, Award, Lightbulb, Target, Sparkles } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useParams } from "next/navigation"
// import { useEffect, useState } from "react"

// const mockResult = {
//   id: 1,
//   level: "B",
//   score: 87,
//   date: "2025-01-05",
//   duration: "18:32",
//   skillScores: {
//     vocab: { score: 100, correct: 5, total: 5 },
//     grammar: { score: 75, correct: 3, total: 4 },
//     listening: { score: 100, correct: 3, total: 3 },
//     reading: { score: 67, correct: 2, total: 3 },
//   },
//   strengths: [
//     "Excellent vocabulary knowledge at intermediate level",
//     "Perfect listening comprehension",
//     "Strong understanding of common phrases",
//   ],
//   improvements: [
//     "Focus on complex grammar structures, especially conditionals",
//     "Practice reading longer passages for better comprehension",
//     "Review verb tenses and their usage in different contexts",
//   ],
//   recommendations: [
//     "Complete the 'Advanced Grammar' topic in the learning map",
//     "Practice reading exercises daily for 15 minutes",
//     "Take the Advanced (Level C) test when you feel ready",
//   ],
// }

// export default function TestResultPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const params = useParams()
//   const [showConfetti, setShowConfetti] = useState(true)

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation />
//       <TopBar />
//       <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

//       <main className="md:ml-20 min-[1200px]:ml-80 mt-16 p-4 md:p-8 transition-all duration-300">
//         <div className="max-w-5xl mx-auto space-y-6">
//           <div className="flex items-center gap-4 mb-6">
//             <Link href="/tests">
//               <Button variant="ghost" size="icon" className="hover:bg-muted">
//                 <ArrowLeft className="w-5 h-5" />
//               </Button>
//             </Link>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//                 Test Results
//               </h1>
//               <p className="text-muted-foreground">
//                 Level {mockResult.level} • {mockResult.date}
//               </p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             <Card className="border-2 border-success shadow-xl bg-gradient-to-br from-success/5 to-emerald-500/5">
//               <CardHeader>
//                 <CardTitle className="text-sm text-muted-foreground">Overall Score</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-5xl font-bold text-success mb-2">{mockResult.score}%</div>
//                 <p className="text-sm text-muted-foreground">Great performance!</p>
//               </CardContent>
//             </Card>

//             <Card className="border-2 shadow-xl">
//               <CardHeader>
//                 <CardTitle className="text-sm text-muted-foreground">Test Duration</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-5xl font-bold text-primary mb-2">{mockResult.duration}</div>
//                 <p className="text-sm text-muted-foreground">Time taken</p>
//               </CardContent>
//             </Card>

//             <Card className="border-2 shadow-xl bg-gradient-to-br from-accent/5 to-yellow-500/5">
//               <CardHeader>
//                 <CardTitle className="text-sm text-muted-foreground">Level</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-5xl font-bold text-accent mb-2">{mockResult.level}</div>
//                 <p className="text-sm text-muted-foreground">Intermediate</p>
//               </CardContent>
//             </Card>
//           </div>

//           <Card className="border-2 shadow-xl">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-2xl">
//                 <Target className="w-6 h-6 text-primary" />
//                 Skill Breakdown
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {Object.entries(mockResult.skillScores).map(([skill, data]) => (
//                 <div key={skill} className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <span className="capitalize font-bold text-lg">{skill}</span>
//                       <Badge variant="outline" className="font-medium">
//                         {data.correct}/{data.total} correct
//                       </Badge>
//                     </div>
//                     <span className="text-2xl font-bold text-primary">{data.score}%</span>
//                   </div>
//                   <Progress value={data.score} className="h-3 shadow-inner" />
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           <div className="grid md:grid-cols-2 gap-6">
//             <Card className="border-2 border-success/30 shadow-xl bg-gradient-to-br from-success/5 to-emerald-500/5">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-xl text-success">
//                   <TrendingUp className="w-6 h-6" />
//                   Strengths
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-3">
//                   {mockResult.strengths.map((strength, idx) => (
//                     <li key={idx} className="flex items-start gap-2">
//                       <Sparkles className="w-5 h-5 text-success shrink-0 mt-0.5" />
//                       <span className="text-sm leading-relaxed">{strength}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-2 border-accent/30 shadow-xl bg-gradient-to-br from-accent/5 to-yellow-500/5">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-xl text-accent">
//                   <TrendingDown className="w-6 h-6" />
//                   Areas for Improvement
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-3">
//                   {mockResult.improvements.map((improvement, idx) => (
//                     <li key={idx} className="flex items-start gap-2">
//                       <Target className="w-5 h-5 text-accent shrink-0 mt-0.5" />
//                       <span className="text-sm leading-relaxed">{improvement}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>

//           <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-2xl">
//                 <Lightbulb className="w-7 h-7 text-primary" />
//                 Personalized Recommendations
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-4">
//                 {mockResult.recommendations.map((rec, idx) => (
//                   <li key={idx} className="flex items-start gap-3 p-4 bg-card rounded-xl border shadow-sm">
//                     <Award className="w-6 h-6 text-primary shrink-0 mt-0.5" />
//                     <span className="leading-relaxed">{rec}</span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>

//           <div className="flex gap-4">
//             <Link href="/test" className="flex-1">
//               <Button
//                 variant="outline"
//                 className="w-full h-12 text-base shadow-md hover:shadow-lg transition-shadow bg-transparent"
//               >
//                 Back to Tests
//               </Button>
//             </Link>
//             <Link href="/map" className="flex-1">
//               <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-shadow">
//                 Continue Learning
//               </Button>
//             </Link>
//           </div>
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
// import { ArrowLeft, TrendingUp, TrendingDown, Award, Lightbulb, Target, Sparkles, BookOpen, Edit3, Volume2, CheckCircle2, XCircle } from "lucide-react"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react"

// // Function to calculate skill scores from answers
// const calculateSkillScores = (answers: number[], questions: any[]) => {
//   const skills = {
//     vocab: { correct: 0, total: 0 },
//     grammar: { correct: 0, total: 0 },
//     listening: { correct: 0, total: 0 },
//     reading: { correct: 0, total: 0 },
//   }

//   questions.forEach((question, idx) => {
//     const skill = question.type as keyof typeof skills
//     if (skills[skill]) {
//       skills[skill].total++
//       if (answers[idx] === question.correctAnswer) {
//         skills[skill].correct++
//       }
//     }
//   })

//   return Object.entries(skills).reduce((acc, [skill, data]) => {
//     acc[skill] = {
//       score: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
//       correct: data.correct,
//       total: data.total,
//     }
//     return acc
//   }, {} as Record<string, { score: number; correct: number; total: number }>)
// }

// // Generate AI feedback based on performance
// const generateFeedback = (score: number, level: string, skillScores: any) => {
//   const strengths = []
//   const improvements = []
//   const recommendations = []

//   // Analyze each skill
//   Object.entries(skillScores).forEach(([skill, data]: [string, any]) => {
//     if (data.score >= 80) {
//       strengths.push(`Outstanding ${skill} mastery with ${data.score}% accuracy`)
//     } else if (data.score < 60) {
//       improvements.push(`${skill.charAt(0).toUpperCase() + skill.slice(1)} needs attention (${data.score}% score)`)
//       recommendations.push(`Dedicate 20-30 minutes daily to ${skill} practice exercises`)
//     }
//   })

//   // Overall feedback
//   if (score >= 90) {
//     strengths.push("Exceptional overall performance - You're ready for advanced challenges!")
//     recommendations.push(`Consider taking the next level (Level ${String.fromCharCode(level.charCodeAt(0) + 1)}) test`)
//   } else if (score >= 75) {
//     strengths.push("Strong performance with excellent fundamentals")
//     recommendations.push("Focus on your weaker areas to achieve mastery")
//   } else if (score >= 60) {
//     improvements.push("Several areas need focused practice")
//     recommendations.push("Review the learning materials and complete practice exercises")
//   } else {
//     improvements.push("Foundational concepts need reinforcement")
//     recommendations.push("Start with beginner-level materials before retaking this test")
//   }

//   // Add generic recommendations
//   if (improvements.length > 0) {
//     recommendations.push("Use the learning map to create a personalized study plan")
//   }
  
//   recommendations.push("Practice regularly - consistency is key to language mastery")
  
//   return { strengths, improvements, recommendations }
// }

// const skillIcons = {
//   vocab: BookOpen,
//   grammar: Edit3,
//   listening: Volume2,
//   reading: BookOpen,
// }

// const skillLabels = {
//   vocab: "Vocabulary",
//   grammar: "Grammar", 
//   listening: "Listening",
//   reading: "Reading",
// }

// export default function TestResultPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [showConfetti, setShowConfetti] = useState(true)
//   const [result, setResult] = useState<any>(null)

//   // Get data from URL params
//   const score = parseInt(searchParams.get("score") || "0")
//   const level = (searchParams.get("level") || "a").toUpperCase()
//   const answersParam = searchParams.get("answers")
//   const questionsParam = searchParams.get("questions")

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//       return
//     }

//     // Parse answers and questions from URL
//     let answers: number[] = []
//     let questions: any[] = []

//     try {
//       if (answersParam) answers = JSON.parse(decodeURIComponent(answersParam))
//       if (questionsParam) questions = JSON.parse(decodeURIComponent(questionsParam))
//     } catch (e) {
//       console.error("Error parsing test data:", e)
//     }

//     // Calculate results
//     const skillScores = calculateSkillScores(answers, questions)
//     const feedback = generateFeedback(score, level, skillScores)

//     setResult({
//       level,
//       score,
//       date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
//       skillScores,
//       ...feedback,
//     })
//   }, [user, isLoading, router, score, level, answersParam, questionsParam])

//   if (isLoading || !user || !result) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   const getScoreColor = (score: number) => {
//     if (score >= 90) return "from-emerald-500 to-green-600"
//     if (score >= 75) return "from-blue-500 to-indigo-600"
//     if (score >= 60) return "from-amber-500 to-orange-600"
//     return "from-red-500 to-rose-600"
//   }

//   const getScoreMessage = (score: number) => {
//     if (score >= 90) return "Outstanding Achievement!"
//     if (score >= 75) return "Excellent Performance!"
//     if (score >= 60) return "Good Effort!"
//     return "Keep Practicing!"
//   }

//   const getScoreIcon = (score: number) => {
//     if (score >= 75) return CheckCircle2
//     return XCircle
//   }

//   const ScoreIcon = getScoreIcon(result.score)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation />
//       <TopBar />
//       {result.score >= 75 && <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />}

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
//           {/* Header */}
//           <div className="flex items-center gap-4 sm:gap-6">
//             <Link href="/test">
//               <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 hover:bg-muted rounded-xl">
//                 <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
//               </Button>
//             </Link>
//             <div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//                 Test Results
//               </h1>
//               <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-1 sm:mt-2">
//                 Level {result.level} • {result.date}
//               </p>
//             </div>
//           </div>

//           {/* Hero Score Card */}
//           <Card className="border-2 shadow-2xl overflow-hidden">
//             <div className={`h-2 sm:h-3 bg-gradient-to-r ${getScoreColor(result.score)}`} />
//             <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
//               <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
//                 <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 w-full lg:w-auto">
//                   <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${getScoreColor(result.score)} flex items-center justify-center shadow-2xl`}>
//                     <ScoreIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
//                   </div>
//                   <div className="text-center sm:text-left">
//                     <p className="text-sm sm:text-base md:text-lg font-medium text-muted-foreground mb-1 sm:mb-2">Your Overall Score</p>
//                     <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent mb-1 sm:mb-2`}>
//                       {result.score}%
//                     </div>
//                     <p className="text-base sm:text-lg md:text-xl font-semibold text-foreground">{getScoreMessage(result.score)}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
//                   <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-primary/20 text-center">
//                     <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 sm:mb-2">Level</p>
//                     <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{result.level}</p>
//                     <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
//                       {result.level === "A" && "Beginner"}
//                       {result.level === "B" && "Intermediate"}
//                       {result.level === "C" && "Advanced"}
//                     </p>
//                   </div>
//                   <div className="bg-gradient-to-br from-accent/10 to-yellow-500/10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-accent/20 text-center">
//                     <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 sm:mb-2">Correct</p>
//                     <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
//                       {Object.values(result.skillScores).reduce((sum: number, skill: any) => sum + skill.correct, 0)}/
//                       {Object.values(result.skillScores).reduce((sum: number, skill: any) => sum + skill.total, 0)}
//                     </p>
//                     <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Questions</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Skill Breakdown */}
//           <Card className="border-2 shadow-xl overflow-hidden">
//             <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
//             <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
//               <CardTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl">
//                 <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
//                 Skill Analysis
//               </CardTitle>
//               <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Detailed breakdown of your performance by skill area</p>
//             </CardHeader>
//             <CardContent className="space-y-4 sm:space-y-6 md:space-y-8 pb-6 sm:pb-8 px-4 sm:px-6">
//               {Object.entries(result.skillScores).map(([skill, data]: [string, any]) => {
//                 const SkillIcon = skillIcons[skill as keyof typeof skillIcons]
//                 const skillColor = data.score >= 80 ? "from-emerald-500 to-green-600" : 
//                                  data.score >= 60 ? "from-blue-500 to-indigo-600" : 
//                                  "from-amber-500 to-orange-600"
                
//                 return (
//                   <div key={skill} className="space-y-3 sm:space-y-4">
//                     <div className="flex items-center justify-between gap-3 sm:gap-4">
//                       <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
//                         <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${skillColor} flex items-center justify-center shadow-lg shrink-0`}>
//                           <SkillIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold capitalize truncate">{skillLabels[skill as keyof typeof skillLabels]}</h3>
//                           <Badge variant="outline" className="text-xs sm:text-sm font-medium mt-0.5 sm:mt-1">
//                             {data.correct}/{data.total} correct
//                           </Badge>
//                         </div>
//                       </div>
//                       <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${skillColor} bg-clip-text text-transparent shrink-0`}>
//                         {data.score}%
//                       </div>
//                     </div>
//                     <Progress value={data.score} className="h-3 sm:h-4 shadow-inner" />
//                   </div>
//                 )
//               })}
//             </CardContent>
//           </Card>

//           {/* Feedback Section */}
//           <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//             {result.strengths.length > 0 && (
//               <Card className="border-2 border-emerald-500/30 shadow-xl bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20 overflow-hidden">
//                 <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600" />
//                 <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
//                   <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl text-emerald-700 dark:text-emerald-400">
//                     <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//                     Your Strengths
//                   </CardTitle>
//                   <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Areas where you excelled</p>
//                 </CardHeader>
//                 <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
//                   <ul className="space-y-3 sm:space-y-4">
//                     {result.strengths.map((strength: string, idx: number) => (
//                       <li key={idx} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/60 dark:bg-gray-900/40 rounded-lg sm:rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
//                         <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
//                         <span className="text-sm sm:text-base leading-relaxed font-medium">{strength}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             )}

//             {result.improvements.length > 0 && (
//               <Card className="border-2 border-amber-500/30 shadow-xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 overflow-hidden">
//                 <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600" />
//                 <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
//                   <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl text-amber-700 dark:text-amber-400">
//                     <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//                     Growth Areas
//                   </CardTitle>
//                   <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Opportunities for improvement</p>
//                 </CardHeader>
//                 <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
//                   <ul className="space-y-3 sm:space-y-4">
//                     {result.improvements.map((improvement: string, idx: number) => (
//                       <li key={idx} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/60 dark:bg-gray-900/40 rounded-lg sm:rounded-xl border border-amber-200/50 dark:border-amber-800/50">
//                         <Target className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
//                         <span className="text-sm sm:text-base leading-relaxed font-medium">{improvement}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Recommendations */}
//           {result.recommendations.length > 0 && (
//             <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
//               <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
//                 <CardTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl">
//                   <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
//                   Personalized Recommendations
//                 </CardTitle>
//                 <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Action steps to improve your skills</p>
//               </CardHeader>
//               <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
//                 <ul className="space-y-3 sm:space-y-4">
//                   {result.recommendations.map((rec: string, idx: number) => (
//                     <li key={idx} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-card rounded-xl sm:rounded-2xl border-2 shadow-md hover:shadow-lg transition-shadow">
//                       <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
//                         <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
//                       </div>
//                       <span className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">{rec}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           )}

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2 sm:pt-4">
//             <Link href="/test" className="flex-1">
//               <Button
//                 variant="outline"
//                 className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2"
//                 size="lg"
//               >
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
//                 Back to Tests
//               </Button>
//             </Link>
//             <Link href="/map" className="flex-1">
//               <Button 
//                 className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 hover:opacity-90 shadow-xl hover:shadow-2xl transition-all"
//                 size="lg"
//               >
//                 Continue Learning Journey
//                 <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
//               </Button>
//             </Link>
//           </div>
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, TrendingDown, Award, Lightbulb, Target, Sparkles, BookOpen, Edit3, Volume2, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { placementAPI } from "@/lib/api-service"

const skillIcons = {
  vocabulary: BookOpen,
  grammar: Edit3,
  listening: Volume2,
  reading: BookOpen,
}

const skillLabels = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  listening: "Listening",
  reading: "Reading",
}

export default function TestResultPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()
  const params = useParams()
  const testId = parseInt(params.id as string)

  const [showConfetti, setShowConfetti] = useState(true)
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user && testId) {
      loadTestResult()
    }
  }, [user, authLoading, router, testId])

  const loadTestResult = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log("Loading test result for ID:", testId)
      
      const data = await placementAPI.getTestResult(testId)
      
      console.log("Test result data:", data)
      
      setResult({
        id: data.id,
        level: data.level,
        score: data.score,
        date: data.date,
        cefrLevel: data.cefrLevel,
        skillScores: data.skillScores,
        strengths: data.strengths || [],
        recommendations: data.recommendations || [],
        durationSeconds: data.durationSeconds || 0,
      })
    } catch (error: any) {
      console.error("Error loading test result:", error)
      setError(error.message || "Failed to load test result")
      
      setTimeout(() => {
        router.push("/test")
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-medium">Loading test results...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Card className="max-w-md w-full mx-4 border-2">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Error Loading Results</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Redirecting to tests page...</p>
              <Link href="/test">
                <Button className="mt-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go to Tests
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user || !result) return null

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-green-600"
    if (score >= 75) return "from-blue-500 to-indigo-600"
    if (score >= 60) return "from-amber-500 to-orange-600"
    return "from-red-500 to-rose-600"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding Achievement!"
    if (score >= 75) return "Excellent Performance!"
    if (score >= 60) return "Good Effort!"
    return "Keep Practicing!"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 75) return CheckCircle2
    return XCircle
  }

  const ScoreIcon = getScoreIcon(result.score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 sm:p-6 md:p-8 transition-all duration-300">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/test">
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl">
                <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Test Results
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Level {result.level} • {new Date(result.date).toLocaleDateString()}
                {result.cefrLevel && <Badge variant="outline" className="ml-2 text-xs font-semibold dark:text-gray-300">CEFR: {result.cefrLevel}</Badge>}
              </p>
            </div>
          </div>

          {/* Hero Score Card */}
          <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${getScoreColor(result.score)}`} />
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center">
                <div className="flex items-center gap-5 md:gap-6">
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${getScoreColor(result.score)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <ScoreIcon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Your Overall Score</p>
                    <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent mb-2`}>
                      {result.score}%
                    </div>
                    <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">{getScoreMessage(result.score)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 p-4 md:p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Level</p>
                    <p className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">{result.level}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 font-medium">
                      {result.level === "A" && "Beginner"}
                      {result.level === "B" && "Intermediate"}
                      {result.level === "C" && "Advanced"}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 p-4 md:p-5 rounded-xl border border-purple-200 dark:border-purple-800/50 text-center">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                    <p className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {Math.floor((result.durationSeconds || 0) / 60)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 font-medium">Minutes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Breakdown */}
          <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
            <CardHeader className="px-6 pt-5 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-gray-900 dark:text-white">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                Skill Analysis
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Detailed breakdown of your performance by skill area</p>
            </CardHeader>
            <CardContent className="space-y-5 pb-6 px-6">
              {Object.entries(result.skillScores).map(([skill, data]: [string, any]) => {
                const SkillIcon = skillIcons[skill as keyof typeof skillIcons] || BookOpen
                const skillColor = data.score >= 80 ? "from-emerald-500 to-green-600" :
                                 data.score >= 60 ? "from-blue-500 to-indigo-600" :
                                 "from-amber-500 to-orange-600"

                return (
                  <div key={skill} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${skillColor} flex items-center justify-center shadow-md flex-shrink-0`}>
                          <SkillIcon className="w-5 h-5 md:w-5.5 md:h-5.5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white capitalize">{skillLabels[skill as keyof typeof skillLabels] || skill}</h3>
                          <Badge variant="outline" className="text-xs font-medium mt-1 dark:text-gray-300 dark:border-gray-600">
                            {data.correct}/{data.total} correct
                          </Badge>
                        </div>
                      </div>
                      <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${skillColor} bg-clip-text text-transparent`}>
                        {data.score}%
                      </div>
                    </div>
                    <Progress value={data.score} className="h-2.5 shadow-sm" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Strengths */}
          {result.strengths && result.strengths.length > 0 && (
            <Card className="border-2 border-emerald-200 dark:border-emerald-800/50 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600" />
              <CardHeader className="px-6 pt-5 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-emerald-700 dark:text-emerald-400 font-bold">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                  Your Strengths
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Areas where you excelled</p>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <ul className="space-y-3">
                  {result.strengths.map((strength: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 p-3 md:p-4 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50">
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {result.recommendations && result.recommendations.length > 0 && (
            <Card className="border-2 border-blue-200 dark:border-blue-800/50 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              <CardHeader className="px-6 pt-5 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-blue-700 dark:text-blue-400 font-bold">
                  <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />
                  AI-Powered Recommendations
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Personalized action steps to improve your skills</p>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <ul className="space-y-3">
                  {result.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 p-4 md:p-5 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-blue-200/60 dark:border-blue-800/50 hover:shadow-md transition-shadow">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 flex-shrink-0">
                        <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <span className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
            <Link href="/test" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-11 md:h-12 text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tests
              </Button>
            </Link>
            <Link href="/map" className="flex-1">
              <Button 
                className="w-full h-11 md:h-12 text-sm md:text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                Continue Learning Journey
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}