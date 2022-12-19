import { Stack, Text, Button, HStack } from "@chakra-ui/react";
import { useWeb3 } from "@contexts/web3Provider";
import Image from "next/image";

export default function Header() {
  const { connectWallet, disconnectWallet, isConnected } = useWeb3();
  return (
    <Stack
      direction={["column", "row"]}
      justifyContent="space-between"
      align="center"
      as="header"
    >
      <HStack spacing={4} mb="8">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          alt="Crypto Donation Logo"
        />
        <Text
          fontSize={{ base: "4xl", md: "6xl" }}
          lineHeight={{ base: "none" }}
          as="h1"
          fontWeight={{ base: "extrabold", md: "bold" }}
        >
          Crypto Donation
        </Text>
      </HStack>
      <Button
        variant="btn-primary"
        onClick={!isConnected ? connectWallet : disconnectWallet}
      >
        {!isConnected ? "Connect Wallet" : "Connected"}
      </Button>
    </Stack>
  );
}
