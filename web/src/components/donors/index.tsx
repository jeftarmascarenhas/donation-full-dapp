import { Avatar, VStack, HStack, Text, Spinner, Tag } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { useWeb3 } from "@contexts/web3Provider";

const truncateAddress = (wallet: string) =>
  `${wallet.slice(0, 5)}...${wallet.slice(wallet.length - 4, wallet.length)}`;

export default function Donors() {
  const { donations, loadingDonations } = useWeb3();

  if (loadingDonations) {
    return <Spinner />;
  }

  return (
    <VStack align="stretch" spacing="4">
      {!loadingDonations && donations.length ? (
        donations.map((item) => (
          <HStack
            bgColor="gray.800"
            key={item.id}
            p="2"
            borderRadius="full"
            justifyContent="space-between"
          >
            <HStack>
              <Avatar size="sm" />
              <Text fontWeight="semibold" color="white">
                {truncateAddress(item.donor)}
              </Text>
            </HStack>
            <Tag borderRadius="full">ETH {item.value}</Tag>

            <ChevronRightIcon fontSize="2xl" />
          </HStack>
        ))
      ) : (
        <Text fontWeight="semibold" color="white">
          Be first person to donate.
        </Text>
      )}
    </VStack>
  );
}
