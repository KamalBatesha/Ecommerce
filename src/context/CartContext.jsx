import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

const headers = {
  token: localStorage.getItem("token"),
};

export default function CartContextProvider({ children }) {
  let [cartId, setCartId] = useState(null);
  let [cartNum, setCartNum] = useState(0);
  useEffect(() => {
    getCartDataNum();
  }, []);
  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((res) => res);
  }
  function removeFromCart(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

        { headers }
      )
      .then((res) => res)
      .catch((res) => res);
  }
  function addToCartQty(productId, qty) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: qty,
        },
        { headers }
      )
      .then((res) => res.data)
      .catch((res) => res);
  }
  function getCartData() {
    return axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/cart",

        { headers }
      )
      .then((res) => res.data)
      .catch((res) => res);
  }

  async function getCartDataNum() {
    let res = await getCartData();
    setCartNum(res.numOfCartItems);
  }
  function clearCart() {
    return axios
      .delete(
        "https://ecommerce.routemisr.com/api/v1/cart",

        { headers }
      )
      .then((res) => res)
      .catch((res) => res);
  }
  function checkOut(url, shippingAddress) {
    return axios
      .post(url, { shippingAddress }, { headers })
      .then((res) => res)
      .catch((res) => res);
  }
  function getAllOrders(userId) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => res.data)
      .catch((res) => res);
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        clearCart,
        getCartData,
        addToCartQty,
        cartId,
        setCartId,
        checkOut,
        getAllOrders,
        cartNum,
        setCartNum,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
