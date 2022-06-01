import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Skeleton, UserCard } from ".";
import { getRecentUsers } from "../store/actions/user.action";
import { breakpoint } from "../utils/breakpoints";
import { useLanguage, useWindowSize } from "../utils/hooks";

const RecentUsers = () => {
  const { recentUsers: users } = useSelector((state) => state?.user);
  const recentUsers = [...users];
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userLanguage = useLanguage();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > breakpoint.lg) {
      dispatch(getRecentUsers());
    }
  }, [dispatch, width]);

  return (
    <div className="w-72 h-max flex flex-col rounded">
      <div className="header h-24 w-full bg-blue-400 rounded-tl rounded-tr relative border-t border-l border-r border-transparent">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold">
          {userLanguage.aside.recentMembers}
        </span>
      </div>
      <div className="list w-full h-max flex flex-col items-center justify-center rounded-bl rounded-br bg-white dark:bg-gray-900  border-b border-l border-r dark:border-gray-600 pb-12">
        <>
          {recentUsers.length === 0 || recentUsers === undefined ? (
            <Skeleton element="user" number={pathname.includes("profile") ? 3 : 5} />
          ) : pathname.includes("/profile") ? (
            recentUsers?.splice(0, 3).map((user) => <UserCard user={user} key={user.id} />)
          ) : (
            recentUsers?.map((user) => <UserCard user={user} key={user.id} />)
          )}
          <button className="bg-blue-500 shadow flex items-center justify-center rounded-2xl w-3/4 py-1 px-2 text-white transform translate-y-6">
            {userLanguage.aside.newMembersBtn}
          </button>
        </>
      </div>
    </div>
  );
};

export default RecentUsers;
