import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { questionsRouter } from "../../../server/router";
import superjson from "superjson";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("question.", questionsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
