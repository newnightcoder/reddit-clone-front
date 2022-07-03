import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "../components";

const SearchPage = () => {
  const { searchQuery, searchResults } = useSelector((state) => state.user);
  return (
    <Layout>
      <div className="w-full min-h-screen flex items-start justify-center border2 border-red-500 lg:border-r lg:border-l lg:border-[#ededed] dark:md:border-gray-900 transition duration-500 md:px-12 pb-12">
        <div className="min-h-[calc(100vh-4rem)] w-full bg-white flex flex-col items-center justify-start text-black pt-4">
          <span className="leading-1">Search results</span>
          <span className="leading-1">{searchQuery}</span>
          {searchResults && (
            <div>
              {searchResults.map((result, i) => {
                return result.id !== undefined ? <div key={i + 1}>POST </div> : <div key={i + 1}>USER</div>;
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
