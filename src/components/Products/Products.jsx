import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "./Products.module.css";
import { productsContext } from "../../context/productsContext";
import { cartContext } from "../../context/CartContext";
import ProductItem from "../ProductItem/ProductItem";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Products() {
  let [cartLoading, setCartLoadin] = useState(false);
  let { allProducts, setAllProducts } = useContext(productsContext);
  let [filterProducts, setFilterProducts] = useState(allProducts);

  let { addToCart, cartNum, setCartNum } = useContext(cartContext);

  let [categories, setCategories] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [categoryType, setCategoryType] = useState("All categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  let searchRef = useRef();

  useEffect(() => {
    console.log(allProducts);
    getCategories();
    getAllProducts();

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
        setFilterProducts(data.data);
      });
  }
  async function addProductToCart(id, quantity) {
    setCartLoadin(true);
    if (quantity) {
      let data = await addToCart(id);
      if (data?.data?.message) {
        setCartNum(data?.data?.numOfCartItems);
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

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
        console.log(data.data);
      });
  }

  function searchByName(value) {
    setSearchTerm(value);
    applyFilters(value, categoryId);
  }

  function searchByCategory(id) {
    setCategoryId(id);
    applyFilters(searchTerm, id);
  }

  function applyFilters(searchValue, categoryId) {
    let newFilter = allProducts;

    if (searchValue) {
      newFilter = newFilter.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (categoryId) {
      newFilter = newFilter.filter((item) => item.category._id === categoryId);
    }

    setFilterProducts(newFilter);
  }

  return (
    <div>
      <Helmet>
        <title>all Products</title>
      </Helmet>
      <form
        className="max-w-lg mx-auto mt-7 relative"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(searchRef.current.value.trim());

          searchByName(searchRef.current.value.trim());
        }}
      >
        <div className="flex">
          <button
            onClick={() => {
              setDropdownVisible(!dropdownVisible);
            }}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            {categoryType}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              dropdownVisible ? "block" : "hidden"
            } absolute top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  onClick={() => {
                    setDropdownVisible(false);
                    setCategoryType("All categories");
                    searchByCategory(0);
                  }}
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  All categories
                </button>
              </li>
              {categories.map((item) => {
                return (
                  <li key={item._id}>
                    <button
                      onClick={() => {
                        setDropdownVisible(false);
                        setCategoryType(item.name);
                        searchByCategory(item._id);
                      }}
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative w-full">
            <input
              type="search"
              onChange={(e) => searchByName(e.target.value.trim())}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos, Design Templates..."
              ref={searchRef}
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      <div className={`row items-stretch`}>
        {filterProducts?.map((item) => (
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
