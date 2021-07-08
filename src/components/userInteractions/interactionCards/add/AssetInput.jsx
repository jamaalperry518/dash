import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import scss from "./assetInput.module.scss";
import { motion } from "framer-motion";
import {
  selectAsset,
  setAssetAmount,
} from "../../../../Redux/actions/WalletActions";

const AssetInput = (props) => {
  const dispatch = useDispatch();
  const [depositAmount, setDeposit] = useState("");

  const changeHandler = (e) => {
    setDeposit(e.target.valueAsNumber || e.target.value);
  };
  const checkHandler = (e, asset) => {
    props.setActive(e.target.id);
    dispatch(selectAsset(asset));
  };
  const blurHandler = (e) => {
    if (e.target.value > "0") {
      dispatch(setAssetAmount(e.target.value));
    } else {
      setDeposit("0");
      dispatch(setAssetAmount("0"));
    }
  };

  const setMax = () => {
    console.log(typeof props.selectedAsset.user_balance);
    dispatch(setAssetAmount(props.selectedAsset.user_balance));
    setDeposit(props.selectedAsset.user_balance);
  };
  const clear = () => {
    setDeposit("");
  };

  const buttonVariants = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="asset-input">
      <div className={scss["checkbox-container"]}>
        <input
          type="radio"
          className={scss["checkbox"]}
          name="asset"
          checked={props.active === props.asset.symbol}
          onChange={(e) => checkHandler(e, props.asset)}
          id={props.asset.symbol}
        />
        {/* <div className={scss["little-circle"]}></div>
        </input> */}
        <h1 className="asset-name">{props.asset.symbol}</h1>
      </div>

      {props.active === props.asset.symbol ? (
        <div className={scss["set-max"]}>
          {depositAmount ? (
            <motion.button
              className={scss["max-button"]}
              initial={buttonVariants.initial}
              animate={buttonVariants.visible}
              onClick={clear}
            >
              clear
            </motion.button>
          ) : (
            <motion.button
              className={scss["max-button"]}
              initial={buttonVariants.initial}
              animate={buttonVariants.visible}
              onClick={setMax}
            >
              max
            </motion.button>
          )}
        </div>
      ) : null}

      <input
        type="text"
        min={0}
        className={
          props.active === props.asset.symbol
            ? "amount-input"
            : "amount-input inactive"
        }
        name="amount"
        value={depositAmount}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    vaults: state.vaults.state,
    signer: state.wallet.signer,
    address: state.wallet.address,
    selectedAsset: state.wallet.selectedAsset,
  };
};
export default connect(mapStateToProps)(AssetInput);
