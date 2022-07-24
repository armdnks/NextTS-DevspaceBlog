import type { NextPage } from "next";
import Link from "next/link";

interface PaginationProps {
  numPages: number;
  currentPage: number;
}

const Pagination: NextPage<PaginationProps> = ({ numPages, currentPage }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;

  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2">
        <Link href={prevPage}>
          <li
            className={`
            ${isFirst ? "pointer-events-none bg-gray-700 text-gray-300" : null}
            relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer
            `}
          >
            Previous
          </li>
        </Link>

        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`} key={`page-${i}`}>
            <li
              className={`
              ${
                currentPage === i + 1 ? "pointer-events-none bg-gray-300" : null
              }
              relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer
              `}
            >
              {i + 1}
            </li>
          </Link>
        ))}

        <Link href={nextPage}>
          <li
            className={`
            ${isLast ? "pointer-events-none bg-gray-700 text-gray-300" : null}
            relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer
            `}
          >
            Next
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Pagination;
