require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const db = require('../database/Style.js');
const db = require('../database/StylePg.js');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use('/product/:productId', express.static(path.join(__dirname, '..', 'client', 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/api/getstyle/:productId', (req, res) => {
  db.getStyle(req.params.productId, (err, data) => {
    if (err) {
      res.end('a problem occured with the request');
      console.log(`attempt to retrieve productId: ${req.params.productId} ended in error: ${err}`);
    } else {
      res.json(data);
      res.end();
    }
  });
});

app.get('/api/getAll', (req, res) => {
  db.getAll((err, data) => {
    if (err) {
      res.end('a problem occured with the request');
      console.log(`getAll ended in error: ${err}`);
    } else {
      res.json(data);
      res.end();
    }
  });
});

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
  const style = req.body;
  db.addStyle(style, (err, data) => {
    if (err) {
      console.log('posting error', err);
      res.end('a problem occured with the request');
    } else {
      res.end('New style added');
    }
  });
});

app.put('/api/style', (req, res) => {
  console.log(req.body);
  const style = req.body;
  db.updateStyle(style, (err, data) => {
    if (err) {
      console.log('update error', err);
      res.end('a problem occured with the update request');
    } else {
      res.end('Style updated');
    }
  });
});

app.delete('/api/style/:productId', (req, res) => {
  db.deleteStyle(req.params.productId, (err, data) => {
    if (err) {
      console.log('deletion error ', style);
      res.end('a problem occured with the deletion request');
    } else {
      res.end('Style deleted');
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
