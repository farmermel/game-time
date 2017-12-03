// import { Block } from 'Block';
// const Block = require('./Block.js');

const Game = require('./Game.js');

const ctx = $("#game")[0].getContext('2d');
var $playerScore = $('#score-num');
var $startScreen = $('.start');
var $playScreen = $('.game-wrap');
var $lossScreen = $('.lose');
var $finalScore = $('span')

const game = new Game();

$playerScore.text(0);

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  game.onPlay(ctx, $playerScore);
  game.onLoss($playScreen, $lossScreen, $finalScore);
  requestAnimationFrame(animate);
};

function gamePlaying() {
  animate();
  game.playing($startScreen, $playScreen);
};

function restartGamePlaying() {
  game.restartPlaying($playScreen, $lossScreen, $playerScore);
}

//EVENT LISTENERS

$(document).ready(game.onLoad($startScreen));

$(document).on('click', '.start-button', gamePlaying);

$(document).on('click', '.restart-button', restartGamePlaying);

document.addEventListener( 'keydown', function(e) {
  game.checkKey(e);
});

module.exports = $startScreen;



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
