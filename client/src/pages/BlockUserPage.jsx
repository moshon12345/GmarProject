import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const BlockUserPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Sorry"
        subtitle="You reach the limit of Call for today"
      />
      <Container align="center">
      <img src="/assets/images/crying.jpg" alt="movie" width="30%" />
      </Container>
      <Typography align="center" variant="h4">You Blocked </Typography>
      <Typography align="center" variant="h5">Please Talk With The Manger </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">

        </Grid>
      </Grid>
    </Container>
  );
};

export default BlockUserPage;
