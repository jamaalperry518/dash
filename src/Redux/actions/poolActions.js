import { ethers } from "ethers";
import { balancerABI } from "../../data/balancerABI";
import { ERC20_ABI } from "../../data/ABI";
import { tokenMaster } from "../../data/assets/tokenMaster";

import axios from "axios";
// import { computeRatioFactor } from "../../data/helpers/ratioFactor";

let resultObject = {};
let assetObject = tokenMaster.tokens;

export const getPoolInfo =
  (poolName, asset, provider, address) => async (dispatch) => {
    const contract = new ethers.Contract(asset, balancerABI.abi, provider);
    let vaultSwapFee = await contract.getSwapFee();

    let swapFee = ethers.utils.formatUnits(vaultSwapFee.toString(), 18) * 100;

    let tokensInPool = {};
    let currentTokens = await contract.getCurrentTokens();
    currentTokens.map(async (token) => {
      let currentToken = {};
      let normalizedWeight = 0;
      let tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
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

      let allowance;

      dispatch({
        type: "SET_POOL_ADDRESS",
        payload: asset,
      });
      currentToken = { ...assetObject[token] };
      if (address) {
        allowance = ethers.utils.formatUnits(
          await tokenContract.allowance(address, asset)
        );
      }
      // let tokenBalance = ethers.utils.formatUnits(
      //   await contract.balanceOf(currentToken.address)
      // );

      currentToken.value = parseFloat(normalizedWeight);
      currentToken.price = await tokenPrice;
      currentToken.allowance = allowance;
      // currentToken.user_balance = tokenBalance;
      console.log(currentToken);
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
    dispatch({
      type: "SET_CURRENT_POOL",
      payload: resultObject["WETH-WBTC"],
    });
  };

export const setCurrentPool = (pool) => (dispatch) => {
  if (pool) {
    let arr = Object.values(pool["tokens"]);
    if (arr) {
      dispatch({
        type: "SET_ASSET_ARRAY",
        payload: arr,
      });
    }
  }
};

export const mintArray = async (address, amount, token, pool) => {
  if (amount > 0) {
    // const tokenInLp = await pool.isTokenInLp(token);
    // const tokenInVirtualLp = await pool.isTokenInVirutalLp(token);
    const allowance = await pool._token.allowance(address, pool.address);
    let formattedAmount = ethers.utils.parseUnits(amount.toString(), 18);
    if (allowance.lt(formattedAmount))
      await pool._token.approve(pool.address, amount);
    await pool._token.mint(address, amount);
  }
};

export const calculateArrayFromTokens = (token, amount, pool) => {
  if (amount > 0) {
    //amount will be formatted amount.
    pool.calculateArrayTokensGivenERC20Tokens(token, amount);
  }
};
