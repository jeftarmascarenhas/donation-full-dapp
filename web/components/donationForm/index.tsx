import {
  VStack,
  Button,
  HStack,
  Tag,
  TagLabel,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";

const values = ["0.05", "0.02", "0.01"];

export default function DonationForm() {
  const [value, setValue] = useState("0.02");

  const handleValue = (newValue: string) => setValue(newValue);
  const handleSend = () => {
    console.log(value);
  };

  return (
    <VStack
      bgColor="whiteAlpha.800"
      borderRadius="md"
      align="flex-start"
      spacing="8"
      py={{ base: "8", md: "12" }}
      px={{ base: "6", md: "8" }}
    >
      <HStack align="center" spacing="4">
        {values.map((item) => (
          <Tag
            borderRadius="full"
            bgColor={value === item ? "gray.800" : "gray.600"}
            size={{ base: "md", md: "lg" }}
            key={item}
            cursor="pointer"
            onClick={() => handleValue(item)}
          >
            <TagLabel>{item} ETH</TagLabel>
          </Tag>
        ))}
      </HStack>
      <Divider bgColor="gray.500" />
      <Button
        variant="btn-primary"
        size="lg"
        width="full"
        loadingText="Loading..."
        onClick={handleSend}
      >
        Donate Now
      </Button>
    </VStack>
  );
}
