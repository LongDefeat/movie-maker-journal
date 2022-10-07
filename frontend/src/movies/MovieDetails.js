import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import JournalForm from "../journal/JournalForm";
import DeleteIcon from '@mui/material/Button';
import UserContext from "../auth/UserContext";

import "./MovieDetails.css";


function MovieDetail(){
    const {id} = useParams();
    const {currentUser} = useContext(UserContext);
    
    const [movie, setMovie] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    let basePosterPath = `https://image.tmdb.org/t/p/w500`;


    useEffect(function getMovieDetailsForUser(){
        async function getMovie(){
            setMovie(await MovieDatabaseApi.getMovie(id));
        }
        getMovie();
    }, [id]);

    // if (!movie) return <LoadingSpinner />;


    console.log(movie);

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
              <JournalForm movieId={movie.id} userId={currentUser.id} closeModal={props.onHide}/>
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
            <Container className="movie-details-container">
                <Row>
                    <Col sm={4}>
                        <Card.Title className="movie-title">{movie.original_title}</Card.Title>
                        <Card.Img  className="poster" src={`${basePosterPath}${movie.poster_path}`} />
                    </Col> 
                    
                    <Col sm={4}>
                        <p>Overview: {movie.overview}</p>
                        <Row><p>Runtime: {movie.runtime} minutes</p></Row>
                        <Row><p>Released: {movie.release_date}</p></Row>
                    </Col>
                    <Col sm={4}>
                        <Row><p>Worldwide Revenue: ${movie.revenue}</p></Row>
                        <Row><p>Average User Rating: {movie.vote_average}/10</p></Row>
                        <Row><p>Cast: {movie.cast}</p></Row>

                    </Col>
                    
                </Row> 
            </Container>
          <Button onClick={() => setModalShow(true)}variant="primary" color="success" className="mx-2 font-weight-bold  float-right">Log Movie</Button>
        
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
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete</Button>
            </div>
        </>
    );
};

export default MovieDetail;