import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopularPosts from "./PopularPosts";
import UserCard from "./UserCard";

const Aside = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.posts.users);
  const [lastFiveUsers, setLastFiveUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const admin = users?.filter((user) => user.role === "admin" && user);
  const sortedUsers = users?.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
  });

  useEffect(() => {
    setAdminUsers(admin);
    setLastFiveUsers(sortedUsers.splice(0, 5));
  }, [users]);

  return (
    <div className="hidden w-min h-full grow shrink basis-auto lg:flex flex-col items-center justify-start gap-2 border border-gray-200 rounded sticky bottom-0">
      <div className="w-full h-max flex flex-col border border-gray-300 rounded">
        <div className="header h-24 w-full bg-blue-900 rounded-tl rounded-tr relative">
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
      <div className="relative sticky top-20">
        <PopularPosts />
        <div className="h-max w-full flex flex-col space-y-4 text-xs bg-white rounded text-gray-800 p-4 border border-gray-300">
          <div className="flex justify-between h-max w-full space-x-3">
            <ul className="leading-6">
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Aide</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Pièces Connect</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Connect Premium</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Pièces Connect</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Connect Gifts</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Communautés</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">ReConnect</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Thématiques</li>
            </ul>
            <ul className="leading-6">
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Carrières</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Presse</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Publicités</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Blog</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Conditions</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Politique De Contenu</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Politique De Confidentialité</li>
              <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Politique De Modération</li>
            </ul>
          </div>
          <span className="w-full text-center">Connect Inc © 2021 - Tous droits réservés</span>
        </div>
      </div>
    </div>
  );
};

export default Aside;
