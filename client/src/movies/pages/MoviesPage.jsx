import { Container, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import useMovies from "../hooks/useMovies";
import MovieBox from "../../movie/MovieBox";
import Box from '@mui/system/Box';
import styled from '@mui/system/styled';
import { useParams } from "react-router-dom";
import Background from "..//..//image.jpg";
import { useNavigate } from "react-router-dom"; 
import ROUTES from "../../routes/routesModel";
import { useUser } from "..//..//users//providers//UserProvider";  
 
const axios = require('axios');

const MoviesPage = () => {
  const { user } = useUser(); 
  const navigate = useNavigate();
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

const jsx = ` 
<Grid container spacing={${spacing}}> 
`;  

  // const { moviesManager, handleManagerRatedMovies } = useMovies();
  const { pending, error, movies, moviesManager,
  handleGetMovies, handleGetMoviesSearch, handleManagerRatedMovies, handleMyRatedMovies} = useMovies();
  const [query, setQuery]=useState('');
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [moviesToShow, setoviesToShow] = useState([]);


  const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(5),
    borderRadius: '4px',
    textAlign: 'center',
    gridArea: 'auto'
  }));

  const styles = {
    paperContainer: {
        backgroundImage: `url(${Background})`
    }
};

const { id } = useParams();

  useEffect(() => {
    if(localStorage.getItem ("deletingMovie")) {   
       localStorage.removeItem("deletingMovie");
       localStorage.setItem("deletedMovie", "Yes")  
       navigate (ROUTES.RATE_MOVIES)
    }
    if (id) {
      handleGetMoviesSearch(id);
    } else {
      handleManagerRatedMovies(); 
      // handleMyRatedMovies(user._id);
      handleGetMovies();
    }
  }, [id]);

  // console.log(moviesManager)
if (movies) {  
    return (

<Container sx={{mt: "50px", mb: "200px"}}>

{(JSON.parse(localStorage.getItem("^finals!^_manager!^"))) && ( 
        <Container>
        <Divider sx={{ my: 2 }} align="center" />
        <Typography variant="h6" align="center">Our Management's Recommendation</Typography>
        <Grid sx={{ width: '100%', textAlign: 'center'}}>
              <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
        
              {(JSON.parse(localStorage.getItem("^finals!^_manager!^"))[0]).map((movieReq, i)=>
                    <Grid item  key={i} >
                    <Box key={i}>
                    {/* <Typography>{i.API_IMG}</Typography> */}
                    <img key={i} src={movieReq.API_IMG} width="100px" /> 
                    {/* <img className="card-img-top" key={i} src={movieReq.API_IMG} width="100px" />  */}
                    </Box>
                    </Grid>
                    )
                    }
              </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} align="center" />
        </Container>
        )}

<PageHeader
        title="Movies rating website"
        // title="Welcome to the movies rating website"
        subtitle="Search your favorite movie and rate it 10 Stars"
      />
      
<Grid sx={{ width: '100%', textAlign: 'center'}}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
      {movies.map((movieReq, i)=>
            <Grid item  key={i} >
            <Box key={i}><MovieBox key={movieReq.id} {...movieReq}/></Box>
            </Grid>
            )
            }
      </Grid>
</Grid>
</Container>
  );
}
return (
  <Container sx={{mt: "50px", mb: "200px"}}>
  <PageHeader
          title="Welcome to the movies rating website"
          subtitle="We have a little problem here...Try us later"
        />
  </Container>
    );
};

export default MoviesPage;
