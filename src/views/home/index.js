import React from "react";
import Header from "../../components/header";
import LatestProducts from "./latest-products";
import Welcome from "./welcome";

function Home() {
  return (
    <>
      <Header />
      <Welcome />
      <LatestProducts />
    </>
  );
}

export default Home;
