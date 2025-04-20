import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button, Grid2 } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import { Container } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Divider } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function LabTestBilling({ selectedpatient, selectTest,Total,date,time }) {
  //to get current date and time
  // const currentDate = new Date();
  // const date = currentDate.toLocaleDateString("en-GB");
  // const time = currentDate.toLocaleTimeString();

  const [data, setdata] = React.useState([]);

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
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      // Add a page border
      pdf.setLineWidth(0.6);
      pdf.setDrawColor(0, 0, 0);
      pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10, "S");

      pdf.save(`${selectedpatient.Name}.pdf`);
    });
  };

  console.log(selectedpatient)
 
  return (
    <>
      <Grid2
        container
        spacing={
          1
        }
        width={{ lg: "100%" }}
        // sx={{ overflowX: "hidden" }}
        // sx={{backgroundColor:'aliceblue'}}
      >
        <Grid2 item size={12} sx={{border:'1px solid #5F6FFF',  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
          
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ArrowDropDownIcon
                  sx={{
                    backgroundColor: "#5F6FFF",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
              }
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span" sx={{ fontFamily: "Rubik" ,color: "black",
                            fontSize: "1.2em",
                             }}>
                PATIENT DATA
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer
                // component={Paper}
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
                      <TableCell sx={{ color: "white" }}>
                        Patient Name
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
                        Gender
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {selectedpatient.map((row) =>  */}
                    <TableRow
                      key=""
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <span
                          style={{
                            // backgroundColor: "yellow",
                            color: "black",
                            fontSize: "1.2em",
                            fontFamily: "Rubik",
                          }}
                        >
                          {selectedpatient.Name}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span
                          style={{
                            // backgroundColor: "yellow",
                            color: "black",
                            fontSize: "1.2em",
                            fontFamily: "Rubik",
                          }}
                        >
                          {selectedpatient.Email}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <span
                          style={{
                            // backgroundColor: "yellow",
                            color: "black",
                            fontSize: "1.2em",
                            fontFamily: "Rubik",
                          }}
                        >
                          {selectedpatient.Number}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <span
                          style={{
                            // backgroundColor: "yellow",
                            color: "black",
                            fontSize: "1.2em",
                            fontFamily: "Rubik",
                          }}
                        >
                          {selectedpatient.DOB} Years
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span
                          style={{
                            // backgroundColor: "yellow",
                            color: "black",
                            fontSize: "1.2em",
                            fontFamily: "Rubik",
                          }}
                        >
                          {selectedpatient.Gender}
                        </span>
                        {/* <IconButton>
                        <EditIcon
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
                      <IconButton>
                        {" "}
                        <DeleteIcon
                          onClick={() => {
                            handleClickOpen1();
                            setdelid(row.id);
                          }}
                        />
                      </IconButton> */}
                      </TableCell>
                    </TableRow>
                    {/* )}  */}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          
        </Grid2>

        {/* Test DAta */}
        <Grid2 item size={12} sx={{border:'1px solid #5F6FFF',  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
}}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ArrowDropDownIcon
                  sx={{
                    backgroundColor: "#5F6FFF",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
              }
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span" sx={{  color: "black",
                            fontSize: "1.2em",
                            fontFamily: "Rubik"}}>
                TEST DATA
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid2
                // mt={{lg:'5',xs:'30'}}
                container
                spacing={1}
                sx={{
                  // backgroundColor: "pink",
                  height: { lg: "40vh", xs: "40vh" },
                  width: { lg: "96vw", xs: "100%" },
                  // justifyContent: "center",
                  alignItems: "center",
                  overflow: "auto",
                  //  mt: (theme) => (theme.breakpoints.up("xs") ? 3 : 5),
                }}
              >
                {selectTest.map((val) => (
                  <>
                    <Grid2
                      item
                      size={{ lg: 4, xs: 12, sm: 6 }}
                      container
                      sx={{ justifyContent: "center" }}
                    >
                      <Card
                        sx={{
                          p: 0,
                          // textAlign: "center",
                          // backgroundColor: "red",
                          borderRadius: "20px",
                          height: {
                            xs: "40vh",
                            lg: "34vh",
                            sm: "35vh",
                            md: "35vh",
                          },
                          width: {
                            xs: "80vw",
                            lg: "40vw",
                            sm: "70vw",
                            md: "50vw",
                          },
                          display: "flex",

                          border: "3px solid #5F6FFF",
                          justifyContent: "center",
                          // alignItems: "center",
                        }}
                      >
                        <CardContent
                          sx={
                            {
                              // display: "flex",
                              // flexDirection: "column",
                              // justifyContent: "space-between",
                            }
                          }
                        >
                          <Grid2 container spacing={1}>
                            <Grid2
                              item
                              container
                              size={12}
                              sx={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <VaccinesIcon
                                sx={{
                                  backgroundColor: "#5F6FFF",
                                  color: "white",
                                  borderRadius: "3px",
                                }}
                              />
                              <Typography
                                variant="h6"
                                sx={{ color: "black", fontFamily: "Rubik" }}
                              >
                                Test Data
                              </Typography>
                            </Grid2>

                            <Grid2
                              item
                              size={12}
                              container
                              sx={{ justifyContent: "start" }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Rubik",
                                  fontSize: { xs: "0.9em", lg: "1em" },
                                }}
                              >
                                <i class="fa-solid fa-prescription-bottle-medical"></i>
                                Test Name :
                                <span
                                  style={{
                                    // backgroundColor: "yellow",
                                    color: "black",
                                    fontSize: "1.2em",
                                    fontFamily: "Rubik",
                                  }}
                                >
                                  {val.TestName}
                                </span>
                              </Typography>
                            </Grid2>
                            <Grid2
                              item
                              size={12}
                              container
                              sx={{ justifyContent: "start" }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Rubik",
                                  fontSize: { xs: "0.9em", lg: "1em" },
                                }}
                              >
                                <i class="fa-solid fa-syringe"></i>Collection
                                Type :
                                <span
                                  style={{
                                    // backgroundColor: "yellow",
                                    color: "black",
                                    fontSize: "1.2em",
                                    fontFamily: "Rubik",
                                  }}
                                >
                                  {val.CollectionType}
                                </span>
                              </Typography>
                            </Grid2>
                            <Grid2
                              item
                              size={12}
                              container
                              sx={{ justifyContent: "start" }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Rubik",
                                  fontSize: { xs: "0.9em", lg: "1em" },
                                }}
                              >
                                <i class="fa-solid fa-file-prescription"></i>
                                Test Description : {val.Description}
                              </Typography>
                            </Grid2>
                            <Grid2
                              item
                              size={12}
                              container
                              sx={{ justifyContent: "start" }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Rubik",
                                  fontSize: { xs: "0.9em", lg: "1em" },
                                }}
                              >
                                <i class="fa-solid fa-indian-rupee-sign"></i>
                                Cost:{" "}
                                <span
                                  style={{
                                    // backgroundColor: "yellow",
                                    color: "black",
                                    fontSize: "1.2em",
                                    fontFamily: "Rubik",
                                  }}
                                >
                                  {val.Cost}
                                </span>
                              </Typography>
                            </Grid2>
                            {/* <Grid2
       item
       size={12}
       container
       sx={{ justifyContent: "center" }}
     >
       <Typography
         sx={{
           fontFamily: "Rubik",
           fontSize: { xs: "1.3em", lg: "1.7em" },
         }}
       >
         <i class="fa-solid fa-syringe"></i>Status :
         Processing..
       </Typography>
     </Grid2> */}
                          </Grid2>
                        </CardContent>
                      </Card>
                    </Grid2>
                  </>
                ))}

                {/* 2nd card
                <Grid2
                  item
                  size={{ lg: 4, xs: 12, sm: 6 }}
                  container
                  sx={{ justifyContent: "center" }}
                >
                  <Card
                    sx={{
                      p: 0,
                      // textAlign: "center",
                      // backgroundColor: "red",
                      borderRadius: "20px",
                      height: {
                        xs: "40vh",
                        lg: "34vh",
                        sm: "35vh",
                        md: "35vh",
                      },
                      width: { xs: "80vw", lg: "40vw", sm: "70vw", md: "50vw" },
                      display: "flex",

                      border: "3px solid #5F6FFF",
                      justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <CardContent
                      sx={
                        {
                          // display: "flex",
                          // flexDirection: "column",
                          // justifyContent: "space-between",
                        }
                      }
                    >
                      <Grid2 container spacing={1}>
                        <Grid2
                          item
                          container
                          size={12}
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <VaccinesIcon
                            sx={{
                              backgroundColor: "#5F6FFF",
                              color: "white",
                              borderRadius: "3px",
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ color: "black", fontFamily: "Rubik" }}
                          >
                            Test Card
                          </Typography>
                        </Grid2>

                        <Grid2
                          item
                          size={12}
                          container
                          sx={{ justifyContent: "start" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontSize: { xs: "0.9em", lg: "1em" },
                            }}
                          >
                            <i class="fa-solid fa-vial-virus"></i>Test Name :
                            "CBC"
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          size={12}
                          container
                          sx={{ justifyContent: "start" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontSize: { xs: "0.9em", lg: "1em" },
                            }}
                          >
                            <i class="fa-solid fa-vial-virus"></i>Collection
                            Type : "Swabs"
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          size={12}
                          container
                          sx={{ justifyContent: "start" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontSize: { xs: "0.9em", lg: "1em" },
                            }}
                          >
                            <i class="fa-solid fa-calendar-days"></i>Test
                            Description : Barium tests are used to examine the
                            digestive tract using a white powder called barium
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          size={12}
                          container
                          sx={{ justifyContent: "start" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontSize: { xs: "0.9em", lg: "1em" },
                            }}
                          >
                            <i class="fa-solid fa-square-poll-vertical"></i>
                            Cost: 500
                          </Typography>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                  </Card>
                </Grid2>
                {/* 3rd card 
                <Grid2
                  item
                  size={{ lg: 4, xs: 12, sm: 6 }}
                  container
                  sx={{ justifyContent: "center" }}
                >
                  <Card
                    sx={{
                      p: 0,
                      // textAlign: "center",
                      // backgroundColor: "red",
                      borderRadius: "20px",
                      height: {
                        xs: "40vh",
                        lg: "34vh",
                        sm: "35vh",
                        md: "35vh",
                      },
                      width: { xs: "80vw", lg: "40vw", sm: "70vw", md: "50vw" },
                      display: "flex",

                      border: "3px solid #5F6FFF",
                      justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <CardContent
                      sx={
                        {
                          // display: "flex",
                          // flexDirection: "column",
                          // justifyContent: "space-between",
                        }
                      }
                    >
                      <Grid2 container spacing={1}>
                        <Grid2
                          item
                          container
                          size={12}
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <VaccinesIcon
                            sx={{
                              backgroundColor: "#5F6FFF",
                              color: "white",
                              borderRadius: "3px",
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ color: "black", fontFamily: "Rubik" }}
                          >
                            Test Card
                          </Typography>
                        </Grid2>

                        <Grid2
                          item
                          size={12}
                          container
                          sx={{ justifyContent: "start" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontSize: { xs: "0.9em", lg: "1em" },
                            }}
                          >
                            <i class="fa-solid fa-vial-virus"></i>Test Name :
                            "CBC"
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          size={12}
                          container
                          sx={{ justifyContent: "start" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontSize: { xs: "0.9em", lg: "1em" },
                            }}
                          >
                            <i class="fa-solid fa-vial-virus"></i>Collection
                            Type : "Swabs"
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          size={12}
                          container
                          sx={{ justifyContent: "start" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontSize: { xs: "0.9em", lg: "1em" },
                            }}
                          >
                            <i class="fa-solid fa-calendar-days"></i>Test
                            Description : Barium tests are used to examine the
                            digestive tract using a white powder called barium
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          size={12}
                          container
                          sx={{ justifyContent: "start" }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Rubik",
                              fontSize: { xs: "0.9em", lg: "1em" },
                            }}
                          >
                            <i class="fa-solid fa-square-poll-vertical"></i>
                            Cost: 500
                          </Typography>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                  </Card>
                </Grid2> */}
              </Grid2>
            </AccordionDetails>
          </Accordion>
        </Grid2>

        <Grid2 item size={12}  sx={{border:'1px solid #5F6FFF',  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ArrowDropDownIcon
                  sx={{
                    backgroundColor: "#5F6FFF",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
              }
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span" sx={{  color: "black",
                            fontSize: "1.2em",
                            fontFamily: "Rubik"}}>
                BILLING
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid2
                container
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "yellow",
                }}
              >
                <Grid2
                  item
                  size={{ lg: 6, xs: 12, sm: 6 }}
                  container
                  sx={{ justifyContent: "center" }}
                >
                  <Card
                    sx={{
                      p: 0,
                      // textAlign: "center",
                      // backgroundColor: "pink",
                      //   borderRadius: "20p00x",
                      overflowY: "auto",
                      height: {
                        xs: "40vh",
                        lg: "100vh",
                        sm: "50vh",
                        md: "80vh",
                      },
                      width: {
                        xs: "80vw",
                        lg: "50vw",
                        sm: "70vw",
                        md: "50vw",
                      },
                      //   display: "flex",

                      border: "2px solid #5F6FFF",
                      justifyContent: "center",

                      // alignItems: "center",
                    }}
                  >
                    <CardContent
                      ref={pdfref}
                      sx={
                        {
                          //   display: "flex",
                          //   flexDirection: "column",
                          //   justifyContent: "space-between",
                          //   backgroundColor:"red",
                          //   width:'100%'
                        }
                      }
                    >
                      <Grid2 container spacing={1}>
                        {/* this is grid for the lab  name and logo */}
                        <Grid2 container sx={{ padding: "0.1em" }} size={12}>
                          {" "}
                          <Grid2
                            item
                            size={9}
                            sx={{
                              fontFamily: "Rubik Semibold",
                              fontSize: "1.4em",
                              // backgroundColor:'red'
                            }}
                          >
                            Shree Ram Pathology
                            <br></br>
                            <span
                              style={{ fontFamily: "Rubik", fontSize: "0.7em" }}
                            >
                              Krishna Complex,Krishna Nagar, Naroda, Ahmedabad,
                              Gujarat 382345
                            </span>{" "}
                          </Grid2>
                          <Grid2
                            item
                            size={3}
                            container
                            sx={{ justifyContent: "end" }}
                          >
                            <BiotechIcon
                              sx={{
                                backgroundColor: "#5F6FFF",
                                color: "white",
                                width: "4.7vw",
                                height: "9.1vh",
                                borderRadius: "3px",
                              }}
                            />
                          </Grid2>{" "}
                        </Grid2>

                        <Grid2
                          item
                          container
                          size={12}
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#5F6FFF",
                            padding: "1em",
                            // borderRadius: "5px",
                            mt: "0em",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: "white",
                              fontFamily: "Arial",
                              fontWeight: "bold",
                            }}
                          >
                            Bill Cum Receipt
                          </Typography>
                        </Grid2>

                        <Grid2
                          container
                          spacing={0}
                          sx={{
                            padding: "0.5em",
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)",
                            // mt: "1em",
                            // width:'vw'
                          }}
                        >
                          {" "}
                          <Grid2
                            item
                            size={{ lg: 8, xs: 12 }}
                            container
                            sx={{ justifyContent: "start" }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Rubik",
                                fontSize: { xs: "0.9em", lg: "1em" },
                                color: "#333",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                Patient Name:
                              </span>{" "}
                              <span style={{ fontSize: "1em" }}>
                                {selectedpatient.Name}
                              </span>
                            </Typography>
                          </Grid2>
                          <Grid2
                            item
                            size={{ lg: 4, xs: 12 }}
                            container
                            sx={{ justifyContent: "start" }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Rubik",
                                fontSize: { xs: "0.9em", lg: "1em" },
                                color: "#333",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>Id:</span>{" "}
                              <span style={{ fontSize: "1em" }}>
                                {selectedpatient.id}
                              </span>
                            </Typography>
                          </Grid2>
                          <Grid2
                            item
                            size={{ lg: 8, xs: 12 }}
                            container
                            sx={{ justifyContent: "start" }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Rubik",
                                fontSize: { xs: "0.9em", lg: "1em" },
                                color: "#333",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                Age/Gender:
                              </span>{" "}
                              {selectedpatient.DOB} Years /{" "}
                              {selectedpatient.Gender}
                            </Typography>
                          </Grid2>
                          <Grid2
                            item
                            size={{ lg: 4, xs: 12 }}
                            container
                            sx={{ justifyContent: "start" }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Rubik",
                                fontSize: { xs: "0.9em", lg: "1em" },
                                color: "#333",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                Number:
                              </span>{" "}
                              {selectedpatient.Number}
                            </Typography>
                            {/* <Typography
                              sx={{
                                fontFamily: "Rubik",
                                fontSize: { xs: "0.9em", lg: "1em" },
                                color: "#333",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                Address:
                              </span>{" "}
                              {selectedpatient.Address}
                            </Typography> */}
                          </Grid2>
                          <Grid2
                            item
                            size={{ lg: 8, xs: 12 }}
                            container
                            sx={{ justifyContent: "start" }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Rubik",
                                fontSize: { xs: "0.9em", lg: "1em" },
                                color: "#333",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                Address:
                              </span>{" "}
                              {selectedpatient.Address}
                            </Typography>
                            {/* <Typography
                              sx={{
                                fontFamily: "Rubik",
                                fontSize: { xs: "0.9em", lg: "1em" },
                                color: "#333",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                Number:
                              </span>{" "}
                              {selectedpatient.Number}
                            </Typography> */}
                          </Grid2>
                          <Grid2
                            item
                            size={{ lg: 4, xs: 12 }}
                            container
                            sx={{ justifyContent: "start" }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Rubik",
                                fontSize: { xs: "0.9em", lg: "1em" },
                                color: "#333",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                Date&Time:
                              </span>{" "}
                              {date} {time}
                              <Grid2 item size={12}></Grid2>
                            </Typography>
                          </Grid2>
                        </Grid2>

                        <Grid2
                          sx={{
                            width: "100%",
                            height: "80%",
                            // marginTop: "1em",
                          }}
                        >
                          <TableContainer
                            sx={{
                              maxHeight: "80vh",
                              overflowY: "auto",
                            }}
                          >
                            <Table
                              sx={{
                                minWidth: 0,
                                // border: "1px solid #5F6FFF",
                              }}
                              aria-label="simple table"
                            >
                              <TableHead
                                sx={{
                                  backgroundColor: "#f0f0f0",
                                  position: "sticky",
                                  top: 0,
                                  zIndex: 1,
                                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                <TableRow
                                  sx={{
                                    // border: "1px dashed #5F6FFF",
                                    backgroundColor: "#5F6FFF",
                                  }}
                                >
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Sr.No
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Investigation
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Amount
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {selectTest.map((val) => (
                                  <>
                                    <TableRow
                                      key=""
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {selectTest.indexOf(val) + 1}.
                                      </TableCell>
                                      <TableCell align="left">
                                        {val.TestName}
                                      </TableCell>

                                      <TableCell align="right">
                                        ₹{val.Cost}
                                      </TableCell>
                                    </TableRow>
                                  </>
                                ))}
                                <TableRow
                                  key=""
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                  ></TableCell>
                                  <TableCell align="center"></TableCell>

                                  <TableCell
                                    align="right"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    {" "}
                                    Total: ₹{Total}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                  </Card>
                </Grid2>
              </Grid2>

              <Grid2
                item
                size={12}
                container
                sx={{ justifyContent: "center", mt: "8px" }}
              >
                <Button
                  onClick={() => {
                    downloadPDF();
                  }}
                  variant="contained"
                  sx={{ backgroundColor: "#5F6FFF" }}
                >
                  {" "}
                  Download
                </Button>
              </Grid2>
            </AccordionDetails>
          </Accordion>

        </Grid2>


        <Grid2 container  sx={{mt:"0",justifyContent:'center',alignItems:'center',width:'100%'}}>
<Grid2 item size={5.22}>
<DotLottieReact
      src="https://lottie.host/3470e695-688c-437f-9404-1549d9f3ab96/hRRI2PonzC.lottie"
      loop
      autoplay
    />
</Grid2>
      
        </Grid2>
        
      </Grid2>
    </>
  );
}

export default LabTestBilling;
