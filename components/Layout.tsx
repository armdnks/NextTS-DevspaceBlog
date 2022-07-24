import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Header from "./Header";
import Search from "./Search";

interface LayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: NextPage<LayoutProps> = ({
  title,
  keywords,
  description,
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Search />

      <main className="container mx-auto my-7 pb-16">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "NextTS Devspace Blog",
  keywords: "development, coding, programming",
  description: "markdown blog",
};

export default Layout;
