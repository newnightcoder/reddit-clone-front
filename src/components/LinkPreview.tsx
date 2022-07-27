import { useCallback, useEffect, useState } from "react";
import { Link as LinkIcon } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
import { logo_mobile_blue } from "../assets";
import { clearErrorPostAction, clearPreviewImgAction } from "../store/actions/posts.action";
import isObjectEmpty from "../utils/helpers/isObjectEmpty";
import useLanguage from "../utils/hooks/useLanguage";
import { LinkPreviewProps } from "./react-app-env";

const LinkPreview = ({ linkPreview, aside }: LinkPreviewProps) => {
  const {
    title: previewTitle,
    text: previewText,
    image: previewImg,
    url: previewUrl,
    publisher: previewPub,
    logo: previewPubLogo,
  } = linkPreview;
  const { title, image, text, publisher, logo, url } = useSelector((state) => state.posts.scrapedPost);
  const { scrapedPost: preview } = useSelector((state) => state.posts);
  const validImg = image?.includes("http");
  const initialImg: string = previewImg ? previewImg : image && validImg ? image : logo_mobile_blue;
  const [imgUrl, setImgUrl] = useState(initialImg);
  const [logoError, setLogoError] = useState(false);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  useEffect(() => {
    setImgUrl(initialImg);
  }, [image, previewImg]);

  const handleImgError = useCallback(() => {
    dispatch(clearErrorPostAction());
    if (!isObjectEmpty(preview)) {
      dispatch(clearPreviewImgAction());
    }
    setImgUrl(logo_mobile_blue);
  }, [dispatch, setImgUrl, preview]);

  const handleLogoError = useCallback(() => {
    setLogoError(true);
  }, [setLogoError, logo, previewPubLogo]);

  return (
    <div className="h-max w-full rounded border border-gray-300 dark:border-gray-600 pb-4 mt-1 flex flex-col items-center justify-start space-y-3 border rounded-md ">
      <div
        style={{ backgroundImage: `url("${imgUrl}")` }}
        className={`${
          aside ? "h-32" : "h-44 md:h-64"
        }  w-full rounded-tl rounded-tr bg-transparent bg-no-repeat bg-center bg-cover`}
      >
        <img src={imgUrl} onError={handleImgError} alt="article cover" className="hidden w-full h-full" />
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
          {text ? `${text.substr(0, 100)}...` : previewText ? `${previewText.substr(0, 100)}...` : null}
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
        {logo && !logoError ? (
          <a href={url ? url : previewUrl && previewUrl} target="_blank" rel="noreferrer" className="h-6 w-6 cursor-pointer">
            <img onError={handleLogoError} src={logo} alt="publication logo" className="w-full h-full" />
          </a>
        ) : (
          previewPubLogo &&
          !logoError && (
            <a href={url ? url : previewUrl && previewUrl} target="_blank" rel="noreferrer" className="h-6 w-6 cursor-pointer">
              <img onError={handleLogoError} src={previewPubLogo} width="50" alt="publication logo" />
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default LinkPreview;
