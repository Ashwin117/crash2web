import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = LANGUAGE_VERSIONS;
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize="md">
        Language
      </Text>
      <Menu isLazy>
        <MenuButton as={Button}><Text fontSize="md">{language}</Text></MenuButton>
        <MenuList bg="#110c1b">
          {languages.map((lang) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ""}
              bg={lang === language ? "gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "gray.900",
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
export default LanguageSelector;
