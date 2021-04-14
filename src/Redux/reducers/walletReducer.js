import { CONNECT_WALLET, ESTABLISH_CONNECTION } from "../types/walletTypes";
const initialState = {
  address: "",
  provider: undefined,
  signer: undefined,
  manager: undefined,
  summaries: [],
  underlyingTokens: [],
  usdValue: 0,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        address: action.payload,
      };
    case ESTABLISH_CONNECTION:
      return {
        ...state,
        provider: action.payload,
        signer: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
