import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getGasPrice } from "../../Redux/actions/WalletActions";
import { getPoolInfo, getTokenBalance } from "../../Redux/actions/poolActions";
import { checkForApproval } from "../../Redux/actions/WalletActions";

//components
import Loading from "../ui/Loading";
import TabSwitch from "./TabSwitch";
const Add = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return import("./interactionCards/add/Add");
});
const Burn = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return import("./interactionCards/burn/Burn");
});
const Vaults = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return import("./interactionCards/vaults/ComingSoon");
});

const InteractionsContainer = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGasPrice(props.provider));

    if (props.address === "") {
      history.push("/");
    } else {
    }

    //eslint-disable-next-line
  }, [props.provider]);

  useEffect(() => {
    const poolArray = Object.values(props.pools);

    if (props.provider) {
      if (poolArray.length > 0) {
        poolArray.map((pool) => {
          return dispatch(
            getPoolInfo(pool.name, pool.address, props.provider, props.address)
          );
        });
      }
      if (props.address && props.currentPool.tokens !== undefined) {
        dispatch(
          getTokenBalance(props.currentPool, props.address, props.provider)
        );
      }
      const assetArray = Object.values(props.assets);

      dispatch(
        checkForApproval(
          assetArray,
          props.address,
          props.poolAddress,
          props.signer
        )
      );
    }

    //eslint-disable-next-line
  }, [props.address, props.provider]);

  return (
    <div className="interactions-container">
      <TabSwitch />
      <div className="cards">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Add} />
            <Route exact path="/burn" component={Burn} />
            <Route exact path="/vaults" component={Vaults} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    provider: state.wallet.provider,
    signer: state.wallet.signer,
    assets: state.pools.assetArray,
    currentPool: state.pools.currentPool,
    pools: state.pools.pools,
    vaults: state.vaults,
    poolAddress: state.wallet.poolAddress,
  };
};

export default connect(mapStateToProps)(InteractionsContainer);
