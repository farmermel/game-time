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

let game = new Game();
// var myMusic;
//EVENT LISTENERS

$(document).ready( function() {
  $titleScreen.css( 'display', 'block' );
  setTimeout( function() {
    $titleScreen.css('display', 'none');
    $startScreen.css('display', 'flex');
  }, 1500);
  // myMusic = new sound("../audio/game.mp3");
  // myMusic.play();
});

$(document).on('click', '.start-button', gamePlaying);

$(document).on('click', '.restart-button', restartGamePlaying);

$(document).on('keydown', checkKey);

$(document).on('keyup', checkKeyVelocity);


function checkKey(e) {
  e = e || window.event;
  //up arrow
  if (e.keyCode == '38') {
    game.checkKeyFunctionality('38');
  // left arrow
  } else if (e.keyCode == '37') {
    game.checkKeyFunctionality('37');
  // right arrow
  } else if (e.keyCode == '39') {
    game.checkKeyFunctionality('39');
  }
}

function checkKeyVelocity(e) {
  e = e || window.event
  //up arrow
  if (e.keyCode == '38') {
  // left arrow
  } else if (e.keyCode == '37') {
    game.resetVelocityX('37');
  // right arrow
  } else if (e.keyCode == '39') {
    game.resetVelocityX('39');
  }
}

$playerScore.text(0);

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  game.onPlay(ctx, $levelChange);
  updateScore();
  game.checkLoss();
  if (game.loss) {
    ctx.clearRect(0, -500, innerWidth, innerHeight);
    onLoss();
    return;
  }
  requestAnimationFrame(animate);
}

function onLoss() {
  $finalScore.text(game.score);
  if (game.loss) {
    setTimeout( () => {
      $playScreen.css('display', 'none');
      $lossScreen.css('display', 'flex');
    }, 1000);
  } 
}

function updateScore() {
  $playerScore.text(game.score);
}

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
  $startScreen.css('display', 'none');
  $playScreen.css('display', 'block');
}

function restartGamePlaying() {
  game = new Game();
  gamePlaying();
  // game.resetStates();
  $lossScreen.css('display', 'none');
  $playScreen.css('display', 'block');
  // game.score = 0;
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
