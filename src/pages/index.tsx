import { GetStaticProps } from "next";
import { Fragment, Suspense } from "react";

import { NextPageWithLayout } from "./_app";
import CardBlog from "@/components/common/CardBlog";
import blogService, { GetBlogsProps } from "@/services/blog.service";
import MainLayout from "@/components/layouts/MainLayout";
import SideLeftHome from "@/components/modules/Home/SideLeftHome";
import SideRightHome from "@/components/modules/Home/SideRightHome";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";

interface HomePageProps {
    blogs: GetBlogsProps[]
}

const HomePage: NextPageWithLayout<HomePageProps> = ({ blogs }) => {
    return (
        <main className="max-w-7xl w-full min-h-screen mx-auto">
            <div className="grid grid-cols-12">
                <div className="col-span-2 pt-3 h-full hidden xl:block">
                    <SideLeftHome />
                </div>
                <div className="xl:col-span-7 lg:col-span-8 col-span-full pt-3">
                    <Suspense fallback={<SkeletonCardBlog />}>
                        <>
                            {
                                blogs && blogs.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <CardBlog blog={item} />
                                        </Fragment>
                                    );
                                })
                            }
                        </>
                    </Suspense>
                </div>
                <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3 h-full">
                    <SideRightHome />
                </div>
            </div>
        </main>
    );
};

export default HomePage;

HomePage.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const blogsRes = await blogService.findAll();

    return {
        props: {
            blogs: blogsRes.blogs
        }
    }
}
