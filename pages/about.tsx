import Link from "next/link";
import Image from "next/image";
import { Layout } from "@/components/index";
import { GITHUB_LINK } from "@/config/index";

const AboutPage = () => {
  return (
    <Layout title="About DevSpace">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>
      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6 flex flex-col items-start gap-4">
        <h3 className="text-2xl font-bold">DevSpace Blog</h3>
        <h4>
          This is a blog built with Next.js, Typescript, Tailwind CSS, and
          Markdown
        </h4>
        <h4 className="font-bold mb-2">Version 1.0.0</h4>
        <Link href={GITHUB_LINK} passHref>
          <a target="_blank" className="cursor-pointer hover:opacity-80">
            <Image
              src="/images/github-emblem.png"
              alt="logo"
              width="100%"
              height="27%"
            />
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default AboutPage;
