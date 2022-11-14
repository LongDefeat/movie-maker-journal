import React, { useContext, useEffect } from "react";
import Card from "react-bootstrap/card";
import Carousel from "react-bootstrap/carousel";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import "./ActorCard.css";

function ActorCard({name, character, picture}){

    let basePosterPath = `https://image.tmdb.org/t/p/w500`;
    console.log();
    return (
        <>
            <Container className="container-card py-3">
                <ListGroup>
                    <List.Item>
                        <img variant="top" className="actor-image" src={`${basePosterPath}${picture}`} />
                        <h4>{name}</h4>
                        <p>{character}</p>
                    </List.Item>
                </ListGroup>                                
            </Container>
        </>
    )
}

/**<Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item> */

export default ActorCard;