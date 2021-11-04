import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const MainContainer = () => {
  const isAuthenticated = useSelector((state) => state?.user.loginSuccess);

  return <>{!isAuthenticated ? <Redirect to={{ pathname: "/" }} /> : <div className="min-h-screen w-full"></div>}</>;
};

export default MainContainer;
