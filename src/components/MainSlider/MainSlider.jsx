import React, { useEffect, useState } from "react";
import Style from "./MainSlider.module.css";
import sliderImage1 from "../../assets/carousel/1.avif";
import sliderImage2 from "../../assets/carousel/2.avif";
import sliderImage3 from "../../assets/carousel/3.avif";
import Slider from "react-slick";

export default function MainSlider() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: "5px", zIndex: "5" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: "5px ", zIndex: "5" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    className: Style.slider,
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className={`mt-5 `}>
      <Slider {...settings}>
        <img src={sliderImage1} />
        <img src={sliderImage2} />
        <img src={sliderImage3} />
      </Slider>
    </div>
  );
}
