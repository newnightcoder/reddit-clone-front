import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVisitorModal } from "../store/actions/user.action";

const VisitorModal = () => {
  const { isVisitor, visitorMessage } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        visibility: isVisitor ? "visible" : "hidden",
        opacity: isVisitor ? "1" : "0",
        zIndex: isVisitor ? 1000 : -1,
        backgroundColor: isVisitor ? "rgba(0,0,0,.8)" : null,
      }}
      className="h-screen w-screen fixed inset-0 transition-opacity duration-300 flex items-center justify-center text-white"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <p>{visitorMessage}</p>
        <button
          onClick={() => dispatch(toggleVisitorModal(""))}
          className="w-60 py-2 text-center text-white font-bold uppercase shadow-xl bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
        >
          ok
        </button>
      </div>
    </div>
  );
};

export default VisitorModal;
