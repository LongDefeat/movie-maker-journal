import React from "react";
import './App.css';
import SignupForm from "./auth/SignupForm";
import Homepage from "./homepage/Homepage";
// import ProfileForm from "./profiles/ProfileForm";
import RoutesFunc from "./routes-nav/Routes";
import Navigation from "./routes-nav/Navigation";


function App() {
  return (
    <div className="App">
      <Homepage />
      {/* <RoutesFunc /> */}

    </div>
  );
}

export default App;
