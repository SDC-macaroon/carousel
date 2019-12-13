import React from 'react';
import PropTypes from 'prop-types';
import CarouselElement from './CarouselElement';
import '../style.css';

const Carousel = ({
  slider, styles, nextThree, previousThree,
}) => (
  <div className="outerBox">
    <div className="carousel">
      <ul className="carouselList carouselTransform" style={slider}>
        {styles.map((style) => (<CarouselElement key={style.productId} style={style} />))}
      </ul>
      <button id="backButton" type="button" onClick={previousThree}>&lt;</button>
      <button id="nextButton" type="button" onClick={nextThree}>&gt;</button>
    </div>
  </div>
);

Carousel.propTypes = {
  slider: PropTypes.shape({
    transform: PropTypes.string.isRequired,
  }).isRequired,
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo_url: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      related: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  nextThree: PropTypes.func.isRequired,
  previousThree: PropTypes.func.isRequired,
};

export default Carousel;
