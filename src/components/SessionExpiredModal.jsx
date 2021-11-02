import React from "react";
import { Link } from "react-router-dom";
import { persistor } from "../store/storeConfig";

const SessionExpiredModal = ({ isExpired, close }) => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2 fixed top-0 left-0 z-50 bg-gray-900 transition-opacity duration-300 opacity-0 text-white text-sm"
      style={{ opacity: isExpired && 0.9, visibility: isExpired ? "visible" : "hidden" }}
    >
      Votre session a expiré! <br />{" "}
      <span className="flex gap-1">
        Veuillez vous reconnecter
        <Link
          to="/login"
          className="underline hover:text-red-500"
          onClick={() => {
            persistor.purge();
            localStorage.clear();
            close();
          }}
        >
          ici
        </Link>
      </span>
    </div>
  );
};

export default SessionExpiredModal;
