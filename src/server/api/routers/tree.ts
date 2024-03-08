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
        page: z.number(),
        itemsPerPage: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.tree.findMany({
        take: input.itemsPerPage,
        skip: input.page * input.itemsPerPage,
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
