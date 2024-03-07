import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const batchRouter = createTRPCRouter({
  getBatches: publicProcedure.query(({ ctx }) => ctx.db.count.findMany()),
});
