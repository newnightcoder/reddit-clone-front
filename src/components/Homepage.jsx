import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { persistor } from "../store/storeConfig";

const Homepage = () => {
  persistor.purge();
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center gap-8 bg-orange-500 text-black"
      style={{ background: `url(${logo}) no-repeat center/250%` }}
    >
      <div className="w-full flex flex-col items-center">
        <h1 className="uppercase font-bold">Déjà membre?</h1>
        <Link
          to="/login"
          className="w-60 py-2 text-center text-white uppercase rounded shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
        >
          Se connecter
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <h1 className="uppercase font-bold">Nouveau sur Groupomania?</h1>
        <Link
          to="/signup"
          className="w-60 py-2 text-center text-white uppercase rounded shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
