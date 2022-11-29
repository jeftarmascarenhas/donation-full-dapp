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
      const { donationContract } = await loadFixture(setupFixture);
      const value = ethers.utils.parseEther("0.01");
      await donationContract.donate({ value });
      const total = await donationContract.total();
      expect(total).to.equal(value);
    });
    it("should not receive a donation if value is 0", async () => {
      const { donationContract } = await loadFixture(setupFixture);
      const value = ethers.utils.parseEther("0");
      await expect(donationContract.donate({ value })).to.rejectedWith(
        "value not enough"
      );
    });

    it("should return balance equal 0 if hasn't donations", async () => {
      const { donationContract } = await loadFixture(setupFixture);
      const balance = await ethers.provider.getBalance(
        donationContract.address
      );
      expect(balance.toString()).to.equal("0");
    });
    it("should return balance equal 0.05", async () => {
      const { donationContract } = await loadFixture(setupFixture);
      const value = ethers.utils.parseEther("0.05");
      await donationContract.donate({ value });
      const balance = await ethers.provider.getBalance(
        donationContract.address
      );
      expect(balance.toString()).to.equal(value.toString());
    });
  });
  describe("Donation List", async () => {
    it("should have 2 donation", async () => {
      const { donationContract, alice, jonh } = await loadFixture(setupFixture);
      const value1 = ethers.utils.parseEther("0.01");
      const value2 = ethers.utils.parseEther("0.05");
      await donationContract.connect(alice).donate({ value: value1 });
      await donationContract.connect(jonh).donate({ value: value2 });
      const donations = await donationContract.getDonations();
      expect(donations).to.have.lengthOf(2);
    });
    it("should have donor address is correct", async () => {
      const { donationContract, alice } = await loadFixture(setupFixture);
      const value = ethers.utils.parseEther("0.05");
      await donationContract.connect(alice).donate({ value });
      const [donation] = await donationContract.getDonations();
      expect(donation.donor).to.equal(alice.address);
      expect(donation.value).to.equal(value);
    });
  });
  describe("Donation WithDraw", async () => {
    it("shouldn't withdraw if isn't owner", async () => {
      const { donationContract, alice, billy, owner } = await loadFixture(
        setupFixture
      );
      const value = ethers.utils.parseEther("0.05");
      await donationContract.connect(billy).donate({ value });

      await expect(donationContract.connect(alice).withdraw()).to.rejectedWith(
        "not owner"
      );
    });
    it("should return message 'balance not enough'", async () => {
      const { donationContract } = await loadFixture(setupFixture);

      await expect(donationContract.withdraw()).to.rejectedWith(
        "balance not enough"
      );
    });
    it("should do withdraw if is owner", async () => {
      const { donationContract, alice, billy, owner } = await loadFixture(
        setupFixture
      );
      const value = ethers.utils.parseEther("0.05");
      await donationContract.connect(billy).donate({ value });

      const contractBalanceInit = await ethers.provider.getBalance(
        donationContract.address
      );

      expect(contractBalanceInit.toString()).to.equal(value.toString());

      await donationContract.withdraw();
      const contractBalanceEnd = await ethers.provider.getBalance(
        donationContract.address
      );

      expect(contractBalanceEnd.toString()).to.equal("0");
    });
  });
});
