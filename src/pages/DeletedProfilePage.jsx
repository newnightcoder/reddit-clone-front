import React from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { history } from "../utils/helpers";
import { useLanguage } from "../utils/hooks";

const DeletedProfile = () => {
  const location = useLocation();
  const isAdmin = location?.state?.admin;
  const { isAuthenticated } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getPosts());
  //   }, 2000);
  // }, [dispatch]);

  return (
    <>
      {/* {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : ( */}
      <Div100vh className="page-container bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen w-screen flex flex-col items-center justify-center relative pb-8 overflow-x-hidden">
        <div className="h-1/4 w-10/12 md:w-max flex flex-col items-center justify-center text-center text-black py-2 px-2">
          {!isAdmin ? (
            <>
              {userLanguage.deletePage.confirmation}
              <br /> {userLanguage.deletePage.missYou} <br />
              {userLanguage.deletePage.hope}
            </>
          ) : (
            <>{userLanguage.deletePage.modMsg}</>
          )}
        </div>
        <button
          className="rounded-full px-6 py-1 bg-blue-400 hover:cursor-pointer hover:underline"
          onClick={() => history.push(!isAdmin ? "/" : "/feed")}
        >
          {userLanguage.deletePage.backBtn}
        </button>
      </Div100vh>
      {/* )} */}
    </>
  );
};

export default DeletedProfile;
