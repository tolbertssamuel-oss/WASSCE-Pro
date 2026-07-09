import { Link } from "react-router";
import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Newspaper, User, Calendar } from "lucide-react";

export default function Blog() {
  const { data: posts } = trpc.blog.list.useQuery();
  const categories = [...new Set(posts?.map(p => p.category).filter(Boolean) || [])];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Blog</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Study tips, exam strategies, and educational resources for WASSCE success
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button className="px-4 py-1.5 rounded-full bg-[#0B5ED7] text-white text-sm font-medium">All</button>
          {categories.map(c => (
            <button key={c} className="px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm border border-gray-200 dark:border-gray-700 hover:border-[#0B5ED7]">
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group h-full flex flex-col">
                  <div className="h-40 bg-gradient-to-br from-[#0B5ED7] to-[#198754] flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-white/30" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-[#0B5ED7]/10 text-[#0B5ED7] rounded-full px-2.5 py-0.5 font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#0B5ED7] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
                      {post.excerpt || post.content?.slice(0, 120)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
