"use client";

import { Box, Flex, Button, Text } from "@chakra-ui/react";
import Search from "./header/search";

export default function Header({ onSearch }: any) {
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

      <Search onSearch={onSearch} />

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
