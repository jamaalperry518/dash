import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getBalance, setProvider } from "../../Redux/actions/WalletActions";
import { getPoolInfo } from "../../Redux/actions/poolActions";

//components
import Loading from "../ui/Loading";
import TabSwitch from "./TabSwitch";
// import Add from "./interactionCards/add/Add";
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
  return import("./interactionCards/vaults/Vaults");
});

const InteractionsContainer = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProvider());
    if (props.address === "") {
      history.push("/");
    } else {
    }

    //eslint-disable-next-line
  }, [props.provider]);

  useEffect(() => {
    const poolArray = Object.values(props.pools);

    if (props.provider) {
      if (props.address !== "") {
        getBalance(props.provider, props.address);
      }
      if (poolArray.length !== 0) {
        poolArray.map((pool) => {
          return dispatch(getPoolInfo(pool.name, pool.address, props.provider));
        });
      }
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
    assets: state.pools.assetArray,
    currentPool: state.pools.currentPool,
    pools: state.pools.pools,
  };
};

export default connect(mapStateToProps)(InteractionsContainer);
