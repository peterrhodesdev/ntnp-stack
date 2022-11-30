import "../../styles/globals.css";
import type { AppProps } from "next/app";
import "reflect-metadata";
import Layout from "../components/layout";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NTNP Stack</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
