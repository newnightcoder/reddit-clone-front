import React from "react";
import { OverlayProps } from "./react-app-env";

const Overlay = ({ isMenuOpen, close }: OverlayProps) => {
  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 bg-black opacity-50 transition transition-opacity duration-200"
      style={
        isMenuOpen
          ? {
              opacity: 0.75,
              zIndex: 50,
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
