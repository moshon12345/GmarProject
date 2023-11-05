import { Button, Container, Divider, Typography } from "@mui/material";
import Background from "..//image.jpg";
import {string} from "prop-types";
import React from "react";
import { useUser } from "..//users//providers//UserProvider"; 
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import ROUTES from "../routes/routesModel";

const PageHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { user } = useUser()
  const styles = {
    paperContainer: {
        backgroundImage: `url(${Background})`,
    }
  }

const handle = () => {
      navigate(ROUTES.CONTROL_PANEL) 
}

  return (
    <>
      <Divider sx={{ my: 2 }} align="center" />
      {user&&user.isAdmin && (
    <Typography align="center">Hello Manager (Admin)</Typography>
                )}
      {user&&user.isAdmin && (
    <Container align="center"><Button color="inherit" variant="contained" onClick={handle}>Go to Manager Control panel</Button></Container>
                )}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <Typography variant="h6" component="h3" sx={{ textAlign: 'center' }}>
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
}

export default PageHeader;
