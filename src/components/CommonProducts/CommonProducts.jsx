import React, { useContext, useEffect, useState } from "react";
import Style from "./CommonProducts.module.css";
import ProductItem from "../ProductItem/ProductItem";
import axios from "axios";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { productsContext } from "../../context/productsContext";

export default function CommonProducts() {
  let [cartLoading, setCartLoadin] = useState(false);
  let { allProducts, setAllProducts } = useContext(productsContext);
  // let [products, setProducts] = useState(allProducts);
  let { addToCart, cartNum, setCartNum } = useContext(cartContext);
  useEffect(() => {
    // console.log(products);
    console.log(allProducts);

    if (allProducts.length == 0) {
      getAllProducts();
    }
  }, []);

  function getAllProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        // console.log(res);

        console.log(data.data);
        // setProducts(data.data);
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
    <div className="pt-7">
      <h3 className="text-green-500 font-bold uppercase text-center text-2xl">
        common products
      </h3>

      <div className={`row items-stretch`}>
        {allProducts?.map((item) => (
          <ProductItem
            product={item}
            key={item.id}
            addToCart={addProductToCart}
            loading={cartLoading}
          />
        ))}
      </div>
    </div>
  );
}
