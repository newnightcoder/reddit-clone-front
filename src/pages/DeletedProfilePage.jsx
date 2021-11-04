import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router";
import logo from "../assets/logo.svg";
import { getPosts } from "../store/actions/posts.action";
import history from "../utils/history";

const DeletedProfile = () => {
  const location = useLocation();
  const isAdmin = location?.state?.admin;
  const isAuthenticated = useSelector((state) => state?.user.loginSuccess);
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

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
        <div
          className="page-container min-h-screen w-screen flex flex-col items-center justify-center relative pb-8 overflow-x-hidden"
          style={{ background: `url(${logo}) no-repeat fixed center/250%` }}
        >
          <div className="h-1/4 w-10/12 flex flex-col items-center justify-center rounded-sm bg-red-400 text-black py-2 px-2">
            {!isAdmin ? (
              <>
                Votre compte a bien été supprimé! <br /> Vous allez nous manquer. <br />
                Nous espérons vous revoir bientôt sur Groupomania!
              </>
            ) : (
              <>Le compte de l'utilisateur a été supprimé de l'application avec succès.</>
            )}
          </div>
          <button onClick={() => history.push(!isAdmin ? "/" : "/feed")}>retour à la page accueil</button>
        </div>
      )}
    </>
  );
};

export default DeletedProfile;
