import { ethers } from "ethers";
import { balancerABI } from "../../data/balancerABI";
import { tokenMaster } from "../../data/assets/tokenMaster";

import axios from "axios";
// import { computeRatioFactor } from "../../data/helpers/ratioFactor";

let resultObject = {};
let assetObject = tokenMaster.tokens;

export const getPoolInfo = (poolName, asset, provider) => async (dispatch) => {
  const contract = new ethers.Contract(asset, balancerABI.abi, provider);
  let vaultSwapFee = await contract.getSwapFee();

  let swapFee = ethers.utils.formatUnits(vaultSwapFee.toString(), 18) * 100;

  let tokensInPool = {};
  let currentTokens = await contract.getCurrentTokens();
  currentTokens.map(async (token) => {
    let currentToken = {};
    let normalizedWeight = 0;
    let result = await contract.getNormalizedWeight(token);
    normalizedWeight = ethers.utils.formatUnits(result.toString(), 18);
    let tokenPrice = axios
      .get(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token}&vs_currencies=usd`
      )
      .then((res) => {
        let price = res.data[`${token.toLowerCase()}`]["usd"];

        return price;
      })
      .catch((err) => {
        console.log(err);
      });
    currentToken = { ...assetObject[token] };
    currentToken.value = parseFloat(normalizedWeight);
    currentToken.price = await tokenPrice;
    tokensInPool[`${currentToken.symbol}`] = currentToken;
  });
  resultObject[`${poolName}`] = {
    address: asset,
    name: poolName,
    tokens: tokensInPool,
    swapFee: swapFee,
  };

  dispatch({
    type: "GET_ALL_POOLS",
    payload: resultObject,
  });
};

export const setCurrentPool = (pool) => (dispatch) => {
  dispatch({
    type: "SET_CURRENT_POOL",
    payload: pool,
  });
  if (pool) {
    let arr = Object.values(pool["tokens"]);

    dispatch({
      type: "SET_ASSET_ARRAY",
      payload: arr,
    });
  }
};

export const setLoaded = () => (dispatch) => {
  dispatch({
    type: "ALL_LOADED",
    payload: true,
  });
};
