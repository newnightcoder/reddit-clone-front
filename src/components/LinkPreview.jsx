import React from "react";
import { Link } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const LinkPreview = ({ previewTitle, previewText, previewImg, previewPub, previewPubLogo }) => {
  const { title, image, description, publisher, logo } = useSelector((state) => state.posts.scrapedPost);

  return (
    <div className="h-max w-11/12 rounded border border-gray-400 pb-4 mt-1 flex flex-col items-center justify-start space-y-3 border rounded-md ">
      <div
        style={{ background: `url("${image ? image : previewImg}") no-repeat center/cover` }}
        className="h-44 md:h-64 w-full rounded-tl rounded-tr"
      ></div>
      <div className="w-full flex flex-col space-y-1.5 text-gray-700 text-sm ">
        <div className="w-full font-bold px-4 leading-4">{title ? title : previewTitle}</div>
        <div className="w-full px-4 leading-4">{description ? description : previewText}</div>
      </div>
      <div className="w-full px-4 flex items-center justify-between space-x-1 text-gray-500 text-xs">
        <div className="w-max flex items-center justify-start space-x-1">
          <Link size={18} style={{ transform: "translateY(-0.03rem)" }} /> <span>{publisher ? publisher : previewPub}</span>
        </div>
        {logo ? <img src={logo} width="25" /> : previewPubLogo !== "null" && <img src={previewPubLogo} width="25" />}
      </div>
    </div>
  );
};

export default LinkPreview;
