const db  = require('./index.js');
const Style = require('./Style.js');
const axios = require('axios');
const keys = require('../keys.js');

var sampleStyles = [{
  productId: 2001,
  photo_url: 'https://source.unsplash.com/1600x900/?error',
  name: 'This record should be overwritten by buildSampleStyles()',
  price: 0,
  related: [2001]
}];

// Array of animals to be used as Unsplash search queries
var animalArray = ['Cat', 'Fox', 'Hedgehog', 'Hippo', 'Lemur', 'Manatee', 'Orangutan', 'Otter', 'Panda', 'Rabbit', 'Racoon', 'Sloth', 'Squirrel', 'Walrus', 'Warthog'];

// Shuffle animalArray
const shuffleAnimalArray = function() {
  for (let i = animalArray.length-1; i > 0; i--) {
    var hold = animalArray[i];
    var randomIndex = Math.floor(Math.random()*i);
    animalArray[i] = animalArray[randomIndex];
    animalArray[randomIndex] = hold;
  }
}
shuffleAnimalArray();

// Final array of arrays, each array of which will contain fifteen image urls
var allAnimalUrls = [];

// This function generates an array of arrays equal to the number of animals in animalArray, each containing fifteen image urls of its coresponding animal as returned by API call to unsplash.
// It then calls buildSampleStyles(), which uses the gathered urls to build sample data, and upsertSampleStyles() which inserts this sample data into the db.
const populateAllAnimalUrls = async () => {

  var currentAnimalUrls = [];    // Current array, which will contain fifteen image urls of the current animal
  var url = '';                  // String which will be set and used to perform an axios GET request to the unsplash API

  const getUrls = async () => {
    return axios({
      url: url,
      method: 'GET',
      headers: {
        Authorization: 'Client-ID ' + keys.accessKey
      }
    })
    .then(res => res.data)
    .catch (error => {
      console.log(error)
    })
  }

  for (let i = 0; i < animalArray.length; i++) {
  // for (let i = 0; i < 1; i++) {                                                                       // limit number of API calls to 1 for testing purposes
    url = 'https://api.unsplash.com/photos/random/?query=' + animalArray[i] + '&orientation=portrait&count=15';
    var response = await getUrls();
    for (let i = 0; i < response.length; i++) {
      currentAnimalUrls.push(response[i].urls.small)
    }
    // console.log('currentAnimalUrls: ', currentAnimalUrls);
    allAnimalUrls.push(currentAnimalUrls);
    currentAnimalUrls =[];
  }
  // console.log('allAnimalUrls: ', allAnimalUrls);

  buildSampleStyles();
  upsertSampleStyles();
}

// This function generates a series of clusters, stopping when 100 records have been generated. For each cluster, somewhere between 7 and 15 elements using the next random animal are generated, each with its own productId, photo_url, name, and price. When all elements in a cluster have been created, the productId of each of them are inserted into the 'related' property array of each other element. All styles within the cluster are then pushed to the sampleStyles array.
const buildSampleStyles = function() {
  sampleStyles = [];
  var basePrice = 14.95;
  var priceAddMax = 11;
  var baseQuantity = 7;
  var quantityAddMax = 8;

  var productId = 2001;
  var animalIndex = 0;

  while (productId < 2101) {
  // while (productId < 2002) {                                                            // limit number of cluster-generation loops to 1 for testing purposes
    var currentAnimal = animalArray[animalIndex];
    var clusterSize = baseQuantity + Math.floor(Math.random() * quantityAddMax);
    var clusterArray = [];
    for (let i = 0; i < clusterSize; i++) {
      var generatedPrice = basePrice + (Math.floor(Math.random() * priceAddMax));
      var styleTemplate = {
        productId: productId,
        photo_url: allAnimalUrls[animalIndex][i],
        name: currentAnimal + ' T-Shirt',
        price: generatedPrice,
        related: []
      };
      if (productId <= 2100) {
        clusterArray.push(styleTemplate);
        console.log('buildSampleStyles: ', styleTemplate);
      }
      productId++;
    }
    for (let i = 0; i < clusterArray.length; i++) {      // Push the productId of each element
      for (let j = 0; j < clusterArray.length; j++) {    // into the 'related' property array of
        if (i !== j) {                                   // each other element in its cluster
          clusterArray[i].related.push(clusterArray[j].productId);
        }
      }
      sampleStyles.push(clusterArray[i]);
      // console.log(clusterArray[i].name, clusterArray[i].productId);
    }
    animalIndex++;
  }
};

// This function inserts each generated style element from the sampleStyles array into the database. It utilizes upsert, allowing items to be replaced if/when a given productId already exists in the database, and otherwise creating those items.
const upsertSampleStyles = function() {
  Style.upsert(sampleStyles)
    .then(() => db.disconnect())
};

populateAllAnimalUrls();
