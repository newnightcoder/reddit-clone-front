import React from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../utils/hooks";

const FeedGreetings = () => {
  const { isAuthenticated, isNewUser, username } = useSelector((state) => state.user);
  const userLanguage = useLanguage();

  return (
    <div className="bienvenueMsg-newcomer w-full h-16 flex items-center justify-center text-center text-sm whitespace-pre mb-2">
      {!isAuthenticated ? (
        <span className="font-bold">{userLanguage?.feed.greetingVisitorMode}&nbsp;</span>
      ) : isNewUser ? (
        <div className="w-full font-bold flex flex-col items-center justify-center">
          <span className="w-full flex items-center justify-center px-10">
            <span className="">{userLanguage?.feed.greetingVisitorLine1}&nbsp;</span>
            <span className="capitalize text-left overflow-hidden overflow-ellipsis">{username ? username : "Noname"}!</span>
          </span>
          <span className="inline-block">{userLanguage?.feed.greetingVisitorLine2}</span>
        </div>
      ) : (
        <span className="overflow-x-hidden overflow-ellipsis px-10 font-bold">
          {userLanguage?.feed.greetingUser}&nbsp;
          <span className="capitalize w-full text-left">{username ? username : "Noname"}!</span>
        </span>
      )}
    </div>
  );
};

export default FeedGreetings;
