import { SELECT_VAULT } from "../types/vaultTypes";
import { ethers } from "ethers";
import { balancerABI } from "../../data/balancerABI";
import { ERC20_ABI } from "../../data/ABI";
import { assets } from "../../data/assets/tokens";

import axios from "axios";
// import { computeRatioFactor } from "../../data/helpers/ratioFactor";

export const selectVault = (vault) => (dispatch) => {
  dispatch({
    type: SELECT_VAULT,
    payload: vault,
  });
};

let resultObject = {};

export const getPoolInfo = (poolName, asset, provider) => async (dispatch) => {
  const contract = new ethers.Contract(asset, balancerABI.abi, provider);
  let vaultSwapFee = await contract.getSwapFee();

  let swapFee = ethers.utils.formatUnits(vaultSwapFee.toString(), 18) * 100;
  dispatch({
    type: "SET_SWAP_FEE",
    payload: swapFee,
  });

  let tokensInPool = {};
  let currentTokens = await contract.getCurrentTokens();

  let normalizedWeights = [];

  currentTokens.map(async (token) => {
    const tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
    let tokenSymbol = await tokenContract.symbol();
    let tokenColor = "";
    let result = await contract.getNormalizedWeight(token);
    let normalizedWeight = ethers.utils.formatUnits(result.toString(), 18);
    let tokenPrice = axios
      .get(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token}&vs_currencies=usd`
      )
      .then((res) => {
        let price = res.data[`${token.toLowerCase()}`]["usd"];
        console.log(price);
        return price;
      })
      .catch((err) => {
        console.log(err);
      });

    normalizedWeights.push(normalizedWeight);
    if (assets[`${tokenSymbol}`]) {
      tokenColor = assets[`${tokenSymbol}`]["color"];
    }
    tokensInPool[`${tokenSymbol}`] = {
      name: tokenSymbol,
      value: parseFloat(normalizedWeight),
      color: tokenColor,
      amount: 0,
      price: await tokenPrice,
    };

    resultObject[`${poolName}`] = {
      address: asset,
      name: poolName,
      tokens: tokensInPool,
      swapFee: swapFee,
    };

    return resultObject;
  });

  dispatch({
    type: "GET_ALL_POOLS",
    payload: resultObject,
  });
};

export const getCurrentPoolInfo = (asset, provider) => async (dispatch) => {
  const contract = new ethers.Contract(asset, balancerABI.abi, provider);
  let vaultSwapFee = await contract.getSwapFee();

  let swapFee = ethers.utils.formatUnits(vaultSwapFee.toString(), 18) * 100;
  dispatch({
    type: "SET_SWAP_FEE",
    payload: swapFee,
  });

  let tokensInPool = {};
  let currentTokens = await contract.getCurrentTokens();
  let tokenColor = "";
  let normalizedWeights = [];
  let ARRAY = [];
  currentTokens.map(async (token) => {
    const tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
    let tokenSymbol = await tokenContract.symbol();

    let result = await contract.getNormalizedWeight(token);
    let normalizedWeight = ethers.utils.formatUnits(result.toString(), 18);

    normalizedWeights.push(normalizedWeight);
    if (assets[`${tokenSymbol}`]) {
      tokenColor = assets[`${tokenSymbol}`]["color"];
    }
    tokensInPool[`${tokenSymbol}`] = {
      name: tokenSymbol,
      value: parseFloat(normalizedWeight),
      color: tokenColor,
      amount: 0,
    };

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
export const caclulateArrayFromInput = () => {};
