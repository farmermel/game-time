// import { Block } from 'Block';
// const Block = require('./Block.js');
const Planet = require('./Planet.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// var block = new Block;
var planet = new Planet(0, 0);
// var planet1 = new Planet(0, 0, '../images/planet1.png');
// var planet2 = new Planet(30, 0, '../images/planet1.png');
// var planet3 = new Planet(60, 0, '../images/planet1.png');
// var planet4 = new Planet(90, 0, '../images/planet1.png');

var planetsArray = [];

function generatePlanetLoc(ctx) {
  let planet = new Planet(Math.floor(Math.random()*600), 0,'../images/mars.svg');
  for (let i = 0; i < 100; i++) {
    planetsArray.push(planet);
  }
  // movePlanets();
  console.log(planetsArray)
  drawPlanets(ctx);
}

function drawPlanets(ctx) {
  planetsArray.forEach(function(planet) {
    planet.draw(ctx)
  })
}

function movePlanets() {
  planetsArray.forEach(function(planet) {
    planet.move();
  })
}




// img.addEventListener('load', function() {
//   block.draw(ctx);
// }, false);
// console.log(planet.planetsArray);


function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  // planet.draw(ctx);
  // planet.move();
  movePlanets();
  generatePlanetLoc(ctx);
  requestAnimationFrame(animate);
}

animate();



// planet.draw(ctx);
// let x = 10;
// let y = 10;
// let planetArray = [];

// for (let i = 0; i < 20; i++) {
//   var img = new Image();
//   img.src = '/images/planet1.png';
//   planetArray.push(img);
// }

// console.log(planetArray);

// img.addEventListener('load', function() {
//   ctx.drawImage(img, 200, 200, 20, 20);
//   animate();
// }, false);

// function animate() {
//   ctx.clearRect(0, 0, innerWidth, innerHeight);
//   planetArray.forEach(function(planet, index) {
//       ctx.drawImage(planet, index * 50, y+=.1, 20, 20);
//   })
//   requestAnimationFrame(animate);
// }

// animate();
