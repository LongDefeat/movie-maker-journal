import React, { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import MovieCardList from "./MovieCardList";


export default function MovieRecommendations(props){
    const [movies, setMovies] = useState(null);

    useEffect(function getMovieRecommendationsOnMount(){
        async function getRecommendedMovies(){
            setMovies(await MovieDatabaseApi.getMovieRecommendations());
        }
        getRecommendedMovies();
    }, []);

    if (!movies) return <LoadingSpinner />;
    
    
    return (
        <>
            <h1 className="py-3">Recommendations</h1>
            <MovieCardList movies={movies.results} />
        </>
    )
}