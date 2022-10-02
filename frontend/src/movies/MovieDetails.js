import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import LoadingSpinner from "../common/LoadingSpinner";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DeleteIcon from '@mui/material/Button';

import "./MovieDetails.css";



function MovieDetail(){
    const {id} = useParams();
    
    const [movie, setMovie] = useState(null);

    let basePosterPath = `https://image.tmdb.org/t/p/w500`;


    useEffect(function getMovieDetailsForUser(){
        async function getMovie(){
            setMovie(await MovieDatabaseApi.getMovie(id));
        }
        getMovie();
    }, [id]);

    // if (!movie) return <LoadingSpinner />;


    console.log(movie);

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
          <Button variant="primary" color="success" className="mx-2 font-weight-bold text-uppercase float-right">Log Movie</Button>

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