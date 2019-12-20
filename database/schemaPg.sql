CREATE DATABASE carouselStyles;

USE carouselStyles;

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  productId INTEGER NOT NULL,
  photo_url VARCHAR(250),
  name VARCHAR(100),
  price MONEY,
  related INTEGER[]
);

