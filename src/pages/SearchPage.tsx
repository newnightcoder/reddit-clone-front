import { SearchIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Layout, ToggleDiv } from "../components";
import { datasetTypes } from "../components/dataForToggleDiv";
import { IDataSet } from "../components/react-app-env";
import { clearErrorUserAction, clearSearchResults } from "../store/actions/user.action";
import { useLanguage, useToggleTabs } from "../utils/hooks";

const SearchPage = () => {
  const { searchQuery, searchResults } = useSelector((state) => state.user);
  const { toggleTabs, leftTabOpen } = useToggleTabs();
  const userLanguage = useLanguage();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isResults = searchResults.posts || searchResults.users ? true : false;
  const titleSearch = isResults
    ? `Search results for "${searchQuery.query}" ${searchQuery.filter ? `in ${searchQuery.filter}` : ""}`
    : userLanguage.search.msg;

  let dataset1: IDataSet = {
    name: datasetTypes.user,
    data: searchResults.users!,
  };
  let dataset2: IDataSet = {
    name: datasetTypes.post,
    data: searchResults.posts!,
  };

  useEffect(() => {
    dataset1 = {
      name: datasetTypes.user,
      data: searchResults.users!,
    };
    dataset2 = {
      name: datasetTypes.post,
      data: searchResults.posts!,
    };
  }, [searchResults]);

  useEffect(() => {
    dispatch(clearErrorUserAction());
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-7rem)] md:mt-8  w-full flex items-start justify-center  lg:border-r lg:border-l lg:border-[#ededed] dark:md:border-gray-900 transition duration-500 md:px-12 pb-4">
        <div
          className={`min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-7rem)] md:rounded-md w-full bg-white dark:bg-gray-900 flex flex-col items-center ${
            isResults ? "justify-start" : "justify-center"
          } space-y-4 text-black dark:text-gray-100 transition duration-500 pb-4`}
        >
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
            <SearchIcon className="w-2/3 text-gray-300 dark:text-gray-500 transition-colors duration-300 self-center rotate-90" />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
