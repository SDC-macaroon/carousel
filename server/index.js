const express = require('express');
const db = require('../database/Style.js');

const app = express();
const port = 3001;

app.get('/morestyles/:productId', (req, res) => {
  db.allRelated(req.params.productId, (err, data) => {
    if (err) {
      res.end('a problem occured with the request');
      console.log('attempt to retrieve all products related to productId: ' + req.params.productId + ' ended in error: ' + err);
    } else {
      res.json(data);
      res.end();
    }
  });
});

app.listen(port, () => console.log(`MoreStyles listening on port ${port}`));
