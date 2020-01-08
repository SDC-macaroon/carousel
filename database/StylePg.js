//  Style model for PostgreSQL
const pgPool = require('./indexPg.js');

const getStyle = (productId, callback) => {
  pgPool.connect((err, client, done) => {
    if (err) throw err;
    client.query('SELECT * from styles where "productId"=$1', [productId], (err2, result) => {
      done();
      if (err2) {
        callback(err2.stack, null);
      } else {
        callback(null, result.rows[0]);
      }
    });
  });
};

const getAll = (callback) => {
  pgPool.connect((err, client, done) => {
    if (err) throw err;
    client.query('SELECT * from styles', (err2, result) => {
      done();
      if (err2) {
        callback(err2.stack, null);
      } else {
        callback(null, result.rows);
      }
    });
  });
};

const allRelated = (productId, callback) => {
  pgPool.connect((err, client, done) => {
    if (err) throw err;
    const qry = 'SELECT b.* FROM styles a JOIN styles b ON b."productId" = ANY(a.related) where a."productId"=$1';
    client.query(qry, [productId], (err2, result) => {
      done();
      if (err2) {
        callback(err2.stack, null);
      } else {
        callback(null, result.rows);
      }
    });
  });
};

const addStyle = (style, callback) => {
  pgPool.connect((err, client, done) => {
    if (err) throw err;
    const qry = 'INSERT INTO styles ("productId", photo_url, name, price, related) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [style.productId, style.photo_url, style.name, style.price, style.related];
    client.query(qry, values, (err2, result) => {
      done();
      if (err2) {
        callback(err2.stack, null);
      } else {
        callback(null, 'Style added');
      }
    });
  });
};

const updateStyle = (style, callback) => {
  pgPool.connect((err, client, done) => {
    if (err) throw err;
    const qry = 'UPDATE styles (photo_url, name, price, related) VALUES($2, $3, $4, $5) where "productId"=$1';
    const values = [style.productId, style.photo_url, style.name, style.price, style.related];
    client.query(qry, values, (err2, result) => {
      done();
      if (err2) {
        callback(err2.stack, null);
      } else {
        callback(null, 'Style updated');
      }
    });
  });
};

const deleteStyle = (productId, callback) => {
  pgPool.connect((err, client, done) => {
    if (err) throw err;
    const qry = 'DELETE FROM styles where "productId"= $1';
    client.query(qry, [productId], (err2, result) => {
      done();
      if (err2) {
        callback(err2.stack, null);
      } else {
        callback(null, 'Style deleted');
      }
    });
  });
};

exports.getStyle = getStyle;
exports.getAll = getAll;
exports.allRelated = allRelated;
exports.addStyle = addStyle;
exports.updateStyle = updateStyle;
exports.deleteStyle = deleteStyle;