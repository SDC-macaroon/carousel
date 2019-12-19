const express = require('express');
const path = require('path');
const db = require('../database/Style.js');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use('/product/:productId', express.static(path.join(__dirname, '..', 'client', 'public')));

app.get('/api/morestyles/:productId', (req, res) => {
  db.allRelated(req.params.productId, (err, data) => {
    if (err) {
      res.end('a problem occured with the request');
      console.log(`attempt to retrieve all products related to productId: ${req.params.productId} ended in error: ${err}`);
    } else {
      res.json(data);
      res.end();
    }
  });
});

app.post('/api/style', (req, res) => {
  var style = req.body;
  db.addStyle(style, (err, data) => {
    if (err) {
      console.log('posting error', style);
      res.end('a problem occured with the request');
    } else {
      res.end('New style added');
    }
  });
});

app.put('/api/style', (req, res) => {
  var style = req.body;
  db.updateStyle(style, (err, data) => {
    if (err) {
      console.log('posting error', style);
      res.end('a problem occured with the update request');
    } else {
      res.end('Style updated');
    }
  });
});

app.delete('/api/style', (req, res) => {
  //  Could deletion be done using a parameter?  What?
  var style = req.body;
  db.deleteStyle(style, (err, data) => {
    if (err) {
      console.log('deletion error', style);
      res.end('a problem occured with the deletion request');
    } else {
      res.end('Style deleted');
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
