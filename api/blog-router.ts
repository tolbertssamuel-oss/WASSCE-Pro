import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { blogPosts } from "@db/schema";
import { eq } from "drizzle-orm";

export const blogRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(blogPosts).where(eq(blogPosts.isPublished, true));
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const post = await db.select().from(blogPosts).where(eq(blogPosts.slug, input.slug));
      return post[0] || null;
    }),

  getByCategory: publicQuery
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const all = await db.select().from(blogPosts).where(eq(blogPosts.isPublished, true));
      return all.filter(p => p.category === input.category);
    }),
});
