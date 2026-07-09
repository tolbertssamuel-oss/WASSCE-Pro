import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { mockExams, examResults, questions } from "@db/schema";
import { eq, inArray, desc } from "drizzle-orm";

export const mockExamRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    const all = await db.select().from(mockExams);
    return all.filter(e => e.isPublished);
  }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const exam = await db.select().from(mockExams).where(eq(mockExams.id, input.id));
      return exam[0] || null;
    }),

  getQuestions: publicQuery
    .input(z.object({ examId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const exam = await db.select().from(mockExams).where(eq(mockExams.id, input.examId));
      if (!exam[0]) return [];
      const qIds = exam[0].questionIds as number[];
      return db.select().from(questions).where(inArray(questions.id, qIds));
    }),

  submitResult: authedQuery
    .input(z.object({
      mockExamId: z.number(),
      subjectId: z.number().optional(),
      score: z.number(),
      totalMarks: z.number(),
      percentage: z.number(),
      timeTaken: z.number(),
      answers: z.record(z.string(), z.string()),
      topicBreakdown: z.record(z.string(), z.object({ correct: z.number(), total: z.number() })).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const resultData: Record<string, unknown> = {
        userId: ctx.user.id,
        mockExamId: input.mockExamId,
        score: input.score,
        totalMarks: input.totalMarks,
        percentage: input.percentage,
        timeTaken: input.timeTaken,
        answers: input.answers,
        topicBreakdown: input.topicBreakdown || {},
      };
      if (input.subjectId) resultData.subjectId = input.subjectId;
      await db.insert(examResults).values(resultData as typeof examResults.$inferInsert);
      return { success: true };
    }),

  getResults: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.select().from(examResults).where(eq(examResults.userId, ctx.user.id)).orderBy(desc(examResults.createdAt));
  }),

  getResultById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.select().from(examResults).where(eq(examResults.id, input.id));
      return result[0] || null;
    }),
});
