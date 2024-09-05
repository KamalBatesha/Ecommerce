import React, { useEffect, useState } from "react";
import Style from "./Brands.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {
  let [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands();
  }, []);
  function getBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => {
        setBrands(data.data);
        console.log(data.data);
      });
  }
  return (
    <div className="row">
      <Helmet>
        <title>all Brands</title>
      </Helmet>
      {brands?.map((brand) => {
        return (
          <div
            key={brand._id}
            className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-4"
          >
            <Link to={`/productsByBrand/${brand._id}`}>
              <div
                key={brand.id}
                className=" w-full border group p-4 relative cursor-pointer"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="mb-4 z-10 w-4/5 mx-auto group-hover:-translate-y-5 group-hover:scale-125 group-hover:shadow-2xl transition-all duration-500 "
                />
                <h2 className=" opacity-0  text-lg relative bottom-8 -z-10 text-center group-hover:bottom-0 group-hover:opacity-100 transition-all duration-1000">
                  {brand.name}
                </h2>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
