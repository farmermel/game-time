const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');
const Refuel = require('./Refueling.js');

const ufo = new Ufo();
const planet = new Planet();
let refuel = new Refuel();

let planetsArray = [];
let score = 0;
// let keyboard = {
//   '38': function(ufo) {
//     ufo.bounceUp(); 
//     ufo.removeBottom = true
//     },
//   '37': ufo.moveLeft,
//   '39': ufo.moveRight
// }

class Game {
  constructor() {
    this.scoreIncrement = 10;
    this.level = 0;
    this.planetsGenerated = 0;
    // this.refuelExists = false;
  };

  //make function that takes screen and display type
  //pass that info to onLoad/other screen changes
  onLoad(titleScreen, startScreen) {
    titleScreen.css( 'display', 'block' );
    setTimeout( function() {
      titleScreen.css('display', 'none');
      startScreen.css('display', 'flex');
    }, 1500);
  };

  onPlay(ctx, playerScore, levelChange) {
    ufo.draw(ctx);
    ufo.makeGravity();
    ufo.makeFriction();
    ufo.arrowUp();
    this.movePlanets();
    this.checkCollision(playerScore);
    this.changeLevelState(levelChange);
    this.generateRefuel(ctx);
    planetsArray.forEach( planet => {
      planet.drawPlanets(ctx);
    });
  };

  playing(startScreen, playScreen) {
    startScreen.css('display', 'none');
    playScreen.css('display', 'block');
  };

  restartPlaying(playScreen, lossScreen, playerScore) {
    debugger
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
    refuel.refuelExists = false;
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

  //map object to handle this
  checkKey(e) {
    e = e || window.event;
    // let codeString = `${e.keyCode}`
    //   console.log(typeof(codeString));
    //   console.log(codeString);
    //   console.log(keyboard[codeString])

    // if(keyboard[codeString]) {
    //   keyboard[codeString]
    //   console.log(keyboard[e.keyCode]);
    // };
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

  //ufo should be able to change its own velocity
  resetVelocityX(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
       // left arrow
       ufo.velocityX = -0.5;
    } else if (e.keyCode == '39') {
       ufo.velocityX = 0.5;      
    };
  };

  checkCollision(playerScore) {
    planetsArray = ufo.checkForPlanetCollision(planetsArray); 
    refuel = ufo.checkForRefuelCollision(refuel);
    this.calculateScore(playerScore);
  };

  //ALSO when using numbers either assign them to a variable ALL_CAPS and use that places
  //or if it's a one off leave an explanatory comment

  generatePlanets(ctx) {
    let level = this.level;
    var planetSizes = planet.checkPlanetSize(level);
    var planetSrcImg = planet.getPlanetSource();
    var planetPath = planet.planetPathway();
    let newPlanet = new Planet(planetPath.x, planetPath.y, planetSrcImg.arrayVal, planetSizes.width, planetSizes.height);
    planetsArray.push(newPlanet);
    this.removePlanets;
    this.planetsGenerated++; 
    this.checkForRefuel();
  };

  //next three : put on refuel, pass in planets
  checkForRefuel() {
    if(this.planetsGenerated === 10) {
      this.planetsGenerated = 0;
      refuel.refuelExists = true;
    };
  };

  generateRefuel(ctx) {
    if(refuel.refuelExists === true) {
      refuel.moveRefuel;
      refuel.drawRefuel(ctx);
      this.checkRefuelY(refuel);
    };
  };

  checkRefuelY(refuel) {
    if(refuel.y > 500) {
      refuel.refuelExists = false;
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

  movePlanets() {
    planetsArray.forEach(function(planet) {
      planet.movePlanets();
    });
  };

  calculateScore(playerScore) {
    if(ufo.planetCollision) {
      score += this.scoreIncrement;
      this.scoreIncrement += 10;
      playerScore.text(score);
      ufo.planetCollision = false;
    } else if(ufo.refuelCollision) {
      score *= 2;
      playerScore.text(score);
      ufo.refuelCollision = false;
    }
  };


};

module.exports = Game;