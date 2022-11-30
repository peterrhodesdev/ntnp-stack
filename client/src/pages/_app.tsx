import "../../styles/globals.css";
import type { AppProps } from "next/app";
import "reflect-metadata";
import Layout from "../components/layout";

const TITLE = "Title";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout title={TITLE}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
