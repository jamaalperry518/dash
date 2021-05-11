import React from "react";
import { connect } from "react-redux";
import { convertStandardNumber } from "../../Redux/actions/currencyActions";

const StatsBanner = (props) => {
  const bannerArray = Object.values(props.financials);

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
      <div className="banner-stat-container">
        <p className="banner-title">TVL total</p>
        <h1 className="banner-stat">
          {props.gasPrice === 0 ? "---" : convertStandardNumber(props.tvl)}
        </h1>
      </div>
      <div className="banner-stat-container">
        <p className="banner-title">Gas Price</p>
        <h1 className="banner-stat">
          {props.gasPrice === 0 ? "---" : props.gasPrice.toFixed()} gw
        </h1>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    gasPrice: state.wallet.gasPrice,
    financials: state.array.financialStats,
    tvl: state.array.tvl,
  };
};

export default connect(mapStateToProps)(StatsBanner);
