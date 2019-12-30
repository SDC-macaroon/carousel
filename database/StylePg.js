//  Style model for PostgreSQL
//const mongoose = require('mongoose');
const pgPool = require('./indexPg.js');


const allRelated = (id, callback) => {
  //  get record actually requested
  //  do I need to checkout a new client here?  Think so.
  // async/await - check out a client
;(async () => {
  const client = await pgPool.connect()
  try {
    const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
    console.log(res.rows[0])
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
})().catch(err => console.log(err.stack))
  let queryString = `SELECT * FROM style WHERE productId=${id}`;

  return executeQuery(queryString, parsedOptions.values).then(results => results[0]);

  Style.find({ productId: id }, 'related', (err1, style) => {
    if (style.length === 0) {
      callback('error: productId not found', null);
      return;
    }
    if (err1) {
      callback(err1, null);
    } else {
      Style.find({ productId: { $in: style[0].related } }, 'productId photo_url name price', (err2, styles) => {
        if (err2) {
          callback(err2, null);
        } else {
          callback(null, styles);
        }
      });
    }
  });
};

const upsert = (styles) => {
  Style.bulkWrite(styles.map((style) => ({
    updateOne: {
      filter: { productId: style.productId },
      update: style,
      upsert: true,
    },
  })))
    .then(() => db.close())
    .catch((err) => console.log('error during upsert: ', err));
};

const addStyle = (style) => {
  // async/await - check out a client
;(async () => {
  const client = await pool.connect()
  try {
    const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
    console.log(res.rows[0])
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
})().catch(err => console.log(err.stack))
  var query = `INSERT INTO styles (${style.productId}, ${style.photo_url}, ${style.name}, ${style.price}, ${style.related}`;
  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
  });
};

const updateStyle = (style, callback) => {
  Style.findByIdAndUpdate(style._id, style, (err)=>{
    if (err) {
      callback(err, null);
    } else {
      callback(null, 'Update was completed');
    }
  });
};

const deleteStyle = (style, callback) => {

  Style.deleteOne({ _id: style._id}, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, 'Deletion was completed');
    }
  });
};

exports.upsert = upsert;
exports.allRelated = allRelated;
exports.addStyle = addStyle;
exports.updateStyle = updateStyle;
exports.deleteStyle = deleteStyle;