import React, { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { db } from "./Config/Firebaseconfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

// const StatusUpdate = ({ val }) => {
//   const [status, setstatus] = React.useState("");
//   console.log(status);
//   const [updateid, setupdateid] = React.useState("");
//   useEffect(() => {
//     setupdateid(val.id);
//   }, [val]);

//   //firebase collection reference
//   const collectionref = collection(db, "LabTest");

//   //to update the data in firebase

//   //   const update = () => {
//   //     setUserdata({});
//   //     handleupdate(updateid);
//   //     handleCloseupdate();
//   //     refreshList();
//   //   };

//   return (
// <>
//   <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
//     <InputLabel id="demo-select-small-label">Status</InputLabel>
//     <Select
//       labelId="demo-select-small-label"
//       id="demo-select-small"
//       value={status}
//       label="Status"
//       onChange={(e) => {
//         setstatus(e.target.value);
//         async (updateid) => {
//           const updatedataref = doc(db, "LabTest", updateid);
//           try {
//             await updateDoc(updatedataref, {
//               Status: status,
//             });
//           } catch (err) {
//             console.log(err);
//           }
//         };
//       }}
//     >
//       {/* <MenuItem value="0">
//                 <em>None</em>
//               </MenuItem> */}
//       <MenuItem value="Collected">Collected</MenuItem>
//       <MenuItem value="Processing">Processing</MenuItem>
//       <MenuItem value={val.Status}>{val.Status}</MenuItem>
//       <MenuItem value="Completed">Completed</MenuItem>
//     </Select>
//   </FormControl>
// </>
//   );
// };

// export default StatusUpdate;

const Statusupdate = ({
  val,
  handlealert,
  setalertdata,
  refreshList,
  LabTestdata,
}) => {
  const [status, setstatus] = React.useState(val.Status || "Created");

  console.log(status);
  const [updateid, setupdateid] = React.useState("");
  useEffect(() => {
    setupdateid(val.id);
  }, [val]);

  console.log(val);

  const handleUpdate = async (str) => {
    const updatedataref = doc(db, "LabTest", updateid);
    try {
      await updateDoc(updatedataref, {
        Status: str,
      });
      console.log("status updated");
    } catch (err) {
      console.log(err);
    }
  };

  //   //firebase collection reference
  //   const collectionref = collection(db, "LabTest");
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Status</InputLabel>
        <Select
          disabled={
            val.Report && val.Status === "Completed" && status === "Completed"
          }
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={val.Status}
          label="Status"
          onChange={(e) => {
            setstatus(e.target.value);
            handleUpdate(e.target.value);
            handlealert();
            setalertdata({
              desc: `Status Updated Successfully for ${val.Patientdata.Name}`,
            });
            refreshList();
          }}
          // sx={{"& fieldset": { border: "none" },
          //           border: "2px solid #5F6FFF",
          //           borderRadius: "3px"}}
        >
          <MenuItem value="Created">Created</MenuItem>
          <MenuItem value="Collected">Collected</MenuItem>
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Statusupdate;
