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
import BiotechRoundedIcon from "@mui/icons-material/Biotech";
import CancelIcon from "@mui/icons-material/Cancel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slide from "@mui/material/Slide";
import TestcreationDailog from "./TestcreationDailog";
import Labtestdailog from "./Labtestdailog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Select from "@mui/material/Select";
import StatusUpdate from "./Statusupdate";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import UploadReport from "./UploadReport";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Tooltip } from "@mui/material";

//transition

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Labtest() {
  const [alertinfo, setalertinfo] = React.useState({ color: "", desc: "" });
  const [openalert, setOpenalert] = React.useState(false);

  const handleClickalert = () => {
    setOpenalert(true);
  };

  const handleClosealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenalert(false);
  };

  const handleuploadreport = () => {
    // handleupdate(reportid)
    handleClickalert();
    setalertinfo({ color: "success", desc: "File Upload Successfull!" });
    closeuploadreport();
  };

  const handleerror = () => {
    handleClickalert();
    setalertinfo({ color: "error", desc: "Kindly Select any file!" });
  };

  //Alert
  const [alertdata, setalertdata] = React.useState({ desc: "" });

  const [alert, setalert] = React.useState(false);

  //forthe snack bar of upload report
  // const [updaterr, setupdaterr] = React.useState(false);

  //to store the current obje to check its state for file upload
  const [currentstatus, setcurrentstatus] = React.useState({});

  const handlealert = () => {
    setalert(true);
  };

  const handlealertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setalert(false);
  };

  // const handleupdaterr = () => {
  //   setupdaterr(true);
  // };

  // const closehandleupdaterr = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setupdaterr(false);
  // };

  const [loading, setloading] = React.useState(false);

  //To control the dialog box for TestCreation (full screen Dialog)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //To Store the value of current status
  // const [status, setstatus] = React.useState("");

  //To control the dialog box for update
  const [uploadreport, setuploadreport] = React.useState(false);

  const openuploadreport = () => {
    setuploadreport(true);
  };

  const closeuploadreport = () => {
    setuploadreport(false);
  };

  //To control the dialog box for delete
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //Dailog box component
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

  // firestore code
  const [LabTestdata, setLabTestdata] = React.useState([]);

  //report id

  const [reportid, setreportid] = React.useState("");

  //storing the del id
  const [delid, setdelid] = React.useState("");
  //Making refreenace to the collection
  const collectionref = collection(db, "LabTest");

  //CODE TO FETCH THE data from firestore
  const getuserlist = async () => {
    // setloading(true);
    try {
      const data = await getDocs(collectionref);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      // console.log(filtereddata)
      setLabTestdata(filtereddata);
      // setloading(false)

      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  console.log("Labtest", LabTestdata);

  const refreshList = () => {
    getuserlist();
  };
  //useEffect to fetch the data from firestore
  useEffect(() => {
    getuserlist();
  }, []);

  console.log("DATA FROM FIRE", LabTestdata);

  //code to delete the data from firestore
  const deleted = async (id) => {
    const deletedata = doc(db, "LabTest", id);
    await deleteDoc(deletedata);
  };

  console.log("from status", status);

  const findcurrentstatus = (id) => {
    let data = LabTestdata.find((val) => val.id == id);
    // console.log(data)
    setcurrentstatus(data);
    console.log("current", currentstatus);
  };

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
              <BiotechRoundedIcon
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
                Lab Test
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
                // sx={{ backgroundColor: "#5F6FFF", borderRadius: "50px" }}
                sx={{
                  backgroundColor: "#5F6FFF",
                  color: "white",
                  fontFamily: "Rubik Semibold",
                  borderRadius: "5px",
                  width: "10vw",
                }}
              >
                Add
              </Button>
            </Grid2>
          </Grid2>

          <React.Fragment>
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <Labtestdailog
                handleClose={handleClose}
                refreshList={refreshList}
              />
            </Dialog>
          </React.Fragment>
        </Grid2>

        {loading ? (
          <Grid2
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: "60%",
            }}
          >
            <CircularProgress sx={{ color: "#5F6FFF" }} />
          </Grid2>
        ) : (
          <Grid2
            sx={{
              width: "100%",
              height: "80%",
              marginTop: "5px",
              overflow: "auto",
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
                      Id
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Patient Name
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Test Name
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Collection Type
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Total Cost
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Status
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Report
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {LabTestdata.map((val, index) => (
                    <TableRow
                      key=""
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}.
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {val.id}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <span
                          style={{
                            // backgroundColor: "yellow",
                            color: "black",
                            fontSize: "1.2em",
                            fontFamily: "Rubik",
                          }}
                        >
                          {val.Patientdata.Name}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {val.Testdata.map((name) => name.TestName).join(", ")}
                      </TableCell>
                      <TableCell align="center">
                        {val.Testdata.map((type) =>
                          type.CollectionType.join(", ")
                        ).join(", ")}
                      </TableCell>
                      <TableCell align="center">₹{val.Total}</TableCell>
                      <TableCell align="center">
                        {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value= {val.Status} 
              label="Status"
              onChange={(e) => {
                updateStatus(val.id, e.target.value); // Update status locally
              }}
            >
            
              <MenuItem value="Collected">Collected</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value={val.Status}>{val.Status}</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl> */}
                        <StatusUpdate
                          refreshList={refreshList}
                          val={val}
                          handlealert={handlealert}
                          setalertdata={setalertdata}
                          LabTestdata = {LabTestdata}
                        />
                      </TableCell>

                      <TableCell align="center">
                        {val.Report ? (
                          <DoneIcon
                            sx={{
                              // backgroundColor: "green",
                              color: "green",
                              borderRadius: "3px",
                              fontSize: "3em",
                              padding: "0.1em",
                            }}
                          />
                        ) : (
                          <PriorityHighIcon
                            sx={{
                              // backgroundColor: "red",
                              color: "red",
                              borderRadius: "3px",
                              fontSize: "3em",
                              padding: "0.1em",
                            }}
                          />
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* disabled={val.Status !== "Completed" ? true : false} */}

                          <Tooltip
                            title="Report Upload"
                            placement="top"
                            arrow
                            enterDelay={100}
                            leaveDelay={100}
                          >
                            <IconButton
                              style={{
                                cursor:
                                  val.Status === "Completed"
                                    ? "pointer"
                                    : "no-drop",
                              }}
                            >
                              <UpgradeIcon
                                sx={{
                                  backgroundColor: "#5F6FFF",
                                  color: "white",
                                  borderRadius: "3px",
                                  fontSize: "1.2em",
                                }}
                                onClick={() => {
                                  setreportid(val.id);
                                  openuploadreport();
                                  findcurrentstatus(val.id);
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
                                  fontSize: "1.2em",
                                  padding: "5px",
                                  borderRadius: "3px",
                                }}
                                onClick={() => {
                                  handleClickOpen1();
                                  setdelid(val.id);
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {currentstatus.Status === "Completed" ? (
              <React.Fragment>
                {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open draggable dialog
        </Button> */}
                <Dialog
                  open={uploadreport}
                  // onClose={handleClose}
                  PaperComponent={PaperComponent}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                  ></DialogTitle>
                  <DialogContent>
                    {/* dailog box component */}

                    <UploadReport
                      refreshList={refreshList}
                      handleuploadreport={handleuploadreport}
                      handleerror={handleerror}
                      reportid={reportid}
                      closeuploadreport={closeuploadreport}
                    />
                  </DialogContent>
                  <DialogActions></DialogActions>
                </Dialog>
              </React.Fragment>
            ) : (
              console.log("err")
            )}

            {/* delete dialog */}

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
                      setalertdata({ desc: "Test Case Deleted Successfully" });
                    }}
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </Grid2>
        )}
        {/* Table starts here */}
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
            {alertdata.desc}
          </Alert>
        </Snackbar>

        {/* <Snackbar
          open={updaterr}
          autoHideDuration={2000}
          onClose={closehandleupdaterr}
        >
          <Alert
            onClose={closehandleupdaterr}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            "Test Case is not Completed yet!!"
          </Alert>
        </Snackbar> */}
        <Snackbar
          open={openalert}
          autoHideDuration={2000}
          onClose={handleClosealert}
        >
          <Alert
            onClose={handleClosealert}
            severity={alertinfo.color}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertinfo.desc}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default React.memo(Labtest);
