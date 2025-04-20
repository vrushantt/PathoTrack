import React from "react";
import {
  Button,
  Container,
  Grid2,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { db } from "./Config/Firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientMasterDialog = ({ handleClose, refreshList }) => {

  //alert code
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClosealert = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpen(false);
    };

  //Code to fetch the data from input fields
  const [Userdata, setUserdata] = React.useState({});
  const handlechange = (e) => {
    setUserdata({ ...Userdata, [e.target.name]: e.target.value });
  };

  //To rerender the component if need
  const [render, setrensder] = React.useState(false);

  //firebase code stats

  //firebase collection reference
  const collectionref = collection(db, "PatientMaster");

  //to send data to firebase
  const senddata = async () => {
    try {
      let docref = await addDoc(collectionref, {
        Name: Userdata.Name,
        Email: Userdata.Email,
        Number: Userdata.Number,
        DOB: Userdata.DOB,
        Address: Userdata.Address,
        Gender: Userdata.Gender,
        Height: Userdata.Height,
        Weight: Userdata.Weight,
      });

      console.log("Document written with ID: ", docref.id);
      refreshList();
      toast.success("Patient Created Successfully!!", {
                    position: "bottom-left",
                  });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

//handler to add the data in firebase
  const Add = () => {
    senddata()
    setUserdata({});
    handleClose();
    refreshList();
  };

  return (
    <>
      <Box
        container
        elevation={4}
        spacing={2}
        direction={"column"}
        sx={{
          // borderRadius: "20px",
          // width: "100%",
          // height: "79%",
          width: { xs: "100%", sm: "70vh", md: "70vh", lg: "100%" }, // Make it more flexible on small screens
          height: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          backgroundColor: "aliceblue",
          padding: "1em",
          overflow: "auto",

          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Grid2
          item
          container
          // sx={{ justifyContent: "center" }}
        >
          <Grid2 item container size={9.7} sx={{ justifyContent: "end" }}>
            <Typography
              //   align="center"
              fontFamily="Rubik Semibold"
              variant="h4"

              // sx={{border:'2px solid #5F6FFF',width:'90%'}}
            >
              Patient Master Add
            </Typography>
          </Grid2>

          <Grid2 item container size={2.2} sx={{ justifyContent: "end" }}>
            <IconButton
               sx={{
                backgroundColor: "#5F6FFF",
                color: "white",
                borderRadius: "10%",
                width: "40px",
                height: "40px",
                "&:hover": {backgroundColor:'red'}
                
              }}
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                handleClose();
              }}
              color="inherit"
            >
              <CancelIcon />
            </IconButton>
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2
            item
            size={{ lg: 6, sm: 6, md: 6,xs:12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              value={Userdata && Userdata.Name ? Userdata.Name : ""}
              size="small"
              sx={{
                width: "95%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
              margin="normal"
              id="outlined-basic"
              label="Name"
              placeholder="Name"
              name="Name"
              variant="outlined"
            />
          </Grid2>

          <Grid2
            item
            size={{ lg: 6, sm: 6, md: 6,xs:12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              type="email"
              value={Userdata && Userdata.Email ? Userdata.Email : ""}
              size="small"
              sx={{
                width: "95%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
              margin="normal"
              id="outlined-basic"
              label="Email"
              placeholder="Email"
              name="Email"
              variant="outlined"
            />
          </Grid2>
        </Grid2>
        <Grid2 container>
          <Grid2
            item
            size={{ lg: 6, sm: 6, md: 6,xs:12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              value={Userdata && Userdata.Number ? Userdata.Number : ""}
              size="small"
              sx={{
                width: "95%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
              type="number"
              margin="normal"
              id="Number"
              label="Number"
              placeholder="Number"
              name="Number"
              variant="outlined"
            />
          </Grid2>

          <Grid2
            item
            size={{ lg: 6, sm: 6, md: 6,xs:12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              
              value={Userdata && Userdata.DOB ? Userdata.DOB : ""}
              size="small"
              sx={{
                width: "95%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}              onChange={(e) => {
                handlechange(e);
              }}
              type="number"
              margin="normal"
              id="outlined-basic"
              label="Age"
              placeholder="Age"
              name="DOB"
              variant="outlined"
            />
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2
            item
            size={{ lg: 12, sm: 12, md: 12 ,xs:12}}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              value={Userdata && Userdata.Address ? Userdata.Address : ""}
              size="small"
              sx={{
                width: "97%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}              onChange={(e) => {
                handlechange(e);
              }}
              margin="normal"
              id="Address"
              label="Address"
              placeholder="Address"
              name="Address"
              variant="outlined"
            />
          </Grid2>

          <Grid2
            item
            size={{ lg: 12, sm: 12, md: 12 ,xs:12}}
            container
            sx={{ justifyContent: "center", alignItems: "center"}}
          >
            <FormControl
              sx={{
                mt:1,
                border: "1px solid #5F6FFF",
                width: "97%",
                padding: "5px",
                height: {lg:'4.5em',xs:'9em',md:'4.5em',sm:'4.5em'},
              }}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => {
                  handlechange(e);
                }}
              >
                <FormControlLabel
                  checked={Userdata && Userdata.Gender == "Male"}
                  name="Gender"
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  checked={Userdata && Userdata.Gender == "Female"}
                  name="Gender"
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  checked={Userdata && Userdata.Gender == "Other"}
                  name="Gender"
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2
            item
            size={{ lg: 6, sm: 6, md: 6,xs:12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              value={Userdata && Userdata.Height ? Userdata.Height : ""}
              size="small"
              sx={{
                width: "95%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}              onChange={(e) => {
                handlechange(e);
              }}
              type="number"
              margin="normal"
              id="Height"
              label="Height"
              placeholder="Height in cm"
              name="Height"
              variant="outlined"
            />
          </Grid2>
          <Grid2
            item
            size={{ lg: 6, sm: 6, md: 6,xs:12}}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              value={Userdata && Userdata.Weight ? Userdata.Weight : ""}
              size="small"
              sx={{
                width: "95%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}              onChange={(e) => {
                handlechange(e);
              }}
              type="number"
              margin="normal"
              id="Weight"
              label="Weight"
              placeholder="Weight in kg"
              name="Weight"
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
              console.log(Userdata);
              {
                Userdata &&
                Userdata.Name &&
                Userdata.Email &&
                Userdata.Address &&
                Userdata.Height &&
                Userdata.Weight &&
                Userdata.Gender &&
                Userdata.DOB &&
                Userdata.Number
                  ? Add()
                  : handleClick();
              }
            }}
            sx={{ backgroundColor: "#5F6FFF", width: "97%" }}
            variant="contained"
          >
            Add
          </Button>
        </Grid2>

        <Snackbar  open={open} autoHideDuration={600} onClose={handleClosealert}>
          <Alert
            onClose={handleClosealert}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Kindly fill all the data fields!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default PatientMasterDialog;
