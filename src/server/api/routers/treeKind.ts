import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const treeKindRouter = createTRPCRouter({
  getTreeKinds: publicProcedure.query(({ ctx }) => ctx.db.treeKind.findMany()),
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) =>
      ctx.db.treeKind.create({
        data: {
          name: input.name,
        },
      }),
    ),
});
