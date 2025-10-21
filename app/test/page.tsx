// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Navigation } from "@/components/navigation"
// import TopBar from "@/components/top-bar"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { FileText, Clock, Award, TrendingUp, Loader2 } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import { useNavigation } from "@/lib/navigation-context"
// import { placementAPI, userAPI } from "@/lib/api-service"

// const testLevels = [
//   {
//     level: "A",
//     name: "Beginner",
//     description: "Test your basic language skills (60 questions)",
//     duration: "60 minutes",
//     questions: 60,
//     color: "from-green-500 to-emerald-600",
//   },
//   {
//     level: "B",
//     name: "Intermediate",
//     description: "Evaluate your intermediate proficiency (70 questions)",
//     duration: "70 minutes",
//     questions: 70,
//     color: "from-blue-500 to-cyan-600",
//   },
//   {
//     level: "C",
//     name: "Advanced",
//     description: "Challenge your advanced knowledge (80 questions)",
//     duration: "80 minutes",
//     questions: 80,
//     color: "from-purple-500 to-pink-600",
//   },
// ]

// export default function TestsPage() {
//   const { user, isLoading: authLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()
  
//   const [activeLanguage, setActiveLanguage] = useState<any>(null)
//   const [testHistory, setTestHistory] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push("/login")
//       return
//     }

//     if (user) {
//       loadData()
//     }
//   }, [user, authLoading, router])

//   const loadData = async () => {
//     try {
//       setIsLoading(true)
      
//       // Fetch user profile to get active language
//       const profile = await userAPI.getProfile()
//       setActiveLanguage(profile.activeLanguage)
      
//       // Fetch test history
//       if (profile.activeLanguage?.code) {
//         const history = await placementAPI.getTestHistory(profile.activeLanguage.code)
//         setTestHistory(history)
//       }
//     } catch (error) {
//       console.error("Error loading data:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (authLoading || isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <Loader2 className="w-12 h-12 animate-spin text-primary" />
//       </div>
//     )
//   }

//   if (!user) return null

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-8 transition-all duration-300">
//         <div className="max-w-6xl mx-auto space-y-8">
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
//               Placement Tests
//             </h1>
//             <p className="text-muted-foreground text-lg">
//               Take a placement test to evaluate your language proficiency and get AI-powered feedback
//             </p>
//           </div>

//           {/* Test Level Cards */}
//           <div className="grid md:grid-cols-3 gap-6">
//             {testLevels.map((test) => (
//               <Card
//                 key={test.level}
//                 className="border-2 hover:border-primary hover:shadow-2xl transition-all duration-300 overflow-hidden group"
//               >
//                 <div className={`h-2 bg-gradient-to-r ${test.color}`} />
//                 <CardHeader>
//                   <div
//                     className={`w-16 h-16 bg-gradient-to-br ${test.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
//                   >
//                     <FileText className="w-8 h-8 text-white" />
//                   </div>
//                   <CardTitle className="text-2xl">Level {test.level}</CardTitle>
//                   <CardDescription className="text-base font-medium">{test.name}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <p className="text-sm text-muted-foreground">{test.description}</p>

//                   <div className="space-y-2 bg-muted/50 p-3 rounded-xl">
//                     <div className="flex items-center gap-2 text-sm">
//                       <Clock className="w-4 h-4 text-muted-foreground" />
//                       <span className="font-medium">{test.duration}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm">
//                       <FileText className="w-4 h-4 text-muted-foreground" />
//                       <span className="font-medium">{test.questions} questions</span>
//                     </div>
//                   </div>

//                   <Link href={`/test/${test.level.toLowerCase()}`}>
//                     <Button
//                       className={`w-full bg-gradient-to-r ${test.color} hover:opacity-90 shadow-lg hover:shadow-xl transition-all`}
//                       size="lg"
//                     >
//                       Start Test
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Previous Tests */}
//           {testHistory.length > 0 && (
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-7 h-7 text-primary" />
//                 Previous Tests
//               </h2>
//               <div className="space-y-4">
//                 {testHistory.map((test) => (
//                   <Card key={test.id} className="border-2 hover:shadow-xl transition-all duration-300">
//                     <CardContent className="p-4 md:p-6">
//                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                         <div className="flex items-center gap-4">
//                           <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
//                             <span className="text-2xl font-bold text-white">{test.level}</span>
//                           </div>
//                           <div>
//                             <div className="font-bold text-lg">Level {test.level} Test</div>
//                             <div className="text-sm text-muted-foreground">
//                               Completed on {new Date(test.date).toLocaleDateString()}
//                             </div>
//                             {test.cefrLevel && (
//                               <Badge variant="outline" className="mt-1">
//                                 CEFR: {test.cefrLevel}
//                               </Badge>
//                             )}
//                           </div>
//                         </div>

//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
//                           <div className="text-center bg-gradient-to-br from-success/10 to-emerald-500/10 px-6 py-3 rounded-xl border border-success/20">
//                             <div className="text-3xl font-bold text-success">{test.score}%</div>
//                             <div className="text-xs text-muted-foreground">Overall Score</div>
//                           </div>

//                           <div className="flex flex-wrap gap-2">
//                             {Object.entries(test.skillScores as Record<string, number>).map(([skill, score]) => (
//                             <Badge key={skill} variant="outline" className="capitalize font-medium">
//                                 {skill}: {score}%
//                               </Badge>
//                             ))}
//                           </div>

//                           <Link href={`/test/result/${test.id}`}>
//                             <Button
//                               variant="outline"
//                               className="shadow-md hover:shadow-lg transition-shadow"
//                             >
//                               View Details
//                             </Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* About Section */}
//           <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-2xl">
//                 <Award className="w-7 h-7 text-primary" />
//                 About Placement Tests
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
//               <p>
//                 Our AI-powered placement tests evaluate your language proficiency across four key skills: 
//                 vocabulary, grammar, listening, and reading comprehension.
//               </p>
//               <p>
//                 Each test contains 60-80 questions tailored to the selected level (A: Beginner, B: Intermediate, C: Advanced).
//                 After completing a test, you'll receive detailed AI-generated feedback highlighting your strengths,
//                 areas for improvement, and personalized recommendations.
//               </p>
//               <p className="font-medium text-foreground">
//                 Choose the level that best matches your current abilities. You can take the test multiple times
//                 to track your progress!
//               </p>
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
import TopBar from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Award, TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useNavigation } from "@/lib/navigation-context"
import { placementAPI, userAPI } from "@/lib/api-service"

const testLevels = [
  {
    level: "A",
    name: "Beginner",
    description: "Test your basic language skills (60 questions)",
    duration: "60 minutes",
    questions: 60,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    level: "B",
    name: "Intermediate",
    description: "Evaluate your intermediate proficiency (70 questions)",
    duration: "70 minutes",
    questions: 70,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    level: "C",
    name: "Advanced",
    description: "Challenge your advanced knowledge (80 questions)",
    duration: "80 minutes",
    questions: 80,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
  },
]

export default function TestsPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()
  
  const [activeLanguage, setActiveLanguage] = useState<any>(null)
  const [testHistory, setTestHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      loadData()
    }
  }, [user, authLoading, router])

  const loadData = async () => {
    try {
      setIsLoading(true)
      
      const profile = await userAPI.getProfile()
      setActiveLanguage(profile.activeLanguage)
      
      if (profile.activeLanguage?.code) {
        const history = await placementAPI.getTestHistory(profile.activeLanguage.code)
        setTestHistory(history)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-6 lg:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-3 md:mb-4 tracking-tight">
              Placement Tests
            </h1>
            
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-normal max-w-3xl mx-auto leading-relaxed">
              Take a placement test to evaluate your language proficiency and get AI-powered feedback
            </p>
          </div>

          {/* Test Level Cards */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {testLevels.map((test) => (
              <Card
                key={test.level}
                className={`${test.border} border-2 hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white dark:bg-slate-800`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${test.color}`} />
                <CardHeader className="pb-3 md:pb-4">
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${test.color} rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <FileText className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Level {test.level}</CardTitle>
                  <CardDescription className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-200">
                    {test.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {test.description}
                  </p>

                  <div className={`space-y-2 ${test.lightBg} p-3 rounded-xl border ${test.border}`}>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-100">
                      <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-100">
                      <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span>{test.questions} questions</span>
                    </div>
                  </div>

                  <Link href={`/test/${test.level.toLowerCase()}`}>
                    <Button
                      className={`w-full bg-gradient-to-r ${test.color} hover:opacity-90 shadow-lg hover:shadow-xl transition-all font-semibold text-sm md:text-base h-10 md:h-11 text-white`}
                    >
                      Start Test
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Previous Tests - Enhanced */}
          {testHistory.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-7 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                Previous Tests
              </h2>
              <div className="space-y-3 md:space-y-4">
                {testHistory.map((test) => (
                  <Card 
                    key={test.id} 
                    className="border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800"
                  >
                    <CardContent className="p-5 md:p-6 lg:p-7">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-6">
                        <div className="flex items-center gap-4 md:gap-5">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <span className="text-2xl md:text-3xl font-bold text-white">{test.level}</span>
                          </div>
                          <div>
                            <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100">
                              Level {test.level} Test
                            </div>
                            <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                              Completed on {new Date(test.date).toLocaleDateString()}
                            </div>
                            {test.cefrLevel && (
                              <Badge 
                                variant="outline" 
                                className="mt-2 font-semibold text-sm border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                              >
                                CEFR: {test.cefrLevel}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 lg:gap-6 w-full lg:w-auto justify-center lg:justify-start">
                          <div className="text-center bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 px-6 md:px-8 py-4 md:py-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 flex-shrink-0">
                            <div className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                              {test.score}%
                            </div>
                            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-semibold mt-1">
                              Overall Score
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 flex-1 justify-center lg:justify-start">
                            {Object.entries(test.skillScores as Record<string, number>).map(([skill, score]) => (
                              <div
                                key={skill}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-2.5 md:p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-center hover:shadow-lg transition-all"
                              >
                                <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                  {score}%
                                </div>
                                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 capitalize mt-0.5">
                                  {skill}
                                </div>
                              </div>
                            ))}
                          </div>

                          <Link href={`/test/result/${test.id}`}>
                            <Button
                              variant="outline"
                              className="shadow-md hover:shadow-lg transition-shadow font-semibold text-sm md:text-base border-2 border-gray-300 dark:border-gray-600 h-11 md:h-12 px-5 md:px-6 flex-shrink-0 text-gray-900 dark:text-gray-100"
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

          {/* About Section */}
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                <Award className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                About Placement Tests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-5 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Our AI-powered placement tests evaluate your language proficiency across four key skills: 
                vocabulary, grammar, listening, and reading comprehension.
              </p>
              <p>
                Each test contains 60-80 questions tailored to the selected level (A: Beginner, B: Intermediate, C: Advanced).
                After completing a test, you'll receive detailed AI-generated feedback highlighting your strengths,
                areas for improvement, and personalized recommendations.
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-base md:text-lg">
                Choose the level that best matches your current abilities. You can take the test multiple times
                to track your progress!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}