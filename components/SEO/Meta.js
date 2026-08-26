import React from 'react'
import Head from 'next/head';

export default function Meta() {
    const siteUrl = "https://yashbansal-dev.github.io";
    const previewImage = `${siteUrl}/images/logos/og-preview.png`;
    const title = "Yash Bansal • Software Developer & AI Researcher";
    const description = "Interactive Ubuntu Linux desktop portfolio of Yash Bansal — Software Developer & AI Researcher. Specializing in scalable architectures, deep learning computer vision, and high-performance web systems.";

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="author" content="Yash Bansal" />
            <meta name="keywords" content="Yash Bansal, Yash Bansal portfolio, yashbansal-dev, deep learning, computer vision, OpenSeek, software engineer, LNMIIT, Ubuntu portfolio, Next.js portfolio, React developer" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta name="theme-color" content="#E95420" />
            <link rel="canonical" href={siteUrl} />

            {/* PWA & Mobile Capabilities */}
            <link rel="manifest" href="/manifest.json" />
            <meta name="application-name" content="Yash OS" />
            <meta name="apple-mobile-web-app-title" content="Yash OS" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-TileColor" content="#E95420" />

            {/* Schema.org for Google */}
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="image" content={previewImage} />

            {/* Open Graph / Facebook / LinkedIn / Discord */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={previewImage} />
            <meta property="og:image:secure_url" content={previewImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Yash Bansal Developer Portfolio Social Preview" />
            <meta property="og:site_name" content="Yash Bansal Personal Portfolio" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={siteUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content="@yashbansal_dev" />
            <meta name="twitter:creator" content="@yashbansal_dev" />
            <meta name="twitter:image" content={previewImage} />
            <meta name="twitter:image:src" content={previewImage} />
            <meta name="twitter:image:alt" content="Yash Bansal Developer Portfolio Social Preview" />

            {/* Favicons & App Icons */}
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/logos/favicon.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/images/logos/icon-192.png" />
            <link rel="apple-touch-icon" sizes="192x192" href="/images/logos/icon-192.png" />
            <link rel="apple-touch-icon" sizes="512x512" href="/images/logos/icon-512.png" />
        </Head>
    )
}
