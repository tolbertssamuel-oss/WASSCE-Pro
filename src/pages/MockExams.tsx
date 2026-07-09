import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, FileText, HelpCircle, Play, Award, GraduationCap } from "lucide-react";

export default function MockExams() {
  const { data: exams } = trpc.mockExam.list.useQuery();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Mock Examinations</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Simulate the real WASSCE experience with timed mock exams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams?.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-2 bg-gradient-to-r from-[#0B5ED7] to-[#198754]" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DC3545]/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#DC3545]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{exam.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{exam.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.duration} mins</span>
                  <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {(exam.questionIds as number[]).length} Qs</span>
                  <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {exam.totalMarks} marks</span>
                </div>
                <Link to={`/mock-exams/${exam.id}`}>
                  <Button className="w-full bg-[#0B5ED7] hover:bg-[#0a4bb8] gap-2">
                    <Play className="w-4 h-4" /> Start Exam
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {!exams?.length && (
          <div className="text-center py-20">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No mock exams available yet. Check back soon!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
