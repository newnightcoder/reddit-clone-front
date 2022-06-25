import { useEffect } from "react";
import { useSelector } from "react-redux";

const Followers = ({ bool, toggleFollowers, followersOpen, username, userId }) => {
  const { id: myId } = useSelector((state) => state?.user);

  useEffect(() => {
    console.log("userId", userId, "myId", myId);
  }, []);

  return (
    <div
      className={`${
        followersOpen ? "translate-x-0" : "translate-x-full"
      } transition duration-300 absolute top-0 inset-x-0 min-h-[calc(100vh-7rem)] h-max flex flex-col items-center justify-center rounded border-2 border-green-500 z-20 overflow-y-auto bg-white`}
    >
      <button onClick={toggleFollowers}>back</button>
      {bool ? (
        <div>
          <h1>{userId === myId ? "My followers" : `${username}'s followers`}</h1>
        </div>
      ) : (
        <div>
          <h1>Following</h1>
        </div>
      )}
    </div>
  );
};

export default Followers;
