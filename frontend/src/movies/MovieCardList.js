import React from "react";
import MovieCard from "./MovieCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
/** Display list of movies
 * 
 */

function MovieCardList ({movies}){
    console.log("MovieCardList", "movies=", movies);

    return (
        <div className="Cards ">
            <Row>
               {movies.results.length ?  movies.results.map(movie => (
                    <Col xs={12} md={6} xl={4} key={movie.id}>
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
                )) : <p>Sorry, no results were found...</p>}
             
            </Row>
               
        </div>
    )
}

export default MovieCardList;