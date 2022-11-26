import { Stack, Text, Button } from "@chakra-ui/react";
import useWeb3 from "@hooks/useWeb3";
import React from "react";

export default function Header() {
  const { connectWallet, isConnected } = useWeb3();
  return (
    <Stack
      direction={["column", "row"]}
      justifyContent="space-between"
      align="center"
      as="header"
    >
      <Text fontSize={{ base: "5xl", md: "6xl" }} as="h1" fontWeight="bold">
        Save the Pets
      </Text>
      <Button variant="btn-primary" onClick={connectWallet}>
        {!isConnected ? "Connect Wallet" : "Connected"}
      </Button>
    </Stack>
  );
}
