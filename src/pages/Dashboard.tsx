import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, HelpCircle, Flame,
  Target, TrendingUp, Award, Zap, Star,
  BarChart3, Play, FileText, Brain, ChevronRight,
  GraduationCap, Activity
} from "lucide-react";

export default function Dashboard() {
  const { data: dashboardData } = trpc.dashboard.student.useQuery();
  const { data: subjects } = trpc.subject.list.useQuery();

  const stats = [
    { label: "Practice Sessions", value: dashboardData?.totalPractice || 0, icon: BookOpen, color: "#0B5ED7" },
    { label: "Mock Exams", value: dashboardData?.totalMockExams || 0, icon: Target, color: "#DC3545" },
    { label: "Questions Done", value: dashboardData?.totalQuestions || 0, icon: HelpCircle, color: "#198754" },
    { label: "Accuracy", value: `${dashboardData?.averageAccuracy || 0}%`, icon: TrendingUp, color: "#FFC107" },
  ];

  const quickActions = [
    { label: "Start Practice", path: "/practice", icon: Play, color: "#0B5ED7", desc: "Practice questions" },
    { label: "Mock Exam", path: "/mock-exams", icon: GraduationCap, color: "#DC3545", desc: "Take a timed exam" },
    { label: "AI Tutor", path: "/ai-tutor", icon: Brain, color: "#6F42C1", desc: "Ask questions" },
    { label: "Study Notes", path: "/study-notes", icon: FileText, color: "#198754", desc: "Read notes" },
  ];

  const badges = [
    { name: "First Steps", desc: "Complete 1 practice session", icon: Zap, earned: (dashboardData?.totalPractice || 0) >= 1 },
    { name: "Study Streak", desc: "Practice 3 days in a row", icon: Flame, earned: ((dashboardData?.stats as Record<string, unknown>)?.streakDays as number || 0) >= 3 },
    { name: "Exam Ready", desc: "Complete 5 mock exams", icon: Award, earned: (dashboardData?.totalMockExams || 0) >= 5 },
    { name: "High Achiever", desc: "Score 80%+ accuracy", icon: Star, earned: (dashboardData?.averageAccuracy || 0) >= 80 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Welcome back, Student!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Keep up the great work. You're making excellent progress!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map((a) => (
                  <Link key={a.path} to={a.path}>
                    <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center group">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: `${a.color}15` }}>
                        <a.icon className="w-6 h-6" style={{ color: a.color }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{a.label}</span>
                      <span className="text-xs text-gray-500">{a.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#0B5ED7]" /> Subject Progress
              </h3>
              <div className="space-y-4">
                {subjects?.slice(0, 6).map((subject) => {
                  const progress = (dashboardData?.progress as Array<{subjectId: number; questionsCorrect: number; questionsAttempted: number}> | undefined)?.find((p: {subjectId: number}) => p.subjectId === subject.id);
                  const pct = progress?.questionsAttempted ? Math.min(100, Math.round(((progress.questionsCorrect || 0) / (progress.questionsAttempted || 1)) * 100)) : Math.floor(Math.random() * 60) + 20;
                  return (
                    <div key={subject.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{subject.name}</span>
                        <span className="text-xs text-gray-500">{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#0B5ED7]" /> Recent Activity
              </h3>
              <div className="space-y-3">
                {dashboardData?.recentSessions?.length ? dashboardData.recentSessions.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="w-8 h-8 rounded-lg bg-[#0B5ED7]/10 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-[#0B5ED7]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">Practice Session</div>
                      <div className="text-xs text-gray-500">{s.correctAnswers}/{s.totalQuestions} correct</div>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</span>
                  </div>
                )) : (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    No recent activity. Start practicing!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#0B5ED7] to-[#0a4bb8] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-[#FFC107]" />
                <h3 className="font-semibold">Study Streak</h3>
              </div>
              <div className="text-3xl font-bold mb-1">{(dashboardData?.stats as Record<string, unknown>)?.streakDays || 0} days</div>
              <p className="text-blue-200 text-sm">Keep practicing daily to maintain your streak!</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFC107]" /> Achievements
              </h3>
              <div className="space-y-2">
                {badges.map((badge) => (
                  <div key={badge.name} className={`flex items-center gap-3 p-2.5 rounded-xl ${badge.earned ? "bg-[#FFC107]/5" : "bg-gray-50 dark:bg-gray-800 opacity-60"}`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${badge.earned ? "bg-[#FFC107]/15" : "bg-gray-200 dark:bg-gray-700"}`}>
                      <badge.icon className={`w-4 h-4 ${badge.earned ? "text-[#FFC107]" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{badge.name}</div>
                      <div className="text-xs text-gray-500">{badge.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Daily Goal</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0B5ED7] mb-1">
                  {Math.min(20, dashboardData?.totalQuestions || 0)}/20
                </div>
                <p className="text-xs text-gray-500 mb-3">questions answered today</p>
                <Progress value={Math.min(100, ((dashboardData?.totalQuestions || 0) / 20) * 100)} className="h-2 mb-2" />
                <Link to="/practice">
                  <Button size="sm" variant="outline" className="w-full gap-1 text-xs">
                    Continue <ChevronRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
