import React from "react";

const StatsBanner = () => {
  return (
    <div className="financial-stats-banner">
      {/* //// */}
      <div className="banner-stat-container">
        <p className="banner-title">Array token price</p>
        <h1 className="banner-stat">$ 76.13</h1>
      </div>

      <div className="banner-stat-container">
        <p className="banner-title">Collateral price</p>
        <h1 className="banner-stat">$ 1.0023</h1>
      </div>

      <div className="banner-stat-container">
        <p className="banner-title">tvl as collateral</p>
        <h1 className="banner-stat">$ 44,456.04</h1>
      </div>

      <div className="banner-stat-container">
        <p className="banner-title">tvl total</p>
        <h1 className="banner-stat">$ 102,479.33</h1>
      </div>
      {/* //// */}
    </div>
  );
};

export default StatsBanner;
