//  unsplash limits access to its api.  So pull rows out of mongo database
//    and repeatedly re-put them
const Style = require('./Style.js');  // mongoose
const pgPool = require('./indexPg.js');

//  pull all styles out of mongoose database
Style.getAll((err, styles) => {
  //  now repeatedly write them to postgres
  ;(async () => {
    const client = await pgPool.connect();
    try {
      let recNo = 1;
      while (recNo <= 100) {
      //  roll thru all products in array & put them in database with new product numbers
        for (let x = 0; x < styles.length; x++) {
          const styl = styles[x];
          const diff = styl.productId - recNo;
          styl.productId = recNo;
          const fixRelated = function (num, index, arr) { arr[index] = num -= diff; };
          styl.related.forEach(fixRelated);
          const text = 'INSERT INTO styles ("productId", photo_url, name, price, related) VALUES($1, $2, $3, $4, $5)';
          const values = [styl.productId, styl.photo_url, styl.name, styl.price, styl.related];
          try {
            const res = await client.query(text, values)
          } catch (err2) {
            console.log(err2.stack)
          }
          recNo++;
        }
        recNo++;
      }
    } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
      client.release();
    }
  })().catch(err3 => console.log(err3.stack))
});
