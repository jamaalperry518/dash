const { expect } = require("chai");
const myAddress = "0xAfbEe653ee6924E841E7f426c4b94618529f4856";

describe("Curve contract", function () {
  let Curve, curve, owner;

  beforeEach(async () => {
    Curve = await ethers.getContractFactory("Curve");
    curve = await Curve.deploy();
    [owner] = await ethers.getSigners();
  });
  it("Balance of wallet should equal zero", async function () {
    console.log(curve);
  });
});
