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
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//For Multiselect to choose the colelction type
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Blood",
  "Urine",
  "Swab",
  "Tissue",
  "Faeces",
  "Sputum",
  "Fluids",
  "Cytology",
  "Other",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const TestcreationDailog = ({ handleClose, refreshList }) => {
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
  const [Userdata, setUserdata] = React.useState({ CollectionType: [] });
  const handlechange = (e) => {
    setUserdata({ ...Userdata, [e.target.name]: e.target.value });
  };

  //To rerender the component if need
  const [render, setrensder] = React.useState(false);

  //firebase code stats

  //firebase collection reference
  const collectionref = collection(db, "TestMaster");

  //to send data to firebase
  const senddata = async () => {
    try {
      let docref = await addDoc(collectionref, {
        TestName: Userdata.TestName,
        Description: Userdata.Description,
        CollectionType: Userdata.CollectionType,
        Cost: Userdata.Cost,
      });
      console.log("Document written with ID: ", docref.id);
      refreshList();
        toast.success("Test Added Successfully!!", {
              position: "top-right",
            });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  //handler to add the data in firebase
  const Add = () => {
    senddata();
    setUserdata({ CollectionType: [] });
    handleClose();
    refreshList();
  };

  //code for handling the multiselect
  const theme = useTheme();

  return (
    <>
      <Box
        container
        elevation={4}
        spacing={2}
        direction={"column"}
        sx={{
          // borderRadius: "20px",
          width: { xs: "65vw", sm: "50vw", md: "40vw", lg: "30vw" }, // Make it more flexible on small screens
          // height: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },

          // height: "79%",
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
          <Grid2 item container size={9.6} sx={{ justifyContent: "end" }}>
            <Typography
              //   align="center"
              fontFamily="Rubik Semibold"
              variant="h4"

              // sx={{border:'2px solid #5F6FFF',width:'90%'}}
            >
              Test Master Add
            </Typography>
          </Grid2>

          <Grid2 item container size={2.4} sx={{ justifyContent: "end" }}>
            <IconButton
              sx={{
                backgroundColor: "#5F6FFF",
                color: "white",
                borderRadius: "10%",
                width: "40px",
                height: "40px",
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

        <Grid2 container>
          <Grid2
            item
            size={{ lg: 12, sm: 12, md: 12, xs: 12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              value={Userdata && Userdata.TestName ? Userdata.TestName : ""}
              size="small"
              sx={{
                width: "90%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
              margin="normal"
              id="outlined-basic"
              label="Test Name"
              placeholder="Test Name"
              name="TestName"
              variant="outlined"
            />
          </Grid2>

          <Grid2
            item
            size={{ lg: 12, sm: 12, md: 12, xs: 12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              value={
                Userdata && Userdata.Description ? Userdata.Description : ""
              }
              size="small"
              sx={{
                width: "90%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
              margin="normal"
              id="outlined-basic"
              label="Description"
              placeholder="Description"
              name="Description"
              variant="outlined"
            />
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2
            item
            size={{ lg: 12, sm: 12, md: 12, xs: 12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <FormControl sx={{ m: 1, width: "90%" }}>
              <InputLabel id="demo-multiple-name-label">
                Collection Type
              </InputLabel>
              <Select
                size="small"
                sx={{
                  // width: "90%",
                  height: "6.5vh",
                  "& fieldset": { border: "none" },
                  border: "1px solid #5F6FFF",
                  borderRadius: "3px",
                }}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={Userdata.CollectionType}
                onChange={handlechange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                name="CollectionType"
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, Userdata.CollectionType, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2
            item
            size={{ lg: 12, sm: 12, md: 12, xs: 12 }}
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              size="small"
              value={Userdata && Userdata.Cost ? Userdata.Cost : ""}
              //   size="small"
              sx={{
                width: "90%",
                "& fieldset": { border: "none" },
                border: "1px solid #5F6FFF",
                borderRadius: "3px",
              }}
              onChange={(e) => {
                handlechange(e);
              }}
              type="number"
              margin="normal"
              id="outlined-basic"
              label="Cost"
              placeholder="Cost"
              name="Cost"
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
                Userdata.TestName &&
                Userdata.Description &&
                Userdata.CollectionType &&
                Userdata.Cost
                  ? Add()
                  : handleClick();
              }
            }}
            sx={{ backgroundColor: "#5F6FFF", width: "90%" }}
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
    </>
  );
};

export default TestcreationDailog;
