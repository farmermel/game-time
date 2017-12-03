const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');
const ufo = new Ufo();
const planet = new Planet();

var planetsArray = [];
let score = 0;

class Game {
  constructor() {

  }

  onLoad(titleScreen, startScreen) {
    titleScreen.css('display', 'block');
    setTimeout( function() {
      titleScreen.css('display', 'none');
      startScreen.css('display', 'flex');
    }, 1500);
  }

  playing(startScreen, playScreen) {
    startScreen.css('display', 'none');
    playScreen.css('display', 'block');
  }

  onPlay(ctx, playerScore) {
    this.movePlanets();
    this.generatePlanets(ctx);
    ufo.draw(ctx);
    ufo.makeGravity();
    ufo.arrowUp();
    this.checkColiision(playerScore);
  }

  restartPlaying(playScreen, lossScreen, playerScore) {
    playScreen.css('display', 'block');
    lossScreen.css('display', 'none');
    ufo.removeBottom = false;
    planetsArray = [];
    ufo.currentDY = 0;
    playerScore.text(0);
  }

  onLoss(playScreen, lossScreen, finalScore) {
    if(ufo.y > 460) {
      setTimeout( function() {
        playScreen.css('display', 'none');
        lossScreen.css('display', 'flex'); 
        finalScore.text(score); 
      }, 1000)
    }
  }

  checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
      //up arrow
      ufo.bounceUp();
      ufo.removeBottom = true;
    } else if (e.keyCode == '40') {
      // down arrow
    } else if (e.keyCode == '37') {
       // left arrow
      ufo.moveLeft;
    } else if (e.keyCode == '39') {
       // right arrow
      ufo.moveRight;
    }
  }

  checkColiision(playerScore) {
    let ufoXLeft = ufo.x - 30;
    let ufoXRight = ufo.x + 30;
    let ufoYTop = ufo.y - 30;
    let ufoYBottom = ufo.y + 30;
    planetsArray.forEach( (planet, index) => {
      if (ufoXLeft < planet.x && planet.x < ufoXRight && ufoYBottom > planet.y && planet.y > ufoYTop) {
        ufo.bounceUp();
        planetsArray.splice(index, 1);
        this.calculateScore(playerScore);
      }
    })
  }

  generatePlanets(ctx) {
    if (planetsArray.length < 10) {
      var planet = new Planet(Math.floor(Math.random()* 460), - Math.floor(Math.random()* 600),'../images/mars.svg');
      planetsArray.push(planet);
    } else {
      planetsArray.forEach(function(planet, index) {
        if(planet.y > 460) {
        planetsArray.splice(index, 1);
        };
      });
    } 
    planetsArray.forEach( planet => {
        planet.drawPlanets(ctx);
      })
  };

  // drawPlanets(ctx, planetsArray) {
  //   planetsArray.forEach(function(planet) {
  //     planet.draw(ctx)
  //   });
  // };

  movePlanets() {
    planetsArray.forEach(function(planet) {
      planet.movePlanets();
    });
  };

  calculateScore(playerScore) {
    score += 10;
    playerScore.text(score);
  };
}

module.exports = Game;