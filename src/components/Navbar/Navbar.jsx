import React, { useContext, useEffect, useState } from "react";
import Style from "./Navbar.module.css";
import logo from "../../assets/logo-main.png";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";

export default function Navbar() {
  const [show, setshow] = useState(false);
  let { user, token, setUser, setToken } = useContext(UserContext);
  let { cartNum } = useContext(cartContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  }
  return (
    <nav
      className={`fixed z-40 top-0 left-0 right-0 bg-gray-100 py-2 lg:h-fit overflow-hidden ${
        show ? "h-fit" : "h-[50px]"
      }`}
    >
      <div className="flex justify-between lg:items-center flex-col lg:flex-row container  mx-auto p-2">
        <div className="flex lg:items-center flex-col lg:flex-row ">
          <div className="flex justify-between items-center">
            <img width={110} src={logo} alt="fresh cart logo" />
            <div className="lg:hidden">
              <i
                onClick={() => setshow(!show)}
                className="fas fa-bars cursor-pointer"
              ></i>
            </div>
          </div>
          <ul className=" flex flex-col lg:flex-row items-center">
            {token != null ? (
              <>
                <li className="mx-2 py-2 lg:py-0">
                  <NavLink
                    className="capitalize text-lg text-slate-900 font-light"
                    to="categories"
                  >
                    categories
                  </NavLink>
                </li>
                <li className="mx-2 py-2 lg:py-0">
                  <NavLink
                    className="capitalize text-lg text-slate-900 font-light"
                    to="wishList"
                  >
                    wish List
                  </NavLink>
                </li>
                <li className="mx-2 py-2 lg:py-0">
                  <NavLink
                    className="capitalize text-lg text-slate-900 font-light"
                    to="brands"
                  >
                    brands
                  </NavLink>
                </li>
                <li className="mx-2 py-2 lg:py-0">
                  <NavLink
                    className="capitalize text-lg text-slate-900 font-light"
                    to="cart"
                  >
                    cart
                  </NavLink>
                </li>
                <li className="mx-2 py-2 lg:py-0">
                  <NavLink
                    className="capitalize text-lg text-slate-900 font-light"
                    to="allorders"
                  >
                    all orders
                  </NavLink>
                </li>
                <li className="mx-2 py-2 lg:py-0">
                  <NavLink
                    className="capitalize text-lg text-slate-900 font-light"
                    to="home"
                  >
                    home
                  </NavLink>
                </li>
                <li className="mx-2 py-2 lg:py-0">
                  <NavLink
                    className="capitalize text-lg text-slate-900 font-light"
                    to="products"
                  >
                    products
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
        <ul className=" flex flex-col lg:flex-row items-center">
          <li className="mx-2 py-2 lg:py-0 flex items-center order-1 lg:order-none">
            <i className="fab mx-1 fa-facebook"></i>
            <i className="fab mx-1 fa-twitter"></i>
            <i className="fab mx-1 fa-instagram"></i>
            <i className="fab mx-1 fa-youtube"></i>
          </li>
          {token === null ? (
            <>
              <li className="mx-2 py-2 lg:py-0">
                <NavLink
                  className="capitalize text-lg text-slate-900 font-light"
                  to=""
                >
                  login
                </NavLink>
              </li>
              <li className="mx-2 py-2 lg:py-0">
                <NavLink
                  className="capitalize text-lg text-slate-900 font-light"
                  to="register"
                >
                  register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="mx-2 py-2 lg:py-0">
                <NavLink
                  className="capitalize text-lg  text-green-500 font-bold"
                  to="#"
                >
                  {user}
                </NavLink>
              </li>
              <li className="mx-2 py-2 lg:py-0">
                <NavLink
                  className="capitalize text-lg  text-green-500 font-bold"
                  to="/cart"
                >
                  <i className="fas fa-cart-shopping"></i>
                  {cartNum}
                </NavLink>
              </li>
              <li
                onClick={logout}
                className="mx-2 py-2 lg:py-0 capitalize text-lg text-slate-900 font-light cursor-pointer"
              >
                logout
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
