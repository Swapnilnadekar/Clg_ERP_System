import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import {
  getAllTeacher,
  deleteTeacher,
  updateTeacher,
} from "../../Redux/Actions/teacher";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import "./GetAllTeacher.css";

const GetAllTeacher = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_id, set_id] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const teachersList = useSelector((state) => state.teacherList.teachers_list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeacher());
  }, []);

  const searchTeacher = (e) => {
    console.log(search);
    setSearch(e.target.value);

    if (search !== "") {
      const new_list = teachersList.filter((current) => {
        const tbc =
          current.name.toLowerCase() +
          " " +
          current.email.toLowerCase() +
          " " +
          current.contact.toLowerCase();
        const tbcw = search.toLowerCase();
        return tbc.includes(tbcw);
      });
      setSearchList(new_list);
    }
  };

  const updateData = () => {
    const updatedTeacher = {
      _id,
      name,
      email,
      branch,
      contact,
      username,
      password,
    };

    dispatch(updateTeacher(updatedTeacher));
    handleClose();
  };

  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const modalFunc = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box_style">
            <div className="edit_form">
              <h3>Edit Teacher Details</h3>
              <TextField
                id="register_name"
                color="info"
                label="Name"
                variant="outlined"
                error={nameError}
                onChange={(e) => setName(e.target.value)}
                value={name}
                style={{ width: "65%", margin: "4px" }}
              />
              <div
                className="email_contact_container"
                style={{ width: "65%", margin: "4px" }}
              >
                <TextField
                  value={email}
                  id="register_email"
                  color="info"
                  label="Email ID"
                  variant="outlined"
                  error={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  value={contact}
                  id="register_contact"
                  color="info"
                  label="Mobile No."
                  variant="outlined"
                  error={contactError}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div
                className="class_details_container"
                style={{ width: "65%", margin: "4px" }}
              >
                <TextField
                  value={branch}
                  id="register_branch"
                  color="info"
                  label="Branch"
                  variant="outlined"
                  error={branchError}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="outlined"
              startIcon={<CheckIcon />}
              onClick={updateData}
            >
              Update
            </Button>
          </Box>
        </Modal>
      </div>
    );
  };

  const renderENTCList = () => {
    return (
      <div className="comp_teacher_details">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Teacher Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center">Branch</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachersList.map((tech) => (
                <StyledTableRow key={tech._id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {tech._id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{tech.name}</StyledTableCell>
                  <StyledTableCell align="center">{tech.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {tech.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tech.branch}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="delete_update_btn_container">
                      <IconButton
                        aria-label="delete item"
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to delete ?")
                          ) {
                            dispatch(deleteTeacher(tech._id));
                          }
                        }}
                      >
                        <DeleteIcon className="delete_btn" />
                      </IconButton>
                      <IconButton
                        aria-label="edit item"
                        onClick={() => {
                          set_id(tech._id);
                          setUsername(tech.username);
                          setPassword(tech.password);
                          setName(tech.name);
                          setEmail(tech.email);
                          setContact(tech.contact);
                          setBranch(tech.branch);
                          setEmail(tech.email);
                          setOpen(true);
                        }}
                      >
                        <ModeEditIcon className="edit_btn" />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {
                // Comment code
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const renderSearchList = () => {
    return (
      <div className="comp_search_details">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Teacher Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center">Branch</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchList.map((tech) => (
                <StyledTableRow key={tech._id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {tech._id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{tech.name}</StyledTableCell>
                  <StyledTableCell align="center">{tech.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {tech.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tech.branch}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="delete_update_btn_container">
                      <IconButton
                        aria-label="delete item"
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to delete ?")
                          ) {
                            dispatch(deleteTeacher(tech._id));
                          }
                        }}
                      >
                        <DeleteIcon className="delete_btn" />
                      </IconButton>
                      <IconButton
                        aria-label="edit item"
                        onClick={() => {
                          set_id(tech._id);
                          setUsername(tech.username);
                          setPassword(tech.password);
                          setName(tech.name);
                          setEmail(tech.email);
                          setContact(tech.contact);
                          setBranch(tech.branch);
                          setEmail(tech.email);
                          setOpen(true);
                        }}
                      >
                        <ModeEditIcon className="edit_btn" />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {
                // Comment code
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="search_container">
        <Input
          id="input-with-icon-adornment"
          value={search}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Search ..."
          onChange={searchTeacher}
        />
      </div>
      <div className="all_teacher_container">
        {search < 1 ? <></> : renderSearchList()}
        <div className="teacher_table">
          {search < 1 ? renderENTCList() : <></>}
        </div>
      </div>
      {modalFunc()}
    </>
  );
};

export default GetAllTeacher;
