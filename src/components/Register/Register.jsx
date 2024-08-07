import React, { useEffect, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../FormInput/FormInput";

export default function Register() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z]{2,10}$/,
        "Name must start with uppercase,At least 3 characters (and up to 10 characters),no numbers or special character"
      )
      .required("name is required"),
    email: Yup.string().email("email is unvalid").required("email is required"),
    phone: Yup.string()
      .matches(
        /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
        "must be egyption number,must be 11 degits,start with 01 or 00201 or +201"
      )
      .required("phone number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters,at least one letter,one number and one special character"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "repassword must match the password")
      .required("repassword is required"),
  });
  async function handelRegister(formData) {
    console.log(formData);
    setLoading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      formData
    );
    setLoading(false);

    if (data.message == "success") {
      navigate("/home");
    }
    console.log(data);
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelRegister,
  });
  return (
    <div className="max-w-xl mx-auto py-5 px-5">
      <h2 className="font-bold text-center capitalize mb-2 text-3xl text-green-500">
        register now
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          name="name"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          errors={formik.errors.name}
          value={formik.values.name}
          touched={formik.touched.name}
          text="enter your name :"
          type="text"
        />
        <FormInput
          name="email"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          errors={formik.errors.email}
          value={formik.values.email}
          touched={formik.touched.email}
          text="enter your email address :"
          type="email"
        />
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
          name="password"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          errors={formik.errors.password}
          value={formik.values.password}
          touched={formik.touched.password}
          type="password"
          text="enter your password :"
        />
        <FormInput
          name="rePassword"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          errors={formik.errors.rePassword}
          value={formik.values.rePassword}
          touched={formik.touched.rePassword}
          type="password"
          text="repassword :"
        />

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
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
