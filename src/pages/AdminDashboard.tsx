import { useState } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Users, HelpCircle, FileText, MessageSquare,
  BarChart3, Settings, Shield, Activity,
  BookOpen,
  Search, Download, Plus,
  Edit, Trash2, Eye, CheckCircle2
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Students", id: "students" },
  { icon: HelpCircle, label: "Questions", id: "questions" },
  { icon: FileText, label: "Mock Exams", id: "exams" },
  { icon: BookOpen, label: "Study Notes", id: "notes" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { data: adminData } = trpc.dashboard.admin.useQuery();
  const { data: subjects } = trpc.subject.list.useQuery();
  const { data: messages } = trpc.contact.list.useQuery();

  const stats = [
    { label: "Total Students", value: adminData?.stats?.totalStudents || 0, icon: Users, color: "#0B5ED7", change: "+12%" },
    { label: "Total Questions", value: adminData?.stats?.totalQuestions || 0, icon: HelpCircle, color: "#198754", change: "+8%" },
    { label: "Practice Sessions", value: adminData?.stats?.totalPracticeSessions || 0, icon: Activity, color: "#FFC107", change: "+24%" },
    { label: "Mock Exams", value: adminData?.stats?.totalMockExams || 0, icon: FileText, color: "#DC3545", change: "+15%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B5ED7] to-[#6F42C1] flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500">Manage your WASSCE Prep platform</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    activeTab === item.id
                      ? "bg-[#0B5ED7]/10 text-[#0B5ED7] font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {activeTab === "dashboard" && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                          <s.icon className="w-4 h-4" style={{ color: s.color }} />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 rounded-full px-2 py-0.5">{s.change}</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{s.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Students</h3>
                    <div className="space-y-3">
                      {adminData?.recentUsers?.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0B5ED7]/10 flex items-center justify-center text-[#0B5ED7] text-xs font-semibold">
                            {user.name?.[0] || "?"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name || "Anonymous"}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                          <span className="text-xs text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      )) || (
                        <div className="text-center py-6 text-gray-500 text-sm">No students registered yet</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Messages</h3>
                    <div className="space-y-3">
                      {messages?.slice(0, 5).map((msg) => (
                        <div key={msg.id} className="flex items-start gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold shrink-0">
                            {msg.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{msg.name}</span>
                              <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                          </div>
                        </div>
                      )) || (
                        <div className="text-center py-6 text-gray-500 text-sm">No messages yet</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Subject Overview</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {subjects?.map((s) => (
                      <div key={s.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-center">
                        <div className="text-lg font-bold text-[#0B5ED7]">{s.totalQuestions}</div>
                        <div className="text-xs text-gray-500 truncate">{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "students" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Students</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Search..." className="pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm bg-transparent" />
                    </div>
                    <Button size="sm" variant="outline" className="gap-1"><Download className="w-3.5 h-3.5" /> Export</Button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {adminData?.recentUsers?.map((user) => (
                    <div key={user.id} className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0B5ED7]/10 flex items-center justify-center text-[#0B5ED7] text-sm font-semibold">
                        {user.name?.[0] || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name || "Anonymous"}</div>
                        <div className="text-xs text-gray-500">{user.email} · {user.role}</div>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><Eye className="w-4 h-4 text-gray-400" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><Edit className="w-4 h-4 text-gray-400" /></button>
                      </div>
                    </div>
                  )) || (
                    <div className="p-8 text-center text-gray-500">No students found</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "questions" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Question Management</h3>
                <p className="text-sm text-gray-500 mb-4">Add, edit, and organize practice questions</p>
                <Button className="bg-[#0B5ED7] gap-2"><Plus className="w-4 h-4" /> Add Question</Button>
              </div>
            )}

            {activeTab === "exams" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mock Exam Management</h3>
                <p className="text-sm text-gray-500 mb-4">Create and manage mock examinations</p>
                <Button className="bg-[#0B5ED7] gap-2"><Plus className="w-4 h-4" /> Create Exam</Button>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Study Notes Management</h3>
                <p className="text-sm text-gray-500 mb-4">Upload and manage study materials</p>
                <Button className="bg-[#0B5ED7] gap-2"><Plus className="w-4 h-4" /> Add Note</Button>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Contact Messages</h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {messages?.map((msg) => (
                    <div key={msg.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-gray-900 dark:text-white">{msg.name}</span>
                          <span className="text-xs text-gray-500">{msg.email}</span>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{msg.message}</p>
                      <div className="flex gap-2">
                        <button className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Mark as read</button>
                        <button className="text-xs text-red-600 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
                      </div>
                    </div>
                  )) || (
                    <div className="p-8 text-center text-gray-500">No messages</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="grid gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform Overview</h3>
                  <div className="h-48 flex items-center justify-center text-gray-400">
                    <BarChart3 className="w-12 h-12 text-gray-300" />
                    <span className="ml-2">Analytics charts will appear here</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform Settings</h3>
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-white">Maintenance Mode</div>
                      <div className="text-xs text-gray-500">Temporarily disable the platform</div>
                    </div>
                    <button className="w-11 h-6 bg-gray-300 rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" /></button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-white">User Registration</div>
                      <div className="text-xs text-gray-500">Allow new user signups</div>
                    </div>
                    <button className="w-11 h-6 bg-[#0B5ED7] rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" /></button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-white">Email Notifications</div>
                      <div className="text-xs text-gray-500">Send email alerts for new registrations</div>
                    </div>
                    <button className="w-11 h-6 bg-[#0B5ED7] rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
