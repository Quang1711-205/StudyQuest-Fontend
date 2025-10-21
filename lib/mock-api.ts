// lib/mock-api-enhanced.ts
// Enhanced Mock API with Language Management

import { getUserLanguages, setActiveLanguage, addLanguage, UserLanguage } from './language-utils'

interface User {
  id: number
  username: string
  email: string
  password: string
  role: "user" | "admin"
}

interface LoginResponse {
  success: boolean
  message: string
  data: {
    access_token: string
    userId: number
    email: string
    username: string
    role: "user" | "admin"
    activeLanguage: string | null
    languages: UserLanguage[]
  }
}

interface RegisterResponse {
  success: boolean
  message: string
  data: {
    access_token: string
    userId: number
    email: string
    username: string
    role: "user"
    activeLanguage: null
    languages: []
  }
}

interface LanguageSelectionResponse {
  success: boolean
  message: string
  data: {
    languageCode: string
    languages: UserLanguage[]
  }
}

// Mock database
const MOCK_USERS: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@demo.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    email: "user@demo.com",
    password: "password123",
    role: "user",
  },
]

// Load users from localStorage
const loadUsers = (): User[] => {
  if (typeof window === "undefined") return MOCK_USERS
  
  const stored = localStorage.getItem("mock_users")
  if (stored) {
    return JSON.parse(stored)
  }
  return MOCK_USERS
}

// Save users to localStorage
const saveUsers = (users: User[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem("mock_users", JSON.stringify(users))
}

// Generate mock JWT token
const generateToken = (userId: number, role: string): string => {
  const payload = {
    userId,
    role,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }
  return `mock_token_${btoa(JSON.stringify(payload))}`
}

// Simulate network delay
const delay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock Login API with Language Data
export const mockLoginWithLanguage = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  await delay()

  const users = loadUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return {
      success: false,
      message: "Email hoặc mật khẩu không đúng!",
      data: null as any,
    }
  }

  const token = generateToken(user.id, user.role)
  
  // Get user's languages
  const userLanguages = getUserLanguages(user.id.toString())
  const activeLanguage = userLanguages.find(lang => lang.isActive)

  return {
    success: true,
    message: "Đăng nhập thành công!",
    data: {
      access_token: token,
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      activeLanguage: activeLanguage?.code || null,
      languages: userLanguages,
    },
  }
}

// Mock Register API
export const mockRegisterWithLanguage = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  await delay()

  const users = loadUsers()

  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    return {
      success: false,
      message: "Email đã được sử dụng!",
      data: null as any,
    }
  }

  // Check if username already exists
  if (users.some((u) => u.username === username)) {
    return {
      success: false,
      message: "Tên đăng nhập đã được sử dụng!",
      data: null as any,
    }
  }

  // Create new user
  const newUser: User = {
    id: users.length + 1,
    username,
    email,
    password,
    role: "user",
  }

  users.push(newUser)
  saveUsers(users)

  const token = generateToken(newUser.id, newUser.role)

  return {
    success: true,
    message: "Đăng ký thành công!",
    data: {
      access_token: token,
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
      role: "user",
      activeLanguage: null,
      languages: [],
    },
  }
}

// Mock Language Selection API
export const mockSelectLanguage = async (
  userId: number,
  languageCode: string
): Promise<LanguageSelectionResponse> => {
  await delay(1000)

  // Add language and set as active
  addLanguage(userId.toString(), languageCode, true)
  
  // Get updated languages
  const userLanguages = getUserLanguages(userId.toString())

  return {
    success: true,
    message: "Ngôn ngữ đã được chọn thành công!",
    data: {
      languageCode,
      languages: userLanguages,
    },
  }
}

// Mock Switch Language API
export const mockSwitchLanguage = async (
  userId: number,
  languageCode: string
): Promise<LanguageSelectionResponse> => {
  await delay(500)

  // Set language as active
  setActiveLanguage(userId.toString(), languageCode)
  
  // Get updated languages
  const userLanguages = getUserLanguages(userId.toString())

  return {
    success: true,
    message: "Đã chuyển đổi ngôn ngữ!",
    data: {
      languageCode,
      languages: userLanguages,
    },
  }
}

// Mock Get User Languages API
export const mockGetUserLanguages = async (
  userId: number
): Promise<{ success: boolean; data: UserLanguage[] }> => {
  await delay(300)

  const userLanguages = getUserLanguages(userId.toString())

  return {
    success: true,
    data: userLanguages,
  }
}

// Mock Get User Info with Language Data
export const mockGetUserInfoWithLanguage = async (userId: number) => {
  await delay(500)

  const users = loadUsers()
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return {
      success: false,
      message: "User not found",
      data: null,
    }
  }

  const userLanguages = getUserLanguages(userId.toString())
  const activeLanguage = userLanguages.find(lang => lang.isActive)

  return {
    success: true,
    message: "User info retrieved",
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.username,
        avatarUrl: `https://ui-avatars.com/api/?name=${user.username}&background=random`,
        level: activeLanguage?.progress?.level || 1,
        totalXp: activeLanguage?.progress?.xp || 0,
        currentStreak: 0,
        maxStreak: 0,
        totalGems: 0,
        hearts: 5,
        role: user.role,
        activeLanguage: activeLanguage?.code || null,
        studyMinutesPerDay: 30,
        currentAvatarId: null,
      },
      languages: userLanguages,
      activeLanguage: activeLanguage || null,
    },
  }
}

// Backward compatibility - keep original functions
export const mockLogin = mockLoginWithLanguage
export const mockRegister = mockRegisterWithLanguage

// Mock Logout
export const mockLogout = () => {
  if (typeof window === "undefined") return
  
  localStorage.removeItem("access_token")
  localStorage.removeItem("user_id")
  localStorage.removeItem("user_role")
  localStorage.removeItem("user_info")
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user")
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  
  const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token")
  return !!token
}

// Get current user role
export const getCurrentUserRole = (): "user" | "admin" | null => {
  if (typeof window === "undefined") return null
  
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    const userData = JSON.parse(storedUser)
    return userData.role
  }
  
  const role = localStorage.getItem("user_role")
  return role as "user" | "admin" | null
}