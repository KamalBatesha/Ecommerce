import React, { useEffect, useState } from "react";
import Style from "./BrandsSlider.module.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BrandsSlider() {
  let [brands, setBrands] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    swipeToSlide: true,
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} `}
        style={{
          ...style,
          right: "0px",
          zIndex: "5",
          height: "100%",
          width: "40px",
          backgroundColor: "rgba(5, 122, 85,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          left: "0px ",
          zIndex: "5",
          height: "100%",
          width: "40px",
          backgroundColor: "rgba(5, 122, 85,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      />
    );
  }
  function getBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => {
        setBrands(data.data.slice(0, 10));
      });
  }
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <div className="slider-container mt-5">
      <Slider {...settings}>
        {brands?.map((item) => {
          return (
            <Link key={item._id} to={`/productsByBrand/${item._id}`}>
              <div className="aspect-square p-3	 cursor-pointer group relative  overflow-hidden rounded-full">
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    className=" h-full aspect-square rounded-full"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className=" transition-all duration-300 opacity-0 group-hover:opacity-100 bg-green-600 bg-opacity-80 text-white absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  <h3>{item.name}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
      <div className="mt-2 text-right text-green-900">
        <Link to="/brands">view all brands</Link>
      </div>
    </div>
  );
}
