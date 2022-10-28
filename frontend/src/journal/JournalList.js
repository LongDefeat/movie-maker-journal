import React, {useState, useEffect, useContext} from "react";
import UserContext from "../auth/UserContext";
import UserDatabaseApi from "../api/UserDatabaseApi";
import MovieDatabaseApi from "../api/MovieDatabaseApi";
import LoadingSpinner from "../common/LoadingSpinner";


function JournalList(){
    const [journalEntries, setJournalEntries] = useState(null);
    // const [movieData, setMovieData] = useState(null);
    const currentUser = useContext(UserContext);
    console.log("Journal List Page: ", currentUser);


    if(currentUser) {
        useEffect(function getJournalEntries(){
            async function fetchJournalEntries(){
                setJournalEntries(
                    await UserDatabaseApi.getEntries(currentUser.currentUser.id)
                    );};
    
            fetchJournalEntries();
    
        }, [currentUser.id]);
    } 
    if (!journalEntries) return <LoadingSpinner />;
    

    console.log(journalEntries);
    return (
        <>
        {journalEntries.map(entry => {
            const date = new Date(entry.created_at).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
            return (
                <>
                 <p>{date} - {entry.movie_title}: {entry.comment}</p>
                </>
            )
        })}
        </>
    )
}

export default JournalList;