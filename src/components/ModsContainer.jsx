import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const ModsContainer = () => {
  const users = useSelector((state) => state?.posts.users);
  const admin = users?.filter((user) => user.role === "admin" && user);
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    setAdminUsers(admin);
  }, [users]);

  return (
    <div className="w-full h-max flex flex-col border border-gray-300 rounded">
      <div className="header h-24 w-full bg-gray-500 rounded-tl rounded-tr relative">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold">Modérateur(s)</span>
      </div>
      <div className="list w-full h-max flex flex-col items-center justify-center rounded-bl rounded-br bg-white pb-12">
        <>
          {adminUsers?.map((user) => (
            <UserCard user={user} key={user.id} mod={true} />
          ))}
          <button className="bg-gray-500 shadow flex items-center justify-center rounded-2xl w-3/4 py-1 px-2 text-white transform translate-y-6">
            Contacter un modérateur
          </button>
        </>
      </div>
    </div>
  );
};

export default ModsContainer;
