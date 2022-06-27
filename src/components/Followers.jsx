import { useEffect } from "react";
import { ChevronDoubleLeft } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const Followers = ({ bool, toggleFollowers, followersOpen, username, userId }) => {
  const { id: myId, followers, following } = useSelector((state) => state?.user);

  useEffect(() => {
    console.log("userId", userId, "myId", myId);
  }, []);

  return (
    <div
      className={`${
        followersOpen ? "translate-x-0" : "translate-x-full"
      } transition duration-300 absolute top-0 inset-x-0 min-h-[calc(100vh-7rem)] h-max flex flex-col items-center justify-start rounded border-2 border-green-500 z-20 overflow-y-auto bg-white`}
    >
      <div className="h-16 w-full flex items-center justify-start font-bold pl-4">
        <button className="w-max h-max flex items-center justify-start space-x-2 outline-none" onClick={toggleFollowers}>
          <ChevronDoubleLeft className="h-5" />
          <span className="uppercase underline font-sm">
            {userId === myId ? "back to profile" : `back to ${username}'s profile`}
          </span>
        </button>
      </div>
      {bool ? (
        <div>
          <h1>{userId === myId ? "My followers" : `${username}'s followers`}</h1>
          <div>
            {followers?.map((follower, i) => {
              return (
                <div key={i + 1} className="follower-container flex items-center justify-start space-x-2 w-full px-8 ">
                  <div
                    className="rounded-full h-4 w-4 bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url("${follower.picUrl}")` }}
                  ></div>
                  <span>{follower.username}</span>
                  <button>follow</button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1>Following:</h1>
          <div>
            {following?.map((following, i) => {
              return (
                <div key={i + 1} className="follower-container flex items-center justify-start space-x-2 w-full px-8 ">
                  <div
                    className="rounded-full h-4 w-4 bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url("${following.picUrl}")` }}
                  ></div>
                  <span>{following.username}</span>
                  <button>follow</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Followers;
