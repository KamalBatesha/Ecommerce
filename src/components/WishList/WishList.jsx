import React, { useContext, useEffect, useState } from "react";
import Style from "./WishList.module.css";
import { productsContext } from "../../context/productsContext";
import { cartContext } from "../../context/CartContext";
import ProductItem from "../ProductItem/ProductItem";

export default function WishList() {
  let { addToCart, setCartNum } = useContext(cartContext);

  let [cartLoading, setCartLoadin] = useState(false);

  let [allProducts, setAllProducts] = useState(null);
  let { getWishList } = useContext(productsContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    let res = await getWishList();
    setAllProducts(res.data.data);
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
      {allProducts?.map((item) => (
        <ProductItem
          product={item}
          key={item.id}
          addToCart={addProductToCart}
          loading={cartLoading}
        />
      ))}
    </div>
  );
}
