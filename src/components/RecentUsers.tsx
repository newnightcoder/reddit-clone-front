import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Skeleton, UserCard } from ".";
import { useLanguage } from "../utils/hooks";

const RecentUsers = () => {
  const { recentUsers: users } = useSelector((state) => state?.user);
  // const recentUsers = [...users];
  // const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userLanguage = useLanguage();
  // const { width } = useWindowSize();

  return (
    <div className="w-full h-max flex flex-col rounded transition-color duration-500 bg-white dark:bg-gray-900">
      <div className="header h-24 w-full transition-color duration-500 bg-blue-400 dark:bg-[#3B82F6] rounded-tl rounded-tr relative border-t border-l border-r border-transparent">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold">
          {userLanguage.aside.recentMembers}
        </span>
      </div>
      <div className="list w-full h-max flex flex-col items-center justify-center rounded-bl rounded-br  transition-color duration-500 border-b border-l border-r dark:border-gray-600 pb-12">
        <>
          {users.length === 0 || users === undefined ? (
            <Skeleton element="user" number={pathname.includes("profile") ? 3 : 5} />
          ) : pathname.includes("/profile") ? (
            [...users]?.splice(0, 3).map((user) => <UserCard user={user} key={user.id} />)
          ) : (
            [...users]?.map((user) => <UserCard user={user} key={user.id} />)
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
