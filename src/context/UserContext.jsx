import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();
export default function UserContextProvider(props) {
  let [user, setUser] = useState(null);
  let [token, setToken] = useState(null);
  // useEffect(() => {
  // if (
  //   localStorage.getItem("userName") != null &&
  //   localStorage.getItem("token") != null
  // ) {
  //   setUser(localStorage.getItem("userName"));
  //   setToken(localStorage.getItem("token"));
  // }
  // }, []);
  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
