import rpcProvider from "../../helpers/provider";
const initialState = {
  address: "",
  provider: rpcProvider,
  signer: undefined,
  network: undefined,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECT_WALLET":
      return {
        ...state,
        address: action.address,
        provider: action.provider,
        signer: action.signer,
        network: action.network,
      };
    default:
      return state;
  }
};

export default walletReducer;
