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

let allRelated = (id, callback) => {
  Style.find({productId: id}, 'related', function(err, style) {
    if (style.length === 0) {
      callback(null, 'error: productId not found');
      return;
    }
    if (err) {
      callback(err, null);
    } else {
      Style.find({ productId: {$in: style[0].related} }, 'productId photo_url name price', function(err, styles) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, styles);
        }
      })
    }
  })
}

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
exports.allRelated = allRelated;
