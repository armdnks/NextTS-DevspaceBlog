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
