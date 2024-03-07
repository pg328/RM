import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const treeTypeRouter = createTRPCRouter({
  getTreeTypes: publicProcedure.query(({ ctx }) => ctx.db.treeKind.findMany()),
});
