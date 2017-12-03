// const Block = require('./Block.js');

class Ufo {
  constructor(x=250, y=460) {
    this.x = x;
    this.y = y;
    this.currentDX = 0;
    this.currentDY = 0;
    this.gravity = 0.1;
    this.imgsrc = '../images/ufo.svg';
    this.removeBottom = false;
  }

  get moveLeft() {
    // this.currentDX = 1;
    // this.currentDX -= .1;
    console.log(this.currentDX);
    this.x -= 4;
    if(this.x < 0) {
      this.x = 0;
    }
  }

  get moveRight() {
    // this.currentDX = 1;
    // this.currentDX -= .1;
    this.x += 4;
    if(this.x > 460)
      this.x = 460;
  }

  arrowUp() {
    if(this.removeBottom === false) {
      this.rockBottom;
    }
  }

  get rockBottom() {
    if (this.y > 460) {
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
    if(this.y < 0) {
      this.y = 0;
      this.currentDY = 0;
    }
  }

  bounceUp() {
    this.currentDY = -5;
  }
}

//function
//function that checks whether or not this.removeBottom is true or false
//this function must run on animate
//condition here that switches between calling rock bottom and remove bottom


//create function that bounces on planet contact
//conditional when the x and y of ufo equal the x and y of a planet (loop over each planet)
//remove planet from array when hit
//call bounce up when hit planet


module.exports = Ufo;