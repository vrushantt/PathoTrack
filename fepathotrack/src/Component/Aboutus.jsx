import React from "react";
import {
  Container,
  Grid2,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import vk from "../assets/vk.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { color } from "framer-motion";
import AOS from "aos";
import { motion, useScroll } from "framer-motion";
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
import { useNavigate } from "react-router-dom";

AOS.init();

const Aboutus = () => {
  const { scrollYProgress } = useScroll();
  const scaleX =
    (scrollYProgress,
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });

  // const myref = useRef(null);
  const navigate = useNavigate();
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
          //   backgroundColor: "red",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          // gap: "1em",
          //   padding: "0em 12em 0em 12em",
        }}
      >
        {/* pathotrack */}
        <Grid2
          container
          spacing={1}
          sx={{
            backgroundColor: "",
            padding: { lg: "7em", xs: "1em 0.5em 1em 0.5em", sm: "1em" },
            width: "100%",
          }}
        >
          <Grid2 item size={12} container sx={{ justifyContent: "center" }}>
            <Typography fontFamily="Rubik Semibold" fontSize="2em">
              <span style={{ color: "#5f6fff" }}>About</span> PathoTrack
            </Typography>
          </Grid2>
          <Grid2 item size={12} container sx={{ justifyContent: "center" }}>
            <Typography align="center" fontFamily="Rubik" fontSize="1em">
              PathoTrack is a digital platform designed to streamline and manage
              operations in pathology labs. It helps labs efficiently handle
              test records, manage patients, and keep track of test reports —
              all while ensuring that patients can check their status and
              reports online
            </Typography>
          </Grid2>
        </Grid2>

        {/* 2nd */}
        <Grid2
          container
          // spacing={5}
          sx={
            {
              // backgroundColor: "pink",
              // padding: "1em 8em 1em 8em",
            }
          }
        >
          {/* mission */}
          <Grid2
            container
            sx={{
              // mt:'1em',
              backgroundColor: "aliceblue",
              padding: "1em",
              justifyContent: "center",
              alignItems: "center",
              // height: "70vh",
              // border: "1px solid black",
            }}
          >
            <Grid2
              item
              data-aos="fade-up"
              // data-aos="zoom-out-right"
              // data-aos-offset="300"
              // data-aos-easing="ease-in-sine"
              container
              size={{ lg: 4, xs: 12, sm: 5 }}
              sx={{
                // backgroundColor: "yellow",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <Typography fontFamily="Rubik Semibold" fontSize="1.8em">
                  <span style={{ color: "#5f6fff" }}>Our</span> Mision
                </Typography>
                <Typography
                  fontFamily="Rubik"
                  fontSize={{ lg: "1.2em", sm: "1em" }}
                  sx={{ mt: "1em" }}
                >
                  Our mission is to empower diagnostic labs with a
                  user-friendly, tech-driven solution that streamlines testing,
                  enhances patient communication, and ensures accuracy and trust
                  in healthcare services.
                </Typography>
              </div>
            </Grid2>

            <Grid2
              item
              container
              data-aos="fade-down"
              // data-aos="zoom-out-left"
              // data-aos-offset="300"
              // data-aos-easing="ease-in-sine"
              size={6}
              sx={{
                // backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <DotLottieReact
                src="https://lottie.host/8ca51a67-9607-4b7e-bed6-b21fffe97628/xEBuTBYunv.lottie"
                loop
                autoplay
              />
            </Grid2>
          </Grid2>

          {/* vision */}

          <Grid2
            container
            sx={{
              // mt:'1em',
              backgroundColor: "white",
              padding: "1em",
              // justifyContent: "center",
              alignItems: "center",
              // height: "70vh",
              // border: "1px solid black",
            }}
          >
            <Grid2
              data-aos="fade-down"
              // data-aos-offset="3000"
              item
              container
              // data-aos="zoom-out-left"
              // data-aos-offset="300"
              // data-aos-easing="ease-in-sine"
              size={{ lg: 6, xs: 0, sm: 6 }}
              sx={{
                // backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <DotLottieReact
                src="https://lottie.host/b689d0cd-7812-4fda-bd7f-ad781ca4fba5/BINgAUvWuK.lottie"
                loop
                autoplay
              />
            </Grid2>

            <Grid2
              data-aos="fade-up"
              // data-aos-offset="3000"
              container
              item
              size={{ lg: 6, sm: 6 }}
              sx={{ justifyContent: "center", padding: { lg: "0 8em 0 2em" } }}
            >
              <Grid2
                item
                // data-aos="zoom-out-right"
                // data-aos-offset="300"
                // data-aos-easing="ease-in-sine"
                container
                // size={4}
                sx={{
                  // backgroundColor: "yellow",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: { sm: "0 1em 0 0" },
                }}
              >
                <div>
                  <Typography fontFamily="Rubik Semibold" fontSize="1.8em">
                    <span style={{ color: "#5f6fff" }}>Our</span> Vision
                  </Typography>
                  <Typography
                    fontFamily="Rubik"
                    fontSize={{ lg: "1.2em" }}
                    sx={{ mt: "1em" }}
                  >
                    To revolutionize diagnostic healthcare by becoming the
                    leading digital platform that empowers pathology labs with
                    smart, efficient, and patient-friendly solutions — ensuring
                    accuracy, transparency, and accessibility for every test,
                    everywhere.
                  </Typography>
                </div>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        {/* founder */}
        <Grid2
          container
          sx={{
            backgroundColor: "aliceblue",

            padding: { lg: "1em 8em 1em 8em", sm: "1em" },
          }}
        >
          <Grid2
            container
            data-aos="fade-up"
            // data-aos-offset="3000"
            item
            size={12}
            spacing={1}
            sx={{
              // backgroundColor: "red",
              width: "97vw",
              padding: { lg: "2em 0 2em 0", xs: "1em", sm: "0em" },
            }}
          >
            <Grid2
              item
              size={{ lg: 2.3, xs: 12, md: 2.3 }}
              container
              sx={{ backgroundColor: "", justifyContent: "center" }}
            >
              <img src={vk} alt="" style={{ width: "15vw" }} />
            </Grid2>
            <Grid2
              container
              direction="column"
              spacing={2}
              item
              size={{ lg: 9.7, xs: 12, sm: 12, md: 9.7 }}
            >
              <Grid2 item>
                <Typography fontFamily="Rubik SemiBold" fontSize="1.2em">
                  Vrushant Khambhu
                </Typography>
                <Typography fontFamily="Rubik">Founder</Typography>
              </Grid2>
              <Grid2 item>
                <Typography fontFamily="Rubik" fontSize={{ sm: "1.07em" }}>
                  As a Founder of PathoTrack, a smart pathology management
                  system built to simplify lab workflows and bring digital
                  transformation to diagnostic centers. From user and patient
                  management to test tracking and reporting,PathoTrack reflects
                  my vision to improve the efficiency, transparency, and
                  accessibility of lab operations—empowering both lab
                  technicians and patients through technology. Every module,
                  from Test Master to Lab Test reports, is crafted with
                  real-world usability in mind. I believe in innovation that
                  matters—and PathoTrack is just the beginning.
                </Typography>
              </Grid2>
            </Grid2>
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

export default Aboutus;
