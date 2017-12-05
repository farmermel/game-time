// const Block = require('./Block.js');

class Ufo {
  constructor(x=250, y=460) {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.1;
    this.friction = .98;
    this.imgsrc = '../images/ufo.svg';
    this.removeBottom = false;
    this.planetCollision = false;
    this.refuelCollision = false;
  };

  makeFriction() {
    this.velocityX *= this.friction;
    if(this.velocityX > 0) {
      this.x += this.velocityX;
    } else if (this.velocityX < 0) {
      this.x += this.velocityX;
    };
  };

  //refactor right and left to one function
  moveRight() {
    this.velocityX++;
    this.x += this.velocityX;
    if(this.x > 460) {
      this.x = 460;
      this.velocityX = 0;
    };
  };

  moveLeft() {
    this.velocityX--;
    this.x += this.velocityX;
    if(this.x < 0) {
      this.x = 0
      this.velocityX = 0;
    };
  };

  arrowUp() {
    if(this.removeBottom === false) {
      this.rockBottom();
    };
  };

  rockBottom() {
    if (this.y > 460) {
      this.y = 460;
    };
  };


  //figure out wtf is going on with our ufo width
  checkForPlanetCollision(planetsArray) {
    let ufoXLeft = this.x - 30;
    let ufoXRight = this.x + 30;
    let ufoYTop = this.y - 30;
    let ufoYBottom = this.y + 30;
    planetsArray.forEach( (planet, index) => {
      if (ufoXLeft < planet.x && planet.x < ufoXRight && ufoYBottom > planet.y && planet.y > ufoYTop) {
        this.bounceUp();
        planetsArray.splice(index, 1);
        this.planetCollision = true;
      };
    });
    return planetsArray;
  };

  checkForRefuelCollision(refuel) {
    let ufoXLeft = this.x - 30;
    let ufoXRight = this.x + 30;
    let ufoYTop = this.y - 30;
    let ufoYBottom = this.y + 30;
      if(ufoXLeft < refuel.x && refuel.x < ufoXRight && ufoYBottom > refuel.y && refuel.y > ufoYTop) {
      this.bounceUp();
      refuel.refuelExists = false;
      refuel.x = 1;
      refuel.y = 0;
      this.refuelCollision = true;
    } return refuel;
  }

  //pull draw into block class
  draw(ctx) {
    let img = new Image();
    img.src = this.imgsrc;
    ctx.drawImage(img, this.x, this.y, 40, 40);
  };

  makeGravity() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    if(this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    };
  };

  bounceUp() {
    this.velocityY = -5;
  };
};

module.exports = Ufo;