import React from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { bye, logo } from "../assets";
import { history } from "../utils/helpers";
import { useLanguage } from "../utils/hooks";

const DeletedProfile = () => {
  const location = useLocation();
  const isAdmin = location?.state?.admin;
  const { isAuthenticated, language } = useSelector((state) => state?.user);
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
      <Div100vh className="page-container relative bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen w-screen flex flex-col items-center justify-center space-y-5 pb-8 md:pb-0 overflow-x-hidden">
        <div className="h-max w-10/12 md:w-max flex items-center justify-center text-center text-black py-2 px-2">
          {!isAdmin ? (
            <div className="h-full w-full flex-col items-center justify-center space-y-5">
              <>
                {userLanguage.deletePage.confirmation}
                <br /> {userLanguage.deletePage.missYou} <br />
                <span className="h-6 w-full flex items-center justify-center space-x-2">
                  <span>{userLanguage.deletePage.hope}</span>
                  <img src={logo} alt="forum logo" className="h-full transform -translate-y-1 -translate-x-px" />
                  {language === "de" && <span className="transform -translate-x-1">wiederzusehen!</span>}
                </span>
              </>
              <img src={bye} alt="sad bye bye gif" className="rounded border-2 border-white" />
            </div>
          ) : (
            <>{userLanguage.deletePage.modMsg}</>
          )}
        </div>
        <button
          className="rounded-full w-max px-6 py-2 bg-blue-400  transition duration-100 shadow-lg hover:shadow-none hover:cursor-pointer text-white"
          onClick={() => history.push(!isAdmin ? "/" : "/feed")}
        >
          {userLanguage.deletePage.backBtn}
        </button>
        <span className="absolute md:flex items-center justify-center bottom-0 mx-auto text-xs text-gray-500 dark:text-gray-400 capitalize pb-2">
          &copy;2022 FORUM, Inc.
        </span>
      </Div100vh>
      {/* )} */}
    </>
  );
};

export default DeletedProfile;
