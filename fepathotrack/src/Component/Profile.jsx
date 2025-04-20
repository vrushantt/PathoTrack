import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Container,
  Grid2,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  dialogActionsClasses,
  Box,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

const Profile = (props) => {
  // firestore code
  const [registerdata, setregisterdata] = React.useState([]);
  const [userdata, setUserdata] = React.useState([]);
  const [formdata, setfromdata] = React.useState({});
  const [useremail, setuseremail] = React.useState(
    localStorage.getItem("email") || ""
  );
  const [Profiledata, setProfiledata] = React.useState({});
  const [disable, setdisable] = React.useState(true);
  const [loading, setloading] = useState(false);
  const handleprofile = (e) => {
    setfromdata({ ...formdata, [e.target.name]: e.target.value });
  };

  // //Making refreenace to the collection

  // //CODE TO FETCH THE data from firestore
  // const getuserlist = async (patientId) => {
  //   try {
  //     const docRef = doc(db, "Usercreation", patientId); // Reference to the document
  //     const docSnap = await getDoc(docRef); // Fetch the document

  //     if (docSnap.exists()) {
  //       console.log("Patient Data:", docSnap.data());
  //       setUserdata(docSnap.data());
  //     } else {
  //       console.log("No such document!");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching document:", error);
  //   }
  // };

  // firestore code

  //Making refreenace to the collection
  const collectionref = collection(db, "Usercreation");
  const collectionrefregister = collection(db, "Labregistration");

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
      // setTimeout(()=>{setloading(false)},[2100])
      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  // console.log(userdata);
  console.log("data", userdata);

  //CODE TO FETCH THE data from firestore
  const getregisterlist = async () => {
    // setloading(true);
    try {
      const data = await getDocs(collectionrefregister);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      // console.log(filtereddata)
      setregisterdata(filtereddata);
      // setTimeout(()=>{setloading(false)},[2100])
      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  // console.log(userdata);
  console.log("data", userdata);

  // const getregisterlist = async ()=>{
  //   try {
  //     let data = await getDoc(collectionrefregister);
  //     const filtereddata = data.docs.map((val) => ({
  //       ...val.data(),
  //       id: val.id,
  //     }));
  //     console.log(filtereddata)
  //     setregisterdata(filtereddata);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //to update the data in firebase
  const handleupdate = async (updateid) => {
    const updatedataref = doc(db, "Usercreation", updateid);
    try {
      await updateDoc(updatedataref, {
        email: formdata.email,
        Name: formdata.Name,
      });
      console.log("Document updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // const getprofile = () => {
  //   let data = userdata.find((val, index) => val.id === "1YTWTaGwbx21GjcAMKjF");
  //   console.log("Profinle", data);
  // };

  //useEffect to fetch the data from firestore
  useEffect(() => {
    getuserlist();
    getregisterlist();  
  }, []);

  useEffect(() => {
    setloading(true);
    if (userdata.length > 0) {
      const data = userdata.find(
        (val) => val.email.toLowerCase() === useremail
      );
      setfromdata(data); // Set to an empty object if no match is found
      setloading(false);
    }
  }, [userdata, useremail]);

  formdata ? null :
  useEffect(() => {
    setloading(true);
    try{
      if (registerdata.length > 0) {
        const data = registerdata.find(
          (val) => val.email.toLowerCase() === useremail
        );
        setfromdata(data); // Set to an empty object if no match is found
        setloading(false);
      }
    }catch(err){
      console.log(err);
    }
   
  }, []);


 
  // if(userdata.length > 0) {
  //   let data = userdata.find((val)=> val.email === useremail);
  //   setfromdata(data)
  //   console.log("datafff", data);
  // }

  console.log("form data", formdata);
  console.log("useremail", useremail);
  console.log("register", registerdata);

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          height: "91vh",
          width: "100%",
          // backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <>
            {" "}
            <Box sx={{ position: "relative" }}>
              <CircularProgress
                variant="determinate"
                sx={(theme) => ({
                  color: theme.palette.grey[200],
                  ...theme.applyStyles("dark", {
                    color: theme.palette.grey[800],
                  }),
                })}
                size={40}
                thickness={4}
                {...props}
                value={100}
              />
              <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={(theme) => ({
                  color: "#1a90ff",
                  animationDuration: "550ms",
                  position: "absolute",
                  left: 0,
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: "round",
                  },
                  ...theme.applyStyles("light", {
                    color: "#5F6FFF",
                  }),
                })}
                size={40}
                thickness={4}
                {...props}
              />
            </Box>
          </>
        ) : (
          <Card
            sx={{
              border: "2px solid #5F6FFF",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
              width: { xs: "90%", sm: "50%", md: "40%", lg: "22%" },
            }}
          >
            <CardContent>
              <Grid2
                container
                // sx={{ height: "50vh", width: "30vw", overflow: "auto" }}
              >
                {/* <Grid2 item size={6} sx={{height:'50vh'}}>
  <DotLottieReact
    src="https://lottie.host/0be87c58-4b43-4f29-b6ed-a44b6814c7cd/Xdy7SKndef.lottie"
    loop
    autoplay
  />
</Grid2> */}

                <Grid2
                  item
                  container
                  direction="column"
                  spacing={1}
                  size={12}
                  // sx={{ padding: "0.5em" }}
                >
                  <Grid2
                    container
                    sx={{
                      justifyContent: "center",
                      borderBottom: "1px solid #5F6FFF",
                    }}
                  >
                    <Grid2 item size={12}>
                      <Typography
                        align="center"
                        fontSize="1.6em"
                        fontFamily="Rubik"
                        sx={{ color: "" }}
                      >
                        Profile
                      </Typography>
                    </Grid2>
                    <Grid2 item>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{ height: "6em", width: "6em" }}
                          alt="Profile"
                          src="https://img.freepik.com/free-photo/portrait-3d-male-doctor_23-2151107083.jpg?ga=GA1.1.537434374.1738737850&semt=ais_hybrid"
                        />
                      </Stack>
                      <br></br>
                    </Grid2>
                  </Grid2>

                  <Grid2 container sx={{ justifyContent: "space-between" }}>
                    <Grid2
                      item
                      container
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Typography sx={{ fontFamily: "Rubik" }}>
                        Name:
                      </Typography>
                    </Grid2>
                    <Grid2 item>
                      {disable ? (
                        <Typography
                          align="center"
                          fontSize="1em"
                          fontFamily="Rubik"
                        >
                          {formdata && formdata.Name
                            }
                        </Typography>
                      ) : (
                        <TextField
                          onChange={(e) => {
                            handleprofile(e);
                          }}
                          disabled={disable}
                          size="small"
                          sx={{
                            width: "95%",
                            "& fieldset": { border: "none" },
                            border: "1px solid #5F6FFF",
                            borderRadius: "3px",
                          }}
                          id="Name"
                          name="Name"
                          value={
                            formdata && formdata.Name}
                          variant="outlined"
                        />
                      )}
                    </Grid2>
                  </Grid2>

                  <Grid2 container sx={{ justifyContent: "space-between" }}>
                    <Grid2
                      item
                      container
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Typography sx={{ fontFamily: "Rubik" }}>
                        Email:
                      </Typography>
                    </Grid2>
                    <Grid2 item>
                      {disable ? (
                        <Typography
                          align="center"
                          fontSize="1em"
                          fontFamily="Rubik"
                        >
                          {formdata && formdata.email}
                        </Typography>
                      ) : (
                        <TextField
                          onChange={(e) => {
                            handleprofile(e);
                          }}
                          disabled={disable}
                          size="small"
                          sx={{
                            width: "95%",
                            "& fieldset": { border: "none" },
                            border: "1px solid #5F6FFF",
                            borderRadius: "3px",
                          }}
                          id="Email"
                          name="email"
                          value={formdata && formdata.email}
                          variant="outlined"
                        />
                      )}
                    </Grid2>
                  </Grid2>

                  <Grid2 container sx={{ justifyContent: "space-between" }}>
                    <Grid2
                      item
                      container
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Typography sx={{ fontFamily: "Rubik" }}>
                        Role:
                      </Typography>
                    </Grid2>
                    <Grid2 item>
                      <Typography>
                        {formdata && formdata.Role
                          ? formdata.Role
                          : "Pathology Lab"}
                      </Typography>
                      {/* <TextField
            onChange={(e) => {
              handleprofile(e);
            }}
            size="small"
            sx={{
              width: "95%",
              "& fieldset": { border: "none" },
              border: "1px solid #5F6FFF",
              borderRadius: "3px",
            }}
            id="Role"
            name="Role"
            disabled
            variant="outlined"
            value={userdata.Role}
          /> */}
                    </Grid2>
                  </Grid2>
                  {formdata? (
                    <Grid2
                      container
                      sx={{ justifyContent: "center", mt: "1em" }}
                    >
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#5F6FFF" }}
                        onClick={() => {
                          setdisable(!disable);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#5F6FFF" }}
                        onClick={() => {
                          // console.log(userdata);
                          handleupdate(formdata.id);
                          getuserlist();
                          setdisable(true);
                        }}
                      >
                        Save
                      </Button>
                    </Grid2>
                  ) : null}
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Profile;
