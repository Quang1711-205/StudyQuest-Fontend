// app/selectLanguage/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speakers: string;
  gradient: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    speakers: '1.5B speakers',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    speakers: '1.1B speakers',
    gradient: 'from-red-500 to-red-600',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    speakers: '600M speakers',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    speakers: '560M speakers',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    speakers: '420M speakers',
    gradient: 'from-green-500 to-green-600',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    speakers: '260M speakers',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

export default function SelectLanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageSelect = async (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsLoading(true);

    try {
      // Get user info from localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error('User not found');
      }

      const userData = JSON.parse(storedUser);
      const userId = userData.id;

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Lấy danh sách ngôn ngữ hiện tại từ localStorage
      const userLanguagesKey = `user_languages_${userId}`;
      const existingLanguages = localStorage.getItem(userLanguagesKey);
      let languagesArray = existingLanguages ? JSON.parse(existingLanguages) : [];

      // Thêm ngôn ngữ mới với isActive = true, các ngôn ngữ khác set false
      languagesArray = languagesArray.map((lang: any) => ({
        ...lang,
        isActive: false,
      }));

      // Kiểm tra xem ngôn ngữ đã tồn tại chưa
      const existingLangIndex = languagesArray.findIndex(
        (lang: any) => lang.code === languageCode
      );

      if (existingLangIndex >= 0) {
        languagesArray[existingLangIndex].isActive = true;
      } else {
        const selectedLang = languages.find((l) => l.code === languageCode);
        languagesArray.push({
          code: languageCode,
          name: selectedLang?.name || '',
          isActive: true,
          addedAt: new Date().toISOString(),
          progress: {
            level: 1,
            xp: 0,
            lessonsCompleted: 0,
          },
        });
      }

      // Lưu vào localStorage
      localStorage.setItem(userLanguagesKey, JSON.stringify(languagesArray));

      // Lưu active language vào user data
      const updatedUser = {
        ...userData,
        activeLanguage: languageCode,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      console.log('Language saved:', languageCode);
      console.log('User languages:', languagesArray);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving language:', error);
      alert('Có lỗi xảy ra khi lưu ngôn ngữ. Vui lòng thử lại!');
      setIsLoading(false);
      setSelectedLanguage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-6 shadow-lg">
            <span className="text-3xl font-bold text-white">SQ</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Chọn Ngôn Ngữ Của Bạn
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hãy chọn ngôn ngữ bạn muốn học và bắt đầu hành trình chinh phục ngôn ngữ mới
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              disabled={isLoading}
              className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                selectedLanguage === language.code
                  ? 'ring-4 ring-indigo-500'
                  : ''
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div
                className={`bg-gradient-to-br ${language.gradient} p-8 text-white h-full`}
              >
                {/* Flag */}
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {language.flag}
                </div>

                {/* Language Names */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-1">{language.name}</h3>
                  <p className="text-3xl font-semibold opacity-90">
                    {language.nativeName}
                  </p>
                </div>

                {/* Speakers Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">{language.speakers}</span>
                  {selectedLanguage === language.code && isLoading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm">
          Đừng lo! Bạn có thể thay đổi ngôn ngữ học bất cứ lúc nào từ cài đặt.
        </p>
      </div>
    </div>
  );
}