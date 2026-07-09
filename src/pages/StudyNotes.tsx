import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export default function StudyNotes() {
  const { data: notes } = trpc.subject.notes.useQuery({});
  const { data: subjects } = trpc.subject.list.useQuery();
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState(0);

  const filtered = notes?.filter(n => {
    const matchesSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || (n.summary || "").toLowerCase().includes(search.toLowerCase());
    const matchesSubject = !subjectFilter || n.subjectId === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Study Notes</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Comprehensive notes written by experienced teachers for every WASSCE topic
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B5ED7]"
            />
          </div>
          <select
            value={subjectFilter}
            onChange={e => setSubjectFilter(parseInt(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B5ED7]"
          >
            <option value={0}>All Subjects</option>
            {subjects?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {filtered?.map((note, i) => {
            const subject = subjects?.find(s => s.id === note.subjectId);
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link to={`/study-notes/${note.id}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0B5ED7]/10 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-[#0B5ED7]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full px-2.5 py-0.5">
                            {subject?.name || "General"}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#0B5ED7] transition-colors">
                          {note.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{note.summary || note.content?.slice(0, 150)}</p>
                        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
                          <span className="text-[#0B5ED7] flex items-center gap-1 group-hover:underline">
                            Read More <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
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
