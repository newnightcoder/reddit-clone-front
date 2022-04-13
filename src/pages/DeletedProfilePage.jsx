import React, { useEffect } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router";
import bg from "../assets/bg.webp";
import { getPosts } from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { useLanguage } from "../utils/hooks";

const DeletedProfile = () => {
  const location = useLocation();
  const isAdmin = location?.state?.admin;
  const { isAuthenticated } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getPosts());
    }, 2000);
  }, [dispatch]);

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <Div100vh
          className="page-container min-h-screen w-screen flex flex-col items-center justify-center relative pb-8 overflow-x-hidden"
          style={{ background: `linear-gradient(rgba(70,70,70,.45), rgba(70,70,70,.45)), url(${bg}) no-repeat center/cover` }}
        >
          <div className="h-1/4 w-10/12 flex flex-col items-center justify-center rounded-sm bg-red-400 text-black py-2 px-2">
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
          <button className="hover:cursor-pointer hover:underline" onClick={() => history.push(!isAdmin ? "/" : "/feed")}>
            {userLanguage.deletePage.backBtn}
          </button>
        </Div100vh>
      )}
    </>
  );
};

export default DeletedProfile;
