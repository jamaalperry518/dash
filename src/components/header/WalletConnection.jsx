import React from "react";
import { useDispatch, connect } from "react-redux";
import { connectUserWallet } from "../../Redux/actions/WalletActions";

//image
import networkImage from "../../assets/mainnet-icon.png";
const WalletConnection = (props) => {
  const dispatch = useDispatch();
  let start = props.address.substring(0, 6);
  let end = props.address.substring(
    props.address.length - 4,
    props.address.length
  );
  return (
    <div className="wallet-connect-container">
      {props.address ? (
        <div className="address-container">
          <img src={networkImage} alt="" className="network-img" />
          <p className="address">
            {start}....{end}
          </p>
        </div>
      ) : (
        <button
          className="connect-button"
          onClick={() => dispatch(connectUserWallet())}
        >
          connect
        </button>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
  };
};

export default connect(mapStateToProps)(WalletConnection);
