import {
  Button,
  Container,
  Grid2,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import TablePagination from "@mui/material/TablePagination";
import Toolbar from "@mui/material/Toolbar";
import TableSortLabel from "@mui/material/TableSortLabel";
import EditIcon from "@mui/icons-material/Edit";

//dELETE DIALOG

import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function createData(id, Name, Email, Role, Password, Action) {
  return {
    id,
    Name,
    Email,
    Role,
    Password,
    Action,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67),
  createData(2, "Donut", 452, 25.0, 51),
  createData(3, "Eclair", 262, 16.0, 24),
  createData(4, "Frozen yoghurt", 159, 6.0, 24),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
  createData(7, "Ice cream sandwich", 237, 9.0, 37),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
  createData(9, "KitKat", 518, 26.0, 65, 7.0),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0),
  createData(11, "Marshmallow", 318, 0, 81),
  createData(12, "Nougat", 360, 19.0, 9, 37.0),
  createData(13, "Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "Email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "Role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "Password",
    numeric: true,
    disablePadding: false,
    label: "Password",
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ backgroundColor: "#5F6FFF", color: "white" }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          fontSize="1.7em"
          fontFamily="Rubik Light"
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          User Creation
        </Typography>
      )}
      {numSelected < 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

//Main function

function Usercreation() {
  //DELETE DAILOG

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  // Table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  //SELECT
  const handleClick = (event, id) => {
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    // setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  function PaperComponent(props) {
    const nodeRef = React.useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef}
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper sx={{ backgroundColor: "" }} {...props} ref={nodeRef} />
      </Draggable>
    );
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function createData(Name, Email, Role, Password, Action) {
    return { Name, Email, Role, Password, Action };
  }

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          // backgroundColor: "red",
          width: "100vw",
          height: "100vh",
          display: "flex",
          overflow: "hidden",
          position: "fixed",
          flexDirection: "column",
          gap: "2px",
          // justifyContent:'center',
          // alignItems:'center',
        }}
      >
        <Grid2
          container
          //   direction="column"
          sx={{
            // backgroundColor: "pink",

            width: "100%",
            height: "11vh",
            marginTop: "6px",
            // justifyContent: "center",
            // alignItems: "center",
            justifyContent: "center",
            padding: "1em",
          }}
        >
          <Typography
            fontSize="1.7em"
            fontFamily="Rubik Light"
            sx={{ color: "" }}
          >
            {/* User Creation */}
          </Typography>

          <Grid2 item>
            {" "}
            <Button
              size="large"
              onClick={handleClickOpen}
              variant="contained"
              sx={{ backgroundColor: "#5F6FFF" }}
            >
              <div>
                <SupervisedUserCircleRoundedIcon />
              </div>
              Add
            </Button>
          </Grid2>
          {/* <Grid2><Typography fontSize='1em' fontFamily="Rubik"  >
          You can create a User from here:
          </Typography></Grid2> */}

          <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open draggable dialog
      </Button> */}
            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              ></DialogTitle>
              <DialogContent>
                <Box
                  container
                  spacing={0}
                  direction={"column"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    borderRadius: "px",
                    width: "25vw",
                    height: "",
                    backgroundColor: "aliceblue",
                    padding: "15px",
                    overflow: "auto",
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <Grid2 item size={{ lg: 12, sm: 12, md: 12 }}>
                    <Typography
                      fontFamily="Rubik SemiBold"
                      variant="h4"
                      align="center"
                    >
                      User Creation
                    </Typography>
                  </Grid2>

                  <Grid2 item size={{ lg: 12, sm: 12, md: 12 }}>
                    <Typography
                      fontFamily="Rubik"
                      variant="body1"
                      align="center"
                    >
                      Please Fill All Details
                    </Typography>
                  </Grid2>

                  <Grid2
                    item
                    size={12}
                    container
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TextField
                      size="small"
                      sx={{ width: "95%" }}
                      onChange={(e) => {
                        handlelogin(e);
                      }}
                      id="Name"
                      label="Name"
                      placeholder="Name"
                      Name="Name"
                      variant="outlined"
                    />
                  </Grid2>

                  <Grid2
                    item
                    size={{ lg: 12, sm: 12, md: 12 }}
                    container
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TextField
                      size="small"
                      sx={{ width: "95%" }}
                      onChange={(e) => {
                        handlelogin(e);
                      }}
                      id="Email"
                      label="Email"
                      placeholder="Email"
                      Name="Role"
                      variant="outlined"
                    />
                  </Grid2>

                  <Grid2
                    item
                    size={{ lg: 12, sm: 12, md: 12 }}
                    container
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TextField
                      size="small"
                      sx={{ width: "95%" }}
                      onChange={(e) => {
                        handlelogin(e);
                      }}
                      id="Role"
                      label="Role"
                      placeholder="Role"
                      Name="Role"
                      variant="outlined"
                    />
                  </Grid2>
                  <Grid2
                    item
                    size={{ lg: 12, sm: 12, md: 12 }}
                    container
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TextField
                      size="small"
                      sx={{ width: "95%" }}
                      onChange={(e) => {
                        handlelogin(e);
                      }}
                      id="Password"
                      label="Password"
                      placeholder="Password"
                      Name="Password"
                      variant="outlined"
                    />
                  </Grid2>

                  <Grid2
                    item
                    size={{ lg: 12, sm: 12, md: 12 }}
                    container
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Button
                      onClick={() => {
                        console.log(logindata);
                      }}
                      sx={{
                        backgroundColor: "#5F6FFF",
                        border: "1px solid #5F6FFF",
                        width: "100%",
                      }}
                      variant="contained"
                    >
                      Add
                    </Button>
                  </Grid2>
                </Box>
              </DialogContent>
              <DialogActions>
                {/* <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleClose}>Subscribe</Button> */}
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Grid2>

        <Grid2
          sx={{
            width: "100%",
            height: "100%",
            marginTop: "5px",
          }}
        >
          {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor:'#5F6FFF'}}>
          <TableRow>
            <TableCell sx={{color:'white'}} >Name</TableCell>
            <TableCell align="center" sx={{color:'white'}}>Email</TableCell>
            <TableCell align="center" sx={{color:'white'}}>Role</TableCell>
            <TableCell align="center" sx={{color:'white'}}>Password</TableCell>
            <TableCell align="center" sx={{color:'white'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Vrushat
              </TableCell>
              <TableCell align="center">Vrushant8888@gmail.com</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">12345678</TableCell>
              <TableCell align="center">{row.Action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}

          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750, overflow: "auto" }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const isItemSelected = selected.includes(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            {/* <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            /> */}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.Name}
                          </TableCell>
                          <TableCell align="right">{row.Email}</TableCell>
                          <TableCell align="right">{row.Role}</TableCell>
                          <TableCell align="right">{row.Password}</TableCell>
                          <TableCell align="right">
                            <IconButton>
                              <EditIcon
                                onClick={() => {
                                  console.log("icon clicked");
                                }}
                              />
                            </IconButton>
                            <IconButton>
                              {" "}
                              <DeleteIcon
                                onClick={() => {
                                  handleClickOpen1();
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
          <React.Fragment>
            <Dialog
              open={open1}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose1}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Delete Item?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this item? This action is
                permanent and cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained"
                  sx={{ backgroundColor: "#5F6FFF" }} onClick={handleClose1}>Disagree</Button>
                <Button variant="contained"
                  sx={{ backgroundColor: "#5F6FFF" }} onClick={handleClose1}>Agree</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Grid2>
      </Container>
    </>
  );
}

export default Usercreation;
