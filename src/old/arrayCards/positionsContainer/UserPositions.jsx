import React from "react";
import { connect } from "react-redux";

const UserPositions = (props) => {
  return (
    <div className="user-position-card card">
      <div className="position-left">
        <div className="title tooltip">
          {" "}
          <h4>your position</h4>
          <span className="tooltip-text">
            {" "}
            <a
              href={`https://etherscan.io/address/${props.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.address}
            </a>{" "}
          </span>
        </div>
        <div className="user-positions">
          <div className="user-position crv:usdn">
            <p className="token-amount">512.92</p>
            <p className="token-name">crv:USDN</p>
          </div>
          <div className="user-position crv:usdn">
            <p className="token-amount">512.92</p>
            <p className="token-name">1inch:ETH/WBTC</p>
          </div>
          <div className="user-position crv:usdn">
            <p className="token-amount">914</p>
            <p className="token-name">array</p>
          </div>
        </div>
      </div>
      <div className="position-right">
        <div className="average-apy">
          <h1 className="stat apy">42%</h1>
          <p className="subtext">average apy</p>
        </div>

        <div className="postfolio-value">
          <h1 className="stat total-value">$14,992</h1>
          <p className="subtext">portfolio value</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
  };
};

export default connect(mapStateToProps)(UserPositions);
