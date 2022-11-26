import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import donationArtifact from "../../blockchain/artifacts/contracts/Donation.sol/Donation.json";

const contractAddress = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;

const metamaskNotInstalledId = "metamask-not-installed";
const dappUrl = "donationT232";
const metamaskAppDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;

export default function useWeb3() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [donations, setDonations] = useState([]);
  const [loadingDonate, setLoadingDonate] = useState(false);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const toast = useToast();

  const isMetamaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  };

  const isMobileDevice = () =>
    "ontouchstart" in window || "onmsgesturechange" in window;

  const errorMsg = (error: any, title = "Error Transaction") => {
    const description = error?.reason
      ? error.reason
      : "There is a error, please try again.";
    toast({
      title,
      description,
      status: "error",
      position: "top-right",
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
      console.log(error);
      errorMsg(error);
    }
  };

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
        position: "top-right",
        isClosable: true,
      });
      const tx = await donate.wait();
      toast({
        title: "Successful Transaction",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      console.log("tx: ", tx);
    } catch (error: any) {
      console.log(error);
      errorMsg(error);
    } finally {
      setLoadingDonate(false);
    }
  };

  const generateContract = useCallback(async () => {
    const signerConnected = provider?.getSigner();
    setSigner(signerConnected);

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
      const data = await contract?.getDonations();
      const dataFormat = data.map((item: any) => ({
        donor: item.donor,
        value: ethers.utils.formatEther(item.value).toString(),
      }));

      setDonations(dataFormat?.slice(-5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDonations(false);
    }
  }, [contract]);

  const checkConnection = useCallback(async () => {
    const accounts = await provider?.listAccounts();
    if (accounts?.length) {
      setIsConnected(true);
    }
  }, [provider]);

  useEffect(() => {
    if (!isMetamaskInstalled()) {
      !toast.isActive(metamaskNotInstalledId) &&
        toast({
          title: "You need to install metamask extension",
          status: "error",
          position: "top-right",
          isClosable: true,
          id: metamaskNotInstalledId,
        });
      if (isMobileDevice()) {
        window.open(metamaskAppDeepLink);
      }
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
    if (provider) {
      generateContract();
      checkConnection();
    }
  }, [provider, generateContract, checkConnection]);

  useEffect(() => {
    if (contract) {
      getDonations();
    }
  }, [contract, getDonations]);

  return {
    connectWallet,
    donate,
    contract,
    signer,
    donations,
    loadingDonate,
    loadingDonations,
    isConnected,
  };
}
