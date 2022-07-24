import type { NextPage } from "next";
import { IPost } from "@/interfaces/IPost";
import Post from "./Post";

interface SearchResultsProps {
  results: IPost[];
}
const SearchResults: NextPage<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) return <></>;

  return (
    <div className="absolute top-20 right-0 z-10 border-4 border-gray-500 bg-white text-black w-full rounded-2xl md:right-10 md:w-6/12 ">
      <div className="p-10">
        <h2 className="text-3xl mb-3">{results.length} Results</h2>
        {results.map((result, index) => (
          <Post key={index} post={result} compact={true} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
