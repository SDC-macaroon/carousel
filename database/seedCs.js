//  unsplash access limited to fifty per hour.  So pull 100 records out of mongo database
//    and repeatedly re-put them
const mongoose = require('mongoose');
const cassandra = require('cassandra-driver');

const morestyles = 'mongodb://localhost/morestyles';

mongoose.connect(morestyles, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error'));
db.once('open', () => {
  console.log('Mongoose connected');
});
const styleSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  photo_url: String,
  name: String,
  price: Number,
  related: Array,
});

const Style = mongoose.model('Style', styleSchema);
//  pull all styles out of mongoose database
Style.find({}, (err, styles) => {
  if (err) {
    console.log('error: ', err);
  } else {
    mongoose.disconnect();
    console.log('mongoose disconnected');
    //  build cassandra db
    const csClient = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
    csClient.connect((err, result) => {
      if (err) {console.log('error occurred: ', err);
      } else {
        console.log('cassandra connected');
      }
    });
    let recNo = 1;
    while (recNo <= 10) { console.log(recNo);
      //  roll thru all products in array & put them in database with new product numbers
      for (let x = 0; x < styles.length; x++) {
        const styl = styles[x];
        //console.log("styl:", styl);
        const diff = styl.productId - recNo;
        styl.productId = recNo;
        const fixRelated = function (num, index, arr) { arr[index] = num -= diff; };
        styl.related.forEach(fixRelated);
        const query = 'INSERT INTO carousel_styles.styles ("id", "productId", photo_url, name, price, related) VALUES(now(), ?, ?, ?, ?, ?)';
        const params = [styl.productId, styl.photo_url, styl.name, styl.price, styl.related];
        csClient.execute(query, params, { prepare: true }, function (err) {
          if (err) {console.log(err)};
          //assert.ifError(err);
          //Inserted in the cluster
        });
      }
    }
    csClient.shutdown(()=>{console.log('cassandra connection ended'); });
  }
  Style.disconnect();
});

// Style.getAll((err, styles) => {
// //  now repeatedly write them to cassandra
// //  don't think the cassandra interface is async/await
//   const csClient = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
//   csClient.connect((err, result) => {
//     if (err) {console.log('error occurred: ', err);
//     } else {
//       console.log('cassandra connected');
//     }
//   });
//   let recNo = 1;
//   while (recNo <= 10) {
//     //  roll thru all products in array & put them in database with new product numbers
//     for (let x = 0; x < styles.length; x++) {
//       const styl = styles[x];
//       //console.log("styl:", styl);
//       const diff = styl.productId - recNo;
//       styl.productId = recNo;
//       const fixRelated = function (num, index, arr) { arr[index] = num -= diff; };
//       styl.related.forEach(fixRelated);
//       const query = 'INSERT INTO carousel_styles.styles ("id", "productId", photo_url, name, price, related) VALUES(now(), ?, ?, ?, ?, ?)';
//       const params = [styl.productId, styl.photo_url, styl.name, styl.price, styl.related];
//       csClient.execute(query, params, { prepare: true }, function (err) {
//         if (err) {console.log(err)};
//         //assert.ifError(err);
//         //Inserted in the cluster
//       });
//     }
//   }
// });
