"use client";

import {
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ onSearch }: any) {
  const [city, setCity] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch() {
    const params = new URLSearchParams(searchParams);
    if (city != "") {
      params.set("q", city);
      onSearch(city);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Box flex="2" m={{ base: "1rem 0", md: "0 10rem" }}>
      <Flex align="center">
        <InputGroup size={{ base: "sm", md: "md" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Type your city destination..."
            name={city}
            onChange={(e: any) => {
              setCity(e.target.value);
            }}
            onKeyDown={(e: any) => {
              e.key === "Enter" ? handleSearch() : null;
            }}
            variant="filled"
          />
          <InputRightAddon width="5.rem" bg="black">
            <Button
              size="md"
              w="100%"
              colorScheme="black"
              onClick={() => handleSearch()}
            >
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Flex>
    </Box>
  );
}
