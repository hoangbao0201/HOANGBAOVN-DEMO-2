import Head from "next/head";
import { useRouter } from "next/router";
import siteMetadata from "@/lib/data/siteMetadata";

interface CommonSEOProps {
    title: string;
    description: string;
    ogType: string;
    ogImage:
        | string
        | {
              "@type": string;
              url: string;
          }[];
    twImage: string;
    canonicalUrl?: string;
    isHiddenFromSearch?: boolean;
}

const CommonSEO = ({
    title,
    description,
    ogType,
    ogImage,
    twImage,
    canonicalUrl,
    isHiddenFromSearch,
}: CommonSEOProps) => {
    const router = useRouter();
    return (
        <Head>
            <title>{title}</title>
            <meta
                name="robots"
                content={
                    isHiddenFromSearch ? "noindex, follow" : "follow, index"
                }
            />
            <meta name="description" content={description} />
            <meta
                property="og:url"
                content={`${canonicalUrl}`}
            />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={siteMetadata.title} />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
            {Array.isArray(ogImage) ? (
                ogImage.map(({ url }) => (
                    <meta property="og:image" content={url} key={url} />
                ))
            ) : (
                <meta property="og:image" content={ogImage} key={ogImage} />
            )}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={siteMetadata.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={twImage} />
            <link
                rel="canonical"
                href={
                    canonicalUrl
                        ? canonicalUrl
                        : `${siteMetadata.siteUrl}${router.asPath}`
                }
            />
        </Head>
    );
};

interface PageSEOProps {
    title: string;
    description: string;
    imageUrl?: string;
    canonicalUrl: string
    isHiddenFromSearch?: boolean;
}

export const PageSEO = ({
    title,
    description,
    isHiddenFromSearch,
    canonicalUrl,
    imageUrl,
}: PageSEOProps) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    return (
        <CommonSEO
            title={title}
            description={description}
            ogType="website"
            canonicalUrl={canonicalUrl}
            ogImage={imageUrl ? imageUrl : ogImageUrl}
            twImage={imageUrl ? imageUrl : twImageUrl}
            isHiddenFromSearch={isHiddenFromSearch}
        />
    );
};

// export const TagSEO = ({ title, description }: PageSEOProps) => {
//     const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
//     const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
//     const router = useRouter();
//     return (
//         <>
//             <CommonSEO
//                 title={title}
//                 description={description}
//                 ogType="website"
//                 ogImage={ogImageUrl}
//                 twImage={twImageUrl}
//             />
//             <Head>
//                 <link
//                     rel="alternate"
//                     type="application/rss+xml"
//                     title={`${description} - RSS feed`}
//                     href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
//                 />
//             </Head>
//         </>
//     );
// };

interface BlogSeoProps {
    title: string;
    summary: string;
    author: string;
    canonicalUrl: string;
    thumbnail: string | null
    blogImages: { urlImage: string }[] | [];
    isHiddenFromSearch?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const BlogSeo = ({
    title,
    thumbnail,
    blogImages,
    author,
    summary,
    canonicalUrl,
    isHiddenFromSearch = false,
    createdAt,
    updatedAt,
}: BlogSeoProps) => {
    const publishedAt = new Date(createdAt).toISOString();
    const modifiedAt = new Date(updatedAt).toISOString();

    const imagesArr = [
        { urlImage: thumbnail || siteMetadata.imageBlog },
        ...blogImages
    ]
    
    const featuredImages = imagesArr.map((img) => {
        return {
            "@type": "ImageObject",
            url: `${img.urlImage}`,
        };
    });

    const authorList = {
        "@type": "Person",
        name: author,
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${canonicalUrl}`,
        },
        headline: title,
        image: featuredImages,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        author: authorList,
        publisher: {
            "@type": "Organization",
            name: siteMetadata.author,
            logo: {
                "@type": "ImageObject",
                url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
            },
        },
        description: summary,
    };

    const twImageUrl = featuredImages[0].url;

    return (
        <>
            <CommonSEO
                title={title}
                description={summary}
                ogType="article"
                ogImage={featuredImages}
                twImage={twImageUrl}
                canonicalUrl={canonicalUrl}
                isHiddenFromSearch={isHiddenFromSearch}
            />
            <Head>
                {createdAt && (
                    <meta
                        property="article:published_time"
                        content={publishedAt}
                    />
                )}
                {updatedAt && (
                    <meta
                        property="article:modified_time"
                        content={modifiedAt}
                    />
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData, null, 2),
                    }}
                />
            </Head>
        </>
    );
};

