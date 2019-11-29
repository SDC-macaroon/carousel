const db  = require('./index.js');
const Style = require('./Style.js');

const sampleStyles = [ {
  productId: 2001,
  photo_url: 'https://source.unsplash.com/1600x900/?error',
  name: 'This should not be visible',
  price: 99.99,
  related: [2001]
}];

const chooseRandomAnimal = function() {
  var currentAnimal = animalArray[(Math.random() * animalArray.length)];
  return currentAnimal;
}

const buildSampleStyles = function() {
  var sampleStyles = [];
  var basePrice = 14.99;
  var priceAddMax = 11;
  var baseQuantity = 4;
  var quantityAddMax = 6;
  var animalArray = ['caribou', 'fox', 'hedgehog', 'hippo', 'lemur', 'manatee', 'orangutan', 'otter', 'panda', 'seal', 'sloth', 'warthog']
  var usedAnimals = [];

  var productId = 2001;

  while (productId < 2101 && usedAnimals.length < animalArray.length) {
    var currentAnimal = '';
    while (currentAnimal === '') {
      var newAnimal = chooseRandomAnimal();
      if (!usedAnimals.includes(newAnimal)) {
        currentAnimal = newAnimal;
      }
    }
    var usedAnimals.push(currentAnimal);
    var clusterSize = baseQuantity + (Math.random() * quantityAddMax);
    var clusterArray = [];
    for (let i = 0; i < clusterSize; i++) {
      var styleTemplate = {
        productId: productId,
        photo_url: 'https://source.unsplash.com/1600x900/?' + currentAnimal,
        name: currentAnimal + ' T-Shirt',
        price: basePrice + (Math.floor(Math.random() * priceAddMax * 100))/100,
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
    }
  }
};

const upsertSampleStyles = function() {
  Style.upsert(sampleStyles)
    .then(() => db.disconnect());
};

buildSampleStyles();
insertSampleStyles();