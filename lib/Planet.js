const Block = require('./Block.js');

class Planet extends Block {
  constructor(ctx) {
    super();
    this.ctx = ctx;
  }

  draw(ctx) {
    let img = new Image();
    img.src = '../images/planet1.png';
    return super.draw(ctx, img);
  }

}

module.exports = Planet;



//class Planet extends Block {
// constructor() {
//   super();
//   this.img = get img() {
//     new Image();
//     return img.src = '../images/planet1.png';
//   }
// }