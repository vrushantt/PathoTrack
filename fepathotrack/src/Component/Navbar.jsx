import React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import List from "@mui/material/List";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logof.jpg";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircle";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeople";
import BiotechRoundedIcon from "@mui/icons-material/Biotech";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLong";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStats";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboard";
import { signOut } from "firebase/auth";
import { Grid2 } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Config/Firebaseconfig";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import JWT from "jsonwebtoken";
import { useLocation } from "react-router-dom";
// import "./Navbar.css"
const pages = ["Login"];
const settings = ["Profile", "Logout"];

const drawermenu = [
  { Name: "User Creation", path: "/labs/Usercreation" },
  // { Name: "Patient Master", path: "/labs/Patientmaster" },
  // { Name: "Test Master", path: "/labs/Testmaster" },
  // { Name: "Lab Test", path: "/labs/Labtest" },
  // { Name: "Status Check", path: "/labs/Statuscheck" },
  { Name: "Dashboard", path: "/labs/Dashboard" },
];

const Receptionistmenu = [
  { Name: "Patient Master", path: "/labs/Patientmaster" },
  { Name: "Test Master", path: "/labs/Testmaster" },
  { Name: "Dashboard", path: "/labs/Dashboard" },
];

const Adminmenu = [
  { Name: "Patient Master", path: "/labs/Patientmaster" },
  { Name: "Test Master", path: "/labs/Testmaster" },
  { Name: "Lab Test", path: "/labs/Labtest" },
  { Name: "Status Check", path: "/labs/Statuscheck" },
  { Name: "Dashboard", path: "/labs/Dashboard" },
];
const Technicianmenu = [
  { Name: "Lab Test", path: "/labs/Labtest" },
  { Name: "Status Check", path: "/labs/Statuscheck" },
  { Name: "Dashboard", path: "/labs/Dashboard" },
];

const Navbar = ({ isLogin, setIsLogin }) => {
  const [Role, setRole] = React.useState(localStorage.getItem("Role"));
  const [Roleid, setRoleid] = React.useState(localStorage.getItem("Roleid"));
  console.log(Role);

  function Rolebased() {
    if (Role === "Admin") {
      return Adminmenu;
    } else if (Role === "Lab Technician") {
      return Technicianmenu;
    } else if (Role === "Receptionist") {
      return Receptionistmenu;
    } else {
      return drawermenu;
      console.log();
    }
  }
  console.log(Role);
  //Firebase Signout
  //to give reference
  const navigate = useNavigate();

  const Signout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      localStorage.removeItem("Role");
      toast.success("User Logout Successfully", {
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     if (user.metadata.lastSignInTime) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // });

  React.useEffect(() => {
    let token = localStorage.getItem("accessToken");
    let email = localStorage.getItem("email");
    if (token) {
      let tData = JWT.decode(token);
      if (tData.email === email) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setRole(localStorage.getItem("Role"));
    setRoleid(localStorage.getItem("Roleid"));
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // Check if user has signed in before (not just registered)
    //     if (user.metadata.lastSignInTime !== user.metadata.creationTime) {
    //       setIsAuthenticated(true);
    //     } else {
    //       setIsAuthenticated(false); // Newly registered users are not considered logged in
    //     }
    //   } else {
    //     setIsAuthenticated(false);
    //   }
    // });

    // return () => unsubscribe();
  }, [isLogin]);

  //drawer

  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <Grid2 container>
        <Grid2
          item
          container
          size={8}
          sx={{
            justifyContent: "start",
            alignItems: "center",
            // marginLeft: "1.4em",
          }}
        >
          {" "}
          <img src={Logo} style={{ marginLeft: "13px" }} height="35"></img>
        </Grid2>
        <Grid2 item container size={4} sx={{ justifyContent: "end" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={toggleDrawer(anchor, false)}
            color="inherit"
          >
            <KeyboardDoubleArrowLeftIcon
              sx={{
                backgroundColor: "#5F6FFF",
                color: "white",
                height: "1em",
                width: "1em",
                borderRadius: "3px",
              }}
            />
          </IconButton>
        </Grid2>
      </Grid2>
      <Divider />

      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
          backgroundColor: "",
          height: "100%",
          // marginTop: '100em'
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List sx={{ padding: "2px" }}>
        {Rolebased().map((val, index) => (
          console.log(val),
          <ListItem
            sx={{ fontFamily: "Rubik" }}
            key={val.Name}
            disablePadding
            onClick={() => {
              navigate(val.path);
            }}
          >
              <ListItemButton>
                <ListItemIcon>
                  {val.Name === "User Creation" && (
                    <SupervisedUserCircleRoundedIcon
                      sx={{
                        backgroundColor: "#5F6FFF",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    />
                  )}
                  {val.Name === "Patient Master" && (
                    <EmojiPeopleRoundedIcon
                      sx={{
                        backgroundColor: "#5F6FFF",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    />
                  )}
                  {val.Name === "Test Master" && (
                    <BiotechRoundedIcon
                      sx={{
                        backgroundColor: "#5F6FFF",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    />
                  )}
                  {val.Name ===  "Lab Test" && (
                    <ReceiptLongRoundedIcon
                      sx={{
                        backgroundColor: "#5F6FFF",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    />
                  )}
                  {val.Name === "Status Check" && (
                    <QueryStatsRoundedIcon
                      sx={{
                        backgroundColor: "#5F6FFF",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    />
                  )}
                  {val.Name === "Dashboard" && (
                    <SpaceDashboardRoundedIcon
                      sx={{
                        backgroundColor: "#5F6FFF",
                        color: "white",
                        borderRadius: "3px",
                      }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={val.Name} sx={{ fontFamily: "Rubik" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        {/* <List sx={{ padding: "2px" }}>
      {["Status Check", "Dashboard"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index === 0 && <QueryStatsRoundedIcon />}
              {index === 1 && <SpaceDashboardRoundedIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List> */}
      </Box>
    </>
  );

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menu = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/Aboutus" },
    { name: "Login", path: "/Labs/Login" },
  ];

  const location = useLocation();
  return (
    <>
      <AppBar
        // maxWidth="100%"
        position="sticky"
        // bottom="8em"
        sx={{ backgroundColor: "white", width: { lg: "211vh", xs: "100%" } }}
      >
        <Container maxWidth="false" sx={{ width: "100vw" }}>
          <Toolbar disableGutters sx={{ color: "black",
            ml:'-0.8em',
             width: "100%" }}>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

            {/*           
          <MenuIcon  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}

                {isAuthenticated ? (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={toggleDrawer(anchor, true)}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                ) : null}

                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
            <img
              onClick={() => {
                navigate("/");
              }}
              src={Logo}
              style={{ marginLeft: "7px" }}
              height="45"
            ></img>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                ml: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                //   letterSpacing: '.3rem',
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>


{isAuthenticated ? null :   <Box
              sx={{
                ml: "auto",
                flexGrow: 0,
                display: { xs: "flex", md: "none", sm: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" }, position: "fixed" }}
              >
                {menu.map((val) => (
                  <MenuItem key="" onClick={handleCloseNavMenu}>
                    <Typography
                      onClick={() => {
                        navigate(val.path);
                      }}
                      sx={{ textAlign: "center" }}
                    >
                      {val.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
}
          
            {isAuthenticated ? (
              <Box sx={{ flexGrow: 0, ml: "auto", overflow: "hidden" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Profile"
                      src="https://img.freepik.com/free-photo/portrait-3d-male-doctor_23-2151107083.jpg?ga=GA1.1.537434374.1738737850&semt=ais_hybrid"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <Grid2
                      container
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Grid2 item>
                        {" "}
                        <MenuItem key={setting} sx={{ pointerEvents: "none" }}>
                          <Typography sx={{ fontFamily: "Rubik" }}>
                            {setting}
                          </Typography>
                        </MenuItem>
                      </Grid2>

                      <Grid2 item>
                        {" "}
                        <IconButton onClick={() => {}}>
                          {setting == "Logout" ? (
                            <LogoutIcon
                              onClick={() => {
                                localStorage.removeItem("accessToken");
                                localStorage.removeItem("email");
                                localStorage.removeItem("useremail");
                                // localStorage.removeItem("Role");
                                // localStorage.removeItem("Roleid");
                                Signout();
                                setIsLogin();
                                // setRole("")
                                handleCloseUserMenu();
                              }}
                              sx={{
                                backgroundColor: "#5F6FFF",
                                color: "white",
                                borderRadius: "3px",
                              }}
                            />
                          ) : (
                            <AccountBoxIcon
                              onClick={() => {
                                navigate("/labs/Profile");
                                handleCloseUserMenu();
                              }}
                              sx={{
                                backgroundColor: "#5F6FFF",
                                color: "white",
                                borderRadius: "3px",
                              }}
                            />
                          )}
                        </IconButton>
                      </Grid2>
                    </Grid2>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box
                sx={{
                  ml: "auto", // Pushes the box to the right
                  display: { xs: "none", sm: "flex", md: "flex", gap: "2em" },
                }}
              >
                <Typography
                  // variant="h6"
                  onClick={() => {
                    navigate("/");
                  }}
                  noWrap
                  component="a"
                  sx={{
                    fontFamily: "Rubik",
                    textDecoration:
                      location.pathname === "/" ? "underline" : null,
                    textDecorationColor:
                      location.pathname === "/" ? "#5f6fff" : null,
                    textDecorationThickness:
                      location.pathname === "/" ? "3px" : null,
                    "&:hover": {
                      textDecoration: "underline",
                      textDecorationColor: "#5F6FFF",
                      cursor: "pointer",
                      textDecorationThickness: "3px",
                    },
                  }}
                >
                  Home
                </Typography>
                <Typography
                  // variant="h6"
                  onClick={() => {
                    navigate("/Aboutus");
                  }}
                  noWrap
                  component="a"
                  sx={{
                    fontFamily: "Rubik",

                    textDecoration:
                      location.pathname === "/Aboutus" ? "underline" : null,
                    textDecorationColor:
                      location.pathname === "/Aboutus" ? "#5f6fff" : null,
                    textDecorationThickness:
                      location.pathname === "/Aboutus" ? "3px" : null,
                    "&:hover": {
                      textDecoration: "underline",
                      textDecorationColor: "#5F6FFF",
                      cursor: "pointer",
                      textDecorationThickness: "3px",
                    },
                  }}
                >
                  About Us
                </Typography>
                <Typography
                  onClick={() => {
                    navigate("/Labs/Login");
                  }}
                  // variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    fontFamily: "Rubik",
                    textDecoration:
                      location.pathname === "/Labs/Login" ? "underline" : null,
                    textDecorationColor:
                      location.pathname === "/Labs/Login" ? "#5f6fff" : null,
                    textDecorationThickness:
                      location.pathname === "/Labs/Login" ? "3px" : null,
                    "&:hover": {
                      textDecoration: "underline",
                      textDecorationColor: "#5F6FFF",
                      cursor: "pointer",
                      textDecorationThickness: "3px",
                    },
                  }}
                >
                  Login
                </Typography>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
