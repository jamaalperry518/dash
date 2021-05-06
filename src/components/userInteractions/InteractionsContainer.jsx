import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getBalance } from "../../Redux/actions/WalletActions";
import { getPoolInfo } from "../../Redux/actions/vaultActions";

//components
import TabSwitch from "./TabSwitch";
import Add from "./interactionCards/add/Add";
import Burn from "./interactionCards/burn/Burn";
import Vaults from "./interactionCards/vaults/Vaults";

const InteractionsContainer = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.address === "") {
      history.push("/");
    } else {
    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const poolArray = Object.values(props.pools);

    if (props.address && props.provider) {
      getBalance(props.provider, props.address);
      // dispatch(getCurrentPoolInfo(poolArray[0].address, props.provider));
      //eslint-disable-next-line
      poolArray.map((pool) => {
        dispatch(getPoolInfo(pool.name, pool.address, props.provider));
      });
    }

    //eslint-disable-next-line
  }, [props.address, props.provider]);

  return (
    <div className="interactions-container">
      <TabSwitch />
      <div className="cards">
        <Switch>
          <Route exact path="/" component={Add} />
          <Route exact path="/burn" component={Burn} />
          <Route exact path="/vaults" component={Vaults} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    provider: state.wallet.provider,
    vault: state.vaults.currentVault,
    currentPool: state.vaults.currentPool,
    pools: state.vaults.pools,
  };
};

export default connect(mapStateToProps)(InteractionsContainer);
