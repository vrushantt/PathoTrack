import {
  Button,
  Container,
  Grid2,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
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
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeople";
import CancelIcon from "@mui/icons-material/Cancel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slide from "@mui/material/Slide";
import PatientMasterDialog from "./PatientMasterDialog";
import { Tooltip } from "@mui/material";

import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import PatientMasterUpdate from "./PatientMasterUpdate";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

//DIALOG Transition Delete
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

//Main function

function PatientMaster() {
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

  //To store the id of the object to be updated
  const [updateid, setupdateid] = React.useState("");

  //To store the id of the object to be deleted
  const [delid, setdelid] = React.useState("");

  //To store filtered data object
  const [updatedata, setupdatedata] = React.useState({});

  // firestore code
  const [userdata, setUserdata] = React.useState([]);

  //Making refreenace to the collection
  const collectionref = collection(db, "PatientMaster");

  //CODE TO FETCH THE data from firestore
  const getuserlist = async () => {
    try {
      const data = await getDocs(collectionref);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setUserdata(filtereddata);
      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userdata);

  //useEffect to fetch the data from firestore
  useEffect(() => {
    getuserlist();
  }, []);

  //code to delete the data from firestore
  const deleted = async (id) => {
    const deletedata = doc(db, "PatientMaster", id);
    await deleteDoc(deletedata);
  };

  //code to find the object from array over the click of edit icon
  const handleedit = (id) => {
    console.log("userdata", userdata, id);
    let data = userdata.find((val) => val.id === id);
    setupdatedata(data);
    console.log("filteredobj", data);
  };

  console.log("updatedata", updatedata);

  //To control the dialog box for UserCreation
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //To control the dialog box for UserCreation Delete

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //To control the dialog box for update
  const [openupdate, setOpenupdate] = React.useState(false);

  const handleClickOpenupdate = () => {
    setOpenupdate(true);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  function PaperComponent(props) {
    const nodeRef = React.useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef}
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper sx={{ backgroundColor: "" }} {...props} ref={nodeRef} />
      </Draggable>
    );
  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          // backgroundColor: "red",
          width: "100vw",
          height: "100vh",
          display: "flex",
          overflow: "hidden",
          position: "fixed",
          flexDirection: "column",
          gap: "2px",
          // justifyContent:'center',
          // alignItems:'center',
        }}
      >
        <Grid2
          container
          //   direction="column"
          sx={{
            // backgroundColor: "pink",

            width: "100%",
            height: { lg: "11vh", xs: "20vh", md: "11vh", sm: "11vh" },

            marginTop: "6px",
            // justifyContent: "center",
            // alignItems: "center",
            justifyContent: "space-between",
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
              <EmojiPeopleRoundedIcon
                sx={{
                  backgroundColor: "#5F6FFF",
                  color: "white",
                  borderRadius: "50px",
                  width: "100%",
                  height: "5vh",
                  transition: "transform 1s ease-in-out",
                  "&:hover": {
                    transform: "rotate(360deg)",
                  },
                }}
              />
            </Grid2>

            <Grid2 item>
              <Typography
                fontSize="1.7em"
                fontFamily="Rubik"
                sx={{ color: "" }}
              >
                Patient Master
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid2 item>
              {" "}
              <Button
                size="large"
                onClick={handleClickOpen}
                variant="contained"
                sx={{
                  backgroundColor: "#5F6FFF",
                  color: "white",
                  fontFamily: "Rubik Semibold",
                  borderRadius: "5px",
                  width: "10vw",
                }}
              >
                <div>{/* <EmojiPeopleRoundedIcon /> */}</div>
                Add
              </Button>
            </Grid2>
          </Grid2>

          {/* <Grid2><Typography fontSize='1em' fontFamily="Rubik"  >
            You can create a User from here:
            </Typography></Grid2> */}

          {/* dailog for the PatientMaster */}
          <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open draggable dialog
        </Button> */}
            <Dialog
              open={open}
              // onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              ></DialogTitle>
              <DialogContent>
                <PatientMasterDialog
                  handleClose={handleClose}
                  refreshList={() => getuserlist()}
                />
              </DialogContent>
              <DialogActions>
                {/* <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleClose}>Subscribe</Button> */}
              </DialogActions>
            </Dialog>
          </React.Fragment>

          {/* dialog for the update */}
          <React.Fragment>
            <Dialog
              open={openupdate}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              ></DialogTitle>
              <DialogContent>
                <PatientMasterUpdate
                  handleCloseupdate={handleCloseupdate}
                  updateid={updateid}
                  updatedata={updatedata}
                  refreshList={() => getuserlist()}
                />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </React.Fragment>
        </Grid2>

        <Grid2
          sx={{
            width: "100%",
            height: "80%",
            marginTop: "5px",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                sx={{
                  backgroundColor: "#5F6FFF",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Sr.No</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Number
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Age
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Address
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Gender
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Height
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Weight
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userdata.map((row, index) => (
                  <TableRow
                    key={row.Name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}.
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.Name}
                    </TableCell>
                    <TableCell align="center">{row.Email}</TableCell>
                    <TableCell align="center">{row.Number}</TableCell>
                    <TableCell align="center">{row.DOB} Years</TableCell>
                    <TableCell align="center">{row.Address}</TableCell>
                    <TableCell align="center">{row.Gender}</TableCell>
                    <TableCell align="center">{row.Height}</TableCell>
                    <TableCell align="center">{row.Weight}</TableCell>
                    <TableCell align="center">
                      <Tooltip
                        title="Edit"
                        placement="top"
                        arrow
                        enterDelay={100}
                        leaveDelay={100}
                      >
                        <IconButton>
                          <EditIcon
                            sx={{
                              backgroundColor: "#5F6FFF",
                              color: "white",
                              borderRadius: "3px",
                              fontSize: "1.1em",
                              padding: "3px",
                            }}
                            onClick={() => {
                              // console.log("icon clicked");
                              setupdateid(row.id);
                              handleedit(row.id);
                              //  console.log("the og", row.id);
                              //  console.log("updateid", row.id);
                              handleClickOpenupdate();
                            }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title="Delete"
                        placement="top"
                        arrow
                        enterDelay={100}
                        leaveDelay={100}
                      >
                        <IconButton>
                          {" "}
                          <DeleteIcon
                            sx={{
                              backgroundColor: "red",
                              color: "white",
                              fontSize: "1.1em",
                              padding: "3px",
                              borderRadius: "3px",
                            }}
                            onClick={() => {
                              handleClickOpen1();
                              setdelid(row.id);
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <React.Fragment>
            <Dialog
              open={open1}
              TransitionComponent={Transition}
              keepMounted
              // onClose={handleClose1}
              aria-describedby="alert-dialog-slide-description"
              style={{
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <DialogTitle>{"Delete Item?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to delete this item? This action is
                  permanent and cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#5F6FFF" }}
                  onClick={handleClose1}
                >
                  Disagree
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#5F6FFF" }}
                  onClick={() => {
                    handleClose1();
                    deleted(delid);
                    getuserlist();
                    handlealert();
                  }}
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Grid2>

        <Snackbar
          open={alert}
          autoHideDuration={2000}
          onClose={handlealertClose}
        >
          <Alert
            onClose={handlealertClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Item Deleted Successfully!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default PatientMaster;
