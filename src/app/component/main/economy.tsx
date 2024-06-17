"use client";

import { Box, Flex, Text, SimpleGrid, Spacer } from "@chakra-ui/react";
import { Fragment } from "react";

export default function Economy({ data }: any) {
  return (
    <Fragment>
      {Object.keys(data).length !== 0 ? (
        <Flex direction="column" p="1rem" py="3rem" px="5rem">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            gap="1rem"
            spacing="2rem"
            width="100%"
          >
            <Box
              padding="1.5rem"
              borderWidth="1px"
              boxShadow="sm"
              bg="white"
              overflow="hidden"
            >
              <Flex gap="1">
                <Box>
                  <Text as="h2" fontSize={{ base: "sm", md: "md" }} mb="1rem">
                    {data.country}
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
                {data.population} ({data.year})
              </Box>
            </Box>

            <Box
              padding="1.5rem"
              borderWidth="1px"
              boxShadow="sm"
              bg="white"
              overflow="hidden"
            >
              <Flex gap="1">
                <Box>
                  <Text as="h2" fontSize={{ base: "sm", md: "md" }} mb="1rem">
                    {data.country}
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
                {data.gdp} USD ({data.year})
              </Box>
            </Box>
          </SimpleGrid>
        </Flex>
      ) : (
        <Box> </Box>
      )}
    </Fragment>
  );
}
