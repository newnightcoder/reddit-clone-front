import React from "react";

const Overlay = ({ isOpen, close }) => {
  return (
    <div
      className="h-screen w-screen absolute top-0 left-0 bg-black opacity-50 transition transition-opacity duration-200"
      style={
        isOpen
          ? {
              opacity: 0.75,
              zIndex: 20,
              visibility: "visible",
            }
          : {
              opacity: 0,
              zIndex: -10,
              visibility: "hidden",
            }
      }
      onClick={close}
    ></div>
  );
};

export default Overlay;
