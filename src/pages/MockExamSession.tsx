import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, Award, Home, RotateCcw, AlertTriangle } from "lucide-react";

export default function MockExamSession() {
  const { examId } = useParams();
  const { data: exam } = trpc.mockExam.getById.useQuery({ id: parseInt(examId || "0") });
  const { data: questions } = trpc.mockExam.getQuestions.useQuery(
    { examId: parseInt(examId || "0") },
    { enabled: !!exam }
  );

  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (started && exam && timeLeft > 0 && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { setSubmitted(true); setShowResult(true); return 0; }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, exam, timeLeft, submitted]);

  useEffect(() => {
    if (started && exam) setTimeLeft(exam.duration * 60);
  }, [started, exam]);

  const currentQ = questions?.[currentIdx];

  const handleAnswer = (answer: string) => {
    if (!currentQ) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: answer }));
  };

  const score = questions
    ? questions.filter(q => answers[q.id] === q.correctAnswer).reduce((acc, q) => acc + (q.marks || 1), 0)
    : 0;
  const totalMarks = questions?.reduce((acc, q) => acc + (q.marks || 1), 0) || 0;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (!exam) {
    return <div className="min-h-screen bg-gray-50"><Navbar /><div className="text-center py-20">Loading...</div></div>;
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border p-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exam.title}</h1>
            <p className="text-gray-500 text-sm mb-6">{exam.description}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Clock className="w-5 h-5 text-[#0B5ED7] mx-auto mb-1" />
                <div className="text-sm font-semibold">{exam.duration} mins</div>
                <div className="text-xs text-gray-500">Duration</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-sm font-semibold">{questions?.length || 0}</div>
                <div className="text-xs text-gray-500">Questions</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="text-sm font-semibold">{exam.totalMarks}</div>
                <div className="text-xs text-gray-500">Total Marks</div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Instructions:</strong> This exam will auto-submit when time runs out. You cannot pause the timer. Make sure you have a stable internet connection.
              </div>
            </div>
            <Button onClick={() => setStarted(true)} className="w-full bg-[#DC3545] hover:bg-[#bb2d3b] gap-2 text-base py-6">
              Start Exam
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / totalMarks) * 100);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${percentage >= 60 ? "bg-green-100" : percentage >= 40 ? "bg-yellow-100" : "bg-red-100"}`}>
              <Award className={`w-10 h-10 ${percentage >= 60 ? "text-green-600" : percentage >= 40 ? "text-yellow-600" : "text-red-600"}`} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {submitted ? "Time's Up!" : "Exam Complete!"}
            </h1>
            <p className="text-gray-500 mb-6">Here are your results</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0B5ED7]">{score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{totalMarks}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <div className={`rounded-xl p-4 ${percentage >= 60 ? "bg-green-50 dark:bg-green-900/20" : percentage >= 40 ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
                <div className={`text-2xl font-bold ${percentage >= 60 ? "text-green-600" : percentage >= 40 ? "text-yellow-600" : "text-red-600"}`}>{percentage}%</div>
                <div className="text-xs text-gray-500">Percentage</div>
              </div>
            </div>
            <div className="space-y-2 mb-6 text-left">
              {questions?.map((q) => {
                const correct = answers[q.id] === q.correctAnswer;
                return (
                  <div key={q.id} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    {correct ? <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> : <div className="w-4 h-4 rounded-full bg-red-500 mt-0.5 shrink-0 flex items-center justify-center text-white text-xs">X</div>}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{q.question}</p>
                      <p className="text-xs text-gray-500">Your: {answers[q.id] || "-"} | Correct: {q.correctAnswer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              <Button onClick={() => window.location.reload()} variant="outline" className="flex-1 gap-2"><RotateCcw className="w-4 h-4" /> Retry</Button>
              <Link to="/dashboard" className="flex-1"><Button className="w-full bg-[#0B5ED7] gap-2"><Home className="w-4 h-4" /> Dashboard</Button></Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <Progress value={((currentIdx + 1) / (questions?.length || 1)) * 100} className="h-2" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-mono ${timeLeft < 300 ? "text-red-500" : "text-gray-600 dark:text-gray-400"}`}>
            <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {questions?.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(i)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                i === currentIdx ? "bg-[#0B5ED7] text-white" :
                answers[q.id] ? "bg-green-100 text-green-700" :
                "bg-gray-100 dark:bg-gray-800 text-gray-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{currentQ.question}</h2>
              {currentQ.options && (
                <div className="space-y-2">
                  {(currentQ.options as string[]).map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                        answers[currentQ.id] === opt
                          ? "border-[#0B5ED7] bg-[#0B5ED7]/5"
                          : "border-gray-100 dark:border-gray-700 hover:border-[#0B5ED7]/50"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold ${answers[currentQ.id] === opt ? "bg-[#0B5ED7] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600"}`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-sm">{opt}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0} className="gap-1"><ChevronLeft className="w-4 h-4" /> Prev</Button>
                <span className="text-sm text-gray-500">{currentIdx + 1} / {questions?.length}</span>
                {currentIdx < (questions?.length || 0) - 1 ? (
                  <Button onClick={() => setCurrentIdx(i => i + 1)} className="bg-[#0B5ED7] gap-1">Next <ChevronRight className="w-4 h-4" /></Button>
                ) : (
                  <Button onClick={() => setShowResult(true)} className="bg-[#198754] gap-1"><CheckCircle2 className="w-4 h-4" /> Submit</Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
