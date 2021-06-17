import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { approveAsset } from "../../../../Redux/actions/WalletActions";
import { motion, AnimatePresence } from "framer-motion";

import scss from "./mint.module.scss";
const Mint = (props) => {
  const dispatch = useDispatch();
  const [isApproving, setApproving] = useState(false);
  const handleApprove = () => {
    setApproving(true);
    dispatch(
      approveAsset(
        props.asset,
        props.signer,
        props.address,
        props.poolAddress,
        props.assetAmount,
        props.assets
      )
    );
    setApproving(false);
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

  useEffect(() => {
    console.log(props.asset);
  }, [props.asset]);

  return (
    <AnimatePresence>
      <div className={props.address ? "mint-array" : "mint-array inactive"}>
        <div className="mint-content">
          <div className="mint-stats">
            <h1>Amount of array</h1>
            <h1 className="number-amount">0.0</h1>
            <h1 className="asset-name">Array</h1>
          </div>

          {props.asset ? (
            parseFloat(props.asset.allowance) > 0 ? (
              <motion.button
                className={scss["mint-button"]}
                onClick={handleApprove}
                initial={buttonVariants.initial}
                animate={buttonVariants.visible}
              >
                Mint
              </motion.button>
            ) : (
              <motion.button
                className={
                  isApproving ? scss["approving"] : scss["approve-asset"]
                }
                onClick={handleApprove}
                initial={buttonVariants.initial}
                animate={buttonVariants.visible}
              >
                Approve {props.asset.symbol}
              </motion.button>
            )
          ) : (
            <motion.button
              className={scss["secret-button"]}
              initial={buttonVariants.initial}
            >
              Mint
            </motion.button>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    poolAddress: state.wallet.poolAddress,
    signer: state.wallet.signer,
    asset: state.wallet.selectedAsset,
    assetAmount: state.wallet.assetAmount,
    assets: state.pools.currentPool.tokens,
  };
};

export default connect(mapStateToProps)(Mint);
