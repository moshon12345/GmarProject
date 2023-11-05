import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { UserProvider, useUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import useUsers from "../hooks/useUsers";
import signUpSchema from "../models/joi-schema/signUpSchema";
import UserForm from "../components/UserForm";
import initialSignUpForm from "../helpers/initial-forms/initialSignUpForm";
import PageHeader from "../../components/PageHeader";
import {useNavigate} from 'react-router-dom';
import {useSnack} from '../../providers/SnackbarProvider';

const UsersPageToLimitCalls = () => { 

const {setSnack} = useSnack ();
  const { user } = useUser();
  const { handleGetUsers, users } = useUsers();
  const { handleIsBusinessUser, handleDeleteUser, handleAcceptedVotes, handleIsAdminUser, handleAcceptedCalls } = useUsers(); 
  const[render, setRender] = useState("null"); 
  const { id } = useParams();
  const navigate = useNavigate ();

  const [age, setAge] = React.useState('');
  const [disBtn, setDisBtn] = React.useState(true);
  const [callsLimit, setCallsLimit] = React.useState();
  const [userId, setuserId] = React.useState();
  // const [userEmial, setUserEmial] = React.useState();

  const handleChange = (acceptedVotes, user_id, userEmail) => {
    // setAcceptedVotes(acceptedVotes)
    // setuserId(user_id)
    // setDisBtn(false)
  };

  const changeCallsLimit = () => {
        handleAcceptedCalls(callsLimit.userId, callsLimit.calls)
  };

 const handleUserToManager = (userID, isUserAdmin) => {
       handleIsAdminUser(userID, isUserAdmin)
 }

 const DeleteUser = (userID) => { 
    // handleDeleteUser(userID)
    // localStorage.setItem("IsDeleted", "YES");
    // window.location.reload(false);
 }

  useEffect(() => {
    handleGetUsers()
  }, []);
  
  if (users) {
    return (
<Container>
<PageHeader
        title="Users To Limit Calls Page"
        subtitle="On this page you can limit the user call per day"
      />
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name:</TableCell>
              <TableCell align="left">Last Name:</TableCell>
              <TableCell align="left">Email:</TableCell>
              <TableCell align="left">Accepted Call (Now):</TableCell>
              <TableCell align="left">Calls Limit (per 24h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(
                (user) => (
              <TableRow
                hover={true}
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{user.name.first}</TableCell>
                <TableCell align="left">{user.name.last}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                {!user.isUserSourceAdmin && (
                <TableCell align="left">{user.acceptedCallPerDay}</TableCell>
                )}
                {user.isUserSourceAdmin && (
                <TableCell align="left">Limitless</TableCell>
                )}
                {/* <TableCell align="left">{user.address.zip}</TableCell> */}
                {!user.isUserSourceAdmin && (

                <TableCell align="left">    <div>
<FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Change Calls Limit</FormLabel>
      <Box
      onChange={ (ev) => {
        setCallsLimit({
          userId: user._id,
          calls: ev.target.value
        })
      }
      }
      >
        <TextField id="filled-basic" label="Filled" variant="filled"/>
        <Button color="success" variant="contained" onClick={changeCallsLimit}>Save changes</Button>
      </Box>
</FormControl>
    </div></TableCell>
    )}
                <TableCell  align="left" variant="head">
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
</Container>
      );
};
}

export default UsersPageToLimitCalls;


