import "@/styles/globals.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";

import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import ProviderLayout from "@/components/layouts/ProviderLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <SessionProvider session={session}>
                <ProviderLayout>
                    {getLayout(<Component {...pageProps} />)}
                </ProviderLayout>
            </SessionProvider>
        </>
    );
}
