import React from 'react';
import PropTypes from 'prop-types';
import '../style.css';

const CarouselElement = ({ style }) => (
  <li className="carouselContainer">
    <a href={`/product/${style.productId}`}>
      <img className="carouselListItem" src={style.photo_url} alt="Animal T-Shirt" />
    </a>
    <div className="styleName">{style.name}</div>
    <div className="stylePrice">
      {`$${style.price}`}
    </div>
  </li>
);

CarouselElement.propTypes = {
  style: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo_url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    related: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default CarouselElement;
