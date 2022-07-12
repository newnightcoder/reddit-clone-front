import { ToggleDivProps } from "./react-app-env";
import TabsContainer from "./TabsContainer";
import ToggleDivContent from "./ToggleDivContent";

const ToggleDiv = ({ bool, setter, dataset1, dataset2, followersCountSetter, followersCount, container }: ToggleDivProps) => {
  // const userLanguage = useLanguage();
  return (
    <div className="w-full h-full md:w-11/12 flex flex-col items-center justify-center">
      <TabsContainer
        bool={bool}
        setter={setter}
        length1={dataset1.data.length}
        length2={dataset2.data.length}
        container={container}
      />
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
