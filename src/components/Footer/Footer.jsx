import React, { useEffect, useState } from "react";
import Style from "./Footer.module.css";
import logo from "../../assets/logo-main.png";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow z-40  dark:bg-gray-800 fixed bottom-0 left-0 right-0 mt-20">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <img src={logo} width={110} />
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
