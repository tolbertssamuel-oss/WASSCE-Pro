import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Legend
} from "recharts";
import { BarChart3, TrendingUp, Target, Clock, Award, BookOpen, Zap } from "lucide-react";

const COLORS = ["#0B5ED7", "#198754", "#FFC107", "#DC3545", "#6F42C1", "#0DCAF0", "#FD7E14", "#20C997"];

export default function Analytics() {
  const { data: dashboardData } = trpc.dashboard.student.useQuery();
  const { data: subjects } = trpc.subject.list.useQuery();

  const weeklyData = dashboardData?.weeklyProgress || Array.from({ length: 7 }, (_, i) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return { day: days[i], questions: Math.floor(Math.random() * 30) + 5, correct: Math.floor(Math.random() * 25) + 3 };
  });

  const subjectData = dashboardData?.subjectPerformance?.map((s) => ({
    name: s.subject.slice(0, 12),
    accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0,
    attempted: s.attempted,
  })) || subjects?.map((s) => ({
    name: s.name.slice(0, 12),
    accuracy: 60 + Math.floor(Math.random() * 30),
    attempted: Math.floor(Math.random() * 100) + 20,
  })) || [];

  const strengthData = [
    { subject: "Algebra", score: 85 },
    { subject: "Geometry", score: 70 },
    { subject: "Trig", score: 60 },
    { subject: "Calculus", score: 75 },
    { subject: "Stats", score: 90 },
    { subject: "Number", score: 65 },
  ];

  const stats = [
    { label: "Total Practice", value: dashboardData?.totalPractice || 0, icon: BookOpen, color: "#0B5ED7" },
    { label: "Mock Exams", value: dashboardData?.totalMockExams || 0, icon: Target, color: "#DC3545" },
    { label: "Questions Done", value: dashboardData?.totalQuestions || 0, icon: Zap, color: "#FFC107" },
    { label: "Avg Accuracy", value: `${dashboardData?.averageAccuracy || 0}%`, icon: TrendingUp, color: "#198754" },
  ];

  const topicData = [
    { name: "Strong", value: 8 },
    { name: "Moderate", value: 5 },
    { name: "Weak", value: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Performance Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your learning progress and identify areas for improvement</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0B5ED7]" /> Weekly Progress
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="questions" fill="#0B5ED7" radius={[4, 4, 0, 0]} name="Attempted" />
                <Bar dataKey="correct" fill="#198754" radius={[4, 4, 0, 0]} name="Correct" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#0B5ED7]" /> Subject Performance
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Bar dataKey="accuracy" fill="#0B5ED7" radius={[0, 4, 4, 0]} name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0B5ED7]" /> Strength Analysis
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={strengthData}>
                <PolarGrid stroke="#eee" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="#0B5ED7" fill="#0B5ED7" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0B5ED7]" /> Topic Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={topicData} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name" label>
                  {topicData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
