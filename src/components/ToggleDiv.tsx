import { ToggleDivProps } from "./react-app-env";
import TabsContainer from "./TabsContainer";
import ToggleDivContent from "./ToggleDivContent";

const ToggleDiv = ({ bool, setter, dataset1, dataset2, followersCountSetter, followersCount, container }: ToggleDivProps) => {
  return (
    <div className="w-full h-full md:w-11/12 flex flex-col items-center justify-start">
      <TabsContainer bool={bool} setter={setter} set1={dataset1} set2={dataset2} container={container} />
      <ToggleDivContent
        bool={bool}
        set1={dataset1}
        set2={dataset2}
        followersCount={followersCount}
        followersCountSetter={followersCountSetter}
      />
    </div>
  );
};

export default ToggleDiv;
