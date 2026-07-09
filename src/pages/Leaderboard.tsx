import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Medal, Crown, Award, Star } from "lucide-react";
import { useState } from "react";

type Filter = "global" | "weekly" | "monthly";

export default function Leaderboard() {
  const { data: entries } = trpc.leaderboard.global.useQuery();
  const [filter, setFilter] = useState<Filter>("global");

  const sorted = entries?.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0)) || [];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-[#FFC107]" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-semibold text-gray-400 w-5 text-center">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-[#FFC107]/10 to-yellow-50 dark:from-yellow-900/20 dark:to-transparent border-[#FFC107]/30";
    if (rank === 2) return "bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-800/50";
    if (rank === 3) return "bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-900/20";
    return "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FFC107]/10 text-[#FFC107] rounded-full px-4 py-1.5 text-sm font-medium mb-3">
            <Trophy className="w-4 h-4" /> Leaderboard
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Top Performers</h1>
          <p className="text-gray-500 dark:text-gray-400">See how you rank among other WASSCE students</p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-6">
          {(["global", "weekly", "monthly"] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-[#0B5ED7] text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {sorted.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-8">
            {[2, 1, 3].map(pos => {
              const entry = sorted[pos - 1];
              const heights = ["h-24", "h-32", "h-20"];
              const colors = ["bg-gray-300 dark:bg-gray-600", "bg-[#FFC107]", "bg-amber-600"];
              return (
                <div key={pos} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-2 text-sm font-bold">
                    {entry?.userName?.[0] || "?"}
                  </div>
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 truncate max-w-[80px]">{entry?.userName}</div>
                  <div className={`w-20 ${heights[pos - 1]} ${colors[pos - 1]} rounded-t-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{pos}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="space-y-2">
          {sorted.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${getRankBg(i + 1)}`}
            >
              <div className="w-8 flex justify-center">{getRankIcon(i + 1)}</div>
              <div className="w-9 h-9 rounded-full bg-[#0B5ED7]/10 flex items-center justify-center text-[#0B5ED7] text-sm font-semibold shrink-0">
                {entry.userName?.[0] || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900 dark:text-white truncate">{entry.userName}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Level {entry.level}</span>
                  {entry.userCounty && <span>{entry.userCounty}</span>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{entry.totalScore?.toLocaleString()} pts</div>
                <div className="text-xs text-gray-500">{entry.questionsAnswered} Qs</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#FFC107]">
                <Star className="w-3 h-3 fill-[#FFC107]" />
                {entry.xp}
              </div>
            </motion.div>
          ))}
        </div>

        {!sorted.length && (
          <div className="text-center py-20">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No entries yet. Start practicing to appear on the leaderboard!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
