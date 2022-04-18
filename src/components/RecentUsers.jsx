import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Skeleton, UserCard } from ".";
import { useLanguage } from "../utils/hooks";

const RecentUsers = () => {
  const users = useSelector((state) => state?.posts.users);
  const [lastFiveUsers, setLastFiveUsers] = useState([]);
  const sortedUsers = users?.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
  });

  const { pathname } = useLocation();
  const userLanguage = useLanguage();

  useEffect(() => {
    setLastFiveUsers(sortedUsers?.splice(0, 5));
  }, [users]);

  return (
    <div className="w-full h-max flex flex-col rounded">
      <div className="header h-24 w-full bg-blue-400 rounded-tl rounded-tr relative border-t border-l border-r border-transparent">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold">
          {userLanguage.aside.recentMembers}
        </span>
      </div>
      <div className="list w-full h-max flex flex-col items-center justify-center rounded-bl rounded-br bg-white dark:bg-gray-900  border-b border-l border-r dark:border-gray-600 pb-12">
        <>
          {lastFiveUsers.length === 0 || lastFiveUsers === undefined ? (
            <Skeleton element="user" number={pathname.includes("profile") ? 3 : 5} />
          ) : pathname.includes("profile") ? (
            lastFiveUsers.splice(0, 2).map((user) => <UserCard user={user} key={user.id} />)
          ) : (
            lastFiveUsers?.map((user) => <UserCard user={user} key={user.id} />)
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
