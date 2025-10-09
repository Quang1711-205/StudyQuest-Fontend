// "use client"

// import type React from "react"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
// import { Button } from "@/components/ui/button"
// import { Sparkles, Trophy, Target, Zap, Users, BookOpen } from "lucide-react"
// import Link from "next/link"

// export default function LandingPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading && user) {
//       router.push("/dashboard")
//     }
//   }, [user, isLoading, router])

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       {/* Hero Section */}
//       <div className="container mx-auto px-4 py-20">
//         <div className="text-center max-w-4xl mx-auto">
//           {/* Logo */}
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-8 animate-float">
//             <span className="text-3xl font-bold text-white">SQ</span>
//           </div>

//           {/* Headline */}
//           <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance">
//             Learn Languages
//             <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//               Like a Game
//             </span>
//           </h1>

//           <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto">
//             Master new languages through engaging missions, earn rewards, compete with friends, and level up your skills
//             in the most fun way possible.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
//             <Link href="/register">
//               <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
//                 <Sparkles className="w-5 h-5 mr-2" />
//                 Start Learning Free
//               </Button>
//             </Link>
//             <Link href="/login">
//               <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl bg-transparent">
//                 Sign In
//               </Button>
//             </Link>
//           </div>

//           {/* Features Grid */}
//           <div className="grid md:grid-cols-3 gap-6 mt-20">
//             <FeatureCard
//               icon={<Target className="w-8 h-8" />}
//               title="Daily Missions"
//               description="Complete fun challenges and earn rewards every day"
//               color="from-primary to-blue-600"
//             />
//             <FeatureCard
//               icon={<Trophy className="w-8 h-8" />}
//               title="Compete & Win"
//               description="Climb the leaderboard and show off your skills"
//               color="from-accent to-orange-600"
//             />
//             <FeatureCard
//               icon={<Zap className="w-8 h-8" />}
//               title="Level Up Fast"
//               description="Gain XP, unlock badges, and track your progress"
//               color="from-secondary to-pink-600"
//             />
//             <FeatureCard
//               icon={<BookOpen className="w-8 h-8" />}
//               title="Structured Path"
//               description="Follow a clear learning map from beginner to expert"
//               color="from-purple-500 to-indigo-600"
//             />
//             <FeatureCard
//               icon={<Users className="w-8 h-8" />}
//               title="Practice Zone"
//               description="Master listening, speaking, reading, and writing"
//               color="from-teal-500 to-cyan-600"
//             />
//             <FeatureCard
//               icon={<Sparkles className="w-8 h-8" />}
//               title="Shop & Customize"
//               description="Unlock avatars, backgrounds, and power-ups"
//               color="from-pink-500 to-rose-600"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-white/50 backdrop-blur-sm py-16 mt-20">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8 text-center">
//             <StatCard number="10M+" label="Active Learners" />
//             <StatCard number="50+" label="Languages" />
//             <StatCard number="1000+" label="Lessons" />
//             <StatCard number="4.9★" label="User Rating" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function FeatureCard({
//   icon,
//   title,
//   description,
//   color,
// }: {
//   icon: React.ReactNode
//   title: string
//   description: string
//   color: string
// }) {
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-border">
//       <div
//         className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${color} text-white mb-4`}
//       >
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-muted-foreground text-sm">{description}</p>
//     </div>
//   )
// }

// function StatCard({ number, label }: { number: string; label: string }) {
//   return (
//     <div>
//       <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
//         {number}
//       </div>
//       <div className="text-muted-foreground">{label}</div>
//     </div>
//   )
// }


// 1"use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
// import { Button } from "@/components/ui/button"
// import { 
//   Sparkles, Trophy, Target, Zap, Users, BookOpen, 
//   Gamepad2, Brain, Sword, BarChart3, Star,
//   Sun, Moon, Menu, X, ChevronRight
// } from "lucide-react"
// import Link from "next/link"

// export default function LandingPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()
//   const [isDark, setIsDark] = useState(true)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [showQuizResult, setShowQuizResult] = useState(false)
//   const [floatingShapes, setFloatingShapes] = useState<Array<{id: number, type: string, size: number, left: number, delay: number}>>([])

//   useEffect(() => {
//     if (!isLoading && user) {
//       router.push("/dashboard")
//     }
//   }, [user, isLoading, router])

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   useEffect(() => {
//     const shapes = Array.from({ length: 12 }, (_, i) => ({
//       id: i,
//       type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
//       size: Math.random() * 30 + 20,
//       left: Math.random() * 100,
//       delay: Math.random() * 20
//     }))
//     setFloatingShapes(shapes)
//   }, [])

//   const handleQuizAnswer = (index: number, isCorrect: boolean) => {
//     setSelectedAnswer(index)
//     setShowQuizResult(true)
//     setTimeout(() => {
//       setSelectedAnswer(null)
//       setShowQuizResult(false)
//     }, 3000)
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950">
//         <div className="relative">
//           <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full" />
//           <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-pulse" />
//         </div>
//       </div>
//     )
//   }

//   const quizOptions = [
//     { text: "🌊 Biển cả", correct: false },
//     { text: "🗺️ Cuộc phiêu lưu", correct: true },
//     { text: "🏠 Ngôi nhà", correct: false },
//     { text: "📚 Sách vở", correct: false }
//   ]

//   return (
//     <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'}`}>
      
//       {/* Floating Shapes Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         {floatingShapes.map(shape => (
//           <div
//             key={shape.id}
//             className={`absolute opacity-10 ${
//               shape.type === 'circle' ? 'rounded-full bg-gradient-to-br from-purple-500 to-pink-500' :
//               shape.type === 'square' ? 'bg-gradient-to-br from-blue-500 to-cyan-500 rotate-45' :
//               'border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-yellow-500'
//             }`}
//             style={{
//               width: `${shape.size}px`,
//               height: `${shape.size}px`,
//               left: `${shape.left}%`,
//               animation: `float ${15 + shape.delay}s infinite linear`,
//               animationDelay: `${shape.delay}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Header */}
//       <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         isScrolled 
//           ? isDark ? 'bg-gray-900/95 backdrop-blur-lg border-b border-purple-500/30' : 'bg-white/95 backdrop-blur-lg border-b border-purple-200'
//           : 'bg-transparent'
//       }`}>
//         <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3 cursor-pointer group">
//             <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-conic from-yellow-400 via-purple-500 to-yellow-400 animate-spin-slow opacity-50" />
//               <Gamepad2 className="relative z-10 text-white" size={24} />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               StudyQuest
//             </span>
//           </div>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-6">
//             <a href="#features" className="hover:text-purple-400 transition-colors font-medium">Tính năng</a>
//             <a href="#demo" className="hover:text-purple-400 transition-colors font-medium">Demo</a>
//             <a href="#journey" className="hover:text-purple-400 transition-colors font-medium">Hành trình</a>
//           </div>

//           <div className="flex items-center gap-3">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsDark(!isDark)}
//               className="rounded-full hover:bg-purple-500/20"
//             >
//               {isDark ? <Sun size={20} /> : <Moon size={20} />}
//             </Button>

//             <div className="hidden md:flex items-center gap-2">
//               <Link href="/login">
//                 <Button variant="outline" className={`rounded-full border-2 ${isDark ? 'border-purple-400 hover:bg-purple-500/20' : 'border-purple-600 hover:bg-purple-100'}`}>
//                   Đăng nhập
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/50">
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   Đăng ký
//                 </Button>
//               </Link>
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className={`md:hidden ${isDark ? 'bg-gray-900/98' : 'bg-white/98'} backdrop-blur-lg border-t ${isDark ? 'border-purple-500/30' : 'border-purple-200'}`}>
//             <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
//               <a href="#features" className="hover:text-purple-400 transition-colors font-medium">Tính năng</a>
//               <a href="#demo" className="hover:text-purple-400 transition-colors font-medium">Demo</a>
//               <a href="#journey" className="hover:text-purple-400 transition-colors font-medium">Hành trình</a>
//               <div className="flex flex-col gap-2 pt-4 border-t border-purple-500/20">
//                 <Link href="/login">
//                   <Button variant="outline" className="w-full rounded-full">Đăng nhập</Button>
//                 </Link>
//                 <Link href="/register">
//                   <Button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
//                     <Sparkles className="w-4 h-4 mr-2" />
//                     Đăng ký
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Hero Section */}
//       <section className="relative pt-32 pb-20 px-4 overflow-hidden">
//         <div className="container mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
//               <h1 className="text-5xl md:text-7xl font-bold leading-tight">
//                 <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-gradient">
//                   StudyQuest
//                 </span>
//                 <br />
//                 <span className={isDark ? 'text-white' : 'text-gray-900'}>
//                   Học tập như Game
//                 </span>
//               </h1>
              
//               <p className={`text-xl md:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl`}>
//                 Biến học tập thành cuộc phiêu lưu epic! Chinh phục kiến thức với XP, badges và streaks. 
//                 Mỗi bài học là một quest! 🎮
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <Link href="/register">
//                   <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all">
//                     <Gamepad2 className="w-5 h-5 mr-2" />
//                     Bắt đầu Adventure
//                   </Button>
//                 </Link>
//                 <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 border-purple-400 hover:bg-purple-500/20">
//                   <Zap className="w-5 h-5 mr-2" />
//                   Xem Demo
//                 </Button>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
//                 {[
//                   { number: "1M+", label: "Players" },
//                   { number: "500K+", label: "Quests" },
//                   { number: "50M+", label: "XP Earned" },
//                   { number: "99%", label: "Fun" }
//                 ].map((stat, i) => (
//                   <div key={i} className={`p-4 rounded-2xl backdrop-blur-lg ${isDark ? 'bg-white/5' : 'bg-white/80'} border ${isDark ? 'border-purple-500/30' : 'border-purple-200'} hover:scale-105 transition-transform`}>
//                     <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                       {stat.number}
//                     </div>
//                     <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Hero Visual */}
//             <div className="relative h-[600px] hidden lg:flex items-center justify-center">
//               <div className="absolute top-[10%] left-[10%] animate-float">
//                 <div className={`p-4 rounded-2xl backdrop-blur-lg ${isDark ? 'bg-purple-500/20' : 'bg-white/90'} border ${isDark ? 'border-purple-400/30' : 'border-purple-200'} shadow-xl`}>
//                   <div className="text-2xl font-bold text-yellow-400">+250 XP</div>
//                   <div className="text-sm opacity-80">Quest Complete!</div>
//                 </div>
//               </div>

//               <div className="absolute top-[60%] right-[10%] animate-float" style={{animationDelay: '1s'}}>
//                 <div className={`p-4 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-xl`}>
//                   <div className="text-2xl font-bold">🔥 7 Days</div>
//                   <div className="text-sm">Streak</div>
//                 </div>
//               </div>

//               <div className="absolute bottom-[10%] left-[20%] animate-float" style={{animationDelay: '2s'}}>
//                 <div className={`p-4 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-green-500 to-teal-500 shadow-xl`}>
//                   <div className="text-2xl font-bold">⭐ Level 12</div>
//                   <div className="text-sm">Master</div>
//                 </div>
//               </div>

//               <div className="relative w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse-slow">
//                 <Target size={64} className="text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className={`py-20 px-4 ${isDark ? 'bg-black/20' : 'bg-white/50'} backdrop-blur-sm`}>
//         <div className="container mx-auto">
//           <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
//             <Gamepad2 className="inline-block mr-3 text-purple-400" />
//             Tính Năng Game Đỉnh Cao
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { icon: Gamepad2, title: "Engine Gamification", desc: "XP, level-up, achievements và leaderboards thời gian thực", color: "from-purple-500 to-blue-500" },
//               { icon: Brain, title: "AI Học Thông Minh", desc: "Roadmap cá nhân hóa, adaptive difficulty dựa trên performance", color: "from-blue-500 to-cyan-500" },
//               { icon: Sword, title: "Đấu Trường PvP", desc: "Quiz battles, guild tournaments và seasonal events epic", color: "from-pink-500 to-red-500" },
//               { icon: Target, title: "Mini-Games Tương Tác", desc: "Drag & drop, memory matching, AR flashcards interactive", color: "from-green-500 to-teal-500" },
//               { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time tracking, metrics và predictive insights chi tiết", color: "from-yellow-500 to-orange-500" },
//               { icon: Star, title: "Avatar & Customize", desc: "Unlock skins, pets, themes với thousands combinations", color: "from-purple-500 to-pink-500" }
//             ].map((feature, i) => (
//               <div
//                 key={i}
//                 className={`group p-6 rounded-3xl backdrop-blur-lg ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-white/90'} border ${isDark ? 'border-purple-500/30' : 'border-purple-200'} hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
//                 style={{animationDelay: `${i * 100}ms`}}
//               >
//                 <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
//                   <feature.icon className="text-white" size={32} />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2 text-purple-400">{feature.title}</h3>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Quiz Demo */}
//       <section id="demo" className="py-20 px-4">
//         <div className="container mx-auto max-w-3xl">
//           <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
//             <Target className="inline-block mr-3 text-yellow-400" />
//             Thử Engine Quiz Epic
//           </h2>

//           <div className={`p-8 rounded-3xl backdrop-blur-lg ${isDark ? 'bg-white/5' : 'bg-white/90'} border-2 ${isDark ? 'border-purple-500/30' : 'border-purple-200'} shadow-2xl`}>
//             <div className="text-2xl font-bold mb-8 text-center text-purple-400">
//               🧠 Từ "Adventure" nghĩa là gì?
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {quizOptions.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleQuizAnswer(index, option.correct)}
//                   disabled={showQuizResult}
//                   className={`p-4 rounded-2xl border-2 font-medium transition-all transform hover:scale-105 disabled:cursor-not-allowed
//                     ${selectedAnswer === index
//                       ? option.correct
//                         ? 'bg-green-500 border-green-400 text-white scale-110'
//                         : 'bg-red-500 border-red-400 text-white'
//                       : isDark
//                         ? 'bg-white/5 border-purple-500/30 hover:bg-white/10 hover:border-purple-400'
//                         : 'bg-white border-purple-200 hover:bg-purple-50 hover:border-purple-400'
//                     }`}
//                 >
//                   {option.text}
//                 </button>
//               ))}
//             </div>

//             {showQuizResult && (
//               <div className={`mt-6 p-4 rounded-2xl text-center font-bold text-lg animate-fade-in
//                 ${selectedAnswer !== null && quizOptions[selectedAnswer].correct
//                   ? 'bg-green-500/20 text-green-400 border-2 border-green-400'
//                   : 'bg-red-500/20 text-red-400 border-2 border-red-400'
//                 }`}>
//                 {selectedAnswer !== null && quizOptions[selectedAnswer].correct
//                   ? '🎉 Chính xác! +100 XP earned!'
//                   : '💫 Thử lại! Học từ sai lầm!'}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Journey Section */}
//       <section id="journey" className={`py-20 px-4 ${isDark ? 'bg-black/20' : 'bg-white/50'} backdrop-blur-sm`}>
//         <div className="container mx-auto">
//           <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
//             <Trophy className="inline-block mr-3 text-yellow-400" />
//             Hành Trình Học Tập
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { emoji: "1️⃣", title: "Tạo Hero", desc: "Đăng ký và customize avatar của bạn" },
//               { emoji: "2️⃣", title: "Đặt Mục Tiêu", desc: "AI tạo quest line cá nhân hóa" },
//               { emoji: "3️⃣", title: "Hoàn Thành Quest", desc: "Mini-games, XP, achievements & streaks" },
//               { emoji: "4️⃣", title: "Cạnh Tranh", desc: "Guilds, battles và global tournaments" },
//               { emoji: "5️⃣", title: "Thành Thạo", desc: "Track progress và evolve strategy" },
//               { emoji: "6️⃣", title: "Chia Sẻ", desc: "Showcase achievements & mentor others" }
//             ].map((step, i) => (
//               <div
//                 key={i}
//                 className={`p-6 rounded-3xl backdrop-blur-lg ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-white/90'} border ${isDark ? 'border-purple-500/30' : 'border-purple-200'} hover:scale-105 transition-all duration-300`}
//               >
//                 <div className="text-5xl mb-4">{step.emoji}</div>
//                 <h3 className="text-xl font-bold mb-2 text-purple-400">{step.title}</h3>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative py-32 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 overflow-hidden">
//         <div className="absolute inset-0 bg-black/20" />
        
//         {/* Animated particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-20 h-20 bg-white/10 rounded-full animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${i * 0.5}s`,
//                 animationDuration: `${8 + i}s`
//               }}
//             />
//           ))}
//         </div>

//         <div className="container mx-auto text-center relative z-10">
//           <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-pulse-slow">
//             🎉 Sẵn Sàng Cho Adventure Epic?
//           </h2>
//           <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
//             Tham gia hàng triệu học viên đã biến giáo dục thành gaming epic. Quest của bạn đang chờ!
//           </p>
//           <Link href="/register">
//             <Button size="lg" className="text-xl px-12 py-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold shadow-2xl transform hover:scale-110 transition-all">
//               <Trophy className="w-6 h-6 mr-2" />
//               Bắt Đầu MIỄN PHÍ
//               <ChevronRight className="w-6 h-6 ml-2" />
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={`py-16 px-4 ${isDark ? 'bg-black/40' : 'bg-white/80'} backdrop-blur-lg border-t ${isDark ? 'border-purple-500/30' : 'border-purple-200'}`}>
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             <div>
//               <h3 className="text-xl font-bold mb-4 text-purple-400">StudyQuest</h3>
//               <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
//                 Nền tảng học tập game hóa biến giáo dục thành cuộc phiêu lưu epic! 🎮
//               </p>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold mb-4 text-purple-400">Tính Năng</h3>
//               <ul className="space-y-2">
//                 {['🎮 Gamification', '📱 Mobile App', '🤖 AI Generator', '⚔️ PvP Arena'].map((item, i) => (
//                   <li key={i} className={`hover:text-purple-400 cursor-pointer transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-xl font-bold mb-4 text-purple-400">Cộng Đồng</h3>
//               <ul className="space-y-2">
//                 {['🏆 Leaderboard', '💬 Discord', '🎥 YouTube', '📧 Newsletter'].map((item, i) => (
//                   <li key={i} className={`hover:text-purple-400 cursor-pointer transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-xl font-bold mb-4 text-purple-400">Hỗ Trợ</h3>
//               <ul className="space-y-2">
//                 {['❓ Help Center', '🎤 Contact', '🐛 Bug Report', '💡 Features'].map((item, i) => (
//                   <li key={i} className={`hover:text-purple-400 cursor-pointer transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className={`pt-8 border-t ${isDark ? 'border-purple-500/20' : 'border-purple-200'} text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//             <p>&copy; 2025 StudyQuest. Made with 💜 for epic learners worldwide.</p>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.8; }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 1s ease-out;
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 3s ease-in-out infinite;
//         }
//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }
//       `}</style>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { 
  Sparkles, Trophy, Target, Zap, Users, BookOpen, 
  Gamepad2, Brain, Sword, BarChart3, Star,
  Sun, Moon, Menu, X, ChevronRight, Clock, Award, MessageSquare, ShoppingBag
} from "lucide-react"

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [floatingShapes, setFloatingShapes] = useState<Array<{id: number, type: string, size: number, left: number, delay: number}>>([])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const shapes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      type: ['circle', 'square'][Math.floor(Math.random() * 2)],
      size: Math.random() * 25 + 15,
      left: Math.random() * 100,
      delay: Math.random() * 20
    }))
    setFloatingShapes(shapes)
  }, [])

  const handleQuizAnswer = (index: number, isCorrect: boolean) => {
    setSelectedAnswer(index)
    setShowQuizResult(true)
    setTimeout(() => {
      setSelectedAnswer(null)
      setShowQuizResult(false)
    }, 3000)
  }

  const quizOptions = [
    { text: "🌊 Biển cả", correct: false },
    { text: "🗺️ Cuộc phiêu lưu", correct: true },
    { text: "🏠 Ngôi nhà", correct: false },
    { text: "📚 Sách vở", correct: false }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 text-gray-900'
    }`}>
      
      {/* Floating Shapes Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {floatingShapes.map(shape => (
          <div
            key={shape.id}
            className={`absolute opacity-10 ${
              shape.type === 'circle' 
                ? 'rounded-full bg-gradient-to-br from-blue-500 to-cyan-500' 
                : 'bg-gradient-to-br from-sky-500 to-blue-500 rotate-45'
            }`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: `${shape.left}%`,
              animation: `float ${15 + shape.delay}s infinite linear`,
              animationDelay: `${shape.delay}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? isDark 
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-blue-500/30 shadow-lg shadow-blue-500/10' 
            : 'bg-white/95 backdrop-blur-xl border-b border-blue-200 shadow-lg'
          : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Gamepad2 className="text-white" size={22} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                StudyQuest
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className={`font-semibold hover:text-blue-500 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Tính năng
              </a>
              <a href="#demo" className={`font-semibold hover:text-blue-500 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Demo
              </a>
              <a href="#journey" className={`font-semibold hover:text-blue-500 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Hành trình
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-blue-100 hover:bg-blue-200'
                }`}
              >
                {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
              </button>

              <div className="hidden md:flex items-center gap-2.5">
                <button className={`px-5 py-2 rounded-full font-semibold transition-all hover:scale-105 ${
                  isDark 
                    ? 'border-2 border-blue-400 text-blue-400 hover:bg-blue-500/10' 
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}>
                  Đăng nhập
                </button>
                <button className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105">
                  Đăng ký miễn phí
                </button>
              </div>

              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden mt-4 pb-4 ${isDark ? 'border-t border-blue-500/20' : 'border-t border-blue-200'}`}>
              <div className="flex flex-col gap-3 pt-4">
                <a href="#features" className="font-semibold hover:text-blue-500 transition-colors py-1">Tính năng</a>
                <a href="#demo" className="font-semibold hover:text-blue-500 transition-colors py-1">Demo</a>
                <a href="#journey" className="font-semibold hover:text-blue-500 transition-colors py-1">Hành trình</a>
                <div className="flex flex-col gap-2 pt-2 border-t border-blue-500/20 mt-2">
                  <button className="px-5 py-2 rounded-full font-semibold border-2 border-blue-500 text-blue-500">
                    Đăng nhập
                  </button>
                  <button className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    Đăng ký miễn phí
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  StudyQuest
                </span>
              </h1>
              
              <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Biến học tập thành cuộc phiêu lưu epic! Chinh phục kiến thức với XP, badges, và streaks. Mỗi bài học là một quest, mỗi thành tựu là một chiến thắng!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <button className="px-7 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-base hover:from-blue-600 hover:to-cyan-600 shadow-xl shadow-blue-500/40 transform hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Gamepad2 size={20} />
                  Bắt đầu Adventure
                </button>
                <button className={`px-7 py-3.5 rounded-full font-bold text-base transition-all hover:scale-105 flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'border-2 border-blue-400 text-blue-400 hover:bg-blue-500/10' 
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}>
                  <Zap size={20} />
                  Xem Demo
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
                {[
                  { number: "1.0M", label: "Adventurers" },
                  { number: "500K", label: "Quests Completed" },
                  { number: "50.0M", label: "XP Earned" },
                  { number: "99", label: "Fun Rating" }
                ].map((stat, i) => (
                  <div key={i} className={`p-4 rounded-xl backdrop-blur-lg border transition-all hover:scale-105 ${
                    isDark 
                      ? 'bg-slate-800/50 border-blue-500/20 hover:border-blue-400/40' 
                      : 'bg-white/70 border-blue-200 hover:border-blue-300'
                  }`}>
                    <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                      {stat.number}
                    </div>
                    <div className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Floating Cards */}
              <div className="absolute top-[5%] left-[5%] animate-float">
                <div className={`p-3.5 rounded-xl backdrop-blur-lg border shadow-xl ${
                  isDark 
                    ? 'bg-blue-500/20 border-blue-400/30' 
                    : 'bg-white/90 border-blue-200'
                }`}>
                  <div className="text-xl font-bold text-yellow-500">+250 XP</div>
                  <div className="text-xs opacity-80">Quiz Completed!</div>
                </div>
              </div>

              <div className="absolute top-[55%] right-[5%] animate-float" style={{animationDelay: '1s'}}>
                <div className="p-3.5 rounded-xl backdrop-blur-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-xl text-white">
                  <div className="text-xl font-bold">🔥 7 Days</div>
                  <div className="text-xs">Learning Streak</div>
                </div>
              </div>

              <div className="absolute bottom-[5%] left-[15%] animate-float" style={{animationDelay: '2s'}}>
                <div className="p-3.5 rounded-xl backdrop-blur-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl text-white">
                  <div className="text-xl font-bold">⭐ Level 12</div>
                  <div className="text-xs">Knowledge Seeker</div>
                </div>
              </div>

              {/* Center Icon */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse-slow">
                <Target size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-16 px-4 ${isDark ? 'bg-slate-900/30' : 'bg-white/50'} backdrop-blur-sm`}>
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Gamepad2 className="text-blue-500" size={36} />
            <span>Tính Năng Game Đỉnh Cao</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: BookOpen, title: "Lộ Trình Học Tập", desc: "Roadmap cá nhân hóa, adaptive difficulty theo tiến độ", color: "from-blue-500 to-cyan-500" },
              { icon: Target, title: "Nhiệm Vụ Hàng Ngày", desc: "Daily quests, weekly challenges và rewards", color: "from-cyan-500 to-teal-500" },
              { icon: Users, title: "Luyện Tập Kỹ Năng", desc: "Practice Listening, Speaking, Reading, Writing", color: "from-teal-500 to-green-500" },
              { icon: Trophy, title: "Bảng Xếp Hạng", desc: "Compete với friends và global rankings", color: "from-blue-600 to-indigo-600" },
              { icon: Clock, title: "Chuỗi Học Tập", desc: "Maintain streaks và unlock bonuses", color: "from-orange-500 to-red-500" },
              { icon: Award, title: "Huy Hiệu & Thành Tựu", desc: "Collect badges và showcase progress", color: "from-yellow-500 to-orange-500" },
              { icon: MessageSquare, title: "Cộng Đồng", desc: "Join groups, share tips và mentor others", color: "from-purple-500 to-pink-500" },
              { icon: ShoppingBag, title: "Cửa Hàng", desc: "Earn coins, unlock avatars và themes", color: "from-pink-500 to-rose-500" }
            ].map((feature, i) => (
              <div
                key={i}
                className={`group p-5 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                  isDark 
                    ? 'bg-slate-800/40 border-blue-500/20 hover:border-blue-400/40 hover:shadow-blue-500/20' 
                    : 'bg-white/80 border-blue-200 hover:border-blue-300 hover:shadow-blue-200/50'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-blue-500">{feature.title}</h3>
                <p className={`text-sm leading-snug ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Demo */}
      <section id="demo" className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3">
            <Target className="text-blue-500" size={36} />
            <span>Thử Engine Quiz Epic</span>
          </h2>

          <div className={`p-6 md:p-8 rounded-2xl backdrop-blur-lg border-2 shadow-2xl ${
            isDark 
              ? 'bg-slate-800/50 border-blue-500/30' 
              : 'bg-white/90 border-blue-200'
          }`}>
            <div className="text-xl md:text-2xl font-bold mb-6 text-center text-blue-500">
              🧠 Từ "Adventure" nghĩa là gì?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(index, option.correct)}
                  disabled={showQuizResult}
                  className={`p-3.5 rounded-xl border-2 font-medium transition-all transform hover:scale-105 disabled:cursor-not-allowed text-sm md:text-base
                    ${selectedAnswer === index
                      ? option.correct
                        ? 'bg-green-500 border-green-400 text-white scale-105'
                        : 'bg-red-500 border-red-400 text-white'
                      : isDark
                        ? 'bg-slate-700/50 border-blue-500/30 hover:bg-slate-700 hover:border-blue-400'
                        : 'bg-white border-blue-200 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {showQuizResult && (
              <div className={`mt-5 p-4 rounded-xl text-center font-bold text-base animate-fade-in
                ${selectedAnswer !== null && quizOptions[selectedAnswer].correct
                  ? 'bg-green-500/20 text-green-500 border-2 border-green-400'
                  : 'bg-red-500/20 text-red-500 border-2 border-red-400'
                }`}>
                {selectedAnswer !== null && quizOptions[selectedAnswer].correct
                  ? '🎉 Chính xác! +100 XP earned!'
                  : '💫 Thử lại! Học từ sai lầm để stronger!'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className={`py-16 px-4 ${isDark ? 'bg-slate-900/30' : 'bg-white/50'} backdrop-blur-sm`}>
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Trophy className="text-blue-500" size={36} />
            <span>Hành Trình Học Tập</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "1️⃣", title: "Tạo Tài Khoản", desc: "Đăng ký miễn phí và customize avatar của bạn" },
              { emoji: "2️⃣", title: "Chọn Lộ Trình", desc: "AI tạo roadmap cá nhân hóa theo level của bạn" },
              { emoji: "3️⃣", title: "Hoàn Thành Quest", desc: "Daily missions, earn XP và unlock achievements" },
              { emoji: "4️⃣", title: "Luyện Kỹ Năng", desc: "Practice listening, speaking, reading, writing" },
              { emoji: "5️⃣", title: "Thi Đấu & Cộng Đồng", desc: "Battle friends và participate in tournaments" },
              { emoji: "6️⃣", title: "Thành Thạo", desc: "Master languages và mentor others" }
            ].map((step, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/40 border-blue-500/20 hover:border-blue-400/40' 
                    : 'bg-white/80 border-blue-200 hover:border-blue-300'
                }`}
              >
                <div className="text-4xl mb-3">{step.emoji}</div>
                <h3 className="text-lg font-bold mb-2 text-blue-500">{step.title}</h3>
                <p className={`text-sm leading-snug ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white">
            🎉 Sẵn Sàng Cho Cuộc Phiêu Lưu Epic?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Tham gia hàng triệu học viên đã biến giáo dục thành gaming epic. Quest của bạn đang chờ!
          </p>
          <button className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-2xl transform hover:scale-110 transition-all flex items-center gap-2 mx-auto">
            <Trophy size={24} />
            Bắt Đầu Hành Trình - MIỄN PHÍ
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 ${isDark ? 'bg-slate-900/50 border-t border-blue-500/20' : 'bg-white/80 border-t border-blue-200'} backdrop-blur-lg`}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-500">StudyQuest</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nền tảng học tập game hóa biến giáo dục thành cuộc phiêu lưu epic! 🎮
              </p>
            </div>
            
            {[
              { 
                title: "Tính Năng", 
                items: ['🎮 Gamification', '📱 Mobile App', '🤖 AI Generator', '⚔️ PvP Arena'] 
              },
              { 
                title: "Cộng Đồng", 
                items: ['🏆 Leaderboard', '💬 Discord', '🎥 YouTube', '📧 Newsletter'] 
              },
              { 
                title: "Hỗ Trợ", 
                items: ['❓ Help Center', '🎤 Contact', '🐛 Bug Report', '💡 Features'] 
              }
            ].map((col, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold mb-3 text-blue-500">{col.title}</h3>
                <ul className="space-y-1.5">
                  {col.items.map((item, j) => (
                    <li key={j} className={`text-sm hover:text-blue-500 cursor-pointer transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`pt-6 border-t ${isDark ? 'border-blue-500/20' : 'border-blue-200'} text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>&copy; 2025 StudyQuest. Made with 💙 for epic learners worldwide.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-fade-in {
          animation: fade-in-up 0.5s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}