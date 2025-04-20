import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid2,
  TextField,
  Typography,
  Link,
  FormControlLabel,
  Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useNavigate } from "react-router-dom";
import { auth } from "./Config/Firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";

//Main Function
const Login = ({ setIsLogin}) => {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  // firestore code
  const [userdata, setUserdata] = React.useState([]);
  const[roledata,setroledata] = React.useState({});
  //Making refreenace to the collection
  const collectionref = collection(db, "Usercreation");

  //CODE TO FETCH THE data from firestore
  const getuserlist = async () => {
    // setloading(true);
    try {
      const data = await getDocs(collectionref);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setUserdata(filtereddata);
      console.log(filtereddata)
      // setTimeout(()=>{setloading(false)},[2100])
      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  // console.log(userdata);

  useEffect(() => {
    getuserlist();
  },[])

  const handlerole = (email) => {
    
  }
  //useEffect to fetch the data from firestore

  let Navigate = useNavigate();

  //Logic for the firebase Authentication
  const Authentication = async () => {
    try {
      let data = await signInWithEmailAndPassword(auth, email, password);
      console.log("userdata", data);
      localStorage.setItem("accessToken", data.user.accessToken);
      localStorage.setItem("email", email.toLowerCase());
      localStorage.setItem("useremail", data.user.email);
      setIsLogin();
      Navigate("/labs/Dashboard");
      console.log("userdata",userdata);
      let roledata = (userdata.find((val)=>val.email == email))
      console.log(roledata)
      localStorage.setItem("Role", roledata.Role);
      localStorage.setItem("Roleid", roledata.id);

      
      // localStorage.setItem("Role", email.toLowerCase());
      // localStorage.setItem("Roleid", data.user.email);
      // console.log(roledata)
      console.log("User logged in Successfully", data);
      toast.success("User logged in Successfully", {
        position: "top-right",
      });
    } catch (err) {
      console.log(err);

      if (err.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please check your email.", {
          position: "top-right",
        });
      } else if (err.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please use a different email.", {
          position: "top-right",
        });
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.", {
          position: "top-right",
        });
      }else if(err.code === "reading 'Role'"){
        toast.success("Lab logged in Successfully", {
          position: "top-right",
        });
      
      }else if(err.code === "auth/invalid-credential"){
        toast.error("Invalid Credential,Please Try Again", {
          position: "top-right",
        });
      } 
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "91vh",
          padding: { xs: "1em", sm: "2em", md: "3em" }, // Responsive padding
        }}
      >
        <Paper elevation={2} sx={{ borderRadius: "20px" }}>
          <Box
            container
            spacing={0}
            direction="column"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              borderRadius: "20px",
              width: { xs: "100%", sm: "100%", md: "50vw", lg: "32vw" }, // Make it more flexible on small screens
              height: { xs: "auto", sm: "80%", md: "80%", lg: "69%" },
              backgroundColor: "aliceblue",
              padding: "2em",
              // overflow: "auto",
              // boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Added box shadow
            }}
          >
            <Grid2 item xs={12}>
              <Typography
                fontFamily="Rubik SemiBold"
                variant="h4"
                align="center"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
                }}
              >
                Login
              </Typography>
            </Grid2>

            <Grid2 item xs={12}>
              <Typography fontFamily="Rubik" align="left" variant="body1">
                Please login to Use App
              </Typography>
            </Grid2>

            <Grid2 item xs={12}>
              <TextField
                size="small"
                sx={{
                  width: "100%",
                  "& fieldset": { border: "none" },
                  border: "1px solid #5F6FFF",
                  borderRadius: "3px",
                }}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                margin="normal"
                id="outlined-basic"
                label="Email"
                placeholder="Email"
                name="Email"
                variant="outlined"
              />
            </Grid2>

            <Grid2 item xs={12}>
              <TextField
                type="password"
                size="small"
                sx={{
                  width: "100%",
                  "& fieldset": { border: "none" },
                  border: "1px solid #5F6FFF",
                  borderRadius: "3px",
                }}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                id="outlined-basic"
                label="Password"
                placeholder="Password"
                name="Password"
                variant="outlined"
              />
            </Grid2>

            <Grid2
              item
              xs={12}
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button
                onClick={() => {
                  console.log(email, password);
                  Authentication();
                  setrefresh()
                  
                }}
                sx={{
                  backgroundColor: "#5F6FFF",
                  border: "1px solid #5F6FFF",
                  width: "100%",
                }}
                variant="contained"
              >
                Login
              </Button>
              <Grid2
                item
                container
                sx={{ justifyContent: "center", marginTop: "1em" }}
                size={12}
              >
                <Typography fontFamily="Rubik" variant="subtitle1">
                  Create a new account?
                  <Typography
                    variant="text"
                    sx={{
                      color: "#5F6FFF",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                    onClick={() => {
                      Navigate("/labs/Register");
                    }}
                  >
                    Register Here
                  </Typography>
                </Typography>
              </Grid2>
              {/* 
      <Typography fontFamily="Rubik"  variant="body2" sx={{ marginTop: "1em" }}>
        Create a new account?
        <Typography
          sx={{ color: "#5F6FFF" }}
          onClick={() => {
            Navigate("/labs/Register");
          }}
        >
          <Typography fontFamily="Rubik">Click Here</Typography>
        </Typography>
      </Typography> */}
            </Grid2>
          </Box>
        </Paper>
      </Container>

      {/* <input type="text" onChange={(e)=>{handlelogin(e)}}></input>
   <button onClick={()=>{console.log(logindata)}}>Submit</button> */}
    </>
  );
};

export default Login;
