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
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";

export default function LayoutRooter() {
  const [economyInsight, setEconomyInsight] = useState({});
  const [exchangeRate, setExchangeRate] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});
  const [metadata, setMetada] = useState({});
  const [isAuthenticated, setAutenticated] = useState(false);
  const [isSeaching, setIsSearching] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const [city, setCity] = useState("");

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
    const { economyInsight, exchangeRate, weatherForecast, metadata } =
      await getInsights({ city, isAuthenticated });

    setEconomyInsight(economyInsight);
    setExchangeRate(exchangeRate);
    setWeatherForecast(weatherForecast);
    setMetada(metadata)
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
      />
      {isSeaching && (
        <Box padding="6" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}

      {isDataReady ? (
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
      ) : (
        <Center h={{ base: "20px", md: "100px" }} color="black">
          {!isSeaching && (
            <Text fontSize={{ base: "sm", md: "md" }} mb="1rem">
              Ready to explore your destination city? Just search for it
            </Text>
          )}
        </Center>
      )}
      <ToastContainer />
    </Fragment>
  );
}
