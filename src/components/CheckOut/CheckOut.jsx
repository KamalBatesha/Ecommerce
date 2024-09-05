import React, { useContext, useEffect, useState } from "react";
import Style from "./CheckOut.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../FormInput/FormInput";
import { UserContext } from "../../context/UserContext";
import { Dropdown } from "flowbite-react";
import { cartContext } from "../../context/CartContext";
import { Helmet } from "react-helmet";

export default function CheckOut() {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let [payOnline, setPayOnline] = useState(false);
  let { cartId } = useParams();
  let { checkOut } = useContext(cartContext);
  let navigate = useNavigate();
  const cities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "Mansoura",
    "Tanta",
    "Asyut",
    "Ismailia",
    "Minya",
    "Zagazig",
    "Faiyum",
    "Kafr El Sheikh",
    "Damanhur",
    "Beni Suef",
    "Hurghada",
    "Luxor",
    "Aswan",
    "6th of October City",
    "October City",
    "New Cairo",
    "Kafr El Dawar",
    "Abo Homos",
    "Qalyubia",
    "Sharkia",
    "Dakahlia",
    "Matrouh",
    "Sohag",
    "North Sinai",
    "South Sinai",
    "Red Sea",
    "Al-Minya",
    "Gharbia",
    "Damietta",
    "Qena",
    "Al-Jizah",
    "Al-Behira",
    "Al-Fayoum",
    "Al-Daqahliyah",
    "Al-Sharqiya",
    "Belqas",
    "Tama",
    "Samalut",
    "El Mahalla El Kubra",
    "El Qanater El Khairia",
    "Kafr El-Sheikh",
    "Sidi Salem",
    "Bilbeis",
    "Banha",
    "Cairo Governorate",
    "Giza Governorate",
    "Daqahlia Governorate",
    "Sohag Governorate",
    "Monufia",
    "Abo Qir",
    "Naga Hammadi",
    "Qus",
    "Faraskur",
    "Zifta",
    "Basyoun",
    "Kafr Saad",
    "El Senbellawein",
    "Damanhour",
    "Qalyub",
  ];
  let [city, setCity] = useState("city");
  let validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(
        /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
        "must be egyption number,must be 11 degits,start with 01 or 00201 or +201"
      )
      .required("phone number is required"),
    city: Yup.string().oneOf(cities, "unaviable in this city"),
  });
  async function handelCkeckOut(formData) {
    setLoading(true);
    let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    if (payOnline) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`;
    }

    let response = await checkOut(url, formData);
    setLoading(false);
    if (payOnline) {
      window.location.href = response.data.session.url;
    } else {
      navigate("/allorders");
    }

    console.log(formData);
    console.log(response);
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelCkeckOut,
  });
  return (
    <div>
      <Helmet>
        <title>check out</title>
      </Helmet>
      <div className="w-full md:w-1/2 mx-auto mt-10">
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            name="phone"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors.phone}
            value={formik.values.phone}
            touched={formik.touched.phone}
            type="tel"
            text="enter your phone number :"
          />

          <FormInput
            list="cityList"
            name="city"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors.city}
            value={formik.values.city}
            touched={formik.touched.city}
            type="text"
            text="enter your city name :"
          />
          <datalist id="cityList">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>

          <div className="my-3">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              any details
            </label>
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              name="details"
              id="details"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            />
          </div>
          <div className="flex items-center me-4">
            <input
              onClick={() => setPayOnline(!payOnline)}
              id="paymentType"
              type="checkbox"
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="paymentType"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              pay online
            </label>
          </div>

          <button
            type="submit"
            className={` mx-auto block text-white bg-green-700 ${
              loading
                ? "opacity-70"
                : "hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:hover:bg-green-700 dark:focus:ring-green-800"
            }  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 `}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                loading...
              </>
            ) : payOnline ? (
              "pay online"
            ) : (
              "pay cash"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
