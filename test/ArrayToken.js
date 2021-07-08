const { expect } = require("chai");
const myAddress = "0xAfbEe653ee6924E841E7f426c4b94618529f4856";

describe("Token contract", function () {
  let Token, token, balance;

  beforeEach(async () => {
    Token = await ethers.getContractFactory("ArrayToken", "ARRAY");
    token = await Token.deploy("ArrayToken", "ARRAY");
  });
  it("Balance of wallet should equal zero", async function () {
    let balance = await token.balanceOf(myAddress);
    let totalSupply = await token.totalSupply();

    expect(balance).to.equal(0);
    expect(totalSupply).to.equal(0);
  });
});
