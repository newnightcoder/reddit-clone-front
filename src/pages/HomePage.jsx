import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/bg.webp";
import logo from "../assets/full-logo-row-black.svg";
import { persistor } from "../store/storeConfig";

const Homepage = () => {
  persistor.purge();
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center gap-8 bg-orange-500 text-black"
      style={{
        background: `linear-gradient(rgba(70,70,70,.8), rgba(70,70,70,.8)), url(${bg}) no-repeat center/cover`,
      }}
    >
      <img src={logo} alt="logo" className="h-12 w-full my-4" />
      <div className="w-full flex flex-col items-center">
        <h1 className="uppercase text-gray-100">Déjà membre?</h1>
        <Link
          to="/login"
          className="w-60 py-2 text-center text-gray-900 font-bold uppercase rounded shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
        >
          Se connecter
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <h1 className="uppercase text-gray-100">Nouveau sur Groupomania?</h1>
        <Link
          to="/signup"
          className="w-60 py-2 text-center text-gray-900 font-bold uppercase rounded shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
