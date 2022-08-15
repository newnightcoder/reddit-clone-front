import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IPost } from "../../../store/types";
import { useLanguage } from "../../../utils/hooks";
import Post from "../../Post/Post";
import Skeleton from "../Skeleton";

const PopularPosts = () => {
  const { posts } = useSelector((state) => state?.posts);
  const [top3, setTop3] = useState<IPost[]>([]);
  const userLanguage = useLanguage();

  useEffect(() => {
    const postsCopy = [...posts];
    setTop3(
      postsCopy
        .sort((a, b) => {
          if (a.engagement?.likesCount! < b.engagement?.likesCount!) return 1;
          if (a.engagement?.likesCount! > b.engagement?.likesCount!) return -1;
          return 0;
        })
        .splice(0, 3)
    );
  }, [posts]);

  return (
    <div className="w-full flex flex-col transition-color duration-500 bg-gray-300 dark:bg-gray-700 rounded">
      <div className="header h-24 w-full bg-yellow-400 rounded-tl rounded-tr relative border-t border-r border-l border-transparent">
        <span className="w-full text-center absolute bottom-0 mb-2 text-gray-900 text-lg font-bold">
          {userLanguage.aside.popular}
        </span>
      </div>
      <div className="w-full flex flex-col space-y-2 px-2 py-4 border-l border-b border-r  transition-color duration-500 border-gray-300 dark:border-gray-600 rounded-bl rounded-br">
        {top3.length === 0 ? (
          <Skeleton element="post" number={3} aside={true} />
        ) : (
          top3.map((post, i) => <Post post={post} key={i + 1} aside={true} />)
        )}
      </div>
    </div>
  );
};

export default PopularPosts;
