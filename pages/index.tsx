import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Layout, Post } from "../components";
import { IPost } from "../interfaces/IPost";
import { sortByDate } from "../utils/helper";

interface HomePageProps {
  posts: IPost[];
}

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
      posts: posts.sort(sortByDate).slice(0, 6),
    },
  };
};

export default HomePage;
