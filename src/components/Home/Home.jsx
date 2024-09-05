import React, { useContext, useEffect, useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";

import { UserContext } from "../../context/UserContext";
import MainSlider from "./../MainSlider/MainSlider";
import BrandsSlider from "../BrandsSlider/BrandsSlider";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import CommonProducts from "../CommonProducts/CommonProducts";
import { Helmet } from "react-helmet";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {}, []);

  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <BrandsSlider />
      <CategoriesSlider />
      <CommonProducts />
    </section>
  );
}
