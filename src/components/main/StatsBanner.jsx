import React, { useState } from "react";
import { convertStandardNumber } from "../../Redux/actions/currencyActions";

const StatsBanner = () => {
  const [bannerStats] = useState({
    arrayPrice: {
      text: "Array token price",
      value: 76.13,
    },
    collateralPrice: {
      text: "Collateral price",
      value: 1.0023,
    },
    tvlCollateral: {
      text: "Tvl as collateral",
      value: 44456.04,
    },
    totalTvl: {
      text: "Tvl total",
      value: 102479.33,
    },
  });

  const bannerArray = Object.values(bannerStats);
  return (
    <div className="financial-stats-banner">
      {bannerArray.map((item, i) => {
        return (
          <div key={i} className="banner-stat-container">
            <p className="banner-title">{item.text}</p>
            <h1 className="banner-stat">
              {convertStandardNumber(item.value)}{" "}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBanner;
