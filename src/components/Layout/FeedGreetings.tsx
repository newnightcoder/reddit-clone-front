import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { playGreetingsAnimationAction } from "../../store/actions/user.action";
import { breakpoint } from "../../utils/breakpoints";
import { useLanguage } from "../../utils/hooks";
import useWindowSize from "../../utils/hooks/useWindowSize";

const FeedGreetings = ({ loadingTime, fiveSec }: { loadingTime: number | null; fiveSec: boolean }) => {
  const { isAuthenticated, isNewUser, username, greetingsAnimationPlayed } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const userLanguage = useLanguage();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const timingMin = 3000;
  const [timingMax, setTimingMax] = useState<number | null>(null);

  const removeGreetings = useCallback(() => {
    const addClass = () => {
      if (ref.current) return ref.current.classList.add("disappear");
    };
    const t = timingMax && timingMax > timingMin ? 750 : timingMin!;
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(addClass());
      }, t)
    );
  }, [ref, timingMax, timingMin]);

  useEffect(() => {
    if (loadingTime) setTimingMax(loadingTime && loadingTime > timingMin ? loadingTime : timingMin);
  }, [loadingTime]);

  useEffect(() => {
    const disappear = () => {
      removeGreetings().then(() => {
        setTimeout(() => {
          dispatch(playGreetingsAnimationAction());
        }, timingMax!);
      });
    };
    if (timingMax) disappear();
  }, [removeGreetings, dispatch, timingMax!]);

  return (
    <div
      ref={ref}
      className={`bienvenueMsg-newcomer absolute ${greetingsAnimationPlayed ? "hidden" : "block"} ${
        ref.current ? "translate-y-0" : "-translate-y-16"
      } w-max max-w-[95%] sm:w-max md:max-w-1/2 h-max mt-1 md:mt-2 mb-4 rounded-xl border border-blue-500 bg-blue-50 dark:bg-blue-500/20 transition duration-300 delay-300`}
    >
      <div className={`w-full h-full flex flex-col items-enter justify-center rounded-xl`}>
        <div
          className={`w-full h-full flex items-center justify-center space-x-3 md:space-x-2 pb-2 pt-2 px-8 rounded-xl text-blue-500 dark:text-white font-bold text-sm whitespace-pre transition duration-100`}
        >
          <div className="w-max h-max flex items-center justify-center">
            <CheckCircleFill size={18} className="text-blue-500" />
          </div>
          {!isAuthenticated ? (
            <span className="flex items-center justify-center text-center whitespace-pre">
              {width < breakpoint.sm ? userLanguage?.feed.greetingVisitor_mob : userLanguage?.feed.greetingVisitor}&nbsp;
            </span>
          ) : isNewUser ? (
            <div className="w-max flex flex-col items-center justify-center">
              <span className="w-max flex items-center justify-center">
                <span className="w-max">{userLanguage?.feed.greetingNewUserLine1}&nbsp;</span>
                <span className="w-max max-w-[20ch] sm:w-full sm:max-w-[12rem] truncate capitalize">
                  {username ? username : "Noname"}!
                </span>
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
              <span className="w-max max-w-[30ch] sm:w-full sm:max-w-[14rem] truncate capitalize">
                {username ? username : "Noname"}!
              </span>
            </span>
          )}
        </div>
        <div
          className={`${
            fiveSec ? "flex" : "hidden"
          } -translate-x-px translate-y-px h-max w-[calc(100%+2px)] text-center px-3 pt-1 pb-2 text-sm items-center justify-center space-x-1 bg-blue-500 text-white rounded-bl-xl rounded-br-xl font-bold italic whitespace-nowrap`}
        >
          <span>
            {posts.length === 0 ? userLanguage.feed.loadingWait : fiveSec && posts.length > 0 && userLanguage.feed.loadingReady}
          </span>
          <div className={`${posts.length > 0 ? "hidden" : "block"} h-2 w-max flex items-center justify-center`}>
            <PulseLoader size={5} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedGreetings;
