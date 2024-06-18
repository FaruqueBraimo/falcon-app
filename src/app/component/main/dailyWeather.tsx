"use client";

import { getDate, getDay, getDayTime, getTime } from "@/app/actions/util";
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
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { FaCloudMoon } from "react-icons/fa";

export default function DaylyWeather({ daily }: any) {
  const isDataReady = Object.keys(daily || {}).length !== 0;

  return (
    <Fragment>
      {isDataReady ? (
        <Flex direction={["column", "row"]}>
          <Box p="1" w={{ base: "100%", md: "100%" }}>
            <TableContainer fontSize="sm">
              <Table variant="simple" fontSize="sm" size="sm">
                <TableCaption>Provided by Open Weather API</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Day</Th>
                    <Th>Temperature</Th>
                    <Th>Sunrise</Th>
                    <Th>Sunset</Th>
                  </Tr>
                </Thead>
                <Tbody color="black">
                  {daily.map((row: any, index: any) => {
                    return (
                      <Tr>
                        <Td key={index}>
                          {getDay(row.dt)} {getDate(row.dt)}
                        </Td>
                        <Tr key={index}>
                          <Stack direction={["column", "row"]} spacing="0.3rem">
                            <Box py="0.2rem">
                              <Text
                                fontSize={{ base: "sm", md: "sm" }}
                                mb="0.5rem"
                                color="black"
                              >
                                {row.temp.max} / {row.temp.min}
                              </Text>
                            </Box>
                            <Box pt="0.3rem" color="black">
                              °C
                            </Box>
                          </Stack>
                        </Tr>
                        <Td key={index}>{getTime(row.sunrise)}</Td>
                        <Td key={index}>{getTime(row.sunset)}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Day</Th>
                    <Th>Temperature</Th>
                    <Th>Sunrise</Th>
                    <Th>Sunset</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      ) : (
        <Box></Box>
      )}
    </Fragment>
  );
}
