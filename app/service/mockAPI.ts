// mockAPI.ts - Mock Authentication Service
// Place this file in: src/services/mockAPI.ts or src/lib/mockAPI.ts

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  displayName: string;
  level: number;
  totalXp: number;
  totalGems: number;
  currentStreak?: number;
  maxStreak?: number;
  hearts?: number;
  defaultLanguageId: number | null;
  studyMinutesPerDay?: number;
  avatarUrl?: string;
  currentAvatarId?: number;
}

interface LoginResponse {
  access_token: string;
  userId: number;
  role: string;
  message: string;
}

interface RegisterResponse extends LoginResponse {}

interface UserDataResponse {
  user: {
    id: number;
    username: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    level: number;
    totalXp: number;
    currentStreak: number;
    maxStreak: number;
    totalGems: number;
    hearts: number;
    role: string;
    defaultLanguageId: number | null;
    studyMinutesPerDay: number;
    currentAvatarId?: number;
  };
  selectedLanguage: {
    id: number;
    name: string;
    code: string;
    flagIcon: string;
    isActive: boolean;
    unlockRequirementXp: number;
  } | null;
  progress: {
    completedLessons: number;
    currentStreak: number;
  };
}

// ============= MOCK DATABASE =============
const mockUsers: User[] = [
  { 
    id: 1, 
    username: 'admin', 
    email: 'admin@studyquest.com', 
    password: 'Admin123', 
    role: 'admin',
    displayName: 'Admin User',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    level: 10,
    totalXp: 5000,
    currentStreak: 15,
    maxStreak: 30,
    totalGems: 1000,
    hearts: 5,
    defaultLanguageId: 1,
    studyMinutesPerDay: 60,
    currentAvatarId: 1
  },
  { 
    id: 2, 
    username: 'student1', 
    email: 'student@studyquest.com', 
    password: 'Student123', 
    role: 'student',
    displayName: 'Test Student',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    level: 5,
    totalXp: 2500,
    currentStreak: 7,
    maxStreak: 10,
    totalGems: 500,
    hearts: 5,
    defaultLanguageId: 2,
    studyMinutesPerDay: 30,
    currentAvatarId: 2
  },
  { 
    id: 3, 
    username: 'newuser', 
    email: 'newuser@studyquest.com', 
    password: 'NewUser123', 
    role: 'student',
    displayName: 'New User',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    level: 1,
    totalXp: 0,
    currentStreak: 0,
    maxStreak: 0,
    totalGems: 0,
    hearts: 5,
    defaultLanguageId: null, // Chưa chọn ngôn ngữ
    studyMinutesPerDay: 30,
    currentAvatarId: 3
  }
];

// ============= MOCK API FUNCTIONS =============
const mockAPI = {
  /**
   * Mock Login
   * @param email - User email
   * @param password - User password
   * @returns Login response with token and user info
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw { 
        status: 401, 
        message: 'Email hoặc mật khẩu không đúng!' 
      };
    }

    console.log('✅ Mock Login Success:', user.email);

    return {
      access_token: `mock_token_${user.id}_${Date.now()}`,
      userId: user.id,
      role: user.role,
      message: 'Login successful'
    };
  },

  /**
   * Mock Register
   * @param username - Username
   * @param email - User email
   * @param password - User password
   * @returns Registration response with token
   */
  register: async (username: string, email: string, password: string): Promise<RegisterResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const exists = mockUsers.find(u => u.email === email || u.username === username);
    
    if (exists) {
      throw { 
        status: 409, 
        message: 'Email hoặc username đã tồn tại!' 
      };
    }

    const newUser: User = {
      id: mockUsers.length + 1,
      username,
      email,
      password,
      role: 'student',
      displayName: username,
      avatarUrl: `https://i.pravatar.cc/150?img=${mockUsers.length + 1}`,
      level: 1,
      totalXp: 0,
      currentStreak: 0,
      maxStreak: 0,
      totalGems: 0,
      hearts: 5,
      defaultLanguageId: null, // Chưa chọn ngôn ngữ
      studyMinutesPerDay: 30,
      currentAvatarId: mockUsers.length + 1
    };

    mockUsers.push(newUser);
    console.log('✅ Mock Register Success:', newUser.email);

    return {
      access_token: `mock_token_${newUser.id}_${Date.now()}`,
      userId: newUser.id,
      role: newUser.role,
      message: 'Registration successful'
    };
  },

  /**
   * Mock Get User Data with Language Context
   * @param userId - User ID
   * @returns Full user data with language and progress
   */
  getUserData: async (userId: number): Promise<UserDataResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw { 
        status: 404, 
        message: 'User not found' 
      };
    }

    console.log('✅ Mock User Data Fetched:', user.username);

    // Mock language data
    const languages = [
      { id: 1, name: 'English', code: 'en', flagIcon: '🇬🇧', isActive: true, unlockRequirementXp: 0 },
      { id: 2, name: 'Spanish', code: 'es', flagIcon: '🇪🇸', isActive: true, unlockRequirementXp: 0 },
      { id: 3, name: 'French', code: 'fr', flagIcon: '🇫🇷', isActive: true, unlockRequirementXp: 100 },
      { id: 4, name: 'Japanese', code: 'ja', flagIcon: '🇯🇵', isActive: true, unlockRequirementXp: 200 }
    ];

    const selectedLanguage = user.defaultLanguageId 
      ? languages.find(lang => lang.id === user.defaultLanguageId) || null
      : null;

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        level: user.level,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak || 0,
        maxStreak: user.maxStreak || 0,
        totalGems: user.totalGems,
        hearts: user.hearts || 5,
        role: user.role,
        defaultLanguageId: user.defaultLanguageId,
        studyMinutesPerDay: user.studyMinutesPerDay || 30,
        currentAvatarId: user.currentAvatarId
      },
      selectedLanguage,
      progress: {
        completedLessons: user.level * 2, // Mock: 2 lessons per level
        currentStreak: user.currentStreak || 0
      }
    };
  },

  /**
   * Get all mock users (for debugging)
   */
  getAllUsers: () => mockUsers,

  /**
   * Reset mock database
   */
  resetDatabase: () => {
    mockUsers.length = 3; // Keep only first 3 users
    console.log('🔄 Mock database reset');
  }
};

export default mockAPI;

// Export types for use in components
export type { 
  User, 
  LoginResponse, 
  RegisterResponse, 
  UserDataResponse 
};