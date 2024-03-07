import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const forestRouter = createTRPCRouter({
  getForests: publicProcedure.query(({ ctx }) => ctx.db.forest.findMany()),
});
