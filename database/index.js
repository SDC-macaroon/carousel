const mongoose = require('mongoose');
const styleDatabase = 'mongodb://localhost/morestyles';

mongoose.connect(styleDatabase);

var proper = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error'));
db.once('open', function() {
  console.log(`Mongoose connected`);
});

module.exports = db;