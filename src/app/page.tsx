"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import Main from "./component/main";
import Header from "./component/header";
import { getInsights } from "./actions/insight";

export default function Home() {
  const [economyInsight, setEconomyInsight] = useState({});
  const [exchangeRate, setExchangeRate] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});

  async function onSearch(city: string) {
    const { economyInsight, exchangeRate, weatherForecast } = await getInsights(
      city
    );
    setEconomyInsight(economyInsight);
    setExchangeRate(exchangeRate);
    setWeatherForecast(weatherForecast);
  }

  return (
    <Fragment>
      <Header onSearch={onSearch} />
      <Main
        economyInsight={economyInsight}
        exchangeRate={exchangeRate}
        weatherForecast={weatherForecast}
      />
    </Fragment>
  );
}
