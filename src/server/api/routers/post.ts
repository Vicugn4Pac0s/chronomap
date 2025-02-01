import { z } from "zod";

import {
  createTRPCRouter,
} from "~/server/api/trpc";
import { protectedProcedure, publicProcedure } from "../procedure";
import { posts } from "~/server/db/schema";
import { postCreateSchema } from "~/shared/schemas";

export const postRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.posts.findMany({
      with: {user: true},
    });
  }),

  getRecentPosts: publicProcedure
    .input(z.object({ minutes: z.number().default(60) }))  // デフォルトは60分以内
    .query(async ({ ctx, input }) => {
      const minutesAgo = new Date(Date.now() - input.minutes * 60 * 1000);

      return await ctx.db.query.posts.findMany({
        where: (posts, { gt }) => gt(posts.createdAt, minutesAgo),
        with: { user: true },
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      });
    }),

  create: protectedProcedure
    .input(postCreateSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        userId: ctx.session.user.id,
        latitude: input.latitude,
        longitude: input.longitude,
        createdById: ctx.session.user.id,
      });
    }),

});
