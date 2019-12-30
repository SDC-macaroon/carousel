USE carouselStyles;

CREATE TABLE IF NOT EXISTS carouselStyles.styles (
  id SERIAL PRIMARY KEY,
  productId INTEGER NOT NULL,
  photo_url VARCHAR(250),
  name VARCHAR(100),
  price NUMERIC(9,2),
  related INTEGER[]
);