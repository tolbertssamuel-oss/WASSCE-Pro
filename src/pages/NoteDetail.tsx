import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Bookmark, Share2 } from "lucide-react";

export default function NoteDetail() {
  const { id } = useParams();
  const { data: notes } = trpc.subject.notes.useQuery({});
  const { data: subjects } = trpc.subject.list.useQuery();
  const note = notes?.find(n => n.id === parseInt(id || "0"));

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20 text-gray-500">Note not found</div>
      </div>
    );
  }

  const subject = subjects?.find(s => s.id === note.subjectId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/study-notes" className="inline-flex items-center gap-1 text-[#0B5ED7] text-sm mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Notes
          </Link>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#0B5ED7] to-[#198754]" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#0B5ED7]/10 text-[#0B5ED7] text-xs font-medium rounded-full px-3 py-1">
                  {subject?.name || "General"}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{note.title}</h1>
              {note.summary && (
                <p className="text-gray-600 dark:text-gray-300 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm">{note.summary}</p>
              )}

              <div className="prose dark:prose-invert max-w-none">
                {note.content.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <h3 key={i} className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">{line.replace(/\*\*/g, "")}</h3>;
                  }
                  if (line.startsWith("- ")) {
                    return <li key={i} className="text-gray-600 dark:text-gray-300 ml-4">{line.replace("- ", "")}</li>;
                  }
                  if (line.match(/^\d+\./)) {
                    return <li key={i} className="text-gray-600 dark:text-gray-300 ml-4">{line.replace(/^\d+\.\s*/, "")}</li>;
                  }
                  if (line.trim() === "") return <div key={i} className="h-2" />;
                  return <p key={i} className="text-gray-600 dark:text-gray-300 mb-2">{line}</p>;
                })}
              </div>

              <div className="flex gap-2 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <Button variant="outline" size="sm" className="gap-2"><Bookmark className="w-4 h-4" /> Bookmark</Button>
                <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Download PDF</Button>
                <Button variant="outline" size="sm" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
