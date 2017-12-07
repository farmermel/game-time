const Block = require('./Block.js');
let canvasWidth = 750;
let canvasHeight = 500;

class Ufo extends Block {
  constructor(x = 250, y = 460) {
    super(x, y)
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.width = 40;
    this.height = 40;
    this.gravity = 0.095;
    this.friction = .98;
    this.imgsrc = '../images/ufo.svg';
    this.removeBottom = false;
    this.planetCollision = false;
    this.refuelCollision = false
    this.sunCollision = false;
  }

  makeFriction() {
    this.velocityX *= this.friction;
    if (this.velocityX > 0) {
      this.x += this.velocityX;
    } else if (this.velocityX < 0) {
      this.x += this.velocityX;
    }
  }

  //refactor right and left to one function
  moveRight() {
    this.velocityX += 1.5;
    this.x += this.velocityX;
    if (this.x > canvasWidth - 40) {
      this.x = canvasWidth - 40;
      this.velocityX = 0;
    }
  }

  moveLeft() {
    this.velocityX -= 1.5;
    this.x += this.velocityX;
    if (this.x < 0) {
      this.x = 0
      this.velocityX = 0;
    }
  }

  arrowUp() {
    if (this.removeBottom === false) {
      this.rockBottom();
    }
  }

  rockBottom() {
    if (this.y > canvasHeight - 40) {
      this.y = canvasHeight - 40;
    }
  }


  //figure out wtf is going on with our ufo width

  // this.collisionParams = {
  //   ufoXLeft: this.x - this.width;
  //   let ufoXRight: this.x + this.width;
  //   let ufoYTop: this.y - this.height;
  //   let ufoYBottom: this.y + this.height;
  // }

  checkForPlanetCollision(planetsArray) {
    let ufoXLeft = this.x - 30;
    let ufoXRight = this.x + 30;
    let ufoYTop = this.y - 30;
    let ufoYBottom = this.y + 30;

    planetsArray.forEach( (planet, index) => {
      if (ufoXLeft < planet.x && planet.x < ufoXRight 
        && ufoYBottom > planet.y && planet.y > ufoYTop) {
        this.bounceUp();
        planetsArray.splice(index, 1);
        if (planet.imgsrc === '../images/sun.svg') {
          this.sunCollision = true;
        } else {
          this.planetCollision = true;
        }
      }
    });
    return planetsArray;
  }

  checkForRefuelCollision(refuel) {
    let ufoXLeft = this.x - 30;
    let ufoXRight = this.x + 30;
    let ufoYTop = this.y - 30;
    let ufoYBottom = this.y + 30;

    if (ufoXLeft < refuel.x && refuel.x < ufoXRight &&
     ufoYBottom > refuel.y && refuel.y > ufoYTop) {
      this.bounceUp();
      refuel.refuelExists = false;
      refuel.x = 1;
      refuel.y = 0;
      this.refuelCollision = true;
    } return refuel;
  }

  makeGravity() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }
  }

  bounceUp() {
    this.velocityY = -5;
  }
}

module.exports = Ufo;