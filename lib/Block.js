// const Planet = require('./Planet.js')

class Block {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 1;
  }

  draw(ctx, img, width, height) {
    ctx.drawImage(img, this.x, this.y, width, height);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

module.exports = Block;

// export before class Block if we want to use ES6
// when trying out Mel's way, replace draw img with this.img
