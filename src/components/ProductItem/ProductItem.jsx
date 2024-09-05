import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { productsContext } from "../../context/productsContext";

export default function ProductItem({ product, addToCart, loading }) {
  let [currentId, setCurrentId] = useState(null);
  let { favId, setFavId, setWishList } = useContext(productsContext);

  return (
    <div className="md:w-1/4 w-full p-3 mb-14">
      <div className={`${Style.wsk_cp_product} h-full relative`}>
        <div className={`${Style.wsk_cp_img}`}>
          <img
            src={product.imageCover}
            alt={product.slug}
            className={`${Style.img_responsive}`}
          />
        </div>
        <div className={`${Style.wsk_cp_text} `}>
          <div className={`${Style.category}`}>
            <Link to={`/productDetails/${product.id}/${product.category._id}`}>
              details
            </Link>
          </div>
          <div className={`${Style.title_product}`}>
            <h3>{product.title}</h3>
          </div>
          <div className={`${Style.description_prod}`}>
            <p>{product.description}</p>
          </div>
          <div
            className={`${Style.card_footer} absolute bottom-0 left-0 w-full flex justify-between items-center`}
          >
            <div>
              <span className={`${Style.price}`}>
                <span className="mr-2">EGP</span>
                {product.price}
              </span>
            </div>
            <div>
              <i
                onClick={() => setWishList(product.id)}
                className={`${
                  favId.includes(product.id) ? "text-red-800 " : "text-black "
                }fas fa-heart text-xl cursor-pointer`}
              ></i>
            </div>
            <div>
              <button
                className={`${Style.buy_btn}`}
                onClick={() => {
                  addToCart(product.id, product.quantity);
                  setCurrentId(product.id);
                }}
              >
                <i
                  className={
                    loading && currentId == product.id
                      ? "fas fa-spinner fa-spin"
                      : "fas fa-cart-shopping"
                  }
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
