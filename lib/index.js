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
  game.generatePlanets();
  game.checkLoss();
  displayLevelChange()
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

function displayLevelChange() {
  if (game.levelChange) {
    $levelChange.css('display', 'block');
    setTimeout( function() {
      $levelChange.css('display', 'none');
      game.levelChange = false;
      }, 2000);
  }
}


function gamePlaying() {
  animate();
  $startScreen.css('display', 'none');
  $playScreen.css('display', 'block');
}

function restartGamePlaying() {
  game = new Game();
  gamePlaying();
  $lossScreen.css('display', 'none');
  $playScreen.css('display', 'block');
}

// function sound(src) {
//     this.sound = document.createElement("audio");
//     this.sound.src = src;
//     document.body.appendChild(this.sound);
//     this.play = function(){
//         this.sound.play();
//     }
// }
