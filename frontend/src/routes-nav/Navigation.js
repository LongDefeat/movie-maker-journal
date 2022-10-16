import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from "../auth/UserContext";
import "./Navigation.css";

function Navigation({ logout }) {

  const { currentUser } = useContext(UserContext);

  function loggedInNav(){
    return (
      <>
              <Nav.Link href="/journal-list">Journal</Nav.Link>
              <Nav.Link href="#">Favorites</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link className="logout" href="/" onClick={logout}>
                Logout
              </Nav.Link>
  
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
          
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
  
      </>
    );
  }
  
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand className="navbar-brand" href="/">
            MMJ
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
          </Nav>
        </Container>
      </Navbar>
    </> 
  )
}

export default Navigation;