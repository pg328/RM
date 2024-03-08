import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const batchRouter = createTRPCRouter({
  getBatches: publicProcedure.query(({ ctx }) =>
    ctx.db.batch.findMany({ orderBy: { id: "desc" } }),
  ),
  create: publicProcedure.mutation(async ({ ctx }) => ctx.db.batch.create({})),
});
