import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { UserProvider, useUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import useUsers from "./../hooks/useUsers";
import signUpSchema from "../models/joi-schema/signUpSchema";
import UserForm from "../components/UserForm";
import initialSignUpForm from "../helpers/initial-forms/initialSignUpForm";
import PageHeader from "../../components/PageHeader";
import {useNavigate} from 'react-router-dom';
import {useSnack} from '..//..//..//src//providers//SnackbarProvider';

const UsersPage = () => { 

const {setSnack} = useSnack ();
  const { user } = useUser();
  const { handleGetUsers, users } = useUsers();
  const { handleIsBusinessUser, handleDeleteUser, handleAcceptedVotes } = useUsers(); 
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

 const showUserVotedMovies = (userID, userEmail) => {
       localStorage.setItem("?userVoteForManager?", `${userID}`);
       localStorage.setItem("?userVoteForManagerEmail?", `${userEmail}`);
       navigate(`${ROUTES.USER_VOTES_FOR_MANAGER}/${userID}`) 
}

 const DeleteUser = (userID) => {
    handleDeleteUser(userID)
    localStorage.setItem("IsDeleted", "YES");
    window.location.reload(false);
}

  useEffect(() => {
    if(localStorage.getItem("managerChangeCallsAbilities?")) {
      localStorage.removeItem("managerChangeCallsAbilities?")
      setSnack ('success', `The accepted Calls is updated`);
      navigate(`${ROUTES.LIMIT_USER_CALLS}`) 
   }
    if(localStorage.getItem("IsManagerTouchAdmin")) {
      localStorage.removeItem("IsManagerTouchAdmin")
      setSnack ('success', 'User IsAdmin been updated');
      navigate(`${ROUTES.USERS_TO_ADMIN_PAGE}`)
   }
    if(localStorage.getItem("MANGAERDELETINGMOVIE")) {
       localStorage.removeItem("MANGAERDELETINGMOVIE")
       navigate(`${ROUTES.USER_VOTES_FOR_MANAGER}/${localStorage.getItem("deletingMovieByManagerCurrentUserId")}`)
    }
    if(localStorage.getItem("IsUpdated")) {
        setSnack ('success', 'User IsBusiness been updated');
        localStorage.removeItem("IsUpdated");
    }
    else if(localStorage.getItem("IsDeleted")) {
        setSnack ('success', 'User has been deleted');
        localStorage.removeItem("IsDeleted");
    }
    handleGetUsers()
  }, []);
  
  if (users) {
    return (
<Container>
<PageHeader
        title="Users Page"
        subtitle="On this page you can find all the users mr admin"
      />
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name:</TableCell>
              <TableCell align="left">Last Name:</TableCell>
              <TableCell align="left">Email:</TableCell>
              <TableCell align="left">Current accepted Votes:</TableCell>
              <TableCell align="left">Amount of accept votes:</TableCell>
              <TableCell align="left">User Voted Movies (Click To Show)</TableCell>
              <TableCell align="left">Delete</TableCell>
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
                <TableCell align="left">{user.acceptedVotes}</TableCell>
                <TableCell align="left">    <div>
<FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Change accepted rates</FormLabel>
      <RadioGroup
      onChange={ (ev) => 
      handleChange(ev.target.value, user._id)
      }
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="5" control={<Radio />} label="5" />
        <FormControlLabel value="10" control={<Radio />} label="10" />
        <FormControlLabel value="15" control={<Radio />} label="15" />
        <Button disabled={disBtn} color="success" variant="contained" onClick={sendAcceptedVoteChangeToDb}>Save changes</Button>
      </RadioGroup>
</FormControl>
    </div></TableCell>
                {/* <TableCell align="left">{user.address.zip}</TableCell> */}
                <TableCell align="left" variant="head">

                {!user.isAdmin && (
                <Button 
                variant="contained" 
                // href="#contained-buttons" 
                onClick={() => {
                    // setSnack ('success', 'User IsBusiness been updated');
                    showUserVotedMovies(user._id, user.email)}}
                >
                Show Movies
                </Button>
                )}
                </TableCell>
                <TableCell  align="left" variant="head">
                {!user.isAdmin && (
               <Button 
               onClick={() => {
                // setSnack ('success', 'User has been deleted');
                DeleteUser(user._id)}
            }
               variant="contained" 
               color="error">Delete
               </Button>
             )}
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

export default UsersPage;


