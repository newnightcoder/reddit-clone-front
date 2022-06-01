import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMods } from "../store/actions/user.action";
import { breakpoint } from "../utils/breakpoints";
import { useLanguage, useWindowSize } from "../utils/hooks";
import Skeleton from "./Skeleton";
import UserCard from "./UserCard";

const ModsContainer = () => {
  const { mods, error } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > breakpoint.lg) {
      dispatch(getMods());
    }
  }, [dispatch, width]);

  return (
    <div className="w-full h-max flex flex-col rounded dark:bg-gray-900 ">
      <div className="header h-24 w-full bg-gray-500 rounded-tl rounded-tr relative border-t border-l border-r border-transparent">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold"> {userLanguage.aside.mods}</span>
      </div>
      <div className="list w-full h-max flex flex-col items-center justify-center rounded-bl rounded-br bg-white dark:bg-gray-900 border-b border-l border-r dark:border-gray-600 pb-12">
        <>
          {mods.length === 0 || mods === undefined || error ? (
            <Skeleton element="user" number={2} mod={true} />
          ) : (
            mods?.map((user) => <UserCard user={user} key={user.id} mod={true} />)
          )}
          <button className="bg-gray-500 shadow flex items-center justify-center rounded-2xl w-3/4 py-1 px-2 text-white transform translate-y-6">
            {userLanguage.aside.modsContactBtn}
          </button>
        </>
      </div>
    </div>
  );
};

export default ModsContainer;
