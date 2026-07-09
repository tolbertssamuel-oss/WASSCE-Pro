import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen, Calculator, Leaf, FlaskConical, Atom, TrendingUp,
  Globe, Clock, Landmark, Feather, Sprout, Users,
  ShoppingCart, Receipt, Monitor, HelpCircle, Search,
  ArrowRight, GraduationCap
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Calculator, Leaf, FlaskConical, Atom, TrendingUp,
  Globe, Clock, Landmark, Feather, Sprout, Users,
  ShoppingCart, Receipt, Monitor,
};

export default function Subjects() {
  const { data: subjects } = trpc.subject.list.useQuery();
  const [search, setSearch] = useState("");

  const filtered = subjects?.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">WASSCE Subjects</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Select a subject to explore topics, practice questions, and study materials
          </p>
        </motion.div>

        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B5ED7]"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered?.map((subject, i) => {
            const Icon = iconMap[subject.icon || ""] || BookOpen;
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/subjects/${subject.slug}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-100 dark:border-gray-800 group">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${subject.color || "#0B5ED7"}15` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: subject.color || "#0B5ED7" }} />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-2.5 py-1">
                        <HelpCircle className="w-3 h-3" />
                        {subject.totalQuestions}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#0B5ED7] transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                      {subject.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#0B5ED7] font-medium">
                      <GraduationCap className="w-4 h-4" />
                      Start Learning
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
