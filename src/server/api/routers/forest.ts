import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const forestRouter = createTRPCRouter({
  getForests: publicProcedure.query(({ ctx }) => ctx.db.forest.findMany()),
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) =>
      ctx.db.forest.create({
        data: {
          name: input.name,
        },
      }),
    ),
});
