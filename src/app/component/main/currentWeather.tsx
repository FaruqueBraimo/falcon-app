"use client";

import { getDayTime } from "@/app/actions/util";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Tag,
  StackDivider,
  VStack,
  Spacer,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { FaCloudMoon } from "react-icons/fa";

export default function currentWeather({ current }: any) {
  const isDataReady = Object.keys(current || {}).length !== 0;

  return (
    <Fragment>
      {isDataReady ? (
        <Flex direction={["column", "row"]}>
          <Box p="4" w={{ base: "100%", md: "60%" }}>
            <Stack direction={["column", "row"]} spacing="0.3rem">
              <Box>
                <FaCloudMoon color="#FFE068" size="2.5rem" />
              </Box>
              <Box py="0.2rem">
                <Text
                  as="b"
                  fontSize={{ base: "sm", md: "2xl" }}
                  mb="0.5rem"
                  color="black"
                >
                  {current.temp}
                </Text>
              </Box>
              <Box pt="0.3rem" color="black">
                °C
              </Box>
              <Box pt="0.3rem" color="black" pl="0.3rem">
                <SimpleGrid minChildWidth="120px">
                  <Box>
                    <Text as="sup">Humidity: {current.humidity}</Text>
                  </Box>

                  <Box>
                    <Text as="sup">Pressure: {current.pressure}</Text>
                  </Box>
                  <Box>
                    <Text as="sup">Wind: {current.wind_speed}</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Stack>
          </Box>
          <Spacer />
          <Box p={{ base: "0", md: "4" }} w={{ base: "100%", md: "40%" }}>
            <VStack spacing={0.2} align={{ base: "normal", md: "stretch" }}>
              <Text color="black" as="b" fontSize={{ base: "sm", md: "md" }}>
                Weather
              </Text>
              <Text color="black" fontSize={{ base: "sm", md: "md" }}>
                {getDayTime(current.dt)}
              </Text>
              <Text color="black" fontSize={{ base: "sm", md: "md" }}>
                {current.summary || "Enjoy!"}
              </Text>
            </VStack>
          </Box>
        </Flex>
      ) : (
        <Box></Box>
      )}
    </Fragment>
  );
}
