import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

import { type AppRouter } from "~/server/api/root";

export const transformer = superjson;

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

export const treeSchema = z.object({
  treeKindId: z.coerce.number().min(1, {
    message: "You must specify a tree species!",
  }),
  countId: z.coerce.number().min(1, {
    message: "You must specify a batch number!",
  }),
  forestId: z.coerce.number().min(1, {
    message: "You must specify a forest!",
  }),
  age: z.coerce.number({ invalid_type_error: "Age must be a number!" }).min(1, {
    message: "You must specify the age of the tree!",
  }),
  notes: z.string().optional(),
  isIllegalFelling: z.boolean().optional(),
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
