import { Modal, show} from 'react-bootstrap';
import Background from "..//image.jpg";
import { useNavigate } from "react-router-dom";
import React, {useState} from 'react';
import { Button, Container } from '@mui/material';
import ROUTES from '../routes/routesModel';
const API_IMG="https://image.tmdb.org/t/p/w500/";

const MovieBox =({title, poster_path, vote_average, release_date, overview, original_language})=>{
    const styles = {
        paperContainer: {
            backgroundImage: `url(${Background})`,
            // backgroundColor: "gray"
        }
    };
    const navigate = useNavigate();
    
    const [show, setShow] = useState(false);

    const handleShow = () => {
        localStorage.removeItem("comeFromRatePage");
        localStorage.removeItem("release_date")
        localStorage.removeItem("overview")
        localStorage.removeItem("API_IMG")
        localStorage.removeItem("poster_path")
        localStorage.removeItem("title")
        localStorage.removeItem("original_language")
        localStorage.removeItem("vote_average")
        // לנקות ספציפית את מה שצריך ולא את כל הלוקאלהוסט כי זה גורם לשגיאות של דברים אחרים
        localStorage.setItem("release_date", `${release_date}`)
        localStorage.setItem("overview", `${overview}`)
        localStorage.setItem("API_IMG", `${API_IMG}`)
        localStorage.setItem("poster_path", `${poster_path}`)
        localStorage.setItem("title", `${title}`)
        localStorage.setItem("original_language", `${original_language}`)
        localStorage.setItem("vote_average", `${vote_average}`)

        navigate(`${ROUTES.MOVIE_INFO}/${release_date+overview}`)
    }

    const handleClose=()=>setShow(false);
    
    return(
        <Container>
        <div>
        <div className="card text-center bg-secondary mb-3">
            <div className="card-body">
              <img className="card-img-top" src={API_IMG+poster_path} width="180px" />
              <div className="card-body">
                  <Button type="button" className="btn btn-dark" onClick={handleShow} >View More and RATE</Button>
              </div>
            </div>
        </div>
        </div>
        </Container>
    )
}

export default MovieBox;