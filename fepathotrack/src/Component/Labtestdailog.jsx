import {
  Button,
  Container,
  Grid2,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BiotechRoundedIcon from "@mui/icons-material/Biotech";

import CancelIcon from "@mui/icons-material/Cancel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slide from "@mui/material/Slide";
import TestcreationDailog from "./TestcreationDailog";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LabtestSelection from "./LabtestSelection";
import LabTestBilling from "./LabTestBilling";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import LabTestBarcode from "./LabTestBarcode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

//transition for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//stepper options

const steps = ["Lab Test Selection", "Billing", "Barcode Generator"];

//main function

const Labtestdailog = ({ handleClose, refreshList }) => {
  const [testcreation, settestcreation] = React.useState(false);

  const handletestcreation = () => {
    settestcreation(true);
  };

  const handleClosetestcreation = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    settestcreation(false);
  };

  //to Store the barcode doc id
  const [docid, setdocid] = React.useState("");
  //dialog handlers
  const [opensend, setOpensend] = React.useState(false);

  const handlesenddialog = () => {
    setOpensend(true);
  };

  const handleClosesenddialog = () => {
    setOpensend(false);
  };


  const currentDate = new Date();
  const date = currentDate.toLocaleDateString("en-GB");
  const time = currentDate.toLocaleTimeString();

  //To store the value of selected patient name
  const [selectedpatient, setselectpatient] = React.useState({});
  //  const handlepatient = (value)=>{
  //   setselectpatient(value)
  //  }

  //To store the value of selected test name
  const [selectTest, setselectTest] = React.useState([]);

  //To store the final data of the patient and test name in obj to send to fire base
  const [labtestdata, setlabtestdata] = React.useState({
    Patientdata: {},
    Testdata: [],
    Status: "",
    Total: "",
  });

  //For addditon of total in bill
  let Total = 0;
  for (let i = 0; i < selectTest.length; i++) {
    let a = parseInt(selectTest[i].Cost);
    Total += a;
  }

  const handlelabtestdata = () => {
    setlabtestdata({
      Patientdata: selectedpatient,
      Testdata: selectTest,
      Status: "Created",
      Total,
    });
  };

  //Making refreenace to the collection
  const collectionref = collection(db, "LabTest");

  const handlesenddata = () => {
    senddata();
  };

  //to send data to firebase
  const senddata = async () => {
    try {
      let docref = await addDoc(collectionref, {
        Patientdata: labtestdata.Patientdata,
        Testdata: labtestdata.Testdata,
        Status: labtestdata.Status,
        Total: labtestdata.Total,
        date: {date}
      });
      setdocid(docref.id);
      console.log("Document written with ID: ", docref.id);
      // refreshList();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  // console.log("Patient", labtestdata.Patientdata);
  // console.log("testdata", labtestdata.Testdata);
  // console.log("This is lab test data", labtestdata);

  //This is whole stepper code

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setselectpatient({});
    setselectTest([]);
  };

  console.log("selected patient", selectedpatient);
  console.log("selected test", selectTest);
  return (
    <>
      <AppBar sx={{ position: "relative", backgroundColor: "#5F6FFF" }}>
        <Toolbar>
          {activeStep == 0 || activeStep == 1 ? (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ) : null}

          <Typography
            sx={{ ml: 2, flex: 1, fontFamily: "Rubik" }}
            variant="h6"
            component="div"
          >
            Lab Test
          </Typography>
          {activeStep !== 2 ? (
            <Button
              autoFocus
              color="inherit"
              sx={{
                backgroundColor: "white",
                color: "#5F6FFF",
                fontFamily: "Rubik Semibold",
                borderRadius: "50px",
                width: "10vw",
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "100%", padding: "1em" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                key={label}
                {...stepProps}
                // sx={{
                //   "& .MuiStepLabel-label": {
                //     backgroundColor: activeStep == index ? "#5F6FFF" : "white",
                //     color: activeStep == index && "white",

                //     padding: "10px",
                //     borderRadius: "50px",
                //   },
                // }}
              >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, fontFamily: "Rubik" }}>
              All steps completed - Test Creation finished
            </Typography>
         
            <Grid2
              container
              sx={{ justifyContent: "center", alignItems: "center" ,height:'100%',width:'100%'}}
            >
              <Grid2 item size={{ lg: 5 }} >
                <DotLottieReact
                  src="https://lottie.host/cdce05e6-a6b8-4172-b354-b80651a80cf9/qnBNxKExOc.lottie"
                  loop
                  autoplay
                />
              </Grid2>
            </Grid2>

            <Box sx={{ display: "flex", flexDirection: "row",mt:'2.66em' }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={() => {
                  handleClose();
                  setselectTest([]);
                  setselectpatient({});
                  refreshList()
                }}
                sx={{
                  backgroundColor: "#5F6FFF",
                  color: "white",
                  fontFamily: "Rubik Semibold",
                  borderRadius: { lg: "50px", xs: "50px" },
                  padding: { xs: "1em", lg: "9px" },
                  width: { lg: "10vw", xs: "100vw", sm: "20vw" },
                }}
              >
                Go To LabTest
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            {/* {   if(activeStep === 0)
            {
              <LabtestSelection
                selectedpatient={selectedpatient}
                setselectpatient={setselectpatient}
                selectTest={selectTest}
                setselectTest={setselectTest}
              />
            }
            else if(activeStep === 1)
            {
              <LabTestBilling
                selectedpatient={selectedpatient}
                selectTest={selectTest}
                Total={Total}
              />
            }
            else if(activeStep === 2){<LabTestBarcode docid={docid} />}

          } */}
            {activeStep === 0 ? (
              <LabtestSelection
                selectedpatient={selectedpatient}
                setselectpatient={setselectpatient}
                selectTest={selectTest}
                setselectTest={setselectTest}
              />
            ) : activeStep === 1 ? (
              <LabTestBilling
                selectedpatient={selectedpatient}
                selectTest={selectTest}
                Total={Total}
                date={date}
                time={time}
              />
            ) : activeStep === 2 ? (
              <LabTestBarcode docid={docid} />
            ) : null}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep === 0 || activeStep === 2 ? null : (
                <Button
                  onClick={handleBack}
                  sx={{
                    backgroundColor: "#5F6FFF",
                    color: "white",
                    fontFamily: "Rubik Semibold",
                    borderRadius: "50px",
                    width: "10vw",
                  }}
                >
                  Back
                </Button>
              )}

              <Box sx={{ flex: "1 1 auto" }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              {selectTest.length > 0 &&
              selectedpatient.Name &&
              selectedpatient ? (
                <Button
                  onClick={() => {
                    // activeStep !== 1 ? handleNext() : handlesenddialog();
                    // activeStep == 0 ? handlelabtestdata() : null;

                    // activeStep == 2 ? refreshList() : null;
                    if (activeStep === 0) {
                      handlelabtestdata();
                    } else if (activeStep === 1) {
                      senddata();
                      // handleNext();
                    } else if (activeStep === 2) {
                      refreshList();
                      handletestcreation();
                    }
                    handleNext();
                  }}
                  size="large"
                  sx={{
                    backgroundColor: "#5F6FFF",
                    color: "white",
                    fontFamily: "Rubik Semibold",
                    borderRadius: "50px",
                    width: "10vw",
                  }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              ) : null}
            </Box>
          </React.Fragment>
        )}
      </Box>

      {/* <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List> */}
      {/* <React.Fragment>
        <Dialog
          open={opensend}
          TransitionComponent={Transition}
          keepMounted
          // onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          style={{
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <DialogTitle>{"Have you downloaded the bill copy?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              If you have not downloaded the bill copy kindly download it now!
              once yes is pressed you can't go back to previous step
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#5F6FFF" }}
              onClick={handleClosesenddialog}
            >
              No
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#5F6FFF" }}
              onClick={() => {
                handleClosesenddialog();
                senddata();
                handleNext();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment> */}
      <Snackbar
        open={testcreation}
        autoHideDuration={2000}
        onClose={handleClosetestcreation}
      >
        <Alert
          onClose={handleClosetestcreation}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Test Created Successfully, Kindly Goto LabTest!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Labtestdailog;
