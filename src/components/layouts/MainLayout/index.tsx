import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";
import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = ({ children } : MainLayoutProps) => {

    return (
        <>
            <Header />
            <div className="">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainLayout;