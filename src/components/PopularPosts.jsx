import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const PopularPosts = () => {
  const posts = useSelector((state) => state?.posts.posts);
  const [top3, setTop3] = useState([]);
  const mostLiked = posts.sort((a, b) => {
    if (a.likesCount > b.likesCount) return -1;
    if (a.likesCount < b.likesCount) return 1;
    return 0;
  });

  console.log(mostLiked);
  useEffect(() => {
    setTop3(mostLiked.splice(0, 3));
  }, [posts]);

  return (
    <div className="w-full flex flex-col">
      <div className="header h-24 w-full bg-blue-300 rounded-tl rounded-tr relative">
        <span className="w-full text-center absolute bottom-0 mb-2 text-gray-900 text-lg font-bold">Publications populaires</span>
      </div>
      <div className="w-full flex flex-col space-y-2 bg-gray-300 p-4 border border-gray-300">
        {top3.map((post, i) => (
          <Post post={post} key={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
