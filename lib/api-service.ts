// // lib/api-service.ts
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// // Helper function to get auth token
// const getAuthToken = (): string | null => {
//   if (typeof window === 'undefined') return null;
//   return localStorage.getItem('accessToken');
// };

// // Helper function for API calls
// async function apiCall<T>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   const token = getAuthToken();
  
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...(token && { Authorization: `Bearer ${token}` }),
//     ...options.headers,
//   };

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   if (!response.ok) {
//     const error = await response.json().catch(() => ({ message: 'Network error' }));
//     throw new Error(error.message || `HTTP ${response.status}`);
//   }

//   return response.json();
// }

// // ============ USERS API ============
// export interface UserProfile {
//   id: string;
//   username: string;
//   email: string;
//   avatar?: string;
//   coins: number;
//   gems: number;
//   streak: number;
//   level: number;
//   xp: number;
//   isPro: boolean;
//   darkMode: boolean;
//   interfaceLanguage: string;
//   activeLanguage?: string;
//   createdAt: string;
// }

// export interface UserStatistics {
//   totalLessonsCompleted: number;
//   totalPracticeCompleted: number;
//   totalXP: number;
//   currentStreak: number;
//   longestStreak: number;
//   studyTimeMinutes: number;
//   weeklyActivity: {
//     day: string;
//     lessonsCompleted: number;
//     xpEarned: number;
//   }[];
// }

// export interface UserLanguage {
//   id: string;
//   languageCode: string;
//   languageName: string;
//   languageFlag: string;
//   isActive: boolean;
//   progress: {
//     level: number;
//     xp: number;
//     lessonsCompleted: number;
//     currentTopic?: string;
//   };
//   createdAt: string;
// }

// export const usersAPI = {
//   getProfile: () => apiCall<UserProfile>('/users/profile'),
  
//   updateProfile: (data: { username?: string; darkMode?: boolean; interfaceLanguage?: string }) =>
//     apiCall<UserProfile>('/users/profile', {
//       method: 'PUT',
//       body: JSON.stringify(data),
//     }),
  
//   getStatistics: () => apiCall<UserStatistics>('/users/statistics'),
  
//   addLanguage: (languageCode: string) =>
//     apiCall('/users/languages', {
//       method: 'POST',
//       body: JSON.stringify({ languageCode }),
//     }),
  
//   switchLanguage: (languageId: string) =>
//     apiCall('/users/languages/switch', {
//       method: 'POST',
//       body: JSON.stringify({ languageId }),
//     }),
// };

// // ============ LEARNING API ============
// export interface Topic {
//   id: string;
//   title: string;
//   description: string;
//   order: number;
//   isLocked: boolean;
//   lessonsCompleted: number;
//   totalLessons: number;
//   lessons: Lesson[];
// }

// export interface Lesson {
//   id: string;
//   title: string;
//   description: string;
//   order: number;
//   isCompleted: boolean;
//   isLocked: boolean;
//   xpReward: number;
//   coinsReward: number;
// }

// export interface LearningMap {
//   topics: Topic[];
//   currentProgress: {
//     topicId: string;
//     lessonId: string;
//   };
// }

// export const learningAPI = {
//   getMap: () => apiCall<LearningMap>('/learning/map'),
  
//   getLessonDetail: (lessonId: string) =>
//     apiCall(`/learning/lessons/${lessonId}`),
  
//   startLesson: (lessonId: string) =>
//     apiCall('/learning/lessons/start', {
//       method: 'POST',
//       body: JSON.stringify({ lessonId }),
//     }),
  
//   completeLesson: (lessonId: string, totalTimeSpent: number) =>
//     apiCall('/learning/lessons/complete', {
//       method: 'POST',
//       body: JSON.stringify({ lessonId, totalTimeSpent }),
//     }),
// };

// // Helper for authenticated requests with better error handling
// async function fetchWithAuth(url: string, options: RequestInit = {}) {
//   const token = getAuthToken()
  
//   const response = await fetch(`${API_BASE_URL}${url}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...options.headers,
//     },
//   })

//   if (!response.ok) {
//     const error = await response.json().catch(() => ({ message: "Request failed" }))
//     throw new Error(error.message || `HTTP ${response.status}`)
//   }

//   // Check if response has content
//   const contentType = response.headers.get("content-type")
//   const contentLength = response.headers.get("content-length")
  
//   // If no content or empty body, return null
//   if (contentLength === "0" || !contentType?.includes("application/json")) {
//     return null
//   }

//   // Try to parse JSON, return null if fails
//   try {
//     const text = await response.text()
//     if (!text || text.trim() === "") {
//       return null
//     }
//     return JSON.parse(text)
//   } catch (error) {
//     console.error("Failed to parse JSON response:", error)
//     return null
//   }
// }


// // Placement Test API
// export const placementAPI = {
//   // Start a new test
//   async startTest(languageCode: string, testLevel: 'A' | 'B' | 'C') {
//     return fetchWithAuth("/placement/start", {
//       method: "POST",
//       body: JSON.stringify({ languageCode, testLevel }),
//     })
//   },

//   // Submit test answers
//   async submitTest(testId: number, answers: Array<{ questionId: number; answer: string }>) {
//     return fetchWithAuth("/placement/submit", {
//       method: "POST",
//       body: JSON.stringify({ testId, answers }),
//     })
//   },

//   // Get test history
//   async getTestHistory(languageCode?: string) {
//     const params = languageCode ? `?languageCode=${languageCode}` : ""
//     return fetchWithAuth(`/placement/history${params}`)
//   },

//   // Get test result details
//   async getTestResult(testId: number) {
//     return fetchWithAuth(`/placement/result/${testId}`)
//   },

//   // Check for in-progress test
//   async getInProgressTest(languageCode: string, testLevel: 'A' | 'B' | 'C') {
//     return fetchWithAuth(
//       `/placement/in-progress?languageCode=${languageCode}&testLevel=${testLevel}`
//     )
//   },

//   // Save progress (auto-save)
//   async saveProgress(data: {
//     testId: number
//     answers: Array<{ questionId: number; answer: string }>
//     currentQuestion: number
//     timeRemaining: number
//   }) {
//     return fetchWithAuth("/placement/save-progress", {
//       method: "POST",
//       body: JSON.stringify(data),
//     })
//   },

//   // Get test questions (for resume)
//   async getTestQuestions(testId: number) {
//     return fetchWithAuth(`/placement/questions/${testId}`)
//   },
// }

// // ============ PRACTICE API ============
// export interface PracticeLesson {
//   id: string;
//   title: string;
//   description: string;
//   skillType: 'listening' | 'speaking' | 'reading' | 'writing';
//   difficulty: 'easy' | 'medium' | 'hard';
//   questionsCount: number;
//   xpReward: number;
// }

// export const practiceAPI = {
//   getLessons: (skillType?: string) =>
//     apiCall<PracticeLesson[]>(`/practice/lessons${skillType ? `?skillType=${skillType}` : ''}`),
  
//   startLesson: (practiceLessonId: string) =>
//     apiCall('/practice/start', {
//       method: 'POST',
//       body: JSON.stringify({ practiceLessonId }),
//     }),
  
//   complete: (practiceLessonId: string, answers: any[], timeSpent: number) =>
//     apiCall('/practice/complete', {
//       method: 'POST',
//       body: JSON.stringify({ practiceLessonId, answers, timeSpent }),
//     }),
// };

// // ============ MISSIONS API ============
// export interface Mission {
//   id: string;
//   title: string;
//   description: string;
//   type: 'daily' | 'weekly';
//   targetValue: number;
//   currentValue: number;
//   isCompleted: boolean;
//   isClaimed: boolean;
//   rewards: {
//     xp: number;
//     coins: number;
//     gems?: number;
//   };
//   expiresAt: string;
// }

// export const missionsAPI = {
//   getAll: (type?: 'daily' | 'weekly') =>
//     apiCall<Mission[]>(`/missions${type ? `?type=${type}` : ''}`),
  
//   getDailyMissions: () => apiCall<Mission[]>('/missions/daily'),
  
//   getWeeklyMissions: () => apiCall<Mission[]>('/missions/weekly'),
  
//   claimReward: (missionId: string) =>
//     apiCall(`/missions/${missionId}/claim`, {
//       method: 'POST',
//     }),
// };

// // ============ SHOP API ============
// // ============ SHOP API ============
// export interface ShopAvatar {
//   id: number;
//   name: string;
//   description?: string;
//   iconUrl: string;
//   rarity: 'common' | 'rare' | 'epic' | 'legendary';
//   priceCoins?: number;
//   priceGems?: number;
//   owned: boolean;
//   equipped: boolean;
// }

// export interface ShopBalance {
//   coins: number;
//   gems: number;
// }

// export interface PurchaseResponse {
//   success: boolean;
//   message: string;
//   avatar: {
//     id: number;
//     name: string;
//     iconUrl: string;
//     rarity: string;
//   };
//   transaction: {
//     currency: 'coins' | 'gems';
//     amount: number;
//   };
//   balance: ShopBalance;
// }

// export interface EquipResponse {
//   success: boolean;
//   message: string;
//   avatar: {
//     id: number;
//     name: string;
//     iconUrl: string;
//     rarity: string;
//   };
// }

// export const shopAPI = {
//   // Get all avatars with ownership status
//   getAvatars: () => 
//     apiCall<ShopAvatar[]>('/shop/avatars'),
  
//   // Get only owned avatars
//   getOwnedAvatars: () => 
//     apiCall<any[]>('/shop/avatars/owned'),
  
//   // Purchase avatar
//   purchaseAvatar: (avatarId: number) =>
//     apiCall<PurchaseResponse>('/shop/avatars/purchase', {
//       method: 'POST',
//       body: JSON.stringify({ avatarId }),
//     }),
  
//   // Equip avatar
//   equipAvatar: (avatarId: number) =>
//     apiCall<EquipResponse>('/shop/avatars/equip', {
//       method: 'POST',
//       body: JSON.stringify({ avatarId }),
//     }),
  
//   // Get user balance
//   getBalance: () =>
//     apiCall<ShopBalance>('/shop/balance'),
  
//   // Get currently equipped avatar
//   getEquippedAvatar: () =>
//     apiCall<any>('/shop/avatars/equipped'),
// };

// // ============ LEADERBOARD API ============
// export interface LeaderboardEntry {
//   rank: number;
//   userId: string;
//   username: string;
//   avatar: string;
//   xp: number;
//   level: number;
//   isCurrentUser: boolean;
// }

// export interface LeaderboardResponse {
//   leaderboard: LeaderboardEntry[];
//   currentUserRank: number;
// }

// export const leaderboardAPI = {
//   getGlobal: (limit = 100) =>
//     apiCall<LeaderboardResponse>(`/leaderboard/global?limit=${limit}`),
  
//   getWeekly: (limit = 100) =>
//     apiCall<LeaderboardResponse>(`/leaderboard/weekly?limit=${limit}`),
// };

// // ============ LANGUAGES API (Public) ============
// export interface Language {
//   code: string;
//   name: string;
//   nativeName: string;
//   flag: string;
//   isAvailable: boolean;
// }

// export const languagesAPI = {
//   getAll: () => apiCall<Language[]>('/languages'),
  
//   getByCode: (code: string) =>
//     apiCall<Language>(`/languages/${code}`),
// };

// // ============ ACHIEVEMENTS API ============
// export interface Achievement {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   category: string;
//   isUnlocked: boolean;
//   unlockedAt?: string;
//   progress: {
//     current: number;
//     target: number;
//   };
// }

// export const achievementsAPI = {
//   getAll: () => apiCall<Achievement[]>('/achievements'),
// };

// // User API
// export const userAPI = {
//   // Get user profile
//   async getProfile() {
//     return fetchWithAuth("/users/profile")
//   },

//   // Get user languages
//   async getUserLanguages() {
//     return fetchWithAuth("/users/languages")
//   },
// }


// lib/api-service.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
};

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// ============ USERS API ============
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  coins: number;
  gems: number;
  streak: number;
  level: number;
  xp: number;
  isPro: boolean;
  darkMode: boolean;
  interfaceLanguage: string;
  activeLanguage?: string;
  createdAt: string;
}

export interface UserStatistics {
  totalLessonsCompleted: number;
  totalPracticeCompleted: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  studyTimeMinutes: number;
  weeklyActivity: {
    day: string;
    lessonsCompleted: number;
    xpEarned: number;
  }[];
}

export interface UserLanguage {
  id: string;
  languageCode: string;
  languageName: string;
  languageFlag: string;
  isActive: boolean;
  progress: {
    level: number;
    xp: number;
    lessonsCompleted: number;
    currentTopic?: string;
  };
  createdAt: string;
}

export const usersAPI = {
  getProfile: () => apiCall<UserProfile>('/users/profile'),
  
  updateProfile: (data: { username?: string; darkMode?: boolean; interfaceLanguage?: string }) =>
    apiCall<UserProfile>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  getStatistics: () => apiCall<UserStatistics>('/users/statistics'),
  
  addLanguage: (languageCode: string) =>
    apiCall('/users/languages', {
      method: 'POST',
      body: JSON.stringify({ languageCode }),
    }),
  
  switchLanguage: (languageId: string) =>
    apiCall('/users/languages/switch', {
      method: 'POST',
      body: JSON.stringify({ languageId }),
    }),
};

// ============ LEARNING API ============
export interface Topic {
  id: string;
  title: string;
  description: string;
  order: number;
  isLocked: boolean;
  lessonsCompleted: number;
  totalLessons: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  isCompleted: boolean;
  isLocked: boolean;
  xpReward: number;
  coinsReward: number;
}

export interface LearningMap {
  topics: Topic[];
  currentProgress: {
    topicId: string;
    lessonId: string;
  };
}

export const learningAPI = {
  getMap: () => apiCall<LearningMap>('/learning/map'),
  
  getLessonDetail: (lessonId: string) =>
    apiCall(`/learning/lessons/${lessonId}`),
  
  startLesson: (lessonId: string) =>
    apiCall('/learning/lessons/start', {
      method: 'POST',
      body: JSON.stringify({ lessonId }),
    }),
  
  completeLesson: (lessonId: string, totalTimeSpent: number) =>
    apiCall('/learning/lessons/complete', {
      method: 'POST',
      body: JSON.stringify({ lessonId, totalTimeSpent }),
    }),
};

// Helper for authenticated requests with better error handling
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken()
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  // Check if response has content
  const contentType = response.headers.get("content-type")
  const contentLength = response.headers.get("content-length")
  
  // If no content or empty body, return null
  if (contentLength === "0" || !contentType?.includes("application/json")) {
    return null
  }

  // Try to parse JSON, return null if fails
  try {
    const text = await response.text()
    if (!text || text.trim() === "") {
      return null
    }
    return JSON.parse(text)
  } catch (error) {
    console.error("Failed to parse JSON response:", error)
    return null
  }
}


// Placement Test API
export const placementAPI = {
  // Start a new test
  async startTest(languageCode: string, testLevel: 'A' | 'B' | 'C') {
    return fetchWithAuth("/placement/start", {
      method: "POST",
      body: JSON.stringify({ languageCode, testLevel }),
    })
  },

  // Submit test answers
  async submitTest(testId: number, answers: Array<{ questionId: number; answer: string }>) {
    return fetchWithAuth("/placement/submit", {
      method: "POST",
      body: JSON.stringify({ testId, answers }),
    })
  },

  // Get test history
  async getTestHistory(languageCode?: string) {
    const params = languageCode ? `?languageCode=${languageCode}` : ""
    return fetchWithAuth(`/placement/history${params}`)
  },

  // Get test result details
  async getTestResult(testId: number) {
    return fetchWithAuth(`/placement/result/${testId}`)
  },

  // Check for in-progress test
  async getInProgressTest(languageCode: string, testLevel: 'A' | 'B' | 'C') {
    return fetchWithAuth(
      `/placement/in-progress?languageCode=${languageCode}&testLevel=${testLevel}`
    )
  },

  // Save progress (auto-save)
  async saveProgress(data: {
    testId: number
    answers: Array<{ questionId: number; answer: string }>
    currentQuestion: number
    timeRemaining: number
  }) {
    return fetchWithAuth("/placement/save-progress", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Get test questions (for resume)
  async getTestQuestions(testId: number) {
    return fetchWithAuth(`/placement/questions/${testId}`)
  },
}

// ============ PRACTICE API ============
export interface PracticeLesson {
  id: string;
  title: string;
  description: string;
  skillType: 'listening' | 'speaking' | 'reading' | 'writing';
  difficulty: 'easy' | 'medium' | 'hard';
  questionsCount: number;
  xpReward: number;
}

export const practiceAPI = {
  getLessons: (skillType?: string) =>
    apiCall<PracticeLesson[]>(`/practice/lessons${skillType ? `?skillType=${skillType}` : ''}`),
  
  startLesson: (practiceLessonId: string) =>
    apiCall('/practice/start', {
      method: 'POST',
      body: JSON.stringify({ practiceLessonId }),
    }),
  
  complete: (practiceLessonId: string, answers: any[], timeSpent: number) =>
    apiCall('/practice/complete', {
      method: 'POST',
      body: JSON.stringify({ practiceLessonId, answers, timeSpent }),
    }),
};

// ============ MISSIONS API ============
export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  targetValue: number;
  currentValue: number;
  isCompleted: boolean;
  isClaimed: boolean;
  rewards: {
    xp: number;
    coins: number;
    gems?: number;
  };
  expiresAt: string;
}

export const missionsAPI = {
  getAll: (type?: 'daily' | 'weekly') =>
    apiCall<Mission[]>(`/missions${type ? `?type=${type}` : ''}`),
  
  getDailyMissions: () => apiCall<Mission[]>('/missions/daily'),
  
  getWeeklyMissions: () => apiCall<Mission[]>('/missions/weekly'),
  
  claimReward: (missionId: string) =>
    apiCall(`/missions/${missionId}/claim`, {
      method: 'POST',
    }),
};

// ============ SHOP API ============
export interface ShopAvatar {
  id: number;
  name: string;
  description?: string;
  iconUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  priceCoins?: number;
  priceGems?: number;
  owned: boolean;
  equipped: boolean;
}

export interface ShopBalance {
  coins: number;
  gems: number;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  avatar: {
    id: number;
    name: string;
    iconUrl: string;
    rarity: string;
  };
  transaction: {
    currency: 'coins' | 'gems';
    amount: number;
  };
  balance: ShopBalance;
}

export interface EquipResponse {
  success: boolean;
  message: string;
  avatar: {
    id: number;
    name: string;
    iconUrl: string;
    rarity: string;
  };
}

export const shopAPI = {
  // Get all avatars with ownership status
  getAvatars: () => 
    apiCall<ShopAvatar[]>('/shop/avatars'),
  
  // Get only owned avatars
  getOwnedAvatars: () => 
    apiCall<ShopAvatar[]>('/shop/avatars/owned'),
  
  // Purchase avatar
  purchaseAvatar: (avatarId: number) =>
    apiCall<PurchaseResponse>('/shop/avatars/purchase', {
      method: 'POST',
      body: JSON.stringify({ avatarId }),
    }),
  
  // Equip avatar
  equipAvatar: (avatarId: number) =>
    apiCall<EquipResponse>('/shop/avatars/equip', {
      method: 'POST',
      body: JSON.stringify({ avatarId }),
    }),
  
  // Get user balance
  getBalance: () =>
    apiCall<ShopBalance>('/shop/balance'),
  
  // Get currently equipped avatar
  getEquippedAvatar: () =>
    apiCall<ShopAvatar>('/shop/avatars/equipped'),
};

// ============ LEADERBOARD API ============
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  isCurrentUser?: boolean;
  currentStreak?: number;
  totalXp?: number;
  weeklyXp?: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  currentUserRank: number;
}

export const leaderboardAPI = {
  getGlobal: (limit = 100) =>
    apiCall<LeaderboardResponse>(`/leaderboard/global?limit=${limit}`),
  
  getWeekly: (limit = 100) =>
    apiCall<LeaderboardResponse>(`/leaderboard/weekly?limit=${limit}`),
};

// ============ LANGUAGES API (Public) ============
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isAvailable: boolean;
}

export const languagesAPI = {
  getAll: () => apiCall<Language[]>('/languages'),
  
  getByCode: (code: string) =>
    apiCall<Language>(`/languages/${code}`),
};

// ============ ACHIEVEMENTS API ============
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: {
    current: number;
    target: number;
  };
}

export const achievementsAPI = {
  getAll: () => apiCall<Achievement[]>('/achievements'),
};

// User API
export const userAPI = {
  // Get user profile
  async getProfile() {
    return fetchWithAuth("/users/profile")
  },

  // Get user languages
  async getUserLanguages() {
    return fetchWithAuth("/users/languages")
  },
}