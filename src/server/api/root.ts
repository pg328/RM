import { treeRouter } from "~/server/api/routers/tree";
import { treeKindRouter } from "~/server/api/routers/treeKind";
import { createTRPCRouter } from "~/server/api/trpc";
import { forestRouter } from "./routers/forest";
import { batchRouter } from "./routers/batch";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tree: treeRouter,
  treeKind: treeKindRouter,
  forest: forestRouter,
  batch: batchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
