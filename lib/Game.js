const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');
const Refuel = require('./Refueling.js');
const Sun = require('./Sun.js');
const planet = new Planet();
let refuel = new Refuel();
let sun = new Sun();

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
    this.planetsArray = [];
    this.scoreIncrement = 10;
    this.score = 0;
    this.level = 0;
    this.planetsGenerated = 0;
    this.ufo = new Ufo();
    this.upArrowPressed = false;
  }

  //make function that takes screen and display type
  //pass that info to onLoad/other screen changes

  onPlay(ctx, levelChange) {
    this.ufo.draw(ctx);
    this.ufo.makeGravity();
    this.ufo.makeFriction();
    this.ufo.arrowUp();
    this.movePlanets();
    this.checkCollision();
    this.changeLevelState(levelChange);
    this.generateRefuel(ctx);
    this.generateSun(ctx);
    this.planetsArray.forEach( planet => {
      planet.drawPlanets(ctx);
      planet.makePlanetFriction(this.upArrowPressed);
    })
  }

  checkLoss() {
    if (this.ufo.y > 540) {
      this.loss = true;
      this.ufo.y = 550;
      this.level = 0;
    }
  }

  resetStates() {
    this.ufo.velocityY = 0;
    this.ufo.x = 250;
    this.ufo.removeBottom = false;
    this.scoreIncrement = 10;
    this.planetsArray = [];
    refuel.refuelExists = false;
  }

  changeLevelState(levelChange) {
    if (this.score >= 1000 && this.level === 0) {
      this.level = 1;
      this.changeLevel(levelChange);
    } 
    // else if(score === 200 && this.level === 1) {
    //   this.level = 2;
    // }
  }

  changeLevel(levelChange) {
    if (this.level === 1) {
      this.upArrowPressed = false;
      this.resetStates();
      levelChange.css('display', 'block');
      setTimeout( function() {
        levelChange.css('display', 'none');
      }, 2000);
    }
  }

  checkKeyFunctionality(string) {
    if (string == '38') {
      this.ufo.bounceUp();
      this.ufo.removeBottom = true;
    } else if (string == '37') {
      this.ufo.moveLeft();
    } else if (string == '39') {
      this.ufo.moveRight();
    }
  }

  resetVelocityX(string) {
    //left arrow
    if (string == '37') {
      if (this.ufo.x < 10) {
        this.ufo.x = 0;
        this.ufo.velocityX = 0;
        this.ufo.x = 0;
      } else {
        this.ufo.velocityX = -0.5;
      }
    // right arrow
    } else if (string == '39') {
      if (this.ufo.x > 450) {
        this.ufo.velocityX = 0;
        this.ufo.x = 460;
      } else {
        this.ufo.velocityX = 0.5;
      }   
    }
  }

  checkCollision() {
    this.planetsArray = this.ufo.checkForPlanetCollision(this.planetsArray); 
    refuel = this.ufo.checkForRefuelCollision(refuel);
    this.calculateScore();
  }

  //ALSO when using numbers either assign them to 
  //a variable ALL_CAPS and use that places
  //or if it's a one off leave an explanatory comment

  generatePlanets() {
    let level = this.level;
    var planetSizes = planet.checkPlanetSize(level);
    let newPlanet = new Planet(planetSizes.width, planetSizes.height);

    this.planetsArray.push(newPlanet);
    this.removePlanets();
    this.planetsGenerated++; 
    this.checkForRefuel();
    this.checkForSun();
  }

  checkForRefuel() {
    if (this.planetsGenerated === 10) {
      this.planetsGenerated = 0;
      refuel.refuelExists = true;
    }
  }

  generateRefuel(ctx) {
    if (refuel.refuelExists) {
      refuel.moveRefuel();
      refuel.drawRefuel(ctx);
      refuel.checkRefuelY();
    }
  }

  checkForSun() {
    if (this.planetsGenerated == 2) {
      sun.sunExists = true;
    }
  }

  generateSun() {
    if (sun.sunExists) {
      let sun1 = new Sun();

      this.planetsArray.push(sun1);
      sun.sunExists = false;
    }
  }

  removePlanets() {
    this.planetsArray.forEach((planet, index) => {
      if (planet.y > 460) {
        this.planetsArray.splice(index, 1);
      }
    })
  }

  movePlanets() {
    this.planetsArray.forEach(function(planet) {
      planet.movePlanets();
    })
  }

  calculateScore() {
    if (this.ufo.planetCollision) {
      this.upArrowPressed = true;
      this.planetsBounceDown();
      this.score += this.scoreIncrement;
      this.scoreIncrement += 10;
      this.ufo.planetCollision = false;
    } else if (this.ufo.refuelCollision) {
      this.score *= 2;
      this.ufo.refuelCollision = false;
    }
  }

  planetsBounceDown() {
    this.planetsArray.forEach( planet => {
      planet.oppositeBounce(this.ufo);
    })
  }

}

module.exports = Game;