//  create array of 100 products to put in database
const axios = require('axios');
const keys = require('../keys.js');

// Declared using one example style for clarity, example is overwritten by buildSampleStyles().
let sampleStyles = [
  {
    productId: 2001,
    photo_url: 'https://source.unsplash.com/1600x900/?error',
    name: 'This record should be overwritten by buildSampleStyles()',
    price: 0,
    related: [2002, 2003, 2004],
  },
];

// Array of animals to be used as Unsplash search queries.
const animals = ['Cat', 'Cow', 'Bear', 'Dog', 'Fox', 'Horse', 'Kitten', 'Koala', 'Otter', 'Panda', 'Pig', 'Pigeon', 'Pony', 'Puppy', 'Rabbit', 'Sheep', 'Squirrel', 'Wolf'];

// Final array of arrays, each array of which will contain fifteen image urls.
const allAnimalUrls = [];

// Shuffle animals for the sake of variety in testing.
const shuffleAnimals = () => {
  for (let i = animals.length - 1; i > 0; i--) {
    const hold = animals[i];
    const randomIndex = Math.floor(Math.random() * (i + 1));
    animals[i] = animals[randomIndex];
    animals[randomIndex] = hold;
  }
};

const buildSampleStyles = () => {
  sampleStyles = []; // Overwrites sampleSyles with empty array before populating it.
  const basePrice = 14.95;
  const priceAddMax = 11;
  const baseQuantity = 7;
  const quantityAddMax = 8;

  let productId = 2001;   //  will have to be imported into function
  let animalIndex = 0;

  //  jw productId is going to go up to ten million
  while (productId < 2101 && animalIndex <= animals.length) {
    const currentAnimal = animals[animalIndex];
    const clusterSize = baseQuantity + Math.floor(Math.random() * quantityAddMax);
    const currentCluster = [];
    for (let i = 0; i < clusterSize && i < allAnimalUrls[animalIndex].length; i++) {
      const generatedPrice = basePrice + (Math.floor(Math.random() * priceAddMax));
      const newStyle = {
        productId,
        photo_url: allAnimalUrls[animalIndex][i],
        name: `${currentAnimal} T-Shirt`,
        price: generatedPrice,
        related: [],
      };
      if (productId <= 2100) {
        currentCluster.push(newStyle);
        // console.log('buildSampleStyles: ', newStyle);
      }
      productId++;
    }
    // Push the productId of each record into the 'related' property array of each other
    //   record in its cluster.
    for (let i = 0; i < currentCluster.length; i++) {
      for (let j = 0; j < currentCluster.length; j++) {
        if (i !== j) {
          currentCluster[i].related.push(currentCluster[j].productId);
        }
      }
      sampleStyles.push(currentCluster[i]);
      // console.log(currentCluster[i].name, currentCluster[i].productId);
    }
    animalIndex++;
  }
};


const buildCluster = async () => {
  shuffleAnimals();
  // Will contain fifteen image urls of the current animal.
  let currentAnimalUrls = [];
  // String which will be set and used to perform an axios GET request to the unsplash API.
  let requestUrl = '';

  const getUrls = async () => axios({
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

  for (let i = 0; i < animals.length; i++) {
    requestUrl = `https://api.unsplash.com/photos/random/?query=${animals[i]}&orientation=squarish&count=15`;
    // eslint-disable-next-line no-await-in-loop
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
  //  jw return generated data to database function instead of posting
  return sampleStyles;
  //  upsertSampleStyles();
};

module.exports = buildCluster;
