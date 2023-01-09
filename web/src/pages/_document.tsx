import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../styles/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="author" content="Jeff Mascarenhas" />
          <meta name="theme-color" content="#2165F1" />
          <meta property="og:title" content="Crypto Donation" />
          <meta
            property="og:image"
            itemProp="image"
            content="https://donation-full-dapp.vercel.app/shortscreen.png"
          />
          <meta
            property="og:description"
            content="Project was created by Jeftar Mascarenhas for your Youtube channel"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://localhost:3000" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
