import React from "react";
import './App.css';
import SignupForm from "./auth/SignupForm";
import Homepage from "./homepage/Homepage";
// import ProfileForm from "./profiles/ProfileForm";
import RoutesFunc from "./routes-nav/Routes";
import Navigation from "./routes-nav/Navigation";
import { Nav } from "react-bootstrap";


function App() {
  return (
    <div className="App">
      <RoutesFunc />
    </div>
  );
}

export default App;
