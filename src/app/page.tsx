import Image from "next/image";
import { Fragment } from "react";
import Header from "./component/header";
import Main from "./component/main";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
}
