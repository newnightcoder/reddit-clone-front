import React from "react";
import { Link as LinkIcon } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { articlePlaceholder } from "../assets";

const LinkPreview = ({ previewTitle, previewText, previewImg, previewUrl, previewPub, previewPubLogo, aside }) => {
  const { title, image, description, publisher, logo } = useSelector((state) => state.posts.scrapedPost);

  return (
    <div className="h-max w-11/12 rounded border border-gray-400 dark:border-gray-700 pb-4 mt-1 flex flex-col items-center justify-start space-y-3 border rounded-md ">
      <div
        style={{
          // background: `white url("${image ? image : previewImg}") no-repeat center/cover`,
          backgroundColor: "white",
          backgroundImage: `url("${image ? image : previewImg}"), url("${articlePlaceholder}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className={`${aside ? "h-32" : "h-44 md:h-64"}  w-full rounded-tl rounded-tr`}
      ></div>
      <div className="w-full flex flex-col space-y-1.5 text-gray-700 dark:text-gray-200 text-sm cursor-pointer">
        <a
          href={previewUrl}
          target="_blank"
          rel="noreferrer"
          className={`${aside && "whitespace-nowrap truncate"} w-full font-bold px-4 leading-4 hover:underline`}
        >
          {title ? title : previewTitle}
        </a>
        <a href={previewUrl} target="_blank" rel="noreferrer" className="w-full px-4 leading-4 hover:underline">
          {description ? `${description.substr(0, 100)}...` : `${previewText.substr(0, 100)}...`}
        </a>
      </div>
      <div className="w-full px-4 flex items-center justify-between space-x-1 text-gray-500 dark:text-gray-300 text-xs">
        <a
          href={previewUrl}
          target="_blank"
          rel="noreferrer"
          className="w-3/4 flex items-center justify-start space-x-1 cursor-pointer hover:underline"
        >
          <LinkIcon size={18} style={{ transform: "translateY(-0.03rem)" }} />{" "}
          <span>
            {publisher && publisher.includes("logo") ? publisher.replace(/logo/gi, "") : publisher}
            {previewPub && previewPub.includes("logo") ? previewPub.replace(/logo/gi, "") : previewPub}
            {!publisher && !previewPub && "Go to article"}
          </span>
        </a>
        {logo ? (
          <a href={previewUrl} target="_blank" rel="noreferrer" className="w-1/4 cursor-pointer">
            <img src={logo} width="50" alt="publication logo" className="w-full h-full" />
          </a>
        ) : (
          previewPubLogo && (
            <a href={previewUrl} target="_blank" rel="noreferrer">
              <img src={previewPubLogo} width="50" alt="publication logo" />
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default LinkPreview;
