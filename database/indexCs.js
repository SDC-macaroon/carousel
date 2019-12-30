//  this will create the connection when using Cassandra
const cassandra = require('cassandra-driver');

const csClient = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
csClient.connect((err, result) => {
  if (err) {console.log('error occurred: ', err);
  } else {
    console.log('cassandra connected');
  }
});

module.exports = csClient;