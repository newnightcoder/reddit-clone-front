import { ArrowCircleUpIcon, RefreshIcon } from "@heroicons/react/solid";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, FeedGreetings, Layout, Post, Skeleton } from "../components";
import { getPostsAction } from "../store/actions/posts.action";
import { useContainerSize, useLanguage } from "../utils/hooks";

const Feed = () => {
  const { greetingsAnimationPlayed } = useSelector((state) => state.user);
  const posts = useSelector((state) => state?.posts?.posts);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const postsContainer = useRef<HTMLDivElement>(null);
  const size = useContainerSize(postsContainer);

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  return (
    <Layout>
      <div className="feed-container h-full w-full md:px-4 lg:px-0 transition duration-300 flex flex-col items-center justify-start space-y-2 transition-color text-black dark:text-gray-100 duration-500 relative">
        <Error />
        {!greetingsAnimationPlayed && <FeedGreetings />}
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
          <div
            className={`posts-aside-container w-full flex items-start justify-center pt-2 md:space-x-8 ${
              greetingsAnimationPlayed ? "translate-y-14" : "translate-y-12"
            }`}
          >
            <div className="posts-section-container w-full flex flex-col items-center justify-center pb-20 md:pb-10 relative">
              <div
                style={{ width: `${size}` }}
                className="h-6 flex items-center justify-end mb-2 pr-4 md:pr-1 -translate-y-0.5 md:-translate-y-1"
              >
                <button
                  className="h-6 refreshBtn outline-none hover:cursor-pointer	bg-blue-500 text-white rounded-full flex items-center justify-center space-x-1 pl-2 pr-3 py-1 shadow transition duration-300 hover:bg-black hover:shadow-none group"
                  onClick={() => dispatch(getPostsAction())}
                  style={{ opacity: posts && posts.length !== 0 && size ? 1 : 0 }}
                >
                  <RefreshIcon className="h-4 w-4 pointer-events-auto transition duration-500 group-hover:-rotate-180" />
                  <span className="text-xs pointer-events-auto capitalize">{userLanguage?.feed.refreshBtn}</span>
                </button>
              </div>
              <div
                ref={postsContainer}
                className="posts-wrapper h-full w-full relative flex flex-col items-center justify-center space-y-2 md:space-y-4 pb-6"
              >
                {posts.length === 0 ? (
                  <Skeleton element="post" number={8} />
                ) : (
                  posts.map((post) => <Post key={post.id} post={post} />)
                )}
              </div>
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="h-max md:mt-4 mr-4 md:mr-1 self-end outline-none hover:cursor-pointer	bg-blue-500 text-white text-sm rounded-full flex items-center justify-center space-x-1 pl-2 pr-3 py-1 shadow transition duration-300 hover:bg-black hover:shadow-none group"
              >
                <ArrowCircleUpIcon className="h-5" />
                <span>{userLanguage.feed.backTopBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
