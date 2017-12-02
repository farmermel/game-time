// import { Block } from 'Block';
// const Block = require('./Block.js');
const Planet = require('./Planet.js');
const Ufo = require('./Ufo.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// var block = new Block;
// var planet = new Planet(0, 0);


var keypressed = false;
var planetsArray = [];
const ufo = new Ufo(250, 0);


function generatePlanets(ctx) {
  if (planetsArray.length < 10) {
    let planet = new Planet(Math.floor(Math.random()* 460), -Math.floor(Math.random()* 600),'../images/mars.svg');
    // for (let i = 0; i < 15; i++) {
      planetsArray.push(planet);
    // } 
  } else {
    planetsArray.forEach(function(planet, index) {
      if(planet.y > 460) {
      planetsArray.splice(index, 1);
      }
    })
  }
  drawPlanets(ctx);
}

function drawPlanets(ctx) {
  planetsArray.forEach(function(planet) {
    planet.draw(ctx)
  })
}

function movePlanets() {
  planetsArray.forEach(function(planet) {
    planet.move();
  })
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  movePlanets();
  generatePlanets(ctx);
  // removePlanets();
  ufo.draw(ctx);
  ufo.makeGravity();
  ufo.rockBottom;
  requestAnimationFrame(animate);
}

animate();

//EVENT LISTENERS
document.addEventListener( 'keydown', checkKey );

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
      ufo.bounceUp();
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
      ufo.moveLeft;

    }
    else if (e.keyCode == '39') {
       // right arrow
       ufo.moveRight;
    }

}

// img.addEventListener('load', function() {
//   block.draw(ctx);
// }, false);
// console.log(planet.planetsArray);





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
