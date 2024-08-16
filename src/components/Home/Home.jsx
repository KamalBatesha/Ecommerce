import React, { useContext, useEffect, useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";
import { Carousel } from "flowbite-react";
import img1 from "../../assets/imgs/carousel/1.avif";
import img2 from "../../assets/imgs/carousel/2.avif";
import img3 from "../../assets/imgs/carousel/3.avif";
import img4 from "../../assets/imgs/carousel/4.avif";
import { UserContext } from "../../context/UserContext";

export default function Home() {
  const [data, setData] = useState([]);
  let { setUser, setToken } = useContext(UserContext);

  useEffect(() => {
    if (
      localStorage.getItem("userName") != null &&
      localStorage.getItem("token") != null
    ) {
      setUser(localStorage.getItem("userName"));
      setToken(localStorage.getItem("token"));
    }
    getAllProducts();
  }, []);
  function getAllProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products?page=2")
      .then((res) => {
        // console.log(res);

        setData(res.data.data);
        // console.log(data);
      });
  }

  return (
    <div>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-5">
        <Carousel>
          <img className="h-full" src={img1} alt="..." />
          <img className="h-full" src={img2} alt="..." />
          <img className="h-full" src={img3} alt="..." />
          <img className="h-full" src={img4} alt="..." />
        </Carousel>
      </div>
    </div>
  );
}
