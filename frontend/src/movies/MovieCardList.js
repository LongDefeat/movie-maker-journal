import React from "react";
import MovieCard from "./MovieCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
/** Display list of movies
 * 
 */

function MovieCardList ({movies}){
    console.debug("MovieCardList", "movies=", movies);

    return (
        <div className="Cards ">
            <Row className="g-4">
                {movies.results.map(movie => (
                    <Col xs={3} md={4}>
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            overview={movie.overview}
                            releaseDate={movie.release_date}
                            voteAverage={movie.vote_average}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default MovieCardList;