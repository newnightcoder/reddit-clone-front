import React from "react";
import { useSelector } from "react-redux";
import { Skeleton, UserCard } from "../components";
import { useLanguage } from "../utils/hooks";

const ModsContainer = () => {
  const { mods, error } = useSelector((state) => state?.user);
  // const dispatch = useDispatch();
  const userLanguage = useLanguage();
  // const { width } = useWindowSize();

  return (
    <div className="w-full h-max flex flex-col rounded transition-color duration-500 bg-white dark:bg-gray-900">
      <div className="header h-24 w-full bg-orange-600 rounded-tl rounded-tr relative border-t border-l border-r border-transparent">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold"> {userLanguage.aside.mods}</span>
      </div>
      <div className="list w-full h-max flex flex-col items-center justify-center rounded-bl rounded-br border-b border-l border-r transition-color duration-500 dark:border-gray-600 pb-12">
        <>
          {mods.length === 0 || mods === undefined || error ? (
            <Skeleton element="user" number={2} mod={true} />
          ) : (
            mods?.map((user) => <UserCard user={user} key={user.id} mod={true} />)
          )}
          <button className="bg-orange-600 shadow flex items-center justify-center rounded-2xl w-3/4 py-1 px-2 text-white transform translate-y-6">
            {userLanguage.aside.modsContactBtn}
          </button>
        </>
      </div>
    </div>
  );
};

export default ModsContainer;
