import { SELECT_VAULT } from "../types/vaultTypes";
import { ethers } from "ethers";
import { balancerABI } from "../../data/balancerABI";
import { ERC20_ABI } from "../../data/ABI";
// import { computeRatioFactor } from "../../data/helpers/ratioFactor";
export const selectVault = (vault) => (dispatch) => {
  dispatch({
    type: SELECT_VAULT,
    payload: vault,
  });
};

export const getPoolInfo = (asset, provider) => async (dispatch) => {
  const contract = new ethers.Contract(asset, balancerABI.abi, provider);

  let tokensInPool = {};
  let currentTokens = await contract.getCurrentTokens();
  const colors = [
    "#1330f4",
    "#13a6f4",
    "#bcd57e",
    "#c91a5b",
    "#c95b5b",
    "#00ffed",
    "#00ff1d",
    "#ff4300",
    "#f221cf",
    "#ebf221",
  ];
  let colorIndex = 0;
  let normalizedWeights = [];
  let ARRAY = [];
  currentTokens.map(async (token) => {
    const tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
    let tokenSymbol = await tokenContract.symbol();

    let result = await contract.getNormalizedWeight(token);
    let normalizedWeight = ethers.utils.formatUnits(result.toString(), 18);

    normalizedWeights.push(normalizedWeight);

    tokensInPool[`${tokenSymbol}`] = {
      name: tokenSymbol,
      value: parseFloat(normalizedWeight),
      color: colors[colorIndex],
      amount: 0,
    };
    colorIndex++;

    ARRAY.push(tokensInPool[`${tokenSymbol}`]);
    return tokensInPool;
  });

  dispatch({
    type: "SET_CURRENT_POOL",
    payload: tokensInPool,
  });

  return dispatch({
    type: "SET_ASSET_ARRAY",
    payload: ARRAY,
  });
};
