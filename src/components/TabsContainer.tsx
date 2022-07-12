import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../utils/hooks";
import { TabsContainerProps } from "./react-app-env";

const TabsContainer = ({ user, bool, setter, length1, length2, container }: TabsContainerProps) => {
  const { id } = useSelector((state) => state.user);
  const userLanguage = useLanguage();
  const [leftTabTitle, setLeftTabTitle] = useState<string>("");
  const [rightTabTitle, setRightTabTitle] = useState<string>("");

  const setTabTitles = useCallback(() => {
    switch (container) {
      case "profile":
        {
          setLeftTabTitle(
            user?.id === id ? `${userLanguage.profile.posts} (${length1})` : `${userLanguage.profile.userPosts} (${length1})`
          );
          setRightTabTitle(`Likes (${length2})`);
        }
        break;
      case "followers":
        {
          setLeftTabTitle(
            user?.id === id
              ? `${userLanguage.profile.followers} (${length1})`
              : `${userLanguage.profile.userFollowers} (${length1})`
          );
          setRightTabTitle(
            user?.id === id
              ? `${userLanguage.profile.following} (${length2})`
              : `${userLanguage.profile.userFollowing} (${length2})`
          );
        }
        break;
      case "search":
        {
          setLeftTabTitle(`${userLanguage.search.user} (${length1})`);
          setRightTabTitle(`${userLanguage.search.post} (${length2})`);
        }
        break;
      default:
    }
  }, [container, user, id]);

  useEffect(() => {
    setTabTitles();
  }, []);

  return (
    <div className="w-full h-min px-4">
      <div className="tabs-container h-max relative w-full h-full flex items-center justify-evenly">
        <button
          onClick={!bool ? setter : undefined}
          className="h-max py-[0.55rem] w-1/2 flex items-center justify-center rounded-tl rounded-tr outline-none font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {leftTabTitle}
        </button>
        <button
          onClick={bool ? setter : undefined}
          className="h-max py-[0.55rem] w-1/2 flex items-center justify-center rounded-tl rounded-tr outline-none font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {rightTabTitle}
        </button>
        <div
          className={`absolute left-0 bottom-0 w-1/2 h-1 bg-blue-500 rounded-full transform transition duration-100 ${
            bool ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
      </div>
    </div>
  );
};
export default TabsContainer;
