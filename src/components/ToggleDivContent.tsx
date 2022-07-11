import { IPost, IUser } from "../store/types";
import { datasetTypes } from "./dataForToggleDiv";
import Post from "./Post";
import { IDataSet } from "./react-app-env";
import UserCard from "./UserCard";

// const Element = ({ set, setName, key, element }: { set: number;setName:string; key: number; element:JSX.Element }) => {
//   if (set === 1) {
//     if (setName === datasetTypes.post) {
//       return <Post key={key} post={element} />;
//     }
//     if (setName === datasetTypes.user) {
//       return <UserCard key={key} user={element} />;
//     }
//   }
//   if (set === 2) {
//     if (setName === datasetTypes.post) {
//       return <Post key={key} post={element} />;
//     }
//     if (setName === datasetTypes.user) {
//       return <UserCard key={key} user={element} />;
//     }
//   }
// }

const ToggleDivContent = ({ bool, set1, set2 }: { bool: boolean; set1: IDataSet; set2: IDataSet }) => {
  return (
    <div className="w-full h-full flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700 transition duration-500">
      {bool ? (
        <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
          {set1.name === datasetTypes.post
            ? set1.data.map((element, i) => <Post key={i + 1} post={element as IPost} />)
            : set1.data.map((element, i) => <UserCard key={i + 1} user={element as IUser} />)}
        </div>
      ) : (
        <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
          {set2.name === datasetTypes.post
            ? set2.data.map((element, i) => <Post key={i + 1} post={element as IPost} />)
            : set2.data.map((element, i) => <UserCard key={i + 1} user={element as IUser} />)}
        </div>
      )}
    </div>
  );
};

export default ToggleDivContent;
