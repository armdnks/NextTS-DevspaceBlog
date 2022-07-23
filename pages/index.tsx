import { NextPage, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Layout } from "../components";

interface HomePageProps {
  posts: object[];
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  console.log(posts);

  return (
    <Layout>
      <h1>Hello NextTS</h1>
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
      posts,
    },
  };
};

export default HomePage;
