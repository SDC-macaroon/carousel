const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const styleSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  photo_url: String,
  name: String,
  price: Number,
  related: Array,
});

const Style = mongoose.model('Style', styleSchema);

const allRelated = (id, callback) => {
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

const addStyle = (style, callback) => {
  newStyle = new Style(style);
  newStyle.save(function (err, booking) {
    callback(err, booking);
  });
};

const updateStyle = (style, callback) => {
  Style.findByIdAndUpdate(style._id, style, (err)=>{
    if (err) {
      callback(err, null);
    } else {
      callback(null, "Update was completed");
    }
  });
};

const deleteStyle = (style, callback) => {

  Style.deleteOne({ _id: style._id}, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, "Deletion was completed");
    }
  });
};

exports.upsert = upsert;
exports.allRelated = allRelated;
exports.addStyle = addStyle;
exports.updateStyle = updateStyle;
exports.deleteStyle = deleteStyle;