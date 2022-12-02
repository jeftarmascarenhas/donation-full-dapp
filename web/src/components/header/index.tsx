import { Stack, Text, Button, HStack } from "@chakra-ui/react";
import Image from "next/image";

export default function Header() {
  const isConnected = false;

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
          role="heading"
          fontSize={{ base: "4xl", md: "6xl" }}
          lineHeight={{ base: "none" }}
          as="h1"
          fontWeight={{ base: "extrabold", md: "bold" }}
        >
          Crypto Donation
        </Text>
      </HStack>
      <Button variant="btn-primary">
        {!isConnected ? "Connect Wallet" : "Connected"}
      </Button>
    </Stack>
  );
}
