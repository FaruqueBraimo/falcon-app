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
import CurrentWeather from "./currentWeather";

export default function Wheather({ weatherForecast }: any) {
  const isDataReady = Object.keys(weatherForecast || {}).length !== 0;

  return (
    <Fragment>
      {isDataReady ? (
        <CurrentWeather current={weatherForecast.forecast.current} />
      ) : (
        <Box></Box>
      )}
    </Fragment>
  );
}
