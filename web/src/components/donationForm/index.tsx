import {
  VStack,
  Button,
  HStack,
  Tag,
  TagLabel,
  Divider,
} from "@chakra-ui/react";
import { useWeb3 } from "@contexts/web3Provider";
import React, { useState } from "react";

const values = ["0.05", "0.02", "0.01"];

export default function DonationForm() {
  const [value, setValue] = useState("0.02");

  const { donate, loadingDonate } = useWeb3();

  const handleValue = (newValue: string) => setValue(newValue);
  const handleSend = () => {
    if (value && value !== "0") {
      donate(value);
    }
  };

  return (
    <VStack
      bgColor="whiteAlpha.300"
      backdropFilter="saturate(180%) blur(8px)"
      borderRadius="md"
      align="flex-start"
      spacing="8"
      py={{ base: "8", md: "12" }}
      px={{ base: "6", md: "8" }}
    >
      <HStack align="center" spacing="4">
        {values.map((etherValue) => (
          <Tag
            borderRadius="full"
            bgColor={value === etherValue ? "gray.800" : "gray.600"}
            size={{ base: "md", md: "lg" }}
            key={etherValue}
            cursor="pointer"
            onClick={() => handleValue(etherValue)}
          >
            <TagLabel>{etherValue} ETH</TagLabel>
          </Tag>
        ))}
      </HStack>
      <Divider bgColor="gray.500" />
      <Button
        variant="btn-primary"
        size="lg"
        width="full"
        isLoading={loadingDonate}
        loadingText="Loading..."
        onClick={handleSend}
      >
        Donate Now
      </Button>
    </VStack>
  );
}
