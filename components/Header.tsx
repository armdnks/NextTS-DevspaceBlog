import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { GITHUB_LINK } from "@/config/index";

const Header: NextPage = () => {
  return (
    <header className="bg-gray-900 text-gray-100 shadow w-full sticky top-0 z-10">
      <div className="container mx-auto items-center justify-between flex p-5 flex-col md:flex-row">
        <Link href="/">
          <a className="flex title-font font-medium items-center mb-4 md:justify-start md:mb-0">
            <Image src="/images/logo.png" alt="logo" width={40} height={40} />
            <span className="ml-3 text-xl">DevSpace</span>
          </a>
        </Link>

        <nav className="flex items-center justify-center gap-8 text-base ">
          <Link href="/blog">
            <a className="cursor-pointer uppercase hover:text-indigo-300">
              Blog
            </a>
          </Link>
          <Link href="/about">
            <a className="cursor-pointer uppercase hover:text-indigo-300">
              About
            </a>
          </Link>
          <Link href={GITHUB_LINK} passHref>
            <a
              target="_blank"
              className="cursor-pointer flex items-center justify-center bg-white px-2 py-1 rounded hover:opacity-80"
            >
              <Image
                src="/images/github-emblem.png"
                alt="logo"
                width="100%"
                height="27%"
              />
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
