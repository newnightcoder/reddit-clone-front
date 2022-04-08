import React from "react";
import { useSelector } from "react-redux";

const LinkPreview = () => {
  const { title, image, description } = useSelector((state) => state.posts.scrapedPost);

  return (
    <div className="h-max w-11/12 rounded border border-gray-400 pb-4 mt-1 flex flex-col items-center justify-start space-y-3 border rounded-md ">
      <div
        style={{ background: `url("${image}") no-repeat center/cover` }}
        className="h-44 md:h-64 w-full rounded-tl rounded-tr"
      ></div>
      <div className="w-full font-bold px-4">{title}</div>
      <div className="w-full px-4">{description}</div>
    </div>
  );
};

export default LinkPreview;
