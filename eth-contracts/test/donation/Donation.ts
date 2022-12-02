import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Donation", () => {
  async function setupFixture() {
    const [owner, billy, jonh, alice] = await ethers.getSigners();
    const Donation = await ethers.getContractFactory("Donation");
    const donationContract = await Donation.deploy();
    await donationContract.deployed();
    return {
      donationContract,
      owner,
      billy,
      jonh,
      alice,
    };
  }
  describe("Donation Receive", () => {
    it("should receive a donation", async () => {
      // const { donationContract } = await loadFixture(setupFixture);
    });
    it("should not receive a donation if value is 0", async () => {});

    it("should return balance equal 0 if hasn't donations", async () => {});
    it("should return balance equal 0.05", async () => {});
  });
  describe("Donation List", async () => {
    it("should have 2 donation", async () => {});
    it("should have donor address is correct", async () => {});
  });
  describe("Donation WithDraw", async () => {
    it("shouldn't withdraw if isn't owner", async () => {});
    it("should return message 'balance not enough'", async () => {});
    it("should do withdraw if is owner", async () => {});
  });
});
