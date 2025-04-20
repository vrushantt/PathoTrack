import React from "react";
import Logo from "../assets/Logof.jpg";
import { Container, Grid2, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
const Footer = () => {
  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          backgroundColor: "black",
          height: "100vh",
          width: "99vw",
          display: "flex",
          flexDirection: "column",
          padding: "1em",
          // gap: "1em",
          // padding: "0em 12em 0em 12em"
        }}
      >
        <Grid2
          Container
          sx={{
            backgroundColor: "white",
            padding: "1em",
            border: "2px solid yellow",
          }}
        >
          {/* 1st */}
          <Grid2
            item
            direction="column"
            container
            sx={{
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid2 item>
              <img style={{ width: "15vw" }} src={Logo} alt="logog"></img>
            </Grid2>
            <Grid2 item>
              <Typography fontFamily="Rubik">
                Streamlining Lab Management with Smart Tech
              </Typography>
            </Grid2>
          </Grid2>
          <br></br>
          {/* 2nd */}
          <Grid2 item container>
            {/* contact info */}
            <Grid2
              item
              size={4}
              container
              direction="column"
              sx={{ justifyContent: "center", backgroundColor: "pink" }}
            >
              <Grid2 item container sx={{ justifyContent: "center" }}>
                <Typography fontFamily="Rubik">Contact Info</Typography>
              </Grid2>

              <Grid2 item container direction="column" spacing={1}>
                <Grid2 item container direction="row" spacing={1}>
                  <MailIcon />
                  <Typography>Vrushant8888@gmail.com</Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <LocalPhoneIcon />
                  <Typography>+91 7984655464</Typography>
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
              size={4}
              container
              sx={{ justifyContent: "", backgroundColor: "violet" }}
            >
              <Grid2
                item
                size={12}
                container
                sx={{ justifyContent: "center", paddingTop: "1em" }}
              >
                <Typography fontFamily="Rubik">Quick Links</Typography>
              </Grid2>

              <Grid2 item container direction="column" spacing={0}>
                <Grid2 item container direction="row" spacing={1}>
                  <Typography>Home</Typography>
                </Grid2>

                <Grid2 item container direction="row" spacing={1}>
                  <Typography>About Us</Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <Typography>Login</Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <Typography>Register</Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <Typography>Status Check</Typography>
                </Grid2>
              </Grid2>
            </Grid2>

            {/* Follow Us */}
            <Grid2
              item
              size={4}
              container
              spacing={1}
              direction="column"
              sx={{ justifyContent: "", backgroundColor: "pink" }}
            >
              <Grid2 item container sx={{ justifyContent: "center" }}>
                <Typography fontFamily="Rubik">Follow Us</Typography>
              </Grid2>

              <Grid2 item container direction="column" spacing={1}>
                <Grid2 item container direction="row" spacing={1}>
                  <LinkedInIcon />
                  <Typography>LinkedIn</Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <GitHubIcon />
                  <Typography>Github</Typography>
                </Grid2>
                <Grid2 item container direction="row" spacing={1}>
                  <PlaceIcon />
                  <Typography>India</Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Footer;
