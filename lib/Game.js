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
    this.planetX = 1;
    this.planetY = -60;
    this.randomX = 1;
    this.randomY = 1;
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
    this.generatePlanets(ctx);
    ufo.draw(ctx);
    ufo.makeGravity();
    ufo.makeFriction();
    ufo.arrowUp();
    this.checkColiision(playerScore);
    this.changeLevelState(levelChange);
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
      };
    });
  };

  //function to specifically target where planet is generating
  //generate a random x starting value, hard code the y to be close to top
  //planetX += var(Math.floor(Math.random() * 50))
  //if planetX > 500 or less than 0, multiply mathrandom by negative

  // randomizeXY() {
    //condition here that checks whether the number is negative or positive
    // if(this.randomX > 0) {
  //     this.randomX = Math.floor(Math.random() * 100);
  //   } else if (this.randomX < 0) {
  //     this.randomX = -Math.floor(Math.random() * 100);
  //   }
  // }

  // planetPathway() {
    // var randomX = Math.floor(Math.random() * 100);
    // var randomY = Math.floor(Math.random() * 50);
    // this.randomizeXY();
    // this.planetX += this.randomX;
    // this.planetY -= this.randomY;
    // console.log(this.planetX);
  //   console.log(this.randomX);
  //   if(this.planetX > 460 || this.planetX < 0) {
  //     this.randomX = -this.randomX;
  //   }
  // }

  planetPathway() {
    this.randomX = Math.floor((Math.random() * (300-100)) +100);
    // this.randomY = Math.floor(Math.random() * 200);
    this.randomY = 130;
    this.planetY -= this.randomY;
    if(this.randomX % 2 === 0) {
      this.planetX += this.randomX;
      // this.planetY += this.randomY;
    } else {
      this.planetX -= this.randomX;
    }
    if(this.planetX > 460 || this.planetX < 0) {
      this.planetX = Math.floor(Math.random() * 460);
    } else if(this.planetY > 0 || this.planetY < -500) {
      this.planetY = -Math.floor(Math.random() * 460);
    }
  }

  //from planetPathway return the planet x and y in an object like with planetSizes
  //in generate planets assign a const the value of this.planetPathway()
  //then use this.planetPathway.planetX and planetY to dynamically assign values
  //this way nothing else can change the value of planetX and planetY by accident


  //ALSO when using numbers either assign them to a variable ALL_CAPS and use that places
  //or if it's a one off leave an explanatory comment

  generatePlanets(ctx) {
    var planetSizes = this.checkPlanetSize();
    var planetSrcImg = this.getPlanetSource();
    //instead of declairing variables and passing them around just:
    //var planetSrcImg = this.getPlanetSource();
    //inside this.getPlanetSource return the object you want
    // this.checkPlanetSize(planetSizes);
    if (planetsArray.length < 10) {
      this.planetPathway();
      var planet = new Planet(this.planetX, this.planetY, planetSrcImg.arrayVal, planetSizes.width, planetSizes.height);
      planetsArray.push(planet);
    } else {
      this.removePlanets;
    } 
//Should this be up next to bracket?
    planetsArray.forEach( planet => {
        planet.drawPlanets(ctx);
      });
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