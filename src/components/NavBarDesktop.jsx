import { PencilIcon, UserIcon } from "@heroicons/react/solid";
import React from "react";
import { Power } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NavBarDesktop = () => {
  return (
    <div className="w-max hidden md:flex flex-col items-center justify-center space-y-4 sticky top-20 border border-gray-30 px-4 lg:pt-6 pb-4 whitespace-nowrap rounded-lg lg:bg-white">
      <Link className="flex items-center justify-center lg:justify-start lg:pr-4 rounded-full bg-gray-400" to="/create">
        <div className="w-16 h-16 lg:w-10 lg:h-10 rounded-full relative flex items-center justify-center bg-gray-400">
          <div className="inline-block absolute top-0 left-0 transform translate-x-4 translate-y-2 lg:translate-x-2 lg:translate-y-0 text-white lg:text-gray-900">
            +
          </div>
          <PencilIcon className="h-9 lg:h-7 text-white lg:text-gray-900" />
        </div>
        <span className="hidden lg:inline-block font-bold">Publier un Post</span>
      </Link>
      <Link
        className="lg:w-11/12 flex items-center justify-center rounded-full lg:justify-start space-x-1 lg:pr-4 rounded-full "
        to=""
      >
        <div className="w-10 h-10 lg:w-max bg-white lg:bg-transparent lg:border-0 rounded-full relative flex items-center justify-center">
          <UserIcon className="h-7 lg:h-5 text-gray-900" />
        </div>
        <span className="hidden lg:inline-block font-bold">My profile</span>
      </Link>
      <Link
        className="lg:w-11/12 flex items-center justify-center rounded-full lg:justify-start space-x-1 lg:pr-4 rounded-full "
        to=""
      >
        <div className="w-10 h-10 lg:w-max bg-white lg:bg-transparent lg:border-0 rounded-full relative flex items-center justify-center">
          <Power size={25} />
        </div>
        <span className="hidden lg:inline-block font-bold">Logout</span>
      </Link>
    </div>
  );
};

export default NavBarDesktop;
