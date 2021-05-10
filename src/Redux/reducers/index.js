import { combineReducers } from "redux";
import poolReducer from "./poolReducer";
import walletReducer from "./walletReducer";
import currencyReducer from "./curencyReducer";
import vaultReducer from "./vaultReducer";

export default combineReducers({
  wallet: walletReducer,
  pools: poolReducer,
  currency: currencyReducer,
  vaults: vaultReducer,
});
