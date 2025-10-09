// Mock API cho authentication
// Thay thế cho việc gọi API thật tới localhost:3001

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
  }
}

// Mock database - Lưu trong memory (hoặc có thể dùng localStorage để persist)
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

// Load users from localStorage if exists
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

// Mock Login API
export const mockLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  await delay() // Simulate network delay

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

  return {
    success: true,
    message: "Đăng nhập thành công!",
    data: {
      access_token: token,
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  }
}

// Mock Register API
export const mockRegister = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  await delay() // Simulate network delay

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
    },
  }
}

// Mock Get User Info API
export const mockGetUserInfo = async (userId: number) => {
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
        level: 1,
        totalXp: 0,
        currentStreak: 0,
        maxStreak: 0,
        totalGems: 0,
        hearts: 5,
        role: user.role,
        defaultLanguageId: null,
        studyMinutesPerDay: 30,
        currentAvatarId: null,
      },
      selectedLanguage: null,
      progress: null,
    },
  }
}

// Mock Logout
export const mockLogout = () => {
  if (typeof window === "undefined") return
  
  localStorage.removeItem("access_token")
  localStorage.removeItem("user_id")
  localStorage.removeItem("user_role")
  localStorage.removeItem("user_info")
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  
  const token = localStorage.getItem("access_token")
  return !!token
}

// Get current user role
export const getCurrentUserRole = (): "user" | "admin" | null => {
  if (typeof window === "undefined") return null
  
  const role = localStorage.getItem("user_role")
  return role as "user" | "admin" | null
}