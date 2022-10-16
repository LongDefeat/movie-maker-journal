import React, {useContext} from "react";
import {Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import MovieList from "../movies/MovieList";
import PopularMovies from "./PopularMovies";
import "./Homepage.css";

/** Homepage for Movie Maker Journal
 * 
 * Displays welcome message to user and allows user to create
 * login and/or search for movies
 * 
 * Routed at /
 * 
 * Routes -> Homepage
 */

function Homepage(){
    const {currentUser} = useContext(UserContext);
    
    return (
        <Container className="py-5">
            <div className="Homepage">
                
                <div>
                    <h1>The Movie Maker Journal</h1>
                    <h3 >Millions of movies to discover... Explore!</h3>

                    {currentUser 
                    ? <h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    : (
                        null
                    )}
                </div>
                <div>
                    <MovieList />
                </div>
                <div>
                    <PopularMovies />
                </div>
            </div>
        </Container>
    )
}

export default Homepage;


{/* <Routes>
<Route className="btn btn-primary font-weight-bold mr-3" to="/login">
    Log In
</Route>

<Route className="btn btn-primary font-weight-bold mr-3" to="/signup">
    Sign Up
</Route>
</Routes> */}