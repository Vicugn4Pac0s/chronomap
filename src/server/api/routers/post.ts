import { z } from "zod";

import {
  createTRPCRouter,
} from "~/server/api/trpc";
import { protectedProcedure, publicProcedure } from "../procedure";
import { posts } from "~/server/db/schema";
import { postCreateSchema } from "~/shared/schemas";

export const postRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.posts.findMany();
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
