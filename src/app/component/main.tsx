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
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Exchange from "./main/exchange";
import Wheather from "./main/weather";
import { getHistoricalInsights } from "../actions/insight";
import { createRoot } from "react-dom/client";
import Chart from "react-google-charts";
import Register from "./main/auth/signup";
import { LatLngExpression } from "leaflet";

const data = [
  ["Year", "$"],
  ["2012", 1.5],
  ["2013", 40],
  ["2014", 20],
  ["2015", 26],
  ["2016", 27],
  ["2017", 30],
  ["2018", 30],
  ["2019", 30],
  ["2022", 30],
];

const position: LatLngExpression = [51.505, -0.09];

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

  const [historicalGdp, setHistoricalGdp] = useState<[string, string][]>([]);
  const [historicalPop, setHistoricalPop] = useState<[string, string][]>([]);

  async function getHistory() {
    if (isAuthenticated || city !== "") {
      const { gdp, population }: any = await getHistoricalInsights(
        economyInsight?.country
      );

      const gdpArray: [string, string][] = [["year", "GDP"]];
      let popArray: [string, string][] = [["year", "Population"]];

      if (population) {
        population.forEach((entry: any) => {
          popArray.push([entry.year.toString(), entry.value]);
        });
        setHistoricalPop(popArray);
      }

      if (gdp) {
        gdp.forEach((entry: any) => {
          gdpArray.push([entry.year.toString(), entry.value]);
        });
      }
      setHistoricalGdp(gdpArray);
    }
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
                            Want to see Exchange Rates, please :
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
                  {historicalPop?.length !== 0 ? (
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      gap="1rem"
                      spacing="2rem"
                      width="100%"
                    >
                      <Box>
                        <Text as="sub">GDP of {country} IN 10 Year</Text>

                        <Chart
                          chartType="Line"
                          width="100%"
                          height="50"
                          data={historicalGdp}
                        />
                      </Box>
                      <Box>
                        <Text as="sub">Population of {country} IN 10 Year</Text>
                        <Chart
                          chartType="Line"
                          width="100%"
                          height="50rem"
                          data={historicalPop}
                        />
                      </Box>
                    </SimpleGrid>
                  ) : (
                    <Button
                      variant="outline"
                      colorScheme="black"
                      ml={{ base: 0, md: "1rem" }}
                      size={{ base: "sm", md: "md" }}
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
                        Want to see weather forecast, please :
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
