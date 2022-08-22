import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../utils/hooks";
import { TabsContainerProps } from "../react-app-env";

const TabsContainer = ({ user, bool, setter, set1, set2, container }: TabsContainerProps) => {
  const { id, searchResults } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const userLanguage = useLanguage();
  const [leftTabTitle, setLeftTabTitle] = useState<string>("");
  const [rightTabTitle, setRightTabTitle] = useState<string>("");
  const [leftLength, setLeftLength] = useState<number | null>(set1!.data!.length);
  const [rightLength, setRightLength] = useState<number | null>(set2!.data!.length);

  const setTabTitles = useCallback(() => {
    switch (container) {
      case "profile":
        {
          user?.id === id
            ? setLeftTabTitle(`${userLanguage.profile.posts} (${set1!.data!.length!})`)
            : setLeftTabTitle(`${userLanguage.profile.userPosts} (${set1!.data!.length!})`);

          setRightTabTitle(`Likes (${rightLength!})`);
        }
        break;
      case "followerCard":
        {
          setLeftTabTitle(
            user?.id === id
              ? `${userLanguage.profile.followers} (${leftLength})`
              : `${userLanguage.profile.userFollowers} (${leftLength})`
          );
          setRightTabTitle(
            user?.id === id
              ? `${userLanguage.profile.following} (${rightLength})`
              : `${userLanguage.profile.userFollowing} (${rightLength})`
          );
        }
        break;
      case "search":
        {
          setLeftTabTitle(`${userLanguage.search.user} (${leftLength})`);
          setRightTabTitle(`${userLanguage.search.post} (${rightLength})`);
        }
        break;
      default:
        return;
    }
  }, [container, user?.id, id, set1, set2, setLeftTabTitle, setRightTabTitle, userLanguage, leftLength, rightLength]);

  useEffect(() => {
    setLeftLength(set1!.data!.length);
    setRightLength(set2!.data!.length);
    return () => {
      setLeftLength(null);
      setRightLength(null);
    };
  }, [user, searchResults.posts, searchResults.users, set1?.data?.length, set2?.data?.length]);

  useEffect(() => {
    setTabTitles();
  }, [container, user, searchResults, set1, set2, leftLength, rightLength]);

  return (
    <div className="w-full h-min px-4">
      <div className="tabs-container h-max relative w-full flex items-center justify-evenly">
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
