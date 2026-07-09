import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  BookOpen, HelpCircle, ArrowLeft, GraduationCap, FileText,
  Brain, Play, BarChart3, Clock, Star
} from "lucide-react";

export default function SubjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: subject } = trpc.subject.getBySlug.useQuery({ slug: slug || "" });
  const { data: topics } = trpc.subject.topics.useQuery(
    { subjectId: subject?.id || 0 },
    { enabled: !!subject?.id }
  );
  const { data: questions } = trpc.subject.subjectQuestions.useQuery(
    { subjectId: subject?.id || 0, limit: 5 },
    { enabled: !!subject?.id }
  );

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Subject not found</p>
            <Link to="/subjects" className="text-[#0B5ED7] hover:underline text-sm mt-2 inline-block">
              Back to Subjects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="bg-gradient-to-br from-[#0B5ED7] to-[#0a4bb8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/subjects" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4">
            <ArrowLeft className="w-4 h-4" /> All Subjects
          </Link>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{subject.name}</h1>
              <p className="text-blue-200 text-sm">{subject.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-blue-100">
            <span className="flex items-center gap-1"><HelpCircle className="w-4 h-4" /> {subject.totalQuestions} Questions</span>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {topics?.length || 0} Topics</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4" /> WASSCE Aligned</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0B5ED7]" /> Topics
              </h2>
              <div className="space-y-3">
                {topics?.map((topic, i) => (
                  <div
                    key={topic.id}
                    className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0B5ED7]/10 flex items-center justify-center text-[#0B5ED7] text-sm font-semibold">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{topic.name}</h3>
                          <p className="text-xs text-gray-500">{topic.description}</p>
                        </div>
                      </div>
                      <Link to={`/practice/${subject.id}?topic=${topic.id}`}>
                        <Button size="sm" variant="ghost" className="text-[#0B5ED7] gap-1">
                          <Play className="w-3.5 h-3.5" /> Practice
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0B5ED7]" /> Sample Questions
              </h2>
              <div className="space-y-3">
                {questions?.map((q, i) => (
                  <div key={q.id} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#0B5ED7]/10 text-[#0B5ED7] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white mb-2">{q.question}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full px-2.5 py-1 capitalize">
                            {q.difficulty}
                          </span>
                          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full px-2.5 py-1">
                            {q.marks} mark{q.marks !== 1 ? "s" : ""}
                          </span>
                          {q.year && (
                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full px-2.5 py-1">
                              {q.year}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to={`/practice/${subject.id}`}>
                <Button className="mt-4 bg-[#0B5ED7] hover:bg-[#0a4bb8] gap-2">
                  <GraduationCap className="w-4 h-4" /> Practice All Questions
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link to={`/practice/${subject.id}`}>
                  <Button className="w-full bg-[#0B5ED7] hover:bg-[#0a4bb8] gap-2 justify-start">
                    <Play className="w-4 h-4" /> Start Practice
                  </Button>
                </Link>
                <Link to={`/mock-exams`}>
                  <Button variant="outline" className="w-full gap-2 justify-start">
                    <Clock className="w-4 h-4" /> Take Mock Exam
                  </Button>
                </Link>
                <Link to={`/study-notes`}>
                  <Button variant="outline" className="w-full gap-2 justify-start">
                    <FileText className="w-4 h-4" /> Study Notes
                  </Button>
                </Link>
                <Link to={`/ai-tutor`}>
                  <Button variant="outline" className="w-full gap-2 justify-start">
                    <Brain className="w-4 h-4" /> Ask AI Tutor
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="bg-gradient-to-br from-[#FFC107]/10 to-[#FFC107]/5 rounded-2xl p-5 border border-[#FFC107]/20">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Study Tip</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Practice at least 20 questions daily to see consistent improvement in your WASSCE preparation.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#0B5ED7]">
                <BarChart3 className="w-4 h-4" />
                <span>Track your progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
