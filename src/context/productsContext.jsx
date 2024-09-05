import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast/headless";

const headers = {
  token: localStorage.getItem("token"),
};

export let productsContext = createContext();

export default function ProductsContextProvider({ children }) {
  let [allProducts, setAllProducts] = useState([]);
  let [favId, setFavId] = useState([]);
  function getWishList() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((res) => res);
  }
  async function setIdWish() {
    let res = await getWishList();
    setFavId(res.data.data.map((item) => item.id));
  }
  useEffect(() => {
    setIdWish();
  }, []);

  function setWishListApi(productId) {
    console.log(headers);
    console.log(productId);
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        { headers }
      )
      .then((data) => data)
      .catch((res) => res);
  }

  function removeWishListApi(productId) {
    console.log(headers);
    console.log(productId);
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

        { headers }
      )
      .then((data) => data)
      .catch((res) => res);
  }

  async function setWishList(productId) {
    if (favId.includes(productId)) {
      let res = await removeWishListApi(productId);
      if (res.data?.status == "success") {
        setFavId(res.data.data);
      }
    } else {
      // console.log(res);
      let res = await setWishListApi(productId);
      if (res.data?.status == "success") {
        setFavId(res.data.data);
      }
    }
  }

  //   //   useEffect(() => {
  //   getAllProducts();
  //   //   }, []);

  //   function getAllProducts() {
  //     axios
  //       .get("https://ecommerce.routemisr.com/api/v1/products")
  //       .then(({ data }) => {
  //         console.log(data);

  //         setProducts(data.data);
  //       });
  //   }

  return (
    <productsContext.Provider
      value={{
        allProducts,
        setAllProducts,
        favId,
        setFavId,
        setWishList,
        getWishList,
      }}
    >
      {children}
    </productsContext.Provider>
  );
}
