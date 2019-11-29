const db  = require('./index.js');
const Style = require('./Style.js');

// NOTES -- This file seeds the database with 100 records. These records are generated in clusters, so as to allow for groups of records, each of which are related to the others in the same group. Each cluster shares a random animal, selected at time of seeding.

// his var is the default state of the array which holds the generated sample records prior to db insertion. It is overwritten by the buildSampleStyles function.
var sampleStyles = [ {
  productId: 2001,
  photo_url: 'https://source.unsplash.com/1600x900/?error',
  name: 'This should not be visible',
  price: 99.99,
  related: [2001]
}];

// This function generates a series of clusters, stopping when 100 records have been generated. For each cluster, an unused random animal is selected, and somewhere between 7 and 15 elements using that animal are then generated, each with its own productId, photo_url, name, and price. When all elements in a cluster have been created, the productId of each of them are inserted into the 'related' property array of each other element. These elements are then added to the sampleStyles array.
const buildSampleStyles = function() {
  sampleStyles = [];
  var basePrice = 14.95;
  var priceAddMax = 11;
  var baseQuantity = 7;
  var quantityAddMax = 8;
  var animalArray = ['Caribou', 'Fox', 'Hedgehog', 'Hippo', 'Lemur', 'Manatee', 'Orangutan', 'Otter', 'Panda', 'Racoon', 'Seal', 'Sloth', 'Squirrel', 'Walrus', 'Warthog']
  var usedAnimals = [];

  const chooseRandomAnimal = function() {
    var randomAnimal = animalArray[Math.floor(Math.random() * animalArray.length)];
    return randomAnimal;
  }

  var productId = 2001;

  while (productId < 2101) {
    var currentAnimal = '';
    while (currentAnimal === '') {
      var newAnimal = chooseRandomAnimal();
      if (!usedAnimals.includes(newAnimal)) {
        currentAnimal = newAnimal;
        usedAnimals.push(currentAnimal);
      }
    }
    var clusterSize = baseQuantity + Math.floor(Math.random() * quantityAddMax);
    var clusterArray = [];
    for (let i = 0; i < clusterSize; i++) {
      var generatedPrice = basePrice + (Math.floor(Math.random() * priceAddMax));
      var styleTemplate = {
        productId: productId,
        photo_url: 'https://source.unsplash.com/1600x900/?' + currentAnimal,
        name: currentAnimal + ' T-Shirt',
        price: generatedPrice,
        related: []
      };
      if (productId <= 2100) {
        clusterArray.push(styleTemplate);
      }
      productId++;
    }
    for (let i = 0; i < clusterArray.length; i++) {
      for (let j = 0; j < clusterArray.length; j++) {
        if (i !== j) {
          clusterArray[i].related.push(clusterArray[j].productId);
        }
      }
      sampleStyles.push(clusterArray[i]);
      // console.log(clusterArray[i].name, clusterArray[i].productId);
    }
  }
};

// This function inserts each generated style element from the sampleStyles array into the database. It utilizes upsert, allowing items to be replaced if/when a given productId already exists in the database, and otherwise creating those items.
const upsertSampleStyles = function() {
  console.log('sampleStyles.length: ', sampleStyles.length);
  for (let i = 0; i < sampleStyles.length; i++) {
    Style.upsert(sampleStyles[i], function (err, data) {
    console.log(data);
    })
  }
};

buildSampleStyles();
upsertSampleStyles();