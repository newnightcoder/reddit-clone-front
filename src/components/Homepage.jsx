import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8 bg-red-100 text-black">
      <h1 className="w-screen capitalize text-center border">groupomania</h1>
      <div className="w-full flex flex-col items-center">
        <h2>Déjà membre?</h2>
        <Link
          to="/login"
          className="bg-red-500 w-60 py-2 text-center text-white rounded"
        >
          Se connecter
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2>Nouveau sur Groupomania?</h2>
        <Link
          to="/signup"
          className="bg-red-500 w-60 py-2 text-center text-white rounded"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
