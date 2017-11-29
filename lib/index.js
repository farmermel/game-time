// import { Block } from 'Block';
const Block = require('./Block.js');
const Planet = require('./Planet.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

var block = new Block;
var planet = new Planet;

// img.addEventListener('load', function() {
//   block.draw(ctx);
// }, false);

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  planet.draw(ctx);
  planet.move();
  requestAnimationFrame(animate);
}

animate()

// planet.generatePlanets();


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
