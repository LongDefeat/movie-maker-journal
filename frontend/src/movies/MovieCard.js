import React, { useContext, useState } from "react";
import "./MovieCard.css"
import UserContext from "../auth/UserContext";

/** Show limited info about a movie
 * 
 * Is rendered by MovieCardList to display a "card" for each movie.
 * 
 * Receives watched function prop from a parent, which is called on "Seen".
 * 
 * MovieCardList --> MovieCard
 */

function MovieCard({ title, poster, overview, voteAverage, releaseDate }) {

    return (
        <div className="MovieCard card">
            <div className="card-body">
                <h3>{title}</h3>
                <img src={poster}></img>
                <p>{overview}</p>
                <p>{voteAverage}</p>
                <p>{releaseDate}</p>
                <button className="btn btn-danger font-weight-bold text-uppercase float-right">Seen</button>
            </div>
        </div>
    )
}


export default MovieCard;