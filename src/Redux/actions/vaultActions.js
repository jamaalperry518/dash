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
  let denormalizedWeights = [];
  let ARRAY = [];
  currentTokens.map(async (token) => {
    const tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
    let tokenSymbol = await tokenContract.symbol();

    let result = await contract.getDenormalizedWeight(token);
    let denormalizedWeight = ethers.utils.formatUnits(result.toString(), 18);

    denormalizedWeights.push(denormalizedWeight);

    tokensInPool[`${tokenSymbol}`] = {
      name: tokenSymbol,
      value: parseInt(denormalizedWeight),
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

  console.log(ARRAY);
  return dispatch({
    type: "SET_ASSET_ARRAY",
    payload: ARRAY,
  });
};
