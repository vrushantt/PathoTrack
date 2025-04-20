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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";
import { useRef } from "react";
import Buffer from "buffer";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";



const baseStyle = {
  // flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "bottom",

  padding: "2em",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "grey",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "grey",
};

const acceptStyle = {
  borderColor: "green",
};

const rejectStyle = {
  borderColor: "red",
};

const UploadReport = ({ refreshList,closeuploadreport ,reportid, handleuploadreport,handleerror}) => {
  

  const[reportdata,setreportdata] = React.useState(null);
  // Removed duplicate declaration of report and setreport
  const [report, setreport] = React.useState("");

 //to update the data in firebase
    const handleupdate = async (reportid) => {
      const updatedataref = doc(db, "LabTest", reportid);
      try {
        await updateDoc(updatedataref, {
         Report: report,
        });
      } catch (err) {
        console.log(err);
      }
    };

  const hiddenInputRef = useRef(null);

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (incomingFiles) => {
      console.log(incomingFiles[0]);
      let file = incomingFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Convert to Base64

        reader.onload = () => {
          const base64String = reader.result;
          console.log("Base64 Image:", base64String);
          setreport(base64String);
          // save this str in firebase
        };

        reader.onerror = (error) => {
          console.error("Error converting image to Base64:", error);
        };
      }
    },
  });

  console.log("Report",report)
  const files = acceptedFiles.map((file) => (
    <li key={file.path.replace("./", "")} style={{ fontFamily: "Rubik" }}>
      {file.path.replace("./", "")} - {(file.size / (1024 * 1024)).toFixed(2)}{" "}
      MB
    </li>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    })
    // [isFocused, isDragAccept, isDragReject]
  );

  console.log(typeof acceptedFiles);
  console.log("report", report);

  // const[alertinfo,setalertinfo] = React.useState({color:'',
  //   desc:''
  // })
  // const [openalert, setOpenalert] = React.useState(false);

  // const handleClickalert = () => {
  //   setOpenalert(true);
  // };

  // const handleClosealert = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpenalert(false);
  // };

  const handleuploadreport1 = ()=>{
    handleupdate(reportid)
    handleuploadreport()
   
  }

  const handleerror1 = () =>{
  handleerror()
  }

  return (
    <>
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
              Upload Report
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
                closeuploadreport();
              }}
              color="inherit"
            >
              <CancelIcon />
            </IconButton>
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2 item size={12}>
            {" "}
            <div className="container">
              <div {...getRootProps({ style })}>
                {/*
          Add a hidden file input 
          Best to use opacity 0, so that the required validation message will appear on form submission
        */}
                {/* <TextField type="file"  style={{ opacity: 1 }}
                  ref={hiddenInputRef} ></TextField> */}
                {/* <input
                  type="file"
                  style={{ opacity: 0 }}
                  ref={hiddenInputRef}
                  onChange={(e)=>{console.log(e)}}
                /> */}
                <input onChange={(e)=>{setreportdata(e.target.value)}} {...getInputProps()} />
                <Grid2
                  container
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Typography sx={{ color: "blue", cursor: "pointer" }}>
                    Drag and Drop or Select File To Upload
                  </Typography>
                </Grid2>
              </div>
            </div>
          </Grid2>
        </Grid2>

        {report ? (
          <Grid2 container>
            <Grid2 item size={12} sx={{ fontFamily: "Rubik" }}>
              Selected File: {files}
            </Grid2>
          </Grid2>
        ) : null}

        <Grid2
          item
          size={{ lg: 12, sm: 12, md: 12 }}
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Button
            onClick={() => {
              acceptedFiles.length > 0  ?   handleuploadreport1(): handleerror1();
              refreshList()
            }}
            sx={{
              backgroundColor: "#5F6FFF",
              border: "1px solid #5F6FFF",
              width: "100%",
              // "&:hover": {color:'#5F6FFF',backgroundColor:'green'}
            }}
            variant="contained"
          >
            Submit
          </Button>
        </Grid2>
        {/* <Snackbar open={openalert} autoHideDuration={600} onClose={handleClosealert}>
          <Alert
            onClose={handleClosealert}
            severity={alert.color}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alert.desc}
          </Alert>
        </Snackbar> */}
        
      </Box>
    </>
  );
};

export default UploadReport;
