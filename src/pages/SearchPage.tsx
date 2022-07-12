import { SearchIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { Layout, ToggleDiv } from "../components";
import { datasetTypes } from "../components/dataForToggleDiv";
import { IDataSet } from "../components/react-app-env";
import { useLanguage, useToggleTabs } from "../utils/hooks";

const SearchPage = () => {
  const { searchQuery, searchResults } = useSelector((state) => state.user);
  const { toggleTabs, leftTabOpen } = useToggleTabs();
  const userLanguage = useLanguage();
  const isResults = searchResults.posts || searchResults.users ? true : false;
  const titleSearch = isResults
    ? `Search results for "${searchQuery.query}" ${searchQuery.filter ? `in ${searchQuery.filter}` : ""}`
    : userLanguage.search.msg;

  const dataset1: IDataSet = {
    name: datasetTypes.user,
    data: searchResults.users!,
  };
  const dataset2: IDataSet = {
    name: datasetTypes.post,
    data: searchResults.posts!,
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-7rem)] md:mt-8  w-full flex items-start justify-center border2 border-red-500 lg:border-r lg:border-l lg:border-[#ededed] dark:md:border-gray-900 transition duration-500 md:px-12">
        <div className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-7rem)] md:rounded-md w-full bg-white flex flex-col items-center justify-start space-y-4 text-black">
          <span
            className={`${
              isResults ? "h-20 uppercase flex items-center justify-center" : "italic text-sm pt-4"
            } leading-1 whitespace-pre text-center text-gray-500`}
          >
            {titleSearch}
          </span>
          {isResults ? (
            <ToggleDiv bool={leftTabOpen} setter={toggleTabs} container={"search"} dataset1={dataset1} dataset2={dataset2} />
          ) : (
            <SearchIcon className="w-2/3 text-gray-300 self-center rotate-90" />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
