//  create csv files for loading into Cassandra
const fs = require('fs');
const Style = require('./Style.js'); // mongoose model

const generate = (path, startNo) => {
  const csv = fs.createWriteStream(path);
  csv.write('ProductId|Photo URL|Name|Price|Related\n');
  let recNo = 0;  // need to use later at this level

  //  pull all styles out of mongoose database
  Style.getAll((err, styles) => {
    //  now repeatedly write them to csv
    recNo = startNo;
    let endNo = startNo + 1000000 - 1;
    while (recNo <= endNo) {
    //  roll thru all products in array & put them in database with new product numbers
      for (let x = 0; x < styles.length; x++) {
        const styl = styles[x];
        const diff = styl.productId - recNo;
        styl.productId = recNo;
        //  convert the product numbers in 'related' array
        const fixRelated = function (num, index, arr) { arr[index] = num -= diff; };
        styl.related.forEach(fixRelated);

        const row = `${styl.productId}|${styl.photo_url}|${styl.name}|${styl.price}|{${styl.related}}\n`;
        csv.write(row);

        recNo++;
        if (recNo > endNo) { //  this is a subloop
          recNo--;
          break;
        }
      }
    }
    console.log(`Last item written: record number ${recNo}`);
  });
};

generate('./data1.csv', 1);
generate('./data2.csv', 1000001);
generate('./data3.csv', 2000001);
generate('./data4.csv', 3000001);
generate('./data5.csv', 4000001);
generate('./data6.csv', 5000001);
generate('./data7.csv', 6000001);
generate('./data8.csv', 7000001);
generate('./data9.csv', 8000001);
generate('./data10.csv', 9000001);
