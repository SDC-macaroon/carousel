/* eslint-disable no-unused-vars */
import React from 'react';

const CarouselElement = (props) => (
    <li className="carousel-list-item">
    <img src={props.style.photo_url}></img>
    <div>{props.style.name} ${props.style.price}</div>
    </li>
);

export default CarouselElement;
