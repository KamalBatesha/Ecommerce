import React, { useEffect, useState } from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HashLoader } from "react-spinners";

export default function Categories() {
  let [categorys, setCategorys] = useState([]);

  useEffect(() => {
    getCategorys();
  }, []);
  function getCategorys() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategorys(data.data);
        console.log(data.data);
      });
  }
  if (categorys.length == 0) {
    return (
      <div>
        <HashLoader
          size={200}
          color="rgb(14 159 110)"
          style={{
            display: "inherit",
            position: "relative",
            height: "100px",
            width: "100%",
            transform: "rotate(165deg)",
            margin: "100px 0 50px",
          }}
        />
      </div>
    );
  }
  return (
    <div className="row">
      <Helmet>
        <title>all category</title>
      </Helmet>
      {categorys?.map((category) => {
        return (
          <div
            key={category._id}
            className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-4"
          >
            <Link to={`/productsByCategory/${category._id}`}>
              <div
                key={category.id}
                className=" w-full border group p-4 relative cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="mb-4 z-10 w-4/5 aspect-square mx-auto group-hover:-translate-y-5 group-hover:scale-125 group-hover:shadow-2xl transition-all duration-500 "
                />
                <h2 className=" opacity-0  text-lg relative bottom-8 -z-10 text-center group-hover:bottom-0 group-hover:opacity-100 transition-all duration-1000">
                  {category.name}
                </h2>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
