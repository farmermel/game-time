// import { Block } from 'Block';
// const Block = require('./Block.js');
const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// var block = new Block;
// var planet = new Planet(0, 0);

var planetsArray = [];
const ufo = new Ufo();


function generatePlanets(ctx) {
  if (planetsArray.length < 10) {
    let planet = new Planet(Math.floor(Math.random()* 460), -Math.floor(Math.random()* 600),'../images/mars.svg');
    // for (let i = 0; i < 15; i++) {
      planetsArray.push(planet);
      console.log(planetsArray);
    // } 
  } else {
    planetsArray.forEach(function(planet, index) {
      if(planet.y > 460) {
      planetsArray.splice(index, 1);
      }
    })
  }
  drawPlanets(ctx);
  console.log(planetsArray.length);
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

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  movePlanets();
  generatePlanets(ctx);
  // removePlanets();
  ufo.draw(ctx);
  requestAnimationFrame(animate);
}

animate();

// img.addEventListener('load', function() {
//   block.draw(ctx);
// }, false);
// console.log(planet.planetsArray);





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
