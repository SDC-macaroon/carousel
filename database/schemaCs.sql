USE carouselStyles;

CREATE TABLE styles (
  id uuid,
  productId INT,
  photo_url TEXT,
  name TEXT,
  price DECIMAL,
  related LIST INT
);