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

// export default function RegisterPage() {
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const { register } = useAuth()
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       await register(username, email, password)
//       router.push("/dashboard")
//     } catch (error) {
//       console.error("Registration failed:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md shadow-2xl border-0">
//         <CardHeader className="text-center pb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-4 animate-pulse-glow">
//             <span className="text-2xl font-bold text-white">SQ</span>
//           </div>
//           <CardTitle className="text-3xl font-bold">Start Your Journey</CardTitle>
//           <CardDescription className="text-base">Create your free account and begin learning</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="coollearner123"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="h-12"
//               />
//             </div>

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
//                   Create Account
//                 </>
//               )}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link href="/login" className="text-primary font-semibold hover:underline">
//                 Sign in
//               </Link>
//             </p>
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
import { Sparkles, Eye, EyeOff, Mail, User } from "lucide-react"
import { mockRegister } from "@/lib/mock-api"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
    general?: string
  }>({})
  const router = useRouter()

  const validateUsername = (username: string) => {
    if (username.length < 3) return "Tên đăng nhập phải có ít nhất 3 ký tự"
    if (username.length > 20) return "Tên đăng nhập không được quá 20 ký tự"
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Tên đăng nhập chỉ được chứa chữ, số và dấu gạch dưới"
    return null
  }

  const validateEmail = (email: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email không hợp lệ"
    return null
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự"
    if (!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ hoa"
    if (!/[0-9]/.test(password)) return "Mật khẩu phải có ít nhất 1 số"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validation
    const newErrors: typeof errors = {}
    
    const usernameError = validateUsername(username)
    if (usernameError) newErrors.username = usernameError

    const emailError = validateEmail(email)
    if (emailError) newErrors.email = emailError

    const passwordError = validatePassword(password)
    if (passwordError) newErrors.password = passwordError

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const result = await mockRegister(username, email, password)
      
      if (result.success) {
        // Auto login sau khi đăng ký
        localStorage.setItem("access_token", result.data.access_token)
        localStorage.setItem("user_id", result.data.userId.toString())
        localStorage.setItem("user_role", "user")
        localStorage.setItem("user_info", JSON.stringify({
          id: result.data.userId,
          email: result.data.email,
          username: result.data.username,
          role: "user"
        }))

        // Chuyển đến dashboard
        router.push("/dashboard")
      } else {
        setErrors({ general: result.message })
      }
    } catch (err) {
      setErrors({ general: "Đã xảy ra lỗi. Vui lòng thử lại!" })
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
            Bắt Đầu Hành Trình
          </CardTitle>
          <CardDescription className="text-base">
            Tạo tài khoản miễn phí và bắt đầu học ngay
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold">
                Tên đăng nhập
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  placeholder="VD: KnowledgeWarrior2025"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`h-12 pl-10 border-2 transition-all ${
                    errors.username ? "border-red-500" : "focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.username}</p>
              )}
            </div>

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
                  className={`h-12 pl-10 border-2 transition-all ${
                    errors.email ? "border-red-500" : "focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tối thiểu 8 ký tự"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`h-12 pr-10 border-2 transition-all ${
                    errors.password ? "border-red-500" : "focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                Xác nhận mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`h-12 pr-10 border-2 transition-all ${
                    errors.confirmPassword ? "border-red-500" : "focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
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
                  Tạo Tài Khoản
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                hoặc đăng ký với
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              onClick={() => alert("Google signup coming soon!")}
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
              onClick={() => alert("Facebook signup coming soon!")}
            >
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
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