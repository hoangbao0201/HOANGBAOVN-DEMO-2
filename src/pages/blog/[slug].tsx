import { Suspense } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { ParsedUrlQuery } from "querystring";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layouts/MainLayout";
import blogService, { GetBlogsProps } from "@/services/blog.service";
import ContentBlogDetail from "@/components/modules/Blog/ContentBlogDetail";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import SidebarLeftBlogDetail from "@/components/modules/Blog/SideLeftBlogDetail";
import SidebarRightBlogDetail from "@/components/modules/Blog/SideRightBlogDetail";


interface Params extends ParsedUrlQuery {
    slug: string;
}

interface BlogDetailPageProps {
    blog: GetBlogsProps;
}

const BlogDetailPage: NextPageWithLayout<BlogDetailPageProps> = ({ blog }) => {

    return (
        <main className="max-w-7xl w-full min-h-screen mx-auto mb-4">
            <div className="grid grid-cols-12">
                <div className="col-span-1 xl:block hidden pt-3">
                    <SidebarLeftBlogDetail />
                </div>

                <div className="lg:col-span-8 col-span-full pt-3">
                    <Suspense fallback={<SkeletonCardBlog />}>
                        <ContentBlogDetail blog={blog} />
                    </Suspense>
                </div>

                <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3">
                    <SidebarRightBlogDetail />
                </div>
            </div>
        </main>
    );
};

export default BlogDetailPage;

BlogDetailPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as Params;
    const { success, blog } = await blogService.getBlog(slug);

    return {
        props: {
            blog: blog,
        },
    };
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
    return {
        paths: [],
        fallback: true,
    };
};
