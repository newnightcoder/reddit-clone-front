import React from "react";
import { useLocation } from "react-router-dom";

const Feed = () => {
  const location = useLocation();
  const isNewUser = location?.state?.new && true;

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-red-300">
      <h1>FEED!!!</h1>
      <div className="text-center whitespace-pre">
        {isNewUser && "bienvenue sur groupomania!\non va grave s'éclater!"}
      </div>
    </div>
  );
};

export default Feed;
