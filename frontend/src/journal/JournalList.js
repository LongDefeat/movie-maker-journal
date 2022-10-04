import React, {useState, useEffect, useContext} from "react";
import UserContext from "../auth/UserContext";
import UserDatabaseApi from "../api/UserDatabaseApi";


function JournalList(){
    const [journalEntries, setJournalEntries] = useState(null);
    const {currentUser} = useContext(UserContext);
    console.log(currentUser);

    // useEffect(function getJournalEntries(){
    //     async function fetchJournalEntries(){
    //         setJournalEntries(await UserDatabaseApi.getEntries(id))};

    //     fetchJournalEntries();

    // }, [id]);

    // console.log(journalEntries);
    return (
        <h1>Journal Entries</h1>
    )
}

export default JournalList;