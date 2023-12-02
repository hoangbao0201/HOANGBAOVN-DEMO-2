import { ReactNode } from "react";
import dynamic from "next/dynamic";

import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";

const SpecialEventWinter = dynamic(
    () =>
        import("@/components/SpecialEvent/Winter", {
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
            <div className="">{children}</div>
            <Footer />
        </>
    );
};

export default MainLayout;
