import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid"; 
import { useParams } from "react-router-dom";
import useUsers from "../users/hooks/useUsers";
import { Box, TextField, Typography, Button } from "@mui/material";
import {useSnack} from '..//..//src//providers//SnackbarProvider'; 
import { Timer, useTimer, useStopwatch, StopWatch } from '@glamboyosa/react-stopwatch'
import '@glamboyosa/react-stopwatch/dist/index.css'
import FormForNewPassword from "../users/components/UserFormForNewPassword";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";


const NewPasswordPage = () => { 
  const navigate = useNavigate();
  const { start, stop, timerProps } = useStopwatch()
  const {setSnack} = useSnack ();
  const { id } = useParams();
  const [valuePassword, setValuePassword] = useState();
  const [valuePasswordAgain, setValuePasswordAgain] = useState(); 
  const [valueCodeFromMail, setValueCodeFromMail] = useState(); 
  const [checkTime, setCheckTime] = useState(); 
  const [isCodeRight, setIsCodeRight] = useState(false); 
  const [email, setEmail] = useState(false); 
  const { handleChangePassword, handleCheckCodeFromMail, users } = useUsers();

  const dataToCheck = () => {
    if (!valuePassword || !valuePasswordAgain) {
        setSnack ('error', "Something Wrong here, Please follow the instructions");
    }
    if (valuePassword) {
      let numberOfCharts = 0
      for (let chart of valuePassword) {
           numberOfCharts++
      }
      let pattern = /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/ 
          
      if ((numberOfCharts >= 9) && pattern.test(valuePassword) && (valuePassword == valuePasswordAgain)) {
           handleChangePassword(valuePassword, email)
      } else {
           setSnack ('error', "Something Wrong here, Please follow the instructions");
      }
    }
  }

  const codeFromMailToCheck = () => { 
        handleCheckCodeFromMail(valueCodeFromMail, email)
  }

  const checkTheTime = (ev) => {
        console.log(ev.timeStamp)
        // console.log(checkTime)
  }

  useEffect(() => {
    if (users == "we did it") {
        setSnack ('success', "Your password is updated successfully");
        navigate(ROUTES.LOGIN)
  }
    if (users == "the code is right") {
        setIsCodeRight(true)
    }
    if (users == "the code is not right") {
        setSnack ('error', "The code is WRONG!!");
    }
    if (users == "the time is over") {
        setSnack ('error', "Your 5 min OVER!!");
        navigate(ROUTES.LOGIN)
    }
    if (id) {
        // start() 
        setEmail(id)
    }
  }, [handleCheckCodeFromMail]);

  return (
    <Container maxWidth="lg" align="center"> 
      <PageHeader
        title="New password Page"
        subtitle="" 
      />

      {!isCodeRight && email && (
        
        <Container sx={{mb: "20px"}}>
        <Typography sx={{mb: "10px"}}>Please the code that you recieve from us on your email: {email}</Typography>
        <Typography>You have 5 min to be right...</Typography>
          <Box
            sx={{mt: "20px"}}
            onChange={ (ev) => {
            setValueCodeFromMail(ev.target.value)
            }}>
              <TextField align="center">Hello Manager (Admin)</TextField>
          </Box>
          <Container sx={{m: "auto"}}
          align="center">
          {/* <Box
          display="flex" 
          height={20} 
          alignItems="center"
          justifyContent="center"> 
          <StopWatch align="center" {...timerProps}/>
          </Box> */}
          </Container>

          <Button sx={{mt: "20px"}} onClick={codeFromMailToCheck} color="success" variant="contained">Click here after you wrote the code from you email</Button>
        </Container>
              )}

{isCodeRight && ( 
   <Container sx={{mb: "20px"}}>
<Typography variant="h6">Instructions:</Typography>
<Typography sx={{mb: "30px"}}>"Password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-'</Typography>
  <Container sx={{mb: "20px"}}>
  <Typography>Write your new password</Typography>
    <Box
      onChange={ (ev) => {
      setValuePassword(ev.target.value)
      }}>
        <TextField align="center">Hello Manager (Admin)</TextField>
    </Box>
  </Container>

  <Container sx={{mb: "20px"}}>
  <Typography>Write your new password again please</Typography>
    <Box
      onChange={ (ev) => {
      setValuePasswordAgain(ev.target.value)
      }}>
        <TextField align="center">Hello Manager (Admin)</TextField>
    </Box>
  </Container>

  <Button onClick={dataToCheck} color="success" variant="contained">CLICK HERE TO SAVE YOUR NEW PASSWORD</Button>
  </Container>
  )}

    </Container>
  );
};

export default NewPasswordPage;
