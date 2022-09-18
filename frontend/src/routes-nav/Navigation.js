import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <>
     
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MMJ</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Favorites</Nav.Link>
            <Nav.Link href="#pricing">Log In</Nav.Link>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default Navigation;