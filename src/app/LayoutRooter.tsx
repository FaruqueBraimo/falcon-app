"use client";

import { Fragment, useContext, useEffect, useState } from "react";
import Main from "./component/main";
import Header from "./component/header";
import { getInsights } from "./actions/insight";
import { AuthContext } from "./contexts/AuthContext";
import React from "react";
import { parseCookies } from "nookies";
import {
  Box,
  Center,
  Flex,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import MapComponent from "./component/map";
import { isValid } from "./actions/util";

export default function LayoutRooter() {
  const [economyInsight, setEconomyInsight] = useState({});
  const [exchangeRate, setExchangeRate] = useState({});
  const [weatherForecast, setWeatherForecast]: any = useState({});
  const [metadata, setMetada] = useState({});
  const [isAuthenticated, setAutenticated] = useState(false);
  const [isSeaching, setIsSearching] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const [city, setCity] = useState("");
  const toast = useToast();

  const { login, register } = useContext(AuthContext);

  type registrationRequest = {
    username: string;
    password: string;
  };

  useEffect(() => {
    const { "falcon.token": token } = parseCookies();

    if (token !== "" && token !== null && token !== undefined) {
      setAutenticated(true);
    }

    if (Object.keys(economyInsight || {}).length !== 0) {
      setDataReady(true);
    }
  }, [economyInsight]);

  async function onSearch(city: string) {
    setIsSearching(true);

    setEconomyInsight({});
    setExchangeRate({});
    setWeatherForecast({});
    setCity(city);
    const { economyInsight, exchangeRate, weatherForecast, metadata, error } =
      await getInsights({ city, isAuthenticated });

    if (!isValid(error)) {
      setEconomyInsight(economyInsight);
      setExchangeRate(exchangeRate);
      setWeatherForecast(weatherForecast);
      setMetada(metadata);
    } else {
      toast({
        title: error,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }

    setIsSearching(false);
  }

  async function onLogin(data: any) {
    const user: registrationRequest = {
      username: data.username,
      password: data.password,
    };
    login(user);
  }

  async function onRegister(data: any) {
    const user: registrationRequest = {
      username: data.username,
      password: data.password,
    };
    register(user);
  }

  return (
    <Fragment>
      <Header
        onSearch={onSearch}
        onLogin={onLogin}
        isAuthenticated={isAuthenticated}
        isSeaching={isSeaching}
      />
      {isSeaching && (
        <Flex direction="column" pb="1rem" px={{ base: "3rem", md: "17rem" }}>
          <Box padding="6" bg="white">
            <SkeletonText
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="10"
            />

            <SkeletonText
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="10"
            />
          </Box>
        </Flex>
      )}

      {isDataReady ? (
        <>
          <Main
            economyInsight={economyInsight}
            exchangeRate={exchangeRate}
            isAuthenticated={isAuthenticated}
            weatherForecast={weatherForecast}
            onRegister={onRegister}
            city={city}
            isSeaching={isSeaching}
            metadata={metadata}
          />
          <MapComponent location={weatherForecast?.forecast?.location} />
        </>
      ) : (
        <Center h={{ base: "20px", md: "100px" }} color="black">
          {!isSeaching && (
            <Text fontSize={{ base: "sm", md: "md" }} mb="1rem">
              Ready to explore your destination city? Just search for it
            </Text>
          )}
        </Center>
      )}
    </Fragment>
  );
}
