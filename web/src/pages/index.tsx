import {
  VStack,
  SimpleGrid,
  Box,
  Text,
  HStack,
  Tag,
  Button,
} from "@chakra-ui/react";
import { useEffect, useReducer, useRef, useState } from "react";
import Head from "next/head";
import Header from "@global-components/header";
import Footer from "@global-components/footer";
import DonationForm from "@global-components/donationForm";
import Donors from "@global-components/donors";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWeb3 } from "@contexts/web3Provider";

export default function Home() {
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });

  const confettiWrapper = useRef<HTMLDivElement>(null);
  const { showConfetti, total } = useWeb3();

  useEffect(() => {
    if (confettiWrapper.current) {
      setSizes({
        width: confettiWrapper.current?.clientWidth,
        height: confettiWrapper.current?.clientHeight,
      });
    }
  }, []);

  return (
    <>
      {showConfetti && (
        <Confetti
          numberOfPieces={80}
          width={sizes.width}
          height={sizes.height}
        />
      )}
      <Box
        ref={confettiWrapper}
        position="relative"
        _after={{
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          bgColor: "rgba(0, 0, 0, 0.65)",
          width: "100%",
          height: "100%",
        }}
      >
        <Head>
          <title>Crypto Donation</title>
        </Head>
        <Image
          src="/bg-dog.jpeg"
          alt="Dog Dog"
          fill
          style={{ objectFit: "cover" }}
          placeholder="empty"
        />
        <Box position="relative" zIndex="2">
          <VStack
            as="main"
            minH="100vh"
            align="stretch"
            spacing={2}
            justifyContent={{ base: "space-around", md: "space-between" }}
            px={{ base: 8, md: 20 }}
            py={{ base: 4, md: 10 }}
          >
            <Header />
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 16, lg: 28 }}
              position="relative"
            >
              <VStack align="stretch" flex={1}>
                <Text
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  lineHeight={1.2}
                >
                  Give a helping hand to those to need.
                </Text>
                <DonationForm />
              </VStack>
              <VStack align="stretch" flex={1}>
                <HStack>
                  <Text
                    as="h3"
                    fontSize={{ base: "lg", md: "2xl" }}
                    fontWeight="semibold"
                  >
                    Last 5 donations
                  </Text>
                  <Tag borderRadius="full">ETH {total}</Tag>
                </HStack>
                <Donors />
              </VStack>
            </SimpleGrid>
            <Footer />
          </VStack>
        </Box>
      </Box>
    </>
  );
}
