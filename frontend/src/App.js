import React, { useEffect, useState } from "react";
import './App.css';
import RoutesFunc from "./routes-nav/Routes";
import { Nav } from "react-bootstrap";
import MovieDatabaseApi from "./api/MovieDatabaseApi";
import UserDatabaseApi from "./api/UserDatabaseApi";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import Navigation from "./routes-nav/Navigation";
import useLocalStorage from "./hooks/useLocalStorage";

export const TOKEN_STORAGE_ID = "mmj-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  // const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo(){
    async function getCurrentUser(){
      if (token){
        try {
          let { username } = jwt.decode(token);
          MovieDatabaseApi.token = token;
          console.log(username);
          let currentUser = await UserDatabaseApi.getCurrentUser(username);
          console.log(currentUser);
          setCurrentUser(currentUser);
          // setApplicationIds(new Set(currentUser.applicationse));
        } catch (err){
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  // Handles site-wide logout
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  /**Handles site-wide signup.
   * 
   * Automatically logs them in (set token) upon signup.
   * 
   */
  async function signup(signupData){
    console.log("app.js signup")
    try {
      let token = await UserDatabaseApi.signup(signupData);
      setToken(token);
      return { success: true };

    } catch(errors){
      console.log("signup failed", errors);
      return { success: false, errors };
    }
  }

// Handles site-wide login
async function login(loginData){
  console.log('trying to log in...')
  try {
    let token = await UserDatabaseApi.login(loginData);
    console.log("app.js login function: ", token)
    setToken(token);
    return { success: true };
  } catch (errors){
    console.error("login failed", errors);
    return { success: false, errors };
  }
}  


  return (
    <UserContext.Provider>
      <div className="App">
        <Navigation logout={logout}/>
        <RoutesFunc login={login} signup={signup}/>
      </div>
    </UserContext.Provider>
    
  );
}

export default App;
