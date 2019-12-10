/* eslint-disable no-unused-vars */
import React from 'react';

const Carousel = (props) => (
  <div className="carousel">
    <img src={props.styles[props.baseIndex].photo_url}></img>
    <button type="button" onClick={props.previousThree} >Back</button>
    <button type="button" onClick={props.nextThree} >Next</button>
  </div>
);

export default Carousel;
