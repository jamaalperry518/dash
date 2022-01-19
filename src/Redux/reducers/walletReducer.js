import rpcProvider from "../../helpers/provider";
const initialState = {
  address: "",
  provider: rpcProvider,
  signer: undefined,
  network: undefined,
  selectedAsset: "",
  assetAmount: 0,
  gasPrice: 0,
  arrayBalance: 500,
  poolAddress: "",
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

    // case "SET_PROVIDER":
    //   return {
    //     ...state,
    //     provider: rpcProvider,
    //   };
    case "SET_GAS_PRICE":
      return {
        ...state,
        gasPrice: action.gasPrice,
      };
    case "SET_POOL_ADDRESS":
      return {
        ...state,
        poolAddress: action.payload,
      };
    case "SET_SELECTED_ASSET":
      return {
        ...state,
        selectedAsset: action.payload,
      };
    case "SET_SELECTED_ASSET_AMOUNT":
      return {
        ...state,
        assetAmount: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
