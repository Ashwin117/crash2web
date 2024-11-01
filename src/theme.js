import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'JetBrains Mono', monospace",
    body: "'JetBrains Mono', monospace",
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
  },
});
export default theme;
