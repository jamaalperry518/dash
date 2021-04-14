import React from "react";
import StatBanner from "./StatsBanner";
import InteractionsContainer from "../userInteractions/InteractionsContainer";
const Main = () => {
  return (
    <div className="main">
      <StatBanner />
      <InteractionsContainer />
    </div>
  );
};

export default Main;
