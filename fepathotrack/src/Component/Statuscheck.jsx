import {
  Button,
  Container,
  Grid2,
  Typography,
  Box,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { useEffect } from "react";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStats";

import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircle";
import { Search, MoreVert, LocationOn } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paper from "@mui/material/Paper";

import Slide from "@mui/material/Slide";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import UsercreationDailog from "./UsercreationDailog";
import Usercreationupdation from "./Usercreationupdation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Logo from "../assets/Logof.jpg";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import V1 from "../assets/syring.mp4";
import ReactPlayer from "react-player";
import CardMedia from "@mui/material/CardMedia";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Statuscheck = () => {
  //to store the finded object that has to show status
  const [showingdata, setshowingdata] = React.useState({});

  //to store the id from field
  const [trakingid, settrackingid] = React.useState(null);

  const [alertdata, setalertdata] = React.useState({ desc: "" });
  //Alert
  const [alert, setalert] = React.useState(false);

  const handlealert = () => {
    setalert(true);
  };

  const handlealertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setalert(false);
  };

  //video handleer

  const [loading, setloading] = React.useState(false);

  // firestore code
  const [LabTestdata, setLabTestdata] = React.useState([]);

  //storing the del id
  const [delid, setdelid] = React.useState("");
  //Making refreenace to the collection
  const collectionref = collection(db, "LabTest");

  //CODE TO FETCH THE data from firestore
  const getuserlist = async () => {
    try {
      const data = await getDocs(collectionref);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      // console.log(filtereddata)
      setLabTestdata(filtereddata);

      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  console.log("Labtest", LabTestdata);

  //useEffect to fetch the data from firestore
  useEffect(() => {
    getuserlist();
    
  }, []);

  const finddata = () => {
    let data = LabTestdata.find((val) => val.id === trakingid);
    if (data) {
      setshowingdata(data);
    }
    console.log(showingdata);
  };

  const downloadBase64Image = (base64String, fileName = "downloaded-image.png") => {
    const link = document.createElement("a");
    link.href = base64String;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          // backgroundColor: "aliceblue",
          width: "100vw",
          height: "100vh",
          display: "flex",
          overflow: "hidden",
          position: "fixed",
          flexDirection: "column",
          gap: "2px",
          // justifyContent:'center',
          alignItems: "center",
        }}
      >
        <Grid2
          container
          //   direction="column"
          sx={{
            // backgroundColor: "pink",

            width: "100%",
            // height: "11vh",
            height: { lg: "11vh", xs: "20vh", md: "11vh", sm: "11vh" },
            marginTop: "6px",
            // justifyContent: "center",
            // alignItems: "center",
            justifyContent: "center",
            padding: "0.4em",
          }}
        >
          <Grid2
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5em",
            }}
          >
            <Grid2 item>
              {" "}
              <QueryStatsRoundedIcon
                sx={{
                  backgroundColor: "#5F6FFF",
                  color: "white",
                  borderRadius: "50px",
                  width: "100%",
                  height: "5vh",
                }}
              />
            </Grid2>
            <Grid2
              item
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Typography
                fontSize="1.6em"
                fontFamily="Rubik"
                sx={{ color: "" }}
              >
                Status Check
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2
          item
          container
          direction="column"
          sx={{
            paddingTop: "1em",
            // justifyContent: "center",
            alignItems: "center",
            height: "21vh",
            width: "100%",
            // backgroundColor:'red'
          }}
          spacing={2}
        >
          {/* textfield */}
          <Grid2
            item
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
            size={{ lg: 12, md: 12, sm: 12, xs: 12 }}
          >
            <TextField
              onChange={(e) => {
                settrackingid(e.target.value);
              }}
              variant="outlined"
              placeholder="Enter Your Unique Reference Number..."
              fullWidth
              sx={{
                maxWidth: "85vw",
                borderRadius: "50px",
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": {
                    borderColor: "#5F6FFF",
                  },
                  "&:hover fieldset": {
                    borderColor: "#aaa",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5F6FFF",
                  },
                },
              }}
            />
          </Grid2>

          <Grid2
            item
            container
            size={{ lg: 12, xs: 12, sm: 12, md: 12 }}
            sx={{ justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                finddata();
                if (LabTestdata.map((val) => val.id).includes(trakingid)) {
                  setloading(true);
                  console.log("first")
                } else if( trakingid && !LabTestdata.map((val) => val.id).includes(trakingid)) {
                  setalertdata({
                    desc: "You have Entered a Wrong Unique Reference Number",
                  });
                  handlealert();
                } else {
                  setalertdata({
                    desc: "Please Enter Your Unique Reference Number",
                  });
                  handlealert();
                }
                console.log("showingdata",showingdata.Report);

                // setshowingdata({});

              }}
              variant="contained"
              sx={{
                fontFamily: "Rubik",
                background: "#5F6FFF",
                borderRadius: "50px",
                color: "white",
                fontWeight: "bold",
                px: 4,
                py: 1,
                textTransform: "none",
              }}
              startIcon={<Search />}
            >
              Search
            </Button>
          </Grid2>
        </Grid2>

        <Grid2
          // mt={{lg:'5',xs:'30'}}
          container
          sx={{
            // backgroundColor: "pink",
            height: "40vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            mt: (theme) => (theme.breakpoints.up("xs") ? 3 : 5),
          }}
        >
          {/* <Grid2
            item
            container
            size={{ sm: 12, md: 12, xs: 12, lg: 12 }}
            sx={{ justifyContent: "center", width: { xs: "90vw" }, backgroundColor: 'blue' }}
            
          > */}

          {loading ? (
            <Card
              sx={{
                p: 0,
                // textAlign: "center",
                // backgroundColor: "red",
                borderRadius: "20px",
                height: { xs: "vh", lg: "37vh", sm: "35vh", md: "35vh" },
                width: { xs: "98vw", lg: "40vw", sm: "70vw", md: "50vw" },
                display: "flex",

                border: "3px solid #5F6FFF",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              {/* <CardMedia
  component="video"
  src='V1.mp4'
  alt="Video"
  autoPlay={true}
  sx={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
/> */}

              <CardContent
                sx={
                  {
                    // display: "flex",
                    // flexDirection: "column",
                    // justifyContent: "space-between",
                  }
                }
              >
                <Grid2 container spacing={1}>
                  <Grid2
                    item
                    container
                    size={7.6}
                    sx={{
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <VaccinesIcon
                      sx={{
                        backgroundColor: "#5F6FFF",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: "black", fontFamily: "Rubik" }}
                    >
                      Test Status
                    </Typography>
                  </Grid2>
                  <Grid2
                    item
                    container
                    spacing={0}
                    size={4.4}
                    sx={{ justifyContent: "end", alignItems: "center" }}
                  >
                    {/* <IconButton>
                      <VisibilityIcon onClick={() => {}} />
                    </IconButton> */}

                    {showingdata.Report? <IconButton>
                      {" "}
                      <DownloadIcon onClick={() => {
                        //showingdata.Report
                        downloadBase64Image(showingdata.Report)
                      }} />
                    </IconButton>: null}
                    
                  </Grid2>

                  <Grid2
                    item
                    size={12}
                    container
                    sx={{ justifyContent: "start" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Rubik",
                        fontSize: { xs: "0.9em", lg: "1em" },
                      }}
                    >
                      <i class="fa-solid fa-hospital-user"></i>Patient Name:{" "}
                      {showingdata?.Patientdata.Name}
                    </Typography>
                  </Grid2>
                  <Grid2
                    item
                    size={12}
                    container
                    sx={{ justifyContent: "start" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Rubik",
                        fontSize: { xs: "0.9em", lg: "1em" },
                      }}
                    >
                      <i class="fa-solid fa-vial-virus"></i>Test Name:{" "}
                      {showingdata?.Testdata.map((val) => val.TestName).join(', ')}
                    </Typography>
                  </Grid2>
                  <Grid2
                    item
                    size={12}
                    container
                    sx={{ justifyContent: "start" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Rubik",
                        fontSize: { xs: "0.9em", lg: "1em" },
                      }}
                    >
                      <i class="fa-solid fa-calendar-days"></i>Test Date:
                      {showingdata.date.date}
                    </Typography>
                  </Grid2>
                  <Grid2
                    item
                    size={12}
                    container
                    sx={{ justifyContent: "start" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Rubik",
                        fontSize: { xs: "0.9em", lg: "1em" },
                      }}
                    >
                      <i class="fa-solid fa-square-poll-vertical"></i>Expected
                      Result Date :
                      <span style={{ fontSize: "1.1em" }}>
                        {showingdata.date.date}
                      </span>
                    </Typography>
                  </Grid2>
                  <Grid2
                    item
                    size={12}
                    container
                    sx={{ justifyContent: "center" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Rubik",
                        fontSize: { xs: "1.3em", lg: "1.7em" },
                      }}
                    >
                      Status : {showingdata?.Status}
                    </Typography>
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>
          ) : (
            // <ReactPlayer
            //   url="https://media.istockphoto.com/id/2161106401/video/dna-female-researcher-in-laboratory-working-in-antiviral-treatment-doing-tube-test.mp4?s=mp4-480x480-is&k=20&c=fhj55TgiFbDVsvo1Cm5sgRVXuq9WVjlIEa4bjLdQVAo="
            //   playing={true}
            //   loop={true}
            //   //  controls
            //   width="600px"
            //   height="340px"
            // />
            <DotLottieReact
            src="https://lottie.host/3318acc9-b091-4347-b793-43ee16ed0780/H7lguKOyHQ.lottie"            
            loop
            autoplay
          />
          )}
        </Grid2>
        <Snackbar
          open={alert}
          autoHideDuration={3000}
          onClose={handlealertClose}
        >
          <Alert
            onClose={handlealertClose}
            severity="error"

            variant="filled"
            sx={{ width: "100%"}}
          >
            {alertdata.desc}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Statuscheck;
