import { combineReducers } from "redux";
import vaultReducer from "./vaultReducer";
import walletReducer from "./walletReducer";
import currencyReducer from "./curencyReducer";

export default combineReducers({
  wallet: walletReducer,
  vaults: vaultReducer,
  currency: currencyReducer,
});
