import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { userProgress, practiceSessions, examResults, leaderboard, achievements } from "@db/schema";
import { eq, and, desc } from "drizzle-orm";

export const progressRouter = createRouter({
  get: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const progress = await db.select().from(userProgress).where(eq(userProgress.userId, ctx.user.id));
    const sessions = await db.select().from(practiceSessions).where(eq(practiceSessions.userId, ctx.user.id));
    const results = await db.select().from(examResults).where(eq(examResults.userId, ctx.user.id));
    const badges = await db.select().from(achievements).where(eq(achievements.userId, ctx.user.id));

    const completed = sessions.filter(s => s.isCompleted);
    const totalQuestions = completed.reduce((acc, s) => acc + (s.correctAnswers || 0), 0);
    const avgScore = completed.length > 0
      ? Math.round(completed.reduce((acc, s) => acc + (((s.correctAnswers || 0) / s.totalQuestions) * 100), 0) / completed.length)
      : 0;

    return {
      progress,
      stats: {
        totalPractice: completed.length,
        totalMockExams: results.length,
        totalQuestionsAnswered: totalQuestions,
        averageScore: avgScore,
        streakDays: progress[0]?.streakDays || 0,
        badges: badges.length,
      },
    };
  }),

  update: authedQuery
    .input(z.object({
      subjectId: z.number(),
      topicId: z.number().optional(),
      questionsAttempted: z.number().optional(),
      questionsCorrect: z.number().optional(),
      practiceTime: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const existing = await db.select().from(userProgress).where(
        and(eq(userProgress.userId, ctx.user.id), eq(userProgress.subjectId, input.subjectId))
      );
      if (existing[0]) {
        await db.update(userProgress).set({
          questionsAttempted: (existing[0].questionsAttempted || 0) + (input.questionsAttempted || 0),
          questionsCorrect: (existing[0].questionsCorrect || 0) + (input.questionsCorrect || 0),
          practiceTime: (existing[0].practiceTime || 0) + (input.practiceTime || 0),
          lastPracticeDate: new Date(),
        }).where(eq(userProgress.id, existing[0].id));
      } else {
        await db.insert(userProgress).values({
          userId: ctx.user.id,
          subjectId: input.subjectId,
          topicId: input.topicId,
          questionsAttempted: input.questionsAttempted || 0,
          questionsCorrect: input.questionsCorrect || 0,
          practiceTime: input.practiceTime || 0,
          lastPracticeDate: new Date(),
        });
      }
      return { success: true };
    }),
});

export const leaderboardRouter = createRouter({
  global: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(leaderboard).orderBy(desc(leaderboard.totalScore)).limit(50);
  }),

  update: authedQuery
    .input(z.object({
      score: z.number(),
      questionsAnswered: z.number().optional(),
      mockExamsCompleted: z.number().optional(),
      xp: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const existing = await db.select().from(leaderboard).where(eq(leaderboard.userId, ctx.user.id));
      if (existing[0]) {
        await db.update(leaderboard).set({
          totalScore: (existing[0].totalScore || 0) + input.score,
          questionsAnswered: (existing[0].questionsAnswered || 0) + (input.questionsAnswered || 0),
          mockExamsCompleted: (existing[0].mockExamsCompleted || 0) + (input.mockExamsCompleted || 0),
          xp: (existing[0].xp || 0) + (input.xp || 0),
          level: Math.floor(((existing[0].xp || 0) + (input.xp || 0)) / 1000) + 1,
        }).where(eq(leaderboard.id, existing[0].id));
      } else {
        await db.insert(leaderboard).values({
          userId: ctx.user.id,
          userName: ctx.user.name || "Anonymous",
          totalScore: input.score,
          questionsAnswered: input.questionsAnswered || 0,
          mockExamsCompleted: input.mockExamsCompleted || 0,
          xp: input.xp || 0,
          level: 1,
        });
      }
      return { success: true };
    }),
});

export const achievementRouter = createRouter({
  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.select().from(achievements).where(eq(achievements.userId, ctx.user.id));
  }),

  award: authedQuery
    .input(z.object({
      badgeType: z.string(),
      badgeName: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      await db.insert(achievements).values({
        userId: ctx.user.id,
        badgeType: input.badgeType,
        badgeName: input.badgeName,
        description: input.description,
        icon: input.icon || "Award",
      });
      return { success: true };
    }),
});
