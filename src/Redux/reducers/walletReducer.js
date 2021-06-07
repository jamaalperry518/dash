import rpcProvider from "../../helpers/provider";
const initialState = {
  address: "",
  provider: undefined,
  signer: undefined,
  network: undefined,

  gasPrice: 0,
  arrayBalance: 420,
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

    case "SET_PROVIDER":
      return {
        ...state,
        provider: rpcProvider,
      };
    case "SET_GAS_PRICE":
      return {
        ...state,
        gasPrice: action.gasPrice,
      };
    default:
      return state;
  }
};

export default walletReducer;
