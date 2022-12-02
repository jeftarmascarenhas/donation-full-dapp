import { Avatar, VStack, HStack, Text, Spinner, Tag } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";

const truncateAddress = (wallet: string) =>
  `${wallet.slice(0, 5)}...${wallet.slice(wallet.length - 4, wallet.length)}`;

const mokeDonations = [
  { id: 1, donor: `0xF2f5C73fa04406b1995e397B55c24aB1f3eA726C`, value: `0.02` },
];

export default function Donors() {
  if (false) {
    return <Spinner />;
  }

  return (
    <VStack align="stretch" spacing="4">
      {mokeDonations.length ? (
        mokeDonations.map((item) => (
          <Link
            key={item.id}
            href={`https://etherscan.io/address/${item.donor}`}
            target="_blank"
          >
            <HStack
              bgColor="gray.800"
              key={item.id}
              p="2"
              borderRadius="full"
              justifyContent="space-between"
            >
              <HStack spacing={4}>
                <Avatar size="sm" />
                <Text fontWeight="semibold" color="white">
                  {truncateAddress(item.donor)}
                </Text>
                <Tag borderRadius="full">ETH {item.value}</Tag>
              </HStack>
              <ChevronRightIcon fontSize="2xl" />
            </HStack>
          </Link>
        ))
      ) : (
        <Text fontWeight="semibold" color="white">
          Be first person to donate.
        </Text>
      )}
    </VStack>
  );
}
