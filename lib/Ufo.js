// const Block = require('./Block.js');

class Ufo {
  constructor(x=250, y=460) {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.1;
    this.speed = 5;
    this.friction = .98;
    this.imgsrc = '../images/ufo.svg';
    this.removeBottom = false;
  };

  makeFriction() {
    this.velocityX *= this.friction;
    if(this.velocityX > 0) {
      this.x += this.velocityX;
    } else if (this.velocityX < 0) {
      this.x += this.velocityX;
    };
  };

  get moveRight() {
    this.velocityX++;
    this.x += this.velocityX;
    if(this.x > 460) {
      this.x = 460;
      this.velocityX = 0;
    };
  };

  get moveLeft() {
    this.velocityX--;
    this.x += this.velocityX;
    if(this.x < 0) {
      this.x = 0
      this.velocityX = 0;
    };
  };

  arrowUp() {
    if(this.removeBottom === false) {
      this.rockBottom;
    };
  };

  get rockBottom() {
    if (this.y > 460) {
      this.y = 460;
    };
  };

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
    this.velocityY = -6;
  };
};

module.exports = Ufo;