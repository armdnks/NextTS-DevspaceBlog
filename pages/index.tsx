import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { Layout, Post } from "@/components/index";
import { IPost } from "@/interfaces/IPost";
import { getPosts } from "@/lib/posts";

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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: getPosts().slice(0, 6),
    },
  };
};

export default HomePage;
