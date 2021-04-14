import React from "react";
import { connect } from "react-redux";
//components
import ConnectWallet from "./ConnectWallet";
import UserPositions from "./UserPositions";

const PositionsContainer = (props) => {
  return (
    <div className="positions-container">
      {props.address ? <UserPositions /> : <ConnectWallet />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
  };
};

export default connect(mapStateToProps)(PositionsContainer);
