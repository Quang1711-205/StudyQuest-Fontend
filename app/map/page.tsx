// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Lock, CheckCircle2, Circle, Star } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// // Mock data based on spec
// const topics = [
//   {
//     id: 1,
//     name: "Greetings & Introductions",
//     description: "Learn basic greetings and how to introduce yourself",
//     order: 1,
//     isUnlocked: true,
//     progress: 75,
//     lessons: [
//       { id: 1, name: "Hello & Goodbye", type: "vocab", isCompleted: true, isUnlocked: true },
//       { id: 2, name: "Introducing Yourself", type: "grammar", isCompleted: true, isUnlocked: true },
//       { id: 3, name: "Listen: Greetings", type: "listening", isCompleted: true, isUnlocked: true },
//       { id: 4, name: "Read: Meeting People", type: "reading", isCompleted: false, isUnlocked: true },
//     ],
//   },
//   {
//     id: 2,
//     name: "Numbers & Time",
//     description: "Master numbers, dates, and telling time",
//     order: 2,
//     isUnlocked: true,
//     progress: 50,
//     lessons: [
//       { id: 5, name: "Numbers 1-100", type: "vocab", isCompleted: true, isUnlocked: true },
//       { id: 6, name: "Telling Time", type: "grammar", isCompleted: true, isUnlocked: true },
//       { id: 7, name: "Listen: What Time?", type: "listening", isCompleted: false, isUnlocked: true },
//       { id: 8, name: "Read: Daily Schedule", type: "reading", isCompleted: false, isUnlocked: true },
//     ],
//   },
//   {
//     id: 3,
//     name: "Food & Dining",
//     description: "Order food and talk about meals",
//     order: 3,
//     isUnlocked: true,
//     progress: 25,
//     lessons: [
//       { id: 9, name: "Food Vocabulary", type: "vocab", isCompleted: true, isUnlocked: true },
//       { id: 10, name: "At the Restaurant", type: "grammar", isCompleted: false, isUnlocked: true },
//       { id: 11, name: "Listen: Ordering Food", type: "listening", isCompleted: false, isUnlocked: true },
//       { id: 12, name: "Read: Menu Items", type: "reading", isCompleted: false, isUnlocked: false },
//     ],
//   },
//   {
//     id: 4,
//     name: "Travel & Directions",
//     description: "Navigate and ask for directions",
//     order: 4,
//     isUnlocked: false,
//     progress: 0,
//     lessons: [
//       { id: 13, name: "Transportation", type: "vocab", isCompleted: false, isUnlocked: false },
//       { id: 14, name: "Asking Directions", type: "grammar", isCompleted: false, isUnlocked: false },
//       { id: 15, name: "Listen: Getting Around", type: "listening", isCompleted: false, isUnlocked: false },
//       { id: 16, name: "Read: Travel Guide", type: "reading", isCompleted: false, isUnlocked: false },
//     ],
//   },
// ]

// export default function MapPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()

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

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       {/* <main className="md:ml-20 min-[1200px]:ml-96 mt-16 p-4 md:p-8 transition-all duration-300"> */}
//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold mb-2">Learning Map</h1>
//             <p className="text-muted-foreground text-lg">Follow your structured path to language mastery</p>
//           </div>

//           {/* Topics Path */}
//           <div className="space-y-8">
//             {topics.map((topic, index) => (
//               <div key={topic.id} className="relative">
//                 {/* Connection Line */}
//                 {index < topics.length - 1 && (
//                   <div className="absolute left-1/2 top-full h-8 w-1 bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2 z-0" />
//                 )}

//                 <Card
//                   className={`relative overflow-hidden ${topic.isUnlocked ? "border-2 border-primary/20" : "opacity-60"}`}
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex items-start gap-4 mb-4">
//                       {/* Topic Icon */}
//                       <div
//                         className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
//                           topic.isUnlocked ? "bg-gradient-to-br from-primary to-blue-600" : "bg-muted"
//                         }`}
//                       >
//                         {topic.isUnlocked ? (
//                           <Star className="w-8 h-8 text-white" />
//                         ) : (
//                           <Lock className="w-8 h-8 text-muted-foreground" />
//                         )}
//                       </div>

//                       {/* Topic Info */}
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <h3 className="text-2xl font-bold">{topic.name}</h3>
//                           {!topic.isUnlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
//                         </div>
//                         <p className="text-muted-foreground mb-3">{topic.description}</p>

//                         {/* Progress */}
//                         {topic.isUnlocked && (
//                           <div className="flex items-center gap-3 mb-4">
//                             <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
//                               <div
//                                 className="h-full bg-gradient-to-r from-primary to-blue-600 transition-all"
//                                 style={{ width: `${topic.progress}%` }}
//                               />
//                             </div>
//                             <span className="text-sm font-semibold text-primary">{topic.progress}%</span>
//                           </div>
//                         )}

//                         {/* Lessons Grid */}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                           {topic.lessons.map((lesson) => (
//                             <Link
//                               key={lesson.id}
//                               href={lesson.isUnlocked ? `/lesson/${lesson.id}` : "#"}
//                               className={lesson.isUnlocked ? "" : "pointer-events-none"}
//                             >
//                               <div
//                                 className={`p-3 rounded-xl border-2 transition-all ${
//                                   lesson.isCompleted
//                                     ? "bg-success/10 border-success hover:shadow-lg"
//                                     : lesson.isUnlocked
//                                       ? "bg-card border-border hover:border-primary hover:shadow-lg"
//                                       : "bg-muted border-muted-foreground/20 opacity-50"
//                                 }`}
//                               >
//                                 <div className="flex items-center gap-2 mb-2">
//                                   {lesson.isCompleted ? (
//                                     <CheckCircle2 className="w-5 h-5 text-success" />
//                                   ) : lesson.isUnlocked ? (
//                                     <Circle className="w-5 h-5 text-primary" />
//                                   ) : (
//                                     <Lock className="w-5 h-5 text-muted-foreground" />
//                                   )}
//                                   <Badge variant="outline" className="text-xs">
//                                     {lesson.type}
//                                   </Badge>
//                                 </div>
//                                 <div className="text-sm font-medium line-clamp-2">{lesson.name}</div>
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Unlock Message */}
//                     {!topic.isUnlocked && (
//                       <div className="mt-4 p-3 bg-muted rounded-lg text-center">
//                         <p className="text-sm text-muted-foreground">Complete the previous topic to unlock this one</p>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }


// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Lock, CheckCircle2, Circle, Star, Book, BookOpen, Headphones, Map as MapIcon } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// // Mock data with colorful themes
// const topics = [
//   {
//     id: 1,
//     name: "Greetings & Introductions",
//     description: "Learn basic greetings and how to introduce yourself",
//     order: 1,
//     isUnlocked: true,
//     progress: 75,
//     color: "from-blue-400 via-blue-500 to-blue-600",
//     darkColor: "from-blue-600 via-blue-700 to-blue-800",
//     connectorColor: "#60a5fa",
//     lessons: [
//       { id: 1, name: "Hello & Goodbye", type: "vocab", isCompleted: true, isUnlocked: true },
//       { id: 2, name: "Introducing Yourself", type: "grammar", isCompleted: true, isUnlocked: true },
//       { id: 3, name: "Listen: Greetings", type: "listening", isCompleted: true, isUnlocked: true },
//       { id: 4, name: "Read: Meeting People", type: "reading", isCompleted: false, isUnlocked: true },
//     ],
//   },
//   {
//     id: 2,
//     name: "Numbers & Time",
//     description: "Master numbers, dates, and telling time",
//     order: 2,
//     isUnlocked: true,
//     progress: 50,
//     color: "from-purple-400 via-purple-500 to-purple-600",
//     darkColor: "from-purple-600 via-purple-700 to-purple-800",
//     connectorColor: "#a78bfa",
//     lessons: [
//       { id: 5, name: "Numbers 1-100", type: "vocab", isCompleted: true, isUnlocked: true },
//       { id: 6, name: "Telling Time", type: "grammar", isCompleted: true, isUnlocked: true },
//       { id: 7, name: "Listen: What Time?", type: "listening", isCompleted: false, isUnlocked: true },
//       { id: 8, name: "Read: Daily Schedule", type: "reading", isCompleted: false, isUnlocked: true },
//     ],
//   },
//   {
//     id: 3,
//     name: "Food & Dining",
//     description: "Order food and talk about meals",
//     order: 3,
//     isUnlocked: true,
//     progress: 25,
//     color: "from-orange-400 via-orange-500 to-orange-600",
//     darkColor: "from-orange-600 via-orange-700 to-orange-800",
//     connectorColor: "#fb923c",
//     lessons: [
//       { id: 9, name: "Food Vocabulary", type: "vocab", isCompleted: true, isUnlocked: true },
//       { id: 10, name: "At the Restaurant", type: "grammar", isCompleted: false, isUnlocked: true },
//       { id: 11, name: "Listen: Ordering Food", type: "listening", isCompleted: false, isUnlocked: true },
//       { id: 12, name: "Read: Menu Items", type: "reading", isCompleted: false, isUnlocked: false },
//     ],
//   },
//   {
//     id: 4,
//     name: "Travel & Directions",
//     description: "Navigate and ask for directions",
//     order: 4,
//     isUnlocked: false,
//     progress: 0,
//     color: "from-green-400 via-green-500 to-green-600",
//     darkColor: "from-green-600 via-green-700 to-green-800",
//     connectorColor: "#4ade80",
//     lessons: [
//       { id: 13, name: "Transportation", type: "vocab", isCompleted: false, isUnlocked: false },
//       { id: 14, name: "Asking Directions", type: "grammar", isCompleted: false, isUnlocked: false },
//       { id: 15, name: "Listen: Getting Around", type: "listening", isCompleted: false, isUnlocked: false },
//       { id: 16, name: "Read: Travel Guide", type: "reading", isCompleted: false, isUnlocked: false },
//     ],
//   },
// ]

// const getLessonIcon = (type: string) => {
//   switch(type) {
//     case 'vocab': return <Book className="w-4 h-4" />;
//     case 'grammar': return <BookOpen className="w-4 h-4" />;
//     case 'listening': return <Headphones className="w-4 h-4" />;
//     case 'reading': return <BookOpen className="w-4 h-4" />;
//     default: return <Circle className="w-4 h-4" />;
//   }
// }

// export default function MapPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()

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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
//         <div className="max-w-5xl mx-auto">
//           {/* Header with colorful design */}
//           <div className="mb-12 text-center">
//             <div className="inline-flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <MapIcon className="w-7 h-7 text-white" />
//               </div>
//               <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Learning Map
//               </h1>
//               <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <Star className="w-7 h-7 text-white" />
//               </div>
//             </div>
//             <p className="text-xl text-gray-600 font-medium">
//               Follow your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">structured path</span> to language mastery ✨
//             </p>
//           </div>

//           {/* Topics with Colorful Backgrounds */}
//           <div className="relative space-y-0">
//             {topics.map((topic, index) => (
//               <div key={topic.id} className="relative">
//                 {/* Connector Line */}
//                 {index < topics.length - 1 && (
//                   <div 
//                     className="absolute left-1/2 -translate-x-1/2 w-1 h-12 z-0" 
//                     style={{
//                       bottom: '-48px',
//                       background: `linear-gradient(to bottom, ${topic.connectorColor}, ${topics[index + 1].connectorColor})`
//                     }}
//                   />
//                 )}
                
//                 <div className={`bg-gradient-to-br ${topic.isUnlocked ? topic.color : 'from-gray-300 via-gray-400 to-gray-500'} rounded-3xl p-8 shadow-2xl transform transition-all hover:scale-[1.02] hover:shadow-3xl relative z-10 mb-12`}>
//                   <div className="flex items-start justify-between mb-6">
//                     <div className="flex items-start gap-4">
//                       <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/30">
//                         {topic.isUnlocked ? (
//                           <Star className="w-8 h-8 text-white" />
//                         ) : (
//                           <Lock className="w-8 h-8 text-white/70" />
//                         )}
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-bold text-white mb-1">{topic.name}</h3>
//                         <p className="text-white/90 text-sm">{topic.description}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/30">
//                         <span className="text-2xl font-bold text-white">{topic.progress}%</span>
//                       </div>
//                     </div>
//                   </div>

//                   {topic.isUnlocked && (
//                     <div className="mb-4">
//                       <div className="h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border-2 border-white/30">
//                         <div 
//                           className="h-full bg-white rounded-full shadow-lg transition-all duration-500"
//                           style={{width: `${topic.progress}%`}}
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Lessons Grid */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {topic.lessons.map((lesson, idx) => (
//                       <Link
//                         key={lesson.id}
//                         href={lesson.isUnlocked ? `/lesson/${lesson.id}` : "#"}
//                         className={lesson.isUnlocked ? "" : "pointer-events-none"}
//                       >
//                         <div
//                           className={`bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 transition-all hover:scale-105 ${
//                             lesson.isCompleted 
//                               ? 'border-white/50 shadow-xl' 
//                               : 'border-white/30 opacity-80'
//                           }`}
//                         >
//                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
//                             lesson.isCompleted
//                               ? `bg-gradient-to-br ${topic.darkColor} text-white shadow-lg`
//                               : lesson.isUnlocked
//                               ? 'bg-gray-200 text-gray-600'
//                               : 'bg-gray-200 text-gray-400'
//                           }`}>
//                             {lesson.isCompleted ? (
//                               <CheckCircle2 className="w-6 h-6" />
//                             ) : lesson.isUnlocked ? (
//                               getLessonIcon(lesson.type)
//                             ) : (
//                               <Lock className="w-5 h-5" />
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className={`px-2 py-1 rounded-md text-xs font-medium ${
//                               lesson.type === 'vocab' ? 'bg-green-100 text-green-700' :
//                               lesson.type === 'grammar' ? 'bg-blue-100 text-blue-700' :
//                               lesson.type === 'listening' ? 'bg-purple-100 text-purple-700' :
//                               'bg-orange-100 text-orange-700'
//                             }`}>
//                               {lesson.type}
//                             </span>
//                           </div>
//                           <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{lesson.name}</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>

//                   {/* Unlock Message */}
//                   {!topic.isUnlocked && (
//                     <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 text-center">
//                       <Lock className="w-8 h-8 text-white/70 mx-auto mb-2" />
//                       <p className="text-sm font-medium text-white">Complete the previous topic to unlock this one</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }



"use client"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, CheckCircle2, Circle, Star, Book, BookOpen, Headphones, Map as MapIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Mock data with colorful themes
const topics = [
  {
    id: 1,
    name: "Greetings & Introductions",
    description: "Learn basic greetings and how to introduce yourself",
    order: 1,
    isUnlocked: true,
    progress: 75,
    color: "from-blue-400 via-blue-500 to-blue-600",
    darkColor: "from-blue-600 via-blue-700 to-blue-800",
    connectorColor: "#60a5fa",
    lessons: [
      { id: 1, name: "Hello & Goodbye", type: "vocab", isCompleted: true, isUnlocked: true },
      { id: 2, name: "Introducing Yourself", type: "grammar", isCompleted: true, isUnlocked: true },
      { id: 3, name: "Listen: Greetings", type: "listening", isCompleted: true, isUnlocked: true },
      { id: 4, name: "Read: Meeting People", type: "reading", isCompleted: false, isUnlocked: true },
    ],
  },
  {
    id: 2,
    name: "Numbers & Time",
    description: "Master numbers, dates, and telling time",
    order: 2,
    isUnlocked: true,
    progress: 50,
    color: "from-purple-400 via-purple-500 to-purple-600",
    darkColor: "from-purple-600 via-purple-700 to-purple-800",
    connectorColor: "#a78bfa",
    lessons: [
      { id: 5, name: "Numbers 1-100", type: "vocab", isCompleted: true, isUnlocked: true },
      { id: 6, name: "Telling Time", type: "grammar", isCompleted: true, isUnlocked: true },
      { id: 7, name: "Listen: What Time?", type: "listening", isCompleted: false, isUnlocked: true },
      { id: 8, name: "Read: Daily Schedule", type: "reading", isCompleted: false, isUnlocked: true },
    ],
  },
  {
    id: 3,
    name: "Food & Dining",
    description: "Order food and talk about meals",
    order: 3,
    isUnlocked: true,
    progress: 25,
    color: "from-orange-400 via-orange-500 to-orange-600",
    darkColor: "from-orange-600 via-orange-700 to-orange-800",
    connectorColor: "#fb923c",
    lessons: [
      { id: 9, name: "Food Vocabulary", type: "vocab", isCompleted: true, isUnlocked: true },
      { id: 10, name: "At the Restaurant", type: "grammar", isCompleted: false, isUnlocked: true },
      { id: 11, name: "Listen: Ordering Food", type: "listening", isCompleted: false, isUnlocked: true },
      { id: 12, name: "Read: Menu Items", type: "reading", isCompleted: false, isUnlocked: false },
    ],
  },
  {
    id: 4,
    name: "Travel & Directions",
    description: "Navigate and ask for directions",
    order: 4,
    isUnlocked: false,
    progress: 0,
    color: "from-green-400 via-green-500 to-green-600",
    darkColor: "from-green-600 via-green-700 to-green-800",
    connectorColor: "#4ade80",
    lessons: [
      { id: 13, name: "Transportation", type: "vocab", isCompleted: false, isUnlocked: false },
      { id: 14, name: "Asking Directions", type: "grammar", isCompleted: false, isUnlocked: false },
      { id: 15, name: "Listen: Getting Around", type: "listening", isCompleted: false, isUnlocked: false },
      { id: 16, name: "Read: Travel Guide", type: "reading", isCompleted: false, isUnlocked: false },
    ],
  },
]

const getLessonIcon = (type: string) => {
  switch(type) {
    case 'vocab': return <Book className="w-4 h-4" />;
    case 'grammar': return <BookOpen className="w-4 h-4" />;
    case 'listening': return <Headphones className="w-4 h-4" />;
    case 'reading': return <BookOpen className="w-4 h-4" />;
    default: return <Circle className="w-4 h-4" />;
  }
}

export default function MapPage() {
  const { user, isLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-8 transition-all duration-300">
        <div className="max-w-5xl mx-auto">
          {/* Header with colorful design */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MapIcon className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Learning Map
              </h1>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
              Follow your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">structured path</span> to language mastery ✨
            </p>
          </div>

          {/* Topics with Colorful Backgrounds */}
          <div className="relative space-y-0">
            {topics.map((topic, index) => (
              <div key={topic.id} className="relative">
                {/* Connector Line */}
                {index < topics.length - 1 && (
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 w-1 h-12 z-0" 
                    style={{
                      bottom: '-48px',
                      background: `linear-gradient(to bottom, ${topic.connectorColor}, ${topics[index + 1].connectorColor})`
                    }}
                  />
                )}
                
                <div className={`bg-gradient-to-br ${topic.isUnlocked ? topic.color : 'from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700'} rounded-3xl p-8 shadow-2xl transform transition-all hover:scale-[1.02] hover:shadow-3xl relative z-10 mb-12`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/30">
                        {topic.isUnlocked ? (
                          <Star className="w-8 h-8 text-white" />
                        ) : (
                          <Lock className="w-8 h-8 text-white/70" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{topic.name}</h3>
                        <p className="text-white/90 text-sm">{topic.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/30">
                        <span className="text-2xl font-bold text-white">{topic.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {topic.isUnlocked && (
                    <div className="mb-4">
                      <div className="h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border-2 border-white/30">
                        <div 
                          className="h-full bg-white rounded-full shadow-lg transition-all duration-500"
                          style={{width: `${topic.progress}%`}}
                        />
                      </div>
                    </div>
                  )}

                  {/* Lessons Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {topic.lessons.map((lesson, idx) => (
                      <Link
                        key={lesson.id}
                        href={lesson.isUnlocked ? `/lesson/${lesson.id}` : "#"}
                        className={lesson.isUnlocked ? "" : "pointer-events-none"}
                      >
                        <div
                          className={`bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 transition-all hover:scale-105 ${
                            lesson.isCompleted 
                              ? 'border-white/50 shadow-xl' 
                              : 'border-white/30 opacity-80'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                            lesson.isCompleted
                              ? `bg-gradient-to-br ${topic.darkColor} text-white shadow-lg`
                              : lesson.isUnlocked
                              ? 'bg-gray-200 text-gray-600'
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            {lesson.isCompleted ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : lesson.isUnlocked ? (
                              getLessonIcon(lesson.type)
                            ) : (
                              <Lock className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                              lesson.type === 'vocab' ? 'bg-green-100 text-green-700' :
                              lesson.type === 'grammar' ? 'bg-blue-100 text-blue-700' :
                              lesson.type === 'listening' ? 'bg-purple-100 text-purple-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {lesson.type}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{lesson.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Unlock Message */}
                  {!topic.isUnlocked && (
                    <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 text-center">
                      <Lock className="w-8 h-8 text-white/70 mx-auto mb-2" />
                      <p className="text-sm font-medium text-white">Complete the previous topic to unlock this one</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}