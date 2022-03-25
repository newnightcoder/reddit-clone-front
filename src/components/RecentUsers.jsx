import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserCard } from ".";

const RecentUsers = () => {
  const users = useSelector((state) => state?.posts.users);
  const [lastFiveUsers, setLastFiveUsers] = useState([]);
  const sortedUsers = users?.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
  });

  useEffect(() => {
    setLastFiveUsers(sortedUsers?.splice(0, 5));
  }, [users]);

  return (
    <div className="w-full h-max flex flex-col rounded">
      <div className="header h-24 w-full bg-blue-400 rounded-tl rounded-tr relative">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold">Nouveaux membres</span>
      </div>
      <div className="list w-full h-max flex flex-col items-center justify-center rounded-bl rounded-br bg-white pb-12">
        <>
          {lastFiveUsers?.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
          <button className="bg-blue-900 shadow flex items-center justify-center rounded-2xl w-3/4 py-1 px-2 text-white transform translate-y-6">
            Voir tous les membres
          </button>
        </>
      </div>
    </div>
  );
};

export default RecentUsers;
