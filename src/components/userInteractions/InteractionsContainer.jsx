import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

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
  };
};

export default connect(mapStateToProps)(InteractionsContainer);
