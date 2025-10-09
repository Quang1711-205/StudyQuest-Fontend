// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// interface User {
//   id: string
//   username: string
//   email: string
//   avatar: string
//   level: number
//   xp: number
//   coins: number
//   gems: number
//   streak: number
//   isPro: boolean
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<void>
//   register: (username: string, email: string, password: string) => Promise<void>
//   logout: () => void
//   isLoading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check for stored auth token
//     const token = localStorage.getItem("auth_token")
//     const storedUser = localStorage.getItem("user")

//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser))
//     }

//     setIsLoading(false)
//   }, [])

//   const login = async (email: string, password: string) => {
//     // Mock login - replace with actual API call
//     const mockUser: User = {
//       id: "1",
//       username: email.split("@")[0],
//       email,
//       avatar: "/diverse-user-avatars.png",
//       level: 5,
//       xp: 1250,
//       coins: 500,
//       gems: 50,
//       streak: 7,
//       isPro: false,
//     }

//     localStorage.setItem("auth_token", "mock_token_123")
//     localStorage.setItem("user", JSON.stringify(mockUser))
//     setUser(mockUser)
//   }

//   const register = async (username: string, email: string, password: string) => {
//     // Mock register - replace with actual API call
//     const mockUser: User = {
//       id: "1",
//       username,
//       email,
//       avatar: "/diverse-user-avatars.png",
//       level: 1,
//       xp: 0,
//       coins: 100,
//       gems: 10,
//       streak: 0,
//       isPro: false,
//     }

//     localStorage.setItem("auth_token", "mock_token_123")
//     localStorage.setItem("user", JSON.stringify(mockUser))
//     setUser(mockUser)
//   }

//   const logout = () => {
//     localStorage.removeItem("auth_token")
//     localStorage.removeItem("user")
//     setUser(null)
//   }

//   return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }


"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockLogin } from "@/lib/mock-api" // Import mockLogin

interface User {
  id: string
  username: string
  email: string
  avatar: string
  level: number
  xp: number
  coins: number
  gems: number
  streak: number
  isPro: boolean
  role?: string // Thêm role
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Sử dụng mockLogin từ API
    const result = await mockLogin(email, password)
    
    if (!result.success) {
      throw new Error(result.message)
    }

    const mockUser: User = {
      id: result.data.userId.toString(),
      username: result.data.username,
      email: result.data.email,
      avatar: "/diverse-user-avatars.png",
      level: 5,
      xp: 1250,
      coins: 500,
      gems: 50,
      streak: 7,
      isPro: false,
      role: result.data.role, // Lưu role
    }

    localStorage.setItem("auth_token", result.data.access_token)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const register = async (username: string, email: string, password: string) => {
    // Mock register - replace with actual API call
    const mockUser: User = {
      id: "1",
      username,
      email,
      avatar: "/diverse-user-avatars.png",
      level: 1,
      xp: 0,
      coins: 100,
      gems: 10,
      streak: 0,
      isPro: false,
      role: "user",
    }

    localStorage.setItem("auth_token", "mock_token_123")
    localStorage.setItem("user", JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    localStorage.removeItem("access_token")
    localStorage.removeItem("user_info")
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_role")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}