import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getBalance } from "../../Redux/actions/WalletActions";

//components
import TabSwitch from "./TabSwitch";
import Add from "./interactionCards/add/Add";
import Burn from "./interactionCards/burn/Burn";
import Vaults from "./interactionCards/vaults/Vaults";

const InteractionsContainer = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.address === "") {
      history.push("/");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.address && props.provider) {
      getBalance(props.provider, props.address);
    }
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
  };
};

export default connect(mapStateToProps)(InteractionsContainer);
