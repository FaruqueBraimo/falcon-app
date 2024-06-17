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

export default function Main({ economyInsight, exchangeRate }: any) {
  const country = economyInsight?.country;
  return (
    <Fragment>
      <Box pb="0.5rem" px="5rem" pt="3rem">
        <Tag>Economy</Tag>
      </Box>
      <Flex direction="column" pb="1rem" px="5rem">
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
    </Fragment>
  );
}
