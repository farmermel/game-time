const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');
const Refuel = require('./Refueling.js');

const ufo = new Ufo();
const planet = new Planet();
const refuel = new Refuel();

var planetsArray = [];
let score = 0;

class Game {
  constructor() {
    this.scoreIncrement = 10;
    this.level = 0;
    this.planetsGenerated = 0;
    this.refuelExists = false;
  };

  onLoad(titleScreen, startScreen) {
    titleScreen.css('display', 'block');
    setTimeout( function() {
      titleScreen.css('display', 'none');
      startScreen.css('display', 'flex');
    }, 1500);
  };

  onPlay(ctx, playerScore, levelChange) {
    this.movePlanets();
    ufo.draw(ctx);
    ufo.makeGravity();
    ufo.makeFriction();
    ufo.arrowUp();
    this.checkColiision(playerScore);
    this.changeLevelState(levelChange);
    planetsArray.forEach( planet => {
      planet.drawPlanets(ctx);
    });
    this.generateRefuel(ctx);
  };

  playing(startScreen, playScreen) {
    startScreen.css('display', 'none');
    playScreen.css('display', 'block');
  };

  restartPlaying(playScreen, lossScreen, playerScore) {
    this.resetStates();
    lossScreen.css('display', 'none');
    playScreen.css('display', 'block');
    playerScore.text(0);
    score = 0;
  };

  onLoss(playScreen, lossScreen, finalScore) {
    if(ufo.y > 460) {
      setTimeout( function() {
        playScreen.css('display', 'none');
        lossScreen.css('display', 'flex');
        finalScore.text(score);
      }, 1000);
    this.level = 0;
    };
  };

  resetStates() {
    ufo.velocityY = 0;
    this.scoreIncrement = 10;
    planetsArray = [];
    ufo.removeBottom = false;
    ufo.x = 250;
  };

  changeLevelState(levelChange) {
    if(score === 100 && this.level === 0) {
      this.level = 1;
      this.changeLevel(levelChange);

    } 
    // else if(score === 200 && this.level === 1) {
    //   this.level = 2;
    // }
  };

  changeLevel(levelChange) {
    if(this.level = 1) {
      this.resetStates();
      levelChange.css('display', 'block');
      setTimeout( function() {
        levelChange.css('display', 'none');
      }, 2000);
    };
  };

  checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
      //up arrow
      ufo.bounceUp();
      ufo.removeBottom = true;
    } else if (e.keyCode == '37') {
       // left arrow
      ufo.moveLeft;
    } else if (e.keyCode == '39') {
       // right arrow
      ufo.moveRight;
    };
  };

  resetVelocityX(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
       // left arrow
       ufo.velocityX = -0.5;
    } else if (e.keyCode == '39') {
       ufo.velocityX = 0.5;      
    };
  };

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
      };
    });
    if(ufoXLeft < refuel.x && refuel.x < ufoXRight && ufoYBottom > refuel.y && refuel.y > ufoYTop) {
      // console.log('if statement works')
      ufo.bounceUp();
      this.refuelExists = false;
      refuel.x = 1;
      refuel.y = 0;
      console.log(score);
      score *= 2;
      playerScore.text(score);
    }
  };

  planetPathway() {
    let planetPath = {
      x: 1,
      y: -50
    };
    let randomX = Math.floor((Math.random() * (150-70)) +70);
    if(randomX % 4 === 0) {
      planetPath.x += randomX;
    } else {
      planetPath.x -= randomX;
    };
    if(planetPath.x > 460 || planetPath.x < 0) {
      planetPath.x = Math.floor(Math.random() * 460);
    };
    return planetPath;
  };

  //ALSO when using numbers either assign them to a variable ALL_CAPS and use that places
  //or if it's a one off leave an explanatory comment

  generatePlanets(ctx) {
    var planetSizes = this.checkPlanetSize();
    var planetSrcImg = this.getPlanetSource();
    var planetPath = this.planetPathway();
    var planet = new Planet(planetPath.x, planetPath.y, planetSrcImg.arrayVal, planetSizes.width, planetSizes.height);
    planetsArray.push(planet);
    this.removePlanets;
    this.planetsGenerated++; 
    this.checkForRefuel();
  };

  checkForRefuel() {
    if(this.planetsGenerated === 10) {
      this.planetsGenerated = 0;
      this.refuelExists = true;
    };
  };

  generateRefuel(ctx) {
    if(this.refuelExists === true) {
      refuel.moveRefuel;
      refuel.drawRefuel(ctx);
      this.checkRefuelY(refuel);
    };
  };

  checkRefuelY(refuel) {
    if(refuel.y > 500) {
      this.refuelExists = false;
      refuel.x = 1;
      refuel.y = 0;
    };
  };


  get removePlanets() {
    planetsArray.forEach(function(planet, index) {
      if(planet.y > 460) {
        planetsArray.splice(index, 1);
      };
    });
  };

  getPlanetSource() {
    let planetSrcImg = {};
    let planetSrc = ['../images/mars.svg', '../images/jupiter.svg', '../images/moon.svg', '../images/saturn.svg', '../images/coolplanet.svg', '../images/earth.svg'];
    let planetIndex = Math.floor(Math.random() * 6);
    planetSrcImg.arrayVal = planetSrc[planetIndex];
    return planetSrcImg;
  };

  checkPlanetSize() {
    let planetSizes = {}
    if(this.level === 0) {
      planetSizes.width = 40;
      planetSizes.height = 40;
    } else if (this.level === 1) {
      planetSizes.width = 30;
      planetSizes.height = 30;
    } return planetSizes;
  };

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
};

module.exports = Game;