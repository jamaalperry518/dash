import React from "react";
import ArrayStatistics from "./ArrayStatistics";
import PositionsContainer from "./positionsContainer/PositionsContainer";
import CurrentCoinPrices from "../../components/currencies/CurrentCoinPrices";

const StatsAndBalance = () => {
  return (
    <div className="stats-and-balance">
      <ArrayStatistics />
      <PositionsContainer />
      <CurrentCoinPrices />
    </div>
  );
};

export default StatsAndBalance;
