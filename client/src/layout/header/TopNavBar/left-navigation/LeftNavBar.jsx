import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import NavItem from "../../../../routes/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const LeftNavBar = () => {
  const { user } = useUser();
  return ( 
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
      <EmojiEventsIcon></EmojiEventsIcon>
      <NavItem label="WINNERS" to={ROUTES.GENERAL_RATES_PAGE} />  
        {user && user.isBusiness && (
          <NavItem label="My RATES" to={ROUTES.RATE_MOVIES} />
        )}
        {user && user.isAdmin && (
          <NavItem label="User Page" to={ROUTES.USERS_PAGE} />
        )}
        {user && (
          <NavItem label="About" to={ROUTES.ABOUT} />
        )}
        {/* <NavItem label="Sandbox" to={ROUTES.SANDBOX} /> */}
      </Box>
    </Box>
  );
};

export default LeftNavBar;


