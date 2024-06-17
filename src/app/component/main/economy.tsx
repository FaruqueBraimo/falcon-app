"use client";

import { getExtensionAmount } from "@/app/actions/util";
import { Box, Flex, Text, StackDivider, VStack } from "@chakra-ui/react";
import { Fragment } from "react";

export default function Economy({ economyInsight }: any) {
  return (
    <Fragment>
      {Object.keys(economyInsight).length !== 0 ? (
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
                    {economyInsight.country}
                  </Text>
                </Box>
                <Box px="1">/</Box>
                <Box>
                  <Text as="b" fontSize={{ base: "sm", md: "md" }} mb="1rem">
                    Population
                  </Text>
                </Box>
              </Flex>
              <Box>
                {getExtensionAmount(economyInsight.population)} (
                {economyInsight.year})
              </Box>
            </Box>
            <Box>
              <Flex gap="1">
                <Box>
                  <Text as="h2" fontSize={{ base: "sm", md: "md" }} mb="1rem">
                    {economyInsight.country}
                  </Text>
                </Box>
                <Box px="1">/</Box>
                <Box>
                  <Text as="b" fontSize={{ base: "sm", md: "md" }} mb="1rem">
                    Gross Domestic Product
                  </Text>
                </Box>
              </Flex>
              <Box>
                {getExtensionAmount(economyInsight.gdp)} USD (
                {economyInsight.year})
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
