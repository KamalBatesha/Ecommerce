import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "./ForgetPassword.module.css";
import FormInput from "../FormInput/FormInput";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let { forgetPassword } = useContext(UserContext);
  let navigate = useNavigate();
  let inputref = useRef();
  async function handelForgetPassword(value) {
    console.log(value);
    let response = await forgetPassword(value);
    console.log(response);
    if (response.data.statusMsg == "success") {
      navigate("/resetPassword");
    }
  }
  return (
    <div>
      <input
        ref={inputref}
        type="text"
        className="w-3/4 text-center"
        placeholder="your email"
      />
      <button onClick={() => handelForgetPassword(inputref.current.value)}>
        sumbit
      </button>
    </div>
  );
}
