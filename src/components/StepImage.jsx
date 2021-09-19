import React from "react";
import { useHistory } from "react-router-dom";

const StepImage = () => {
  const history = useHistory();

  return (
    <div
      style={{ transform: "translateX(100%)" }}
      className="h-screen w-screen bg-red-400  flex flex-col items-center justify-center absolute top-0 left-0"
    >
      <h2>UPLOAD IMAGE PROFILE</h2>
      <div className="h-1/3 w-1/2 border"></div>

      <button
        onClick={() => {
          history.push({
            pathname: "/feed",
            state: { new: true },
          });
        }}
      >
        plus tard, pas maintenant{" "}
      </button>
    </div>
  );
};

export default StepImage;
