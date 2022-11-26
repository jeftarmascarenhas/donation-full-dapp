import { Stack, Text, Button } from "@chakra-ui/react";

export default function Header() {
  const isConnected = false;

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
      <Button variant="btn-primary">
        {!isConnected ? "Connect Wallet" : "Connected"}
      </Button>
    </Stack>
  );
}
