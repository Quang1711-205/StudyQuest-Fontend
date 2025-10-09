'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Target, BookOpen, TrendingUp, Flame, Trophy, LayoutDashboard, BarChart3, FileText, Settings, LogOut, Bell, Search, Menu, Download, RefreshCw } from 'lucide-react';

// Generate dynamic mock data
const generateUsers = (count: number) => {
  const names = ['Alex Chen', 'Maria Garcia', 'John Smith', 'Sarah Johnson', 'David Lee', 'Emma Wilson', 'Michael Brown', 'Sophie Martin', 'James Taylor', 'Lisa Anderson', 'Robert Thomas', 'Anna Rodriguez', 'William Davis', 'Eva Martinez', 'Daniel White'];
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500', 'bg-orange-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-red-500'];
  
  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length];
    const initials = name.split(' ').map(n => n[0]).join('');
    return {
      id: i + 1,
      name,
      initials,
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      level: Math.floor(Math.random() * 50) + 1,
      xp: Math.floor(Math.random() * 150000) + 10000,
      streak: Math.floor(Math.random() * 400),
      joined: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      status: Math.random() > 0.3 ? 'active' : 'inactive',
      color: colors[i % colors.length]
    };
  });
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, iconBg, iconColor }) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-gray-600'}`}>
            {change} {isPositive && 'from last month'}
          </p>
        </div>
        <div className={`${iconBg} ${iconColor} p-4 rounded-xl shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onRefresh?: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, onRefresh }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100">
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {onRefresh && (
        <button 
          onClick={onRefresh}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      )}
    </div>
    {children}
  </div>
);

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [activeView, setActiveView] = useState('dashboard');
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [stats, setStats] = useState({
    totalUsers: 5342,
    activeUsers: 4128,
    lessonsCompleted: 45892,
    avgStreak: 27,
    completionRate: 78,
    growthRate: 18.7,
    userGrowth: 12.5,
    activeGrowth: 8.2,
    lessonsGrowth: 15.3,
    streakGrowth: 5.1,
    completionGrowth: 2.4,
  });

  useEffect(() => {
    setUsers(generateUsers(15));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 2),
        lessonsCompleted: prev.lessonsCompleted + Math.floor(Math.random() * 10),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateLearningData = () => {
    return Array.from({ length: 6 }, (_, i) => ({
      week: `Week ${i + 1}`,
      completionRate: 68 + Math.floor(Math.random() * 20),
      avgScore: 74 + Math.floor(Math.random() * 15),
    }));
  };

  const [learningEffectiveness, setLearningEffectiveness] = useState(generateLearningData());

  const usersByLanguage = [
    { name: 'English', value: 44, color: '#3B82F6' },
    { name: 'Spanish', value: 22, color: '#EC4899' },
    { name: 'French', value: 15, color: '#8B5CF6' },
    { name: 'German', value: 10, color: '#F97316' },
    { name: 'Japanese', value: 8, color: '#10B981' },
  ];

  const activeUsersByTime = [
    { time: '00:00', users: 120 },
    { time: '04:00', users: 80 },
    { time: '08:00', users: 450 },
    { time: '12:00', users: 850 },
    { time: '16:00', users: 1020 },
    { time: '20:00', users: 1250 },
    { time: '23:00', users: 380 },
  ];

  const proficiencyDistribution = [
    { level: 'A1', users: 1200 },
    { level: 'A2', users: 980 },
    { level: 'B1', users: 1450 },
    { level: 'B2', users: 890 },
    { level: 'C1', users: 520 },
    { level: 'C2', users: 302 },
  ];

  const userGrowthTrend = [
    { month: 'Jan', users: 1250 },
    { month: 'Feb', users: 1850 },
    { month: 'Mar', users: 2520 },
    { month: 'Apr', users: 3180 },
    { month: 'May', users: 4100 },
    { month: 'Jun', users: 5342 },
  ];

  const skillDistribution = [
    { skill: 'Listening', percentage: 27, color: '#3B82F6' },
    { skill: 'Reading', percentage: 29, color: '#8B5CF6' },
    { skill: 'Writing', percentage: 20, color: '#F97316' },
    { skill: 'Speaking', percentage: 24, color: '#EC4899' },
  ];

  const weeklyActivity = [
    { day: 'Mon', lessons: 450, practices: 310 },
    { day: 'Tue', lessons: 380, practices: 280 },
    { day: 'Wed', lessons: 520, practices: 400 },
    { day: 'Thu', lessons: 490, practices: 360 },
    { day: 'Fri', lessons: 610, practices: 510 },
    { day: 'Sat', lessons: 720, practices: 650 },
    { day: 'Sun', lessons: 580, practices: 480 },
  ];

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'users', name: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'content', name: 'Content', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleMenuClick = (viewId: string) => {
    setActiveView(viewId);
    setSidebarOpen(false);
  };

  const refreshLearningData = () => {
    setLearningEffectiveness(generateLearningData());
  };

  const renderContent = () => {
    switch(activeView) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Users"
                value={stats.totalUsers.toLocaleString()}
                change={`+${stats.userGrowth}%`}
                icon={<Users className="w-6 h-6" />}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />
              <StatCard
                title="Active Learners"
                value={stats.activeUsers.toLocaleString()}
                change={`+${stats.activeGrowth}%`}
                icon={<Target className="w-6 h-6" />}
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
              />
              <StatCard
                title="Lessons Completed"
                value={stats.lessonsCompleted.toLocaleString()}
                change={`+${stats.lessonsGrowth}%`}
                icon={<BookOpen className="w-6 h-6" />}
                iconBg="bg-pink-100"
                iconColor="text-pink-600"
              />
              <StatCard
                title="Avg. Streak"
                value={`${stats.avgStreak} days`}
                change={`+${stats.streakGrowth}%`}
                icon={<Flame className="w-6 h-6" />}
                iconBg="bg-orange-100"
                iconColor="text-orange-600"
              />
              <StatCard
                title="Completion Rate"
                value={`${stats.completionRate}%`}
                change={`+${stats.completionGrowth}%`}
                icon={<Trophy className="w-6 h-6" />}
                iconBg="bg-cyan-100"
                iconColor="text-cyan-600"
              />
              <StatCard
                title="Growth Rate"
                value={`+${stats.growthRate}%`}
                change="Monthly average"
                icon={<TrendingUp className="w-6 h-6" />}
                iconBg="bg-green-100"
                iconColor="text-green-600"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartCard 
                title="Learning Effectiveness" 
                subtitle="Completion rate & average quiz scores over time"
                onRefresh={refreshLearningData}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={learningEffectiveness}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="week" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="completionRate" stroke="#3B82F6" strokeWidth={3} name="Completion Rate %" />
                    <Line type="monotone" dataKey="avgScore" stroke="#EC4899" strokeWidth={3} name="Avg Score %" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Users by Language" subtitle="Distribution of learners across languages">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={usersByLanguage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {usersByLanguage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartCard title="Active Users by Time" subtitle="Peak usage hours throughout the day">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={activeUsersByTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="users" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Proficiency Distribution" subtitle="Users across CEFR proficiency levels">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={proficiencyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="level" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#F97316" radius={[8, 8, 0, 0]} name="users" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartCard title="User Growth" subtitle="Monthly user acquisition trend">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} name="users" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Skill Distribution" subtitle="Practice distribution across skills">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ skill, percentage }) => `${skill} ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {skillDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="mb-6">
              <ChartCard title="Weekly Activity" subtitle="Lessons and practices completed per day">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="lessons" fill="#3B82F6" radius={[8, 8, 0, 0]} name="lessons" />
                    <Bar dataKey="practices" fill="#EC4899" radius={[8, 8, 0, 0]} name="practices" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </>
        );
      
      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                  <p className="text-sm text-gray-500 mt-1">View and manage all registered users</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All Users ({users.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'active' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Active ({users.filter(u => u.status === 'active').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('inactive')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'inactive' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Inactive ({users.filter(u => u.status === 'inactive').length})
                  </button>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">XP</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Streak</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 ${user.color} rounded-full flex items-center justify-center text-white font-bold shadow-sm`}>
                            {user.initials}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full shadow-sm">
                          Level {user.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.xp.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900 font-medium">
                          <Flame className="w-4 h-4 text-orange-500 mr-1" />
                          {user.streak} days
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                          user.status === 'active' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No users found matching your criteria</p>
              </div>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">Detailed analytics and insights coming soon...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Average Session</h3>
                <p className="text-3xl font-bold">24 min</p>
                <p className="text-sm mt-2 opacity-90">+12% from last week</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Retention Rate</h3>
                <p className="text-3xl font-bold">87%</p>
                <p className="text-sm mt-2 opacity-90">+5% from last month</p>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Daily Active Users</h3>
                <p className="text-3xl font-bold">3,421</p>
                <p className="text-sm mt-2 opacity-90">Peak: 4,128</p>
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Content Management</h2>
            <p className="text-gray-600 mb-6">Manage lessons, courses, and learning materials</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Total Lessons', 'Active Courses', 'Learning Paths', 'Practice Exercises', 'Quizzes', 'Video Content'].map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-600">{item}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{Math.floor(Math.random() * 500) + 100}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive email updates about your platform</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Auto-save</p>
                      <p className="text-sm text-gray-500">Automatically save changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-500">Switch to dark theme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-900 mb-2">Platform Name</label>
                    <input type="text" defaultValue="StudyQuest" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-900 mb-2">Support Email</label>
                    <input type="email" defaultValue="support@studyquest.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">SQ</span>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-gray-900">StudyQuest</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Management
            </p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@studyquest.com</p>
              </div>
            </div>
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h2 className="text-xl font-bold text-gray-900">
                  {menuItems.find(item => item.id === activeView)?.name || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-500">
                  {activeView === 'dashboard' && 'Monitor and manage your StudyQuest platform'}
                  {activeView === 'users' && `Managing ${users.length} registered users`}
                  {activeView === 'analytics' && 'Detailed insights and metrics'}
                  {activeView === 'content' && 'Manage lessons and learning materials'}
                  {activeView === 'settings' && 'Configure platform settings'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, lessons, analytics..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}