import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { subjects, topics, questions, studyNotes } from "@db/schema";
import { eq, count } from "drizzle-orm";

export const subjectRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    const allSubjects = await db.select().from(subjects);
    return allSubjects;
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const subject = await db.select().from(subjects).where(eq(subjects.slug, input.slug));
      return subject[0] || null;
    }),

  topics: publicQuery
    .input(z.object({ subjectId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const allTopics = await db.select().from(topics).where(eq(topics.subjectId, input.subjectId));
      return allTopics;
    }),

  topicQuestions: publicQuery
    .input(z.object({ topicId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const topicQuestions = await db
        .select()
        .from(questions)
        .where(eq(questions.topicId, input.topicId));
      return topicQuestions;
    }),

  subjectQuestions: publicQuery
    .input(z.object({ subjectId: z.number(), limit: z.number().optional(), difficulty: z.string().optional() }))
    .query(async ({ input }) => {
      const db = getDb();
      let query = db.select().from(questions).where(eq(questions.subjectId, input.subjectId));
      const results = await query;
      if (input.difficulty) {
        return results.filter(q => q.difficulty === input.difficulty);
      }
      return input.limit ? results.slice(0, input.limit) : results;
    }),

  questionCount: publicQuery
    .input(z.object({ subjectId: z.number().optional() }))
    .query(async ({ input }) => {
      const db = getDb();
      if (input.subjectId) {
        const result = await db
          .select({ count: count() })
          .from(questions)
          .where(eq(questions.subjectId, input.subjectId));
        return result[0]?.count || 0;
      }
      const result = await db.select({ count: count() }).from(questions);
      return result[0]?.count || 0;
    }),

  notes: publicQuery
    .input(z.object({ subjectId: z.number().optional(), topicId: z.number().optional() }))
    .query(async ({ input }) => {
      const db = getDb();
      if (input.topicId) {
        return db.select().from(studyNotes).where(eq(studyNotes.topicId, input.topicId));
      }
      if (input.subjectId) {
        return db.select().from(studyNotes).where(eq(studyNotes.subjectId, input.subjectId));
      }
      return db.select().from(studyNotes);
    }),
});
