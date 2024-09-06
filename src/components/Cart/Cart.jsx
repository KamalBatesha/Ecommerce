import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { cartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import { Helmet } from "react-helmet";
import { HashLoader } from "react-spinners";

export default function Cart() {
  let {
    removeFromCart,
    clearCart,
    getCartData,
    addToCartQty,
    cartId,
    setCartId,
    setCartNum,
  } = useContext(cartContext);
  let [cartData, setCartData] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    let response = await getCartData();

    setCartData(response);
    setCartId(response.cartId);
    console.log(response);
  }
  async function changeQty(id, qty) {
    if (qty < 1) return;
    let response = await addToCartQty(id, qty);

    setCartData(response);
    console.log(response);
  }
  async function remove(id) {
    let response = await removeFromCart(id);

    setCartData(response.data);
    setCartNum(response?.data?.numOfCartItems);

    console.log(response.data, "remove");
  }
  async function clear() {
    let response = await clearCart();
    if ((response.data.message = "success")) {
      setCartNum(0);
      setCartData({ numOfCartItems: 0 });
    }
    console.log(response);
  }
  function checkOut() {
    setLoading(true);
    navigate(`/checkOut/${cartId}`);
    setLoading(false);
  }

  if (cartData == null) {
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
    <div>
      <Helmet>
        <title>cart</title>
      </Helmet>
      {cartData?.numOfCartItems != 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartData?.data?.products?.map((item) => {
                return (
                  <CartItem
                    key={item.product._id}
                    product={item}
                    actions={true}
                    changeQty={changeQty}
                    remove={remove}
                  />
                  // <tr
                  //   key={item.product._id}
                  //   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  // >
                  //   <td className="p-4">
                  //     <Link
                  //       to={`/productDetails/${item.product._id}/${item.product.category._id}`}
                  //     >
                  //       <img
                  //         src={item.product.imageCover}
                  //         className="w-16 md:w-32 max-w-full max-h-full"
                  //         alt={item.title}
                  //       />
                  //     </Link>
                  //   </td>
                  //   <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  //     {item.product.title}
                  //   </td>
                  //   <td className="px-6 py-4">
                  //     <div className="flex items-center">
                  //       <button
                  //         className={`${
                  //           item.count == 1 ? " opacity-20 " : "opacity-100"
                  //         }inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
                  //         type="button"
                  //         disabled={item.count == 1}
                  //         onClick={() =>
                  //           changeQty(item.product._id, item.count - 1)
                  //         }
                  //       >
                  //         <span className="sr-only">Quantity button</span>
                  //         <svg
                  //           className="w-3 h-3"
                  //           aria-hidden="true"
                  //           xmlns="http://www.w3.org/2000/svg"
                  //           fill="none"
                  //           viewBox="0 0 18 2"
                  //         >
                  //           <path
                  //             stroke="currentColor"
                  //             strokeLinecap="round"
                  //             strokeLinejoin="round"
                  //             strokeWidth={2}
                  //             d="M1 1h16"
                  //           />
                  //         </svg>
                  //       </button>
                  //       <div>
                  //         <input
                  //           type="number"
                  //           id="first_product"
                  //           className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  //           value={item.count}
                  //           required
                  //         />
                  //       </div>
                  //       <button
                  //         className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  //         type="button"
                  //         onClick={() =>
                  //           changeQty(item.product._id, item.count + 1)
                  //         }
                  //       >
                  //         <span className="sr-only">Quantity button</span>
                  //         <svg
                  //           className="w-3 h-3"
                  //           aria-hidden="true"
                  //           xmlns="http://www.w3.org/2000/svg"
                  //           fill="none"
                  //           viewBox="0 0 18 18"
                  //         >
                  //           <path
                  //             stroke="currentColor"
                  //             strokeLinecap="round"
                  //             strokeLinejoin="round"
                  //             strokeWidth={2}
                  //             d="M9 1v16M1 9h16"
                  //           />
                  //         </svg>
                  //       </button>
                  //     </div>
                  //   </td>
                  //   <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  //     ${item.price}
                  //   </td>
                  //   <td className="px-6 py-4">
                  //     <button
                  //       onClick={() => remove(item.product._id)}
                  //       className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  //     >
                  //       Remove
                  //     </button>
                  //   </td>
                  // </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-full p-6">
            <div className="row justify-between">
              <p>
                total price :{" "}
                <span className="text-xl font-extrabold">
                  ${cartData.data.totalCartPrice}
                </span>
              </p>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={clear}
              >
                clear cart
              </button>
            </div>
            <div className=" text-center">
              <button
                onClick={checkOut}
                className="w-full md:w-32  p-3 md:rounded-xl bg-green-700 hover:bg-green-500 transition-all duration-300 text-white"
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "ckeck out"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-3xl text-center font-extrabold mt-7">
          no products in the cart
        </p>
      )}
    </div>
  );
}
