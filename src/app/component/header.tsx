"use client";

import {
  Box,
  Flex,
  useBreakpointValue,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function WithSubnavigation() {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      p="1rem"
      px="3rem"
      borderBottom="2px solid #E2E8F0"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box mb={{ base: "1rem", md: 0 }}>
        <Text as="b">Falcon</Text>
      </Box>

      <Box flex="2" m={{ base: "1rem 0", md: "0 10rem" }}>
        <Flex align="center">
          <InputGroup size={{ base: "sm", md: "md" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Type your destination..." variant="filled" />
            <InputRightAddon width="5.rem" bg="black">
              <Button size="md" w="100%" colorScheme="black">
                Search
              </Button>
            </InputRightAddon>
          </InputGroup>
        </Flex>
      </Box>

      <Box>
        <Button
          variant="outline"
          colorScheme="black"
          ml={{ base: 0, md: "1rem" }}
          size={{ base: "sm", md: "md" }}
        >
          Login
        </Button>
      </Box>
    </Flex>
  );
}
