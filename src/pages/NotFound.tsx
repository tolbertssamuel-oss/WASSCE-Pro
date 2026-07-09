import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-[#0B5ED7]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-[#0B5ED7]" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button className="bg-[#0B5ED7] hover:bg-[#0a4bb8] gap-2">
              <Home className="w-4 h-4" /> Go Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
