const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const styleSchema = new mongoose.Schema({
  productId: {type: Number, unique: true},
  photo_url: String,
  name: String,
  price: Number,
  related: Array
});

const Style = mongoose.model('Style', styleSchema);

let upsert = (styleArray, callback) => {
  // Style.deleteMany(null, function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  // callback('record deleted');

  for (let i = 0; i < styleArray.length; i++) {
    Style.upsert({productId: styleArray[i].productId}, styleArray[i], {upsert: true}, function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'upsert successful');
      }
    });
  }
};

exports.upsert = upsert;
