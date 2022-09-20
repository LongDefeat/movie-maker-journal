import React from "react";
import Card from 'react-bootstrap/card';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./MovieCard.css";

/** Show limited info about a movie
 * 
 * Is rendered by MovieCardList to display a "card" for each movie.
 * 
 * Receives watched function prop from a parent, which is called on "Seen".
 * 
 * MovieCardList --> MovieCard
 */

function MovieCard({ title, poster, overview, voteAverage, releaseDate }) {

    let basePosterPath = `https://image.tmdb.org/t/p/w500`

    return (
        
        <div className="MovieCard">
            <Row className="g-4">
                {Array.from ({length: 1}).map((_, idx) =>(
                    <Col xs={3} md={4}>
                      <Card style={{width: '18rem'}} className="cards">
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Img variant="top" src={`${basePosterPath}${poster}`} />
                                <Card.Text>
                                    <p>{overview}</p>
                                    <p>Average User Rating: {voteAverage}</p>
                                    <p>Released: {releaseDate}</p>
                                </Card.Text>
                                <Button variant="primary" className="font-weight-bold text-uppercase float-right">Seen</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
              
            </Row>
        </div>
        
    )
}


export default MovieCard;