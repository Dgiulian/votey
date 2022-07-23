import * as trpc from "@trpc/server";
import questionsRouter from "./questions";
import superjson from "superjson";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("questions.", questionsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
