import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/actions/posts.action";
import UserCard from "./UserCard";

const Aside = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.posts.users);
  const [lastFiveUsers, setLastFiveUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const sortedUsers = users.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
  });

  const admin = users.filter((user) => user.role === "admin" && user);

  useEffect(() => {
    dispatch(getUsers());
    setAdminUsers(admin);
    setLastFiveUsers(sortedUsers.splice(0, 5));
  }, [dispatch, sortedUsers]);

  return (
    <div className="hidden w-1/5 md:w-2/5 xl:w-1/3 2xl:w-2/5 h-max md:flex flex-col items-center justify-start gap-2 border border-gray-200 mt-9 rounded">
      <div className="w-full h-max flex flex-col border border-gray-300 rounded">
        <div className="header h-24 w-full bg-blue-900 rounded-tl rounded-tr relative">
          <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold">Nouveaux membres</span>
        </div>
        <div className="list w-full h-max flex flex-col items-center justify-center rounded-bl rounded-br bg-white pb-12">
          <>
            {lastFiveUsers.map((user) => (
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
            {adminUsers.map((user) => (
              <UserCard user={user} key={user.id} mod={true} />
            ))}
            <button className="bg-gray-500 shadow flex items-center justify-center rounded-2xl w-3/4 py-1 px-2 text-white transform translate-y-6">
              Contacter un modérateur
            </button>
          </>
        </div>
      </div>

      <div className="flex justify-between h-72 w-full relative text-xs bg-white rounded text-gray-800 p-4 border border-gray-300">
        <ul className="leading-6">
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Aide</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Pièces Groupomania</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Groupomania Premium</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Pièces Groupomania</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Groupomania Gifts</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Communautés</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">ReGroupomania</li>
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

        <span className="absolute bottom-0 left-0 mb-3 w-full text-center ">Groupomania Inc © 2021 - Tous droits réservés</span>
      </div>
    </div>
  );
};

export default Aside;
