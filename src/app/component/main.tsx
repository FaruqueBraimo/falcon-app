"use client";

import { Fragment, useState } from "react";
import Economy from "./main/economy";

export default function Main({ economyInsight }: any) {
  return (
    <Fragment>
      <Economy data={economyInsight} />
    </Fragment>
  );
}
