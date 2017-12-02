// import { Block } from 'Block';
// const Block = require('./Block.js');

const Game = require('./Game.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
var playerScore = document.querySelector('#score-num');
const game = new Game();

// let score = 0;
playerScore.innerText = 0;


// function calculateScore() {
//   score += 10;
//   playerScore.innerText = score;
// };

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  game.onPlay(ctx, playerScore);
  // game.checkColiision();
  requestAnimationFrame(animate);
};

animate();

//EVENT LISTENERS
document.addEventListener( 'keydown', function(e) {

  game.checkKey(e);
});


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
