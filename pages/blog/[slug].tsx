import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import Image from "next/image";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

import { Layout, CategoryLabel } from "@/components/index";
import { IFrontMatter } from "@/interfaces/IPost";

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
  return (
    <Layout title={title}>
      <Link href="/blog">
        <a className="bg-gray-900 px-4 py-3 text-white rounded hover:opacity-90">
          Go Back
        </a>
      </Link>
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
          height="50%"
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
