import React from 'react';
import CarouselElement from './CarouselElement.jsx';

const Carousel = ({ slider, styles, nextThree, previousThree }) => (
  <div className="carousel">
    <ul className="carousel-list" style={slider}>
    {styles.map((style, index) => (
      <CarouselElement key={index} style={style} />
    ))}
    </ul>
    <button id="backButton" type="button" onClick={previousThree} >&lt;</button>
    <button id="nextButton" type="button" onClick={nextThree} >&gt;</button>
  </div>
);

export default Carousel;
