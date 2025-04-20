import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { color, motion, useScroll } from "framer-motion";
import {
  Container,
  Grid2,
  Typography,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Carousel from "react-bootstrap/Carousel";
import { animate, stagger } from "@motionone/dom";
import { useEffect, useRef } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import TimelineIcon from "@mui/icons-material/Timeline";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Img from "../assets/Patient.png";
import Bill from "../assets/Bill.png";
import test from "../assets/Test.png";
import Labtest from "../assets/Labtest.png";
import Statuscheck from "../assets/Statuscheck.png";
import Dashboard from "../assets/Dashboard.png";
import Report from "../assets/Report.png";
import AOS from "aos";
import "aos/dist/aos.css";
import BackupIcon from "@mui/icons-material/Backup";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Person2Icon from "@mui/icons-material/Person2";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import ScienceIcon from "@mui/icons-material/Science";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import LockPersonIcon from "@mui/icons-material/LockPerson"; // Initialize AOS
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Logo from "../assets/Logof.jpg";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Title } from "@mui/icons-material";
AOS.init();
const Homepage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX =
    (scrollYProgress,
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });

  const pages = [
    {
      head: "Patient registration and billing",
      desc: "With minimum or zero computer knowledge the receptionist can start patient registration and billing from Day one. The software will automatically calculate the total amount, apply the discount and calculate the balance amount thus avoiding any human errors.",
      img: { Img },
    },
    {
      head: "Tamper proof billing",
      desc: "The date and time of billing are automatically picked by the system removing any scope of human error or tampering with bills. The case reg. no. once assigned cannot be changed. Any changes made to patient names and investigations are tracked under activities. ",
      img: { Bill },
    },
  ];
  const Features = [
    {
      icon: (
        <ReceiptLongIcon
          sx={{
            backgroundColor: "#5F6FFF",
            color: "white",
            borderRadius: "3px",
            fontSize: "2em",
          }}
        />
      ),
      head: "Simplified Test Management",
      desc: "Effortlessly create, update, and categorize pathology tests with customizable options such as sample collection types, pricing, and test descriptions. Whether you're managing routine blood tests or complex diagnostics, PathoTrack provides a user-friendly dashboard to streamline test setup and reduce manual work. Bulk management and search functionality make it even easier to stay organized.",
    },
    {
      icon: (
        <SupervisorAccountIcon
          sx={{
            backgroundColor: "#5F6FFF",
            color: "white",
            borderRadius: "3px",
            fontSize: "2em",
          }}
        />
      ),
      head: "Accurate Patient Records",
      desc: "Maintain comprehensive patient profiles including contact information, test history, reports, and billing details — all in one place. Each patient’s data is auto-linked with their tests, ensuring no information gets misplaced. Say goodbye to paper records and enjoy instant access to vital details from anywhere, anytime.",
    },
    {
      icon: (
        <TimelineIcon
          sx={{
            backgroundColor: "#5F6FFF",
            color: "white",
            borderRadius: "3px",
            fontSize: "2em",
          }}
        />
      ),
      head: "Real-Time Status Tracking",
      desc: "Stay informed at every stage of a test’s journey — from sample collection, processing, verification, to final report generation. Each test status is visually tracked with real-time updates. Lab staff and administrators can instantly monitor pending, ongoing, and completed tests, boosting efficiency and reducing errors.",
    },
    {
      icon: (
        <RequestQuoteIcon
          sx={{
            backgroundColor: "#5F6FFF",
            color: "white",
            borderRadius: "3px",
            fontSize: "2em",
          }}
        />
      ),
      head: "Custom Billing System",
      desc: "Automate billing with customizable templates that include test-wise charges, GST, discounts, and final total. Generate downloadable/printable invoices instantly. Integrated billing ensures faster checkout and better financial tracking for your lab.",
    },
    {
      icon: (
        <DashboardIcon
          sx={{
            backgroundColor: "#5F6FFF",
            color: "white",
            borderRadius: "3px",
            fontSize: "2em",
          }}
        />
      ),
      head: "Analytics & Dashboard",
      desc: "Gain full visibility of your lab’s performance with real-time analytics. Track total tests performed, revenue generated, and daily activity trends. Admins can view detailed charts and export reports to measure productivity, optimize operations, and plan for growth.",
    },
    {
      icon: (
        <DashboardIcon
          sx={{
            backgroundColor: "#5F6FFF",
            color: "white",
            borderRadius: "3px",
            fontSize: "2em",
          }}
        />
      ),
      head: "Automated Report Delivery",
      desc: "Generate test reports in PDF format and deliver them automatically via email or direct download. Lab technicians can upload the final results, and the system handles the rest — including notifying patients. This reduces wait times, enhances communication, and creates a professional impression for your lab",
    },
  ];

  const addon = [
    {
      icon: (
        <LaptopChromebookIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "4em",
          }}
        />
      ),
      desc: "All-in-One Lab Management",
    },
    {
      icon: (
        <BackupIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "4em",
          }}
        />
      ),
      desc: "Real-Time Data Access",
    },
    {
      icon: (
        <AutoModeIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "4em",
          }}
        />
      ),
      desc: "Custom Test & Panel Configuration",
    },
    {
      icon: (
        <PeopleAltIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "4em",
          }}
        />
      ),
      desc: "Multi-User Support",
    },
    {
      icon: (
        <DonutSmallIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "4em",
          }}
        />
      ),
      desc: "Secure and Accessible Data Management",
    },
    {
      icon: (
        <Person2Icon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "4em",
          }}
        />
      ),
      desc: "Enhanced Patient Communication",
    },
    {
      icon: (
        <InsertChartIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "4em",
          }}
        />
      ),
      desc: "Scalable Solutions for Growing Labs",
    },
    {
      icon: (
        <ModelTrainingIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "4em",
          }}
        />
      ),
      desc: "Dedicated Support and Training",
    },
  ];

  const users = [
    {
      icon: (
        <ScienceIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "5em",
          }}
        />
      ),
      main: "Laboratory Registration",
      desc: "Are you a diagnostic lab? Register here to manage your patients",
      btn: "Register a Lab",
    },
    {
      icon: (
        <MarkChatReadIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "5em",
          }}
        />
      ),
      main: "Check Your Test Status",
      desc: "Waiting for your results? Ckeck the status of your tests and access your reports here",
      btn: "Check Status",
    },
    {
      icon: (
        <LockPersonIcon
          sx={{
            // backgroundColor: "#5F6FFF",
            color: "#5f6fff",
            borderRadius: "3px",
            fontSize: "5em",
          }}
        />
      ),
      main: "User Login",
      desc: "Authorized users can login to access the system and manage lab activites",
      btn: "Login",
    },
  ];

  const accordian = [
    {
      question: "How can a lab register on the platform?",
      answer:
        "Click on “Register as Lab” and fill out your lab details including certificate number and GST info.",
    },
    {
      question: "What documents are required for lab registration?",
      answer:
        "You’ll need your lab certification number, GST number, and a contact person’s mobile number.",
    },
    {
      question: "Can labs manage multiple users?",
      answer:
        "Yes, after registration, a lab admin can create user accounts to manage daily tasks.",
    },
    {
      question: "How can I check my test status?",
      answer:
        "Click on “Check Status”, enter your registered mobile number or test ID to view updates.",
    },
    {
      question: "Do I need to create an account as a patient?",
      answer:
        "No, patients can check their status directly using the test ID or mobile number provided by the lab.",
    },
    {
      question: "What if I don’t receive my report?",
      answer:
        "Please contact the lab directly or check again later. The report is uploaded once approved by the lab.",
    },
    {
      question: "Who can log in as a user?",
      answer:
        "Only authorized lab personnel or system administrators can log in to manage operations.",
    },
    {
      question: "Can I edit patient or test details?",
      answer:
        "Yes, once logged in, you can update records, manage reports, and change statuses.",
    },
  ];
  const myref = useRef(null);
  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          zIndex: "1",
          top: 0,
          left: 0,
          right: 0,
          height: 5.5,
          originX: 0,
          backgroundColor: "#ff0088",
        }}
      />

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          // backgroundColor: "red",
          height: "100vh",
          width: "100vw",
          padding: "0",
          // overflowX:'hidden'
        }}
      >
        {/* main header */}
        <Grid2
          container
          sx={{
            // mt:'1em',
            backgroundColor: "aliceblue",
            padding: { lg: "1em", sm: "1em", xs: "1em 0 1em 1em" },
            justifyContent: "center",
            alignItems: "center",

            height: { lg: "70vh", sm: "50vh", xs: "auto" },
            // border: "1px solid black",
          }}
        >
          <Grid2
            item
            data-aos="zoom-out-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            container
            size={{ lg: 4, xs: 12, sm: 12 }}
            sx={{
              // backgroundColor: "yellow",
              justifyContent: "center",
              alignItems: "center",
              // padding:'2em'
            }}
          >
            <div>
              <Typography
                fontFamily="Rubik Semibold"
                fontSize={{ lg: "1.8em", xs: "1.2em " }}
              >
                Revolutionize Your Pathology Lab with PathoTrack
              </Typography>
              <Typography
                fontFamily="Rubik"
                fontSize={{ lg: "1.2em" }}
                sx={{ mt: "1em" }}
              >
                Your smart solution for managing pathology labs efficiently and
                effortlessly.
                <br></br>A modern digital solution for seamless lab operations —
                from patient registration to report delivery.
              </Typography>
            </div>

            <Grid2
              item
              size={12}
              container
              sx={{
                mt: "2em",
                // backgroundColor:"blue",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                onClick={() => {
                  navigate("/labs/Register");
                }}
                sx={{ backgroundColor: "#5F6FFF", color: "white" }}
              >
                Get Started
              </Button>
              <Button
                onClick={() => {
                  myref;
                }}
                variant="outlined"
                sx={{ color: "#5F6FFF" }}
              >
                Learn More
              </Button>
            </Grid2>
          </Grid2>

          <Grid2
            item
            container
            data-aos="zoom-out-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            size={{ lg: 6, xs: 0, sm: 0, md: 0 }}
            sx={{
              // backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <DotLottieReact
              src="https://lottie.host/2a0a71a8-10e5-4867-9928-3060b0d29a6b/aBsbr9EA1e.lottie"
              loop
              autoplay
            />
          </Grid2>
        </Grid2>

        {/* features */}
        <Grid2
          ref={myref}
          container
          sx={{
            // backgroundColor: "red",
            // border: "1px solid red",
            padding: { lg: "2em 1em 2em 2em", xs: "1em 0 1em 1em" },
            height: { lg: "115%" },
          }}
        >
          <Grid2 item size={12}>
            <Typography
              align="center"
              fontFamily="Rubik"
              sx={{ color: "#5f6fff" }}
            >
              Powerful Features
            </Typography>
          </Grid2>
          <Grid2 item size={12}>
            <Typography
              align="center"
              fontFamily="Rubik Semibold"
              fontSize={{ lg: "1.7em", xs: "1.2em" }}
            >
              Here's all the good stuff
            </Typography>
          </Grid2>
          <Grid2
            container
            spacing={{ lg: 1, md: 3, sm: 3, xs: 2 }}
            sx={{
              // backgroundColor: "pink",
              // height: "auto",
              width: "100vw",
              padding: { lg: "4em 5em 0 5em", xs: "1em", md: "2em", sm: "1em" },
              justifyContent: "space-between",
            }}
          >
            {Features.map((val) => (
              <Grid2
                item
                size={{ lg: 6, xs: 12, sm: 12, md: 12 }}
                container
                data-aos="fade-up"
                data-aos-duration="1500"
                sx={{
                  // backgroundColor: "pink",
                  justifyContent: "center",
                  height: "auto",
                }}
              >
                <Grid2
                  container
                  // spacing={2}
                  sx={{
                    // backgroundColor: "red",
                    width: { lg: "50vw", xs: "100vw" },
                    height: { lg: "30vh", xs: "" },
                  }}
                >
                  <Grid2
                    item
                    size={{ lg: 1, xs: 12, sm: 1, md: 1 }}
                    container
                    sx={{
                      // backgroundColor: "blue",
                      justifyContent: "center",
                      padding: "0.5",
                    }}
                  >
                    {val.icon}
                  </Grid2>
                  <Grid2
                    container
                    spacing={{ xs: 0.5 }}
                    // sx={{backgroundColor:"pink"}}
                    item
                    size={{ lg: 11, xs: 12, sm: 11, md: 11 }}
                    direction="column"
                  >
                    <Grid2
                      item
                      size={{ lg: 11, xs: 12, sm: 12, md: 11 }}
                      sx={
                        {
                          // backgroundColor: "pink"
                        }
                      }
                    >
                      <Typography fontFamily="Rubik SemiBold">
                        {val.head}
                      </Typography>
                    </Grid2>
                    <Grid2
                      item
                      size={{ lg: 11, xs: 12, sm: 12, md: 11 }}
                      sx={
                        {
                          // backgroundColor: "yellow"
                        }
                      }
                    >
                      <Typography fontFamily="Rubik">{val.desc}</Typography>
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* pages */}

        <Grid2
          container
          direction="column"
          sx={{
            backgroundColor: "aliceblue",
            padding: { lg: "3em", xs: "1em" },
            // justifyContent: "center",
            height: { xs: "72vh", lg: "115%", sm: "85vh", md: "90vh" },
          }}
        >
          <Grid2
            item
            size={12}
            container
            sx={{
              // backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              // mt: { xs: -5, lg: 0, sm: 0, md: 0 },
            }}
          >
            <Typography
              fontFamily="Rubik SemiBold"
              fontSize={{ lg: "2.3em", xs: "1.1em" }}
            >
              <span style={{ color: "#5f6fff" }}>Patient</span> Master and
              Registration
            </Typography>
          </Grid2>
          <Grid2
            item
            size={12}
            container
            sx={{
              // backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: { lg: "1em 8em 0 8em", xs: "1em 0 0 0", md: "1em" },
            }}
          >
            <Typography
              fontFamily="Rubik"
              fontSize={{ lg: "1.1em", xs: "1em" }}
            >
              Our Patient Master module stores complete patient information
              including name, age, gender, mobile number, and address. While
              creating a lab test, the patient data is auto-linked, making test
              assignment and report management much faster. You can also search
              and edit patient records as needed.
            </Typography>
          </Grid2>
          <Grid2
            item
            size={{ lg: 12, xs: 12, sm: 12, md: 12 }}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="800"
            sx={{ padding: { lg: "1em 8em 0 8em" } }}
          >
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                top: "2em",
                height: { lg: "71vh", xs: "20vh", sm: "50vh", md: "55vh" },
                width: { lg: "100%", xs: "100%", md: "100%" },
                background: "hsla(197, 100%, 63%, 1)",

                background:
                  "linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-moz-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-webkit-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                filter:
                  "progid:DXImageTransform.Microsoft.gradient(startColorstr='#40C9FF', endColorstr='#E81CFF', GradientType=1)",
              }}
            >
              <Grid2
                container
                item
                size={{ lg: 12 }}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2em",
                  position: "relative",
                  bottom: "3.1em",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: { lg: "70vh", xs: "20vh", sm: "50vh", md: "55vh" },
                    width: { lg: "70vw", xs: "80vw", sm: "80vw", md: "85vw" },
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={Img}
                />
              </Grid2>
            </Paper>
          </Grid2>
        </Grid2>

        {/* 2nd */}
        <Grid2
          container
          direction="column"
          sx={{
            backgroundColor: "",
            padding: { lg: "3em", xs: "1em" },
            // justifyContent: "center",
            height: { xs: "69vh", lg: "110%", sm: "85vh", md: "80vh" },
            // border: "1px solid red",
          }}
        >
          <Grid2
            item
            size={12}
            container
            sx={{
              // backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              // mt: { xs: -5, sm: 0, md: 0, lg: 0 },
            }}
          >
            <Typography
              fontFamily="Rubik SemiBold"
              fontSize={{ lg: "2.3em", xs: "1.1em" }}
            >
              <span style={{ color: "#5f6fff" }}>Test</span> Master
            </Typography>
          </Grid2>
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: { lg: "1em 8em 0 8em", xs: "1em 0 0 0" },
            }}
          >
            <Typography
              fontFamily="Rubik"
              fontSize={{ lg: "1.1em", xs: "1em" }}
            >
              Easily manage and configure all pathology tests. Each test
              includes a name, description, cost, and multiple collection types
              (e.g., Blood, Urine). This module allows for fast, consistent test
              selection and pricing throughout the lab workflow.
            </Typography>
          </Grid2>
          <Grid2
            item
            size={{ lg: 12, xs: 12, sm: 12, md: 12 }}
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="800"
            sx={{ padding: { lg: "1em 8em 0 8em" } }}
          >
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                top: "2em",
                height: { lg: "71vh", xs: "20vh", sm: "50vh", md: "55vh" },
                width: { lg: "100%", xs: "100%", sm: "100%" },
                background: "hsla(197, 100%, 63%, 1)",

                background:
                  "linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-moz-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-webkit-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                filter:
                  "progid:DXImageTransform.Microsoft.gradient(startColorstr='#40C9FF', endColorstr='#E81CFF', GradientType=1)",
              }}
            >
              <Grid2
                container
                item
                size={{ lg: 12 }}
                sx={{
                  justifyContent: "center",
                  padding: "2em",
                  position: "relative",
                  bottom: "3.1em",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: { lg: "70vh", xs: "20vh", sm: "50vh", md: "55vh" },
                    width: { lg: "70vw", xs: "80vw", sm: "80vw", md: "85vw" },
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={test}
                />
              </Grid2>
            </Paper>
          </Grid2>
        </Grid2>

        {/* 3rd */}
        <Grid2
          container
          direction="column"
          sx={{
            backgroundColor: "aliceblue",
            padding: { lg: "3em", xs: "1em" },
            // justifyContent: "center",
            // border: "1px solid red",
            height: { xs: "65vh", lg: "110%", sm: "82vh", md: "83vh" },
          }}
        >
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              // mt: { xs: -5, md: 0, sm: 0, lg: 0 },
            }}
          >
            <Typography
              fontFamily="Rubik SemiBold"
              fontSize={{ lg: "2.3em", xs: "1.1em" }}
            >
              <span style={{ color: "#5f6fff" }}>Lab</span> Test Management
            </Typography>
          </Grid2>
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: { lg: "1em 8em 0 8em", xs: "1em 0 0 0" },
            }}
          >
            <Typography
              fontFamily="Rubik"
              fontSize={{ lg: "1.1em", xs: "1em" }}
            >
              Create lab test records by selecting a patient and assigning one
              or multiple tests. Collection type and cost are fetched
              automatically from the Test Master. Includes test status updates,
              cost calculation, and report upload — everything in one place.
            </Typography>
          </Grid2>
          <Grid2
            item
            size={{ lg: 12, xs: 12, sm: 12 }}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="800"
            sx={{ padding: { lg: "1em 8em 0 8em" } }}
          >
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                top: "2em",
                height: { lg: "71vh", xs: "20vh", sm: "50vh", md: "55vh" },
                width: { lg: "100%", xs: "100%", md: "100%" },
                background: "hsla(197, 100%, 63%, 1)",

                background:
                  "linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-moz-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-webkit-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                filter:
                  "progid:DXImageTransform.Microsoft.gradient(startColorstr='#40C9FF', endColorstr='#E81CFF', GradientType=1)",
              }}
            >
              <Grid2
                container
                item
                size={{ lg: 12 }}
                sx={{
                  justifyContent: "center",
                  padding: "2em",
                  position: "relative",
                  bottom: "3.1em",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: { lg: "70vh", xs: "20vh", sm: "50vh", md: "55vh" },
                    width: { lg: "70vw", xs: "80vw", sm: "80vw", md: "85vw" },
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={Labtest}
                />
              </Grid2>
            </Paper>
          </Grid2>
        </Grid2>

        {/* 4th */}
        <Grid2
          container
          direction="column"
          sx={{
            backgroundColor: "",
            padding: { lg: "3em", xs: "1em" },
            // justifyContent: "center",
            height: { xs: "72vh", lg: "110%", sm: "83vh", md: "81vh" },
            // border: "1px solid red",
          }}
        >
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              // mt: { xs: -5, md: 0, sm: 0, lg: 0 },
            }}
          >
            <Typography
              fontFamily="Rubik SemiBold"
              fontSize={{ lg: "2.3em", xs: "1.1em" }}
            >
              <span style={{ color: "#5f6fff" }}>Status</span> Tracking
            </Typography>
          </Grid2>
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: { lg: "1em 8em 0 8em", xs: "1em 0 0 0" },
            }}
          >
            <Typography fontFamily="Rubik" fontSize="1.1em">
              Track the progress of each test in real-time. Status can be set to
              Pending, In Progress, or Completed, providing full visibility to
              lab staff and ensuring nothing falls through the cracks during the
              testing process.
            </Typography>
          </Grid2>
          <Grid2
            item
            size={{ lg: 12, xs: 12, sm: 12, md: 12 }}
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="800"
            sx={{ padding: { lg: "1em 8em 0 8em" } }}
          >
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                top: "2em",
                height: { lg: "71vh", xs: "20vh", sm: "50vh", md: "55vh" },
                width: { lg: "100%", xs: "100%", sm: "100%" },
                background: "hsla(197, 100%, 63%, 1)",

                background:
                  "linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-moz-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-webkit-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                filter:
                  "progid:DXImageTransform.Microsoft.gradient(startColorstr='#40C9FF', endColorstr='#E81CFF', GradientType=1)",
              }}
            >
              <Grid2
                container
                item
                size={{ lg: 12 }}
                sx={{
                  justifyContent: "center",
                  padding: "2em",
                  position: "relative",
                  bottom: "3.1em",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: { lg: "70vh", xs: "20vh", sm: "50vh", md: "55vh" },
                    width: { lg: "70vw", xs: "80vw", sm: "80vw", md: "85vw" },
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={Statuscheck}
                />
              </Grid2>
            </Paper>
          </Grid2>
        </Grid2>

        {/* 5th */}
        <Grid2
          container
          direction="column"
          sx={{
            backgroundColor: "aliceblue",
            padding: { lg: "3em", xs: "1em" },
            // justifyContent: "center",
            height: { xs: "65vh", lg: "110%", sm: "85vh", md: "85vh" },
            // border: "1px solid red",
          }}
        >
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              // mt: { xs: -5, sm: 0, md: 0, lg: 0 },
            }}
          >
            <Typography
              fontFamily="Rubik SemiBold"
              fontSize={{ lg: "2.3em", xs: "1.5em" }}
            >
              <span style={{ color: "#5f6fff" }}>Report</span> Upload
            </Typography>
          </Grid2>
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: { lg: "1em 8em 0 8em", xs: "1em 0 0 0" },
            }}
          >
            <Typography
              fontFamily="Rubik"
              fontSize={{ lg: "1.1em", xs: "1em" }}
            >
              After a test is completed, upload the final report. Reports are
              securely stored and linked to the patient's lab test record,
              ensuring fast retrieval and digital delivery when needed — fully
              paperless and efficient.
            </Typography>
          </Grid2>
          <Grid2
            item
            size={{ lg: 12, xs: 12, sm: 12 }}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="800"
            sx={{ padding: { lg: "1em 8em 0 8em" } }}
          >
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                top: "2em",
                height: { lg: "71vh", xs: "20vh", sm: "50vh", md: "55vh" },
                width: { lg: "100%", xs: "100%", sm: "100%" },
                background: "hsla(197, 100%, 63%, 1)",

                background:
                  "linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-moz-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-webkit-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                filter:
                  "progid:DXImageTransform.Microsoft.gradient(startColorstr='#40C9FF', endColorstr='#E81CFF', GradientType=1)",
              }}
            >
              <Grid2
                container
                item
                size={{ lg: 12 }}
                sx={{
                  justifyContent: "center",
                  padding: "2em",
                  position: "relative",
                  bottom: "3.1em",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: { lg: "70vh", xs: "20vh", sm: "50vh", md: "55vh" },
                    width: { lg: "70vw", xs: "80vw", sm: "80vw", md: "85vw" },
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={Report}
                />
              </Grid2>
            </Paper>
          </Grid2>
        </Grid2>

        {/* 6th */}
        <Grid2
          container
          direction="column"
          sx={{
            // backgroundColor: "red",
            padding: { lg: "3em", xs: "1em" },
            // justifyContent: "center",
            height: { xs: "55vh", lg: "110%", sm: "77vh", md: "80vh" },
            // border: "1px solid red",
          }}
        >
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              // mt: { xs: -5, sm: 0, md: 0, lg: 0 },
            }}
          >
            <Typography
              fontFamily="Rubik SemiBold"
              fontSize={{ lg: "2.3em", xs: "1.1em" }}
            >
              <span style={{ color: "#5f6fff" }}>Dashboard</span> & Insights
            </Typography>
          </Grid2>
          <Grid2
            item
            size={12}
            container
            sx={{
              //   backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: { lg: "1em 8em 0 8em", xs: "1em 0 0 0" },
            }}
          >
            <Typography
              fontFamily="Rubik"
              fontSize={{ lg: "1.1em", xs: "1em" }}
            >
              Get a real-time overview of your lab's performance with analytics
              like total tests conducted, patients registered, and pending
              reports — all from one centralized dashboard.
            </Typography>
          </Grid2>
          <Grid2
            item
            size={{ lg: 12, xs: 12, sm: 12 }}
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="800"
            sx={{ padding: { lg: "1em 8em 0 8em" } }}
          >
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                top: "2em",
                height: { lg: "71vh", xs: "20vh", sm: "50vh", md: "55vh" },
                width: { lg: "100%", xs: "100%", sm: "100%", md: "100%" },
                background: "hsla(197, 100%, 63%, 1)",

                background:
                  "linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-moz-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                background:
                  "-webkit-linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",

                filter:
                  "progid:DXImageTransform.Microsoft.gradient(startColorstr='#40C9FF', endColorstr='#E81CFF', GradientType=1)",
              }}
            >
              <Grid2
                container
                item
                size={{ lg: 12 }}
                sx={{
                  justifyContent: "center",
                  padding: "2em",
                  position: "relative",
                  bottom: "3.1em",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: { lg: "70vh", xs: "20vh", sm: "50vh", md: "55vh" },
                    width: { lg: "70vw", xs: "80vw", sm: "80vw", md: "85vw" },
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={Dashboard}
                />
              </Grid2>
            </Paper>
          </Grid2>
        </Grid2>

        {/* why pathotrack */}
        <Grid2
          container
          direction="column"
          sx={{
            padding: "1em",
            backgroundColor: "aliceblue",
            justifyContent: "center",
            marginTop: { lg: "2em", xs: 1 },
            // height:'115%'
            //  border:'1px solid red'
          }}
        >
          <Grid2
            container
            item
            size={12}
            sx={{
              // backgroundColor: "pink",
              padding: "1em",
            }}
          >
            <Grid2
              item
              size={12}
              container
              sx={{
                justifyContent: "center",

                // backgroundColor: "white"
              }}
            >
              {" "}
              <Typography
                fontFamily="Rubik Semibold"
                fontSize={{ lg: "2.3em", xs: "1.1em" }}
              >
                <span style={{ color: "#5f6fff" }}>Why</span> PathoTrack?
              </Typography>
            </Grid2>

            <Grid2
              item
              size={12}
              container
              sx={{
                justifyContent: "center",
                padding: { lg: "1em 8em 0 9em", sm: "1em", xs: "1em 0 0 0" },
                // backgroundColor: "red",
              }}
            >
              {" "}
              <Typography fontFamily="Rubik">
                PathoTrack is a smart pathology lab management system designed
                to simplify and streamline lab operations. From seamless patient
                registration and test management to auto-generated reports and
                real-time data access, PathoTrack offers a reliable and secure
                platform that enhances accuracy, improves efficiency, and
                supports labs of all sizes with multi-user access, customizable
                features, and built-in communication tools — all with an
                easy-to-use interface
              </Typography>
            </Grid2>

            <Grid2
              item
              container
              sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: "1em",
              }}
              size={12}
            >
              <Button
                onClick={() => {
                  navigate("/labs/Register");
                }}
                sx={{ backgroundColor: "#5F6FFF", color: "white" }}
              >
                Start Now
              </Button>
            </Grid2>
          </Grid2>

          {/* cards container */}
          <Grid2
            container
            spacing={{ lg: 5, xs: 2 }}
            sx={{
              // backgroundColor: "black",
              padding: { lg: "2em 12em 2em 12em", xs: "1em" },
            }}
          >
            {addon.map((val) => (
              <Grid2
                item
                data-aos="fade-up"
                // data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                size={{ lg: 3, sm: 6, md: 6, xs: 12 }}
                sx={
                  {
                    // backgroundColor: "pink"
                  }
                }
              >
                <Paper
                  elevation={3}
                  sx={{ height: { lg: "25vh", md: "27vh", sm: "26vh" } }}
                >
                  <Grid2
                    container
                    direction="column"
                    sx={{ justifyContent: "center" }}
                  >
                    <Grid2
                      item
                      container
                      sx={{
                        justifyContent: "center",
                        // backgroundColor: "red",
                        padding: "1em",
                      }}
                    >
                      {val.icon}
                    </Grid2>
                    <Grid2
                      item
                      container
                      sx={{
                        justifyContent: "center",
                        // backgroundColor: "pink",
                        padding: "1em",
                      }}
                    >
                      <Typography
                        align="center"
                        fontFamily="Rubik Semibold"
                        fontSize="1.1em"
                      >
                        {val.desc}
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* accordian */}
        <Grid2
          container
          sx={{
            backgroundColor: "white",
            padding: { lg: "6em 12em 6em 12em", xs: "1em" },
          }}
        >
          <Grid2
            item
            size={12}
            container
            direction="column"
            // sx={{ backgroundColor: "red" }}
          >
            <Grid2 item size={12} container sx={{ justifyContent: "center" }}>
              <Typography
                fontFamily="Rubik Semibold"
                fontSize={{ lg: "2em", sm: "1.5em" }}
              >
                Frequently Asked Questions
              </Typography>
            </Grid2>
            <Grid2 item size={12} sx={{ pt: "2em" }}>
              {accordian.map((val) => (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      component="span"
                      fontFamily="Rubik"
                      fontSize="1.3em"
                      sx={{ color: "black" }}
                    >
                      {val.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography fontFamily="Rubik">{val.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>

        {/* users */}
        <Grid2
          container
          sx={{
            backgroundColor: "aliceblue",

            padding: { lg: "6em 12em 6em 12em", sm: "2em", xs: "1em" },
          }}
        >
          <Grid2
            container
            spacing={{ lg: 5, xs: 1, md: 3 }}
            item
            sx={{
              // backgroundColor: "red",
              width: "100vw",
            }}
          >
            {users.map((val) => (
              <Grid2
                data-aos="zoom-in"
                item
                size={{ lg: 4, xs: 12, md: 4, sm: 4 }}
              >
                <Paper
                  sx={{
                    height: { lg: "39vh", sm: "49vh", xs: "45vh", md: "44vh" },
                  }}
                  // padding={{md:'1em'}}
                  elevation={3}
                >
                  <Grid2
                    direction="column"
                    spacing={{ lg: 1, sm: 1 }}
                    container
                  >
                    <Grid2
                      container
                      sx={{ justifyContent: "center", padding: "1em" }}
                      item
                    >
                      {val.icon}
                    </Grid2>
                    <Grid2 item>
                      <Typography
                        fontFamily="Rubik Semibold"
                        fontSize={{ lg: "1.2em" }}
                        align="center"
                      >
                        {val.main}
                      </Typography>
                    </Grid2>
                    <Grid2
                      container
                      sx={{
                        padding: { lg: "0.5em" },
                        height: { sm: "15vh", lg: "", md: "11vh" },
                      }}
                      item
                    >
                      <Typography fontFamily="Rubik" align="center">
                        {val.desc}
                      </Typography>
                    </Grid2>
                    <Grid2 item container sx={{ justifyContent: "center" }}>
                      <Button
                        onClick={() => {
                          if (val.btn == "Register a Lab") {
                            navigate("/Labs/Register");
                          } else if (val.btn == "Check Status") {
                            navigate("/labs/Statuscheck");
                          } else if (val.btn == "Login") {
                            navigate("/Labs/login");
                          }
                        }}
                        variant="contained"
                        sx={{ backgroundColor: "#5f6fff", color: "white" }}
                      >
                        {val.btn}
                      </Button>
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* footer */}

        <Grid2
          Container
          // spacing={2}
          sx={{
            // backgroundColor: "#5f6fff",
            padding: "1em",
            // border: "2px solid yellow",
          }}
        >
          <Grid2
            container
            item
            spacing={1}
            direction="row"
            sx={{
              //  backgroundColor: "red",
              padding: "1em",
            }}
          >
            {/* patho */}
            <Grid2
              item
              container
              direction="column"
              size={{ lg: 3, xs: 12, sm: 12 }}
              sx={{
                // backgroundColor: "pink",
                height: "35vh",
                padding: "0em",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid2
                item
                container
                direction="column"
                size={12}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red",
                  // height: "10vh",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: { lg: "vh", xs: "10vh", sm: "vh", md: "vh" },
                    width: { lg: "vw", xs: "vw", sm: "vw", md: "vw" },
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={Logo}
                />

                <Grid2 item container sx={{ justifyContent: "center" }}>
                  <Typography fontFamily="Rubik" sx={{ color: "" }}>
                    Streamlining Lab Management with Tech
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>

            {/* contact us */}
            <Grid2
              item
              size={{ lg: 3, xs: 12, sm: 6 }}
              container
              direction="column"
              spacing={1}
              sx={{ backgroundColor: "white", padding: "1em" }}
            >
              <Grid2 item container sx={{ justifyContent: "" }}>
                <Typography fontFamily="Rubik Semibold">Contact Us</Typography>
              </Grid2>

              <Grid2 item container direction="column" spacing={1}>
                <Grid2 item container direction="row" spacing={1}>
                  <MailIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      window.location.href = "mailto:Vrushant8888@gmail.com"; // Replace with your email address
                    }}
                  >
                    Vrushant8888@gmail.com
                  </Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <LocalPhoneIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      window.location.href = "tel:+917984655464"; // Replace with your phone number
                    }}
                  >
                    +91 7984655464
                  </Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <PlaceIcon />
                  <Typography>India</Typography>
                </Grid2>
              </Grid2>
            </Grid2>

            {/* Quick links */}
            <Grid2
              item
              size={{ lg: 3, xs: 12, sm: 6 }}
              container
              direction="column"
              spacing={1}
              sx={{ backgroundColor: "white", padding: "1em" }}
            >
              <Grid2 item container sx={{ justifyContent: "" }}>
                <Typography fontFamily="Rubik Semibold">Quick Links</Typography>
              </Grid2>

              <Grid2 item container direction="column" spacing={1}>
                <Grid2 item container direction="row" spacing={1}>
                  <HomeIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Home
                  </Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <InfoIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      navigate("/Aboutus");
                    }}
                  >
                    About Us
                  </Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <LockOpenIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      navigate("/Labs/Login");
                    }}
                  >
                    Login
                  </Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <HowToRegIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      navigate("/Labs/Register");
                    }}
                  >
                    Register
                  </Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <QueryStatsIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      navigate("/labs/Statuscheck");
                    }}
                  >
                    Status Check
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>

            {/* follow us */}
            <Grid2
              item
              size={{ lg: 3, xs: 12, sm: 12 }}
              container
              direction="column"
              spacing={1}
              sx={{ backgroundColor: "white", padding: "1em 1em 1em 1em" }}
            >
              <Grid2 item container sx={{ justifyContent: "" }}>
                <Typography fontFamily="Rubik Semibold">Follow Us</Typography>
              </Grid2>

              <Grid2 item container direction="column" spacing={1}>
                <Grid2 item container direction="row" spacing={1}>
                  <LinkedInIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      window.open(
                        "https://www.linkedin.com/in/vrushant-khambhu-32a588211/",
                        "_blank"
                      );
                    }}
                  >
                    LinkedIn
                  </Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <GitHubIcon />
                  <Typography
                    fontFamily="Rubik"
                    sx={{ "&:hover": { cursor: "pointer", color: "#5f6fff" } }}
                    onClick={() => {
                      window.open("https://github.com/vrushantt/", "_blank");
                    }}
                  >
                    Github
                  </Typography>
                </Grid2>

                <Grid2
                  item
                  container
                  sx={{
                    height: { lg: "19vh", xs: "10vh", sm: "0", md: "0vh " },
                    justifyContent: "end",
                    alignItems: "end",
                    // backgroundColor: "pink",
                  }}
                >
                  <Typography fontFamily="Rubik" sx={{ color: "black" }}>
                    © 2025 PathoTrack, All Rights Reserved
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Homepage;
