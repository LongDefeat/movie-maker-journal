import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import JournalForm from "../journal/JournalForm";
import DeleteIcon from '@mui/material/Button';
import UserContext from "../auth/UserContext";
import { FaPencilAlt } from "react-icons/fa";
import "./MovieDetails.css";
import LoadingSpinner from "../common/LoadingSpinner";



function MovieDetail(){
    const {id} = useParams();
    const {currentUser} = useContext(UserContext);
    
    const [movie, setMovie] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    let basePosterPath = `https://image.tmdb.org/t/p/w500`;

    let providerPath = `https://api.themoviedb.org/3/movie`;

    const API_KEY = `9a114ae809d1fc32f0105fcd87afe983`;



    useEffect(function getMovieDetailsForUser(){
      async function getMovie(){
        setMovie(await MovieDatabaseApi.getMovie(id));
      }
        getMovie();
    }, [id]);

    if (!movie) return <LoadingSpinner />;

    const {release_date, original_title, overview, revenue, vote_average, runtime, poster_path} = movie.details;

    const year = new Date(release_date).toLocaleDateString("en-US", {
      year: "numeric"
    });

    const date = new Date(release_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    console.log(movie.cast);

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {original_title} 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <JournalForm movieTitle={original_title} movieId={movie.details.id} userId={currentUser.id} closeModal={props.onHide}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    function displayMovieDetails(){
        return (
            <>
            <Container className="movie-details-container py-5">
                <Row className="align-items-center">
                    <Col md={4}>
                        <img  className="img-fluid" src={`${basePosterPath}${poster_path}`} />
                    </Col> 
                    
                    <Col md={8}>
                        <h1 className="movie-title">{movie.original_title} ({year})</h1>
                        <p><span style={{border: '1px solid white', padding:'5px', borderRadius:'10px'}}> PG-13</span> • {date} • {runtime} minutes</p>
                        <p>Overview: {overview}</p>
                        <p>Worldwide Revenue: ${revenue}</p>
                        <p>Average User Rating: {vote_average}/10</p>
                        <Button onClick={() => setModalShow(true)}variant="outline-primary" color="success" className="font-weight-bold">Log Movie <FaPencilAlt /></Button>
                    </Col>

                    {/* <Col sm={3} md={6} xl={4}>
                        <Card.Title className="movie-title">{movie.original_title}</Card.Title>
                        <img  className="img-fluid" src={`${basePosterPath}$/${movie.results.US.link}/watch/providers?api_key=${API_KEY}`} />
                    </Col>  */}

                    {/* <Col>
                      <Button variant="outline-danger" startIcon={<DeleteIcon />}>Delete</Button>
                    </Col> */}

                </Row> 
            </Container>
        
          <MyVerticallyCenteredModal 
            show={modalShow}
            onHide={() => setModalShow(false)} 
          />
            </>
        )
    }

    return (
        <>
            {movie && 
            displayMovieDetails()
            }
            <div>
                
            </div>
        </>
    );
};

export default MovieDetail;