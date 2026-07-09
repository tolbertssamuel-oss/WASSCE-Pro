import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import { ArrowLeft, User, Calendar, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post } = trpc.blog.getBySlug.useQuery({ slug: slug || "" });

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20 text-gray-500">Article not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/blog" className="inline-flex items-center gap-1 text-[#0B5ED7] text-sm mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[#0B5ED7] to-[#198754] flex items-center justify-center">
              <span className="text-white/30 text-6xl font-bold">{post.title[0]}</span>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                <span className="bg-[#0B5ED7]/10 text-[#0B5ED7] rounded-full px-3 py-0.5 text-xs font-medium">{post.category}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
              {post.excerpt && <p className="text-gray-600 dark:text-gray-300 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl font-medium">{post.excerpt}</p>}

              <div className="prose dark:prose-invert max-w-none">
                {post.content.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <h2 key={i} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">{line.replace(/\*\*/g, "")}</h2>;
                  }
                  if (line.startsWith("- ")) {
                    return <li key={i} className="text-gray-600 dark:text-gray-300 ml-4 mb-1">{line.replace("- ", "")}</li>;
                  }
                  if (line.match(/^\d+\.\s/)) {
                    return <li key={i} className="text-gray-600 dark:text-gray-300 ml-4 mb-1">{line.replace(/^\d+\.\s/, "")}</li>;
                  }
                  if (line.trim() === "") return <div key={i} className="h-2" />;
                  return <p key={i} className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{line}</p>;
                })}
              </div>

              <div className="flex gap-2 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <Button variant="outline" size="sm" className="gap-2"><Bookmark className="w-4 h-4" /> Save</Button>
                <Button variant="outline" size="sm" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  );
}
