import { useCallback, useEffect, useRef } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { playGreetingsAnimationAction } from "../store/actions/user.action";
import { breakpoint } from "../utils/breakpoints";
import { useLanguage } from "../utils/hooks";
import useWindowSize from "../utils/hooks/useWindowSize";

const FeedGreetings = () => {
  const { isAuthenticated, isNewUser, username } = useSelector((state) => state.user);
  const userLanguage = useLanguage();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const animateGreeting = useCallback(() => {
    const addClass = () => {
      if (ref.current) return ref.current.classList.add("disappear");
    };
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(addClass());
      }, 2500)
    );
  }, [dispatch, ref.current]);

  useEffect(() => {
    const animate = () => {
      animateGreeting().then(() => {
        setTimeout(() => {
          dispatch(playGreetingsAnimationAction());
        }, 2500);
      });
    };
    // animate();
  }, []);

  return (
    <div
      ref={ref}
      className={`bienvenueMsg-newcomer absolute ${
        ref.current ? "translate-y-0" : "-translate-y-16"
      } w-max max-w-[95%] sm:w-max md:max-w-1/2 h-[3rem]  px-8 flex items-center justify-center space-x-3 md:space-x-2 mt-2 mb-4 rounded-xl text-blue-500 dark:text-white font-bold text-sm whitespace-pre border border-blue-400 bg-blue-50 dark:bg-blue-500/20 transition duration-300`}
    >
      <CheckCircleFill size={18} className="text-blue-500" />
      {!isAuthenticated ? (
        <span className="flex items-center justify-center text-center whitespace-pre">
          {width < breakpoint.sm ? userLanguage?.feed.greetingVisitor_mob : userLanguage?.feed.greetingVisitor}&nbsp;
        </span>
      ) : isNewUser ? (
        <div className="w-max flex flex-col items-center justify-center">
          <span className="w-full flex items-center justify-center">
            <span className="">{userLanguage?.feed.greetingNewUserLine1}&nbsp;</span>
            <span className="w-max max-w-[20ch] sm:w-full sm:max-w-[12rem] truncate">{username ? username : "Noname"}</span>
          </span>
          <span className="inline-block">
            {width < breakpoint.sm ? userLanguage?.feed.greetingNewUserLine2_mob : userLanguage?.feed.greetingNewUserLine2}
          </span>
        </div>
      ) : (
        <span
          className={`flex ${
            username.length >= 10 && width < breakpoint.sm ? "flex-col" : "flex-row"
          } items-center justify-center`}
        >
          <span>{userLanguage?.feed.greetingUser}&nbsp;</span>
          <span className="w-max max-w-[30ch] sm:w-full sm:max-w-[14rem] truncate">{username ? username : "Noname"}</span>
        </span>
      )}
    </div>
  );
};

export default FeedGreetings;
