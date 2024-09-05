import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();
export default function UserContextProvider(props) {
  let [user, setUser] = useState(localStorage.getItem("userName"));
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [userId, setUserId] = useState(getUserId);

  function getUserId() {
    if (localStorage.getItem("token")) {
      let data = jwtDecode(localStorage.getItem("token"));
      return data.id;
    } else {
      return null;
    }
  }
  function forgetPassword(email) {
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then((res) => res);
  }
  function verityPassword(resetCode) {
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      })
      .then((res) => res);
  }
  function resetPassword({ email, newPassword }) {
    return axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
        newPassword,
      })
      .then((res) => res);
  }
  useEffect(() => {
    // if (
    //   localStorage.getItem("userName") != null &&
    //   localStorage.getItem("token") != null
    // ) {
    //   setUser(localStorage.getItem("userName"));
    //   setToken(localStorage.getItem("token"));
    // }
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        getUserId,
        userId,
        setUserId,
        forgetPassword,
        verityPassword,
        resetPassword,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
