import React from "react";
import { connect } from "react-redux";
import { convertStandardNumber } from "../../Redux/actions/currencyActions";

const ArrayStatistics = (props) => {
  return (
    <div className="array-statistics-card card">
      <h4 className="title">
        <span>array</span> statistics
      </h4>
      <div className="array-statistics">
        <div className="array-price">
          <h1 className="price statistic">
            {convertStandardNumber(props.array.arrayPrice)}
          </h1>
          <p className="subtext">array price</p>
        </div>
        <div className="array-value-locked">
          <h1 className="tvl statistic">
            {convertStandardNumber(props.array.totalValueLocked)}
          </h1>
          <p className="subtext">total value locked</p>
        </div>
        <div className="buy-array">
          <button className="buy-array-button">buy array</button>
        </div>
        <div className="array-bonding-price">
          <h1 className="bonding-price statistic">
            {convertStandardNumber(props.array.bondingPrice)}
          </h1>
          <p className="subtext bonding-price-text">bonding price</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    array: state.currency.array,
  };
};

export default connect(mapStateToProps)(ArrayStatistics);
