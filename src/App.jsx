import React from "react";
import { Box, Link as ChakraLink, forwardRef } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link as ReactRouterLink,
  useLocation,
} from "react-router-dom";

// Custom Chakra Link that supports React Router
const ChakraRouterLink = forwardRef((props, ref) => (
  <ChakraLink as={ReactRouterLink} ref={ref} {...props} />
));

function NavBar() {
  const location = useLocation();

  // Only show the link if the current path is not /sandbox
  if (location.pathname === "/sandbox") {
    return null;
  }

  return (
    <div className="navBar">
      <div className="sandbox">
        <ChakraRouterLink to="/sandbox">Sandbox</ChakraRouterLink>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="sandbox"
          element={
            <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
              <CodeEditor />
            </Box>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
