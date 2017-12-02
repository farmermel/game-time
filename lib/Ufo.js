// const Block = require('./Block.js');

class Ufo {
  constructor(x=250, y=460) {
    this.x = x;
    this.y = y;
    this.currentDX = 0;
    this.currentDY = 0;
    this.gravity = 0.1;
    this.imgsrc = '../images/ufo.svg';
    // this.keypressed = false;
  }

  get moveLeft() {
    // this.currentDX = 0;
    this.currentDX += 1;
    this.currentDX -= .1;
    console.log(this.currentDX);
    this.x -= this.currentDX;
  }

  get moveRight() {
    this.currentDX += 3;
    this.currentDX -= .1;
    this.x += this.currentDX;
  }

  get rockBottom() {
    if(this.y > 460) {
      this.y = 460;
    }
  }

  draw(ctx) {
    let img = new Image();
    img.src = this.imgsrc;
    ctx.drawImage(img, this.x, this.y, 40, 40);
  }

  makeGravity() {
    this.currentDY += this.gravity;
    this.y += this.currentDY;

    // this.dy = 3;
    // this.y -= this.jumpForce;
  }

  bounceUp() {
    this.currentDY = -5;
  }
}


module.exports = Ufo;