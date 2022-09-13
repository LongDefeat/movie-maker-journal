import React, { useEffect, useState } from "react";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import MovieCardList from "./MovieCardList";
import SearchForm from "../common/SearchForm";

/** Display page with list of movies.
 * 
 * On mount, loads movies from API.
 * 
 * Re-loads filtered movies on submit form
 * 
 * MovieList --> MovieCardList --> MovieCard
 * 
 */

function MovieList(){
    const [movies, setMovies] = useState(null);

    async function search(name){
        let movies = await MovieDatabaseApi.searchMovie(name);
        setMovies(movies);
    };


    return (
        <div className="MovieList col-md-8 offset-md-2">
           <SearchForm search={search}/>
           {movies
                ? <MovieCardList movies={movies}/>
                : <p className="lead">Sorry, no results found!</p>
           }
        </div>
    );

}

export default MovieList;


