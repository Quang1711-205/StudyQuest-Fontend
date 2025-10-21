'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, BookOpen, Target, Calendar, Zap, ArrowLeft } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeLearners: number;
  avgStreak: number;
  growthPercentage: number;
  completionRate: number;
}

interface UserGrowthData {
  date: string;
  count: number;
}

interface SkillDistribution {
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
  grammar: number;
  vocabulary: number;
}

interface ActiveUserData {
  date: string;
  activeUsers: number;
  lessonsCompleted: number;
  xpEarned: number;
}

interface EffectivenessData {
  listening: string;
  speaking: string;
  reading: string;
  writing: string;
  grammar: string;
  vocabulary: string;
}

interface ProficiencyLevel {
  level: number;
  count: number;
}

interface WeeklyActivityData {
  day: string;
  activeUsers: number;
  lessonsCompleted: number;
  practicesCompleted: number;
}

interface ContentStats {
  totalTopics: number;
  totalLessons: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State cho các data
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeLearners: 0,
    avgStreak: 0,
    growthPercentage: 0,
    completionRate: 0,
  });

  const [userGrowth, setUserGrowth] = useState<UserGrowthData[]>([]);
  const [skillDist, setSkillDist] = useState<SkillDistribution>({
    listening: 0, speaking: 0, reading: 0, writing: 0, grammar: 0, vocabulary: 0
  });
  const [activeUsers, setActiveUsers] = useState<ActiveUserData[]>([]);
  const [effectiveness, setEffectiveness] = useState<EffectivenessData>({
    listening: '0', speaking: '0', reading: '0', writing: '0', grammar: '0', vocabulary: '0'
  });
  const [proficiency, setProficiency] = useState<ProficiencyLevel[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivityData[]>([]);
  const [contentStats, setContentStats] = useState<ContentStats>({ totalTopics: 0, totalLessons: 0 });

  useEffect(() => {
    fetchAllData();
  }, []);

  const apiCall = async (endpoint: string) => {
    const token = localStorage.getItem('accessToken');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [s, ug, sd, au, eff, prof, wa, cs] = await Promise.all([
        apiCall('/admin/dashboard/stats'),
        apiCall('/admin/dashboard/user-growth?days=30'),
        apiCall('/admin/dashboard/skill-distribution'),
        apiCall('/admin/dashboard/active-users?days=7'),
        apiCall('/admin/dashboard/learning-effectiveness'),
        apiCall('/admin/dashboard/proficiency-distribution'),
        apiCall('/admin/dashboard/weekly-activity'),
        apiCall('/admin/dashboard/content-stats'),
      ]);

      setStats(s);
      setUserGrowth(ug);
      setSkillDist(sd);
      setActiveUsers(au);
      setEffectiveness(eff);
      setProficiency(prof);
      setWeeklyActivity(wa);
      setContentStats(cs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải dữ liệu');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, unit, color }: any) => (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${color} hover:shadow-2xl transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 font-semibold text-sm">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
          {unit && <p className="text-gray-500 text-xs mt-1">{unit}</p>}
        </div>
        <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
          <Icon className="w-8 h-8 text-gray-700" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-2xl font-bold text-gray-700">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={fetchAllData}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Thử Lại
          </button>
        </div>
      </div>
    );
  }

  // Chuẩn bị dữ liệu cho biểu đồ Skill Distribution (Pie Chart)
  const skillChartData = [
    { name: 'Listening', value: skillDist.listening, fill: '#3b82f6' },
    { name: 'Speaking', value: skillDist.speaking, fill: '#ef4444' },
    { name: 'Reading', value: skillDist.reading, fill: '#10b981' },
    { name: 'Writing', value: skillDist.writing, fill: '#f59e0b' },
    { name: 'Grammar', value: skillDist.grammar, fill: '#8b5cf6' },
    { name: 'Vocabulary', value: skillDist.vocabulary, fill: '#ec4899' },
  ];

  // Chuẩn bị dữ liệu cho Effectiveness (Bar Chart)
  const effectivenessChartData = [
    { skill: 'Listening', accuracy: parseFloat(effectiveness.listening) || 0 },
    { skill: 'Speaking', accuracy: parseFloat(effectiveness.speaking) || 0 },
    { skill: 'Reading', accuracy: parseFloat(effectiveness.reading) || 0 },
    { skill: 'Writing', accuracy: parseFloat(effectiveness.writing) || 0 },
    { skill: 'Grammar', accuracy: parseFloat(effectiveness.grammar) || 0 },
    { skill: 'Vocabulary', accuracy: parseFloat(effectiveness.vocabulary) || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-indigo-100 rounded-lg transition-all duration-200 transform hover:scale-110"
              title="Quay lại"
            >
              <ArrowLeft className="w-8 h-8 text-indigo-600" />
            </button>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard Quản Trị
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Tổng quan hệ thống học tập</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            icon={Users}
            title="Tổng Người Dùng"
            value={stats.totalUsers}
            color="border-blue-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Người Học Hoạt Động"
            value={stats.activeLearners}
            unit="7 ngày gần"
            color="border-green-500"
          />
          <StatCard
            icon={Calendar}
            title="Streak Trung Bình"
            value={stats.avgStreak}
            unit="ngày"
            color="border-orange-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Tăng Trưởng"
            value={stats.growthPercentage}
            unit="%"
            color="border-purple-500"
          />
          <StatCard
            icon={Target}
            title="Tỷ Lệ Hoàn Thành"
            value={stats.completionRate}
            unit="%"
            color="border-pink-500"
          />
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              Nội Dung
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <span className="font-semibold text-gray-700">Tổng Topic</span>
                <span className="text-3xl font-bold text-blue-600">{contentStats.totalTopics}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <span className="font-semibold text-gray-700">Tổng Bài Học</span>
                <span className="text-3xl font-bold text-green-600">{contentStats.totalLessons}</span>
              </div>
            </div>
          </div>

          {/* Proficiency Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-500" />
              Phân Bố Trình Độ
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={proficiency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tăng Trưởng Người Dùng (30 ngày)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  dot={{ fill: '#3b82f6', r: 4 }}
                  strokeWidth={2}
                  name="Người Dùng Mới"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Phân Bố Kỹ Năng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {skillChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Active Users Over Time */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hoạt Động Người Dùng (7 ngày)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activeUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#10b981"
                  name="Người Dùng Hoạt Động"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="xpEarned"
                  stroke="#f59e0b"
                  name="XP Kiếm Được"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Learning Effectiveness */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hiệu Suất Học Tập</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={effectivenessChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="accuracy" fill="#ec4899" radius={[8, 8, 0, 0]} name="Độ Chính Xác (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Hoạt Động Hàng Tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="activeUsers" fill="#3b82f6" name="Người Dùng Hoạt Động" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="left" dataKey="lessonsCompleted" fill="#10b981" name="Bài Học Hoàn Thành" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="right" dataKey="practicesCompleted" fill="#f59e0b" name="Bài Tập Hoàn Thành" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}