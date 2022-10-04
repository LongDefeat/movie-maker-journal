import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from "../auth/UserContext";

function Navigation({ logout }) {

  const { currentUser } = useContext(UserContext);

  function loggedInNav(){
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/"> MMJ </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/journal-list">Journal</Nav.Link>
              <Nav.Link href="#">Favorites</Nav.Link>
              <Nav.Link href="#">Profile</Nav.Link>
              <Nav.Link className="logout" href="/" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
  
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/"> MMJ </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
  
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav.Link className="navbar-brand" href="/">
            MMJ
          </Nav.Link>
          {currentUser ? loggedInNav() : loggedOutNav()}
        </Container>
      </Navbar>
    </> 
  )
}

export default Navigation;