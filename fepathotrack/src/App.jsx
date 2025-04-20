import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Component/Login";
import Register from "./Component/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Navbar from "./Component/Navbar";
import Toggle from "./Component/Toggle";
import Usercreation from "./Component/Usercreation";
import PatientMaster from "./Component/PatientMaster";
import Testcreation from "./Component/Testcreation";
import Statuscheck from "./Component/Statuscheck";
import Dashboard from "./Component/Dashboard";
import Labtest from "./Component/Labtest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Component/Config/Firebaseconfig";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Profile from "./Component/Profile";
import PrivateRoute from "./Component/PrivateRoute";
import Homepage from "./Component/Homepage";
import Aboutus from "./Component/Aboutus";


function App() {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <>
      <Router>
        <Navbar
          isLogin={isLogin}
          setIsLogin={() => {
            setIsLogin(!isLogin);
          }}
        />
        <Routes>
          <Route
            path="/Aboutus"
            element={
              <>
                <Aboutus />
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <Homepage />
              </>
            }
          ></Route>
          <Route
            path="/labs/Login"
            element={
              <>
                <Login
                  setIsLogin={() => {
                    setIsLogin(!isLogin);
                  }}
                />
              </>
            }
          ></Route>
          <Route
            path="/labs/Register"
            element={
              <>
                <Register />
              </>
            }
          ></Route>
          <Route
            path="/labs/Usercreation"
            element={
              <>
                <PrivateRoute>
                  <Usercreation />
                </PrivateRoute>
              </>
            }
          ></Route>
          <Route
            path="/labs/Patientmaster"
            element={
              <>
                <PrivateRoute>
                  <PatientMaster />
                </PrivateRoute>
              </>
            }
          ></Route>
          <Route
            path="/labs/Testmaster"
            element={
              <>
                <PrivateRoute>
                  {" "}
                  <Testcreation />
                </PrivateRoute>
              </>
            }
          ></Route>
          <Route
            path="/labs/Labtest"
            element={
              <>
                <PrivateRoute>
                  <Labtest />
                </PrivateRoute>
              </>
            }
          ></Route>
          <Route
            path="/labs/Statuscheck"
            element={
              <>
                <Statuscheck />
              </>
            }
          ></Route>
          <Route
            path="/labs/Dashboard"
            element={
              <>
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </>
            }
          ></Route>
          <Route
            path="/labs/Profile"
            element={
              <>
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              </>
            }
          ></Route>
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
