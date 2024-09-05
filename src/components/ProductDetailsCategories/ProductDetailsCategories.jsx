import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetailsCategories.module.css";
import ProductItem from "../ProductItem/ProductItem";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetailsCategories({
  products,
  skipProductId,
  categorieId,
}) {
  let [cartLoading, setCartLoadin] = useState(false);

  const [productsList, setProductsList] = useState(
    // products.filter((product) => product.id !== skipProductId)
    []
  );
  let { addToCart } = useContext(cartContext);

  useEffect(() => {
    setProductsList(
      products.filter(
        (product) =>
          product.id !== skipProductId && product.category._id === categorieId
      )
    );
  }, [skipProductId, products]);
  // let[skipProductId]
  async function addProductToCart(id, quantity) {
    setCartLoadin(true);
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
    setCartLoadin(false);
  }

  return (
    <div className="mt-40  w-full">
      <h3 className="text-2xl text-green-800">similar products :</h3>

      <div className="row w-full">
        {productsList.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addToCart={addProductToCart}
            loading={cartLoading}
          />
        ))}
      </div>
    </div>
  );
}
