// import { Block } from 'Block';
// const Block = require('./Block.js');
const Planet = require('./Planet.js');
// const Ufo = require('./Ufo.js');
const Game = require('./Game.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
var playerScore = document.querySelector('#score-num');
const game = new Game();

// var planetsArray = [];
// const ufo = new Ufo();
let score = 0;
playerScore.innerText = score;



// function generatePlanets(ctx) {
//   if (planetsArray.length < 10) {
//     let planet = new Planet(Math.floor(Math.random()* 460), -Math.floor(Math.random()* 600),'../images/mars.svg');
//     planetsArray.push(planet);
//   } else {
//     planetsArray.forEach(function(planet, index) {
//       if(planet.y > 460) {
//       planetsArray.splice(index, 1);
//       };
//     });
//   } drawPlanets(ctx);
// };

function calculateScore() {
  score += 10;
  playerScore.innerText = score;
}

// function drawPlanets(ctx) {
//   planetsArray.forEach(function(planet) {
//     planet.draw(ctx)
//   });
// };

// function movePlanets() {
//   planetsArray.forEach(function(planet) {
//     planet.move();
//   });
// };

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  // game.movePlanets();
  game.generatePlanets(ctx);
  game.onPlay(ctx);
  // game.checkColiision();
  requestAnimationFrame(animate);
}

animate();

//EVENT LISTENERS
document.addEventListener( 'keydown', function(e) {
  // console.log(e);
  game.checkKey(e);
});
// function checkKey(e) {

//     e = e || window.event;

//     if (e.keyCode == '38') {
//         // up arrow
//       ufo.bounceUp();
//     } else if (e.keyCode == '40') {
//         // down arrow
//     } else if (e.keyCode == '37') {
//        // left arrow
//       ufo.moveLeft;
//     } else if (e.keyCode == '39') {
//        // right arrow
//        ufo.moveRight;
//     }

// }

//make a method of block so it's testable
// function checkColiision() {
//   let ufoXLeft = ufo.x - 30;
//   let ufoXRight = ufo.x + 30;
//   let ufoYTop = ufo.y - 30;
//   let ufoYBottom = ufo.y + 30;
//   planetsArray.forEach( function (planet, index) {
//      if (ufoXLeft < planet.x && planet.x < ufoXRight && ufoYBottom > planet.y && planet.y > ufoYTop) {
//       ufo.bounceUp();
//       planetsArray.splice(index, 1);
//       calculateScore();
//     }
//   })
// }







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
