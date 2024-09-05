import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductsByCategory.module.css";
import { productsContext } from "../../context/productsContext";
import { useParams } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import axios from "axios";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ProductsByCategory() {
  let { allProducts, setAllProducts } = useContext(productsContext);
  let [cartLoading, setCartLoadin] = useState(false);
  let { addToCart, setCartNum } = useContext(cartContext);

  let { id } = useParams();
  useEffect(() => {
    console.log(allProducts);

    if (allProducts.length == 0) {
      getAllProducts();
    }
  }, []);
  function getAllProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        console.log(data.data);
        setAllProducts(data.data);
      });
  }
  async function addProductToCart(id, quantity) {
    setCartLoadin(true);
    if (quantity) {
      let data = await addToCart(id);
      if (data?.data?.message) {
        console.log(data);
        setCartNum(data?.data?.numOfCartItems);

        toast.success(data.data.message);
      } else {
        toast.error(data.response.data.message);
      }
    } else {
      toast.error("out of stock");
    }
    setCartLoadin(false);
  }

  return (
    <div className="row">
      <Helmet>
        <title>products by category</title>
      </Helmet>
      {allProducts?.map((product) => {
        if (product.category._id == id) {
          return (
            <ProductItem
              product={product}
              key={product._id}
              addToCart={addProductToCart}
              loading={cartLoading}
            />
          );
        }
      })}
    </div>
  );
}
