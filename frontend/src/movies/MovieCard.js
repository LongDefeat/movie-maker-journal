import React from "react";
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/card';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {GiPopcorn} from "react-icons/gi";
import {HiEye} from "react-icons/hi";
import {GiMagnifyingGlass} from "react-icons/gi";
import "./MovieCard.css";

/** Show limited info about a movie
 * 
 * Is rendered by MovieCardList to display a "card" for each movie.
 * 
 * Receives watched function prop from a parent, which is called on "Seen".
 * 
 * MovieCardList --> MovieCard
 */

function MovieCard({ id, title, poster, overview, voteAverage, releaseDate }) {

    let basePosterPath = `https://image.tmdb.org/t/p/w500`

    return (
        <>
                           
            <div className="MovieCard">
                <Card className="cards">
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Img variant="top" src={`${basePosterPath}${poster}`} />
                        <Card.Text>
                            <div>{overview}</div>
                            <div>Average User Rating: {voteAverage}</div>
                            <div>Released: {releaseDate}</div>
                        </Card.Text>
                        <Button variant="primary" className="mx-2 font-weight-bold text-uppercase float-right"><HiEye /> Seen</Button>
                        <Link to={`/movies/${id}`}><Button variant="info" className="mx-2 font-weight-bold text-uppercase float-right"><GiMagnifyingGlass /> Details</Button></Link>
                        <Button variant="warning" className="mx-2 font-weight-bold text-uppercase float-right"><GiPopcorn size={20}/>Like</Button>                                    
                    </Card.Body>
                </Card>
            </div>
               
           
        </>
    )
}


export default MovieCard;