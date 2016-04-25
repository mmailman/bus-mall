'use strict';

var productsArray = [];
var productNamesArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var productPathsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var totalTries = 25;
var triesCounter = 0;

var imageSection = document.getElementById('products');

function Product(name, pictureFilePath){
  this.name = name;
  this.pictureFilePath = pictureFilePath;
  this.numberOfTimesClicked = 0;
  this.numberOfTimesDisplayed = 0;

  productsArray.push(this);
}

function buildArray(productsArray){
  for(var i = 0; i < productNamesArray.length; i++){
    var product = new Product(productNamesArray[i], 'imgs/' + productPathsArray[i]);
  }
}

function randomImage(){
  var random = Math.floor(Math.random() * (productsArray.length));
  return productsArray[random];
}

function renderImageSet() {
  // var imageSection = document.getElementById('products');
  var image1 = document.createElement('img');
  var image2 = document.createElement('img');
  var image3 = document.createElement('img');
  var random1 = randomImage();
  var random2 = randomImage();
  var random3 = randomImage();

  while (random2 === random1){
    random2 = randomImage();
  }
  while (random3 === random1 || random3 === random2){
    random3 = randomImage();
  }

  random1.numberOfTimesDisplayed++;
  random2.numberOfTimesDisplayed++;
  random3.numberOfTimesDisplayed++;

  image1.src = random1.pictureFilePath;
  image1.id = random1.name;
  image2.src = random2.pictureFilePath;
  image2.id = random2.name;
  image3.src = random3.pictureFilePath;
  image3.id = random3.name;
  imageSection.appendChild(image1);
  imageSection.appendChild(image2);
  imageSection.appendChild(image3);
}

function handleClick(event) {
  var click = event.target;
  // console.log(click);
  if(click.nodeName === 'IMG'){
    if(triesCounter < totalTries){
      productsArray.forEach(function(product){
        if(product.name === click.id){
          product.numberOfTimesClicked++;
          console.log(product);
          console.log(click.id);
        }
      });
      imageSection.innerHTML = null;
      renderImageSet();
      triesCounter++;
    }
  }
}
//Code execution
buildArray(productsArray);
console.log('Products Array: ' + productsArray);

renderImageSet();
imageSection.addEventListener('click', handleClick);
