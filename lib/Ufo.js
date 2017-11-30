// const Block = require('./Block.js');

class Ufo {
  constructor(x=250, y=460) {
    this.x = x;
    this.y = y;
    this.dx;
    this.imgsrc = '../images/ufo.svg';
  }

  get moveLeft() {
    return this.x -= 2;
  }

  get moveRight() {
    return this.x += 2;
  }

  draw(ctx) {
    let img = new Image();
    img.src = this.imgsrc;
    ctx.drawImage(img, this.x, this.y, 40, 40);
  }
}


module.exports = Ufo;