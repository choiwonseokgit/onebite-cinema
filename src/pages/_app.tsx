import type { AppProps } from "next/app";
import GloabalLayout from "./components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import { ReactNode } from "react";

type NextpageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextpageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <GloabalLayout>{getLayout(<Component {...pageProps} />)}</GloabalLayout>
  );
}
