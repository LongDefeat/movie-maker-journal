import React, { useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/card";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { GiPopcorn } from "react-icons/gi";
import { HiEye } from "react-icons/hi";
import { GiMagnifyingGlass } from "react-icons/gi";
import "./MovieCard.css";
import UserDatabaseApi from "../api/UserDatabaseApi";

// const unavailableImage = require('./actors/unavailable.jpeg');


/** Show limited info about a movie
 *
 * Is rendered by MovieCardList to display a "card" for each movie.
 *
 * Receives watched function prop from a parent, which is called on "Seen".
 *
 * MovieCardList --> MovieCard
 */

const unavailableImage = require('./unavailablePoster.jpeg');


function MovieCard({ id, title, poster, overview, voteAverage, releaseDate }) {
  const currentUser = useContext(UserContext);

  let basePosterPath = `https://image.tmdb.org/t/p/w500`;
  let fullImagePath = `${basePosterPath}${poster}`;

  if(!poster){
    fullImagePath = unavailableImage;
  }


  async function addFavoriteMovie(user_id, movie_id) {
    await UserDatabaseApi.addFavorite(user_id, movie_id);
  }

  async function addSeenMovie(user_id, movie_id){
    await UserDatabaseApi.addSeen(user_id, movie_id);
  }

  const date = new Date(releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const rating = Math.floor((voteAverage / 10) * 100);

  return (
    <>
      <div>
        <Card className="text-dark mb-3">
          <Card.Img variant="top" src={`${fullImagePath}`} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <div>Avg Rating: {rating}%</div>
              <div>{date}</div>
            </Card.Text>
                <Row>
                  <Col className="col-auto">
                        <Button
                        variant="primary"
                        onClick={() => addSeenMovie(currentUser.currentUser.id, id)}
                        size="sm"
                        className="font-weight-bold text-uppercase">
                        <HiEye /> 
                        </Button>
                  </Col>
                  <Col className="col-auto">
                    <Link to={`/movies/${id}`}>
                        <Button
                        size="sm"
                        variant="info"
                        className="font-weight-bold text-uppercase"
                        >
                        <GiMagnifyingGlass /> 
                        </Button>
                    </Link>
                  </Col>

                  <Col className="col-auto">        
                    <Button
                        size="sm"
                        onClick={() => addFavoriteMovie(currentUser.currentUser.id, id)}
                        variant="warning"
                        className="font-weight-bold text-uppercase">
                        <GiPopcorn size={20} />   
                    </Button>
                  </Col>
                </Row>
              
          
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default MovieCard;
