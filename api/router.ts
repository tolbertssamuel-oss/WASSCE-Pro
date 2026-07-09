import { authRouter } from "./auth-router";
import { subjectRouter } from "./subject-router";
import { questionRouter } from "./question-router";
import { mockExamRouter } from "./mock-exam-router";
import { progressRouter, leaderboardRouter, achievementRouter } from "./progress-router";
import { blogRouter } from "./blog-router";
import { contactRouter, testimonialRouter } from "./contact-router";
import { dashboardRouter } from "./dashboard-router";
import { aiRouter } from "./ai-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  subject: subjectRouter,
  question: questionRouter,
  mockExam: mockExamRouter,
  progress: progressRouter,
  leaderboard: leaderboardRouter,
  achievement: achievementRouter,
  blog: blogRouter,
  contact: contactRouter,
  testimonial: testimonialRouter,
  dashboard: dashboardRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
