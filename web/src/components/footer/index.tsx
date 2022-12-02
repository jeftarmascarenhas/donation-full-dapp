import { HStack, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <HStack
      as="footer"
      justifyContent={{ base: "center", md: "flex-end" }}
      pt={{ md: "4" }}
      spacing={4}
    >
      <Text fontSize="md">In love with NTF Choose</Text>
    </HStack>
  );
}
