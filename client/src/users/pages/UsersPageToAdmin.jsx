import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { UserProvider, useUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import useUsers from "../hooks/useUsers";
import signUpSchema from "../models/joi-schema/signUpSchema";
import UserForm from "../components/UserForm";
import initialSignUpForm from "../helpers/initial-forms/initialSignUpForm";
import PageHeader from "../../components/PageHeader";
import {useNavigate} from 'react-router-dom';
import {useSnack} from '../../providers/SnackbarProvider';

const UsersPageToAdmin = () => { 

const {setSnack} = useSnack ();
  const { user } = useUser();
  const { handleGetUsers, users } = useUsers();
  const { handleIsBusinessUser, handleDeleteUser, handleAcceptedVotes, handleIsAdminUser } = useUsers(); 
  const[render, setRender] = useState("null"); 
  const { id } = useParams();
  const navigate = useNavigate ();

  const [age, setAge] = React.useState('');
  const [disBtn, setDisBtn] = React.useState(true);
  const [acceptedVotes, setAcceptedVotes] = React.useState();
  const [userId, setuserId] = React.useState();
  // const [userEmial, setUserEmial] = React.useState();

  const handleChange = (acceptedVotes, user_id, userEmail) => {
    setAcceptedVotes(acceptedVotes)
    setuserId(user_id)
    setDisBtn(false)
  };

  const sendAcceptedVoteChangeToDb = () => {
    handleAcceptedVotes(acceptedVotes, userId)
    localStorage.setItem("?changeVotes?", "YES");
    navigate(ROUTES.GENERAL_RATES_PAGE) 
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
    // if(localStorage.getItem("MANGAERDELETINGMOVIE")) {
    //    localStorage.removeItem("MANGAERDELETINGMOVIE")
    //    navigate(`${ROUTES.USER_VOTES_FOR_MANAGER}/${localStorage.getItem("deletingMovieByManagerCurrentUserId")}`)
    // }
    // if(localStorage.getItem("IsUpdated")) {
    //     setSnack ('success', 'User IsBusiness been updated');
    //     localStorage.removeItem("IsUpdated");
    // }
    // else if(localStorage.getItem("IsDeleted")) {
    //     setSnack ('success', 'User has been deleted');
    //     localStorage.removeItem("IsDeleted");
    // }
    handleGetUsers()
  }, []);
  
  if (users) {
    return (
<Container>
<PageHeader
        title="Users To ADMINS Page"
        subtitle="On this page you can make every user to ADMIN"
      />
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name:</TableCell>
              <TableCell align="left">Last Name:</TableCell>
              <TableCell align="left">Email:</TableCell>
              <TableCell align="left">IsUserAdmin? (Click here to change)</TableCell>
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

                {/* <TableCell align="left">{user.address.zip}</TableCell> */}
                <TableCell align="left" variant="head">

                {!user.isAdmin && (
                <Button 
                variant="contained" 
                // href="#contained-buttons" 
                onClick={() => {
                    // setSnack ('success', 'User IsBusiness been updated');
                    handleUserToManager(user._id, user.isAdmin)}}
                >
                Make user ADMIN
                </Button>
                )}

{user.isAdmin && !user.isUserSourceAdmin && (
                <Button 
                variant="contained" 
                color="error"
                // href="#contained-buttons" 
                onClick={() => {
                    // setSnack ('success', 'User IsBusiness been updated');
                    handleUserToManager(user._id, user.isAdmin)}}
                >
                Make user NOT ADMIN
                </Button>
                )}

                </TableCell>
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

export default UsersPageToAdmin;


