const initialState = {
  WETH: {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    id: "ethereum",
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    precision: 5,
    color: "#433455",
    hasIcon: true,
    logoUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    tvl: 525650,
    totalAPY: 0,
    mintedAPY: 0,
    reinvestedAPY: 0,
    depositInVault: 2.4,
    tokenPrice: 0,
    supplyRate: 8,
    user_balance: 0,
  },
  WBTC: {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    id: "wrapped-bitcoin",
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    precision: 6,
    color: "#68aca9",
    hasIcon: true,
    logoUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    tvl: 988432,
    totalAPY: 0,
    mintedAPY: 0,
    reinvestedAPY: 0,
    depositInVault: 0.354,
    tokenPrice: 0,
    supplyRate: 5.5,
    user_balance: 0,
  },
  DAI: {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    id: "dai",
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 18,
    precision: 2,
    color: "#5d6872",
    hasIcon: true,
    logoUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    tvl: 250000,
    totalAPY: 0,
    mintedAPY: 0,
    reinvestedAPY: 0,
    depositInVault: 115.45,
    tokenPrice: 0,
    supplyRate: 3,
    user_balance: 0,
  },
  "1inch": {
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
    id: "1inch",
    name: "1INCH Token",
    symbol: "1INCH",
    decimals: 18,
    precision: 3,
    color: "#5d6872",
    hasIcon: true,
    logoUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x111111111117dC0aa78b770fA6A738034120C302/logo.png",
    tvl: 125420,
    totalAPY: 0,
    mintedAPY: 0,
    reinvestedAPY: 0,
    depositInVault: 27.432,
    tokenPrice: 0,
    supplyRate: 9,
    user_balance: 0,
  },
  UNI: {
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    precision: 3,
    color: "#6e6962",
    hasIcon: true,
    logoUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
    tvl: 89800.69,
    totalAPY: 0,
    mintedAPY: 0,
    reinvestedAPY: 0,
    depositInVault: 4,
    tokenPrice: 0,
    supplyRate: 2,
    user_balance: 0,
  },
};

const vaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_VAULTS":
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};

export default vaultReducer;
