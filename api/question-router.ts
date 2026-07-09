import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { questions, practiceSessions, bookmarks } from "@db/schema";
import { eq, and, inArray, desc } from "drizzle-orm";

export const questionRouter = createRouter({
  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.select().from(questions).where(eq(questions.id, input.id));
      return result[0] || null;
    }),

  getRandom: publicQuery
    .input(z.object({
      subjectId: z.number().optional(),
      topicId: z.number().optional(),
      difficulty: z.string().optional(),
      limit: z.number().default(10),
    }))
    .query(async ({ input }) => {
      const db = getDb();
      let query = db.select().from(questions);
      const all = await query;
      let filtered = all;
      if (input.subjectId) filtered = filtered.filter(q => q.subjectId === input.subjectId);
      if (input.topicId) filtered = filtered.filter(q => q.topicId === input.topicId);
      if (input.difficulty) filtered = filtered.filter(q => q.difficulty === input.difficulty);
      const shuffled = filtered.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, input.limit);
    }),

  getByIds: publicQuery
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(questions).where(inArray(questions.id, input.ids));
    }),

  startPractice: authedQuery
    .input(z.object({
      subjectId: z.number().optional(),
      topicId: z.number().optional(),
      difficulty: z.string().optional(),
      questionCount: z.number().default(10),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const allQuestions = await db.select().from(questions);
      let filtered = allQuestions;
      if (input.subjectId) filtered = filtered.filter(q => q.subjectId === input.subjectId);
      if (input.topicId) filtered = filtered.filter(q => q.topicId === input.topicId);
      if (input.difficulty) filtered = filtered.filter(q => q.difficulty === input.difficulty);
      const shuffled = filtered.sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, input.questionCount);
      await db.insert(practiceSessions).values({
        userId: ctx.user.id,
        subjectId: input.subjectId,
        topicId: input.topicId,
        questionIds: selected.map(q => q.id),
        answers: {},
        totalQuestions: selected.length,
      });
      const inserted = await db.select().from(practiceSessions)
        .where(eq(practiceSessions.userId, ctx.user.id))
        .orderBy(desc(practiceSessions.createdAt))
        .limit(1);
      return { sessionId: inserted[0]?.id || 0, questions: selected };
    }),

  submitAnswer: authedQuery
    .input(z.object({
      sessionId: z.number(),
      questionId: z.number(),
      answer: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const session = await db.select().from(practiceSessions).where(eq(practiceSessions.id, input.sessionId));
      if (!session[0]) return { error: "Session not found" };
      const answers = (session[0].answers as Record<string, string>) || {};
      answers[String(input.questionId)] = input.answer;
      await db.update(practiceSessions)
        .set({ answers })
        .where(eq(practiceSessions.id, input.sessionId));
      return { success: true };
    }),

  completeSession: authedQuery
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const session = await db.select().from(practiceSessions).where(eq(practiceSessions.id, input.sessionId));
      if (!session[0]) return { error: "Session not found" };
      const questionIds = session[0].questionIds as number[];
      const answers = (session[0].answers as Record<string, string>) || {};
      const questionData = await db.select().from(questions).where(inArray(questions.id, questionIds));
      let correct = 0;
      for (const q of questionData) {
        if (answers[String(q.id)] === q.correctAnswer) correct++;
      }
      await db.update(practiceSessions)
        .set({
          isCompleted: true,
          score: correct,
          correctAnswers: correct,
          completedAt: new Date(),
        })
        .where(eq(practiceSessions.id, input.sessionId));
      return { score: correct, total: questionData.length, percentage: Math.round((correct / questionData.length) * 100) };
    }),

  getSession: publicQuery
    .input(z.object({ sessionId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const session = await db.select().from(practiceSessions).where(eq(practiceSessions.id, input.sessionId));
      return session[0] || null;
    }),

  toggleBookmark: authedQuery
    .input(z.object({
      questionId: z.number().optional(),
      noteId: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const existing = await db.select().from(bookmarks).where(
        and(
          eq(bookmarks.userId, ctx.user.id),
          input.questionId ? eq(bookmarks.questionId, input.questionId) : undefined!
        )
      );
      if (existing.length > 0) {
        await db.delete(bookmarks).where(eq(bookmarks.id, existing[0].id));
        return { bookmarked: false };
      }
      await db.insert(bookmarks).values({
        userId: ctx.user.id,
        questionId: input.questionId,
        noteId: input.noteId,
      });
      return { bookmarked: true };
    }),

  getBookmarks: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.select().from(bookmarks).where(eq(bookmarks.userId, ctx.user.id));
  }),
});
