"use client";

import { Fragment, useState } from "react";
import Economy from "./main/economy";
import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  StackDivider,
  Tag,
  VStack,
} from "@chakra-ui/react";
import Exchange from "./main/exchange";
import Wheather from "./main/weather";

export default function Main({
  economyInsight,
  exchangeRate,
  weatherForecast,
}: any) {
  const country = economyInsight?.country;
  return (
    <Fragment>
      <Flex direction="column" pb="1rem" px={{ base: "3rem", md: "17rem" }}>
        <Box pt="1rem" pb="0.3rem">
          <Tag>Economy</Tag>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap="1rem"
          spacing="2rem"
          width="100%"
        >
          <Economy economyInsight={economyInsight} />
          <Exchange exchangeRate={exchangeRate} country={country} />
        </SimpleGrid>
      </Flex>
      <Divider />

      <Flex direction="column" pb="1rem" px={{ base: "3rem", md: "17rem" }}>
        <Box pt="1rem" pb="0.3rem">
          <Tag>Weather Forecast</Tag>
        </Box>
        <Box
          w="100%"
          p={4}
          color="white"
          borderWidth="1px"
          boxShadow="sm"
          bg="white"
          overflow="hidden"
        >
          <Wheather weatherForecast={weatherForecast} />
        </Box>
      </Flex>

      <Divider />
    </Fragment>
  );
}
