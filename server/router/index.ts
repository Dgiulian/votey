import * as trpc from "@trpc/server";
import questionsRouter from "./questions";
import superjson from "superjson";
import { createRouter } from "./context";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("questions.", questionsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
