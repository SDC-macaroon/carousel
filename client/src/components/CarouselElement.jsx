import React from 'react';

const CarouselElement = ({ key, style }) => (
  <li className="carousel-container">
    <a href={`/product/${style.productId}`}>
      <img className="carousel-list-item" src={style.photo_url} alt="Animal T-Shirt" />
    </a>
    <div className="style-name">{style.name}</div>
    <div className="style-price">${style.price}</div>
  </li>
);

export default CarouselElement;
