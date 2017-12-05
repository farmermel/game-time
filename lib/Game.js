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
    this.ufo = new Ufo()
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
    this.ufo.draw(ctx);
    this.ufo.makeGravity();
    this.ufo.makeFriction();
    this.ufo.arrowUp();
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
    // debugger
    this.resetStates();
    lossScreen.css('display', 'none');
    playScreen.css('display', 'block');
    playerScore.text(0);
    score = 0;
  };

  onLoss(playScreen, lossScreen, finalScore) {
    if(this.ufo.y > 600) {
      this.ufo.y = 550;
      setTimeout( () => {
        playScreen.css('display', 'none');
        lossScreen.css('display', 'flex');
        finalScore.text(score);
        this.resetStates();
      }, 1000);
    this.level = 0;
    };
  };

  resetStates() {
    // this.ufo.reset();
    this.ufo.velocityY = 0;
    this.ufo.x = 250;
    this.ufo.removeBottom = false;
    
    this.scoreIncrement = 10;
    planetsArray = [];
    refuel.refuelExists = false;
  };

  changeLevelState(levelChange) {
    if(score >= 100 && this.level === 0) {
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
    //up arrow
    if (e.keyCode == '38') {
      this.ufo.bounceUp();
      this.ufo.removeBottom = true;

    // left arrow
    } else if (e.keyCode == '37') {
      this.ufo.moveLeft();
    
    // right arrow
    } else if (e.keyCode == '39') {
      this.ufo.moveRight();
    };
        // let codeString = `${e.keyCode}`
    //   console.log(typeof(codeString));
    //   console.log(codeString);
    //   console.log(keyboard[codeString])

    // if(keyboard[codeString]) {
    //   keyboard[codeString]
    //   console.log(keyboard[e.keyCode]);
    // };
  };

  //ufo should be able to change its own velocity
  resetVelocityX(e) {
    e = e || window.event;

    // left arrow
    if (e.keyCode == '37') {
      this.ufo.velocityX = -0.5;

    // right arrow
    } else if (e.keyCode == '39') {
      this.ufo.velocityX = 0.5;      
    };

  };

  checkCollision(playerScore) {
    planetsArray = this.ufo.checkForPlanetCollision(planetsArray); 
    refuel = this.ufo.checkForRefuelCollision(refuel);
    this.calculateScore(playerScore);
  };

  //ALSO when using numbers either assign them to a variable ALL_CAPS and use that places
  //or if it's a one off leave an explanatory comment

  generatePlanets(ctx) {
    let level = this.level;
    var planetSizes = planet.checkPlanetSize(level);
    let newPlanet = new Planet(planetSizes.width, planetSizes.height);

    planetsArray.push(newPlanet);
    this.removePlanets();
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
    if(refuel.refuelExists) {
      refuel.moveRefuel();
      refuel.drawRefuel(ctx);
      refuel.checkRefuelY();
    };
  };

  removePlanets() {
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
    if(this.ufo.planetCollision) {
      score += this.scoreIncrement;
      this.scoreIncrement += 10;
      playerScore.text(score);
      this.ufo.planetCollision = false;
    } else if(this.ufo.refuelCollision) {
      score *= 2;
      playerScore.text(score);
      this.ufo.refuelCollision = false;
    }
  };


};

module.exports = Game;