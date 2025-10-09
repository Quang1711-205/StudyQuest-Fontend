// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import { Sparkles } from "lucide-react"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const { login } = useAuth()
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       await login(email, password)
//       router.push("/dashboard")
//     } catch (error) {
//       console.error("Login failed:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md shadow-2xl border-0">
//         <CardHeader className="text-center pb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-4">
//             <span className="text-2xl font-bold text-white">SQ</span>
//           </div>
//           <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
//           <CardDescription className="text-base">Continue your language learning journey</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="h-12"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="h-12"
//               />
//             </div>

//             <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <Sparkles className="w-5 h-5 mr-2" />
//                   Sign In
//                 </>
//               )}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link href="/register" className="text-primary font-semibold hover:underline">
//                 Sign up free
//               </Link>
//             </p>
//           </div>

//           {/* Demo Credentials */}
//           <div className="mt-6 p-4 bg-muted rounded-lg">
//             <p className="text-xs text-muted-foreground text-center">Demo: Use any email/password to login</p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Eye, EyeOff, Mail } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Starting login...")
      
      // Sử dụng login từ AuthContext
      await login(email, password)
      
      console.log("Login successful, checking user data...")
      
      // Đọc user từ localStorage để check role
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        console.log("User data:", userData)
        
        // Redirect dựa trên role
        const redirectPath = userData.role === "admin" ? "/admin" : "/dashboard"
        console.log("Redirecting to:", redirectPath)
        
        // Force reload để đảm bảo context được update
        window.location.href = redirectPath
      } else {
        console.error("No user data found in localStorage")
        setError("Lỗi lưu thông tin đăng nhập")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Email hoặc mật khẩu không đúng!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center p-4">
      {/* Floating Shapes Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${
              i % 3 === 0 ? "from-blue-400 to-blue-600" :
              i % 3 === 1 ? "from-purple-400 to-purple-600" :
              "from-pink-400 to-pink-600"
            } opacity-30`} />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 relative z-10 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        <CardHeader className="text-center pb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 animate-pulse">
            <span className="text-2xl font-bold text-white">SQ</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Chào Mừng Trở Lại!
          </CardTitle>
          <CardDescription className="text-base">
            Tiếp tục hành trình học tập của bạn
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-10 border-2 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10 border-2 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Đăng Nhập
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              onClick={() => alert("Google login coming soon!")}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              onClick={() => alert("Facebook login coming soon!")}
            >
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          {/* <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-2">
              🎯 Tài khoản Demo:
            </p>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <p>👤 User: user@demo.com / password123</p>
              <p>👨‍💼 Admin: admin@demo.com / admin123</p>
            </div>
          </div> */}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}