import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import ProductDetailsCategories from "../ProductDetailsCategories/ProductDetailsCategories";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { productsContext } from "../../context/productsContext";
import { Helmet } from "react-helmet";
import { HashLoader } from "react-spinners";

export default function ProductDetails() {
  let [cartLoading, setCartLoading] = useState(false);
  let { id, categorieId } = useParams();
  let [data, setData] = useState(null);
  let [stars, setStars] = useState(null);
  // let [categories, setCategories] = useState(null);
  let { allProducts, setAllProducts } = useContext(productsContext);

  let { addToCart } = useContext(cartContext);

  console.log(id);
  console.log(categorieId);

  // useEffect(() => {
  //   getdata(id);
  //   // setData(fetchedData);
  // }, [id]);
  useEffect(() => {
    getdata(id);
  }, [id]);
  useEffect(() => {
    // console.log(products);
    console.log(allProducts);

    if (allProducts.length === 0 && categorieId != null) {
      getAllProducts();
      console.log(allProducts);
    }
  }, [allProducts]);

  function getAllProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        console.log(data.data);
        setAllProducts(data.data);
      });
  }
  function getdata(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        // console.log(res);

        setData(data.data);
        starsNum(data.data);
        console.log(data.data);
      });
  }
  // function getCategories(id) {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
  //     .then(({ data }) => {
  //       // console.log(res);

  //       setCategories(data.data);
  //       console.log(data.data);
  //       console.log(categories);
  //     });
  // }
  function starsNum(data) {
    let starsContainer = [];
    for (let i = 0; i < Math.floor(data.ratingsAverage); i++) {
      starsContainer.push(i);
    }
    setStars(starsContainer);
  }
  async function addProductToCart(id, quantity) {
    setCartLoading(true);
    if (quantity) {
      let data = await addToCart(id);
      if (data?.data?.message) {
        console.log(data);
        toast.success(data.data.message);
      } else {
        toast.error(data.response.data.message);
      }
    } else {
      toast.error("out of stock");
    }
    setCartLoading(false);
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div>
        <ul className={`flex items-center gap-2 ${Style.dots}`}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-full">
        <img src={data.images[i]} className="w-full h-full" alt="" />
      </div>
    ),
  };
  if (data == null) {
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
    <div className="row items-stretch w-4/5 mx-auto">
      {data ? (
        <>
          <Helmet>
            <title>{data.title}</title>
          </Helmet>
          <div className="md:w-2/5 w-full">
            <Slider {...settings}>
              {data.images?.map((image, index) => (
                <img key={index} src={image} alt={data.title} />
              ))}
            </Slider>
          </div>
          <div className="md:w-3/5 w-full md:pl-4 mt-40 md:mt-0 flex flex-col ">
            <h2 className="product-title text-5xl capitalize relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-20 after:bg-green-700 text-green-700 font-bold my-4 ">
              {data.title}
            </h2>

            <div className="product-rating">
              {stars.map((i) => (
                <i key={i} className=" text-yellow-300 fas fa-star"></i>
              ))}

              {Math.floor(data.ratingsAverage) < data.ratingsAverage && (
                <i className=" text-yellow-300 fas fa-star-half-alt"></i>
              )}
              <span className="text-slate-900 ml-1">
                {data.ratingsAverage}({data.ratingsQuantity})
              </span>
            </div>

            <div className="product-price my-4 font-bold">
              <p className="last-price">
                Old Price:
                <span className="font-normal line-through ml-2 text-red-600">
                  ${Math.floor(data.price * 1.1)}
                </span>
              </p>
              <p className="new-price">
                New Price:
                <span className="font-normal ml-2 text-blue-700">
                  ${data.price} (11%)
                </span>
              </p>
            </div>

            <div className="product-detail">
              <h2 className=" font-semibold text-xl capitalize text-slate-900 mb-3">
                about this item:
              </h2>
              <p className="p-2 opacity-80">{data.description}</p>

              <ul>
                <li className="my-2 font-semibold">
                  <span
                    className={`flex justify-center items-center  text-white p-1 mx-2 rounded-full ${
                      data.quantity == 0
                        ? "fas fa-xmark bg-red-700"
                        : "fas fa-check bg-green-800"
                    } `}
                  ></span>
                  Available:
                  {data.quantity == 0 ? (
                    <span className="bg-red-600 text-white p-1 ml-2 rounded-md">
                      out of the stock
                    </span>
                  ) : data.quantity < 100 ? (
                    <span className="bg-blue-600 text-white p-1 ml-2 rounded-md">
                      low quenty
                    </span>
                  ) : (
                    <span className="bg-green-600 text-white p-1 ml-2 rounded-md">
                      in the stock
                    </span>
                  )}
                </li>
                <li className="my-2 font-semibold">
                  <span className="flex justify-center items-center bg-green-800 text-white p-1 mx-2 rounded-full fas fa-check"></span>
                  Category:
                  <span className="font-normal opacity-80 text-gray-900">
                    {data.category.name}
                  </span>
                </li>
                <li className="my-2 font-semibold">
                  <span className="flex justify-center items-center bg-green-800 text-white p-1 mx-2 rounded-full fas fa-check"></span>
                  Shipping Area:
                  <span className="font-normal opacity-80 text-gray-900">
                    All over the world
                  </span>
                </li>
                <li className="my-2 font-semibold">
                  <span className="flex justify-center items-center bg-green-800 text-white p-1 mx-2 rounded-full fas fa-check"></span>
                  Shipping Fee:
                  <span className="font-normal opacity-80 text-gray-900">
                    Free
                  </span>
                </li>
              </ul>
            </div>

            <div className="purchase-info my-6">
              <input
                className="border border-gray-500 py-2 px-3 outline-0 mr-1 mb-4 rounded-3xl w-16"
                type="number"
                min="0"
                placeholder="1"
              />
              <button
                className="border border-gray-500 py-2 px-3 outline-0 mr-1 rounded-3xl mb-4 bg-green-600 text-white cursor-pointer hover:opacity-80 transition-all duration-300"
                type="button"
                onClick={() => addProductToCart(data.id, data.quantity)}
              >
                Add to Cart{" "}
                <i
                  className={
                    cartLoading
                      ? "fas fa-spinner fa-spin"
                      : " ml-1 fas fa-shopping-cart"
                  }
                ></i>
              </button>
            </div>

            <div className="social-links  flex items-center  ">
              <p className="mr-2">Share At: </p>
              <a
                className="flex justify-center items-center w-8 h-8 mx-3 rounded-full border transition-all duration-300 hover:bg-black hover:text-white"
                href="#"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="flex justify-center items-center w-8 h-8 mx-1 rounded-full border transition-all duration-300 hover:bg-black hover:text-white"
                href="#"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="flex justify-center items-center w-8 h-8 mx-1 rounded-full border transition-all duration-300 hover:bg-black hover:text-white"
                href="#"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                className="flex justify-center items-center w-8 h-8 mx-1 rounded-full border transition-all duration-300 hover:bg-black hover:text-white"
                href="#"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                className="flex justify-center items-center w-8 h-8 mx-1 rounded-full border transition-all duration-300 hover:bg-black hover:text-white"
                href="#"
              >
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {allProducts && categorieId ? (
            <ProductDetailsCategories
              products={allProducts}
              skipProductId={id}
              categorieId={categorieId}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
