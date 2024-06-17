"use client";

import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Tag,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { Fragment } from "react";

export default function Exchange({ exchangeRate, country }: any) {
  const isDataReady = Object.keys(exchangeRate || {}).length !== 0;

  const currency = isDataReady ? `${Object.keys(exchangeRate.rates)[0]}` : "";
  const value = isDataReady ? ` ${Object.values(exchangeRate.rates)[0]}` : "";

  return (
    <Fragment>
      {isDataReady ? (
        <Box
          padding="1.5rem"
          borderWidth="1px"
          boxShadow="sm"
          bg="white"
          overflow="hidden"
        >
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            <Box>
              <Flex gap="1">
                <Box>
                  <Text as="h2" fontSize={{ base: "sm", md: "md" }} mb="1rem">
                    {country}
                  </Text>
                </Box>
                <Box px="1">/</Box>
                <Box>
                  <Text as="b" fontSize={{ base: "sm", md: "md" }} mb="1rem">
                    Exchange rate
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Text as="b" fontSize={{ base: "sm", md: "md" }} mb="1rem">
                  1 {exchangeRate.base} equals to {value} {currency}
                </Text>
              </Box>
              <Box pt="0.5rem">
                <Text as="sup" color="grey">
                  From {exchangeRate.date}
                </Text>
              </Box>
            </Box>
          </VStack>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Fragment>
  );
}
