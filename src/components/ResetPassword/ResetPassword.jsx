import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "./ResetPassword.module.css";
import { useFormik } from "formik";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let [isCodeTrue, setIsCodeTrue] = useState(false);
  let { verityPassword, resetPassword } = useContext(UserContext);
  let navigate = useNavigate();
  let inputref = useRef();
  async function handelForgetPassword(value) {
    console.log(value);
    let response = await verityPassword(value);
    console.log(response);

    if (response.data.status == "success") {
      setIsCodeTrue(true);
    }
  }

  async function handelResetPassword(formData) {
    console.log(value);
    let response = await resetPassword(formData);
    console.log(response);

    if (response.data.status == "success") {
      navigate("/");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handelResetPassword,
  });
  if (isCodeTrue) {
    <form onSubmit={formik.handleSubmit}>
      <FormInput
        name="email"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.email}
        text="enter your email address :"
        type="email"
      />

      <FormInput
        name="newPassword"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.password}
        type="password"
        text="enter your newPassword :"
      />

      <button
        type="submit"
        className={` mx-auto block text-white bg-green-700 ${"hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:hover:bg-green-700 dark:focus:ring-green-800"}  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 `}
        disabled={loading}
      >
        reset
      </button>
    </form>;
  }
  return (
    <div>
      <input
        ref={inputref}
        type="text"
        className="w-3/4 text-center"
        placeholder="verity code"
      />
      <button onClick={() => handelForgetPassword(inputref.current.value)}>
        sumbit
      </button>
    </div>
  );
}
