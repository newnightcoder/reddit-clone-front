import { ToggleDivProps } from "./react-app-env";
import TabsContainer from "./TabsContainer";
import ToggleDivContent from "./ToggleDivContent";

const ToggleDiv = ({ bool, setter, dataset1, dataset2 }: ToggleDivProps) => {
  // const userLanguage = useLanguage();

  const container = ["profile", "followers", "search"];
  return (
    <div className="w-full h-full md:w-11/12 flex flex-col items-center justify-center border-2 border-purple-500">
      <TabsContainer
        bool={bool}
        setter={setter}
        length1={dataset1.data.length}
        length2={dataset2.data.length}
        container={container[0]}
      />
      <ToggleDivContent bool={bool} set1={dataset1} set2={dataset2} />
    </div>
  );
};

export default ToggleDiv;
