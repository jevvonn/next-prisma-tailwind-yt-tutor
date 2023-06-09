import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import { Roboto } from "next/font/google";
import { Nav } from "@/components/Nav";
import { QueryWrapper } from "@/components/QueryWrapper";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryWrapper>
        <div className={`${roboto.className}`}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </div>
      </QueryWrapper>
    </SessionProvider>
  );
}
