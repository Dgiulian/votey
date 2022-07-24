import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you'd might want to do in your ctx fn
  async function getTokenFromCookies() {
    if (opts?.req.cookies["poll-token"]) {
      // const user = await decodeJwtToken(req.headers.authorization.split(' ')[1])
      return opts?.req.cookies["poll-token"];
    }
    return null;
  }
  const token = await getTokenFromCookies();

  return {
    token,
  };
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
