"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import Main from "./component/main";
import Header from "./component/header";
import { getInsights } from "./actions/insight";

export default function Home() {
  const [economyInsight, setEconomyInsight] = useState({});

  async function onSearch(city: string) {
    const { economyInsight } = await getInsights(city);
    setEconomyInsight(economyInsight);
  }

  return (
    <Fragment>
      <Header onSearch={onSearch} />
      <Main economyInsight={economyInsight} />
    </Fragment>
  );
}
