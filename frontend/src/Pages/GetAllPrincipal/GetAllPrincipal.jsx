import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import {
  getAllPrincipal,
  deletePrincipal,
  updatePrincipal,
} from "../../Redux/Actions/principal";
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
import "./GetAllPrincipal.css";

const GetAllPrincipal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_id, set_id] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);

  const principalsList = useSelector(
    (state) => state.principalList.principals_list
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPrincipal());
  }, []);

  const updateData = () => {
    const updatedPrincipal = {
      _id,
      name,
      email,
      contact,
      username,
      password,
    };

    dispatch(updatePrincipal(updatedPrincipal));
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
              <h3>Edit Admin Details</h3>
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
      <div className="comp_principal_details">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Principal Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {principalsList.map((pri) => (
                <StyledTableRow key={pri._id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {pri._id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{pri.name}</StyledTableCell>
                  <StyledTableCell align="center">{pri.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {pri.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="delete_update_btn_container">
                      <IconButton
                        aria-label="delete item"
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to delete ?")
                          ) {
                            dispatch(deletePrincipal(pri._id));
                          }
                        }}
                      >
                        <DeleteIcon className="delete_btn" />
                      </IconButton>
                      <IconButton
                        aria-label="edit item"
                        onClick={() => {
                          set_id(pri._id);
                          setUsername(pri.username);
                          setPassword(pri.password);
                          setName(pri.name);
                          setEmail(pri.email);
                          setContact(pri.contact);
                          setEmail(pri.email);
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
      <div className="all_principal_container">
        <div className="principal_table">{renderENTCList()}</div>
      </div>
      {modalFunc()}
    </>
  );
};

export default GetAllPrincipal;
