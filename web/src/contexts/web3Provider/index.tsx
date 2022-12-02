import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useContext,
} from "react";
import { useToast } from "@chakra-ui/react";
import { ethers, BigNumber } from "ethers";

import donationArtifact from "../../artifacts/contracts/Donation.sol/Donation.json";
import { DonationItem, DonationItemFormat, Web3Context } from "./types";

const web3ProviderContext = createContext<Web3Context>({});

const contractAddress = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;

const metamaskToastId = "metamask-not-installed";

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <web3ProviderContext.Provider value={{}}>
      {children}
    </web3ProviderContext.Provider>
  );
}

export function useWeb3() {
  return useContext(web3ProviderContext);
}
