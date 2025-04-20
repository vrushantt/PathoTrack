import React from "react";
import { useState } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Register() {
  let Navigate = useNavigate();
  const [Registerdata, setdata] = React.useState({});
  const handledata = (e) => {
    setdata({ ...Registerdata, [e.target.name]: e.target.value });
  };


  //to add data in firebase

  let collectionref = collection(db,"Labregistration")

  //to add
  const senddata = async()=>{
    try{
     let data = await addDoc(collectionref,{
      Name: Registerdata.Name,
      MobileNo: Registerdata.MobileNo,
      PersonToContact: Registerdata.PersonToContact,
      email: Registerdata.email,
      password: Registerdata.password,
      GSTNo: Registerdata.GSTNo,
      LabCertificateNo: Registerdata.LabCertificateNo
     })
     console.log("Document written with ID: ", data.id);

    }catch(err){
         console.log(err)
    }
  }
  //Logic for the firebase Authentication
  const Authentication = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        Registerdata.email,
        Registerdata.password
      );
      toast.success("User Registered Successfully!!", {
        position: "top-right",
      });
    } catch (err) {
      console.log(err.message);

      if (err.code === "auth/admin-restricted-operation") {
        toast.error("Admin-restricted operation. Please contact support.", {
          position: "top-right",
        });
    } else if (err.code === "auth/email-already-in-use") {
      toast.error("Email already in use. Please use a different email.", {
        position: "top-right",
      });
    } else {
      toast.error(err.message, {
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
        }}
      >
        <Paper elevation={2} sx={{ borderRadius: "20px" }}>
          <Box
            container
            elevation={4}
            spacing={2}
            direction={"column"}
            sx={{
              borderRadius: "20px",
              width: { xs: "100%", sm: "100%", md: "100%", lg: "38vw" }, // Make it more flexible on small screens
              // height: { xs: "76vh", sm: "90%", md: "69%", lg: "30vw" },

              // height: "79%",
              backgroundColor: "aliceblue",
              padding: "1.5em",
              overflow: "auto",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)", // Added box shadow

              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Grid2
              item
              size={10}
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Typography
                fontFamily="Rubik Semibold"
                variant="h4"
                align="center"
                // sx={{border:'2px solid #5F6FFF',width:'90%'}}
              >
                Register
              </Typography>
            </Grid2>

            <Grid2 container sx={{ paddingTop: "5px" }}>
              <Grid2
                item
                size={{ lg: 6, sm: 6, md: 6, xs: 6 }}
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  value={
                    Registerdata && Registerdata.Name
                      ? Registerdata.Name
                      : ""
                  }
                  size="small"
                  sx={{
                    width: "95%",
                    "& fieldset": { border: "none" },
                    border: "1px solid #5F6FFF",
                    borderRadius: "3px",
                  }}
                  onChange={(e) => {
                    handledata(e);
                  }}
                  margin="normal"
                  id="outlined-basic"
                  label="Lab Name"
                  placeholder="Lab Name"
                  name="Name"
                  variant="outlined"
                />
              </Grid2>

              <Grid2
                item
                size={{ lg: 6, sm: 6, md: 6, xs: 6 }}
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  value={
                    Registerdata && Registerdata.email ? Registerdata.email : ""
                  }
                  size="small"
                  sx={{
                    width: "95%",
                    "& fieldset": { border: "none" },
                    border: "1px solid #5F6FFF",
                    borderRadius: "3px",
                  }}
                  onChange={(e) => {
                    handledata(e);
                  }}
                  margin="normal"
                  id="outlined-basic"
                  label="Email"
                  placeholder="Email"
                  name="email"
                  variant="outlined"
                />
              </Grid2>
            </Grid2>
            <Grid2 container>
              <Grid2
                item
                size={{ lg: 6, sm: 6, md: 6, xs: 6 }}
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  value={
                    Registerdata && Registerdata.PersonToContact
                      ? Registerdata.PersonToContact
                      : ""
                  }
                  size="small"
                  sx={{
                    width: "95%",
                    "& fieldset": { border: "none" },
                    border: "1px solid #5F6FFF",
                    borderRadius: "3px",
                  }}
                  onChange={(e) => {
                    handledata(e);
                  }}
                  margin="normal"
                  id="outlined-basic"
                  label="Person To Contact"
                  placeholder="Person To Contact"
                  name="PersonToContact"
                  variant="outlined"
                />
              </Grid2>

              <Grid2
                item
                size={{ lg: 6, sm: 6, md: 6, xs: 6 }}
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  value={
                    Registerdata && Registerdata.MobileNo
                      ? Registerdata.MobileNo
                      : ""
                  }
                  size="small"
                  sx={{
                    width: "95%",
                    "& fieldset": { border: "none" },
                    border: "1px solid #5F6FFF",
                    borderRadius: "3px",
                  }}
                  onChange={(e) => {
                    handledata(e);
                  }}
                  type="number"
                  margin="normal"
                  id="outlined-basic"
                  label="Mobile No"
                  placeholder="Mobile No"
                  name="MobileNo"
                  variant="outlined"
                />
              </Grid2>
            </Grid2>
            <Grid2 container>
              <Grid2
                item
                size={{ lg: 6, sm: 6, md: 6, xs: 6 }}
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  value={
                    Registerdata && Registerdata.password
                      ? Registerdata.password
                      : ""
                  }
                  type="password"
                  size="small"
                  sx={{
                    width: "95%",
                    "& fieldset": { border: "none" },
                    border: "1px solid #5F6FFF",
                    borderRadius: "3px",
                  }}
                  onChange={(e) => {
                    handledata(e);
                  }}
                  margin="normal"
                  id="outlined-basic"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  variant="outlined"
                />
              </Grid2>

              <Grid2
                item
                size={{ lg: 6, sm: 6, md: 6, xs: 6 }}
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  value={
                    Registerdata && Registerdata.GSTNo ? Registerdata.GSTNo : ""
                  }
                  size="small"
                  sx={{
                    width: "95%",
                    "& fieldset": { border: "none" },
                    border: "1px solid #5F6FFF",
                    borderRadius: "3px",
                  }}
                  onChange={(e) => {
                    handledata(e);
                  }}
                  margin="normal"
                  id="outlined-basic"
                  label="GST No"
                  placeholder="GST No"
                  name="GSTNo"
                  variant="outlined"
                />
              </Grid2>
            </Grid2>
            <Grid2>
              <Grid2
                item
                container
                size={{ lg: 12, sm: 12, md: 12 }}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  size="small"
                  value={
                    Registerdata && Registerdata.LabCertificateNo
                      ? Registerdata.LabCertificateNo
                      : ""
                  }
                  sx={{
                    width: "97%",
                    "& fieldset": { border: "none" },
                    border: "1px solid #5F6FFF",
                    borderRadius: "3px",
                  }}
                  onChange={(e) => {
                    handledata(e);
                  }}
                  margin="normal"
                  id="outlined-basic"
                  label="Lab Certificate No"
                  placeholder="Lab Certificate No"
                  name="LabCertificateNo"
                  variant="outlined"
                />
              </Grid2>
            </Grid2>
            <br></br>
            <Grid2
              item
              size={{ lg: 10, sm: 10, md: 10 }}
              container
              direction="column"
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button
                onClick={() => {
                  console.log(Registerdata);
                  Authentication();
                  senddata();
                  setdata({});
                }}
                sx={{ backgroundColor: "#5F6FFF", width: "97%" }}
                variant="contained"
              >
                Register
              </Button>
              <br></br>

              <Grid2 item container sx={{ justifyContent: "center" }} size={12}>
                <Typography fontFamily="Rubik" variant="subtitle1">
                  Already have an account?
                  <Typography
                    variant="text"
                    sx={{
                      color: "#5F6FFF",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                    onClick={() => {
                      Navigate("/Labs/login");
                    }}
                  >
                    Login Here
                  </Typography>
                </Typography>
              </Grid2>
            </Grid2>

            <Grid2 container></Grid2>

            {/* 
          <Typography align="left" variant="body1">
            Please Register to Use App
          </Typography>
          <TextField
            onChange={(e) => {
              handlelogin(e);
            }}
            margin="normal"
            id="outlined-basic"
            label="Email"
            placeholder="Email"
            name="Email"
            variant="outlined"
          />
          <TextField
            onChange={(e) => {
              handlelogin(e);
            }}
            id="outlined-basic"
            label="Password"
            placeholder="Password"
            name="Password"
            variant="outlined"
          />
          <Button
            onClick={() => {
              console.log(logindata);
            }}
            sx={{ backgroundColor: "#1F6FFF" }}
            variant="contained"
          >
            Register
          </Button>
          <Typography align="left" variant="body2">
          Already have an account?
            <Button
              sx={{ color: "#1F6FFF" }}
              onClick={() => {
                Navigate("/");
              }}
            >
              Login Here
            </Button>
          </Typography>
           */}
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Register;
