const express = require('express')
const db = require('../database/Style.js');
const app = express()
const port = 3001

app.get('/morestyles/:productId', function(req, res) {
  db.allRelated(req.params.productId, function(err, data) {
    if (err) {
      res.end('a problem occured with the request');
      console.log('attempt to retrieve all products related to productId: ' + req.params.productId + ' ended in error: ' + err);
    } else {
      res.end(JSON.stringify(data));
    }
  });
})

app.listen(port, () => console.log(`MoreStyles listening on port ${port}`))