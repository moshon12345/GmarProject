import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

const LogoIcon = () => {
  return (
    <IconButton
      sx={{ display: { xs: "inline-flex", md: "none" } }}
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu">
      <Avatar alt="Business movie icon" src="/assets/images/business-movie.png" />
    </IconButton>
  );
};

export default LogoIcon;