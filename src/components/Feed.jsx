import React from "react";
import { useLocation } from "react-router-dom";

const Feed = () => {
  const location = useLocation();
  const isNewUser = location.state && location.state.new && true;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <h1>FEED!!!</h1>
      <div>
        {isNewUser && "bienvenue sur groupomania! on va grave s'éclater!"}
      </div>
    </div>
  );
};

export default Feed;
