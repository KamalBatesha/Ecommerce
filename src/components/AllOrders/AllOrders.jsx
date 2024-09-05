import React, { useContext, useEffect, useState } from "react";
import Style from "./AllOrders.module.css";
import { UserContext } from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";
import { Accordion } from "flowbite-react";
import CartItem from "../CartItem/CartItem";

export default function AllOrders() {
  let { userId } = useContext(UserContext);
  let { getAllOrders } = useContext(cartContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getOrders();
  }, [userId]);
  async function getOrders() {
    let response = await getAllOrders(userId);
    console.log(response);
    setOrders(response);
  }
  function getDate(date) {
    let newDate = new Date(date);
    let day = newDate.getDate().toString().padStart(2, "0");
    let month = (newDate.getMonth() + 1).toString();
    let year = newDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  if (orders == null) {
    return <div>Loading...</div>;
  } else if (orders == "empty") {
    return <div>No orders found</div>;
  } else {
    return (
      <div className="mt-5">
        <Accordion collapseAll>
          {orders?.map((item) => {
            return (
              <Accordion.Panel>
                <Accordion.Title className="px-4 py-8">
                  <div className="row">
                    <p>
                      date :
                      <span className="text-slate-950 font-bold ml-4 mr-6">
                        {getDate(item.createdAt)}
                      </span>
                    </p>
                    <p>
                      pay type:{" "}
                      <span className="text-slate-950 font-bold ml-4 mr-6">
                        {item.paymentMethodType}
                      </span>
                    </p>
                    <p>
                      is payed:
                      <span className="text-slate-950 font-bold ml-4 mr-6">
                        {item.isPaid ? "yes" : "no"}
                      </span>
                    </p>
                    <p>
                      is delivered:
                      <span className="text-slate-950 font-bold ml-4 mr-6">
                        {item.isDelivered ? "yes" : "no"}
                      </span>
                    </p>
                  </div>
                </Accordion.Title>
                <Accordion.Content>
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
                      </tr>
                    </thead>
                    <tbody>
                      {item.cartItems?.map((item) => (
                        <CartItem
                          key={item.id}
                          product={item}
                          actions={false}
                        />
                      ))}
                    </tbody>
                  </table>
                </Accordion.Content>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </div>
    );
  }
}
