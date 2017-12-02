const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');
const ufo = new Ufo();
const planet = new Planet();

var planetsArray = [];

class Game {
  constructor() {
    this.running = false;
    this.paused = false;
    this.lost = false;
  }

  onLoad() {
    //This is going to be our start menu

  }

  onPlay(ctx) {
    //Triggered by clicking play btn
    //runs our game
    ufo.draw(ctx);
    ufo.makeGravity();
    ufo.rockBottom;
    planet.movePlanets(planetsArray);
  }

  onLoss() {
    //Displays losing screen and option to start over
    //Will trigger onPlay
  }

  checkKey(e) {
    console.log(e);
    e = e || window.event;

    if (e.keyCode == '38') {
      // console.log('hi');
      // console.log(ufo1);
      ufo.bounceUp();
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

  checkColiision() {
    let ufoXLeft = ufo.x - 30;
    let ufoXRight = ufo.x + 30;
    let ufoYTop = ufo.y - 30;
    let ufoYBottom = ufo.y + 30;
    planetsArray.forEach( function (planet, index) {
      if (ufoXLeft < planet.x && planet.x < ufoXRight && ufoYBottom > planet.y && planet.y > ufoYTop) {
        ufo.bounceUp();
        planetsArray.splice(index, 1);
        calculateScore();
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


}


  // movePlanets();
  // generatePlanets(ctx);
  // ufo.draw(ctx);
  // ufo.makeGravity();
  // ufo.rockBottom;
  // checkColiision();




module.exports = Game;