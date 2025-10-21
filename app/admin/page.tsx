// 'use client';

// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Users, Target, BookOpen, TrendingUp, Flame, Trophy, LayoutDashboard, BarChart3, FileText, Settings, LogOut, Bell, Search, Menu, Download, RefreshCw } from 'lucide-react';

// // Generate dynamic mock data
// const generateUsers = (count: number) => {
//   const names = ['Alex Chen', 'Maria Garcia', 'John Smith', 'Sarah Johnson', 'David Lee', 'Emma Wilson', 'Michael Brown', 'Sophie Martin', 'James Taylor', 'Lisa Anderson', 'Robert Thomas', 'Anna Rodriguez', 'William Davis', 'Eva Martinez', 'Daniel White'];
//   const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500', 'bg-orange-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-red-500'];
  
//   return Array.from({ length: count }, (_, i) => {
//     const name = names[i % names.length];
//     const initials = name.split(' ').map(n => n[0]).join('');
//     return {
//       id: i + 1,
//       name,
//       initials,
//       email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
//       level: Math.floor(Math.random() * 50) + 1,
//       xp: Math.floor(Math.random() * 150000) + 10000,
//       streak: Math.floor(Math.random() * 400),
//       joined: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
//       status: Math.random() > 0.3 ? 'active' : 'inactive',
//       color: colors[i % colors.length]
//     };
//   });
// };

// interface StatCardProps {
//   title: string;
//   value: string;
//   change: string;
//   icon: React.ReactNode;
//   iconBg: string;
//   iconColor: string;
// }

// const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, iconBg, iconColor }) => {
//   const isPositive = change.startsWith('+');
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100">
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
//           <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
//           <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-gray-600'}`}>
//             {change} {isPositive && 'from last month'}
//           </p>
//         </div>
//         <div className={`${iconBg} ${iconColor} p-4 rounded-xl shadow-sm`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface ChartCardProps {
//   title: string;
//   subtitle?: string;
//   children: React.ReactNode;
//   onRefresh?: () => void;
// }

// const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, onRefresh }) => (
//   <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100">
//     <div className="flex items-start justify-between mb-6">
//       <div>
//         <h3 className="text-lg font-bold text-gray-900">{title}</h3>
//         {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
//       </div>
//       {onRefresh && (
//         <button 
//           onClick={onRefresh}
//           className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <RefreshCw className="w-4 h-4" />
//         </button>
//       )}
//     </div>
//     {children}
//   </div>
// );

// export default function AdminDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('all');
//   const [activeView, setActiveView] = useState('dashboard');
//   const [users, setUsers] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const [stats, setStats] = useState({
//     totalUsers: 5342,
//     activeUsers: 4128,
//     lessonsCompleted: 45892,
//     avgStreak: 27,
//     completionRate: 78,
//     growthRate: 18.7,
//     userGrowth: 12.5,
//     activeGrowth: 8.2,
//     lessonsGrowth: 15.3,
//     streakGrowth: 5.1,
//     completionGrowth: 2.4,
//   });

//   useEffect(() => {
//     setUsers(generateUsers(15));
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStats(prev => ({
//         ...prev,
//         totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
//         activeUsers: prev.activeUsers + Math.floor(Math.random() * 2),
//         lessonsCompleted: prev.lessonsCompleted + Math.floor(Math.random() * 10),
//       }));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const generateLearningData = () => {
//     return Array.from({ length: 6 }, (_, i) => ({
//       week: `Week ${i + 1}`,
//       completionRate: 68 + Math.floor(Math.random() * 20),
//       avgScore: 74 + Math.floor(Math.random() * 15),
//     }));
//   };

//   const [learningEffectiveness, setLearningEffectiveness] = useState(generateLearningData());

//   const usersByLanguage = [
//     { name: 'English', value: 44, color: '#3B82F6' },
//     { name: 'Spanish', value: 22, color: '#EC4899' },
//     { name: 'French', value: 15, color: '#8B5CF6' },
//     { name: 'German', value: 10, color: '#F97316' },
//     { name: 'Japanese', value: 8, color: '#10B981' },
//   ];

//   const activeUsersByTime = [
//     { time: '00:00', users: 120 },
//     { time: '04:00', users: 80 },
//     { time: '08:00', users: 450 },
//     { time: '12:00', users: 850 },
//     { time: '16:00', users: 1020 },
//     { time: '20:00', users: 1250 },
//     { time: '23:00', users: 380 },
//   ];

//   const proficiencyDistribution = [
//     { level: 'A1', users: 1200 },
//     { level: 'A2', users: 980 },
//     { level: 'B1', users: 1450 },
//     { level: 'B2', users: 890 },
//     { level: 'C1', users: 520 },
//     { level: 'C2', users: 302 },
//   ];

//   const userGrowthTrend = [
//     { month: 'Jan', users: 1250 },
//     { month: 'Feb', users: 1850 },
//     { month: 'Mar', users: 2520 },
//     { month: 'Apr', users: 3180 },
//     { month: 'May', users: 4100 },
//     { month: 'Jun', users: 5342 },
//   ];

//   const skillDistribution = [
//     { skill: 'Listening', percentage: 27, color: '#3B82F6' },
//     { skill: 'Reading', percentage: 29, color: '#8B5CF6' },
//     { skill: 'Writing', percentage: 20, color: '#F97316' },
//     { skill: 'Speaking', percentage: 24, color: '#EC4899' },
//   ];

//   const weeklyActivity = [
//     { day: 'Mon', lessons: 450, practices: 310 },
//     { day: 'Tue', lessons: 380, practices: 280 },
//     { day: 'Wed', lessons: 520, practices: 400 },
//     { day: 'Thu', lessons: 490, practices: 360 },
//     { day: 'Fri', lessons: 610, practices: 510 },
//     { day: 'Sat', lessons: 720, practices: 650 },
//     { day: 'Sun', lessons: 580, practices: 480 },
//   ];

//   const menuItems = [
//     { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
//     { id: 'users', name: 'Users', icon: <Users className="w-5 h-5" /> },
//     { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
//     { id: 'content', name: 'Content', icon: <FileText className="w-5 h-5" /> },
//     { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
//   ];

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesTab = activeTab === 'all' || user.status === activeTab;
//     return matchesSearch && matchesTab;
//   });

//   const handleMenuClick = (viewId: string) => {
//     setActiveView(viewId);
//     setSidebarOpen(false);
//   };

//   const refreshLearningData = () => {
//     setLearningEffectiveness(generateLearningData());
//   };

//   const renderContent = () => {
//     switch(activeView) {
//       case 'dashboard':
//         return (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               <StatCard
//                 title="Total Users"
//                 value={stats.totalUsers.toLocaleString()}
//                 change={`+${stats.userGrowth}%`}
//                 icon={<Users className="w-6 h-6" />}
//                 iconBg="bg-blue-100"
//                 iconColor="text-blue-600"
//               />
//               <StatCard
//                 title="Active Learners"
//                 value={stats.activeUsers.toLocaleString()}
//                 change={`+${stats.activeGrowth}%`}
//                 icon={<Target className="w-6 h-6" />}
//                 iconBg="bg-purple-100"
//                 iconColor="text-purple-600"
//               />
//               <StatCard
//                 title="Lessons Completed"
//                 value={stats.lessonsCompleted.toLocaleString()}
//                 change={`+${stats.lessonsGrowth}%`}
//                 icon={<BookOpen className="w-6 h-6" />}
//                 iconBg="bg-pink-100"
//                 iconColor="text-pink-600"
//               />
//               <StatCard
//                 title="Avg. Streak"
//                 value={`${stats.avgStreak} days`}
//                 change={`+${stats.streakGrowth}%`}
//                 icon={<Flame className="w-6 h-6" />}
//                 iconBg="bg-orange-100"
//                 iconColor="text-orange-600"
//               />
//               <StatCard
//                 title="Completion Rate"
//                 value={`${stats.completionRate}%`}
//                 change={`+${stats.completionGrowth}%`}
//                 icon={<Trophy className="w-6 h-6" />}
//                 iconBg="bg-cyan-100"
//                 iconColor="text-cyan-600"
//               />
//               <StatCard
//                 title="Growth Rate"
//                 value={`+${stats.growthRate}%`}
//                 change="Monthly average"
//                 icon={<TrendingUp className="w-6 h-6" />}
//                 iconBg="bg-green-100"
//                 iconColor="text-green-600"
//               />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               <ChartCard 
//                 title="Learning Effectiveness" 
//                 subtitle="Completion rate & average quiz scores over time"
//                 onRefresh={refreshLearningData}
//               >
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={learningEffectiveness}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis dataKey="week" stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="completionRate" stroke="#3B82F6" strokeWidth={3} name="Completion Rate %" />
//                     <Line type="monotone" dataKey="avgScore" stroke="#EC4899" strokeWidth={3} name="Avg Score %" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </ChartCard>

//               <ChartCard title="Users by Language" subtitle="Distribution of learners across languages">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={usersByLanguage}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, value }) => `${name} ${value}%`}
//                       outerRadius={100}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {usersByLanguage.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               <ChartCard title="Active Users by Time" subtitle="Peak usage hours throughout the day">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={activeUsersByTime}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis dataKey="time" stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="users" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="users" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>

//               <ChartCard title="Proficiency Distribution" subtitle="Users across CEFR proficiency levels">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={proficiencyDistribution}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis dataKey="level" stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="users" fill="#F97316" radius={[8, 8, 0, 0]} name="users" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//               <ChartCard title="User Growth" subtitle="Monthly user acquisition trend">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={userGrowthTrend}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} name="users" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </ChartCard>

//               <ChartCard title="Skill Distribution" subtitle="Practice distribution across skills">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={skillDistribution}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ skill, percentage }) => `${skill} ${percentage}%`}
//                       outerRadius={100}
//                       fill="#8884d8"
//                       dataKey="percentage"
//                     >
//                       {skillDistribution.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </div>

//             <div className="mb-6">
//               <ChartCard title="Weekly Activity" subtitle="Lessons and practices completed per day">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={weeklyActivity}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="lessons" fill="#3B82F6" radius={[8, 8, 0, 0]} name="lessons" />
//                     <Bar dataKey="practices" fill="#EC4899" radius={[8, 8, 0, 0]} name="practices" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </ChartCard>
//             </div>
//           </>
//         );
      
//       case 'users':
//         return (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">User Management</h2>
//                   <p className="text-sm text-gray-500 mt-1">View and manage all registered users</p>
//                 </div>
//                 <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                   <Download className="w-4 h-4 mr-2" />
//                   Export
//                 </button>
//               </div>
//             </div>

//             <div className="px-6 py-4 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setActiveTab('all')}
//                     className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                       activeTab === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     All Users ({users.length})
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('active')}
//                     className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                       activeTab === 'active' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     Active ({users.filter(u => u.status === 'active').length})
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('inactive')}
//                     className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                       activeTab === 'inactive' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     Inactive ({users.filter(u => u.status === 'inactive').length})
//                   </button>
//                 </div>
//                 <div className="relative w-full sm:w-64">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search users..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Level</th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">XP</th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Streak</th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.map((user) => (
//                     <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className={`w-10 h-10 ${user.color} rounded-full flex items-center justify-center text-white font-bold shadow-sm`}>
//                             {user.initials}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full shadow-sm">
//                           Level {user.level}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.xp.toLocaleString()}</td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center text-sm text-gray-900 font-medium">
//                           <Flame className="w-4 h-4 text-orange-500 mr-1" />
//                           {user.streak} days
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
//                           user.status === 'active' 
//                             ? 'bg-blue-100 text-blue-700' 
//                             : 'bg-purple-100 text-purple-700'
//                         }`}>
//                           {user.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {filteredUsers.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500">No users found matching your criteria</p>
//               </div>
//             )}
//           </div>
//         );

//       case 'analytics':
//         return (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
//               <p className="text-gray-600">Detailed analytics and insights coming soon...</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
//                 <h3 className="text-lg font-semibold mb-2">Average Session</h3>
//                 <p className="text-3xl font-bold">24 min</p>
//                 <p className="text-sm mt-2 opacity-90">+12% from last week</p>
//               </div>
//               <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
//                 <h3 className="text-lg font-semibold mb-2">Retention Rate</h3>
//                 <p className="text-3xl font-bold">87%</p>
//                 <p className="text-sm mt-2 opacity-90">+5% from last month</p>
//               </div>
//               <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
//                 <h3 className="text-lg font-semibold mb-2">Daily Active Users</h3>
//                 <p className="text-3xl font-bold">3,421</p>
//                 <p className="text-sm mt-2 opacity-90">Peak: 4,128</p>
//               </div>
//             </div>
//           </div>
//         );

//       case 'content':
//         return (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-2">Content Management</h2>
//             <p className="text-gray-600 mb-6">Manage lessons, courses, and learning materials</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {['Total Lessons', 'Active Courses', 'Learning Paths', 'Practice Exercises', 'Quizzes', 'Video Content'].map((item, i) => (
//                 <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                   <p className="text-sm text-gray-600">{item}</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-2">{Math.floor(Math.random() * 500) + 100}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 'settings':
//         return (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">General Settings</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">Email Notifications</p>
//                       <p className="text-sm text-gray-500">Receive email updates about your platform</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" className="sr-only peer" defaultChecked />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                   <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">Auto-save</p>
//                       <p className="text-sm text-gray-500">Automatically save changes</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" className="sr-only peer" defaultChecked />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                   <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">Dark Mode</p>
//                       <p className="text-sm text-gray-500">Switch to dark theme</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" className="sr-only peer" />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Settings</h3>
//                 <div className="space-y-4">
//                   <div className="p-4 border border-gray-200 rounded-lg">
//                     <label className="block text-sm font-medium text-gray-900 mb-2">Platform Name</label>
//                     <input type="text" defaultValue="StudyQuest" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                   </div>
//                   <div className="p-4 border border-gray-200 rounded-lg">
//                     <label className="block text-sm font-medium text-gray-900 mb-2">Support Email</label>
//                     <input type="email" defaultValue="support@studyquest.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Sidebar */}
//       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-lg">SQ</span>
//               </div>
//               <div className="ml-3">
//                 <h1 className="text-lg font-bold text-gray-900">StudyQuest</h1>
//                 <p className="text-xs text-gray-500">Admin Panel</p>
//               </div>
//             </div>
//             <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
//             <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
//               Management
//             </p>
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleMenuClick(item.id)}
//                 className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
//                   activeView === item.id
//                     ? 'bg-blue-50 text-blue-600 shadow-sm'
//                     : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//                 }`}
//               >
//                 {item.icon}
//                 <span className="ml-3">{item.name}</span>
//               </button>
//             ))}
//           </nav>

//           {/* User Profile */}
//           <div className="border-t border-gray-200 p-4">
//             <div className="flex items-center mb-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">AD</span>
//               </div>
//               <div className="ml-3 flex-1">
//                 <p className="text-sm font-medium text-gray-900">Admin User</p>
//                 <p className="text-xs text-gray-500">admin@studyquest.com</p>
//               </div>
//             </div>
//             <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <LogOut className="w-4 h-4" />
//               <span className="ml-2">Logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="lg:pl-64">
//         {/* Header */}
//         <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//               <div className="ml-4 lg:ml-0">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {menuItems.find(item => item.id === activeView)?.name || 'Dashboard'}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   {activeView === 'dashboard' && 'Monitor and manage your StudyQuest platform'}
//                   {activeView === 'users' && `Managing ${users.length} registered users`}
//                   {activeView === 'analytics' && 'Detailed insights and metrics'}
//                   {activeView === 'content' && 'Manage lessons and learning materials'}
//                   {activeView === 'settings' && 'Configure platform settings'}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="hidden sm:block relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search users, lessons, analytics..."
//                   className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
//                 <Bell className="w-6 h-6" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer">
//                 <span className="text-white font-bold text-sm">AD</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="p-4 sm:p-6 lg:p-8">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';

interface Language {
  id: number;
  code: string;
  name: string;
  nativeName: string;
  flagEmoji: string;
  isActive: boolean;
  displayOrder: number;
}

interface Topic {
  id: number;
  languageId: number;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lessonCount: number;
}

interface Lesson {
  id: number;
  topicId: number;
  title: string;
  description: string;
  lessonOrder: number;
  isBossFight: boolean;
  durationMinutes: number;
  xpReward: number;
  listeningPercentage: number;
  speakingPercentage: number;
  readingPercentage: number;
  writingPercentage: number;
  grammarPercentage: number;
  vocabularyPercentage: number;
  difficulty: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
}

interface Question {
  id: number;
  lessonId: number;
  questionType: string;
  questionText: string;
  textToSpeak?: string;
  options?: string[];
  correctAnswer: string;
  expectedAnswer?: string;
  explanation: string;
  displayOrder: number;
  createdAt: string;
}

interface PracticeLesson {
  id: number;
  languageId: number;
  skillType: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  difficulty: string;
  displayOrder: number;
  isLocked: boolean;
  isActive: boolean;
  createdAt: string;
}

interface PracticeQuestion {
  id: number;
  practiceLessonId: number;
  questionType: string;
  questionText: string;
  textToSpeak?: string;
  options?: string[];
  correctAnswer: string;
  expectedAnswer?: string;
  explanation: string;
  displayOrder: number;
  createdAt: string;
}

interface Mission {
  id: number;
  languageId?: number;
  title: string;
  description: string;
  missionType: 'daily' | 'weekly';
  requirementType: string;
  requirementCount: number;
  rewardXp: number;
  rewardCoins: number;
  rewardGems: number;
  isActive: boolean;
  createdAt: string;
}

interface Achievement {
  id: number;
  languageId?: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirementType: string;
  requirementCount: number;
  rewardXp: number;
  rewardCoins: number;
  rewardGems: number;
  title: string;
  displayOrder: number;
  createdAt: string;
}

interface Avatar {
  id: number;
  name: string;
  description: string;
  avatarSeed: string;
  avatarStyle: string;
  iconUrl: string;
  rarity: string;
  priceCoins?: number;
  priceGems?: number;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}

const AdminPage: React.FC = () => {
  const [selectedLanguageId, setSelectedLanguageId] = useState<number>(1);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [currentTab, setCurrentTab] = useState<'topics' | 'lessons' | 'questions' | 'practice-lessons' | 'practice-questions' | 'missions' | 'achievements' | 'avatars'>('topics');

  const [topics, setTopics] = useState<Topic[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [practiceLessons, setPracticeLessons] = useState<PracticeLesson[]>([]);
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isBulk, setIsBulk] = useState(false);
  const [bulkQuestions, setBulkQuestions] = useState<string>('');
  const [formData, setFormData] = useState<any>({});

  // 🔥 FIX: Separate state for selected filters (không merge vào formData)
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [selectedPracticeLessonId, setSelectedPracticeLessonId] = useState<number | null>(null);

    // States cho collapsed sections
  const [expandedSections, setExpandedSections] = useState({
    content: true,
    practice: false,
    gamification: false,
    customization: false,
  });

    const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const NavButton = ({ 
    isActive, 
    onClick, 
    children 
  }: { 
    isActive: boolean; 
    onClick: () => void; 
    children: React.ReactNode 
  }) => (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-3 ${
        isActive
          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg ml-2'
          : 'text-slate-700 hover:bg-slate-200/50 hover:text-slate-900 ml-2'
      }`}
    >
      {children}
    </button>
  );

  const SectionHeader = ({ 
    label, 
    sectionKey,
    isExpanded 
  }: { 
    label: string; 
    sectionKey: keyof typeof expandedSections;
    isExpanded: boolean;
  }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full text-left px-3 py-2 mb-3 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
    >
      <ChevronDown 
        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
      />
      {label}
    </button>
  );

  useEffect(() => {
    fetchLanguages();
  }, []);

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    setLoading(true);
    setError(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('⚠️ Token invalid or expired. Please log in again.');
          localStorage.removeItem('accessToken');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }
      return response.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchLanguages = async () => {
    try {
      const data = await apiCall('/admin/languages');
      setLanguages(data);
      if (data.length > 0) setSelectedLanguageId(data[0].id);
    } catch (error) {
      console.error('Failed to fetch languages:', error);
    }
  };

  const fetchTopics = useCallback(async () => {
    try {
      const data = await apiCall(`/admin/topics/${selectedLanguageId}`);
      setTopics(data);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    }
  }, [selectedLanguageId]);

  const fetchLessons = useCallback(async (topicId?: number) => {
    if (!topicId) {
      setLessons([]);
      return;
    }
    try {
      const data = await apiCall(`/admin/lessons/${topicId}`);
      setLessons(data);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    }
  }, []);

  const fetchQuestions = useCallback(async (lessonId?: number) => {
    if (!lessonId) {
      setQuestions([]);
      return;
    }
    try {
      const data = await apiCall(`/admin/questions/${lessonId}`);
      setQuestions(data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  }, []);

  const fetchPracticeLessons = useCallback(async () => {
    try {
      const data = await apiCall(`/admin/practice-lessons/${selectedLanguageId}`);
      setPracticeLessons(data);
    } catch (error) {
      console.error('Failed to fetch practice lessons:', error);
    }
  }, [selectedLanguageId]);

  const fetchPracticeQuestions = useCallback(async (lessonId?: number) => {
    if (!lessonId) {
      setPracticeQuestions([]);
      return;
    }
    try {
      const data = await apiCall(`/admin/practice-questions/${lessonId}`);
      setPracticeQuestions(data);
    } catch (error) {
      console.error('Failed to fetch practice questions:', error);
    }
  }, []);

  const fetchMissions = useCallback(async (type?: 'daily' | 'weekly') => {
    try {
      const endpoint = type ? `/admin/missions?type=${type}` : '/admin/missions';
      const data = await apiCall(endpoint);
      // 🔥 FIX: Filter missions by selected language
      // Show missions that are either global (languageId = null) or match selected language
      const filteredMissions = data.filter((m: Mission) => 
        m.languageId === null || m.languageId === selectedLanguageId
      );
      setMissions(filteredMissions);
    } catch (error) {
      console.error('Failed to fetch missions:', error);
    }
  }, [selectedLanguageId]);

  const fetchAchievements = useCallback(async () => {
    try {
      const data = await apiCall('/admin/achievements');
      // 🔥 FIX: API doesn't support languageId query, so filter client-side
      // Show achievements that are either global (languageId undefined/null) or match selected language
      const filteredAchievements = data.filter((a: Achievement) => 
        a.languageId === undefined || a.languageId === null || a.languageId === selectedLanguageId
      );
      setAchievements(filteredAchievements);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    }
  }, [selectedLanguageId]);

  const fetchAvatars = useCallback(async () => {
    try {
      const data = await apiCall('/admin/avatars');
      setAvatars(data);
    } catch (error) {
      console.error('Failed to fetch avatars:', error);
    }
  }, []);

  // 🔥 FIX: Reset dependent data when language changes
  useEffect(() => {
    setSelectedTopicId(null);
    setSelectedLessonId(null);
    setSelectedPracticeLessonId(null);
    setLessons([]);
    setQuestions([]);
    setPracticeQuestions([]);
  }, [selectedLanguageId]);

  // 🔥 FIX: Reset questions when lesson changes
  useEffect(() => {
    if (currentTab === 'questions') {
      fetchQuestions(selectedLessonId || undefined);
    }
  }, [selectedLessonId, currentTab]);

  // Fetch data when tab changes
  useEffect(() => {
    switch (currentTab) {
      case 'topics':
        fetchTopics();
        break;
      case 'lessons':
        fetchLessons(selectedTopicId || undefined);
        break;
      case 'questions':
        fetchQuestions(selectedLessonId || undefined);
        break;
      case 'practice-lessons':
        fetchPracticeLessons();
        break;
      case 'practice-questions':
        fetchPracticeQuestions(selectedPracticeLessonId || undefined);
        break;
      case 'missions':
        fetchMissions();
        break;
      case 'achievements':
        fetchAchievements();
        break;
      case 'avatars':
        fetchAvatars();
        break;
    }
  }, [currentTab, selectedLanguageId, selectedTopicId, selectedPracticeLessonId]);

  const handleCreate = async (endpoint: string, data: any) => {
    setActionLoading(true);
    try {
      await apiCall(endpoint, { method: 'POST', body: JSON.stringify(data) });
      switch (currentTab) {
        case 'topics': fetchTopics(); break;
        case 'lessons': fetchLessons(selectedTopicId || undefined); break;
        case 'questions': fetchQuestions(selectedLessonId || undefined); break;
        case 'practice-lessons': fetchPracticeLessons(); break;
        case 'practice-questions': fetchPracticeQuestions(selectedPracticeLessonId || undefined); break;
        case 'missions': fetchMissions(); break;
        case 'achievements': fetchAchievements(); break;
        case 'avatars': fetchAvatars(); break;
      }
      setShowModal(false);
      setFormData({});
      setIsBulk(false);
      setBulkQuestions('');
      alert('✅ Created successfully!');
    } catch (error: any) {
      alert(`❌ Create failed: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = async (endpoint: string, id: number, data: any) => {
    setActionLoading(true);
    try {
      await apiCall(endpoint.replace(':id', id.toString()), { method: 'PUT', body: JSON.stringify(data) });
      switch (currentTab) {
        case 'topics': fetchTopics(); break;
        case 'lessons': fetchLessons(selectedTopicId || undefined); break;
        case 'questions': fetchQuestions(selectedLessonId || undefined); break;
        case 'practice-lessons': fetchPracticeLessons(); break;
        case 'practice-questions': fetchPracticeQuestions(selectedPracticeLessonId || undefined); break;
        case 'missions': fetchMissions(); break;
        case 'achievements': fetchAchievements(); break;
        case 'avatars': fetchAvatars(); break;
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({});
      alert('✅ Updated successfully!');
    } catch (error: any) {
      alert(`❌ Update failed: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (endpoint: string, id: number) => {
    if (!confirm('⚠️ Are you sure? This action cannot be undone.')) return;
    setActionLoading(true);
    try {
      await apiCall(endpoint.replace(':id', id.toString()), { method: 'DELETE' });
      switch (currentTab) {
        case 'topics': fetchTopics(); break;
        case 'lessons': fetchLessons(selectedTopicId || undefined); break;
        case 'questions': fetchQuestions(selectedLessonId || undefined); break;
        case 'practice-lessons': fetchPracticeLessons(); break;
        case 'practice-questions': fetchPracticeQuestions(selectedPracticeLessonId || undefined); break;
        case 'missions': fetchMissions(); break;
        case 'achievements': fetchAchievements(); break;
        case 'avatars': fetchAvatars(); break;
      }
      alert('✅ Deleted successfully!');
    } catch (error: any) {
      alert(`❌ Delete failed: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBulkCreateQuestions = async () => {
    setActionLoading(true);
    try {
      const questionsData = JSON.parse(bulkQuestions);
      await apiCall('/admin/questions/bulk', { 
        method: 'POST', 
        body: JSON.stringify({ lessonId: selectedLessonId, questions: questionsData }) 
      });
      fetchQuestions(selectedLessonId || undefined);
      setBulkQuestions('');
      setShowModal(false);
      setIsBulk(false);
      alert('✅ Bulk created successfully!');
    } catch (error: any) {
      alert(`❌ Bulk create failed: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const openModal = (type: 'create' | 'edit', id?: number, data?: any, bulk?: boolean) => {
    setModalType(type);
    setEditingId(id || null);
    setFormData(data || {});
    setIsBulk(bulk || false);
    setShowModal(true);
  };

  const renderTopicsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          📚 Topics
        </h2>
        <button 
          onClick={() => openModal('create')} 
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Create Topic
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80">
            <tr>
              {['ID', 'Title', 'Description', 'Icon', 'Active', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {topics.map((topic) => (
              <tr key={topic.id} className="hover:bg-indigo-50/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{topic.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">{topic.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={topic.description}>{topic.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-3xl">{topic.icon}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${topic.isActive ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 'bg-red-100 text-red-700 ring-2 ring-red-300'}`}>
                    {topic.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                  <button onClick={() => openModal('edit', topic.id, topic)} className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete('/admin/topics/:id', topic.id)} className="text-red-600 hover:text-red-800 transition-colors hover:underline">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {topics.length === 0 && !loading && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl text-gray-500 font-bold">No topics found. Create one to get started!</p>
        </div>
      )}
    </div>
  );

  const renderLessonsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
          📖 Lessons
        </h2>
        <button 
          onClick={() => openModal('create')} 
          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Create Lesson
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <label className="block text-base font-bold text-gray-700 mb-3">🎯 Select Topic</label>
        <select 
          onChange={(e) => setSelectedTopicId(e.target.value ? parseInt(e.target.value) : null)} 
          value={selectedTopicId || ''} 
          className="block w-full md:w-96 px-5 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold"
        >
          <option value="">Choose a topic...</option>
          {topics.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.title}</option>)}
        </select>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-50/80 via-cyan-50/80 to-teal-50/80">
            <tr>
              {['ID', 'Title', 'Difficulty', 'Active', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{lesson.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">{lesson.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${
                    lesson.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 
                    lesson.difficulty === 'medium' ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-300' : 
                    'bg-rose-100 text-rose-700 ring-2 ring-rose-300'
                  }`}>
                    {lesson.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${lesson.isActive ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 'bg-red-100 text-red-700 ring-2 ring-red-300'}`}>
                    {lesson.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                  <button onClick={() => openModal('edit', lesson.id, lesson)} className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete('/admin/lessons/:id', lesson.id)} className="text-red-600 hover:text-red-800 transition-colors hover:underline">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {lessons.length === 0 && !loading && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl text-gray-500 font-bold">No lessons found. Select a topic or create one!</p>
        </div>
      )}
    </div>
  );

  const renderQuestionsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          ❓ Questions
        </h2>
        <div className="space-x-3">
          <button 
            onClick={() => openModal('create')} 
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base inline-flex items-center gap-2"
          >
            <span className="text-2xl">+</span> Create Question
          </button>
          <button 
            onClick={() => openModal('create', undefined, {}, true)} 
            className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base inline-flex items-center gap-2"
          >
            <span className="text-2xl">📦</span> Bulk Create
          </button>
        </div>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <label className="block text-base font-bold text-gray-700 mb-3">📖 Select Lesson</label>
        <select 
          onChange={(e) => setSelectedLessonId(e.target.value ? parseInt(e.target.value) : null)} 
          value={selectedLessonId || ''} 
          className="block w-full md:w-96 px-5 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold"
        >
          <option value="">Choose a lesson...</option>
          {lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
        </select>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-green-50/80 via-emerald-50/80 to-teal-50/80">
            <tr>
              {['ID', 'Type', 'Text', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-green-50/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{q.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 ring-2 ring-blue-300">
                    {q.questionType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate" title={q.questionText}>{q.questionText}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                  <button onClick={() => openModal('edit', q.id, q)} className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete('/admin/questions/:id', q.id)} className="text-red-600 hover:text-red-800 transition-colors hover:underline">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {questions.length === 0 && !loading && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl text-gray-500 font-bold">No questions found. Select a lesson or create one!</p>
        </div>
      )}
    </div>
  );

  const renderPracticeLessonsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
          🎯 Practice Lessons
        </h2>
        <button 
          onClick={() => openModal('create')} 
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Create Practice
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-rose-50/80">
            <tr>
              {['ID', 'Title', 'Skill', 'Difficulty', 'Active', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {practiceLessons.map((pl) => (
              <tr key={pl.id} className="hover:bg-purple-50/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{pl.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">{pl.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 ring-2 ring-indigo-300">
                    {pl.skillType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${
                    pl.difficulty === 'beginner' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 
                    pl.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-300' : 
                    'bg-rose-100 text-rose-700 ring-2 ring-rose-300'
                  }`}>
                    {pl.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${pl.isActive ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 'bg-red-100 text-red-700 ring-2 ring-red-300'}`}>
                    {pl.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                  <button onClick={() => openModal('edit', pl.id, pl)} className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete('/admin/practice-lessons/:id', pl.id)} className="text-red-600 hover:text-red-800 transition-colors hover:underline">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {practiceLessons.length === 0 && !loading && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl text-gray-500 font-bold">No practice lessons found. Create one to get started!</p>
        </div>
      )}
    </div>
  );

  const renderPracticeQuestionsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          ❓ Practice Questions
        </h2>
        <button 
          onClick={() => openModal('create')} 
          className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Create Question
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <label className="block text-base font-bold text-gray-700 mb-3">🎯 Select Practice Lesson</label>
        <select 
          onChange={(e) => setSelectedPracticeLessonId(e.target.value ? parseInt(e.target.value) : null)} 
          value={selectedPracticeLessonId || ''} 
          className="block w-full md:w-96 px-5 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold"
        >
          <option value="">Choose a practice lesson...</option>
          {practiceLessons.map((pl) => <option key={pl.id} value={pl.id}>{pl.title}</option>)}
        </select>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-violet-50/80 via-fuchsia-50/80 to-pink-50/80">
            <tr>
              {['ID', 'Type', 'Text', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {practiceQuestions.map((pq) => (
              <tr key={pq.id} className="hover:bg-violet-50/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{pq.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 ring-2 ring-violet-300">
                    {pq.questionType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate" title={pq.questionText}>{pq.questionText}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                  <button onClick={() => openModal('edit', pq.id, pq)} className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete('/admin/practice-questions/:id', pq.id)} className="text-red-600 hover:text-red-800 transition-colors hover:underline">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {practiceQuestions.length === 0 && !loading && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl text-gray-500 font-bold">No practice questions found. Select a lesson or create one!</p>
        </div>
      )}
    </div>
  );

  const renderMissionsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 bg-clip-text text-transparent">
          🎯 Missions
        </h2>
        <button 
          onClick={() => openModal('create')} 
          className="bg-gradient-to-r from-orange-500 via-red-500 to-rose-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Create Mission
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50">
        <label className="block text-base font-bold text-gray-700 mb-3">🔍 Filter by Type</label>
        <select 
          onChange={(e) => fetchMissions(e.target.value as 'daily' | 'weekly' || undefined)} 
          className="block w-full md:w-64 px-5 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold"
        >
          <option value="">All Missions</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-orange-50/80 via-red-50/80 to-rose-50/80">
            <tr>
              {['ID', 'Title', 'Type', 'Active', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {missions.map((m) => (
              <tr key={m.id} className="hover:bg-orange-50/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{m.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">{m.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${
                    m.missionType === 'daily' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-300' : 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                  }`}>
                    {m.missionType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${m.isActive ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 'bg-red-100 text-red-700 ring-2 ring-red-300'}`}>
                    {m.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                  <button onClick={() => openModal('edit', m.id, m)} className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete('/admin/missions/:id', m.id)} className="text-red-600 hover:text-red-800 transition-colors hover:underline">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {missions.length === 0 && !loading && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl text-gray-500 font-bold">No missions found. Create one to get started!</p>
        </div>
      )}
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
          🏆 Achievements
        </h2>
        <button 
          onClick={() => openModal('create')} 
          className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Create Achievement
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-yellow-50/80 via-orange-50/80 to-red-50/80">
            <tr>
              {['ID', 'Name', 'Category', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {achievements.map((a) => (
              <tr key={a.id} className="hover:bg-yellow-50/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{a.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">{a.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 ring-2 ring-orange-300">
                    {a.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                  <button onClick={() => openModal('edit', a.id, a)} className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete('/admin/achievements/:id', a.id)} className="text-red-600 hover:text-red-800 transition-colors hover:underline">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {achievements.length === 0 && !loading && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl text-gray-500 font-bold">No achievements found. Create one to get started!</p>
        </div>
      )}
    </div>
  );

  const renderAvatarsTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          👤 Avatars
        </h2>
        <button 
          onClick={() => openModal('create')} 
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Create Avatar
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-cyan-50/80 via-blue-50/80 to-indigo-50/80">
            <tr>
              {['ID', 'Name', 'Rarity', 'Price (Coins)', 'Price (Gems)', 'Active', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {avatars.map((a) => (
              <tr key={a.id} className="hover:bg-cyan-50/30 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{a.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">{a.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${
                    a.rarity === 'common' ? 'bg-gray-100 text-gray-700 ring-2 ring-gray-300' :
                    a.rarity === 'rare' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-300' :
                    a.rarity === 'epic' ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300' :
                    'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-300'
                  }`}>
                    {a.rarity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{a.priceCoins || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{a.priceGems || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full ${a.isActive ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300' : 'bg-red-100 text-red-700 ring-2 ring-red-300'}`}>
                    {a.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                  <button onClick={() => openModal('edit', a.id, a)} className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete('/admin/avatars/:id', a.id)} className="text-red-600 hover:text-red-800 transition-colors hover:underline">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {avatars.length === 0 && !loading && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl text-gray-500 font-bold">No avatars found. Create one to get started!</p>
        </div>
      )}
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    const isEdit = modalType === 'edit';
    const title = `${isEdit ? '✏️ Edit' : '✨ Create'} ${currentTab.replace('-', ' ').toUpperCase()}`;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (currentTab === 'questions' && isBulk) {
        handleBulkCreateQuestions();
        return;
      }
      const endpoint = {
        topics: '/admin/topics',
        lessons: '/admin/lessons',
        questions: '/admin/questions',
        'practice-lessons': '/admin/practice-lessons',
        'practice-questions': '/admin/practice-questions',
        missions: '/admin/missions',
        achievements: '/admin/achievements',
        avatars: '/admin/avatars',
      }[currentTab] as string;

      let submitData = { ...formData };
      if (['topics', 'practice-lessons'].includes(currentTab)) {
        submitData.languageId = selectedLanguageId;
      }
      // Achievements and missions have optional languageId, set if desired
      if (['achievements', 'missions'].includes(currentTab)) {
        submitData.languageId = submitData.languageId || selectedLanguageId;
      }
      if (currentTab === 'lessons' && !submitData.topicId) {
        submitData.topicId = selectedTopicId;
      }
      if (currentTab === 'questions' && !submitData.lessonId) {
        submitData.lessonId = selectedLessonId;
      }
      if (currentTab === 'practice-questions' && !submitData.practiceLessonId) {
        submitData.practiceLessonId = selectedPracticeLessonId;
      }

      if (isEdit && editingId) {
        handleEdit(endpoint, editingId, submitData);
      } else {
        handleCreate(endpoint, submitData);
      }
    };

    const closeModal = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setShowModal(false);
        setIsBulk(false);
        setBulkQuestions('');
        setFormData({});
      }
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fadeIn" onClick={closeModal}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden transform transition-all duration-300 scale-100 border-2 border-gray-200">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-6">
            <h3 className="text-3xl font-extrabold text-white">{title}</h3>
          </div>
          <div className="p-8 max-h-[calc(85vh-120px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              {currentTab === 'topics' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                    <select value={selectedLanguageId} onChange={(e) => setSelectedLanguageId(parseInt(e.target.value))} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Language</option>
                      {languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>{lang.flagEmoji} {lang.name} ({lang.code})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                    <input placeholder="Enter title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea placeholder="Enter description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Icon (Emoji)</label>
                    <input placeholder="📚" value={formData.icon || ''} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                    <input type="number" placeholder="1" value={formData.displayOrder || ''} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive || false} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-base text-gray-700 font-bold">Active</span>
                  </label>
                </>
              )}
              {currentTab === 'lessons' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Topic *</label>
                    <select value={formData.topicId || selectedTopicId || ''} onChange={(e) => setFormData({ ...formData, topicId: parseInt(e.target.value) })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Topic</option>
                      {topics.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                    <input placeholder="Enter lesson title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea placeholder="Enter description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Order</label>
                      <input type="number" placeholder="1" value={formData.lessonOrder || ''} onChange={(e) => setFormData({ ...formData, lessonOrder: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Duration (min)</label>
                      <input type="number" placeholder="15" value={formData.durationMinutes || ''} onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">XP Reward</label>
                      <input type="number" placeholder="100" value={formData.xpReward || ''} onChange={(e) => setFormData({ ...formData, xpReward: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
                      <select value={formData.difficulty || ''} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                        <option value="">Select</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="boss">Boss</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Listening %</label>
                      <input type="number" min="0" max="100" placeholder="30" value={formData.listeningPercentage || ''} onChange={(e) => setFormData({ ...formData, listeningPercentage: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Speaking %</label>
                      <input type="number" min="0" max="100" placeholder="30" value={formData.speakingPercentage || ''} onChange={(e) => setFormData({ ...formData, speakingPercentage: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Reading %</label>
                      <input type="number" min="0" max="100" placeholder="20" value={formData.readingPercentage || ''} onChange={(e) => setFormData({ ...formData, readingPercentage: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Writing %</label>
                      <input type="number" min="0" max="100" placeholder="10" value={formData.writingPercentage || ''} onChange={(e) => setFormData({ ...formData, writingPercentage: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Grammar %</label>
                      <input type="number" min="0" max="100" placeholder="5" value={formData.grammarPercentage || ''} onChange={(e) => setFormData({ ...formData, grammarPercentage: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Vocabulary %</label>
                      <input type="number" min="0" max="100" placeholder="5" value={formData.vocabularyPercentage || ''} onChange={(e) => setFormData({ ...formData, vocabularyPercentage: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" checked={formData.isBossFight || false} onChange={(e) => setFormData({ ...formData, isBossFight: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-base text-gray-700 font-bold">Boss Fight</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" checked={formData.isActive !== false} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-base text-gray-700 font-bold">Active</span>
                    </label>
                  </div>
                </>
              )}
              {currentTab === 'questions' && !isBulk && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Lesson *</label>
                    <select value={formData.lessonId || selectedLessonId || ''} onChange={(e) => setFormData({ ...formData, lessonId: parseInt(e.target.value) })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Lesson</option>
                      {lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Question Type *</label>
                    <select value={formData.questionType || ''} onChange={(e) => setFormData({ ...formData, questionType: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Type</option>
                      <option value="listening">🎧 Listening</option>
                      <option value="speaking">🎤 Speaking</option>
                      <option value="reading">📖 Reading</option>
                      <option value="writing">✍️ Writing</option>
                      <option value="grammar">📝 Grammar</option>
                      <option value="vocabulary">📚 Vocabulary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Question Text *</label>
                    <textarea placeholder="Enter question text" value={formData.questionText || ''} onChange={(e) => setFormData({ ...formData, questionText: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Text to Speak (for listening)</label>
                    <input placeholder="Hello, how are you?" value={formData.textToSpeak || ''} onChange={(e) => setFormData({ ...formData, textToSpeak: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Options (JSON array)</label>
                    <input placeholder='["A) Option 1", "B) Option 2", "C) Option 3"]' value={JSON.stringify(formData.options || [])} onChange={(e) => { try { setFormData({ ...formData, options: JSON.parse(e.target.value) }); } catch {} }} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Correct Answer *</label>
                    <input placeholder="A" value={formData.correctAnswer || ''} onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Expected Answer (for speaking/writing)</label>
                    <input placeholder="How are you" value={formData.expectedAnswer || ''} onChange={(e) => setFormData({ ...formData, expectedAnswer: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Explanation *</label>
                    <textarea placeholder="Explanation for this answer" value={formData.explanation || ''} onChange={(e) => setFormData({ ...formData, explanation: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                    <input type="number" placeholder="1" value={formData.displayOrder || ''} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                </>
              )}
              {currentTab === 'questions' && isBulk && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Lesson *</label>
                    <select value={selectedLessonId || ''} onChange={(e) => setSelectedLessonId(e.target.value ? parseInt(e.target.value) : null)} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Lesson</option>
                      {lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Questions JSON Array *</label>
                    <textarea placeholder='[{"questionType":"listening","questionText":"...","correctAnswer":"A","explanation":"..."}]' value={bulkQuestions} onChange={(e) => setBulkQuestions(e.target.value)} rows={12} className="w-full px-4 py-3.5 text-sm border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono" />
                  </div>
                </>
              )}
              {currentTab === 'practice-lessons' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Language *</label>
                    <select value={selectedLanguageId} onChange={(e) => setSelectedLanguageId(parseInt(e.target.value))} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Language</option>
                      {languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>{lang.flagEmoji} {lang.name} ({lang.code})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Skill Type *</label>
                    <select value={formData.skillType || ''} onChange={(e) => setFormData({ ...formData, skillType: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Skill</option>
                      <option value="listening">🎧 Listening</option>
                      <option value="speaking">🎤 Speaking</option>
                      <option value="reading">📖 Reading</option>
                      <option value="writing">✍️ Writing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                    <input placeholder="Enter title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea placeholder="Enter description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Duration (min) *</label>
                      <input type="number" placeholder="15" value={formData.durationMinutes || ''} onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Total Questions *</label>
                      <input type="number" placeholder="10" value={formData.totalQuestions || ''} onChange={(e) => setFormData({ ...formData, totalQuestions: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty *</label>
                    <select value={formData.difficulty || ''} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                    <input type="number" placeholder="1" value={formData.displayOrder || ''} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive || false} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-base text-gray-700 font-bold">Active</span>
                  </label>
                </>
              )}
              {currentTab === 'practice-questions' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Practice Lesson *</label>
                    <select value={formData.practiceLessonId || selectedPracticeLessonId || ''} onChange={(e) => setFormData({ ...formData, practiceLessonId: parseInt(e.target.value) })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Practice Lesson</option>
                      {practiceLessons.map((pl) => <option key={pl.id} value={pl.id}>{pl.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Question Type *</label>
                    <select value={formData.questionType || ''} onChange={(e) => setFormData({ ...formData, questionType: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Type</option>
                      <option value="listening">🎧 Listening</option>
                      <option value="speaking">🎤 Speaking</option>
                      <option value="reading">📖 Reading</option>
                      <option value="writing">✍️ Writing</option>
                      <option value="grammar">📝 Grammar</option>
                      <option value="vocabulary">📚 Vocabulary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Question Text *</label>
                    <textarea placeholder="Enter question text" value={formData.questionText || ''} onChange={(e) => setFormData({ ...formData, questionText: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Text to Speak (for listening)</label>
                    <input placeholder="Hello, how are you?" value={formData.textToSpeak || ''} onChange={(e) => setFormData({ ...formData, textToSpeak: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Options (JSON array)</label>
                    <input placeholder='["A) Option 1", "B) Option 2", "C) Option 3"]' value={JSON.stringify(formData.options || [])} onChange={(e) => { try { setFormData({ ...formData, options: JSON.parse(e.target.value) }); } catch {} }} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Correct Answer *</label>
                    <input placeholder="A" value={formData.correctAnswer || ''} onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Expected Answer (for speaking/writing)</label>
                    <input placeholder="How are you" value={formData.expectedAnswer || ''} onChange={(e) => setFormData({ ...formData, expectedAnswer: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Explanation</label>
                    <textarea placeholder="Explanation for this answer" value={formData.explanation || ''} onChange={(e) => setFormData({ ...formData, explanation: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                    <input type="number" placeholder="1" value={formData.displayOrder || ''} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                </>
              )}
              {currentTab === 'missions' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Language (optional)</label>
                    <select value={formData.languageId || ''} onChange={(e) => setFormData({ ...formData, languageId: e.target.value ? parseInt(e.target.value) : undefined })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Global (no language)</option>
                      {languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>{lang.flagEmoji} {lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                    <input placeholder="Enter title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea placeholder="Enter description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mission Type *</label>
                    <select value={formData.missionType || ''} onChange={(e) => setFormData({ ...formData, missionType: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Type</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Requirement Type *</label>
                    <input placeholder="e.g., complete_lessons" value={formData.requirementType || ''} onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Requirement Count *</label>
                    <input type="number" placeholder="5" value={formData.requirementCount || ''} onChange={(e) => setFormData({ ...formData, requirementCount: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Reward XP *</label>
                      <input type="number" placeholder="100" value={formData.rewardXp || ''} onChange={(e) => setFormData({ ...formData, rewardXp: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Reward Coins *</label>
                      <input type="number" placeholder="50" value={formData.rewardCoins || ''} onChange={(e) => setFormData({ ...formData, rewardCoins: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Reward Gems *</label>
                      <input type="number" placeholder="10" value={formData.rewardGems || ''} onChange={(e) => setFormData({ ...formData, rewardGems: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                  </div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive || false} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-base text-gray-700 font-bold">Active</span>
                  </label>
                </>
              )}
              {currentTab === 'achievements' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Language (optional)</label>
                    <select value={formData.languageId || ''} onChange={(e) => setFormData({ ...formData, languageId: e.target.value ? parseInt(e.target.value) : undefined })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Global (no language)</option>
                      {languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>{lang.flagEmoji} {lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                    <input placeholder="Enter name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea placeholder="Enter description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Icon (Emoji)</label>
                    <input placeholder="🏆" value={formData.icon || ''} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                    <select value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Category</option>
                      <option value="listening">Listening</option>
                      <option value="speaking">Speaking</option>
                      <option value="reading">Reading</option>
                      <option value="writing">Writing</option>
                      <option value="grammar">Grammar</option>
                      <option value="vocabulary">Vocabulary</option>
                      <option value="streak">Streak</option>
                      <option value="level">Level</option>
                      <option value="topic">Topic</option>
                      <option value="special">Special</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Requirement Type *</label>
                    <input placeholder="e.g., complete_lessons" value={formData.requirementType || ''} onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Requirement Count *</label>
                    <input type="number" placeholder="10" value={formData.requirementCount || ''} onChange={(e) => setFormData({ ...formData, requirementCount: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Reward XP *</label>
                      <input type="number" placeholder="200" value={formData.rewardXp || ''} onChange={(e) => setFormData({ ...formData, rewardXp: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Reward Coins *</label>
                      <input type="number" placeholder="100" value={formData.rewardCoins || ''} onChange={(e) => setFormData({ ...formData, rewardCoins: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Reward Gems *</label>
                      <input type="number" placeholder="20" value={formData.rewardGems || ''} onChange={(e) => setFormData({ ...formData, rewardGems: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Title (Display)</label>
                    <input placeholder="Achievement Title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                    <input type="number" placeholder="1" value={formData.displayOrder || ''} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                </>
              )}
              {currentTab === 'avatars' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                    <input placeholder="Enter avatar name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea placeholder="Enter description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Avatar Seed *</label>
                    <input placeholder="e.g., warrior123" value={formData.avatarSeed || ''} onChange={(e) => setFormData({ ...formData, avatarSeed: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Avatar Style</label>
                    <input placeholder="e.g., adventurer" value={formData.avatarStyle || ''} onChange={(e) => setFormData({ ...formData, avatarStyle: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Icon URL (optional, auto-generated if empty)</label>
                    <input placeholder="https://api.dicebear.com/..." value={formData.iconUrl || ''} onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Rarity *</label>
                    <select value={formData.rarity || ''} onChange={(e) => setFormData({ ...formData, rarity: e.target.value })} required className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold">
                      <option value="">Select Rarity</option>
                      <option value="common">Common</option>
                      <option value="rare">Rare</option>
                      <option value="epic">Epic</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Price Coins</label>
                      <input type="number" placeholder="100" value={formData.priceCoins || ''} onChange={(e) => setFormData({ ...formData, priceCoins: parseInt(e.target.value) || undefined })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Price Gems</label>
                      <input type="number" placeholder="50" value={formData.priceGems || ''} onChange={(e) => setFormData({ ...formData, priceGems: parseInt(e.target.value) || undefined })} className="w-full px-4 py-3.5 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium" />
                    </div>
                  </div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={formData.isDefault || false} onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-base text-gray-700 font-bold">Default</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive || false} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-base text-gray-700 font-bold">Active</span>
                  </label>
                </>
              )}
              <div className="flex space-x-4 pt-6 border-t-2 border-gray-200">
                <button type="submit" disabled={actionLoading} className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 font-bold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105">
                  {actionLoading ? '⏳ Saving...' : (isEdit ? '✅ Update' : '✨ Create')}
                </button>
                <button type="button" onClick={() => { setShowModal(false); setIsBulk(false); setBulkQuestions(''); setFormData({}); }} className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white py-4 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 font-bold text-lg shadow-xl transform hover:scale-105">
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (loading && languages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-2xl font-bold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>

      {/* SIDEBAR */}
      <nav className="w-80 bg-gradient-to-b from-slate-50 to-slate-100 shadow-2xl border-r border-slate-200 fixed h-screen overflow-y-auto">
        <div className="p-8">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">👑</div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Admin
              </h1>
            </div>
            <p className="text-sm text-slate-500 font-medium ml-12">Control Center</p>
          </div>

          {/* Menu Sections */}
          <div className="space-y-6">
            {/* CONTENT MANAGEMENT */}
            <div>
              <SectionHeader 
                label="📚 Content Management" 
                sectionKey="content"
                isExpanded={expandedSections.content}
              />
              {expandedSections.content && (
                <ul className="space-y-2 ml-2">
                  <li>
                    <NavButton 
                      isActive={currentTab === 'topics'}
                      onClick={() => setCurrentTab('topics')}
                    >
                      <span>📚</span>
                      Topics
                    </NavButton>
                  </li>
                  <li>
                    <NavButton 
                      isActive={currentTab === 'lessons'}
                      onClick={() => setCurrentTab('lessons')}
                    >
                      <span>📖</span>
                      Lessons
                    </NavButton>
                  </li>
                  <li>
                    <NavButton 
                      isActive={currentTab === 'questions'}
                      onClick={() => setCurrentTab('questions')}
                    >
                      <span>❓</span>
                      Questions
                    </NavButton>
                  </li>
                </ul>
              )}
            </div>

            {/* PRACTICE */}
            <div>
              <SectionHeader 
                label="🎯 Practice" 
                sectionKey="practice"
                isExpanded={expandedSections.practice}
              />
              {expandedSections.practice && (
                <ul className="space-y-2 ml-2">
                  <li>
                    <NavButton 
                      isActive={currentTab === 'practice-lessons'}
                      onClick={() => setCurrentTab('practice-lessons')}
                    >
                      <span>🎯</span>
                      Lessons
                    </NavButton>
                  </li>
                  <li>
                    <NavButton 
                      isActive={currentTab === 'practice-questions'}
                      onClick={() => setCurrentTab('practice-questions')}
                    >
                      <span>❓</span>
                      Questions
                    </NavButton>
                  </li>
                </ul>
              )}
            </div>

            {/* GAMIFICATION */}
            <div>
              <SectionHeader 
                label="🎮 Gamification" 
                sectionKey="gamification"
                isExpanded={expandedSections.gamification}
              />
              {expandedSections.gamification && (
                <ul className="space-y-2 ml-2">
                  <li>
                    <NavButton 
                      isActive={currentTab === 'missions'}
                      onClick={() => setCurrentTab('missions')}
                    >
                      <span>🎯</span>
                      Missions
                    </NavButton>
                  </li>
                  <li>
                    <NavButton 
                      isActive={currentTab === 'achievements'}
                      onClick={() => setCurrentTab('achievements')}
                    >
                      <span>🏆</span>
                      Achievements
                    </NavButton>
                  </li>
                </ul>
              )}
            </div>

            {/* CUSTOMIZATION */}
            <div>
              <SectionHeader 
                label="👤 Customization" 
                sectionKey="customization"
                isExpanded={expandedSections.customization}
              />
              {expandedSections.customization && (
                <ul className="space-y-2 ml-2">
                  <li>
                    <NavButton 
                      isActive={currentTab === 'avatars'}
                      onClick={() => setCurrentTab('avatars')}
                    >
                      <span>👤</span>
                      Avatars
                    </NavButton>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Dashboard Button */}
          <Link href="/admin/dashboard">
            <button className="w-full mb-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-200 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 justify-center group">
              <span className="text-2xl group-hover:scale-125 transition-transform">📊</span>
              Dashboard
            </button>
          </Link>

          {/* Language Selector */}
          <div className="mt-12 pt-8 border-t border-slate-300">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              🌍 Language
            </label>
            <select 
              value={selectedLanguageId} 
              onChange={(e) => setSelectedLanguageId(parseInt(e.target.value))} 
              className="w-full px-4 py-3 text-sm bg-white border-2 border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold text-slate-700 hover:border-slate-400"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.flagEmoji} {lang.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('accessToken');
              window.location.href = '/login';
            }}
            className="w-full mt-6 bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:from-red-600 hover:to-rose-600 shadow-lg hover:shadow-xl flex items-center gap-3 justify-center"
          >
            {/* <span className="text-lg">🚪</span> */}
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-80 p-8 overflow-y-auto">
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-fadeIn">
            <p className="text-red-700 font-bold">⚠️ Error: {error}</p>
          </div>
        )}
        {loading && (
          <div className="fixed top-4 right-4 bg-white rounded-xl shadow-xl px-6 py-3 border-2 border-indigo-200 animate-fadeIn z-50">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
              <span className="text-base font-bold text-gray-700">Loading...</span>
            </div>
          </div>
        )}
        {actionLoading && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-xl px-6 py-3 animate-fadeIn z-50">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span className="text-base font-bold">Processing...</span>
            </div>
          </div>
        )}

        {/* Render tabs */}
        {currentTab === 'topics' && renderTopicsTab()}
        {currentTab === 'lessons' && renderLessonsTab()}
        {currentTab === 'questions' && renderQuestionsTab()}
        {currentTab === 'practice-lessons' && renderPracticeLessonsTab()}
        {currentTab === 'practice-questions' && renderPracticeQuestionsTab()}
        {currentTab === 'missions' && renderMissionsTab()}
        {currentTab === 'achievements' && renderAchievementsTab()}
        {currentTab === 'avatars' && renderAvatarsTab()}
      </main>

      {renderModal()}
    </div>
  );
};

export default AdminPage;


// API tạo practice-lessons: http://localhost:3000/api/admin/practice-lessons
// Request:
    // {
    //   "languageId": 1,
    //   "skillType": "listening",
    //   "title": "Listening Practice - Greetings",
    //   "description": "basic listening practice 2",
    //   "durationMinutes": 10,
    //   "totalQuestions": 5,
    //   "difficulty": "beginner",
    //   "displayOrder": 1
    // }
// Response:
    // {
    //     "id": 5,
    //     "languageId": 1,
    //     "skillType": "listening",
    //     "title": "Listening Practice - Greetings",
    //     "description": "basic listening practice 2",
    //     "durationMinutes": 10,
    //     "totalQuestions": 5,
    //     "difficulty": "beginner",
    //     "displayOrder": 1,
    //     "isLocked": false,
    //     "isActive": true,
    //     "createdAt": "2025-10-13T07:41:39.000Z",
    //     "updatedAt": "2025-10-13T07:41:39.000Z"
    // }
      
