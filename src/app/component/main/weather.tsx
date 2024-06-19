"use client";

import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Tag,
  StackDivider,
  VStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Fragment } from "react";
import CurrentWeather from "./currentWeather";
import DaylyWeather from "./dailyWeather";

export default function Wheather({ weatherForecast }: any) {
  const isDataReady = Object.keys(weatherForecast || {}).length !== 0;
  const dayForecast = isDataReady
    ? Object.keys(weatherForecast?.forecast?.daily).length
    : 0;

  return (
    <Fragment>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab color="black" fontSize="sm">
            Current Weather
          </Tab>
          <Tab color="black" fontSize="sm">
            {dayForecast} days Weather Forecast
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
            {isDataReady ? (
              <CurrentWeather current={weatherForecast.forecast.current} />
            ) : (
              <Box></Box>
            )}
          </TabPanel>
          <TabPanel>
            {isDataReady ? (
              <DaylyWeather daily={weatherForecast.forecast.daily} />
            ) : (
              <Box></Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Fragment>
  );
}
