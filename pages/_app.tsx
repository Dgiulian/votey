import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "../server/router";
import superjson from "superjson";
import Layout from "../components/layout";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        colors: {
          white: [
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
          ],
          "ocean-blue": [
            "#7AD1DD",
            "#5FCCDB",
            "#44CADC",
            "#2AC9DE",
            "#1AC2D9",
            "#11B7CD",
            "#09ADC3",
            "#0E99AC",
            "#128797",
            "#147885",
          ],
          "bright-pink": [
            "#F0BBDD",
            "#ED9BCF",
            "#EC7CC3",
            "#ED5DB8",
            "#F13EAF",
            "#F71FA7",
            "#FF00A1",
            "#E00890",
            "#C50E82",
            "#AD1374",
          ],
          "midnight-blue": [
            "#eff2f6",
            "#ced7e3",
            "#adbcd1",
            "#8da2bf",
            "#6c87ac",
            "#536d93",
            "#405572",
            "#2e3d52",
            "#1c2431",
            "#090c10",
          ],
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
};

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (typeof window !== "undefined") return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    const url = `${getBaseUrl()}/api/trpc`;

    return {
      headers() {
        return {
          cookie: ctx?.req?.headers.cookie,
        };
      },
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
