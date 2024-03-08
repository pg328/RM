import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { treeSchema } from "~/trpc/shared";

export const treeRouter = createTRPCRouter({
  create: publicProcedure.input(treeSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.tree.create({
      data: {
        treeKindId: input.treeKindId,
        batchId: input.batchId,
        forestId: input.forestId,
        age: input.age,
        notes: input.notes ?? "",
        isIllegalFelling: input.isIllegalFelling ?? false,
      },
    });
  }),
  getTrees: publicProcedure
    .input(
      z.object({
        take: z.number(),
        skip: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.tree.findMany({
        select: {
          id: true,
          treeKind: true,
          forest: true,
          batch: true,
          age: true,
          createdAt: true,
          isIllegalFelling: true,
          notes: true,
        },
        take: input.take,
        skip: input.skip,
        orderBy: { createdAt: "desc" },
      });
    }),
  getTreeCount: publicProcedure.query(({ ctx }) => {
    return ctx.db.tree.count({
      orderBy: { createdAt: "desc" },
    });
  }),
  getLastN: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.tree.findMany({
      take: input,
      orderBy: { createdAt: "desc" },
    });
  }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.tree.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
