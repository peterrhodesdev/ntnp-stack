import "../..//styles/globals.css";
import type { AppProps } from "next/app";
import "reflect-metadata";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
