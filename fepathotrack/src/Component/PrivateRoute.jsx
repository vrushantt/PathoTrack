import React from "react";
import { Navigate } from "react-router-dom";
import JWT from 'jsonwebtoken'
const PrivateRoute = (props) => {
  const isAuth = () => {
    let token = localStorage.getItem("accessToken");
    let email = localStorage.getItem("email");
    if (token) {
      let tData = JWT.decode(token);
      if (tData.email === email) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  console.log('---',isAuth())
  return <>{isAuth() ? props.children : <Navigate to="/"></Navigate>}</>;
};

export default PrivateRoute;
