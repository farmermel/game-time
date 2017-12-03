const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');
const ufo = new Ufo();
const planet = new Planet();

var planetsArray = [];
let score = 0;

class Game {
  constructor() {
    this.scoreIncrement = 10;
    this.level = 0;
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

  onPlay(ctx, playerScore, levelChange) {
    this.movePlanets();
    this.generatePlanets(ctx);
    ufo.draw(ctx);
    ufo.makeGravity();
    ufo.arrowUp();
    this.checkColiision(playerScore);
    this.changeLevelState(levelChange);
  }

  restartPlaying(playScreen, lossScreen, playerScore) {
    playScreen.css('display', 'block');
    lossScreen.css('display', 'none');
    playerScore.text(0);
    score = 0;
    this.resetStates();
  }

  resetStates() {
    ufo.currentDY = 0;
    this.scoreIncrement = 10;
    planetsArray = [];
    ufo.removeBottom = false;
  }

  onLoss(playScreen, lossScreen, finalScore) {
    if(ufo.y > 460) {
      setTimeout( function() {
        playScreen.css('display', 'none');
        lossScreen.css('display', 'flex');
        finalScore.text(score);
        this.level = 0;
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
    score += this.scoreIncrement;
    this.scoreIncrement += 10;
    playerScore.text(score);
  };

  changeLevelState(levelChange) {
    if(score === 100 && this.level === 0) {
      this.level = 1;
      this.changeLevel(levelChange);

    } 
    // else if(score === 200 && this.level === 1) {
    //   this.level = 2;
    // }
  }

  changeLevel(levelChange) {
    if(this.level = 1) {
      this.resetStates();
      levelChange.css('display', 'block');
      setTimeout( function() {
        levelChange.css('display', 'none');
      }, 2000);
  }

  }
}

module.exports = Game;