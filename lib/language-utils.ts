// lib/language-utils.ts
// Utilities for managing user language preferences

export interface UserLanguage {
  code: string
  name: string
  isActive: boolean
  addedAt: string
  progress?: {
    level: number
    xp: number
    lessonsCompleted: number
  }
}

export const AVAILABLE_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
]

/**
 * Get user's languages from localStorage
 */
export const getUserLanguages = (userId: string): UserLanguage[] => {
  if (typeof window === 'undefined') return []
  
  const key = `user_languages_${userId}`
  const stored = localStorage.getItem(key)
  
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

/**
 * Get user's active language
 */
export const getActiveLanguage = (userId: string): UserLanguage | null => {
  const languages = getUserLanguages(userId)
  return languages.find(lang => lang.isActive) || null
}

/**
 * Check if user has any active language
 */
export const hasActiveLanguage = (userId: string): boolean => {
  return getActiveLanguage(userId) !== null
}

/**
 * Set a language as active (and deactivate others)
 */
export const setActiveLanguage = (userId: string, languageCode: string): void => {
  if (typeof window === 'undefined') return
  
  const languages = getUserLanguages(userId)
  const key = `user_languages_${userId}`
  
  // Deactivate all languages
  const updatedLanguages = languages.map(lang => ({
    ...lang,
    isActive: lang.code === languageCode,
  }))
  
  // If language doesn't exist, add it
  if (!updatedLanguages.find(lang => lang.code === languageCode)) {
    const languageInfo = AVAILABLE_LANGUAGES.find(l => l.code === languageCode)
    if (languageInfo) {
      updatedLanguages.push({
        code: languageCode,
        name: languageInfo.name,
        isActive: true,
        addedAt: new Date().toISOString(),
        progress: {
          level: 1,
          xp: 0,
          lessonsCompleted: 0,
        },
      })
    }
  }
  
  localStorage.setItem(key, JSON.stringify(updatedLanguages))
}

/**
 * Add a new language to user's learning list
 */
export const addLanguage = (userId: string, languageCode: string, setAsActive: boolean = false): void => {
  if (typeof window === 'undefined') return
  
  const languages = getUserLanguages(userId)
  const key = `user_languages_${userId}`
  
  // Check if language already exists
  if (languages.find(lang => lang.code === languageCode)) {
    if (setAsActive) {
      setActiveLanguage(userId, languageCode)
    }
    return
  }
  
  const languageInfo = AVAILABLE_LANGUAGES.find(l => l.code === languageCode)
  if (!languageInfo) return
  
  const newLanguage: UserLanguage = {
    code: languageCode,
    name: languageInfo.name,
    isActive: setAsActive,
    addedAt: new Date().toISOString(),
    progress: {
      level: 1,
      xp: 0,
      lessonsCompleted: 0,
    },
  }
  
  // If setting as active, deactivate others
  if (setAsActive) {
    languages.forEach(lang => lang.isActive = false)
  }
  
  languages.push(newLanguage)
  localStorage.setItem(key, JSON.stringify(languages))
}

/**
 * Remove a language from user's learning list
 */
export const removeLanguage = (userId: string, languageCode: string): void => {
  if (typeof window === 'undefined') return
  
  const languages = getUserLanguages(userId)
  const key = `user_languages_${userId}`
  
  const filteredLanguages = languages.filter(lang => lang.code !== languageCode)
  localStorage.setItem(key, JSON.stringify(filteredLanguages))
}

/**
 * Get all languages user is learning (active and inactive)
 */
export const getAllUserLanguages = (userId: string): UserLanguage[] => {
  return getUserLanguages(userId)
}

/**
 * Update language progress
 */
export const updateLanguageProgress = (
  userId: string, 
  languageCode: string, 
  progress: { level?: number; xp?: number; lessonsCompleted?: number }
): void => {
  if (typeof window === 'undefined') return
  
  const languages = getUserLanguages(userId)
  const key = `user_languages_${userId}`
  
  const updatedLanguages = languages.map(lang => {
    if (lang.code === languageCode) {
      return {
        ...lang,
        progress: {
          level: progress.level ?? lang.progress?.level ?? 1,
          xp: progress.xp ?? lang.progress?.xp ?? 0,
          lessonsCompleted: progress.lessonsCompleted ?? lang.progress?.lessonsCompleted ?? 0,
        },
      }
    }
    return lang
  })
  
  localStorage.setItem(key, JSON.stringify(updatedLanguages))
}