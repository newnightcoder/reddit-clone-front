import { useEffect, useRef } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { playGreetingsAnimationAction } from "../store/actions/user.action";
import { useLanguage } from "../utils/hooks";

const FeedGreetings = () => {
  const { isAuthenticated, isNewUser, username } = useSelector((state) => state.user);
  const userLanguage = useLanguage();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.classList.add("disappear");
      }
      dispatch(playGreetingsAnimationAction());
    }, 2500);
  }, [dispatch]);

  return (
    <div
      ref={ref}
      className={`bienvenueMsg-newcomer absolute ${
        ref.current ? "translate-y-0" : "-translate-y-16"
      } rounded-xl pl-4 md:pl-10 border border-blue-400 bg-blue-50 dark:bg-blue-500/20 text-blue-500 dark:text-white font-bold w-10/12 md:w-max md:max-w-1/2 h-[3rem] flex items-center justify-center space-x-2 text-sm whitespace-pre mt-2 mb-4 uppercase transition duration-300`}
    >
      <CheckCircleFill size={18} className="text-blue-500" />
      {!isAuthenticated ? (
        <span className="pr-4 md:pr-10">{userLanguage?.feed.greetingVisitorMode}&nbsp;</span>
      ) : isNewUser ? (
        <div className="w-full flex flex-col items-center justify-center">
          <span className="w-full flex items-center justify-center pr-4 md:pr-10">
            <span className="">{userLanguage?.feed.greetingVisitorLine1}&nbsp;</span>
            <span className="text-left overflow-hidden overflow-ellipsis">{username ? username : "Noname"}!</span>
          </span>
          <span className="inline-block">{userLanguage?.feed.greetingVisitorLine2}</span>
        </div>
      ) : (
        <span className="overflow-x-hidden overflow-ellipsis pr-4 md:pr-10">
          {userLanguage?.feed.greetingUser}&nbsp;
          <span className="w-full text-left">{username ? username : "Noname"}!</span>
        </span>
      )}
    </div>
  );
};

export default FeedGreetings;
