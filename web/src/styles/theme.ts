import { extendTheme, Theme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const light = "#fff";
const dark = "#222";

const theme: Theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  } as Theme["config"],
  styles: {
    global: (props: any) => {
      return {
        body: {
          bg: mode(light, dark)(props),
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          colorScheme: "dark",
        },
      };
    },
  },
  components: {
    Button: {
      variants: {
        "btn-primary": {
          bg: "#2165F1",
          color: "white",
        },
      },
    },
  },
}) as Theme;

export default theme;
