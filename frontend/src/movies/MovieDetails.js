import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import JournalForm from "../journal/JournalForm";
import DeleteIcon from '@mui/material/Button';
import UserContext from "../auth/UserContext";
import { FaPencilAlt } from "react-icons/fa";
import "./MovieDetails.css";



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

    // if (!movie) return <LoadingSpinner />;


    console.log(movie);
    // const date = new Date(movie.release_date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});


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
                {movie.original_title} 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <JournalForm movieTitle={movie.original_title} movieId={movie.id} userId={currentUser.id} closeModal={props.onHide}/>
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
                <Row>
                    <Col sm={3} md={6} xl={4}>
                        <Card.Title className="movie-title">{movie.original_title}</Card.Title>
                        <img  className="img-fluid" src={`${basePosterPath}${movie.poster_path}`} />
                    </Col> 
                    
                    <Col sm={3} md={6} xl={4}>
                        <p>Overview: {movie.overview}</p>
                        <Row><p>Runtime: {movie.runtime} minutes</p></Row>
                        <Row><p>Released: {movie.release_date}</p></Row>
                        <Row><p>Rated {movie.certification}</p></Row>
                    </Col>

                    <Col sm={3} md={6} xl={4}>
                        <Row><p>Worldwide Revenue: ${movie.revenue}</p></Row>
                        <Row><p>Average User Rating: {movie.vote_average}/10</p></Row>
                        <Row><p>Cast: {movie.cast}</p></Row>
                    </Col>

                    <Col>
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