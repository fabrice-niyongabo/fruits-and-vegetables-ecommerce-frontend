import React, { useEffect } from "react";
import Header from "../../components/header";
import { useLoadBasicData } from "../../helpers";
import Categories from "./categories";
import LatestProducts from "./latest-products";
import Welcome from "./welcome";

function Home() {
  const loadData = useLoadBasicData();
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />
      <Welcome />
      <Categories />
      <LatestProducts />
    </>
  );
}

export default Home;
