import {
  Button,
  Grid2,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { db } from "./Config/Firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { auth } from "./Config/Firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


function UsercreationDailog({ handleClose, refreshList }) {
  //handler for loading effect
  const [loading, setloading] = React.useState(false);

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
  //Logic for the firebase Authentication
  const Authentication = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        Userdata.email,
        Userdata.Password
      );

      toast.success("User Registered Successfully!!", {
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
        position: "top-right",
      });
    }
  };
  //firebase collection reference
  const collectionref = collection(db, "Usercreation");

  //to send data to firebase
  const senddata = async () => {
    try {
      let docref = await addDoc(collectionref, {
        email: Userdata.email,
        Name: Userdata.Name,
        Password: Userdata.Password,
        Role: Userdata.Role,
      });
      console.log("Document written with ID: ", docref.id);
      refreshList();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  //handler to add the data in firebase
  const Add = () => {
    senddata();
    setUserdata({});
    handleClose();
    refreshList();
    Authentication();
  };

  return (
    <div>
      {" "}
      <Box
        container
        spacing={0}
        direction={"column"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          borderRadius: "px",
          // width: "25vw",
          width: { xs: "60vw", sm: "50vw", md: "40vw", lg: "25vw" }, // Make it more flexible on small screens
          // height: { xs: "auto", sm: "80%", md: "100%", lg: "74%" },
          height: "",
          backgroundColor: "aliceblue",
          padding: "15px",
          overflow: "auto",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Grid2 container>
          <Grid2 item size={10} container sx={{ justifyContent: "end" }}>
            <Typography fontFamily="Rubik SemiBold" variant="h4">
              User Creation
            </Typography>
          </Grid2>

          <Grid2 item container size={2} sx={{ justifyContent: "end" }}>
            <IconButton
              sx={{
                backgroundColor: "#5F6FFF",
                color: "white",
                borderRadius: "10%",
                width: "35px",
                height: "35px",
                "&:hover": { backgroundColor: "red" },
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

        <Grid2 item size={{ lg: 12, sm: 12, md: 12, xs: 12 }}>
          <Typography fontFamily="Rubik" variant="body1" align="center">
            Please Fill All Details
          </Typography>
        </Grid2>

        <Grid2
          item
          size={12}
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <TextField
            onChange={(e) => {
              handlechange(e);
            }}
            required
            value={Userdata && Userdata.Name ? Userdata.Name : ""}
            size="small"
            sx={{
              width: "95%",
              "& fieldset": { border: "none" },
              border: "1px solid #5F6FFF",
              borderRadius: "3px",
            }}
            id="Name"
            label="Name"
            placeholder="Name"
            name="Name"
            variant="outlined"
          />
        </Grid2>

        <Grid2
          item
          size={{ lg: 12, sm: 12, md: 12 }}
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <TextField
            onChange={(e) => {
              handlechange(e);
            }}
            value={Userdata && Userdata.email ? Userdata.email : ""}
            required
            size="small"
            sx={{
              width: "95%",
              "& fieldset": { border: "none" },
              border: "1px solid #5F6FFF",
              borderRadius: "3px",
            }}
            id="Email"
            label="Email"
            placeholder="Email"
            name="email"
            variant="outlined"
          />
        </Grid2>

        <Grid2
          item
          size={{ lg: 12, sm: 12, md: 12 }}
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <FormControl
            sx={{
              width: "95%",
              "& fieldset": { border: "none" },
              border: "1px solid #5F6FFF",
              borderRadius: "3px",
            }}
            size="small"
          >
            <InputLabel id="demo-select-small-label">Role</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="Role"
              value={Userdata && Userdata.Role ? Userdata.Role : ""}
              label="Role"
              onChange={(e) => {
                handlechange(e);
              }}
              // sx={{"& fieldset": { border: "none" },
              //           border: "2px solid #5F6FFF",
              //           borderRadius: "3px"}}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Lab Technician">Lab Technician</MenuItem>
              <MenuItem value="Receptionist">Receptionist</MenuItem>
              {/* <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem> */}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2
          item
          size={{ lg: 12, sm: 12, md: 12 }}
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <TextField
            onChange={(e) => {
              handlechange(e);
            }}
            value={Userdata && Userdata.Password ? Userdata.Password : ""}
            required
            size="small"
            sx={{
              width: "95%",
              "& fieldset": { border: "none" },
              border: "1px solid #5F6FFF",
              borderRadius: "3px",
            }}
            id="Password"
            label="Password"
            placeholder="Password"
            name="Password"
            variant="outlined"
          />
        </Grid2>

        <Grid2
          item
          size={{ lg: 12, sm: 12, md: 12 }}
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Button
            onClick={() => {
              console.log(Userdata);

              {
                Userdata &&
                Userdata.Name &&
                Userdata.email &&
                Userdata.Role &&
                Userdata.Password
                  ? Add()
                  : handleClick();
              }
            }}
            sx={{
              backgroundColor: "#5F6FFF",
              border: "1px solid #5F6FFF",
              width: "100%",
              // "&:hover": {color:'#5F6FFF',backgroundColor:'green'}
            }}
            variant="contained"
          >
            Add
          </Button>
        </Grid2>
        <Snackbar open={open} autoHideDuration={600} onClose={handleClosealert}>
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
    </div>
  );
}

export default UsercreationDailog;
