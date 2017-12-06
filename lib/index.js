// import { Block } from 'Block';
// const Block = require('./Block.js');

const Game = require('./Game.js');

const ctx = $("#game")[0].getContext('2d');
const $playerScore = $('#score-num');
const $startScreen = $('.start');
const $playScreen = $('.game-wrap');
const $lossScreen = $('.lose');
const $finalScore = $('#score')
const $titleScreen = $('.title-wrap');
const $levelChange = $('.level-change');

const game = new Game();
var myMusic;
//EVENT LISTENERS

$(document).ready( function() {
  game.onLoad($titleScreen, $startScreen)
  // myMusic = new sound("../audio/game.mp3");
  // myMusic.play();
});

$(document).on('click', '.start-button', gamePlaying);

$(document).on('click', '.restart-button', restartGamePlaying);

$(document).on('keydown', game.checkKey.bind(game))

$(document).on('keyup', game.resetVelocityX.bind(game));

$playerScore.text(0);

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  game.onPlay(ctx, $playerScore, $levelChange);
  game.onLoss($playScreen, $lossScreen, $finalScore);
  requestAnimationFrame(animate);
};

// function sound(src) {
//     this.sound = document.createElement("audio");
//     this.sound.src = src;
//     document.body.appendChild(this.sound);
//     this.play = function(){
//         this.sound.play();
//     }
// }

//put into a function (pass ctx?)
//start setInterval on playclick
setInterval(function() {
  game.generatePlanets(ctx);
}, 2500, ctx);

function gamePlaying() {
  animate();
  game.playing($startScreen, $playScreen);
};

function restartGamePlaying() {
  game.restartPlaying($playScreen, $lossScreen, $playerScore);
}

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
