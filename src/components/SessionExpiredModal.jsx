import React from "react";
import { Link } from "react-router-dom";
import { persistor } from "../store/storeConfig";
import { useLanguage } from "../utils/hooks";

const SessionExpiredModal = ({ isExpired, close }) => {
  const userLanguage = useLanguage();

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2 fixed top-0 left-0 z-50 bg-gray-900 transition-opacity duration-300 opacity-0 text-white text-sm"
      style={{ opacity: isExpired && 0.9, visibility: isExpired ? "visible" : "hidden" }}
    >
      {userLanguage.sessionExpired.expired} <br />
      <span className="flex gap-1">
        {userLanguage.sessionExpired.reconnect}
        <Link
          to="/login"
          className="underline hover:text-red-500"
          onClick={() => {
            persistor.purge();
            localStorage.clear();
            close();
          }}
        >
          {userLanguage.sessionExpired.here}
        </Link>
      </span>
    </div>
  );
};

export default SessionExpiredModal;
