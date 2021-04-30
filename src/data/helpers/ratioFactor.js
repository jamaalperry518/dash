import { bnum } from "./bigNumber";

export const computeRatioFactor = (
  tokens,
  weights,
  chainId,
  balMultiplier = bnum(1)
) => {
  let brfSum = bnum(0);
  let pairWeightSum = bnum(0);
  const N = weights.length;

  for (let j = 0; j < N; j++) {
    if (weights[j].eq(bnum(0))) continue;

    for (let k = j + 1; k < N; k++) {
      const pairWeight = weights[j].times(weights[k]);
      const normalizedWeight1 = weights[j].div(weights[j].plus(weights[k]));
      const normalizedWeight2 = weights[k].div(weights[j].plus(weights[k]));

      const stakingBoostOfPair = getStakingBoostOfPair(
        chainId,
        balMultiplier,
        tokens[j],
        weights[j],
        tokens[k],
        weights[k]
      );

      // stretches factor for equal weighted pairs to 1
      const ratioFactorOfPair = bnum(4)
        .times(normalizedWeight1)
        .times(normalizedWeight2)
        .times(pairWeight);

      const brfOfPair = stakingBoostOfPair.times(ratioFactorOfPair);

      brfSum = brfSum.plus(brfOfPair);
      pairWeightSum = pairWeightSum.plus(pairWeight);
    }
  }

  return brfSum.div(pairWeightSum);
};

const BAL_TOKEN = {
  1: "0xba100000625a3754423978a60c9317c58a424e3D",
  42: "0xfc1a1381b3f63f3becc2990100e3c94fe4fdffdc",
};
const uncappedTokens = {
  1: [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    "0xba100000625a3754423978a60c9317c58a424e3D", // BAL
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
  ],
  42: [
    "0xd0A1E359811322d97991E03f863a0C30C2cF029C", // WETH
    "0xfc1a1381b3f63f3becc2990100e3c94fe4fdffdc", // BAL
    "0x1528F3FCc26d13F7079325Fb78D9442607781c8C", // DAI
    "0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5", // USDC
    "0xe0C9275E44Ea80eF17579d33c55136b7DA269aEb", // WBTC
  ],
};

function getStakingBoostOfPair(
  chainId,
  balMultiplier,
  token1,
  weight1,
  token2,
  weight2
) {
  if (
    //eslint-disable-next-line
    token1 == BAL_TOKEN[chainId] &&
    uncappedTokens[chainId].includes(token2)
  ) {
    return balMultiplier
      .times(weight1)
      .plus(weight2)
      .div(weight1.plus(weight2));
  } else if (
    //eslint-disable-next-line
    token2 == BAL_TOKEN[chainId] &&
    uncappedTokens[chainId].includes(token1)
  ) {
    return weight1
      .plus(balMultiplier.times(weight2))
      .div(weight1.plus(weight2));
  } else {
    return bnum(1);
  }
}
