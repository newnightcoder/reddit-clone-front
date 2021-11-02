import React from "react";
import { useHistory } from "react-router";
import logo from "../assets/logo.svg";

const DeletedProfile = () => {
  const history = useHistory();
  return (
    <div
      className="page-container min-h-screen w-screen flex flex-col items-center justify-center relative pb-8 overflow-x-hidden"
      style={{ background: `url(${logo}) no-repeat fixed center/250%` }}
    >
      <div className="h-1/4 w-10/12 flex flex-col items-center justify-center rounded-sm bg-red-400 text-black py-2 px-2">
        Votre compte a bien été supprimé! <br /> Vous allez nous manquer. <br />
        Nous espérons vous revoir bientôt sur Groupomania!
      </div>
      <button onClick={() => history.push("/")}>retour à la page accueil</button>
    </div>
  );
};

export default DeletedProfile;
