import BigNumber from "./bigNumber.js";

export const getPoolLiquidity = (pool) => {
  if (pool.tokens) {
    let sumWeight = new BigNumber(0);
    let sumValue = new BigNumber(0);
    let arr = Object.values(pool.tokens);
    for (const token of arr) {
      const price = token.price;
      if (!price) {
        continue;
      }
      const balanceNumber = new BigNumber(token.amount);
      const value = balanceNumber.times(price);
      sumValue = sumValue.plus(value);
      sumWeight = sumWeight.plus(token.weightPercent / 100);
    }
    if (sumWeight.gt(0)) {
      console.log(sumValue.div(sumWeight).toString());
      return sumValue.div(sumWeight).toString();
    } else {
      console.log();
      return pool.liquidity;
    }
  }
};
