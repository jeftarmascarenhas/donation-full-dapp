import { BigNumber } from "ethers";

export type DonationItem = {
  id: BigNumber;
  donor: string;
  value: BigNumber;
};

export type DonationItemFormat = {
  id: string;
  donor: string;
  value: string;
};

export type Web3Context = {};
