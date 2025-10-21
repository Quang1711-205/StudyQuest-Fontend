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


// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// import { mockLogin } from "@/lib/mock-api" // Import mockLogin

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
//   role?: string // Thêm role
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
//     // Sử dụng mockLogin từ API
//     const result = await mockLogin(email, password)
    
//     if (!result.success) {
//       throw new Error(result.message)
//     }

//     const mockUser: User = {
//       id: result.data.userId.toString(),
//       username: result.data.username,
//       email: result.data.email,
//       avatar: "/diverse-user-avatars.png",
//       level: 5,
//       xp: 1250,
//       coins: 500,
//       gems: 50,
//       streak: 7,
//       isPro: false,
//       role: result.data.role, // Lưu role
//     }

//     localStorage.setItem("auth_token", result.data.access_token)
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
//       role: "user",
//     }

//     localStorage.setItem("auth_token", "mock_token_123")
//     localStorage.setItem("user", JSON.stringify(mockUser))
//     setUser(mockUser)
//   }

//   const logout = () => {
//     localStorage.removeItem("auth_token")
//     localStorage.removeItem("user")
//     localStorage.removeItem("access_token")
//     localStorage.removeItem("user_info")
//     localStorage.removeItem("user_id")
//     localStorage.removeItem("user_role")
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



// Được chọn mockapi
// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// import { mockLoginWithLanguage, mockRegisterWithLanguage } from "@/lib/mock-api"

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
//   role?: string
//   activeLanguage?: string | null
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<void>
//   register: (username: string, email: string, password: string) => Promise<void>
//   logout: () => void
//   isLoading: boolean
//   hasActiveLanguage: () => boolean
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

//   const hasActiveLanguage = (): boolean => {
//     if (!user) return false
    
//     const userLanguagesKey = `user_languages_${user.id}`
//     const existingLanguages = localStorage.getItem(userLanguagesKey)
    
//     if (!existingLanguages) return false
    
//     const languagesArray = JSON.parse(existingLanguages)
//     return languagesArray.some((lang: any) => lang.isActive === true)
//   }

//   const login = async (email: string, password: string) => {
//     // Sử dụng mockLoginWithLanguage từ API
//     const result = await mockLoginWithLanguage(email, password)
    
//     if (!result.success) {
//       throw new Error(result.message)
//     }

//     const mockUser: User = {
//       id: result.data.userId.toString(),
//       username: result.data.username,
//       email: result.data.email,
//       avatar: "/diverse-user-avatars.png",
//       level: 5,
//       xp: 1250,
//       coins: 500,
//       gems: 50,
//       streak: 7,
//       isPro: false,
//       role: result.data.role,
//       activeLanguage: result.data.activeLanguage,
//     }

//     localStorage.setItem("auth_token", result.data.access_token)
//     localStorage.setItem("user", JSON.stringify(mockUser))
//     setUser(mockUser)
//   }

//   const register = async (username: string, email: string, password: string) => {
//     // Sử dụng mockRegisterWithLanguage
//     const result = await mockRegisterWithLanguage(username, email, password)
    
//     if (!result.success) {
//       throw new Error(result.message)
//     }

//     const mockUser: User = {
//       id: result.data.userId.toString(),
//       username: result.data.username,
//       email: result.data.email,
//       avatar: "/diverse-user-avatars.png",
//       level: 1,
//       xp: 0,
//       coins: 100,
//       gems: 10,
//       streak: 0,
//       isPro: false,
//       role: "user",
//       activeLanguage: null,
//     }

//     localStorage.setItem("auth_token", result.data.access_token)
//     localStorage.setItem("user", JSON.stringify(mockUser))
//     setUser(mockUser)
//   }

//   const logout = () => {
//     localStorage.removeItem("auth_token")
//     localStorage.removeItem("user")
//     localStorage.removeItem("access_token")
//     localStorage.removeItem("user_info")
//     localStorage.removeItem("user_id")
//     localStorage.removeItem("user_role")
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, isLoading, hasActiveLanguage }}>
//       {children}
//     </AuthContext.Provider>
//   )
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

interface User {
  id: number
  username: string
  email: string
  avatar?: string
  level?: number
  xp?: number
  coins: number
  gems: number
  streak?: number
  isPro?: boolean
  role?: string
  activeLanguage?: string | null
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (data: Partial<User>) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string, languageCode?: string) => Promise<void>
  logout: () => void
  refreshAccessToken: () => Promise<string | null>
  isLoading: boolean
  hasActiveLanguage: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("user")
    const accessToken = localStorage.getItem("access_token")

    if (storedUser && accessToken) {
      try {
        setUserState(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        logout()
      }
    }

    setIsLoading(false)
  }, [])

  const setUser = (user: User | null) => {
    setUserState(user)
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }

  /**
   * Update user data partially (for balance updates, etc.)
   */
  const updateUser = (data: Partial<User>) => {
    setUserState((prev) => {
      if (!prev) return null
      
      const updatedUser = { ...prev, ...data }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken)
    localStorage.setItem("refresh_token", refreshToken)
  }

  const hasActiveLanguage = (): boolean => {
    if (!user) return false
    
    const userLanguagesKey = `user_languages_${user.id}`
    const existingLanguages = localStorage.getItem(userLanguagesKey)
    
    if (!existingLanguages) return false
    
    try {
      const languagesArray = JSON.parse(existingLanguages)
      return languagesArray.some((lang: any) => lang.isActive === true)
    } catch {
      return false
    }
  }

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Đăng nhập thất bại")
    }

    // Save tokens
    setTokens(data.accessToken, data.refreshToken)
    
    // Save user
    setUser(data.user)
  }

  const register = async (
    username: string, 
    email: string, 
    password: string,
    languageCode: string = "en"
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        languageCode,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Đăng ký thất bại")
    }

    // Save tokens
    setTokens(data.accessToken, data.refreshToken)
    
    // Save user
    setUser(data.user)
  }

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem("refresh_token")
      
      if (!refreshToken) {
        throw new Error("No refresh token available")
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Token refresh failed")
      }

      // Update tokens
      setTokens(data.accessToken, data.refreshToken)
      
      return data.accessToken
    } catch (error) {
      console.error("Failed to refresh token:", error)
      logout()
      return null
    }
  }

  const logout = () => {
    // Clear all auth-related data
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_info")
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_role")
    
    setUserState(null)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser,
        updateUser,
        setTokens,
        login, 
        register, 
        logout, 
        refreshAccessToken,
        isLoading, 
        hasActiveLanguage 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}