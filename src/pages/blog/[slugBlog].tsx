import { GetStaticPaths, GetStaticProps } from "next";

import { ParsedUrlQuery } from "querystring";

import { NextPageWithLayout } from "../_app";
import { REVALIDATE_TIME } from "@/constants";
import { BlogSeo } from "@/components/common/SEO";
import siteMetadata from "@/lib/data/siteMetadata";
import MainLayout from "@/components/layouts/MainLayout";
import blogService, { GetBlogsProps } from "@/services/blog.service";
import ContentBlogDetail from "@/components/modules/Blog/ContentBlogDetail";
import SkeletonCardBlog from "@/components/modules/skeletons/SkeletonCardBlog";
import SidebarLeftBlogDetail from "@/components/modules/Blog/SideLeftBlogDetail";
import SidebarRightBlogDetail from "@/components/modules/Blog/SideRightBlogDetail";

interface Params extends ParsedUrlQuery {
    slugBlog: string;
}

interface BlogDetailPageProps {
    blog: GetBlogsProps;
}

const BlogDetailPage: NextPageWithLayout<BlogDetailPageProps> = ({ blog }) => {

    return (
        <>
            {/* {blog && (
                <BlogSeo
                    title={`${blog.title} - ${siteMetadata.title}`}
                    thumbnail={blog.thumbnailUrl}
                    blogImages={blog.blogImages}
                    summary={blog.summary}
                    author={blog.author.name}
                    canonicalUrl={`${siteMetadata.siteUrl}/blog/${blog.slug}-${blog.blogId}`}
                    createdAt={blog.createdAt}
                    updatedAt={blog.updatedAt}
                />
            )} */}
            <main className="max-w-7xl w-full min-h-screen mx-auto mb-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-1 xl:block hidden pt-3">
                        <SidebarLeftBlogDetail />
                    </div>
    
                    <div className="lg:col-span-8 col-span-full pt-3">
                        {blog ? (
                            <ContentBlogDetail blog={blog} />
                        ) : (
                            <SkeletonCardBlog count={3} />
                        )}
                    </div>
    
                    <div className="xl:col-span-3 lg:col-span-4 col-span-full pt-3">
                        <SidebarRightBlogDetail />
                    </div>
                </div>
            </main>
        </>
    );
};

export default BlogDetailPage;

BlogDetailPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const { slugBlog } = context.params as Params;
        const { success, blog } = await blogService.getBlog(slugBlog);

        if(!blog || !success) {
            return { notFound: true };
        }

        return {
            props: {
                blog: blog,
            },
            revalidate: REVALIDATE_TIME,
        };
    } catch (error) {
        return { notFound: true };
    }
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
    return {
        paths: [],
        fallback: true,
    };
};
