import { IFollower, IPost, IUser } from "../store/types";
import { datasetTypes } from "./dataForToggleDiv";
import FollowerCard from "./FollowerCard";
import Post from "./Post";
import { ToggleDivContentProps } from "./react-app-env";
import UserCard from "./UserCard";

const ToggleDivContent = ({ bool, set1, set2, followersCountSetter, followersCount }: ToggleDivContentProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700 transition duration-500">
      {bool ? (
        <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
          {set1.name === datasetTypes.post
            ? set1.data.map((element, i) => <Post key={i + 1} post={element as IPost} />)
            : set1.name === datasetTypes.user
            ? set1.data.map((element, i) => <UserCard key={i + 1} user={element as IUser} />)
            : set1.name === datasetTypes.follower &&
              set1.data.map((element, i) => (
                <FollowerCard
                  key={i + 1}
                  user={element as IFollower}
                  followersCountSetter={followersCountSetter!}
                  followersCount={followersCount!}
                />
              ))}
        </div>
      ) : (
        <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
          {set2.name === datasetTypes.post
            ? set2.data.map((element, i) => <Post key={i + 1} post={element as IPost} />)
            : set2.name === datasetTypes.user
            ? set2.data.map((element, i) => <UserCard key={i + 1} user={element as IUser} />)
            : set2.name === datasetTypes.follower &&
              set2.data.map((element, i) => (
                <FollowerCard
                  key={i + 1}
                  user={element as IFollower}
                  followersCountSetter={followersCountSetter!}
                  followersCount={followersCount!}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default ToggleDivContent;
