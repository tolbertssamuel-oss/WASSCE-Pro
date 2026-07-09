import { createRouter, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, practiceSessions, examResults, questions, subjects, contactMessages, userProgress } from "@db/schema";
import { eq, count, desc } from "drizzle-orm";

export const dashboardRouter = createRouter({
  student: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const sessions = await db.select().from(practiceSessions).where(eq(practiceSessions.userId, ctx.user.id));
    const results = await db.select().from(examResults).where(eq(examResults.userId, ctx.user.id));
    const userProgressData = await db.select().from(userProgress).where(eq(userProgress.userId, ctx.user.id));
    const completed = sessions.filter(s => s.isCompleted);

    const subjectPerformance: Record<number, { subject: string; attempted: number; correct: number }> = {};
    for (const s of completed) {
      if (s.subjectId) {
        if (!subjectPerformance[s.subjectId]) {
          const sub = await db.select().from(subjects).where(eq(subjects.id, s.subjectId));
          subjectPerformance[s.subjectId] = { subject: sub[0]?.name || "Unknown", attempted: 0, correct: 0 };
        }
        subjectPerformance[s.subjectId].attempted += s.totalQuestions;
        subjectPerformance[s.subjectId].correct += s.correctAnswers || 0;
      }
    }

    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const daySessions = completed.filter(s => {
        const sDate = new Date(s.createdAt);
        return sDate.toDateString() === date.toDateString();
      });
      return {
        day: date.toLocaleDateString("en", { weekday: "short" }),
        questions: daySessions.reduce((acc, s) => acc + s.totalQuestions, 0),
        correct: daySessions.reduce((acc, s) => acc + (s.correctAnswers || 0), 0),
      };
    });

    const streakDays = userProgressData.reduce((max: number, p: { streakDays: number | null }) => Math.max(max, p.streakDays || 0), 0);
    return {
      totalPractice: completed.length,
      totalMockExams: results.length,
      totalQuestions: completed.reduce((acc, s) => acc + s.totalQuestions, 0),
      correctAnswers: completed.reduce((acc, s) => acc + (s.correctAnswers || 0), 0),
      averageAccuracy: completed.length > 0
        ? Math.round(completed.reduce((acc, s) => acc + ((s.correctAnswers || 0) / s.totalQuestions * 100), 0) / completed.length)
        : 0,
      subjectPerformance: Object.values(subjectPerformance),
      weeklyProgress: weeklyData,
      recentSessions: completed.slice(-5).reverse(),
      recentExams: results.slice(-5).reverse(),
      progress: userProgressData,
      stats: { streakDays },
    };
  }),

  admin: adminQuery.query(async () => {
    const db = getDb();
    const totalUsers = await db.select({ count: count() }).from(users);
    const totalQuestions = await db.select({ count: count() }).from(questions);
    const totalSessions = await db.select({ count: count() }).from(practiceSessions);
    const totalExams = await db.select({ count: count() }).from(examResults);
    const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(10);
    const recentUsers = await db.select().from(users).orderBy(desc(users.createdAt)).limit(10);

    return {
      stats: {
        totalStudents: totalUsers[0]?.count || 0,
        totalQuestions: totalQuestions[0]?.count || 0,
        totalPracticeSessions: totalSessions[0]?.count || 0,
        totalMockExams: totalExams[0]?.count || 0,
      },
      recentMessages: messages,
      recentUsers,
    };
  }),
});
