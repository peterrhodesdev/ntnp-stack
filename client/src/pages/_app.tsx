import "../../styles/globals.css";
import type { AppProps } from "next/app";
import "reflect-metadata";
import Layout from "../components/layout";
import { QueryClient, QueryClientProvider } from "react-query";

const TITLE = "Title";
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout title={TITLE}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
