import rpcProvider from "../../helpers/provider";
const initialState = {
  address: "",
  provider: undefined,
  signer: undefined,
  network: undefined,
  currentBlock: 0,
  lastBlock: 0,
  gasPrice: 0,
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
    case "SET_CURRENT_BLOCK":
      return {
        ...state,
        currentBlock: action.currentBlock,
        lastBlock: action.lastBlock,
      };
    default:
      return state;
  }
};

export default walletReducer;
