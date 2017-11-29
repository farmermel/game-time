// const Planet = require('./Planet.js')

class Block {
  constructor() {
  }

  draw(ctx, img) {
    img.addEventListener('load', function() {
      ctx.drawImage(img, 50, 50, 20, 20)
    }, false);
  }

  move() {

  }
}

module.exports = Block;

// export before class Block if we want to use ES6
// when trying out Mel's way, replace draw img with this.img
