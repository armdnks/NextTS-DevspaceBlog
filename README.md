# NextTS - Devspace Blog

## Course From Brad Traversy

```url
https://www.udemy.com/course/nextjs-dev-to-deployment/
```

##

### Support Links

> How to set types for functional component props in Nextjs with TypeScript?:
> https://melvingeorge.me/blog/set-types-for-functional-components-props-typescript-nextjs

> How to use GetStaticProps and GetStaticPaths with TypeScript:
> https://www.vitamindev.com/next-js/getstaticprops-getstaticpaths-typescript/

> next/image:
> https://nextjs.org/docs/api-reference/next/image#domains

> TS2322: Type '{ text: string; }' is not assignable to type 'string'
> getStaticProps not working well with TypeScript #16522:
> https://github.com/vercel/next.js/discussions/16522

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

### Display Posts

- #### index.tsx

```tsx
const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      <Link href="/blog">
        <a className="w-full block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline">
          All Posts
        </a>
      </Link>
    </Layout>
  );
};
```

- #### Post.tsx

```tsx
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { IPost } from "../interfaces/IPost";

interface PostProps {
  post: IPost;
}

const Post: NextPage<PostProps> = ({ post: { frontmatter, slug } }) => {
  return (
    <div className="w-full px-5 py-5 bg-white rounded-lg shadow-md mt-6">
      <Image
        src={frontmatter.cover_image}
        alt={frontmatter.title}
        width="100%"
        height={50}
        layout="responsive"
        objectFit="cover"
        className="rounded"
      />

      <div className="flex justify-between items-center mt-4">
        <span className="font-light text-gray-600">{frontmatter.date}</span>
        <div>{frontmatter.category}</div>
      </div>

      <div className="mt-2">
        <Link href={`/blog/${slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{frontmatter.excerpt}</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href={`/blog/${slug}`}>
          <a className="text-gray-900 hover:text-blue-600">Read More</a>
        </Link>
        <div className="flex items-center">
          <Image
            src={frontmatter.author_image}
            alt={frontmatter.author_image}
            width="40%"
            height="40%"
            className="rounded-full hidden sm:block"
          />
          <h3 className="ml-4 text-gray-700 font-bold">{frontmatter.author}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
```

- #### helper.tsx

```tsx
export function sortByDate(a: any, b: any): number {
  const oldPost = new Date(a.frontmatter.date);
  const newPost = new Date(b.frontmatter.date);
  const result = (+newPost - +oldPost)!;
  return result;
}
```

- implement on getStaticProps in index.tsx

```tsx
// export const getStaticProps: GetStaticProps = async (context) => {
//   return {
//     props: {
      posts: posts.sort(sortByDate).slice(0, 6),
//     },
//   };
// };
```

##

### Category Label Component

- #### CategoryLabel.tsx

```tsx
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

interface CategoryLabelProps {
  children: string;
}

const CategoryLabel: NextPage<CategoryLabelProps> = ({ children }) => {
  const colorKey: { [key: string]: string } = {
    JavaScript: "yellow",
    CSS: "blue",
    Python: "green",
    PHP: "purple",
    Ruby: "red",
  };

  return (
    <div
      className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
};

export default CategoryLabel;
```

- #### Post.tsx

```tsx
// <div className="flex justify-between items-center mt-4">
//   <span className="font-light text-gray-600">{frontmatter.date}</span>
<CategoryLabel>{frontmatter.category}</CategoryLabel>
// </div>
```

##

### Create Blog Page

- blog/index.tsx
- #### index.tsx

```tsx
import { NextPage, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Layout, Post } from "../../components";
import { IPost } from "../../interfaces/IPost";
import { sortByDate } from "../../utils/helper";

interface BlogPageProps {
  posts: IPost[];
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
};

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
      posts: posts.sort(sortByDate),
    },
  };
};

export default BlogPage;
```

##

### Generate Static Paths & Single Post Data

- #### [slug].tsx

```tsx
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";

const PostPage: NextPage = () => {
  return <div>PostPage</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: {} };
};

export default PostPage;
```

```sh
[
  { params: { slug: 'django-crash-course' } },
  { params: { slug: 'javascript-performance-tips' } },
  { params: { slug: 'manage-react-state-with-xstate' } },
  { params: { slug: 'new-in-php-8' } },
  { params: { slug: 'python-book-review' } },
  { params: { slug: 'react-crash-course' } },
  { params: { slug: 'tailwind-vs-bootstrap' } },
  { params: { slug: 'writing-great-unit-tests' } }
]
```

- #### getStaticPaths & getStaticProps

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
};
```

- #### Complete Code

```tsx
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { IFrontMatter } from "../../interfaces/IPost";

interface PostPageProps {
  frontmatter: IFrontMatter;
  content: string;
  slug: string;
}

const PostPage: NextPage<PostPageProps> = ({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) => {
  return <div>{title}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
};

export default PostPage;
```

##

### Display Single Blog Post

- #### [slug].tsx

```tsx
import { marked } from "marked";

const PostPage: NextPage<PostPageProps> = ({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) => {
  return (
    <Layout title={title}>
      <Link href="/blog">Go Back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <Image
          src={cover_image}
          alt=""
          className="w-full rounded"
          width="100%"
          height="30%"
          layout="responsive"
          objectFit="cover"
        />

        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <Image
              src={author_image}
              alt=""
              className="rounded-full hidden sm:block"
              width="45%"
              height="45%"
              objectFit="cover"
            />
            <h4 className="mx-4">{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>

        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
};
```
