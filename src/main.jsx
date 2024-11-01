import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";

// Import JetBrains Mono from Google Fonts
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
