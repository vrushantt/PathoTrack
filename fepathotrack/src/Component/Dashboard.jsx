import React from "react";
import { Box, Container, Grid2, Typography, Paper } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { db } from "./Config/Firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { desktopOS, valueFormatter } from "./webUsageStats";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

import { useEffect } from "react";

const Dashboard = (props) => {
  // firestore code
  const [userdata, setUserdata] = React.useState([]);
  const [patientdata, setpatientdata] = React.useState([]);
  const [testdata, settestdata] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  //CODE TO FETCH THE data from firestore

  //Making refreenace to the collection
  const collectionref = collection(db, "Usercreation");
  const collectionpatientref = collection(db, "PatientMaster");
  const collectiontestref = collection(db, "LabTest");

  //CODE TO FETCH THE data from firestore
  const getuserlist = async () => {
    // setloading(true);
    try {
      setloading(true);
      const data = await getDocs(collectionref);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setloading(false);
      setUserdata(filtereddata);
      // setTimeout(()=>{setloading(false)},[2100])
      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };
  console.log(userdata);

  const getpatinetlist = async () => {
    try {
      setloading(true);
      const data = await getDocs(collectionpatientref);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setloading(false);
      setpatientdata(filtereddata);
      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userdata);

  //CODE TO FETCH THE data from firestore
  const gettestlist = async () => {
    // setloading(true);
    try {
      setloading(true);
      const data = await getDocs(collectiontestref);
      const filtereddata = data.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setloading(false);
      // console.log(filtereddata)
      settestdata(filtereddata);

      // console.log(typeof filtereddata);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  console.log("length", testdata.length);

  console.log(testdata);

  let reportuploaded = testdata.filter((val) => val.Report);
  console.log("reportu", reportuploaded);
  let Created = testdata.filter((val) => val.Status == "Created");
  let Collected = testdata.filter((val) => val.Status == "Collected");
  let Processing = testdata.filter((val) => val.Status == "Processing");
  let Completed = testdata.filter((val) => val.Status == "Completed");

  let CBC = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Complete Blood Count (CBC)")
  );
  let VitaminD = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Vitamin D Test")
  );
  let HbAg = testdata.filter((val) =>
    val.Testdata.find(
      (val) => val.TestName == "HBAg (Hepatitis B Surface Antigen) Test"
    )
  );
  let RA = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Rheumatoid Factor (RA) Test")
  );
  let KFT = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Kidney Function Test (KFT)")
  );
  let B12 = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Vitamin B12 Test")
  );
  let UandM = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Urine Routine and Microscopy")
  );
  let Malaria = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Malaria Parasite Test")
  );
  let PAP = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "PAP Smear")
  );
  let Liver = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Liver Function Test (LFT)")
  );
  let CRP = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "C-Reactive Protein (CRP) Test")
  );
  let Hbalc = testdata.filter((val) =>
    val.Testdata.find(
      (val) => val.TestName == "HbA1c (Glycated Hemoglobin) Test"
    )
  );
  let Bp = testdata.filter((val) =>
    val.Testdata.find(
      (val) => val.TestName == "Blood Sugar Test (Fasting & Postprandial)"
    )
  );
  let Tsh = testdata.filter((val) =>
    val.Testdata.find(
      (val) => val.TestName == "Thyroid Function Test (T3, T4, TSH)"
    )
  );
  let Dengue = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Dengue NS1 Antigen Test")
  );
  let Src = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Stool Routine and Culture")
  );
  let Hiv = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "HIV Test (ELISA/Western Blot)")
  );
  let Lipid = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Lipid Profile")
  );
  let Hp = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "H. Pylori Antibody Test")
  );
  let Prc = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "COVID-19 RT-PCR Test")
  );
  let liver = testdata.filter((val) =>
    val.Testdata.find((val) => val.TestName == "Liver function tests")
  );

  useEffect(() => {
    getuserlist();
    getpatinetlist();
    gettestlist();

    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.onload = () => {
      window.google.charts.load("current", { packages: ["corechart"] });
      window.google.charts.setOnLoadCallback(() => {
        const data = window.google.visualization.arrayToDataTable([
          ["Test", "No of Test"],
          ["work", 2],
          ["VitaminD", VitaminD.length],
          ["Commute", 2],
          ["Watch TV", 2],
          ["Sleep", 7],
        ]);

        const options = {
          title: "Test Wise data",
          is3D: true,
        };

        const chart = new window.google.visualization.PieChart(
          document.getElementById("piechart_3d")
        );
        chart.draw(data, options);
      });
    };
    document.body.appendChild(script);
  }, []);

  console.log("cb", CBC.length);

  console.log("test", testdata);
  return (
    <>
      <Container
        maxWidth
        sx={{
          // backgroundColor: "red",
          // paddingTop: "1em",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          // overflowX: "hidden",
          // height: "100vh",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {loading ? (
          <Box
            sx={{
              position: "absolute", // Position it relative to the viewport
              top: "50%", // Center vertically
              left: "50%", // Center horizontally
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress
              variant="determinate"
              sx={(theme) => ({
                color: theme.palette.grey[200],
                ...theme.applyStyles("dark", {
                  color: theme.palette.grey[800],
                }),
              })}
              size={40}
              thickness={4}
              {...props}
              value={100}
            />
            <CircularProgress
              variant="indeterminate"
              disableShrink
              sx={(theme) => ({
                color: "#1a90ff",
                animationDuration: "550ms",
                position: "absolute",
                left: 0,
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: "round",
                },
                ...theme.applyStyles("light", {
                  color: "#5F6FFF",
                }),
              })}
              size={40}
              thickness={4}
              {...props}
            />
          </Box>
        ) : (
          <>
            <Grid2
              spacing={1}
              container
              sx={{
                justifyContent: "space-evenly",
                // backgroundColor: "pink",
                padding: "1em",
              }}
            >
              {/* one */}
              <Grid2
                item
                container
                sx={{ justifyContent: "center" }}
                size={{ lg: 4, xs: 12, sm: 6, md: 4 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 0,
                    // textAlign: "center",
                    // backgroundColor: "red",
                    // borderRadius: "20px",
                    height: {
                      // xs: "39vh",
                      lg: "20vh",
                      // sm: "vh",
                      md: "20vh",
                      borderRadius: "10px 10px 10px 10px",
                    },
                    width: {
                      xs: "90vw",
                      lg: "20vw",
                      sm: "40vw",
                      md: "30vw",
                    },
                    // display: "flex",

                    // border: "3px solid  white",
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  {" "}
                  <Grid2 container direction="row">
                    <Grid2
                      item
                      size={0.7}
                      sx={{
                        backgroundColor: "#00ddb3",
                        height: { lg: "20vh", md: "20vh" },
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    ></Grid2>
                    <Grid2 item size={3}>
                      <DotLottieReact
                        src="https://lottie.host/6a2ad1a0-7b26-4196-9fef-72938b33a5ca/FR1AyVhraz.lottie"
                        loop
                        autoplay
                      />
                    </Grid2>
                    <Grid2
                      item
                      size={8.1}
                      container
                      direction="column"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "end",
                      }}
                    >
                      <Grid2
                        item
                        container
                        sx={{ justifyContent: "end", mt: "0.2em" }}
                      >
                        <i
                          style={{
                            backgroundColor: "#00ddb3",
                            color: "white",
                            fontSize: "1.5em",
                            padding: "2px",
                            borderRadius: "2px",
                          }}
                          class="fa-solid fa-arrow-trend-up"
                        ></i>
                      </Grid2>
                      <Grid2 item>
                        <Typography fontFamily="Rubik" fontSize="1.08em">
                          {" "}
                          Number Of User Created
                        </Typography>
                        <Typography
                          align="end"
                          fontFamily="Rubik Semibold"
                          fontSize="2.3em"
                        >
                          {userdata.length}
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  {/* <Grid2 container spacing={1}>
                <Grid2
                  item
                  container
                  size={12}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "black", fontFamily: "Rubik" }}
                  >
                    Number Of User Created
                  </Typography>
                </Grid2>
                <Grid2
                  item
                  size={12}
                  container
                  sx={{
                    height: "10vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "black", fontFamily: "Rubik" }}
                  >
                    {userdata.length}
                  </Typography>
                </Grid2>
              </Grid2> */}
                </Paper>
              </Grid2>

              {/* two */}
              <Grid2
                item
                container
                sx={{ justifyContent: "center" }}
                size={{ lg: 4, xs: 12, sm: 6, md: 4 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 0,
                    // textAlign: "center",
                    // backgroundColor: "red",
                    // borderRadius: "20px",
                    height: {
                      // xs: "25vh",
                      lg: "20vh",
                      // sm: "vh",
                      md: "20vh",
                      borderRadius: "10px 10px 10px 10px",
                    },
                    width: {
                      xs: "90vw",
                      lg: "20vw",
                      sm: "40vw",
                      md: "30vw",
                    },
                    // display: "flex",

                    // border: "3px solid  white",
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  {" "}
                  <Grid2 container direction="row">
                    <Grid2
                      item
                      size={0.7}
                      sx={{
                        backgroundColor: "#5F6FFF",
                        height: { lg: "20vh", md: "20vh" },
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    ></Grid2>
                    <Grid2 item size={3}>
                      <DotLottieReact
                        src="https://lottie.host/c18d4ca0-bcee-4eb3-9bdf-c57d6cc7208e/RrcuiJuh0P.lottie"
                        loop
                        autoplay
                      />
                    </Grid2>
                    <Grid2
                      item
                      size={8.1}
                      container
                      direction="column"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "end",
                      }}
                    >
                      <Grid2
                        item
                        container
                        sx={{ justifyContent: "end", mt: "0.2em" }}
                      >
                        <i
                          style={{
                            backgroundColor: "#5F6FFF",
                            color: "white",
                            fontSize: "1.5em",
                            padding: "2px",
                            borderRadius: "2px",
                          }}
                          class="fa-solid fa-arrow-trend-up"
                        ></i>
                      </Grid2>
                      <Grid2 item>
                        <Typography fontFamily="Rubik" fontSize="1em">
                          {" "}
                          Number Of Patient Created
                        </Typography>
                        <Typography
                          align="end"
                          fontFamily="Rubik Semibold"
                          fontSize="2.3em"
                        >
                          {patientdata.length}
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  {/* <Grid2 container spacing={1}>
                <Grid2
                  item
                  container
                  size={12}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "black", fontFamily: "Rubik" }}
                  >
                    Number Of User Created
                  </Typography>
                </Grid2>
                <Grid2
                  item
                  size={12}
                  container
                  sx={{
                    height: "10vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "black", fontFamily: "Rubik" }}
                  >
                    {userdata.length}
                  </Typography>
                </Grid2>
              </Grid2> */}
                </Paper>
              </Grid2>

              {/* three */}
              <Grid2
                item
                container
                sx={{ justifyContent: "center" }}
                size={{ lg: 4, xs: 12, sm: 12, md: 4 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 0,
                    // textAlign: "center",
                    // backgroundColor: "red",
                    // borderRadius: "20px",
                    height: {
                      // xs: "39vh",
                      lg: "20vh",
                      // sm: "vh",
                      md: "20vh",
                      borderRadius: "10px 10px 10px 10px",
                    },
                    width: {
                      xs: "90vw",
                      lg: "20vw",
                      sm: "40vw",
                      md: "30vw",
                    },
                    // display: "flex",

                    // border: "3px solid  white",
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  {" "}
                  <Grid2 container direction="row">
                    <Grid2
                      item
                      size={0.7}
                      sx={{
                        backgroundColor: "#c65eff",
                        height: { lg: "20vh", md: "20vh" },
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    ></Grid2>
                    <Grid2 item size={3}>
                      <DotLottieReact
                        src="https://lottie.host/b27f192f-6de9-4909-a7ad-435ed8e38164/GERDdIHpmg.lottie"
                        loop
                        autoplay
                      />
                    </Grid2>
                    <Grid2
                      item
                      size={8.1}
                      container
                      direction="column"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "end",
                      }}
                    >
                      <Grid2
                        item
                        container
                        sx={{ justifyContent: "end", mt: "0.2em" }}
                      >
                        <i
                          style={{
                            backgroundColor: "#c65eff",
                            color: "white",
                            fontSize: "1.5em",
                            padding: "2px",
                            borderRadius: "2px",
                          }}
                          class="fa-solid fa-arrow-trend-up"
                        ></i>
                      </Grid2>
                      <Grid2 item>
                        <Typography fontFamily="Rubik" fontSize="1.08em">
                          {" "}
                          Number Of Test Created
                        </Typography>
                        <Typography
                          align="end"
                          fontFamily="Rubik Semibold"
                          fontSize="2.3em"
                        >
                          {testdata.length}
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  {/* <Grid2 container spacing={1}>
                <Grid2
                  item
                  container
                  size={12}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "black", fontFamily: "Rubik" }}
                  >
                    Number Of User Created
                  </Typography>
                </Grid2>
                <Grid2
                  item
                  size={12}
                  container
                  sx={{
                    height: "10vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "black", fontFamily: "Rubik" }}
                  >
                    {userdata.length}
                  </Typography>
                </Grid2>
              </Grid2> */}
                </Paper>
              </Grid2>
            </Grid2>

            {/* status data and report data*/}
            <Grid2
              container
              spacing={1}
              sx={{ justifyContent: "space-between", backgroundColor: "" }}
            >
              <Grid2 item size={{lg:6,xs:12}}>
                <Paper
                  elevation={3}
                  sx={{
                    width: {lg:"100%",xs:'auto'},
                    height:{lg: "71vh"}, // Set a fixed height
                    borderRadius: "10px",
                  }}
                >
                  <Grid2 container direction="" sx={{ backgroundColor: "" }}>
                    <Grid2
                      item
                      size={0.4}
                      sx={{
                        backgroundColor: "#fdc500",
                        height: { lg: "71vh", md: "auto" },
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    ></Grid2>

                    <Grid2
                      item
                      container
                      direction="column"
                      size={11.6}
                      sx={{ backgroundColor: "" }}
                    >
                      <Grid2
                        container
                        sx={{
                          // backgroundColor: "green",
                          justifyContent: "center",
                          // alignItems: "center",
                          padding: "0.2em",
                        }}
                      >
                        <Grid2
                          item
                          container
                          sx={{
                            justifyContent: "end",
                            alignItems: "center",
                            // backgroundColor: "red",
                          }}
                          size={{lg:7,xs:6}}
                        >
                          <Typography fontFamily="Rubik" fontSize="1em">
                            Status Data
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          container
                          size={{lg:5,xs:6}}
                          sx={{
                            // backgroundColor: "pink",
                            justifyContent: "end",
                            alignItems: "start",
                          }}
                        >
                          <i
                            style={{
                              backgroundColor: "#fdc500",
                              color: "white",
                              fontSize: "1.5em",
                              padding: "2px",
                              borderRadius: "5px",
                              m: "1em",
                            }}
                            class="fa-solid fa-arrow-trend-up"
                          ></i>
                        </Grid2>
                      </Grid2>

                      <Grid2 item sx={{ backgroundColor: "", height: "65vh",width:{xs:'100%',sm:'100%',md:'100%',lg:'100%'} }}>
                        <ResponsiveBar
                          data={[
                            {
                              Status: "Created",
                              Created: Created.length,
                              Createdcolor: "hsl(212, 70%, 50%)",
                            },
                            {
                              Status: "Collected",
                              Collected: Collected.length,
                              CollectedColor: "hsl(159, 70%, 50%)",
                            },
                            {
                              Status: "Processing",
                              Processing: Processing.length,
                              ProcessingColor: "hsl(159, 70%, 50%)",
                            },
                            {
                              Status: "Completed",
                              Completed: Completed.length,
                            },
                          ]}
                          keys={[
                            "Created",
                            "Collected",
                            "Processing",
                            "Completed",
                          ]}
                          indexBy="Status"
                          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                          padding={0.3}
                          valueScale={{ type: "linear" }}
                          indexScale={{ type: "band", round: true }}
                          colors={{ scheme: "category10" }}
                          defs={[
                            {
                              id: "dots",
                              type: "patternDots",
                              background: "inherit",
                              color: "#38bcb2",
                              size: 4,
                              padding: 1,
                              stagger: true,
                            },
                            {
                              id: "lines",
                              type: "patternLines",
                              background: "inherit",
                              color: "#eed312",
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10,
                            },
                          ]}
                          fill={[
                            {
                              match: {
                                id: "Status",
                              },
                              id: "dots",
                            },
                            {
                              match: {
                                id: "sandwich",
                              },
                              id: "lines",
                            },
                          ]}
                          borderColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                          }}
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Test Status",
                            legendPosition: "middle",
                            legendOffset: 32,
                            truncateTickAt: 0,
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Number",
                            legendPosition: "middle",
                            legendOffset: -40,
                            truncateTickAt: 0,
                          }}
                          labelSkipWidth={12}
                          labelSkipHeight={12}
                          labelTextColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                          }}
                          legends={[
                            {
                              dataFrom: "keys",
                              anchor: "bottom-right",
                              direction: "column",
                              justify: false,
                              translateX: 120,
                              translateY: 0,
                              itemsSpacing: 2,
                              itemWidth: 100,
                              itemHeight: 20,
                              itemDirection: "left-to-right",
                              itemOpacity: 0.85,
                              symbolSize: 20,
                              effects: [
                                {
                                  on: "hover",
                                  style: {
                                    itemOpacity: 1,
                                  },
                                },
                              ],
                            },
                          ]}
                          role="application"
                          ariaLabel="Nivo bar chart demo"
                          // barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                        />
                      </Grid2>
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid2>

{/* report data */}
              <Grid2 item size={{lg:6,xs:12}}>
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    height: "71vh", // Set a fixed height
                    borderRadius: "10px",
                  }}
                >
                  <Grid2 container direction="" sx={{ backgroundColor: "" }}>
                    <Grid2
                      item
                      size={0.4}
                      sx={{
                        backgroundColor: "#FF3EA5",
                        height: { lg: "71vh", md: "71vh" ,xs:'71vh'},
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    ></Grid2>

                    <Grid2
                      item
                      container
                      direction="column"
                      size={11.6}
                      sx={{ backgroundColor: "" }}
                    >
                      <Grid2
                        container
                        sx={{
                          // backgroundColor: "green",
                          justifyContent: "center",
                          // alignItems: "center",
                          padding: "0.2em",
                        }}
                      >
                        <Grid2
                          item
                          container
                          sx={{
                            justifyContent: "end",
                            alignItems: "center",
                            backgroundColor: "",
                          }}
                          size={{lg:7,xs:6}}
                        >
                          <Typography fontFamily="Rubik" fontSize="1em">
                            Report Data
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          container
                          size={{lg:5,xs:6}}
                          sx={{
                            backgroundColor: "",
                            justifyContent: "end",
                            alignItems: "start",
                          }}
                        >
                          <i
                            style={{
                              backgroundColor: "#FF3EA5",
                              color: "white",
                              fontSize: "1.5em",
                              padding: "2px",
                              borderRadius: "5px",
                              m: "1em",
                            }}
                            class="fa-solid fa-arrow-trend-up"
                          ></i>
                        </Grid2>
                      </Grid2>

                      <Grid2 item  sx={{ backgroundColor: "", height: "65vh",width:{xs:'100%',sm:'100%',md:'100%',lg:'100%'} }}>
                        <ResponsiveBar
                          data={[
                            {
                              Status: "Report Uploaded",
                              "Report Uploaded": reportuploaded.length,
                              Createdcolor: "green",
                            },
                            {
                              Status: "Report Pending",
                              "Report Pending":
                                testdata.length - reportuploaded.length,
                              CollectedColor: "hsl(159, 70%, 50%)",
                            },
                          ]}
                          keys={["Report Uploaded", "Report Pending"]}
                          indexBy="Status"
                          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                          padding={0.3}
                          valueScale={{ type: "linear" }}
                          indexScale={{ type: "band", round: true }}
                          colors={{ scheme: "nivo" }}
                          defs={[
                            {
                              id: "dots",
                              type: "patternDots",
                              background: "inherit",
                              color: "#38bcb2",
                              size: 4,
                              padding: 1,
                              stagger: true,
                            },
                            {
                              id: "lines",
                              type: "patternLines",
                              background: "inherit",
                              color: "#eed312",
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10,
                            },
                          ]}
                          fill={[
                            {
                              match: {
                                id: "Status",
                              },
                              id: "dots",
                            },
                            {
                              match: {
                                id: "sandwich",
                              },
                              id: "lines",
                            },
                          ]}
                          borderColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                          }}
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Report Status",
                            legendPosition: "middle",
                            legendOffset: 32,
                            truncateTickAt: 0,
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Number",
                            legendPosition: "middle",
                            legendOffset: -40,
                            truncateTickAt: 0,
                          }}
                          labelSkipWidth={12}
                          labelSkipHeight={12}
                          labelTextColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                          }}
                          legends={[
                            {
                              dataFrom: "keys",
                              anchor: "bottom-right",
                              direction: "column",
                              justify: false,
                              translateX: 120,
                              translateY: 0,
                              itemsSpacing: 2,
                              itemWidth: 100,
                              itemHeight: 20,
                              itemDirection: "left-to-right",
                              itemOpacity: 0.85,
                              symbolSize: 20,
                              effects: [
                                {
                                  on: "hover",
                                  style: {
                                    itemOpacity: 1,
                                  },
                                },
                              ],
                            },
                          ]}
                          role="application"
                          ariaLabel="Nivo bar chart demo"
                          // barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                        />
                      </Grid2>
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid2>
            </Grid2>

            {/* Test data */}
            <Grid2
              container
              sx={{
                justifycontent: "center",
                alignItems: "center",
                // backgroundColor: "yellow",
              }}
            >
              <Grid2 item size={12}>
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    height: "71vh", // Set a fixed height
                    borderRadius: "10px",
                  }}
                >
                  <Grid2 container direction="" sx={{ backgroundColor: "" }}>
                    <Grid2
                      item
                      size={{lg:0.2,xs:0.4}}
                      sx={{
                        backgroundColor: "#73EC8B",
                        height: { lg: "71vh", md: "71vh",xs:'71vh' },
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    ></Grid2>

                    <Grid2
                      item
                      container
                      direction="column"
                      size={{lg:11.8,xs:11.6}}
                      sx={{ backgroundColor: "" }}
                    >
                      <Grid2
                        container
                        sx={{
                          // backgroundColor: "green",
                          justifyContent: "center",
                          // alignItems: "center",
                          padding: "0.2em",
                        }}
                      >
                        <Grid2
                          item
                          container
                          sx={{
                            justifyContent: "end",
                            alignItems: "center",
                            // backgroundColor: "red",
                          }}
                          size={{lg:6.3,xs:6}}
                        >
                          <Typography fontFamily="Rubik" fontSize="1em">
                            Test Data
                          </Typography>
                        </Grid2>
                        <Grid2
                          item
                          container
                          size={{lg:5.7,xs:6}}
                          sx={{
                            // backgroundColor: "pink",
                            justifyContent: "end",
                            alignItems: "start",
                          }}
                        >
                          <i
                            style={{
                              backgroundColor: "#73EC8B",
                              color: "white",
                              fontSize: "1.5em",
                              padding: "2px",
                              borderRadius: "5px",
                              m: "1em",
                            }}
                            class="fa-solid fa-arrow-trend-up"
                          ></i>
                        </Grid2>
                      </Grid2>

                      <Grid2 item sx={{ backgroundColor: "", height: "65vh",width:{ sm:'auto',xs:'100%',md:'100%',lg:'100%'} }}>
                        <ResponsivePie
                          style={{ height: "20vh" }}
                          data={[
                            ...(CBC.length > 0
                              ? [
                                  {
                                    label: "CBC",
                                    id: "Complete Blood Count (CBC)",
                                    value: CBC.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(VitaminD.length > 0
                              ? [
                                  {
                                    id: "Vitamin D Test",
                                    label: "Vitamin D",
                                    value: VitaminD.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(HbAg.length > 0
                              ? [
                                  {
                                    id: "HBAg (Hepatitis B Surface Antigen) Tes",
                                    label: "HBAg",
                                    value: HbAg.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(RA.length > 0
                              ? [
                                  {
                                    id: "Rheumatoid Factor (RA) Test",
                                    label: "RA",
                                    value: RA.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(KFT.length > 0
                              ? [
                                  {
                                    id: "Kidney Function Test (KFT",
                                    label: "KFT",
                                    value: KFT.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(B12.length > 0
                              ? [
                                  {
                                    id: "Vitamin B12 Test",
                                    label: "B12",
                                    value: B12.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(UandM.length > 0
                              ? [
                                  {
                                    id: "Urine Routine and Microscopy",
                                    label: "URM",
                                    value: UandM.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Malaria.length > 0
                              ? [
                                  {
                                    id: "Malaria Parasite Test",
                                    label: "MPT",
                                    value: Malaria.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(PAP.length > 0
                              ? [
                                  {
                                    id: "PAP Smear",
                                    label: "PAP",
                                    value: PAP.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Liver.length > 0
                              ? [
                                  {
                                    id: "Liver Function Test (LFT)",
                                    label: "LFT",
                                    value: Liver.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(CRP.length > 0
                              ? [
                                  {
                                    id: "C-Reactive Protein (CRP) Test",
                                    label: "CRP",
                                    value: CRP.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Hbalc.length > 0
                              ? [
                                  {
                                    id: "HbA1c (Glycated Hemoglobin) Test",
                                    label: "HbA1c",
                                    value: Hbalc.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Bp.length > 0
                              ? [
                                  {
                                    id: "Blood Sugar Test (Fasting & Postprandial)",
                                    label: "BP",
                                    value: Bp.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Tsh.length > 0
                              ? [
                                  {
                                    id: "Thyroid Function Test (T3, T4, TSH)",
                                    label: "TSH",
                                    value: Tsh.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Dengue.length > 0
                              ? [
                                  {
                                    id: "Dengue NS1 Antigen Test",
                                    label: "Dengue",
                                    value: Dengue.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Src.length > 0
                              ? [
                                  {
                                    id: "Stool Routine and Culture",
                                    label: "SRC",
                                    value: Src.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Hiv.length > 0
                              ? [
                                  {
                                    id: "HIV Test (ELISA/Western Blot)",
                                    label: "HIV",
                                    value: Hiv.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Lipid.length > 0
                              ? [
                                  {
                                    id: "Lipid Profile",
                                    label: "Lipid",
                                    value: Lipid.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Hp.length > 0
                              ? [
                                  {
                                    id: "H. Pylori Antibody Test",
                                    label: "H.PAT",
                                    value: Hp.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),

                            ...(Prc.length > 0
                              ? [
                                  {
                                    id: "COVID-19 RT-PCR Testt",
                                    label: "RT-PCR",
                                    value: Prc.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),
                            ...(liver.length > 0
                              ? [
                                  {
                                    id: "Liver function tests",
                                    label: "Liver",
                                    value: liver.length,
                                    color: "hsl(90, 70%, 50%)",
                                  },
                                ]
                              : []),
                          ]}
                          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                          innerRadius={0.5}
                          padAngle={0.7}
                          cornerRadius={3}
                          activeOuterRadiusOffset={8}
                          borderWidth={1}
                          borderColor={{
                            from: "color",
                            modifiers: [["darker", 0.2]],
                          }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor="#333333"
                          arcLinkLabelsThickness={2}
                          arcLinkLabelsColor={{ from: "color" }}
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{
                            from: "color",
                            modifiers: [["darker", 2]],
                          }}
                          defs={[
                            {
                              id: "dots",
                              type: "patternDots",
                              background: "inherit",
                              color: "rgba(255, 255, 255, 0.3)",
                              size: 4,
                              padding: 1,
                              stagger: true,
                            },
                            {
                              id: "lines",
                              type: "patternLines",
                              background: "inherit",
                              color: "rgba(255, 255, 255, 0.3)",
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10,
                            },
                          ]}
                          fill={[
                            {
                              match: {
                                id: "ruby",
                              },
                              id: "dots",
                            },
                            {
                              match: {
                                id: "CBC",
                              },
                              id: "dots",
                            },
                            {
                              match: {
                                id: "go",
                              },
                              id: "dots",
                            },
                            {
                              match: {
                                id: "python",
                              },
                              id: "dots",
                            },
                            {
                              match: {
                                id: "scala",
                              },
                              id: "lines",
                            },
                            {
                              match: {
                                id: "lisp",
                              },
                              id: "lines",
                            },
                            {
                              match: {
                                id: "elixir",
                              },
                              id: "lines",
                            },
                            {
                              match: {
                                id: "javascript",
                              },
                              id: "lines",
                            },
                          ]}
                          legends={[
                            {
                              // overflowX:'auto',
                              anchor: "bottom",
                              direction: "row",
                              justify: false,
                              translateX: 0,
                              translateY: 56,
                              itemsSpacing: 0,
                              itemWidth: 100,
                              itemHeight: 18,
                              itemTextColor: "#999",
                              itemDirection: "left-to-right",
                              itemOpacity: 1,
                              symbolSize: 18,
                              symbolShape: "circle",
                              effects: [
                                {
                                  on: "hover",
                                  style: {
                                    itemTextColor: "#000",
                                  },
                                },
                              ],
                            },
                          ]}
                        />
                      </Grid2>
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid2>
            </Grid2>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
