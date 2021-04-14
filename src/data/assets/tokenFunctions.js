import ethers from "ethers";
import { ERC20_ABI } from "../ABI";

export class GetUnderlyings {
  constructor() {
    this.balances = {};
  }

  _ingest(name, balance) {
    if (balance.isZero()) return;
    if (!this.balances[name]) {
      this.balances[name] = balance;
    } else {
      this.balances[name] = this.balances[name].add(balance);
    }
  }

  usdValueOf(provider) {
    const promises = Object.entries(this.balances).map(([name, balance]) => {
      const asset = Token.fromName(name, provider);
      return asset.usdValueOf(balance);
    });
    return Promise.all(promises).then((vals) => {
      let total = ethers.BigNumber.from(0);
      vals.forEach((val) => (total = total.add(val)));
      return total;
    });
  }

  ingest(entries) {
    entries.forEach((entry) => this._ingest(entry.asset.name, entry.balance));
    return this;
  }

  combine(other) {
    Object.entries(other.balances).forEach(([name, balance]) =>
      this._ingest(name, balance)
    );
    return this;
  }

  toList() {
    return Object.entries(this.balances).map(([name, balance]) => {
      return {
        asset: data.assetByName(name),
        balance,
      };
    });
  }
}
