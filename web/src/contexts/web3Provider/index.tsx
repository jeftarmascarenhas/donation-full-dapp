import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { useToast } from "@chakra-ui/react";
import { ethers, BigNumber } from "ethers";

import donationArtifact from "../../artifacts/contracts/Donation.sol/Donation.json";
import { DonationItem, DonationItemFormat, Web3Context } from "./types";

const web3ProviderContext = createContext<Web3Context>({
  connectWallet() {},
  disconnectWallet() {},
  async donate() {},
  donations: [],
  loadingDonate: false,
  loadingDonations: false,
  isConnected: false,
  showConfetti: false,
  total: "0",
});

const contractAddress = `0x86Ae9792b6cc208e1099Db8A578f37C84E83C4d5`;

const metamaskToastId = "metamask-not-installed";

export default function Web3Provider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [donations, setDonations] = useState<DonationItemFormat[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [total, setTotal] = useState("0");
  const [loadingDonate, setLoadingDonate] = useState(false);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toast = useToast({
    position: "top-right",
  });

  const isMetamaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  };

  const errorMsg = (error: any, title = "Error Transaction") => {
    const description = error?.reason
      ? error.reason
      : "There is a error, please try again.";
    toast({
      title,
      description,
      status: "error",
      isClosable: true,
    });
  };

  const connectWallet = async () => {
    try {
      const accounts = await provider?.send("eth_requestAccounts", []);
      if (accounts?.length) {
        setIsConnected(true);
      }
    } catch (error) {
      console.error(error);
      errorMsg(error);
    }
  };

  const disconnectWallet = async () => {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      status: "success",
    });
  };

  const generateContract = useCallback(async () => {
    const signerConnected = provider?.getSigner();

    const donationContract = new ethers.Contract(
      contractAddress,
      donationArtifact.abi,
      signerConnected
    );

    setContract(donationContract);
  }, [provider]);

  const getDonations = useCallback(async () => {
    try {
      setLoadingDonations(true);
      const data = (await contract?.getDonations()) as DonationItem[];
      const totalValue = (await contract?.total()) as BigNumber;

      const dataFormat = data.map((item) => ({
        id: item.id.toString(),
        donor: item.donor,
        value: ethers.utils.formatEther(item.value),
      }));

      setTotal(ethers.utils.formatEther(totalValue.toString()));

      setDonations(dataFormat.slice(-5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDonations(false);
    }
  }, [contract]);

  const donate = async (amount: string) => {
    try {
      setLoadingDonate(true);
      const value = ethers.utils.parseEther(amount);
      const donate = await contract?.donate({
        value,
      });

      toast({
        title: "Pending Transaction",
        status: "info",

        isClosable: true,
      });

      await donate.wait();

      toast({
        title: "Successful Transaction",
        status: "success",
        isClosable: true,
      });
      setShowConfetti(true);
      getDonations();
    } catch (error: any) {
      console.error(error);
      errorMsg(error);
      throw error;
    } finally {
      setLoadingDonate(false);
    }
  };

  useEffect(() => {
    if (!isMetamaskInstalled()) {
      !toast.isActive(metamaskToastId) &&
        toast({
          title: "You need to install metamask extension",
          status: "error",
          position: "top-right",
          isClosable: true,
          id: metamaskToastId,
        });

      return;
    }
    if (window && window?.window) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      setProvider(web3Provider);
    }
  }, [toast]);

  useEffect(() => {
    async function checkConnections() {
      const accounts = await provider?.listAccounts();
      if (accounts?.length) {
        setIsConnected(true);
      }
    }
    if (provider) {
      generateContract();
      checkConnections();
    }
  }, [provider, generateContract]);

  useEffect(() => {
    if (contract) {
      getDonations();
    }
  }, [contract, getDonations]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showConfetti]);

  return (
    <web3ProviderContext.Provider
      value={{
        disconnectWallet,
        connectWallet,
        donate,
        donations,
        loadingDonate,
        loadingDonations,
        isConnected,
        total,
        showConfetti,
      }}
    >
      {children}
    </web3ProviderContext.Provider>
  );
}

export function useWeb3() {
  return useContext(web3ProviderContext);
}
