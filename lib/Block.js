// const Planet = require('./Planet.js')

class Block {
  constructor() {
    // this.ctx = ctx;
  }

  draw(ctx) {
    // var img = new Image();
    // img.src = '../images/planet1.png';
    this.img.addEventListener('load', function() {
      ctx.drawImage(this.img, 50, 50, 20, 20)
    }, false);
  }

  move() {

  }
}

module.exports = Block;

// export before class Block if we want to use ES6
