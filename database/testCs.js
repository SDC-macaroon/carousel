const cassandra = require('cassandra-driver');

const csClient = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
csClient.connect((err, result) => {
  if (err) {console.log('error occurred: ', err);
  } else {
    console.log('cassandra connected');
    const query = 'INSERT INTO carousel_styles.styles ("id", "productId", photo_url, name, price, related) VALUES(now(), ?, ?, ?, ?, ?)';
    for (recNo = 1; recNo <= 100000; recNo++) {
      const params = [recNo, 'my url', 'my style name', 10.52, [7, 12]];
      csClient.execute(query, params, { prepare: true }, function (err) {
        if (err)
          {console.log(err);
        } else {
          console.log(recNo + " written");
        };
        //assert.ifError(err);
        //Inserted in the cluster
      });
    }
    //csClient.shutdown(()=>{console.log('cassandra connection ended'); });

  }

});
