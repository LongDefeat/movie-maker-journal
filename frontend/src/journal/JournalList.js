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
        {journalEntries.map(e => {
            return (<p>{e.comment}</p>)
        })}
        </>
    )
}

export default JournalList;