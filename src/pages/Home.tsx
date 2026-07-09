import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  BookOpen, GraduationCap, BarChart3, FileText, Brain, HelpCircle,
  Trophy, Award, Users, Star, CheckCircle2, Play,
  Clock, Zap, Target, Sparkles
} from "lucide-react";

const features = [
  { icon: HelpCircle, title: "Practice Questions", desc: "Thousands of WASSCE-style questions across all subjects with detailed explanations", color: "#0B5ED7" },
  { icon: FileText, title: "Mock Exams", desc: "Full-length timed mock exams that simulate the real WASSCE experience", color: "#DC3545" },
  { icon: BarChart3, title: "Performance Analytics", desc: "Track your progress with detailed charts showing strengths and weaknesses", color: "#198754" },
  { icon: BookOpen, title: "Study Notes", desc: "Comprehensive study notes written by experienced Liberian teachers", color: "#6F42C1" },
  { icon: FileText, title: "Past Questions", desc: "Access WASSCE past questions from previous years organized by topic", color: "#FD7E14" },
  { icon: Brain, title: "AI Tutor", desc: "Get instant help from our AI tutor - ask questions and get explanations 24/7", color: "#0DCAF0" },
  { icon: Zap, title: "Daily Quiz", desc: "Test your knowledge every day with our quick daily quiz challenge", color: "#FFC107" },
  { icon: Trophy, title: "Leaderboards", desc: "Compete with students across Liberia and see how you rank", color: "#20C997" },
  { icon: Award, title: "Certificates", desc: "Earn certificates for completing mock exams and achieving milestones", color: "#E83E8C" },
];

const stats = [
  { label: "Students Registered", value: 12500, suffix: "+" },
  { label: "Practice Questions", value: 15000, suffix: "+" },
  { label: "Mock Exams Taken", value: 8500, suffix: "+" },
  { label: "Average Improvement", value: 35, suffix: "%" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

export default function Home() {
  const { data: subjects } = trpc.subject.list.useQuery();
  const { data: testimonials } = trpc.testimonial.list.useQuery();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B5ED7] via-[#0B5ED7] to-[#0a4bb8] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFC107] rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#198754] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
                <Sparkles className="w-4 h-4 text-[#FFC107]" />
                <span>#1 WASSCE Prep Platform in Liberia</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Prepare for WASSCE with{" "}
                <span className="text-[#FFC107]">Confidence</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                Practice thousands of real exam questions, track your progress, and improve your scores with Liberia's smartest WASSCE learning platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-[#0B5ED7] hover:bg-blue-50 font-semibold gap-2 text-base px-8">
                    <GraduationCap className="w-5 h-5" />
                    Start Learning
                  </Button>
                </Link>
                <Link to="/practice">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold gap-2 text-base px-8">
                    <Play className="w-5 h-5" />
                    Practice Now
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-blue-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC107]" />
                  <span>Free to Start</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC107]" />
                  <span>15,000+ Questions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC107]" />
                  <span>AI Tutor</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-[420px] h-[420px] bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6 flex flex-col gap-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFC107] flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Mathematics Practice</div>
                      <div className="text-xs text-blue-200">Question 1 of 20</div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm">Solve for x: 2x + 5 = 17</p>
                  </div>
                  <div className="space-y-2">
                    {["x = 5", "x = 6", "x = 7", "x = 8"].map((opt, i) => (
                      <div key={i} className={`flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2.5 text-sm ${i === 1 ? "ring-2 ring-[#FFC107]" : ""}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${i === 1 ? "border-[#FFC107] bg-[#FFC107] text-[#0B5ED7]" : "border-white/40"}`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between text-xs text-blue-200">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2:30 remaining</span>
                    <span>Score: 0/20</span>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#198754] rounded-2xl flex flex-col items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                  <span className="text-xs font-bold text-white">TOP 5%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Everything You Need to Excel"
            subtitle="Comprehensive tools designed to help you master every WASSCE subject"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${f.color}15` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B5ED7] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFC107] mb-1">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-blue-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="WASSCE Subjects"
            subtitle="Choose from 15 core subjects and start practicing today"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {subjects?.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Link to={`/subjects/${subject.slug}`}>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-100 dark:border-gray-700 group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${subject.color || "#0B5ED7"}15` }}
                      >
                        <BookOpen className="w-5 h-5" style={{ color: subject.color || "#0B5ED7" }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{subject.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{subject.description}</p>
                        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <HelpCircle className="w-3 h-3" />
                            {subject.totalQuestions} Qs
                          </span>
                          <span className="text-[#0B5ED7] font-medium group-hover:underline">Start &rarr;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Three simple steps to start your WASSCE preparation journey"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: Users, title: "Create Free Account", desc: "Sign up in seconds and set up your student profile with your school and county." },
              { step: "02", icon: Target, title: "Choose & Practice", desc: "Select subjects, pick topics, and start practicing with thousands of WASSCE questions." },
              { step: "03", icon: BarChart3, title: "Track & Improve", desc: "Monitor your progress with detailed analytics and watch your scores improve over time." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0B5ED7]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-[#0B5ED7]" />
                </div>
                <div className="text-3xl font-bold text-[#0B5ED7]/20 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Students & Teachers Say"
            subtitle="Join thousands of satisfied students preparing for WASSCE"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials?.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating || 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{t.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B5ED7]/10 flex items-center justify-center text-[#0B5ED7] font-semibold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{t.role}{t.school ? ` · ${t.school}` : ""}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#0B5ED7] to-[#0a4bb8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Preparing for WASSCE Today
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join over 12,000 students who are already using Liberia WASSCE Prep to achieve their academic goals. It's free to get started!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-[#0B5ED7] hover:bg-blue-50 font-semibold gap-2 text-base px-8">
                  <GraduationCap className="w-5 h-5" />
                  Create Free Account
                </Button>
              </Link>
              <Link to="/practice">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold gap-2 text-base px-8">
                  <Play className="w-5 h-5" />
                  Practice Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
