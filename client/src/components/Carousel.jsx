/* eslint-disable no-unused-vars */
import React from 'react';
import CarouselElement from './CarouselElement.jsx';

const Carousel = (props) => (
  <div className="carousel">
    <ul className="carousel-list" style={props.slider}>
    {props.styles.map((style, index) => (
        <CarouselElement key={index} style={style} />
    ))}
    </ul>
    <button type="button" onClick={props.previousThree} >Back</button>
    <button type="button" onClick={props.nextThree} >Next</button>
  </div>
);

export default Carousel;
