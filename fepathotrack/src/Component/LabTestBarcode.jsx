import React from "react";
import { useEffect } from "react";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import Barcode from "react-barcode";
import { Box, Button, Container, Grid2 } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CircularProgress from '@mui/material/CircularProgress';

const LabTestBarcode = ({ docid }) => {
  console.log("id", docid);
  const [loading, setloading] = React.useState(false);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  },[]);


   //code to download bill
   const pdfref = React.useRef();
   const downloadPDF = () => {
     const input = pdfref.current;
     const pdfWidth = 210;
     const pdfHeight = 297;
 
     html2canvas(input, {
       scale: 2,
       width: input.offsetWidth,
       height: input.offsetHeight,
     }).then((canvas) => {
       const imgData = canvas.toDataURL("image/png");
       const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
       // const pdfWidth = pdf.internal.pageSize.getWidth();
       // const pdfHeight = pdf.internal.pageSize.getHeight();
       const imgWidth = canvas.width;
       const imgHeight = canvas.height;
       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
       const imgX = (pdfWidth - imgWidth * ratio )  // Add 20mm margin
       const imgY = (pdfHeight - imgHeight * ratio) / 2.5 + 10 // Add 20mm margin
       pdf.addImage(
         imgData,
         "PNG",
         imgX,
         imgY,
         imgWidth * ratio,
         imgHeight * ratio
       );
 
      //  // Add a page border
      //  pdf.setLineWidth(0.6);
      //  pdf.setDrawColor(0, 0, 0);
      //  pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10, "S");
 
       pdf.save(`${docid}.pdf`);
     });
   };

   
  return (
    <>

    <Grid2 container sx={{height:{lg:'68vh',xs:'60vh',md:'68vh'},width:'100%',justifyContent:'center',alignItems:'center'}}>
    {loading ? (
           <CircularProgress sx={{color:'#5F6FFF'}}/>
        ) : (
          <>
          <Grid2 container spacing={5}>
            <Grid2 item container sx={{justifyContent:'center',alignItems:'center'}} size={12} ref={pdfref}>
              <Barcode value={docid} />
            </Grid2>
        
            <Grid2 item container sx={{justifyContent:'center',alignItems:'center'}} size={12}><Button  variant="contained"
                  sx={{ backgroundColor: "#5F6FFF" }} onClick={()=>{downloadPDF()}}>Download</Button></Grid2>
          </Grid2>
          </>
        )}
</Grid2>
    
      {/* <Box
      sx={{backgroundColor:'red'}}
        style={{
          height: "60vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        
        }}
      >
        {loading ? (
          <DotLottieReact
            style={{ width: "40vw", height: "60vh" }}
            src="https://lottie.host/42cb8e82-8c01-4ae4-b724-2e7d5ee1cff4/4Bv28DzaaC.lottie"
            loop
            autoplay
          />
        ) : (
          <Barcode value={docid} />
        )}
      </Box> */}
    </>
  );
};

export default LabTestBarcode;
