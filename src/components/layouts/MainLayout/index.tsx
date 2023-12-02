import { ReactNode } from "react";
import dynamic from "next/dynamic";

import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";

const SpecialEventWinter = dynamic(
    () =>
        import("@/components/special-event/Winter", {
            ssr: false,
        } as ImportCallOptions)
);

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Header />
            <SpecialEventWinter />
            {children}
            <Footer />
        </>
    );
};

export default MainLayout;
