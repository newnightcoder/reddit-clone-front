import React from "react";
import { XLg } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Comment = () => {
  return (
    <div
      className="w-screen flex flex-col items-center justify-evenly"
      style={{
        height: "calc(100vh - 4rem)",
        background: `url(${logo}) no-repeat fixed center/250%`,
      }}
    >
      Comment
      <div className="flex flex-col items-center justify-center rounded-full">
        <Link
          to={"/feed"}
          className="h-12 w-12 flex items-center justify-center text-white p-2 rounded-full shadow-xl"
          style={{ backgroundColor: "#ef5350" }}
          disabled={false}
        >
          <XLg />{" "}
        </Link>{" "}
      </div>
    </div>
  );
};

export default Comment;
