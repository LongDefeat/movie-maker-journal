import React, {useState, useEffect} from "react";
import UserDatabaseApi from "../api/UserDatabaseApi";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";


function FavoriteList(){
    const [favorites, setFavorites] = useState(null);
    const currentUser = useContext(UserContext);

    // if(currentUser) {
    //     useEffect(function getJournalEntries(){
    //         async function fetchJournalEntries(){
    //             setJournalEntries(await UserDatabaseApi.getEntries(currentUser.id))};
    
    //         fetchJournalEntries();
    
    //     }, [currentUser.id]);
    // } 


    async function getFavorites(name){
        let favoriteMovies = await UserDatabaseApi.getFavorites(user_id);
        setFavorites(favoriteMovies);
    };
    
    if(!favorites) return <LoadingSpinner />

    return (
        <>
        <h1>Favorites List</h1>
        </>
    )
}

export default FavoriteList;