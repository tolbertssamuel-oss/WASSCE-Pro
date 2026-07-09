import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactMessages, testimonials } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().min(10),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(contactMessages).values(input);
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }),
});

export const testimonialRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(testimonials).where(eq(testimonials.isPublished, true));
  }),

  create: publicQuery
    .input(z.object({
      name: z.string().min(2),
      role: z.enum(["student", "teacher", "parent"]),
      school: z.string().optional(),
      county: z.string().optional(),
      content: z.string().min(10),
      rating: z.number().min(1).max(5).default(5),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(testimonials).values({ ...input, isPublished: false });
      return { success: true };
    }),
});
