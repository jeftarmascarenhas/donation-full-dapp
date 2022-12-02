import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@global-styles/theme";
import Web3Provider from "@contexts/web3Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ChakraProvider>
  );
}
