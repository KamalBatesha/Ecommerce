import React, { useEffect, useState } from "react";
import Style from "./CartItem.module.css";
import { Link } from "react-router-dom";

export default function CartItem({ product, actions, remove, changeQty }) {
  return (
    <tr
      key={product.product._id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td className="p-4">
        <Link
          to={`/productDetails/${product.product._id}/${product.product.category._id}`}
        >
          <img
            src={product.product.imageCover}
            className="w-16 md:w-32 max-w-full max-h-full"
            alt={product.title}
          />
        </Link>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          {actions && (
            <button
              className={`${
                product.count == 1 ? " opacity-20 " : "opacity-100"
              }inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
              type="button"
              disabled={product.count == 1}
              onClick={() => changeQty(product.product._id, product.count - 1)}
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
          )}
          <div>
            <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {product.count}
            </span>
          </div>
          {actions && (
            <button
              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => changeQty(product.product._id, product.count + 1)}
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ${product.price}
      </td>
      {actions && (
        <td className="px-6 py-4">
          <button
            onClick={() => remove(product.product._id)}
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
          >
            Remove
          </button>
        </td>
      )}
    </tr>
  );
}
