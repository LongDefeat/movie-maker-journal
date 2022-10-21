import React, {useState, useEffect, useContext} from "react";
import UserContext from "../auth/UserContext";
import UserDatabaseApi from "../api/UserDatabaseApi";
import LoadingSpinner from "../common/LoadingSpinner";


function JournalList(){
    const [journalEntries, setJournalEntries] = useState(null);
    const currentUser = useContext(UserContext);
    console.log("Journal List Page: ", currentUser);


    if(currentUser) {
        useEffect(function getJournalEntries(){
            async function fetchJournalEntries(){
                setJournalEntries(await UserDatabaseApi.getEntries(currentUser.id))};
    
            fetchJournalEntries();
    
        }, [currentUser.id]);
    } 
    // if (!journalEntries) return <LoadingSpinner />;

    console.log(journalEntries);
    return (
        <h1>Journal Entries</h1>
    )
}

export default JournalList;