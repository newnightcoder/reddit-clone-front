import React, { useCallback, useEffect, useState } from "react";
import { Link as LinkIcon } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { articlePlaceholder } from "../assets";
import { clearErrorPost, clearPreviewImg } from "../store/actions/posts.action";
import useLanguage from "../utils/hooks/useLanguage";

const LinkPreview = ({ previewTitle, previewText, previewImg, previewUrl, previewPub, previewPubLogo, aside }) => {
  const { title, image, description, publisher, logo, url } = useSelector((state) => state.posts.scrapedPost);
  const { preview } = useSelector((state) => state.posts.scrapedPost);
  const [imgUrl, setImgUrl] = useState(image ? image : previewImg);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  useEffect(() => {
    setImgUrl(image ? image : previewImg ? previewImg : articlePlaceholder);
  }, [image, previewImg]);

  const isObjectEmpty = useCallback((obj) => {
    for (let prop in obj) {
      return false;
    }
    return true;
  }, []);

  const handleImgError = useCallback(() => {
    // console.log("no image baby");
    dispatch(clearErrorPost());
    if (!isObjectEmpty(preview)) dispatch(clearPreviewImg());
    setImgUrl(articlePlaceholder);
  }, [dispatch, setImgUrl, isObjectEmpty]);

  return (
    <div className="h-max w-11/12 rounded border border-gray-400 dark:border-gray-700 pb-4 mt-1 flex flex-col items-center justify-start space-y-3 border rounded-md ">
      <div
        style={{
          backgroundColor: "white",
          backgroundImage: `url("${imgUrl}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className={`${aside ? "h-32" : "h-44 md:h-64"}  w-full rounded-tl rounded-tr`}
      >
        <img src={imgUrl} onError={handleImgError} alt="article image" className="hidden w-full h-full" />
      </div>
      <div className="w-full flex flex-col space-y-1.5 text-gray-700 dark:text-gray-200 text-sm cursor-pointer">
        <a
          href={url ? url : previewUrl && previewUrl}
          target="_blank"
          rel="noreferrer"
          className={`${aside && "whitespace-nowrap truncate"} w-full font-bold px-4 leading-4 hover:underline`}
        >
          {title ? title : previewTitle}
        </a>
        <a
          href={url ? url : previewUrl && previewUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full px-4 leading-4 hover:underline"
        >
          {description ? `${description.substr(0, 100)}...` : previewText ? `${previewText.substr(0, 100)}...` : null}
        </a>
      </div>
      <div className="w-full px-4 flex items-center justify-between space-x-1 text-gray-500 dark:text-gray-300 text-xs">
        <a
          href={url ? url : previewUrl && previewUrl}
          target="_blank"
          rel="noreferrer"
          className="w-3/4 flex items-center justify-start space-x-1 cursor-pointer hover:underline"
        >
          <LinkIcon size={18} style={{ transform: "translateY(-0.03rem)" }} />{" "}
          <span>
            {publisher && publisher.includes("logo") ? publisher.replace(/logo/gi, "") : publisher}
            {previewPub && previewPub.includes("logo") ? previewPub.replace(/logo/gi, "") : previewPub}
            {!publisher && !previewPub && userLanguage.preview.linkArticle}
          </span>
        </a>
        {logo ? (
          <a href={url ? url : previewUrl && previewUrl} target="_blank" rel="noreferrer" className="w-1/4 cursor-pointer">
            <img src={logo} width="50" alt="publication logo" className="w-full h-full" />
          </a>
        ) : (
          previewPubLogo && (
            <a href={url ? url : previewUrl && previewUrl} target="_blank" rel="noreferrer">
              <img src={previewPubLogo} width="50" alt="publication logo" />
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default LinkPreview;
