import * as React from "react";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
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
import { Grid2 } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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

function LabtestSelection({
  selectedpatient,
  setselectpatient,
  setselectTest,
  selectTest,
}) {
  // firestore code to store the patient data from it
  const [patientdata, setpatientdata] = React.useState([]);
  const [update, doUpdate] = React.useState(true);
  useEffect(() => {
    doUpdate(!update);
  }, [selectTest, selectedpatient]);
  //To store filtered data object
  // const [updatedata, setupdatedata] = React.useState({});

  //TO store the test data fetched from firebase
  const [testdata, settestdata] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  //Making refreenace to the collection
  const collectionref = collection(db, "PatientMaster");
  const testCollectionRef = collection(db, "TestMaster");

  //CODE TO FETCH THE data from firestore
  const getuserlist = async () => {
    try {
      setLoading(true);
      const data = await getDocs(collectionref);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));

      setpatientdata(filtereddata);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("this is patientdata", patientdata);

  //CODE TO FETCH THE data from firestore
  const gettestdata = async () => {
    try {
      const data = await getDocs(testCollectionRef);
      const filterdata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      settestdata(filterdata);
      // console.log("This is filter data", filterdata);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("this is test data", testdata);

  //useEffect to fetch the data from firestore
  useEffect(() => {
    getuserlist();
    gettestdata();
  }, []);

  //code to find the object from array over the click of edit icon
  //   const handleedit = (id) => {
  //     console.log("patientdata", patientdata, id);
  //     let data = patientdata.find((val) => val.id === id);
  //     setupdatedata(data);
  //     console.log("filteredobj", data);
  //   };

  //   console.log("updatedata", updatedata);
  //code for handling the multiselect
  const theme = useTheme();
  // console.log("fROM DIALOG",selectedpatient)

  console.log("selectedpatient", selectedpatient);
  console.log("selectedtest", selectTest);
  return (
    <>
      <Grid2
        container
        spacing={2.5}
        sx={{
          // backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2 item size={{ lg: 6, xs: 12 }} container>
          {" "}
          {console.log("sp------------", selectedpatient)}
          <Autocomplete
            // sx={{ width: 300 }}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(patientdata, value) =>
              patientdata.Name === value.Name
            }
            getOptionLabel={(patientdata) =>
              `${patientdata.Name} (${patientdata.Number})`
            }
            options={patientdata}
            loading={loading}
            renderInput={(params) => (
              <TextField
                value={
                  selectedpatient
                    ? `${selectedpatient.Name} (${selectedpatient.Number})`
                    : ""
                }
                placeholder="Select Patient Name from Here"
                sx={{
                  width: {
                    lg: "49vw",
                    xs: "92vw",
                    sm: "96vw",
                    md: "97vw",
                    "& fieldset": { border: "none" },
                    border: "2px solid #5F6FFF",
                    borderRadius: "3px",
                  },
                }}
                {...params}
                label="Patient Name"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  },
                }}
              />
            )}
            onChange={(event, value) => {
              setselectpatient(value);
            }}
          />
        </Grid2>

        <Grid2 item size={{ lg: 6, xs: 12 }}>
          <FormControl
            sx={{
              width: {
                lg: "99%",
                xs: "92vw",
                sm: "96vw",
                md: "97vw",
                "& fieldset": { border: "none" },
                border: "2px solid #5F6FFF",
                borderRadius: "3px",
              },
            }}
          >
            <InputLabel id="demo-multiple-name-label">Test Name</InputLabel>
            <Select
              //   size='small'
              // sx={{ border: "1px solid #5F6FFF" }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              // value={Array.isArray(selectTest) ? selectTest.map((val) => val) : []}
              value={selectTest ? selectTest : ""}
              onChange={(event) => {
                setselectTest(event.target.value);
              }}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              name="CollectionType"
            >
              {testdata.map((item) => (
                <MenuItem key={item.id} value={item}>
                  {item.TestName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2
          item
          container
          size={{ lg: 6, xs: 12 }}
          sx={{ justifyContent: "center", alignItems: "center", mt: "3em" }}
        >
          {" "}
          <DotLottieReact
            src="https://lottie.host/4713a971-4ac9-430e-ab54-b6729feaff13/ro7UvKEfgh.lottie"
            loop
            autoplay
          />
        </Grid2>
      </Grid2>
    </>
  );
}

export default React.memo(LabtestSelection);
