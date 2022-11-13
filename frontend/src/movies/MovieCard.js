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

/** Show limited info about a movie
 *
 * Is rendered by MovieCardList to display a "card" for each movie.
 *
 * Receives watched function prop from a parent, which is called on "Seen".
 *
 * MovieCardList --> MovieCard
 */

function MovieCard({ id, title, poster, overview, voteAverage, releaseDate }) {
  const currentUser = useContext(UserContext);

  let basePosterPath = `https://image.tmdb.org/t/p/w500`;

  async function addFavoriteMovie(user_id, movie_id) {
    await UserDatabaseApi.addFavorite(user_id, movie_id);
  }

  const date = new Date(releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div>
        <Card className="cards text-dark">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Img variant="top" src={`${basePosterPath}${poster}`} />
            <Card.Text>
              <div className="MovieCard-text">{overview}</div>
              <div>Average User Rating: {voteAverage}</div>
              <div>Released: {date}</div>
            </Card.Text>
            <Row>
                <Col className="px-0">
                        <Button
                        variant="primary"
                        size="sm"
                        className="font-weight-bold text-uppercase">
                        <HiEye /> Seen
                        </Button>
                </Col>
               <Col className="px-0">
                    <Link to={`/movies/${id}`}>
                        <Button
                        size="sm"
                        variant="info"
                        className="font-weight-bold text-uppercase"
                        >
                        <GiMagnifyingGlass /> Details
                        </Button>
                    </Link>
               </Col>
             
             <Col className="px-0">
                <Button
                    size="sm"
                    onClick={() => addFavoriteMovie(currentUser.currentUser.id, id)}
                    variant="warning"
                    className="font-weight-bold text-uppercase"
                >
                    <GiPopcorn size={20} />
                    Like
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
