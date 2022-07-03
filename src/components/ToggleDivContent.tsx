import React from "react";

// const ToggleDivContent = ({ bool, set1, set2 }: { bool: boolean; set1: IDataSet; set2: IDataSet }) => {
//   const Element = ({ set, key, children }: { set: number; key: number; children:JSX.Element }) => {
//     if (set === 1) {
//       if (set1.name === datasetTypes.post) {
//         return <Post key={key} post={element} />;
//       }
//       if (set1.name === datasetTypes.user) {
//         return <UserCard key={key} user={element} />;
//       }
//     }
//     if (set === 2) {
//       if (set2.name === datasetTypes.post) {
//         return <Post key={key} post={element} />;
//       }
//       if (set2.name === datasetTypes.user) {
//         return <UserCard key={key} user={element} />;
//       }
//     }
//   };

//   return (
//     <div className="w-full h-full flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700 transition duration-500">
//       {bool ? (
//         <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
//           {set1.data.map((element) => (
//             <Element set={1} key={element.id + 1} element={element} />
//           ))}
//         </div>
//       ) : (
//         <div className="w-full h-max flex flex-col items-center justify-center space-y-3">
//           {set2.data.map((element) => (
//             <Element set={2} key={element.id + 1} element={element} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

const ToggleDivContent = () => {
  return <div>toggme</div>;
};

export default ToggleDivContent;
