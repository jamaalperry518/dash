import React from "react";
import { Switch, Route } from "react-router-dom";

//components
import TabSwitch from "./TabSwitch";
import Add from "./interactionCards/add/Add";
import Burn from "./interactionCards/burn/Burn";
import Vaults from "./interactionCards/vaults/Vaults";

const InteractionsContainer = () => {
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

export default InteractionsContainer;
