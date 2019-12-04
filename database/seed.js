const axios = require('axios');
const Style = require('./Style.js');
const keys = require('../keys.js');

let sampleStyles = [{
  productId: 2001,
  photo_url: 'https://source.unsplash.com/1600x900/?error',
  name: 'This record should be overwritten by buildSampleStyles()',
  price: 0,
  related: [2001],
}];

// Array of animals to be used as Unsplash search queries
const animalArray = ['Cat', 'Fox', 'Hedgehog', 'Hippo', 'Lemur', 'Manatee', 'Orangutan', 'Otter', 'Panda', 'Rabbit', 'Raccoon', 'Sloth', 'Squirrel', 'Walrus', 'Warthog'];

// Shuffle animalArray
const shuffleAnimalArray = () => {
  for (let i = animalArray.length - 1; i > 0; i--) {
    const hold = animalArray[i];
    const randomIndex = Math.floor(Math.random() * (i + 1));
    animalArray[i] = animalArray[randomIndex];
    animalArray[randomIndex] = hold;
  }
}
shuffleAnimalArray();

// Final array of arrays, each array of which will contain fifteen image urls
const allAnimalUrls = [];



// This function generates a series of clusters, stopping when 100 records have been generated. For each cluster, somewhere between 7 and 15 elements using the next random animal are generated, each with its own productId, photo_url, name, and price. When all elements in a cluster have been created, the productId of each of them are inserted into the 'related' property array of each other element. All styles within the cluster are then pushed to the sampleStyles array.
const buildSampleStyles = () => {
  sampleStyles = [];
  const basePrice = 14.95;
  const priceAddMax = 11;
  const baseQuantity = 7;
  const quantityAddMax = 8;

  let productId = 2001;
  let animalIndex = 0;

  while (productId < 2101) {
    const currentAnimal = animalArray[animalIndex];
    const clusterSize = baseQuantity + Math.floor(Math.random() * quantityAddMax);
    const clusterArray = [];
    for (let i = 0; i < clusterSize; i++) {
      const generatedPrice = basePrice + (Math.floor(Math.random() * priceAddMax));
      const styleTemplate = {
        productId,
        photo_url: allAnimalUrls[animalIndex][i],
        name: currentAnimal + ' T-Shirt',
        price: generatedPrice,
        related: [],
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

// This function inserts each generated style element from the sampleStyles array into the database.
// It utilizes upsert, allowing items to be replaced if/when a given productId already exists in the
//   database, and otherwise creating those items.
const upsertSampleStyles = () => {
  Style.upsert(sampleStyles);
};

// This function generates an array of arrays equal to the number of animals in animalArray, each
//   containing fifteen image urls of its coresponding animal as returned by API call to unsplash.
// It then calls buildSampleStyles(), which uses the gathered urls to build sample data, and
//   upsertSampleStyles() which inserts this sample data into the db.
const populateAllAnimalUrls = async () => {

  let currentAnimalUrls = [];    // Will contain fifteen image urls of the current animal
  let requestUrl = '';                  // String which will be set and used to perform an axios GET request to the unsplash API

  const getUrls = async () => {
    return axios({
      url: requestUrl,
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${keys.accessKey}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  };

  for (let i = 0; i < animalArray.length; i++) {
    requestUrl = 'https://api.unsplash.com/photos/random/?query=' + animalArray[i] + '&orientation=portrait&count=15';
    const response = await getUrls();
    for (let j = 0; j < response.length; j++) {
      currentAnimalUrls.push(response[j].urls.small);
    }
    // console.log('currentAnimalUrls: ', currentAnimalUrls);
    allAnimalUrls.push(currentAnimalUrls);
    currentAnimalUrls = [];
  }
  // console.log('allAnimalUrls: ', allAnimalUrls);

  buildSampleStyles();
  upsertSampleStyles();
};

populateAllAnimalUrls();
