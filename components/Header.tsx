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
