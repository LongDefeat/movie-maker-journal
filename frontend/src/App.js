import React from "react";
import './App.css';
import SignupForm from "./auth/SignupForm";
import Homepage from "./homepage/Homepage";
// import ProfileForm from "./profiles/ProfileForm";

function App() {
  return (
    <div className="App">
      <Homepage />
      <SignupForm />
    </div>
  );
}

export default App;
