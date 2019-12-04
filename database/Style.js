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

let upsert = (styles) => {

  Style.bulkWrite(styles.map(style => ({
    updateOne: {
      filter: {productId: style.productId},
      update: style,
      upsert: true
    }
  })))
    .then((result) => db.close())
    .catch(err => console.log('error during upsert: ', err));
};

exports.upsert = upsert;
