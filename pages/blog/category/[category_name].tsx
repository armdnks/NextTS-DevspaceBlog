import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Layout, Post, CategoryList } from "@/components/index";
import { IPost } from "@/interfaces/IPost";
import { ParsedUrlQuery } from "querystring";
import { getPosts } from "@/lib/posts";

interface CategoryBlogPageProps {
  posts: IPost[];
  categoryName: string;
  categories: string[];
}

const CategoryBlogPage: NextPage<CategoryBlogPageProps> = ({
  posts,
  categoryName,
  categories,
}) => {
  return (
    <Layout>
      <div className="flex justify-between flex-col gap-5 md:flex-row-reverse">
        <div className="mb-4 md:mb-0 md:w-1/3 lg:w-1/4">
          <CategoryList categories={categories} />
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            {posts.length === 1 ? "Post in " : "Posts in "} {categoryName}
          </h1>

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  category_name: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { category_name: categoryName } = context.params as Params;

  const files = fs.readdirSync(path.join("posts"));
  const posts = getPosts();

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  // Filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === categoryName
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName,
      categories: uniqueCategories,
    },
  };
};

export default CategoryBlogPage;
