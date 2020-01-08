let idHolder = 20000000;

const getRandomId = (context, events, done) => {
  const productId = Math.floor(Math.random() * 1000000 + 9000000);
  context.vars.productId = productId;
  return done();
};

const getNextId = (context, events, done) => {
  idHolder++;
  context.vars.productId = idHolder;
  return done();
};

module.exports = { getRandomId, getNextId };