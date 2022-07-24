import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/interfaces/IPost";
import CategoryLabel from "./CategoryLabel";

interface PostProps {
  post: IPost;
  compact?: boolean;
}

const Post: NextPage<PostProps> = ({
  post: { frontmatter, slug },
  compact,
}) => {
  return (
    <div className="w-full px-5 py-5 bg-white rounded-lg shadow-md mt-6">
      {!compact && (
        <Image
          src={frontmatter.cover_image}
          alt={frontmatter.title}
          width="100%"
          height={50}
          layout="responsive"
          objectFit="cover"
          className="rounded"
        />
      )}
      <div className="flex justify-between items-center mt-4">
        <span className="font-light text-gray-600">{frontmatter.date}</span>
        <CategoryLabel>{frontmatter.category}</CategoryLabel>
      </div>

      <div className="mt-2">
        <Link href={`/blog/${slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{frontmatter.excerpt}</p>
      </div>

      {!compact && (
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
            <h3 className="ml-4 text-gray-700 font-bold">
              {frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
