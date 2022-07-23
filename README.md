# NextTS - Devspace Blog

##

### Support Links

> **How to set types for functional component props in Nextjs with TypeScript?**
>
> https://melvingeorge.me/blog/set-types-for-functional-components-props-typescript-nextjs

### Project Structure

```sh
.
├── components
│   ├── Header
│   └── Layout
├── pages
│   ├── _app.tsx
│   ├── 404.tsx
│   ├── about.tsx
│   └── index.tsx
├── posts
│   └── all markdown files
├── public
└── styles
```

---

## Start Project

### Setup

- #### index.tsx

```tsx
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <div>
      <h1>Hello NextTS</h1>
    </div>
  );
};

export default HomePage;
```

##

### Create Layout Component

- #### Layout.tsx

```tsx
import { NextPage } from "next";
import Head from "next/head";

interface LayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children: JSX.Element;
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

      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "NextTS Devspace Blog",
  keywords: "development, coding, programming",
  description: "markdown blog",
};

export default Layout;
```

- #### index.tsx

```tsx
import type { NextPage } from "next";
import { Layout } from "../components";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <h1>Hello NextTS</h1>
    </Layout>
  );
};

export default HomePage;
```

##

### Create Header Component

- #### Header.tsx

```tsx
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const Header: NextPage = () => {
  return (
    <header className="bg-gray-900 text-gray-100 shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col items-center  md:flex-row ">
        <Link href="/">
          <a className="flex title-font font-medium items-center mb-4 md:w-1/5 md:justify-start md:mb-0">
            <Image src="/images/logo.png" alt="logo" width={40} height={40} />
            <span className="ml-3 text-xl">DevSpace</span>
          </a>
        </Link>

        <nav className="flex flex-wrap items-center justify-end text-base md:w-4/5 md:ml-auto">
          <Link href="/blog">
            <a className="mx-5 cursor-pointer uppercase hover:text-indigo-300">
              Blog
            </a>
          </Link>
          <Link href="/about">
            <a className="mx-5 cursor-pointer uppercase hover:text-indigo-300">
              About
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
```

- #### Layout.tsx

```tsx
import Header from "./Header";

<Header />
<main className="container mx-auto my-7">{children}</main>
```

##

### About & NotFound Page

- #### about.tsx

```tsx
import { Layout } from "../components";

const AboutPage = () => {
  return (
    <Layout title="About DevSpace">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>
      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl mb-5">DevSpace Blog</h3>
        <p className="mb-3">This is a blog built with Next.js and Markdown</p>
        <p>
          <span className="font-bold">Version 1.0.0</span>
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;
```

- #### 404.tsx

```tsx
import Image from "next/image";

import { Layout } from "../components";

const NotFoundPage = () => {
  return (
    <Layout title="Page Not Found">
      <div className="flex flex-col items-center mt-20">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={70}
          height={70}
          className="bg-gray-800 rounded-2xl"
        />
        <h1 className="text-6xl my-5">Whoops!</h1>
        <h2 className="text-4xl text-gray-400 mb-5">
          This page does not exist
        </h2>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
```

---

## Fetch, Parse, & Display Markdown

### getStaticProps function

- #### index.tsx

```tsx
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  const files = fs.readdirSync(path.join("posts"));
  console.log(files);

  return {
    props: {},
  };
};
```

```sh
[
  'django-crash-course.md',
  'javascript-performance-tips.md',
  'manage-react-state-with-xstate.md',
  'new-in-php-8.md',
  'python-book-review.md',
  'react-crash-course.md',
  'tailwind-vs-bootstrap.md',
  'writing-great-unit-tests.md'
]
```

- create slug

```tsx
// const files = fs.readdirSync(path.join("posts"));
const posts = files.map((filename) => {
  const slug = filename.replace(".md", "");
  return { slug };
});
console.log(posts);
```

```sh
[
  { slug: 'django-crash-course' },
  { slug: 'javascript-performance-tips' },
  { slug: 'manage-react-state-with-xstate' },
  { slug: 'new-in-php-8' },
  { slug: 'python-book-review' },
  { slug: 'react-crash-course' },
  { slug: 'tailwind-vs-bootstrap' },
  { slug: 'writing-great-unit-tests' }
]
```

- markdownWithMeta

```tsx
// const slug = filename.replace(".md", "");
const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");
console.log(markdownWithMeta);
```

```sh
---
title: 'React Crash Course'
date: 'May 8, 2021'
excerpt: 'Crash course to learn the React JavaScript library. We will look at components, hooks and more'
cover_image: '/images/posts/img5.jpg'
category: 'JavaScript'
author: 'Jane Doe'
author_image: 'https://randomuser.me/api/portraits/women/11.jpg'
---

<!-- Markdown generator - https://jaspervdj.be/lorem-markdownum/ -->

Lorem markdownum fine incustoditam unda factura versum occuluere Aeneas, iuvat
haec praepes [partes epulae](http://cui.com/), in egisse de. Caecisque ter
manus. Munere in exhalat, ferre sed [habe quaeque saepe](http://ne.org/fretum)
verba caput ferarum _nubila_? Patriam Cyparisse tamen, **saxum** fide postponere
pavida ne omnes etiam, atque. Sonuit omina sed sine haerebat illic fit a mora
in.

1. Serrae enim Etruscam aquis
2. Et premis et flumine frontem minatur oppressos
3. Inquam rector Icarus possum vim tumulo propiusque
4. Vulnus se Latreus
5. Aptumque bis
...
```

- import matter from "gray-matter"

```tsx
import matter from "gray-matter";

// const files = fs.readdirSync(path.join("posts"));
const posts = files.map((filename) => {
  const slug = filename.replace(".md", "");
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", filename),
    "utf-8"
  );
  const { data: frontmatter } = matter(markdownWithMeta);
  return { slug, frontmatter };
});
console.log(posts);
```

```sh
{
    slug: 'react-crash-course',
    frontmatter: {
      title: 'React Crash Course',
      date: 'May 8, 2021',
      excerpt: 'Crash course to learn the React JavaScript library. We will look at components, hooks and more',
      cover_image: '/images/posts/img5.jpg',
      category: 'JavaScript',
      author: 'Jane Doe',
      author_image: 'https://randomuser.me/api/portraits/women/11.jpg'
    }
  },
```

- #### Complete Code

```tsx
export const getStaticProps: GetStaticProps = async (context) => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  });

  return {
    props: {
      posts,
    },
  };
};
```

```tsx
const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  console.log(posts);

  return (
    <Layout>
      <h1>Hello NextTS</h1>
    </Layout>
  );
};
```

- client console log

```sh
frontmatter:
author: "Jane Doe"
author_image: "https://randomuser.me/api/portraits/women/11.jpg"
category: "JavaScript"
cover_image: "/images/posts/img5.jpg"
date: "May 8, 2021"
excerpt: "Crash course to learn the React JavaScript library. We will look at components, hooks and more"
title: "React Crash Course"
[[Prototype]]: Object
slug: "react-crash-course"
[[Prototype]]: Object
```

##

###
