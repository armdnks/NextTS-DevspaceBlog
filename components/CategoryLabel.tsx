import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

interface CategoryLabelProps {
  children: string;
}

const CategoryLabel: NextPage<CategoryLabelProps> = ({ children }) => {
  const colorKey: { [key: string]: string } = {
    JavaScript: "yellow",
    CSS: "blue",
    Python: "green",
    PHP: "purple",
    Ruby: "red",
  };

  return (
    <div
      className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
};

export default CategoryLabel;
