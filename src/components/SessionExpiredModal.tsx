import React from "react";
import { Link } from "react-router-dom";
import { persistor } from "../store/storeConfig";
import { useLanguage } from "../utils/hooks";
import { ExpiredProps } from "./react-app-env";

const SessionExpiredModal = ({ isExpired, close }: ExpiredProps) => {
  const userLanguage = useLanguage();

  // useEffect(() => {
  //   document.body.style.overflowY = "hidden";
  // }, []);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center space-y-4 fixed top-0 left-0 z-50 bg-gray-900 transition-opacity duration-300 opacity-0 text-white overflow-y-hidden"
      style={{ opacity: isExpired ? 0.9 : "", visibility: isExpired ? "visible" : "hidden" }}
    >
      <span className="uppercase font-bold bg-black p-1">{userLanguage.sessionExpired.expired} </span>
      <div className="h-96 w-96 bg-expired bg-no-repeat bg-center bg-cover rounded-full flex items-center justify-center"></div>
      <div className="flex items-center justify-center space-x-1 text-sm font-bold uppercase bg-black p-1">
        <span className="bg-black">{userLanguage.sessionExpired.reconnect}</span>
        <Link
          to="/login"
          className="bg-black underline hover:text-blue-500"
          onClick={() => {
            persistor.purge();
            localStorage.clear();
            close();
          }}
        >
          {userLanguage.sessionExpired.here}
        </Link>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
