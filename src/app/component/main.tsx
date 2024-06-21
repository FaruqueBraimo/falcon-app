"use client";

import { Fragment, useEffect, useState } from "react";
import Economy from "./main/economy";
import {
  Box,
  Button,
  Divider,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  useDisclosure,
  useToast,
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
import Exchange from "./main/exchange";
import Wheather from "./main/weather";
import { getHistoricalInsights } from "../actions/insight";
import Chart from "react-google-charts";
import Register from "./main/auth/signup";
import { chartDataFormater, getDate, getDay, getTime, isValid } from "../actions/util";

import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";



export default function Main({
  economyInsight,
  exchangeRate,
  weatherForecast,
  isAuthenticated,
  onRegister,
  city,
  isSeaching,
  metadata,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [historicalGdp, setHistoricalGdp]: any = useState([]);
  const [historicalPop, setHistoricalPop]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function getHistory() {
    if (isAuthenticated && city !== "") {
      setIsLoading(true);
      const { gdp, population, error }: any = await getHistoricalInsights(
        economyInsight?.country
      );

      if (isValid(error)) {
        toast({
          title: error,
          status: "error",
          isClosable: true,
          position: "top",
        });
      } else {
        setHistoricalGdp(gdp);
        setHistoricalPop(population);
      }
    } else {
      toast({
        title: "Please Login or sign up",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
    setIsLoading(false);
  }

  const country = economyInsight?.country;
  return (
    <Fragment>
      {!isSeaching && (
        <>
          <Flex direction="column" pb="1rem" px={{ base: "3rem", md: "17rem" }}>
            <Box pt="1rem" pb="0.3rem">
              <Tag>Economy</Tag>
            </Box>

            <Tabs position="relative" variant="unstyled">
              <TabList>
                <Tab color="black" fontSize="sm">
                  Current
                </Tab>
                <Tab color="black" fontSize="sm">
                  Past 10 Years
                </Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    gap="1rem"
                    spacing="2rem"
                    width="100%"
                  >
                    <Economy economyInsight={economyInsight} />

                    {isAuthenticated ? (
                      <Exchange exchangeRate={exchangeRate} country={country} />
                    ) : (
                      <Flex>
                        <Box flex="1">
                          <Text color="black">
                            Want to see Exchange Rates? Please :
                          </Text>
                        </Box>

                        <Box color="teal">
                          <Button
                            variant="outline"
                            colorScheme="black"
                            ml={{ base: 0, md: "1rem" }}
                            size={{ base: "sm", md: "md" }}
                            onClick={onOpen}
                          >
                            Sing Up
                          </Button>
                        </Box>
                      </Flex>
                    )}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel width="100%" color="teal">
                  {Object.keys(historicalPop)?.length !== 0 ? (
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      gap="1rem"
                      spacing="2rem"
                      width="100%"
                    >
                      <Box>
                        <Box w={{ base: "100%", md: "100%" }}>
                          <Text as="sub" p={3}>
                            Population of {country} IN 10 Year
                          </Text>

                          <ResponsiveContainer
                            width="100%"
                            aspect={2}
                            height="100%"
                          >
                            <LineChart
                              width={500}
                              height={300}
                              data={historicalPop}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis tickFormatter={chartDataFormater} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Box>
                      </Box>
                      <Box w={{ base: "100%", md: "100%" }}>
                        <Text as="sub" mb="10">
                          GDP of {country} IN 10 Year
                        </Text>

                        <ResponsiveContainer
                          width="100%"
                          aspect={2}
                          height="100%"
                        >
                          <LineChart
                            width={500}
                            height={300}
                            data={historicalGdp}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis tickFormatter={chartDataFormater} />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </SimpleGrid>
                  ) : (
                    <Button
                      variant="outline"
                      colorScheme="black"
                      ml={{ base: 0, md: "1rem" }}
                      size={{ base: "sm", md: "md" }}
                      isLoading={isLoading}
                      loadingText="Fetching..."
                      onClick={getHistory}
                    >
                      Fetch History
                    </Button>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
          <Divider />

          {metadata?.country != true ? (
            <Flex
              direction="column"
              pb="1rem"
              px={{ base: "3rem", md: "17rem" }}
            >
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
                {isAuthenticated ? (
                  <Wheather weatherForecast={weatherForecast} />
                ) : (
                  <Flex>
                    <Box flex="1">
                      <Text color="black">
                        Want to see Weather Forecast? Please :
                      </Text>
                    </Box>

                    <Box color="teal">
                      <Button
                        variant="outline"
                        colorScheme="black"
                        ml={{ base: 0, md: "1rem" }}
                        size={{ base: "sm", md: "md" }}
                        onClick={onOpen}
                      >
                        Sing Up
                      </Button>
                    </Box>
                  </Flex>
                )}
              </Box>
            </Flex>
          ) : (
            <></>
          )}
        </>
      )}
      <Register isOpen={isOpen} onClose={onClose} onRegister={onRegister} />
    </Fragment>
  );
}
